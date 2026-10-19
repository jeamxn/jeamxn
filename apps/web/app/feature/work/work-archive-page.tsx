import type { Portfolio } from "@jeamxn/contract";
import { resumeProjects } from "@jeamxn/core";
import { Icon } from "@jeamxn/icon";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link, useLocation, useNavigationType, useSearchParams } from "react-router";
import {
  archiveRecords,
  collections,
  projectCollection,
  projectRecordType,
  recordTypes,
} from "~/shared/lib/work-archive";

const emptySearch = new URLSearchParams();
const subscribeToHydration = () => () => {};
const clientHydrationSnapshot = () => true;
const serverHydrationSnapshot = () => false;

export function WorkArchivePage({ data }: { data: Portfolio }) {
  const [urlParams, setParams] = useSearchParams();
  const location = useLocation();
  const navigationType = useNavigationType();
  // Static /work HTML cannot know the visitor's query string. Match that exact
  // first render during hydration, then apply the real URL without rewriting it.
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientHydrationSnapshot,
    serverHydrationSnapshot,
  );
  const params = hydrated ? urlParams : emptySearch;
  // The browser owns the preedit text until compositionend. Routing on each
  // input can end that composition and make the next preedit append to it.
  const [draft, setDraft] = useState("");
  const draftRef = useRef("");
  const composingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const latestParamsRef = useRef(new URLSearchParams(urlParams));
  const ownSearchesRef = useRef(new Set<string>());
  const deferredQueryRef = useRef<string | null>(null);
  const cancelSearch = () => {
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
  };

  useEffect(() => {
    if (!hydrated) return;
    // Our replace navigation acknowledges a committed query, not a new input
    // value. In particular it must not overwrite text typed while it resolved.
    if (navigationType !== "POP" && ownSearchesRef.current.delete(urlParams.toString())) return;
    latestParamsRef.current = new URLSearchParams(urlParams);
    ownSearchesRef.current.clear();
    clearTimeout(timerRef.current);
    timerRef.current = undefined;
    const query = urlParams.get("q") ?? "";
    if (composingRef.current) deferredQueryRef.current = query;
    else {
      draftRef.current = query;
      setDraft(query);
    }
  }, [hydrated, location.key, navigationType, urlParams]);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const writeParams = (next: URLSearchParams, replace = true) => {
    if (next.toString() === latestParamsRef.current.toString()) return;
    latestParamsRef.current = next;
    ownSearchesRef.current.add(next.toString());
    setParams(next, { replace, preventScrollReset: true });
  };
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(latestParamsRef.current);
    if (key !== "q" && !composingRef.current) {
      cancelSearch();
      if (draftRef.current) next.set("q", draftRef.current);
      else next.delete("q");
    }
    if (value) next.set(key, value);
    else next.delete(key);
    writeParams(next);
  };
  const clear = () => {
    cancelSearch();
    composingRef.current = false;
    deferredQueryRef.current = null;
    draftRef.current = "";
    setDraft("");
    writeParams(new URLSearchParams(), false);
  };
  const records = archiveRecords(data.projects, params);
  const pinnedSlugs = new Set(resumeProjects(data.projects).map((project) => project.slug));
  const active = ["q", "collection", "type"].some((key) => params.get(key));
  return (
    <div className="container archive-page">
      <header className="archive-heading">
        <p>작업 기록</p>
        <h1>
          만든 서비스와
          <br />
          실험을 모았어요.
        </h1>
        <div className="archive-intro">
          <p>학교와 회사에서 만든 서비스, 직접 쓰려고 만든 도구, 짧게 시도해 본 실험을 모았어요.</p>
          <p>
            제품 / 실험 / 학습 / 기여로 나눴고, 아직 출시하지 않은 작업도 포함돼 있어요. 회사와
            ara에서 한 세부 작업은 각 프로젝트의 이야기 안에 담았어요.
          </p>
          <Link className="text-link" to="/#work">
            대표작부터 보기 <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </header>
      <section aria-labelledby="archive-results-title">
        <div className="archive-controls">
          <label className="archive-search" htmlFor="archive-search">
            이름 / 내용 / 기술 검색
            <input
              id="archive-search"
              type="search"
              value={draft}
              onChange={(event) => {
                const value = event.currentTarget.value;
                const changed = draftRef.current !== value;
                draftRef.current = value;
                setDraft(value);
                cancelSearch();
                if (
                  composingRef.current ||
                  (event.nativeEvent as InputEvent).isComposing ||
                  !changed
                )
                  return;
                // Coalesce rapid typing without delaying the visible input.
                timerRef.current = setTimeout(() => update("q", draftRef.current), 180);
              }}
              onCompositionStart={() => {
                cancelSearch();
                composingRef.current = true;
              }}
              onCompositionEnd={(event) => {
                composingRef.current = false;
                cancelSearch();
                const external = deferredQueryRef.current;
                deferredQueryRef.current = null;
                const value = external ?? event.currentTarget.value;
                draftRef.current = value;
                setDraft(value);
                if (external === null) update("q", value);
              }}
              placeholder="예: 학교, React, 예약"
              autoComplete="off"
            />
          </label>
          <label htmlFor="archive-collection">
            어디에서
            <select
              id="archive-collection"
              aria-label="어디에서"
              value={params.get("collection") ?? ""}
              onChange={(event) => update("collection", event.target.value)}
            >
              <option value="">모든 작업</option>
              {Object.entries(collections).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="archive-type">
            어떤 작업
            <select
              id="archive-type"
              aria-label="어떤 작업"
              value={params.get("type") ?? ""}
              onChange={(event) => update("type", event.target.value)}
            >
              <option value="">모든 종류</option>
              {Object.entries(recordTypes).map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="archive-sort">
            정렬
            <select
              id="archive-sort"
              aria-label="정렬"
              value={params.get("sort") ?? "recent"}
              onChange={(event) => update("sort", event.target.value)}
            >
              <option value="recent">최근 기록순</option>
              <option value="name">이름순</option>
            </select>
          </label>
        </div>
        <div className="archive-results-heading">
          <h2 id="archive-results-title" role="status" aria-live="polite" aria-atomic="true">
            전체 {data.projects.length}개 기록 중 {records.length}개
          </h2>
          {active && (
            <button type="button" className="text-link" onClick={clear}>
              검색과 필터 지우기
            </button>
          )}
        </div>
        <p className="archive-period-note">
          기간은 남아 있는 작업 기록을 기준으로 적었어요. 최근 기록순은 마지막으로 작업한 연도를
          기준으로 정렬해요. 이력에 담은 주요 작업은 검색과 필터에 맞을 때 맨 위에 고정해요.
        </p>
        {records.length ? (
          <ul className="archive-list">
            {records.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/work/${project.slug}`}
                  className="archive-record"
                  data-pinned={pinnedSlugs.has(project.slug) || undefined}
                >
                  <div className="archive-record-top">
                    <div>
                      {pinnedSlugs.has(project.slug) && (
                        <span className="archive-pin">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="m16 3 5 5-4 2-3 5-2-2-5 5-1-1 5-5-2-2 5-3z" />
                          </svg>
                          주요 작업
                        </span>
                      )}
                      <span className="archive-record-kind">
                        {collections[projectCollection(project)]} /{" "}
                        {recordTypes[projectRecordType(project)]}
                        {project.featured ? " / 대표작" : ""}
                      </span>
                      <h3 translate="no">{project.name}</h3>
                    </div>
                    <span className="archive-record-period">{project.period}</span>
                    <Icon name="arrow-up-right" size={25} />
                  </div>
                  <p className="archive-record-summary">{project.summary}</p>
                  <p className="archive-record-role">{project.role}</p>
                  <p className="archive-record-status">{project.status}</p>
                  <ul className="tags" aria-label="사용한 기술">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="archive-empty">
            <h3>일치하는 기록이 없어요.</h3>
            <p>검색어를 짧게 바꾸거나 필터를 지우면 다른 기록을 살펴볼 수 있어요.</p>
            <button type="button" className="button button--solid" onClick={clear}>
              모든 기록 보기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
