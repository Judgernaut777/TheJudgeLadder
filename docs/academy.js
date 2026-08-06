/* AIJL Academy link — single source of truth for the webapp URL.
 *
 * The academy (full-stack webapp, source in ../app) is linked from every
 * page's nav. While ACADEMY_URL is empty the link stays hidden, so the
 * site never shows a dead link. After publishing the app, set the URL
 * below to its public address (e.g. https://<name>.ok.kimi.link or a
 * custom domain) and the "Academy" link appears site-wide on next deploy.
 */
window.AIJL_ACADEMY_URL = "";

(function () {
  function injectAcademyLink() {
    var url = window.AIJL_ACADEMY_URL;
    if (!url) return;
    var nav = document.querySelector("nav.nav");
    if (!nav || nav.querySelector("[data-academy-link]")) return;
    var a = document.createElement("a");
    a.href = url;
    a.textContent = "Academy";
    a.setAttribute("data-academy-link", "");
    a.setAttribute(
      "title",
      "AIJL Academy — self-paced courses with auto-scored gates"
    );
    a.style.cssText =
      "border: 1px solid var(--color-accent); border-radius: var(--radius-md); padding: 2px 10px;";
    var themeBtn = nav.querySelector("button");
    nav.insertBefore(a, themeBtn || null);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectAcademyLink);
  } else {
    injectAcademyLink();
  }
})();
