import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium, webkit } from "playwright";

const base = (process.env.QA_BASE_URL ?? "http://127.0.0.1:5413").replace(/\/$/, "");
const basePath = new URL(base).pathname.replace(/\/$/, "");
const sitePath = (route) => `${basePath}${route}`;
const output = process.env.QA_OUTPUT ?? "/tmp/jeamxn-ime-0110";
await mkdir(output, { recursive: true });
const results = [];
const errors = [];
const snapshot = (page) =>
  page.evaluate(() => ({
    value: document.querySelector("#archive-search").value,
    q: new URLSearchParams(location.search).get("q") ?? "",
    result: document.querySelector("#archive-results-title").textContent,
    count: document.querySelectorAll(".archive-record").length,
    sameNode: document.querySelector("#archive-search") === window.__imeInput,
    focused: document.activeElement === window.__imeInput,
    selection: document.querySelector("#archive-search").selectionStart,
  }));
const waitQuery = (page, query) =>
  page.waitForFunction(
    (q) =>
      (new URLSearchParams(location.search).get("q") ?? "") === q &&
      document.querySelector("#archive-search").value === q,
    query,
  );

try {
  for (const [engine, browserType] of [
    ["chromium", chromium],
    ["webkit", webkit],
  ]) {
    const browser = await browserType.launch({ headless: true });
    try {
      for (const width of [390, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 1000 } });
        page.on("pageerror", (error) => errors.push({ engine, width, message: error.message }));
        page.on("console", (message) => {
          if (
            message.type() === "error" &&
            /hydration|did not match|recoverable/i.test(message.text())
          )
            errors.push({ engine, width, message: message.text() });
        });
        await page.goto(`${base}/work`, { waitUntil: "networkidle" });
        const input = page.locator("#archive-search");
        await input.focus();
        await page.evaluate(() => {
          window.__imeInput = document.querySelector("#archive-search");
          window.__qWrites = [];
          for (const method of ["pushState", "replaceState"]) {
            const original = history[method].bind(history);
            history[method] = (...args) => {
              const q =
                new URL(args[2] ?? location.href, location.href).searchParams.get("q") ?? "";
              window.__qWrites.push(q);
              return original(...args);
            };
          }
        });
        const initial = await snapshot(page);
        const cdp = engine === "chromium" ? await page.context().newCDPSession(page) : null;
        const compositionEvent = (type, data) =>
          input.evaluate(
            (element, args) => {
              element.dispatchEvent(
                new CompositionEvent(args.type, { bubbles: true, data: args.data }),
              );
            },
            { type, data },
          );
        const setPreedit = async (text) => {
          if (cdp)
            await cdp.send("Input.imeSetComposition", {
              text,
              selectionStart: text.length,
              selectionEnd: text.length,
            });
          else
            await input.evaluate((element, value) => {
              Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
                element,
                value,
              );
              element.setSelectionRange(value.length, value.length);
              element.dispatchEvent(
                new CompositionEvent("compositionupdate", { bubbles: true, data: value }),
              );
              element.dispatchEvent(
                new InputEvent("input", {
                  bubbles: true,
                  data: value,
                  inputType: "insertCompositionText",
                  isComposing: true,
                }),
              );
            }, text);
        };
        const commit = async (text) => {
          if (cdp) await cdp.send("Input.insertText", { text });
          else {
            await compositionEvent("compositionend", text);
            await input.evaluate(
              (element, value) =>
                element.dispatchEvent(
                  new InputEvent("input", {
                    bubbles: true,
                    data: value,
                    inputType: "insertText",
                    isComposing: false,
                  }),
                ),
              text,
            );
          }
        };
        if (!cdp) await compositionEvent("compositionstart", "");
        const preeditTrace = [];
        for (const text of ["ㅎ", "하", "학", "학교"]) {
          await setPreedit(text);
          await page.waitForTimeout(220); // Longer than debounce: composition must still not navigate.
          const state = await snapshot(page);
          assert.equal(state.value, text);
          assert.equal(state.q, "");
          assert.equal(state.result, initial.result);
          assert.equal(state.sameNode, true);
          assert.equal(state.focused, true);
          assert.equal(state.selection, text.length);
          preeditTrace.push(state);
        }
        await input.evaluate((element) =>
          element.dispatchEvent(
            new KeyboardEvent("keydown", {
              bubbles: true,
              key: "Enter",
              code: "Enter",
              isComposing: true,
              keyCode: 229,
            }),
          ),
        );
        assert.equal((await snapshot(page)).q, "");
        await commit("학교");
        await waitQuery(page, "학교");
        await page.waitForTimeout(230);
        assert.equal((await snapshot(page)).value, "학교");
        assert.deepEqual(await page.evaluate(() => window.__qWrites), ["학교"]);
        assert.ok((await snapshot(page)).count > 0);
        assert.equal((await snapshot(page)).sameNode, true);
        assert.equal((await snapshot(page)).focused, true);
        assert.equal((await snapshot(page)).selection, 2);

        // Continue typing after the committed Korean word and exercise a second composition.
        await input.press("End");
        await page.keyboard.insertText(" ");
        if (cdp) {
          await setPreedit("기");
          await setPreedit("기록");
          await commit("기록");
        } else {
          await compositionEvent("compositionstart", "");
          await setPreedit("학교 기");
          await setPreedit("학교 기록");
          await commit("학교 기록");
        }
        await waitQuery(page, "학교 기록");
        await page.getByRole("button", { name: "검색과 필터 지우기", exact: true }).click();
        await waitQuery(page, "");
        await page.waitForFunction(
          (count) => document.querySelectorAll(".archive-record").length === count,
          initial.count,
        );
        assert.equal((await snapshot(page)).count, initial.count);

        // Rapid input, delayed URL acknowledgement, selection and same-node identity.
        await input.focus();
        await input.pressSequentially("React", { delay: 12 });
        assert.equal(await input.inputValue(), "React");
        await waitQuery(page, "React");
        assert.equal((await snapshot(page)).sameNode, true);
        assert.equal((await snapshot(page)).focused, true);
        await input.evaluate((element) => element.setSelectionRange(1, 3));
        await page.waitForTimeout(220);
        assert.equal((await snapshot(page)).selection, 1);
        // A filter must flush a pending draft, not restore the previous query.
        await input.fill("학교");
        await page.locator("#archive-collection").selectOption("school");
        await waitQuery(page, "학교");
        assert.equal(new URL(page.url()).searchParams.get("collection"), "school");
        await page.locator("#archive-sort").selectOption("name");
        assert.equal(new URL(page.url()).searchParams.get("collection"), "school");
        assert.equal(new URL(page.url()).searchParams.get("q"), "학교");

        // Both clear actions and deletion to empty must cancel pending URL timers.
        await input.fill("존재하지않는기록");
        await page.getByRole("heading", { name: "일치하는 기록이 없어요.", exact: true }).waitFor();
        await page.getByRole("button", { name: "모든 기록 보기", exact: true }).click();
        await waitQuery(page, "");
        assert.equal(new URL(page.url()).search, "");
        await input.fill("취소할검색");
        await input.press("ControlOrMeta+A");
        await input.press("Backspace");
        await waitQuery(page, "");
        await page.waitForTimeout(250);
        assert.equal(new URL(page.url()).search, "");
        await input.fill("학교 & 日本語 café 한글"); // Paste/input replacement, Unicode and URL escaping.
        await waitQuery(page, "학교 & 日本語 café 한글");
        await input.fill("");
        await waitQuery(page, "");

        // A POP navigation must cancel a queued draft and sync from the actual URL.
        for (const query of ["학교", "ara"]) {
          await page.evaluate(
            (workPath) => {
              history.pushState(history.state, "", workPath);
              dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
            },
            sitePath(`/work?q=${encodeURIComponent(query)}&sort=name`),
          );
          await waitQuery(page, query);
        }
        await input.fill("this timer must not win");
        await page.goBack();
        await waitQuery(page, "학교");
        await page.waitForTimeout(250);
        assert.equal(await input.inputValue(), "학교");
        await page.goForward();
        await waitQuery(page, "ara");
        assert.equal(new URL(page.url()).searchParams.get("sort"), "name");

        // Explicit external navigation during preedit is deferred, not written into the IME.
        await input.focus();
        await input.press("End");
        if (!cdp) await compositionEvent("compositionstart", "");
        await setPreedit(cdp ? "ㄱ" : "araㄱ");
        const beforeNavigation = await input.inputValue();
        await page.evaluate((workPath) => {
          history.pushState(history.state, "", workPath);
          dispatchEvent(new PopStateEvent("popstate", { state: history.state }));
        }, sitePath("/work?q=React&collection=personal"));
        await page.waitForTimeout(220);
        assert.equal(await input.inputValue(), beforeNavigation);
        assert.equal(new URL(page.url()).searchParams.get("q"), "React");
        await commit(cdp ? "ㄱ" : "araㄱ");
        await waitQuery(page, "React");
        await page.waitForTimeout(220);
        assert.equal(new URL(page.url()).searchParams.get("collection"), "personal");

        // Static first render: query survives direct request and reload without hydration errors.
        await page.goto(
          `${base}/work?q=${encodeURIComponent("학교")}&collection=school&sort=name`,
          {
            waitUntil: "networkidle",
          },
        );
        await waitQuery(page, "학교");
        const directCount = (await snapshot(page)).count;
        const directURL = page.url();
        await page.reload({ waitUntil: "networkidle" });
        await waitQuery(page, "학교");
        assert.equal(page.url(), directURL);
        assert.equal((await snapshot(page)).count, directCount);
        await page.screenshot({ path: `${output}/${engine}-${width}.png` });
        results.push({
          engine,
          width,
          imeMode: cdp
            ? "Chromium CDP native Input.imeSetComposition/Input.insertText"
            : "synthetic CompositionEvent/InputEvent; not macOS Korean IME or Safari.app",
          preeditTrace,
          committedQuery: "학교",
          directCount,
          scenarios: [
            "preedit/no-navigation",
            "Enter-during-preedit",
            "single-commit",
            "repeat-composition",
            "focus-node-selection",
            "rapid-latin",
            "pending-draft-filter",
            "two-clear-actions",
            "delete-empty",
            "unicode-paste",
            "history-back-forward-cancel-pending",
            "external-navigation-during-composition",
            "query-direct-reload",
          ],
        });
        await page.close();
      }
    } finally {
      await browser.close();
    }
  }
  assert.deepEqual(errors, []);
  await writeFile(
    `${output}/results.json`,
    JSON.stringify({ pass: true, base, results, errors }, null, 2),
  );
  console.log(JSON.stringify({ pass: true, base, cases: results.length, results, errors }));
} catch (error) {
  await writeFile(
    `${output}/failure.json`,
    JSON.stringify({ base, results, errors, failure: error.stack }, null, 2),
  );
  throw error;
}
