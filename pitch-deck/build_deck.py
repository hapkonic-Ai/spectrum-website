"""Build spectrum-pitch-deck.pptx — 10-slide before/after sales deck."""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn
import copy

CREAM = RGBColor(0xF2, 0xF1, 0xEC)
PAPER = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x10, 0x10, 0x14)
COAL = RGBColor(0x17, 0x17, 0x1C)
BLUE = RGBColor(0x1D, 0x4D, 0xD8)
NAVY = RGBColor(0x1E, 0x3A, 0x8A)
MUTE = RGBColor(0x71, 0x71, 0x7A)
RED = RGBColor(0xB9, 0x1C, 0x1C)
GREEN = RGBColor(0x04, 0x78, 0x57)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GREY_D = RGBColor(0xC9, 0xC9, 0xD1)
TEAL = RGBColor(0x35, 0xC9, 0x9B)

DISPLAY = "Impact"
BODY = "Calibri"

SW, SH = Inches(13.333), Inches(7.5)
prs = Presentation()
prs.slide_width, prs.slide_height = SW, SH
BLANK = prs.slide_layouts[6]

SHOTS = "screenshots/"


def slide(bg=CREAM):
    s = prs.slides.add_slide(BLANK)
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    r.fill.solid()
    r.fill.fore_color.rgb = bg
    r.line.fill.background()
    r.shadow.inherit = False
    return s


def _set_font(run, size, bold=False, color=INK, font=BODY, italic=False, spacing=None):
    f = run.font
    f.size = Pt(size)
    f.bold = bold
    f.italic = italic
    f.name = font
    f.color.rgb = color
    if spacing is not None:
        f._rPr.set('spc', str(spacing))


def textbox(s, l, t, w, h, runs_list, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
            line_spacing=1.0, space_after=0):
    """runs_list: list of paragraphs; each paragraph = list of (text, kwargs) runs."""
    tb = s.shapes.add_textbox(l, t, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, runs in enumerate(runs_list):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = line_spacing
        if space_after:
            p.space_after = Pt(space_after)
        for text, kw in runs:
            r = p.add_run()
            r.text = text
            _set_font(r, **kw)
    return tb


def headline(s, parts, l=Inches(0.65), t=Inches(0.95), w=Inches(12), size=40, dark=False, align=PP_ALIGN.LEFT):
    base = WHITE if dark else INK
    runs = [[(txt, dict(size=size, bold=False, color=(color or base), font=DISPLAY, spacing=20)) for txt, color in parts]]
    return textbox(s, l, t, w, Inches(1.6), runs, align=align, line_spacing=0.98)


def kicker(s, text, dark=False, centered=False):
    color = RGBColor(0x93, 0xC5, 0xFD) if dark else NAVY
    l = Inches(0.65) if not centered else Inches(0.65)
    w = Inches(12.03)
    dot = s.shapes.add_shape(MSO_SHAPE.OVAL, l, Inches(0.52), Inches(0.1), Inches(0.1))
    dot.fill.solid(); dot.fill.fore_color.rgb = TEAL; dot.line.fill.background(); dot.shadow.inherit = False
    textbox(s, l + Inches(0.22), Inches(0.42), w, Inches(0.32),
            [[(text.upper(), dict(size=11.5, bold=True, color=color, spacing=300))]],
            align=PP_ALIGN.CENTER if centered else PP_ALIGN.LEFT)


def chip(s, l, t, text, dark=False, w=None):
    w = w or Inches(0.35 + 0.093 * len(text))
    sh = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, w, Inches(0.42))
    sh.adjustments[0] = 0.5
    sh.fill.solid()
    sh.fill.fore_color.rgb = COAL if dark else PAPER
    sh.line.color.rgb = RGBColor(0x3A, 0x3A, 0x44) if dark else RGBColor(0xDD, 0xDC, 0xD4)
    sh.line.width = Pt(0.75)
    sh.shadow.inherit = False
    tf = sh.text_frame
    tf.margin_left = tf.margin_right = Inches(0.12)
    tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run(); r.text = text
    _set_font(r, 11.5, bold=True, color=WHITE if dark else INK)
    return sh


