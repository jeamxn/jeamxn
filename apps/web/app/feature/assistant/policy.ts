export const MAX_INPUT = 600;
export const MAX_EXCHANGES = 10;
export const MAX_CONTEXT_MESSAGES = 10;
export const MAX_CONTEXT_CHARACTERS = 6000;
export function questionError(value: string) {
  if (!value.trim()) return "궁금한 내용을 입력해 주세요.";
  if (value.trim().length > MAX_INPUT) return `${MAX_INPUT}자 안으로 질문을 줄여주세요.`;
  return "";
}
export function chatContext(
  messages: { role: "user" | "assistant"; content: string }[],
  question: string,
) {
  const history = messages
    .slice(-(MAX_CONTEXT_MESSAGES - 1))
    .map(({ role, content }) => ({ role, content: content.slice(0, 1800) }));
  const current = { role: "user" as const, content: question.trim().slice(0, MAX_INPUT) };
  let length = history.reduce(
    (sum, message) => sum + message.content.length,
    current.content.length,
  );
  while (history.length > 0 && length > MAX_CONTEXT_CHARACTERS) {
    const oldest = history.shift();
    if (oldest) length -= oldest.content.length;
  }
  // Keep complete conversational context when possible; never begin with an orphaned answer.
  while (history[0]?.role === "assistant") history.shift();
  return [...history, current];
}
