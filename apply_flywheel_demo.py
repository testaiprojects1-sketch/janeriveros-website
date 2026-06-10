#!/usr/bin/env python3
"""Patch public/index.html: EN default, Fly Wheel nav/section, live demo URLs."""

import re
from pathlib import Path

FILE = Path(__file__).parent / "public/index.html"

YOUTUBE_RUNTHROUGH = ""  # e.g. https://www.youtube.com/watch?v=XXXXXXXX

with open(FILE, encoding="utf-8") as f:
    html = f.read()

# SITE_LINKS before CONTENT
if "window.SITE_LINKS" not in html:
    html = html.replace(
        "window.CONTENT = {",
        'window.SITE_LINKS = {\n  youtubeRunthrough: '
        + (f'"{YOUTUBE_RUNTHROUGH}"' if YOUTUBE_RUNTHROUGH else '""')
        + ', // paste your YouTube runthrough URL here\n};\n\nwindow.CONTENT = {',
    )

# Nav flywheel link (all locales)
nav_insert = '\n        { id: "flywheel", label: "Fly Wheel", href: "#flywheel" },'
if 'id: "flywheel"' not in html:
    html = html.replace(
        '{ id: "book", label: "Book a call", href: "#contact" },',
        '{ id: "flywheel", label: "Fly Wheel", href: "#flywheel" },\n        { id: "book", label: "Book a call", href: "#contact" },',
    )
    html = html.replace(
        '{ id: "book", label: "Agendar llamada", href: "#contact" },',
        '{ id: "flywheel", label: "Fly Wheel", href: "#flywheel" },\n        { id: "book", label: "Agendar llamada", href: "#contact" },',
    )
    html = html.replace(
        '{ id: "book", label: "\\u9884\\u7ea6\\u901a\\u8bdd", href: "#contact" },',
        '{ id: "flywheel", label: "Fly Wheel", href: "#flywheel" },\n        { id: "book", label: "\\u9884\\u7ea6\\u901a\\u8bdd", href: "#contact" },',
    )
    html = html.replace(
        '{ id: "book", label: "\\u0915\\u0949\\u0932 \\u092c\\u0941\\u0915 \\u0915\\u0930\\u0947\\u0902", href: "#contact" },',
        '{ id: "flywheel", label: "Fly Wheel", href: "#flywheel" },\n        { id: "book", label: "\\u0915\\u0949\\u0932 \\u092c\\u0941\\u0915 \\u0915\\u0930\\u0947\\u0902", href: "#contact" },',
    )
    html = html.replace(
        '{ id: "book", label: "Réserver un appel", href: "#contact" },',
        '{ id: "flywheel", label: "Fly Wheel", href: "#flywheel" },\n        { id: "book", label: "Réserver un appel", href: "#contact" },',
    )

# closing.tapForDemo + flywheel section per locale
closing_patches = [
    (
        'gate: "GOVERNANCE GATE · SECURITY · QA · SANDBOX TO PRODUCTION",',
        'gate: "GOVERNANCE GATE · SECURITY · QA · SANDBOX TO PRODUCTION",\n      tapForDemo: "Tap for demo",',
    ),
    (
        'gate: "PUERTA DE GOBERNANZA · SEGURIDAD · QA · SANDBOX A PRODUCCIÓN",',
        'gate: "PUERTA DE GOBERNANZA · SEGURIDAD · QA · SANDBOX A PRODUCCIÓN",\n      tapForDemo: "Toca para ver demo",',
    ),
    (
        'gate: "\\u6cbb\\u7406\\u95e8\\u9600 \\u00b7 \\u5b89\\u5168 \\u00b7 QA \\u00b7 \\u6c99\\u7bb1\\u5230\\u751f\\u4ea7",',
        'gate: "\\u6cbb\\u7406\\u95e8\\u9600 \\u00b7 \\u5b89\\u5168 \\u00b7 QA \\u00b7 \\u6c99\\u7bb1\\u5230\\u751f\\u4ea7",\n      tapForDemo: "\\u70b9\\u51fb\\u67e5\\u770b\\u6f14\\u793a",',
    ),
    (
        'gate: "गवर्नेंस गेट · सुरक्षा · QA · सैंडबॉक्स से उत्पादन",',
        'gate: "गवर्नेंस गेट · सुरक्षा · QA · सैंडबॉक्स से उत्पादन",\n      tapForDemo: "डेमो के लिए टैप करें",',
    ),
    (
        'gate: "PORTE DE GOUVERNANCE \\u00b7 SECURITE \\u00b7 QA \\u00b7 SANDBOX A PRODUCTION",',
        'gate: "PORTE DE GOUVERNANCE \\u00b7 SECURITE \\u00b7 QA \\u00b7 SANDBOX A PRODUCTION",\n      tapForDemo: "Appuyer pour la demo",',
    ),
]