def tag(s, l, t, text, color=BLUE):
    w = Inches(0.5 + 0.075 * len(text))
    sh = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, w, Inches(0.34))
    sh.adjustments[0] = 0.5
    sh.fill.solid(); sh.fill.fore_color.rgb = color
    sh.line.fill.background(); sh.shadow.inherit = False
    tf = sh.text_frame
    tf.margin_left = tf.margin_right = Inches(0.1)
    tf.margin_top = tf.margin_bottom = 0
    p = tf.paragraphs[0]; p.alignment = PP_ALIGN.CENTER
    r = p.add_run(); r.text = text.upper()
    _set_font(r, 9, bold=True, color=WHITE, spacing=150)


def shot(s, path, l, t, w, border=True, border_dark=False):
    h = Emu(int(w * 9 / 16))
    pic = s.shapes.add_picture(SHOTS + path, l, t, width=w, height=h)
    if border:
        pic.line.width = Pt(3)
        pic.line.color.rgb = RGBColor(0x2A, 0x2A, 0x33) if border_dark else WHITE
    return pic, h


def bullets(s, l, t, w, items, dark=False, size=14, gap=10, sub_size=10.5):
    sub_color = GREY_D if dark else MUTE
    paras = []
    for main, sub in items:
        paras.append([("•  ", dict(size=size, bold=True, color=TEAL)), (main, dict(size=size, bold=True, color=WHITE if dark else INK))])
        if sub:
            paras.append([("     " + sub, dict(size=sub_size, color=sub_color))])
    textbox(s, l, t, w, Inches(4.6), paras, line_spacing=1.08, space_after=gap if False else 0)


def notes(s, text):
    s.notes_slide.notes_text_frame.text = text


# ───────────────────────── SLIDE 1 · TITLE ─────────────────────────
s = slide()
kicker(s, "Website Revamp Proposal · 2026")
headline(s, [("A WEBSITE WORTHY OF ", None), ("35 YEARS", BLUE), (" OF", None),
             (" EXCELLENCE", None)], t=Inches(1.15), size=48, w=Inches(6.6))
textbox(s, Inches(0.65), Inches(3.85), Inches(6.2), Inches(1.0),
        [[("Spectrum Tution Point, Vellore — rebuilt as a modern, animated, "
           "admissions-driving experience for Classes 6–10.", dict(size=14, color=MUTE))]],
        line_spacing=1.25)
chip(s, Inches(0.65), Inches(4.85), "CBSE · ICSE · State Board")
chip(s, Inches(3.35), Inches(4.85), "Classes 6–10")
_, h = shot(s, "new-1-hero.png", Inches(7.15), Inches(1.7), Inches(5.55))
tag(s, Inches(7.45), Inches(1.5), "The new experience", BLUE)
notes(s, "Open with the promise, not the tech: 'You've spent 35 years building Spectrum's "
         "reputation; this proposal makes the website finally show it.' Let the hero screenshot "
         "do the talking. 30 seconds max.")

# ───────────────────────── SLIDE 2 · PROBLEM ─────────────────────────
s = slide()
kicker(s, "The Problem")
headline(s, [("YOUR CURRENT WEBSITE IS ", None), ("INVISIBLE", RED)], size=40)
_, h = shot(s, "old-1-hero.png", Inches(0.65), Inches(2.25), Inches(6.0))
tag(s, Inches(0.95), Inches(2.05), "Current site — live today", RED)
bullets(s, Inches(7.15), Inches(2.35), Inches(5.5), [
    ("Looks like a generic template", "The same as every competitor — parents can't tell Spectrum apart from a centre that started last year."),
    ("The headline itself fails to render", "The page reads 'Board-Specific .' — the most important sentence is broken."),
    ("Zero motion — the page feels abandoned", "A static page reads as 'this business isn't active' to a first-time parent."),
    ("Nothing guides a visitor toward admissions", None),
])
notes(s, "Be factual, not insulting — point at the screenshot and name what you see. Goal: 'the "
         "current site undersells Spectrum.' Pause after the broken-headline point and let them react.")

