/* Unified i18n for static pages.
   - Hand translations: elements with data-i18n="key" swap from BASE[lang] (nav/footer chrome,
     shared by every page) merged with window.JR_T[lang] (page-specific). English is the fallback.
   - Article auto-translate: if window.JR_ARTICLE is an element id, that element's innerHTML is
     translated on demand via /api/translate (Google), cached in localStorage.
   - Language is stored in localStorage 'jr-lang' (shared with the React Home/Work app) so the
     choice follows the visitor across every tab. Injects a globe picker into #jr-lang-mount. */
(function () {
  var LANGS = [
    { code: "en", label: "English" }, { code: "es", label: "Español" },
    { code: "fr", label: "Français" }, { code: "zh", label: "中文" }, { code: "hi", label: "हिन्दी" }
  ];
  var SHORT = { en: "EN", es: "ES", fr: "FR", zh: "中文", hi: "हिन्दी" };
  var GAPI = { en: "en", es: "es", fr: "fr", zh: "zh-CN", hi: "hi" };
  var BASE = {
    es: { "nav.home": "Inicio", "nav.work": "Proyectos", "nav.blog": "Blog", "nav.book": "Agendar llamada", "footer.loc": "Jane Riveros · Santiago, CL" },
    fr: { "nav.home": "Accueil", "nav.work": "Projets", "nav.blog": "Blog", "nav.book": "Réserver un appel", "footer.loc": "Jane Riveros · Santiago, CL" },
    zh: { "nav.home": "首页", "nav.work": "项目", "nav.blog": "博客", "nav.book": "预约通话", "footer.loc": "Jane Riveros · 圣地亚哥，智利" },
    hi: { "nav.home": "होम", "nav.work": "कार्य", "nav.blog": "ब्लॉग", "nav.book": "कॉल बुक करें", "footer.loc": "Jane Riveros · सैंटियागो, चिली" }
  };
  function get() { try { return localStorage.getItem("jr-lang") || "en"; } catch (e) { return "en"; } }
  function set(l) { try { localStorage.setItem("jr-lang", l); } catch (e) {} }
  function dictFor(lang) { var b = BASE[lang] || {}, p = (window.JR_T && window.JR_T[lang]) || {}, m = {}, k; for (k in b) m[k] = b[k]; for (k in p) m[k] = p[k]; return m; }

  function applyHand(lang) {
    var dict = dictFor(lang), nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], key = el.getAttribute("data-i18n");
      if (!el.hasAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", el.innerHTML);
      var en = el.getAttribute("data-i18n-en");
      el.innerHTML = (lang !== "en" && dict[key]) ? dict[key] : en;
    }
  }
  var origArticle = null;
  function applyArticle(lang) {
    var id = window.JR_ARTICLE; if (!id) return;
    var el = document.getElementById(id); if (!el) return;
    if (origArticle === null) origArticle = el.innerHTML;
    if (lang === "en") { el.innerHTML = origArticle; return; }
    var ck = "jrtr:" + location.pathname + ":" + lang, c = null;
    try { c = localStorage.getItem(ck); } catch (e) {}
    if (c) { el.innerHTML = c; return; }
    el.style.transition = "opacity .2s"; el.style.opacity = "0.45";
    fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ q: [origArticle], target: GAPI[lang] || lang, format: "html" }) })
      .then(function (r) { return r.json(); })
      .then(function (d) { if (d && d.translations && d.translations[0]) { el.innerHTML = d.translations[0]; try { localStorage.setItem(ck, d.translations[0]); } catch (e) {} } })
      .catch(function () {})
      .then(function () { el.style.opacity = ""; });
  }
  function apply(lang) {
    applyHand(lang);
    document.documentElement.lang = (lang === "zh" ? "zh-CN" : lang);
    var lbl = document.getElementById("jr-lang-cur"); if (lbl) lbl.textContent = SHORT[lang] || "EN";
    applyArticle(lang);
  }

  function mountPicker() {
    var mount = document.getElementById("jr-lang-mount"); if (!mount) return;
    var cur = get();
    var html = '<button id="jr-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false" title="Change language" '
      + 'style="display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,77,0,0.4);background:rgba(255,77,0,0.10);border-radius:9999px;padding:4px 10px;color:#EBEEF2;font:600 11px/1 \'IBM Plex Mono\',ui-monospace,monospace;letter-spacing:.12em;cursor:pointer">'
      + '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#FF4D00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M2 10h16M10 2a15 15 0 0 1 4 8 15 15 0 0 1-4 8 15 15 0 0 1-4-8 15 15 0 0 1 4-8z"/></svg>'
      + '<span id="jr-lang-cur">' + (SHORT[cur] || "EN") + '</span>'
      + '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 4.5l3 3 3-3"/></svg></button>'
      + '<div id="jr-lang-menu" role="listbox" style="display:none;position:absolute;right:0;top:calc(100% + 6px);min-width:150px;background:rgba(10,12,15,0.97);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:4px;box-shadow:0 12px 40px rgba(0,0,0,0.5);z-index:60">'
      + '<div style="padding:6px 10px 7px;border-bottom:1px solid rgba(255,255,255,0.08);font:600 8.5px/1 \'IBM Plex Mono\',monospace;letter-spacing:.14em;color:#5B6470;text-transform:uppercase">Language · Idioma · 语言</div>';
    for (var i = 0; i < LANGS.length; i++) {
      var L = LANGS[i], on = L.code === cur;
      html += '<button type="button" data-lang="' + L.code + '" role="option" style="display:flex;width:100%;align-items:center;justify-content:space-between;gap:16px;padding:7px 10px;background:transparent;border:0;text-align:left;cursor:pointer;font:500 12px/1 \'IBM Plex Mono\',monospace;color:' + (on ? "#FF4D00" : "#9BA3AD") + '">' + L.label + (on ? '<span style="width:6px;height:6px;border-radius:50%;background:#FF4D00"></span>' : '') + '</button>';
    }
    html += '</div>';
    mount.style.position = "relative";
    mount.innerHTML = html;
    var btn = document.getElementById("jr-lang-btn"), menu = document.getElementById("jr-lang-menu");
    btn.addEventListener("click", function (e) { e.stopPropagation(); var open = menu.style.display === "block"; menu.style.display = open ? "none" : "block"; btn.setAttribute("aria-expanded", String(!open)); });
    document.addEventListener("click", function (e) { if (!mount.contains(e.target)) menu.style.display = "none"; });
    menu.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { var l = b.getAttribute("data-lang"); set(l); apply(l); mountPicker(); });
    });
  }
  function init() { apply(get()); mountPicker(); }
  if (document.readyState !== "loading") init(); else document.addEventListener("DOMContentLoaded", init);
})();
