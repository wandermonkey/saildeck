/**
 * Renders the Saildeck Instagram ad set to PNG with headless Chrome.
 *   node scripts/instagram-ads/build.js            (all)
 *   node scripts/instagram-ads/build.js carousel   (only names containing "carousel")
 * Output: marketing/instagram-ads/*.png — copy lives in the `ads` list below.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "../..");
const outDir = path.join(root, "marketing/instagram-ads");
const tmpDir = path.join(outDir, ".html");
fs.mkdirSync(tmpDir, { recursive: true });

const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find((p) => fs.existsSync(p));

const url = (rel) => "file:///" + path.join(root, rel).replace(/\\/g, "/");
const F = "public/images/fleet/";
const P = {
  taraSunset: F + "tara-sailing-catamaran/tara-catamaran-sunset-party.png",
  tajSail: F + "taanti/taanti-sailing-yacht-mumbai-taj-mahal-palace-backdrop.webp",
  tajWide: F + "taanti/taanti-sailing-yacht-mumbai-gateway-of-india-taj.webp",
  princessGold: "Fleet and Products/Princess 61/Princess 61 Luxury Motor Yacht Mumbai/Princess 61 Luxury Motor Yacht Mumbai (2).JPG",
  balloons: F + "tikla-queen/tikla-queen-balloons-sailing.jpg",
  marryMe: F + "5-pax-sailing-boat/5-pax-sailing-boat-marry-me.webp",
  iLoveU: F + "5-pax-sailing-boat/5-pax-sailing-boat-iloveu-sunset.webp",
};
const SIZES = { feed: [1080, 1350], story: [1080, 1920], square: [1080, 1080] };
const WA = "+91 84248 48489";

/* ---------- shared bits ---------- */
const mark = (dark) =>
  `<div class="mark ${dark ? "dark" : ""}"><svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 2 L12 18 L4 18 Z" fill="currentColor"/><path d="M13.5 5 L20 18 L13.5 18 Z" fill="#e0526b"/><path d="M2 20 Q12 24 22 20" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>SAILDECK</div>`;
const waIcon = `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.4 1.3-2 1.4-.5 0-1 .3-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.7-.1 1.3Z"/></svg>`;
const cta = (label, opts = {}) =>
  `<div class="cta ${opts.light ? "light" : ""}"><span class="btn">${waIcon}<span>${label}</span></span><span class="num">${WA}</span></div>`;

const baseCss = (w, h) => `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{font-family:Inter,system-ui,sans-serif;color:#fff;background:#061c2e;position:relative;-webkit-font-smoothing:antialiased}
.abs{position:absolute;inset:0}
.ph{position:absolute;inset:0;background-size:cover;background-repeat:no-repeat}
.serif{font-family:"Playfair Display",Georgia,serif}
.hand{font-family:Caveat,cursive}
.mark{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.3em;font-size:24px;color:#fff}
.mark.dark{color:#0a2a43}
.cta{display:flex;align-items:center;gap:22px}
.btn{display:inline-flex;align-items:center;gap:14px;background:#a80b28;color:#fff;font-weight:700;font-size:30px;padding:24px 38px;border-radius:999px;box-shadow:0 14px 34px -12px rgba(168,11,40,.75)}
.btn svg{font-size:36px}
.num{font-size:26px;font-weight:600;opacity:.9}
.cta.light .num{color:#0a2a43}
`;