for old, new in closing_patches:
    if "tapForDemo" not in html[html.find(old) : html.find(old) + 200] if old in html else "":
        html = html.replace(old, new, 1)

flywheel_blocks = [
    (
        '    bands: {\n      boardroom: { tag: "// WHERE THE STANDARD CAME FROM"',
        '    flywheel: {\n      title: "Fly Wheel",\n      message: "Working on updates — please come back soon.",\n    },\n\n    bands: {\n      boardroom: { tag: "// WHERE THE STANDARD CAME FROM"',
    ),
    (
        '    bands: {\n      boardroom: { tag: "// DE DÓNDE VINO EL ESTÁNDAR"',
        '    flywheel: {\n      title: "Fly Wheel",\n      message: "Trabajando en actualizaciones — vuelve pronto.",\n    },\n\n    bands: {\n      boardroom: { tag: "// DE DÓNDE VINO EL ESTÁNDAR"',
    ),
    (
        '    bands: {\n      boardroom: { tag: "// \\u6807\\u51c6\\u7684\\u6765\\u6e90", line:',
        '    flywheel: {\n      title: "Fly Wheel",\n      message: "\\u6b63\\u5728\\u66f4\\u65b0\\u4e2d \\u2014 \\u8bf7\\u7a0d\\u540e\\u518d\\u6765\\u3002",\n    },\n\n    bands: {\n      boardroom: { tag: "// \\u6807\\u51c6\\u7684\\u6765\\u6e90", line:',
    ),
    (
        '    bands: {\n      boardroom: { tag: "// मानक कहां से आया"',
        '    flywheel: {\n      title: "Fly Wheel",\n      message: "अपडेट पर काम चल रहा है — कृपया जल्द वापस आएं।",\n    },\n\n    bands: {\n      boardroom: { tag: "// मानक कहां से आया"',
    ),
    (
        '    bands: {\n      boardroom: { tag: "// D\'OU VIENT LA NORME"',
        '    flywheel: {\n      title: "Fly Wheel",\n      message: "Mise a jour en cours — revenez bientot.",\n    },\n\n    bands: {\n      boardroom: { tag: "// D\'OU VIENT LA NORME"',
    ),
]

if 'flywheel: {' not in html:
    for old, new in flywheel_blocks:
        html = html.replace(old, new, 1)

# Post-process: attach demoUrl to live cards
if "function attachLiveDemoUrls" not in html:
    attach = """
// Attach YouTube demo URLs to LIVE kanban cards when configured.
(function attachLiveDemoUrls() {
  var url = (window.SITE_LINKS && window.SITE_LINKS.youtubeRunthrough) || "";
  if (!url) return;
  ["en", "es", "fr", "zh", "hi"].forEach(function (lang) {
    var closing = window.CONTENT[lang] && window.CONTENT[lang].closing;
    if (!closing || !closing.columns) return;
    var live = closing.columns.find(function (c) { return c.id === "live"; });
    if (!live || !live.cards) return;
    live.cards.forEach(function (card) { card.demoUrl = url; });
  });
})();
"""
    html = html.replace(
        "window.useLanguage = () => window.React.useContext(window.LanguageContext);\n\n</script>",
        "window.useLanguage = () => window.React.useContext(window.LanguageContext);\n" + attach + "\n</script>",
        1,
    )

with open(FILE, "w", encoding="utf-8") as f:
    f.write(html)

print("Content patches applied.")
