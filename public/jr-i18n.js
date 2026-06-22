/* In-voice i18n for the static pages (Fly Wheel, Blog index).
   - Language is stored in localStorage 'jr-lang' (shared with the React Home/Work app),
     so a visitor's choice follows them across every tab.
   - Page text is hand-translated: any element with data-i18n="key" is swapped from
     window.JR_T[lang][key]. Falls back to the element's existing (English) text.
   - Injects a globe picker into #jr-lang-mount. */
(function () {
  var LANGS = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "zh", label: "中文" },
    { code: "hi", label: "हिन्दी" }
  ];
  var SHORT = { en: "EN", es: "ES", fr: "FR", zh: "中文", hi: "हिन्दी" };

  function get() { try { return localStorage.getItem("jr-lang") || "en"; } catch (e) { return "en"; } }
  function set(l) { try { localStorage.setItem("jr-lang", l); } catch (e) {} }

  function apply(lang) {
    var dict = (window.JR_T && window.JR_T[lang]) || {};
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i], key = el.getAttribute("data-i18n");
      if (!el.hasAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", el.innerHTML);
      var en = el.getAttribute("data-i18n-en");
      el.innerHTML = (lang !== "en" && dict[key]) ? dict[key] : en;
    }
    document.documentElement.lang = (lang === "zh" ? "zh-CN" : lang);
    var lbl = document.getElementById("jr-lang-cur");
    if (lbl) lbl.textContent = SHORT[lang] || "EN";
  }

  function mountPicker() {
    var mount = document.getElementById("jr-lang-mount");
    if (!mount) return;
    var cur = get();
    var html = '<button id="jr-lang-btn" type="button" aria-haspopup="listbox" aria-expanded="false" title="Change language" '
      + 'style="display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,77,0,0.4);background:rgba(255,77,0,0.10);border-radius:9999px;padding:4px 10px;color:#EBEEF2;font:600 11px/1 \'IBM Plex Mono\',ui-monospace,monospace;letter-spacing:.12em;cursor:pointer">'
      + '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#FF4D00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><path d="M2 10h16M10 2a15 15 0 0 1 4 8 15 15 0 0 1-4 8 15 15 0 0 1-4-8 15 15 0 0 1 4-8z"/></svg>'
      + '<span id="jr-lang-cur">' + (SHORT[cur] || "EN") + '</span>'
      + '<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 4.5l3 3 3-3"/></svg></button>'
      + '<div id="jr-lang-menu" class="notranslate" role="listbox" style="display:none;position:absolute;right:0;top:calc(100% + 6px);min-width:150px;background:rgba(10,12,15,0.97);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:4px;box-shadow:0 12px 40px rgba(0,0,0,0.5);z-index:60">'
      + '<div style="padding:6px 10px 7px;border-bottom:1px solid rgba(255,255,255,0.08);font:600 8.5px/1 \'IBM Plex Mono\',monospace;letter-spacing:.14em;color:#5B6470;text-transform:uppercase">Language · Idioma · 语言</div>';
    for (var i = 0; i < LANGS.length; i++) {
      var L = LANGS[i], on = L.code === cur;
      html += '<button type="button" data-lang="' + L.code + '" role="option" style="display:flex;width:100%;align-items:center;justify-content:space-between;gap:16px;padding:7px 10px;background:transparent;border:0;text-align:left;cursor:pointer;font:500 12px/1 \'IBM Plex Mono\',monospace;color:' + (on ? "#FF4D00" : "#9BA3AD") + '">' + L.label + (on ? '<span style="width:6px;height:6px;border-radius:50%;background:#FF4D00"></span>' : '') + '</button>';
    }
    html += '</div>';
    mount.style.position = "relative";
    mount.className = (mount.className ? mount.className + " " : "") + "notranslate";
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