/* ---------- layouts ---------- */
const layouts = {
  // Fake group chat on top, the photo below it, CTA at the bottom.
  chat(ad, w, h) {
    const story = h > 1500;
    const photoH = Math.round(w * (story ? 0.75 : 0.6));
    const bubbles = ad.chat
      .map(([who, text, name], i) => `<div class="b ${who}" style="animation-delay:${i}s">${name ? `<em>${name}</em>` : ""}${text}</div>`)
      .join("");
    return {
      css: `
      body{background:#0b1d2b}
      .top{position:absolute;left:0;right:0;top:0;height:${h - photoH}px;padding:${story ? 230 : 70}px 64px 0;background:radial-gradient(120% 100% at 0% 0%,#14415f,#0a2a43 55%,#061c2e)}
      .head{display:flex;align-items:center;gap:18px;padding-bottom:26px;margin-bottom:${story ? 40 : 30}px;border-bottom:1px solid rgba(255,255,255,.12)}
      .av{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#e0526b,#a80b28);display:grid;place-items:center;font-size:32px}
      .gname{font-weight:700;font-size:30px}.gsub{font-size:22px;opacity:.6;margin-top:2px}
      .chat{display:flex;flex-direction:column;gap:${story ? 20 : 14}px}
      .b{max-width:78%;font-size:${story ? 38 : 33}px;line-height:1.3;padding:${story ? "20px 28px" : "16px 24px"};border-radius:30px;font-weight:500}
      .b em{display:block;font-style:normal;font-size:20px;font-weight:700;color:#7fd3d3;margin-bottom:4px}
      .them{background:#1f3e57;align-self:flex-start;border-bottom-left-radius:8px}
      .me{background:#a80b28;align-self:flex-end;border-bottom-right-radius:8px}
      .me.big{font-size:${story ? 48 : 42}px;font-weight:800}
      .photo{position:absolute;left:0;right:0;bottom:0;height:${photoH}px;background:url('${url(ad.photo)}') ${ad.pos || "center"}/cover}
      .photo::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,#061c2e 0%,rgba(6,28,46,0) 22%,rgba(6,28,46,0) 55%,rgba(6,28,46,.85) 100%)}
      .bottom{position:absolute;left:64px;right:64px;bottom:${story ? 330 : 64}px;display:flex;justify-content:space-between;align-items:flex-end}
      .tag{font-family:"Playfair Display",serif;font-size:${story ? 64 : 54}px;line-height:1.05;font-weight:600;text-shadow:0 2px 20px rgba(0,0,0,.35)}
      .tag i{font-weight:500}
      .stamp{position:absolute;right:64px;top:${story ? 236 : 76}px}`,
      body: `
      <div class="top">
        <div class="head"><div class="av">🎉</div><div><div class="gname">${ad.group}</div><div class="gsub">${ad.groupSub}</div></div></div>
        <div class="chat">${bubbles}</div>
      </div>
      <div class="photo"></div>
      <div class="bottom"><div><div class="tag">${ad.title}</div><div style="margin-top:26px">${cta(ad.cta)}</div></div></div>`,
    };
  },

  // Boarding pass on cream, photo inset at the top of the ticket.
  ticket(ad, w, h) {
    return {
      css: `
      body{background:#efe6d8}
      body::before{content:"";position:absolute;inset:0;background:radial-gradient(80% 60% at 50% 0%,#f8f1e6,transparent)}
      .wrap{position:absolute;inset:0;padding:56px 60px;display:flex;flex-direction:column}
      .hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px}
      .hdr .k{font-size:22px;font-weight:700;letter-spacing:.2em;color:#a80b28}
      .t{background:#fff;border-radius:34px;box-shadow:0 30px 60px -30px rgba(10,42,67,.45);overflow:hidden;position:relative;color:#0a2a43}
      .t .img{height:560px;background:url('${url(ad.photo)}') ${ad.pos}/cover}
      .t .body{padding:34px 44px 30px}
      .route{display:flex;align-items:center;justify-content:space-between}
      .route .c{font-family:"Playfair Display",serif;font-size:58px;font-weight:600;line-height:1}
      .route .s{font-size:19px;font-weight:700;letter-spacing:.16em;color:#8b9aa6;margin-bottom:10px;text-transform:uppercase}
      .route .r{text-align:right}
      .route .mid{flex:1;margin:34px 28px 0;border-top:3px dashed #c7d3dc;position:relative}
      .route .mid span{position:absolute;left:50%;top:-26px;transform:translateX(-50%);background:#fff;padding:0 12px;font-size:36px}
      .perf{position:relative;height:0;border-top:3px dashed #e3eaef;margin:28px -44px}
      .perf::before,.perf::after{content:"";position:absolute;top:-24px;width:46px;height:46px;border-radius:50%;background:#efe6d8}
      .perf::before{left:-23px}.perf::after{right:-23px}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px 20px}
      .grid .s{font-size:17px;font-weight:700;letter-spacing:.16em;color:#8b9aa6;text-transform:uppercase;margin-bottom:6px}
      .grid .v{font-size:27px;font-weight:700}
      .grid .v.hl{color:#a80b28}
      .head2{margin-top:auto;color:#0a2a43}
      .head2 h1{font-family:"Playfair Display",serif;font-size:76px;line-height:1.04;font-weight:600}
      .head2 h1 i{color:#a80b28;font-weight:500}
      .head2 .row{display:flex;align-items:center;justify-content:space-between;margin-top:26px}`,
      body: `
      <div class="wrap">
        <div class="hdr">${mark(true)}<span class="k">BOARDING PASS</span></div>
        <div class="t">
          <div class="img"></div>
          <div class="body">
            <div class="route">
              <div><div class="s">From</div><div class="c">Gateway</div></div>
              <div class="mid"><span>⛵</span></div>
              <div class="r"><div class="s">To</div><div class="c">Golden hour</div></div>
            </div>
            <div class="perf"></div>
            <div class="grid">
              <div><div class="s">Departs</div><div class="v">6:00 PM</div></div>
              <div><div class="s">Crew</div><div class="v">Included</div></div>
              <div><div class="s">Seat</div><div class="v hl">Anywhere</div></div>
            </div>
          </div>
        </div>
        <div class="head2"><h1>${ad.title}</h1><div class="row">${cta(ad.cta, { light: true })}</div></div>
      </div>`,
    };
  },

  // Full-bleed photo with a handwritten checklist card.
  checklist(ad, w, h) {
    const story = h > 1500;
    return {
      css: `
      .ph{background-image:url('${url(ad.photo)}');background-position:${ad.pos}}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,28,46,.55),rgba(6,28,46,0) 18%,rgba(6,28,46,0) 50%,rgba(6,28,46,.9))}
      .top{position:absolute;top:${story ? 240 : 56}px;left:60px;right:60px;display:flex;justify-content:space-between}
      .note{position:absolute;right:60px;top:${story ? 340 : 130}px;width:${story ? 640 : 560}px;background:#fffdf7;color:#17242f;border-radius:10px;padding:36px 40px 30px;transform:rotate(3deg);box-shadow:0 30px 50px -20px rgba(0,0,0,.55)}
      .note::before{content:"";position:absolute;top:-18px;left:50%;transform:translateX(-50%) rotate(2deg);width:150px;height:38px;background:rgba(224,82,107,.55)}
      .note h3{font-family:Caveat,cursive;font-size:${story ? 66 : 58}px;line-height:1;color:#a80b28;margin-bottom:16px}
      .item{display:flex;align-items:flex-start;gap:18px;font-family:Caveat,cursive;font-size:${story ? 50 : 44}px;line-height:1.15;margin:8px 0}
      .box{flex:none;width:40px;height:40px;border:3px solid #17242f;border-radius:6px;margin-top:6px;position:relative}
      .box::after{content:"✓";position:absolute;left:3px;top:-22px;font-size:56px;color:#a80b28;font-family:Caveat,cursive;font-weight:700}
      .item.last{color:#a80b28;font-weight:700}
      .foot{position:absolute;left:60px;right:60px;bottom:${story ? 330 : 64}px}
      .foot h1{font-family:"Playfair Display",serif;font-size:${story ? 74 : 62}px;line-height:1.04;font-weight:600;margin-bottom:28px;text-shadow:0 2px 20px rgba(0,0,0,.4)}
      .foot h1 i{font-weight:500}`,
      body: `
      <div class="ph"></div><div class="shade"></div>
      <div class="top">${mark()}</div>
      <div class="note"><h3>${ad.noteTitle}</h3>${ad.items
        .map((t, i) => `<div class="item ${i === ad.items.length - 1 ? "last" : ""}"><span class="box"></span><span>${t}</span></div>`)
        .join("")}</div>
      <div class="foot"><h1>${ad.title}</h1>${cta(ad.cta)}</div>`,
    };
  },

  // Big photo, big headline in the sky, CTA at the bottom.
  hero(ad, w, h) {
    const story = h > 1500;
    const sq = w === h;
    return {
      css: `
      .ph{background-image:url('${url(ad.photo)}');background-position:${ad.pos}}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,28,46,${ad.topShade ?? 0.6}) 0%,rgba(6,28,46,0) ${story ? 38 : 42}%,rgba(6,28,46,0) ${ad.cta ? 62 : 72}%,rgba(6,28,46,${ad.cta || ad.bottom ? 0.85 : 0.6}) 100%)}
      .top{position:absolute;top:${story ? 240 : 56}px;left:64px;right:64px}
      .eb{margin-top:${story ? 56 : 44}px;font-size:${story ? 28 : 24}px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ffd7de}
      h1{margin-top:16px;font-family:"Playfair Display",serif;font-weight:600;font-size:${ad.titleSize || (story ? 112 : sq ? 88 : 100)}px;line-height:1;letter-spacing:-.015em;text-shadow:0 4px 30px rgba(0,0,0,.35)}
      h1 i{font-weight:500}
      .sub{margin-top:24px;font-size:${story ? 36 : 30}px;line-height:1.35;max-width:880px;opacity:.95;text-shadow:0 1px 12px rgba(0,0,0,.45)}
      .foot{position:absolute;left:64px;right:64px;bottom:${story ? 330 : 60}px}
      .swipe{position:absolute;right:64px;bottom:60px;font-family:Caveat,cursive;font-size:50px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.5)}
      .pill{display:inline-block;font-family:Inter,sans-serif;background:rgba(255,255,255,.95);color:#0a2a43;font-weight:800;font-size:22px;letter-spacing:.14em;padding:12px 22px;border-radius:999px}
      .bigq{font-family:"Playfair Display",serif;font-size:62px;line-height:1.05;font-weight:600;text-shadow:0 2px 20px rgba(0,0,0,.45)}
      .bigq i{font-weight:500}`,
      body: `
      <div class="ph"></div><div class="shade"></div>
      <div class="top">${mark()}${ad.pill ? `<div style="margin-top:34px"><span class="pill">${ad.pill}</span></div>` : ""}${ad.eyebrow ? `<div class="eb">${ad.eyebrow}</div>` : ""}<h1>${ad.title}</h1>${ad.sub ? `<div class="sub">${ad.sub}</div>` : ""}</div>
      ${ad.bottom ? `<div class="foot"><div class="bigq">${ad.bottom}</div></div>` : ""}
      ${ad.cta ? `<div class="foot">${ad.footText ? `<div class="sub" style="margin:0 0 26px">${ad.footText}</div>` : ""}${cta(ad.cta)}</div>` : ""}
      ${ad.swipe ? `<div class="swipe">${ad.swipe}</div>` : ""}`,
    };
  },

  // Solid brand card for the end of the carousel.
  endcard(ad) {
    return {
      css: `
      body{background:#a80b28}
      body::before{content:"";position:absolute;inset:0;background:radial-gradient(90% 80% at 100% 0%,#c8203f,transparent 60%),radial-gradient(70% 70% at 0% 100%,#6d0418,transparent 70%)}
      .wrap{position:absolute;inset:0;padding:64px;display:flex;flex-direction:column}
      h1{font-family:"Playfair Display",serif;font-size:96px;line-height:1;font-weight:600;margin-top:auto}
      h1 i{font-weight:500}
      ul{list-style:none;margin:38px 0 44px;display:grid;gap:14px}
      li{font-size:32px;font-weight:600;display:flex;gap:16px;align-items:center}
      li::before{content:"✓";width:42px;height:42px;border-radius:50%;background:#fff;color:#a80b28;display:grid;place-items:center;font-size:24px;font-weight:900}
      .btn{background:#fff;color:#a80b28;box-shadow:0 14px 34px -12px rgba(0,0,0,.45)}`,
      body: `<div class="wrap">${mark()}<h1>${ad.title}</h1><ul>${ad.items.map((i) => `<li>${i}</li>`).join("")}</ul>${cta(ad.cta)}</div>`,
    };
  },
};