# ───────────────────── SLIDE 3 · COST OF INACTION ─────────────────────
s = slide(INK)
kicker(s, "Cost of Doing Nothing", dark=True)
headline(s, [("EVERY SILENT VISIT IS A ", None), ("LOST ADMISSION", TEAL)], size=40, dark=True)
bullets(s, Inches(0.65), Inches(2.35), Inches(5.9), [
    ("The entire call-to-action is a paragraph of text", "No form, no countdown, no phone button — interest evaporates."),
    ("Parents shortlist 3–4 centres online before visiting any", "The centre that looks alive and modern wins the walk-in."),
    ("A hoarding costs ₹20,000+ a month — and expires", "A website works 24/7 for every admission season, at ₹0/month."),
    ("One enrolment pays for this entire project", "Every admission is worth years of fees."),
], dark=True)
_, h = shot(s, "old-3-cta.png", Inches(7.0), Inches(2.25), Inches(5.65), border_dark=True)
tag(s, Inches(7.3), Inches(2.05), "The current 'call to action'", RED)
notes(s, "Anchor on what they already understand: print ads and hoardings. 'You already spend on "
         "visibility that expires. This is the one marketing asset that never expires.' Don't rush "
         "past the empty-space screenshot — it's the punchline.")

# ───────────────────────── SLIDE 4 · SOLUTION ─────────────────────────
s = slide()
kicker(s, "The New Experience")
headline(s, [("FIRST IMPRESSIONS NOW ", None), ("DO JUSTICE", BLUE), (" TO SPECTRUM", None)], size=38)
pic, h = shot(s, "new-1-hero.png", Inches(2.0), Inches(2.1), Inches(9.3))
tag(s, Inches(2.3), Inches(1.9), "New hero — fully animated", BLUE)
chip(s, Inches(2.55), Inches(2.1 + Emu(int(Inches(9.3) * 9 / 16)) - Inches(0.65)), "Floating subject pills")
chip(s, Inches(5.35), Inches(2.1 + Emu(int(Inches(9.3) * 9 / 16)) - Inches(0.65)), "Live 98.2% stat card")
chip(s, Inches(8.15), Inches(2.1 + Emu(int(Inches(9.3) * 9 / 16)) - Inches(0.65)), "Student energy, brand colours")
textbox(s, Inches(0.65), Inches(6.55), Inches(12), Inches(0.6),
        [[("Everything moves, pops and guides — it feels like a national brand, not a local flyer.",
           dict(size=14, color=MUTE))]], align=PP_ALIGN.CENTER)
notes(s, "One breath: 'Same information parents already need — presented the way their eyes want "
         "to receive it.' Describe the feeling; don't list features. If possible, open the live "
         "site and scroll the hero for them.")

# ───────────────────── SLIDE 5 · OLD VS NEW TABLE ─────────────────────
s = slide()
kicker(s, "Side by Side")
headline(s, [("OLD VS NEW — ", None), ("THE DIFFERENCE IS THE DETAILS", BLUE)], size=36)
_, h1 = shot(s, "old-2-why.png", Inches(0.65), Inches(2.05), Inches(2.9))
_, h2 = shot(s, "new-3-subjects.png", Inches(4.0), Inches(2.05), Inches(2.9))
tag(s, Inches(0.85), Inches(1.87), "Old: static section", RED)
tag(s, Inches(4.2), Inches(1.87), "New: interactive tabs", BLUE)
rows = [
    ("", "CURRENT WEBSITE", "NEW WEBSITE"),
    ("Design", "Generic template, dated", "Custom, editorial, brand-first"),
    ("Motion", "None — static page", "30+ animations, marquees, live counters"),
    ("Results & faculty", "Plain text lists", "Photo carousels with scores & credentials"),
    ("Admissions", "One paragraph of text", "Countdown + demo-class form + confirmation"),
    ("Editing", "Developer needed per change", "All content editable from one file"),
    ("Running cost", "Current hosting bills", "₹0/month hosting"),
]
tbl_shape = s.shapes.add_table(len(rows), 3, Inches(7.25), Inches(2.0), Inches(5.45), Inches(4.9))
tbl = tbl_shape.table
tbl.columns[0].width = Inches(1.35)
tbl.columns[1].width = Inches(2.0)
tbl.columns[2].width = Inches(2.1)
for ri, row in enumerate(rows):
    for ci, val in enumerate(row):
        cell = tbl.cell(ri, ci)
        cell.margin_left = Inches(0.08)
        cell.margin_right = Inches(0.06)
        cell.margin_top = cell.margin_bottom = Inches(0.03)
        cell.vertical_anchor = MSO_ANCHOR.MIDDLE
        cell.fill.solid()
        cell.fill.fore_color.rgb = PAPER if ri else RGBColor(0xEA, 0xE9, 0xE2)
        p = cell.text_frame.paragraphs[0]
        r = p.add_run(); r.text = val
        if ri == 0:
            _set_font(r, 9.5, bold=True, color=MUTE, spacing=140)
        elif ci == 0:
            _set_font(r, 11, bold=True, color=INK)
        elif ci == 1:
            _set_font(r, 10.5, color=RED)
        else:
            _set_font(r, 10.5, bold=True, color=GREEN)
