/* AIJL Academy link — single source of truth for the webapp URL.
 *
 * The academy (full-stack webapp, source in ../app) is linked from every
 * page's nav. While ACADEMY_URL is empty the link stays hidden, so the
 * site never shows a dead link. After publishing the app, set the URL
 * below to its public address (e.g. https://<name>.ok.kimi.link or a
 * custom domain) and the "Academy" link appears site-wide on next deploy.
 *
 * The nav is rendered client-side by the dc-runtime, so we watch for it
 * with a MutationObserver rather than assuming it exists at load.
 */
window.AIJL_ACADEMY_URL = "";

(function () {
  var done = false;

  function injectAcademyLink() {
    if (done) return;
    var url = window.AIJL_ACADEMY_URL;
    if (!url) return;
    var nav = document.querySelector("nav.nav");
    if (!nav) return; // not rendered yet — observer will call us again
    if (nav.querySelector("[data-academy-link]")) {
      done = true;
      return;
    }
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
    done = true;
  }

  function start() {
    injectAcademyLink();
    if (done) return;
    var observer = new MutationObserver(function () {
      injectAcademyLink();
      if (done) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Safety: stop watching after 30s regardless.
    setTimeout(function () {
      observer.disconnect();
    }, 30000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
