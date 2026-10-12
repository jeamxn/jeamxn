import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const slash = (value) => value.split(path.sep).join("/");
const relative = (file) => slash(path.relative(root, file));
const roots = ["apps/server/src", "apps/web/app", "packages"];
const files = [];
async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (
        !["node_modules", "dist", "build", ".react-router", "test", "asset"].includes(entry.name)
      ) {
        await walk(file);
      }
    } else if (/\.[cm]?[jt]sx?$/.test(entry.name) && !entry.name.endsWith(".d.ts"))
      files.push(file);
  }
}
for (const directory of roots) await walk(path.join(root, directory));

function targetOf(file, specifier) {
  if (specifier.startsWith(".")) return relative(path.resolve(path.dirname(file), specifier));
  if (specifier.startsWith("~/")) return `apps/web/app/${specifier.slice(2)}`;
  if (specifier.startsWith("#")) return `apps/server/src/${specifier.slice(1)}`;
  if (specifier.startsWith("@jeamxn/")) return `packages/${specifier.slice("@jeamxn/".length)}/src`;
  return undefined;
}
function featureOf(file) {
  return /^apps\/web\/app\/feature\/([^/]+)(?:\/|$)/.exec(file)?.[1];
}
function domainOf(file) {
  return /^apps\/server\/src\/([^/]+)\//.exec(file)?.[1];
}
const errors = [];
for (const file of files) {
  const sourceName = relative(file);
  const source = ts.createSourceFile(
    file,
    await readFile(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  function inspect(node) {
    let literal;
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
      literal = node.moduleSpecifier;
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    )
      literal = node.arguments[0];
    if (literal && ts.isStringLiteralLike(literal)) {
      const target = targetOf(file, literal.text);
      const violations = [];
      if (target) {
        const sourceFeature = featureOf(sourceName);
        const targetFeature = featureOf(target);
        if (sourceFeature && targetFeature && sourceFeature !== targetFeature) {
          violations.push("compose different web features in routes, not inside another feature");
        }
        if (sourceName.startsWith("apps/web/app/shared/") && targetFeature) {
          violations.push("shared web primitives cannot depend on a feature");
        }
        if (sourceName.startsWith("packages/")) {
          if (target.startsWith("apps/"))
            violations.push("workspace packages cannot import application source");
          if (
            sourceName.startsWith("packages/core/") &&
            /(?:^|\/)(?:private|interviews?)(?:\/|$)/i.test(target)
          ) {
            violations.push("public core cannot import private/interview data");
          }
        }
        const sourceDomain = domainOf(sourceName);
        const targetDomain = domainOf(target);
        if (
          sourceDomain &&
          targetDomain &&
          sourceDomain !== targetDomain &&
          sourceDomain !== "shared" &&
          targetDomain !== "shared" &&
          !/\.public(?:\.[cm]?[jt]s)?$/.test(target)
        )
          violations.push("enter another server domain only through its *.public module");
      }
      for (const violation of violations) {
        const { line } = source.getLineAndCharacterOfPosition(literal.getStart(source));
        errors.push(`${sourceName}:${line + 1} ${literal.text}: ${violation}`);
      }
    }
    ts.forEachChild(node, inspect);
  }
  inspect(source);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`Boundaries OK (${files.length} source files)`);