textbox(s, Inches(0.65), Inches(5.35), Inches(6.2), Inches(1.4),
        [[("The point: ", dict(size=13, bold=True, color=INK)),
          ("same school, same fees, same faculty — but the new site makes Spectrum "
           "look like the obvious choice before a parent ever calls.", dict(size=13, color=MUTE))]],
        line_spacing=1.25)
notes(s, "Don't read the table row by row. Pick the two rows that stung earlier (motion, "
         "admissions) and let them scan the rest. The screenshots above the table carry the slide.")

# ───────────────────── SLIDE 6 · BUILT TO CONVERT ─────────────────────
s = slide(INK)
kicker(s, "Admissions Funnel", dark=True)
headline(s, [("EVERY SCROLL MOVES A PARENT CLOSER TO ", None), ("“BOOK A DEMO”", TEAL)], size=34, dark=True)
_, h = shot(s, "new-6-admissions.png", Inches(0.65), Inches(2.3), Inches(7.4), border_dark=True)
tag(s, Inches(0.95), Inches(2.1), "Live admissions section", BLUE)
bullets(s, Inches(8.45), Inches(2.4), Inches(4.2), [
    ("Live countdown to the deadline", "Urgency that text alone can't create."),
    ("Demo-class form with instant confirmation", "Interest is captured the moment it happens — not lost to 'call us later'."),
    ("Phone & WhatsApp one tap away, everywhere", None),
    ("Designed mobile-first", "Where parents actually browse."),
], dark=True, size=13)
notes(s, "Frame it as a machine: Interest → urgency → action → confirmation. The old page stops "
         "at interest. If asked about the form backend: connecting submissions to email/WhatsApp "
         "is a small add-on, quoted separately.")

# ───────────────────────── SLIDE 7 · TRUST ─────────────────────────
s = slide()
kicker(s, "Trust on Display")
headline(s, [("RESULTS AND MENTORS, ", None), ("FRONT AND CENTER", BLUE)], size=38)
_, h = shot(s, "new-5-results.png", Inches(0.65), Inches(2.3), Inches(7.4))
tag(s, Inches(0.95), Inches(2.1), "Topper carousels — auto-scrolling", BLUE)
bullets(s, Inches(8.45), Inches(2.4), Inches(4.2), [
    ("Toppers scroll by with photos & scores", "Proof beats claims — parents see faces, not a numbered list."),
    ("Faculty marquee with portraits & credentials", None),
    ("Parent reviews in an infinite wall", None),
    ("98.6% distinction story woven through the page", None),
], size=13)
notes(s, "This is Spectrum's 35-year moat made visible. One line: 'The reputation already exists — "
         "the new site finally displays it.' Real topper and faculty photos drop straight in later.")

# ───────────────────── SLIDE 8 · WHAT'S INCLUDED ─────────────────────
s = slide()
kicker(s, "Scope")
headline(s, [("EVERYTHING IS INCLUDED — ", None), ("ONE PACKAGE", BLUE)], size=40)
inc_l = ["14-section complete website", "Full custom motion design — hero, carousels, counters",
         "Mobile, tablet & desktop", "Your logo & brand colours throughout"]
inc_r = ["All current content, reorganised", "Demo-class enquiry form + countdown",
         "Hosting setup done for you — ₹0/month", "Handover docs + 15-min walkthrough"]
for col, items in enumerate((inc_l, inc_r)):
    paras = [[("✓  ", dict(size=15, bold=True, color=GREEN)), (it, dict(size=15, bold=True, color=INK))]
             for it in items]
    textbox(s, Inches(0.85 + col * 6.1), Inches(2.5), Inches(5.7), Inches(3.2), paras,
            line_spacing=1.15, space_after=16)