/* ---------- the ad set ---------- */
const ads = [
  // FEED 4:5
  {
    file: "feed-1-group-chat", size: "feed", layout: "chat", photo: P.taraSunset, pos: "center 60%",
    group: "Saturday plans 🌅", groupSub: "Anika, Kabir, Zoya, you",
    chat: [
      ["them", "ok what are we doing this weekend", "Kabir"],
      ["them", "same rooftop again? 😴", "Zoya"],
      ["me", "what about a yacht at sunset ⛵"],
      ["them", "WAIT CAN WE?? 😍", "Anika"],
    ],
    title: "Be the friend<br><i>with the plan.</i>", cta: "Book the sunset",
  },
  {
    file: "feed-2-boarding-pass", size: "feed", layout: "ticket", photo: P.tajWide, pos: "center 62%",
    title: "Your ticket to Mumbai's <i>best view.</i>", cta: "Book on WhatsApp",
  },
  {
    file: "feed-3-proposal", size: "feed", layout: "checklist", photo: P.marryMe, pos: "center 30%",
    noteTitle: "The proposal plan 💍", items: ["The ring", "The speech", "The yacht, roses &amp; sunset"],
    title: "You bring the ring.<br><i>We'll bring the sea.</i>", cta: "Plan the moment",
  },
  {
    file: "feed-4-luxury", size: "feed", layout: "hero", photo: P.princessGold, pos: "center 88%", topShade: 0.5, titleSize: 80,
    eyebrow: "Private yacht charters · Mumbai",
    title: "The best table in Mumbai<br><i>has no walls.</i>", cta: "Reserve your yacht",
  },

  // STORIES 9:16 (text kept out of the top 250px and bottom 340px)
  {
    file: "story-1-taj", size: "story", layout: "hero", photo: P.tajSail, pos: "38% center", topShade: 0.3, titleSize: 98,
    title: "Mumbai's best view<br><i>isn't from a rooftop.</i>",
    footText: "Private sailing from the Gateway of India. Skipper included — you just relax.", cta: "Book on WhatsApp",
  },
  {
    file: "story-2-group-chat", size: "story", layout: "chat", photo: P.taraSunset, pos: "center 60%",
    group: "Saturday plans 🌅", groupSub: "Anika, Kabir, Zoya, you",
    chat: [
      ["them", "ok what are we doing this weekend", "Kabir"],
      ["them", "same rooftop again? 😴", "Zoya"],
      ["me", "what about a yacht at sunset ⛵"],
      ["them", "WAIT CAN WE?? 😍", "Anika"],
      ["me big", "booked. 6pm. 🥂"],
    ],
    title: "Be the friend<br><i>with the plan.</i>", cta: "Book the sunset",
  },
  {
    file: "story-3-luxury", size: "story", layout: "hero", photo: P.princessGold, pos: "center", topShade: 0.3,
    eyebrow: "Private yacht charters · Mumbai",
    title: "Arrive like<br><i>you mean it.</i>",
    footText: "Motor yachts and catamarans for birthdays, anniversaries and team days out.", cta: "Get a quote",
  },
  {
    file: "story-4-proposal", size: "story", layout: "checklist", photo: P.marryMe, pos: "center",
    noteTitle: "The proposal plan 💍", items: ["The ring", "The speech", "The yacht, roses &amp; sunset"],
    title: "You bring the ring.<br><i>We'll bring the sea.</i>", cta: "Plan the moment",
  },

  // CAROUSEL 1:1
  {
    file: "carousel-1", size: "square", layout: "hero", photo: P.tajSail, pos: "center 62%", topShade: 0.3,
    title: "Bored of<br><i>rooftops?</i>", sub: "5 Mumbai plans that hit different on the water.", swipe: "swipe →",
  },
  {
    file: "carousel-2", size: "square", layout: "hero", photo: P.balloons, pos: "68% center", topShade: 0.45,
    pill: "01 · BIRTHDAYS", title: "Cake. Balloons.<br><i>A whole harbour.</i>", swipe: "→",
  },
  {
    file: "carousel-3", size: "square", layout: "hero", photo: P.iLoveU, pos: "center 62%", topShade: 0.55,
    pill: "02 · PROPOSALS", title: "The yes they'll<br><i>never forget.</i>", swipe: "→",
  },
  {
    file: "carousel-4", size: "square", layout: "hero", photo: P.taraSunset, pos: "center 60%", topShade: 0.65,
    pill: "03 · SUNDOWNERS", title: "Golden hour,<br><i>with the squad.</i>", swipe: "→",
  },
  {
    file: "carousel-5", size: "square", layout: "hero", photo: P.princessGold, pos: "center 52%", topShade: 0.3, title: "",
    bottom: '<span class="pill">04 · THE BIG ONES</span><div style="margin-top:18px;font-size:88px;line-height:1">Milestones deserve<br><i>a yacht.</i></div>', swipe: "→",
  },
  {
    file: "carousel-6", size: "square", layout: "endcard",
    title: "Pick a date.<br><i>We'll handle the rest.</i>",
    items: ["Captain & crew included", "Basic decor included", "No sailing experience needed"],
    cta: "Book on WhatsApp",
  },
];

const fonts =
  '<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;1,500&display=block" rel="stylesheet">';

const only = process.argv[2];
for (const ad of ads) {
  if (only && !ad.file.includes(only)) continue;
  const [w, h] = SIZES[ad.size];
  const { css, body } = layouts[ad.layout](ad, w, h);
  const htmlPath = path.join(tmpDir, ad.file + ".html");
  fs.writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8">${fonts}<style>${baseCss(w, h)}${css}</style></head><body>${body}</body></html>`);
  const png = path.join(outDir, ad.file + ".png");
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
    "--force-device-scale-factor=1", `--window-size=${w},${h}`, "--virtual-time-budget=10000",
    `--screenshot=${png}`, "file:///" + htmlPath.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("✓", path.relative(root, png));
}
