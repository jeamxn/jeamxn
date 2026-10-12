import type { AssistantStatus, ChatResponse, Portfolio } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Modal } from "@jeamxn/ui";
import { type FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router";
import { api } from "~/shared/lib/api";
import { safeHref } from "~/shared/lib/meta";
import { chatContext, MAX_EXCHANGES, MAX_INPUT, questionError } from "./policy";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  sources?: ChatResponse["sources"];
  mode?: ChatResponse["mode"];
};
const questions = ["어떤 제품을 만들고 있나요?", "ara는 어떻게 시작했나요?", "어떤 경험이 있나요?"];

export function AssistantPanel({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Portfolio;
}) {
  const [status, setStatus] = useState<AssistantStatus | null>(null);
  const [offline, setOffline] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState("");
  const [error, setError] = useState("");
  const serial = useRef(0);
  const request = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setStatus(null);
    setOffline(false);
    api
      .status(AbortSignal.any([controller.signal, AbortSignal.timeout(6000)]))
      .then(setStatus)
      .catch(() => {
        if (!controller.signal.aborted) {
          setOffline(true);
          setStatus({ mode: "local", label: "공개 소개에서 찾는 자주 묻는 질문" });
        }
      });
    return () => {
      controller.abort();
      request.current?.abort();
      request.current = null;
      setLoading(false);
      setPending("");
    };
  }, [open]);
  useEffect(() => {
    const scroll = scrollRef.current;
    if (scroll) scroll.scrollTop = scroll.scrollHeight;
  }, [messages, loading, error]);

  function localAnswer(question: string): ChatResponse {
    const ara = data.projects.find((p) => p.slug === "ara");
    if (question === questions[1] && ara)
      return {
        answer: ara.overview[1],
        sources: [{ label: "ara 이야기", href: "/work/ara" }],
        mode: "local",
      };
    if (question === questions[2])
      return {
        answer: data.experience
          .map((item) => `${item.period} · ${item.company} ${item.team}\n${item.description}`)
          .join("\n\n"),
        sources: [{ label: "전체 이력", href: "/resume" }],
        mode: "local",
      };
    if (question === questions[0])
      return {
        answer: data.projects
          .filter((p) => p.featured)
          .map((p) => `${p.name}: ${p.summary}`)
          .join("\n\n"),
        sources: data.projects
          .filter((p) => p.featured)
          .map((p) => ({ label: p.name, href: `/work/${p.slug}` })),
        mode: "local",
      };
    return {
      answer:
        "지금은 서버 연결 없이, 미리 정리한 공개 질문만 안내합니다. 위의 질문을 선택하거나 소개와 프로젝트 이야기를 살펴보세요. 직접 이야기를 나누고 싶다면 이메일을 보내주세요.",
      sources: [
        { label: "소개", href: "/about" },
        { label: "이력", href: "/resume" },
      ],
      mode: "local",
    };
  }
  async function send(question: string) {
    if (loading || !status) return;
    const validation = questionError(question);
    if (validation) {
      setError(validation);
      inputRef.current?.focus();
      return;
    }
    if (messages.length >= MAX_EXCHANGES * 2) {
      setError("이 대화는 10개의 질문까지 가능합니다. 새 대화를 시작해 주세요.");
      return;
    }
    const controller = new AbortController();
    request.current = controller;
    setError("");
    setLoading(true);
    setPending(question.trim());
    try {
      const result = offline
        ? localAnswer(question.trim())
        : await api.chat(
            { messages: chatContext(messages, question) },
            AbortSignal.any([controller.signal, AbortSignal.timeout(35000)]),
          );
      if (controller.signal.aborted) return;
      setMessages((previous) => [
        ...previous,
        { id: ++serial.current, role: "user", content: question.trim() },
        {
          id: ++serial.current,
          role: "assistant",
          content: result.answer,
          sources: result.sources,
          mode: result.mode,
        },
      ]);
      setInput("");
      setStatus((previous) => previous && { ...previous, mode: result.mode });
    } catch (cause) {
      if (!controller.signal.aborted) {
        inputRef.current?.focus();
        setError(cause instanceof Error ? cause.message : "연결을 확인한 뒤 다시 보내주세요.");
      }
    } finally {
      if (request.current === controller) {
        setLoading(false);
        setPending("");
        request.current = null;
      }
    }
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }
  function reset() {
    request.current?.abort();
    setMessages([]);
    setInput("");
    setError("");
    setLoading(false);
    setPending("");
  }
  const capped = messages.length >= MAX_EXCHANGES * 2;
  return (
    <Modal open={open} onClose={onClose} titleId="assistant-title" className="assistant-modal">
      <header className="assistant-header">
        <div>
          <span className="assistant-mark" aria-hidden="true">
            <Icon name="chat" size={22} />
          </span>
          <h2 id="assistant-title">재민에게 궁금한 점</h2>
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label="대화 닫기"
          data-modal-focus
          onClick={onClose}
        >
          <Icon name="close" size={22} />
        </button>
      </header>
      <div className="assistant-mode" role="status">
        {!status
          ? "답변 방식을 확인하는 중…"
          : status.mode === "ai"
            ? "AI가 공개된 소개와 프로젝트를 바탕으로 답합니다."
            : offline
              ? "포트폴리오 안내 · 미리 정리한 질문에서 답합니다."
              : "포트폴리오 안내 · AI가 아닌 공개 자료 검색입니다."}
        {status?.mode === "ai" && <span>질문은 AI 제공자에게 전송됩니다.</span>}
        {offline && <span>서버 연결이 없어 미리 정리한 질문을 안내합니다.</span>}
      </div>
      <div className="assistant-messages" ref={scrollRef} aria-busy={loading}>
        <div className="assistant-welcome">
          <p>
            어떤 사람인지,
            <br />
            어떤 제품을 만들었는지.
          </p>
          <span>궁금한 곳부터 살펴보세요. 개인·회사 비공개 내용은 답변에 사용하지 않습니다.</span>
        </div>
        {messages.length === 0 && (
          <div className="suggestions">
            {questions.map((question) => (
              <button
                type="button"
                key={question}
                disabled={!status || loading}
                onClick={() => void send(question)}
              >
                {question}
                <Icon name="arrow-up-right" size={18} />
              </button>
            ))}
          </div>
        )}
        <div role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message) => (
            <div className={`message message--${message.role}`} key={message.id}>
              <span className="message-label">
                {message.role === "user"
                  ? "나"
                  : message.mode === "local"
                    ? "공개 내용 안내"
                    : "AI 안내"}
              </span>
              <ReactMarkdown
                skipHtml
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={safeHref(href ?? "#")}
                      target={href?.startsWith("https:") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  img: () => null,
                }}
              >
                {message.content}
              </ReactMarkdown>
              {message.sources && message.sources.length > 0 && (
                <div className="message-sources">
                  {message.sources.map((source) =>
                    source.href.startsWith("/") ? (
                      <Link key={source.href} to={safeHref(source.href)} onClick={onClose}>
                        {source.label}
                        <Icon name="arrow-up-right" size={15} />
                      </Link>
                    ) : (
                      <a
                        key={source.href}
                        href={safeHref(source.href)}
                        target={source.href.startsWith("https:") ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        {source.label}
                        <Icon name="arrow-up-right" size={15} />
                      </a>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {loading && (
          <>
            <div className="message message--user">
              <span className="message-label">나</span>
              <p>{pending}</p>
            </div>
            <p className="assistant-loading" role="status">
              공개 내용에서 답변을 찾고 있습니다…
            </p>
          </>
        )}
        {error && (
          <p className="assistant-error" role="alert">
            {error}
          </p>
        )}
        {capped && (
          <p className="assistant-limit">10개의 질문을 나눴습니다. 새 대화에서 이어가 주세요.</p>
        )}
      </div>
      <form className="assistant-form" onSubmit={submit}>
        <label htmlFor="assistant-question" className="sr-only">
          재민의 경험이나 프로젝트에 관한 질문
        </label>
        <div className="assistant-input-wrap">
          <textarea
            ref={inputRef}
            id="assistant-question"
            name="question"
            autoComplete="off"
            rows={2}
            maxLength={MAX_INPUT}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="예: Dipull은 어떤 서비스인가요?…"
            aria-describedby={
              error ? "assistant-form-help assistant-field-error" : "assistant-form-help"
            }
            aria-invalid={Boolean(error)}
            disabled={capped}
          />
          <button
            type="submit"
            className="send-button"
            aria-label="질문 보내기"
            disabled={loading || !status || capped}
          >
            <Icon name="send" size={22} />
          </button>
        </div>
        <div className="assistant-form-bottom">
          <p id="assistant-form-help">
            {input.length}/{MAX_INPUT} · 개인정보는 입력하지 마세요.
          </p>
          <button type="button" onClick={reset} disabled={loading || messages.length === 0}>
            새 대화
          </button>
        </div>
        {error && (
          <span id="assistant-field-error" className="sr-only">
            {error}
          </span>
        )}
      </form>
    </Modal>
  );
}