textbox(s, Inches(0.85), Inches(6.15), Inches(11.6), Inches(0.8),
        [[("Outside this package: ", dict(size=12.5, bold=True, color=INK)),
          ("the domain (~₹900/year, paid to the registrar) and future photo/content swaps.",
           dict(size=12.5, color=MUTE))]], line_spacing=1.2)
notes(s, "Naming what's excluded is deliberate — it prevents 'I thought that was included' later "
         "and quietly scopes the ₹15,000.")

# ───────────────────────── SLIDE 9 · PRICING ─────────────────────────
s = slide(INK)
kicker(s, "Investment", dark=True, centered=True)
headline(s, [("ONE-TIME INVESTMENT. ", None), ("ZERO MONTHLY COST.", TEAL)], size=38, dark=True,
         align=PP_ALIGN.CENTER, t=Inches(1.35))
textbox(s, Inches(0), Inches(2.75), SW, Inches(1.9),
        [[("₹ ", dict(size=36, bold=True, color=GREY_D, font=DISPLAY)),
          ("15,000", dict(size=110, color=BLUE, font=DISPLAY, spacing=20)),
          ("  one-time", dict(size=24, bold=True, color=GREY_D))]],
        align=PP_ALIGN.CENTER)
chip(s, Inches(2.0), Inches(5.0), "₹0 / month hosting — forever", dark=True)
chip(s, Inches(5.45), Inches(5.0), "Only ~₹900/yr domain", dark=True)
chip(s, Inches(8.4), Inches(5.0), "100% yours — full ownership", dark=True)
textbox(s, Inches(1.6), Inches(5.75), Inches(10.1), Inches(0.8),
        [[("A single hoarding costs more per month — and expires. This works every admission "
           "season, for years.", dict(size=13.5, color=GREY_D))]], align=PP_ALIGN.CENTER, line_spacing=1.3)
textbox(s, Inches(0), Inches(6.75), SW, Inches(0.4),
        [[("LAUNCH PRICING FOR SPECTRUM · 50% TO BEGIN, 50% AT GO-LIVE",
           dict(size=10.5, bold=True, color=RGBColor(0x8B, 0x8B, 0x95), spacing=200))]],
        align=PP_ALIGN.CENTER)
notes(s, "Say the number once, then stop talking. If there's silence, let it sit — the next person "
         "to speak makes the concession. The 50/50 line answers the budget question before it's asked.")

# ───────────────────────── SLIDE 10 · NEXT STEPS ─────────────────────────
s = slide()
kicker(s, "Next Steps")
headline(s, [("LIVE WITHIN ", None), ("DAYS", BLUE), (", NOT MONTHS", None)], size=40)
steps = [
    ("1", "Approve & share final content", "Real topper/faculty photos, current fees, contact numbers."),
    ("2", "We deploy & connect your domain", "Hosting, SSL, and the domain pointed to the new site."),
    ("3", "Go live + 15-minute handover walkthrough", "You see exactly how to update anything, anytime."),
]
y = 2.35
for num, title, sub in steps:
    textbox(s, Inches(0.85), Inches(y), Inches(0.8), Inches(0.8),
            [[(num, dict(size=40, color=BLUE, font=DISPLAY))]])
    textbox(s, Inches(1.75), Inches(y + 0.02), Inches(10.5), Inches(0.5),
            [[(title, dict(size=18, bold=True, color=INK))]])
    textbox(s, Inches(1.75), Inches(y + 0.48), Inches(10.5), Inches(0.4),
            [[(sub, dict(size=12.5, color=MUTE))]])
    y += 1.15
textbox(s, Inches(0.85), Inches(6.15), Inches(11.6), Inches(0.9),
        [[("35 YEARS OF TEACHING EXCELLENCE — NOW WITH A WEBSITE THAT SHOWS IT.",
           dict(size=20, color=NAVY, font=DISPLAY, spacing=20))]])
notes(s, "Close on emotion, then logistics. Hand over a one-page summary and ask directly: "
         "'Shall we start with the photos and fees?' An actual question — not 'let me know if "
         "you're interested.'")

out = "spectrum-pitch-deck.pptx"
prs.save(out)
print("saved", out, len(prs.slides.__iter__.__self__._sldIdLst), "slides")
