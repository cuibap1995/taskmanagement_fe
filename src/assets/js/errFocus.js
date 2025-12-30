import { nextTick } from "vue";
export async function scrollToError(err) {
  if (!err?.field) return;
  await nextTick();
  const selector = `[name="${err.field}"], #${err.field}`;
  const el = document.querySelector(selector);
  if (!el) {
    console.warn("scrollToError: cannot find input for field:", err.field);
    return;
  }

  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });

  el.focus({ preventScroll: true });
}
