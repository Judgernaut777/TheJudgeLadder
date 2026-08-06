/* AIJL Academy link — single source of truth for the webapp URL.
 *
 * The academy (full-stack webapp, source in ../app) is linked from every
 * page's nav, and index.html carries a featured section placeholder. While
 * ACADEMY_URL is empty both stay hidden, so the site never shows a dead
 * link. After publishing the app, set the URL below to its public address
 * (e.g. https://<name>.ok.kimi.link or a custom domain) and the links
 * appear site-wide on next deploy.
 *
 * The nav is rendered client-side by the dc-runtime, so we watch for it
 * with a MutationObserver rather than assuming it exists at load.
 */
window.AIJL_ACADEMY_URL = "";

(function () {
  var navDone = false;

  function injectAcademyLink() {
    if (navDone) return;
    var url = window.AIJL_ACADEMY_URL;
    if (!url) return;
    var nav = document.querySelector("nav.nav");
    if (!nav) return; // not rendered yet — observer will call us again
    if (nav.querySelector("[data-academy-link]")) {
      navDone = true;
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
    navDone = true;
  }

  // Featured section on the homepage: index.html contains
  // <div data-academy-section></div> where this block is rendered.
  function injectAcademySection() {
    var url = window.AIJL_ACADEMY_URL;
    if (!url) return;
    var host = document.querySelector("[data-academy-section]");
    if (!host || host.querySelector("[data-academy-block]")) return;

    var section = document.createElement("section");
    section.setAttribute("data-academy-block", "");
    section.setAttribute("data-screen-label", "Academy");
    section.style.cssText =
      "max-width: 1060px; margin: 0 auto; padding: 64px 24px;";

    var frame = document.createElement("div");
    frame.style.cssText =
      "border-top: 1px solid var(--color-text); border-bottom: 1px solid var(--color-text); padding: 40px 0; display: flex; flex-wrap: wrap; gap: 28px; align-items: center; justify-content: space-between;";

    var text = document.createElement("div");
    text.style.cssText = "max-width: 560px;";

    var kicker = document.createElement("div");
    kicker.textContent = "Learn by doing";
    kicker.style.cssText =
      "font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 10px;";

    var heading = document.createElement("h2");
    heading.textContent = "AIJL Academy";
    heading.style.cssText = "font-weight: 400; font-size: 30px; margin: 0 0 10px;";

    var body = document.createElement("p");
    body.textContent =
      "The framework as self-paced courses: one module per rung, with " +
      "quizzes and auto-scored gates that tell you when you're ready to " +
      "climb. Free, in your browser.";
    body.style.cssText =
      "margin: 0; font-size: 15px; line-height: 1.75; color: var(--color-neutral-600);";

    text.appendChild(kicker);
    text.appendChild(heading);
    text.appendChild(body);

    var cta = document.createElement("a");
    cta.href = url;
    cta.textContent = "Start the courses";
    cta.className = "btn btn-primary";
    cta.setAttribute(
      "title",
      "AIJL Academy — self-paced courses with auto-scored gates"
    );

    frame.appendChild(text);
    frame.appendChild(cta);
    section.appendChild(frame);
    host.appendChild(section);
  }

  function start() {
    injectAcademyLink();
    injectAcademySection();
    if (navDone) return;
    var observer = new MutationObserver(function () {
      injectAcademyLink();
      if (navDone) observer.disconnect();
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
