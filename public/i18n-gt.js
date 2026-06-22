/* Site-wide automatic translation via Google Translate, driven by a custom language picker.
   The chosen language is stored in the domain-wide `googtrans` cookie so it follows the
   visitor across every page/tab. Pages render in English; Google translates on the fly. */
(function () {
  var css = '.goog-te-banner-frame.skiptranslate{display:none!important}'
    + 'body{top:0!important}'
    + '.goog-text-highlight{background:none!important;box-shadow:none!important}'
    + '#goog-gt-tt,.goog-te-balloon-frame{display:none!important}'
    + '.goog-te-gadget{height:0!important;overflow:hidden!important;font-size:0!important}'
    + 'iframe.goog-te-banner-frame{visibility:hidden!important;height:0!important}';
  var st = document.createElement('style'); st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function mount() {
    var d = document.createElement('div');
    d.id = 'google_translate_element'; d.className = 'notranslate'; d.style.display = 'none';
    document.body.appendChild(d);
    window.googleTranslateElementInit = function () {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es,fr,zh-CN,hi', autoDisplay: false },
        'google_translate_element'
      );
    };
    var s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(s);
    sync();
  }
  window.jrCurrentLang = function () {
    var m = document.cookie.match(/googtrans=\/[^\/]*\/([\w-]+)/);
    return m ? m[1] : 'en';
  };
  window.jrSetLang = function (l) {
    var h = location.hostname.replace(/^www\./, '');
    var v = '/en/' + l;
    document.cookie = 'googtrans=' + v + ';path=/';
    document.cookie = 'googtrans=' + v + ';path=/;domain=.' + h;
    location.reload();
  };
  function sync() {
    try {
      var cur = window.jrCurrentLang();
      var sels = document.querySelectorAll('select[data-jr-lang]');
      for (var i = 0; i < sels.length; i++) sels[i].value = cur;
    } catch (e) {}
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
