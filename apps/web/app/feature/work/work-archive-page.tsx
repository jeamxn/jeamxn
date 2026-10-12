import type { Portfolio } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { useSyncExternalStore } from "react";
import { Link, useSearchParams } from "react-router";
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
  // Static /work HTML cannot know the visitor's query string. Match that exact
  // first render during hydration, then apply the real URL without rewriting it.
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    clientHydrationSnapshot,
    serverHydrationSnapshot,
  );
  const params = hydrated ? urlParams : emptySearch;
  const records = archiveRecords(data.projects, params);
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(urlParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const active = ["q", "collection", "type"].some((key) => params.get(key));
  return (
    <div className="container archive-page">
      <header className="archive-heading">
        <p>작업 기록</p>
        <h1>
          크고 작은 시작을
          <br />
          남겨두었습니다.
        </h1>
        <div className="archive-intro">
          <p>
            오래 다듬은 제품도, 짧게 시도한 실험도 있습니다. 대표작 밖의 작업까지 살펴볼 수 있는
            기록입니다.
          </p>
          <p>
            공개할 수 있는 작업을 모았습니다. 제품 / 실험 / 학습 / 기여를 구분하며, 기록 수가 출시한
            제품 수를 뜻하지는 않습니다. 회사와 ara의 세부 작업은 각각의 이야기 안에 함께
            담았습니다.
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
              value={params.get("q") ?? ""}
              onChange={(event) => update("q", event.target.value)}
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
            <button
              type="button"
              className="text-link"
              onClick={() => setParams({}, { preventScrollReset: true })}
            >
              검색과 필터 지우기
            </button>
          )}
        </div>
        <p className="archive-period-note">
          기간은 작업 기록을 기준으로 적었습니다. 최근 기록순은 표시된 마지막 연도를 기준으로
          정렬합니다.
        </p>
        {records.length ? (
          <ul className="archive-list">
            {records.map((project) => (
              <li key={project.slug}>
                <Link to={`/work/${project.slug}`} className="archive-record">
                  <div className="archive-record-top">
                    <div>
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
            <h3>일치하는 기록이 없습니다.</h3>
            <p>검색어를 짧게 바꾸거나 필터를 지우면 다른 기록을 살펴볼 수 있습니다.</p>
            <button type="button" className="button button--solid" onClick={() => setParams({})}>
              모든 기록 보기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
