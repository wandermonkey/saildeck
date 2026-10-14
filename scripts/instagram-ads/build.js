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
// Set 2 photos (from the marketing Drive). "ai-" files are AI-generated — see CAPTIONS.md.
const S = "marketing/instagram-ads/source/";
const P2 = {
  aiSailGateway: S + "ai-sailboat-gateway-golden.png",
  aiCoupleGateway: S + "ai-couple-gateway-sunset.png",
  aiParty: S + "ai-group-party-sunset-bridge.png",
  princessTaj: S + "princess-lifescapes-taj-gateway.jpg",
  motorYachtTaj: S + "motor-yacht-blue-sky-taj.jpg",
  coupleBow: S + "couple-bow-sunset-vertical.jpg",
  coupleSunset: S + "couple-yacht-sunset-landscape.webp",
  coupleToast: S + "couple-toast-sail-mumbai.jpg",
  sailingPink: S + "sailing-pink-top-mumbai.jpg",
  goaGirls: S + "goa-girls-group-white.jpg",
  goaYellow: S + "goa-yellow-dress-bow.jpg",
  goaRed: S + "goa-red-dress-sunpad.jpg",
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
      .ph{background-image:url('${url(ad.photo)}');background-position:${ad.pos}${ad.bgSize ? `;background-size:${ad.bgSize}` : ""}}
      .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,28,46,${ad.topShade ?? 0.6}) 0%,rgba(6,28,46,0) ${story ? 38 : 42}%,rgba(6,28,46,0) ${ad.cta ? (story ? 46 : 62) : 72}%,rgba(6,28,46,${ad.cta || ad.bottom ? 0.85 : 0.6}) ${ad.cta && story ? 72 : 100}%,rgba(6,28,46,${ad.cta || ad.bottom ? 0.92 : 0.6}) 100%)}
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

  // "Your weekend" struck-through list on grey, the upgrade photo below.
  compare(ad, w, h) {
    const topH = 500;
    return {
      css: `
      body{background:#e7e4df}
      .top{position:absolute;left:0;right:0;top:0;height:${topH}px;padding:56px 64px;color:#4b5563}
      .top .row{display:flex;justify-content:space-between;align-items:center;margin-bottom:34px}
      .lbl{font-size:24px;font-weight:800;letter-spacing:.2em;color:#6b7280}
      .old{font-size:52px;font-weight:600;line-height:1.5;color:#6b7280;position:relative;display:table}
      .old::after{content:"";position:absolute;left:-8px;right:-8px;top:52%;height:6px;background:#a80b28;border-radius:4px;transform:rotate(-2deg)}
      .yawn{position:absolute;right:64px;top:170px;font-family:Caveat,cursive;font-size:64px;color:#9ca3af;transform:rotate(-6deg)}
      .photo{position:absolute;left:0;right:0;bottom:0;height:${h - topH}px;background:url('${url(ad.photo)}') ${ad.pos}/${ad.bgSize || "cover"} no-repeat}
      .photo::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,28,46,.65),rgba(6,28,46,0) 28%,rgba(6,28,46,0) 52%,rgba(6,28,46,.9))}
      .tear{position:absolute;left:0;right:0;top:${topH - 22}px;height:44px;background:#e7e4df;clip-path:polygon(0 0,100% 0,100% 40%,95% 70%,90% 45%,85% 75%,80% 50%,75% 72%,70% 44%,65% 70%,60% 48%,55% 76%,50% 46%,45% 72%,40% 50%,35% 74%,30% 45%,25% 70%,20% 48%,15% 76%,10% 46%,5% 72%,0 50%);z-index:2}
      .pill{position:absolute;left:64px;top:${topH + 54}px;background:#fff;color:#a80b28;font-weight:800;font-size:22px;letter-spacing:.14em;padding:12px 22px;border-radius:999px}
      .foot{position:absolute;left:64px;right:64px;bottom:60px}
      .foot h1{font-family:"Playfair Display",serif;font-size:92px;line-height:1;font-weight:600;margin-bottom:30px;text-shadow:0 2px 24px rgba(0,0,0,.4)}
      .foot h1 i{font-weight:500}`,
      body: `
      <div class="top"><div class="row"><span class="lbl">YOUR WEEKEND</span>${mark(true)}</div>
        ${ad.old.map((t) => `<div class="old">${t}</div>`).join("")}<div class="yawn">yawn.</div></div>
      <div class="tear"></div>
      <div class="photo"></div>
      <div class="pill">${ad.pill}</div>
      <div class="foot"><h1>${ad.title}</h1>${cta(ad.cta)}</div>`,
    };
  },

  // Three tilted polaroids on a sandy background.
  polaroids(ad) {
    const pol = (p, i) =>
      `<figure class="pol p${i}"><div class="img" style="background-image:url('${url(p.photo)}');background-position:${p.pos || "center"}"></div><figcaption>${p.cap}</figcaption></figure>`;
    return {
      css: `
      body{background:linear-gradient(180deg,#bfe3ea 0%,#f6ead8 38%,#f1dcc0 100%);color:#0a2a43}
      .head{position:absolute;left:64px;right:64px;top:56px}
      .hand{font-family:Caveat,cursive;font-size:62px;color:#a80b28;margin-top:26px;transform:rotate(-2deg);display:inline-block}
      h1{font-family:"Playfair Display",serif;font-size:84px;line-height:1;font-weight:600;margin-top:4px}
      h1 i{font-weight:500;color:#a80b28}
      .pol{position:absolute;background:#fff;padding:18px 18px 0;box-shadow:0 24px 40px -18px rgba(10,42,67,.55)}
      .pol .img{background-size:cover}
      .pol figcaption{font-family:Caveat,cursive;font-size:40px;text-align:center;padding:10px 0 14px;color:#17242f}
      .p0{left:44px;top:430px;transform:rotate(-4deg)} .p0 .img{width:600px;height:398px}
      .p1{right:44px;top:400px;transform:rotate(5deg)} .p1 .img{width:300px;height:400px}
      .p2{left:590px;top:885px;transform:rotate(-3deg);z-index:2} .p2 .img{width:250px;height:333px}
      .tape{position:absolute;width:120px;height:34px;background:rgba(255,255,255,.6);box-shadow:0 2px 6px rgba(0,0,0,.08)}
      .foot{position:absolute;left:64px;top:985px;width:470px}
      .foot p{font-size:29px;line-height:1.35;font-weight:600;margin-bottom:24px;color:#14415f}
      .foot .num{display:block;margin-top:14px;color:#0a2a43}
      .foot .cta{flex-direction:column;align-items:flex-start;gap:0}`,
      body: `
      <div class="head">${mark(true)}<div class="hand">${ad.hand}</div><h1>${ad.title}</h1></div>
      ${ad.photos.map(pol).join("")}
      <div class="foot"><p>${ad.sub}</p>${cta(ad.cta, { light: true })}</div>`,
    };
  },

  // "Date ideas, ranked" list beside a portrait photo.
  ranked(ad, w, h) {
    const story = h > 1500;
    const top = story ? 250 : 60;
    const phW = story ? 460 : 430, phH = Math.round(phW * 16 / 9);
    return {
      css: `
      body{background:#f6efe6;color:#0a2a43}
      .wrap{position:absolute;left:64px;top:${top}px;width:${story ? 952 : 520}px}
      .k{font-size:22px;font-weight:800;letter-spacing:.2em;color:#a80b28;margin:${story ? 60 : 44}px 0 10px}
      h1{font-family:"Playfair Display",serif;font-size:${story ? 92 : 84}px;line-height:.98;font-weight:600}
      h1 i{font-weight:500;color:#a80b28}
      ol{list-style:none;margin-top:${story ? 80 : 64}px;display:grid;gap:${story ? 52 : 40}px;justify-items:start}
      li{font-size:${story ? 44 : 34}px;font-weight:600;line-height:1.25;color:#8b9aa6;position:relative;padding-left:58px}
      li b{position:absolute;left:0;top:0;font-family:"Playfair Display",serif;font-size:${story ? 44 : 40}px;color:#c7d3dc}
      li s{text-decoration-color:#a80b28;text-decoration-thickness:4px}
      li.win{color:#0a2a43;font-weight:800;font-size:${story ? 56 : 50}px;display:inline-block}
      li.win b{color:#a80b28}
      li.win::after{content:"";position:absolute;left:-18px;top:-16px;right:-26px;bottom:-16px;border:4px solid #a80b28;border-radius:50% 46% 52% 48%/60% 50% 55% 45%;transform:rotate(-2deg)}
      .ph2{position:absolute;right:56px;top:${story ? 1075 : 110}px;width:${phW}px;height:${phH}px;border-radius:26px;background:url('${url(ad.photo)}') ${ad.pos || "center"}/cover;transform:rotate(3deg);box-shadow:0 30px 50px -24px rgba(10,42,67,.6);border:10px solid #fff}
      .note{position:absolute;right:${story ? 660 : 110}px;top:${story ? 1120 : 110 + phH - 30}px;font-family:Caveat,cursive;font-size:${story ? 58 : 52}px;color:#a80b28;transform:rotate(-4deg)}
      .foot{position:absolute;left:64px;right:64px;bottom:${story ? 330 : 60}px}
      .sub2{font-size:${story ? 32 : 28}px;line-height:1.4;font-weight:600;color:#14415f;margin-bottom:26px;max-width:${story ? 400 : 480}px}
      .cta.light .num{color:#0a2a43}
      ${story ? ".foot{right:auto;width:400px}.foot .cta{flex-direction:column;align-items:flex-start;gap:14px}" : ""}`,
      body: `
      <div class="wrap">${mark(true)}<div class="k">${ad.kicker}</div><h1>${ad.title}</h1>
        <ol>${ad.list.map((t, i) => (i === ad.list.length - 1 ? `<li class="win"><b>1</b>${t}</li>` : `<li><b>${ad.list.length - i}</b><s>${t}</s></li>`)).join("")}</ol></div>
      <div class="ph2"></div><div class="note">${ad.note}</div>
      <div class="foot">${ad.sub ? `<div class="sub2">${ad.sub}</div>` : ""}${cta(ad.cta, { light: true })}</div>`,
    };
  },

  // Student offer on notebook paper: price sticker, slot chips, fine print.
  student(ad) {
    return {
      css: `
      body{background:#fbf6ea;color:#0a2a43}
      body::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 63px,rgba(42,120,190,.16) 63px 65px)}
      body::after{content:"";position:absolute;top:0;bottom:0;left:40px;width:3px;background:rgba(168,11,40,.35)}
      .top{position:absolute;left:72px;right:64px;top:240px;display:flex;justify-content:space-between;align-items:center}
      .only{background:#0a2a43;color:#fff;font-weight:800;font-size:22px;letter-spacing:.12em;padding:12px 20px;border-radius:999px;transform:rotate(2deg)}
      .collab{position:absolute;left:72px;top:318px;font-family:Caveat,cursive;font-size:56px;color:#a80b28;transform:rotate(-2deg)}
      .collab u{text-decoration-thickness:4px;text-underline-offset:8px}
      h1{position:absolute;left:72px;right:64px;top:392px;font-family:"Playfair Display",serif;font-size:118px;line-height:.96;font-weight:600;letter-spacing:-.01em}
      h1 i{font-weight:500;color:#a80b28}
      .pic{position:absolute;left:84px;top:650px;width:900px;background:#fff;padding:18px 18px 70px;transform:rotate(-3deg);box-shadow:0 30px 50px -24px rgba(10,42,67,.55)}
      .pic .img{height:540px;background:url('${url(ad.photo)}') ${ad.pos}/cover}
      .pic .cap{position:absolute;left:0;right:0;bottom:12px;text-align:center;font-family:Caveat,cursive;font-size:46px}
      .tape{position:absolute;top:-22px;width:160px;height:46px;background:rgba(255,216,77,.75)}
      .tape.l{left:60px;transform:rotate(-8deg)} .tape.r{right:60px;transform:rotate(7deg)}
      .price{position:absolute;right:40px;top:540px;width:330px;height:330px;transform:rotate(10deg);display:grid;place-items:center;text-align:center;color:#0a2a43;z-index:3}
      .price::before{content:"";position:absolute;inset:0;background:#ffd84d;clip-path:polygon(50% 0,59% 12%,73% 5%,77% 20%,93% 19%,89% 34%,100% 43%,90% 54%,98% 68%,83% 72%,81% 88%,66% 85%,57% 99%,46% 89%,32% 97%,28% 82%,12% 84%,15% 68%,1% 60%,11% 48%,2% 34%,17% 29%,17% 13%,32% 15%,40% 1%);filter:drop-shadow(0 10px 18px rgba(0,0,0,.25))}
      .price div{position:relative}
      .price .j{font-size:26px;font-weight:800;letter-spacing:.18em}
      .price .n{font-family:"Playfair Display",serif;font-size:108px;font-weight:700;line-height:1;margin:2px 0}
      .price .p{font-size:26px;font-weight:800}
      .slots{position:absolute;left:72px;right:64px;top:1290px}
      .slots .lbl{font-family:Caveat,cursive;font-size:50px;color:#a80b28;margin-bottom:10px}
      .chips{display:flex;gap:18px}
      .chip{flex:1;text-align:center;border:3px solid #0a2a43;border-radius:20px;padding:14px 0 12px;background:#fff;box-shadow:5px 5px 0 #0a2a43}
      .chip b{display:block;font-size:36px;font-weight:800}
      .chip span{font-size:22px;font-weight:600;color:#5c6e7c}
      .fine{position:absolute;left:72px;right:64px;top:1478px;font-size:25px;line-height:1.45;font-weight:600;color:#14415f}
      .fine b{color:#a80b28;display:block;font-weight:800}
      .foot{position:absolute;left:72px;right:64px;top:1568px}
      .cta.light .num{color:#0a2a43}`,
      body: `
      <div class="top">${mark(true)}<span class="only">🎓 STUDENTS ONLY</span></div>
      <div class="collab"><u>special college collab</u> ✌️</div>
      <h1>${ad.title}</h1>
      <div class="pic"><span class="tape l"></span><span class="tape r"></span><div class="img"></div><div class="cap">${ad.cap}</div></div>
      <div class="price"><div><div class="j">JUST</div><div class="n">₹${ad.price}</div><div class="p">per person</div></div></div>
      <div class="slots"><div class="lbl">pick your slot →</div><div class="chips">${ad.slots
        .map(([t, s]) => `<div class="chip"><b>${t}</b><span>${s}</span></div>`)
        .join("")}</div></div>
      <div class="fine">${ad.fine}</div>
      <div class="foot">${cta(ad.cta, { light: true })}</div>`,
    };
  },

  // Carousel card: colour block, title, framed photo.
  vibe(ad, w, h) {
    const end = !!ad.cta;
    return {
      css: `
      body{background:${ad.bg};color:${ad.fg}}
      .wrap{position:absolute;inset:0;padding:60px 64px}
      .row{display:flex;justify-content:space-between;align-items:center}
      .k{font-size:22px;font-weight:800;letter-spacing:.2em;opacity:.75}
      h1{font-family:"Playfair Display",serif;font-size:${end ? 76 : 88}px;line-height:1;font-weight:600;margin-top:30px}
      h1 i{font-weight:500}
      .frame{position:absolute;left:64px;right:64px;top:${end || ad.title.includes("<br>") ? 340 : 290}px;bottom:${end ? 200 : 64}px;border-radius:28px;background:url('${url(ad.photo)}') ${ad.pos || "center"}/cover;box-shadow:0 30px 60px -30px rgba(0,0,0,.5)}
      .tag{position:absolute;left:28px;bottom:28px;background:rgba(255,255,255,.94);color:#0a2a43;font-weight:700;font-size:26px;padding:14px 24px;border-radius:999px}
      .swipe{position:absolute;right:30px;bottom:18px;font-family:Caveat,cursive;font-size:52px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.6)}
      .foot{position:absolute;left:64px;right:64px;bottom:60px}
      .cta .num{color:${ad.fg}}`,
      body: `
      <div class="wrap"><div class="row">${mark(ad.fg !== "#fff")}<span class="k">${ad.kicker}</span></div><h1>${ad.title}</h1></div>
      <div class="frame">${ad.tag ? `<span class="tag">${ad.tag}</span>` : ""}${ad.swipe ? `<span class="swipe">${ad.swipe}</span>` : ""}</div>
      ${end ? `<div class="foot">${cta(ad.cta)}</div>` : ""}`,
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

  /* ===== SET 2 — photos from the marketing Drive ===== */
  // FEED 4:5
  {
    file: "set2-feed-1-weekend-upgrade", size: "feed", layout: "compare", photo: P2.aiParty, pos: "40% center",
    old: ["Same café ☕", "Same rooftop 🍸", "Same traffic 🚗"],
    pill: "YOUR WEEKEND, UPGRADED ⛵",
    title: "Same friends.<br><i>Better view.</i>", cta: "Plan the party",
  },
  {
    file: "set2-feed-2-your-evening", size: "feed", layout: "hero", photo: P2.aiSailGateway, pos: "38% center", topShade: 0.5,
    pill: "SUNSET SAILS · GATEWAY OF INDIA",
    title: "This could be<br><i>your evening.</i>", cta: "Book the sunset",
  },
  {
    file: "set2-feed-3-girls-trip-goa", size: "feed", layout: "polaroids",
    hand: "Girls' trip to Goa? 👯‍♀️", title: "Make one day<br><i>a yacht day.</i>",
    photos: [
      { photo: P2.goaGirls, pos: "center 40%", cap: "the whole squad 🤍" },
      { photo: P2.goaYellow, pos: "center 30%", cap: "main character" },
      { photo: P2.goaRed, pos: "center 40%", cap: "red dress energy" },
    ],
    sub: "Private yacht charters in Goa, with captain and crew.", cta: "Plan the girls' day",
  },
  {
    file: "set2-feed-4-date-ideas", size: "feed", layout: "ranked", photo: P2.coupleToast, pos: "center 40%",
    kicker: "DATE NIGHT", title: "Date ideas,<br><i>ranked.</i>",
    list: ["Dinner at the usual place", "Another movie", "A long drive (in traffic)", "Sunset sail ⛵"],
    note: "trust us 😉", sub: "Private sunset sails from the Gateway of India. Captain & crew included.", cta: "Book date night",
  },

  // STORIES 9:16
  {
    file: "set2-story-1-golden-hour", size: "story", layout: "hero", photo: P2.aiSailGateway, pos: "36% center", topShade: 0.45,
    pill: "GATEWAY OF INDIA · 6 PM", title: "Golden hour<br><i>hits different here.</i>",
    footText: "Private sailing past the Taj and the Gateway. Skipper included — you just relax.", cta: "Book on WhatsApp",
  },
  {
    file: "set2-story-2-say-it", size: "story", layout: "hero", photo: P2.aiCoupleGateway, pos: "30% 0%", bgSize: "120% auto", topShade: 0.55,
    title: "Say it where<br><i>the whole city<br>can see.</i>",
    footText: "Proposals and anniversaries on a private yacht, decorated and waiting.", cta: "Plan the moment",
  },
  {
    file: "set2-story-3-no-plans", size: "story", layout: "hero", photo: P2.coupleBow, pos: "48% center", topShade: 0.35,
    title: "No plans.<br><i>Just the sea.</i>",
    footText: "Private sunset sails from the Gateway of India.", cta: "Book your escape",
  },
  {
    file: "set2-story-4-date-ideas", size: "story", layout: "ranked", photo: P2.coupleToast, pos: "center 40%",
    kicker: "DATE NIGHT", title: "Date ideas,<br><i>ranked.</i>",
    list: ["Dinner at the usual place", "Another movie", "A long drive (in traffic)", "Sunset sail ⛵"],
    note: "trust us 😉", sub: "Private sunset sails from the Gateway of India. Captain & crew included.", cta: "Book date night",
  },

  // CAROUSEL 1:1 — "Pick your vibe"
  {
    file: "set2-carousel-1", size: "square", layout: "vibe", bg: "#0a2a43", fg: "#fff", photo: P2.motorYachtTaj, pos: "center",
    kicker: "PICK YOUR VIBE", title: "What's your<br><i>yacht vibe?</i>", swipe: "swipe →",
  },
  {
    file: "set2-carousel-2", size: "square", layout: "vibe", bg: "#f6d9dd", fg: "#0a2a43", photo: P2.coupleSunset, pos: "center",
    kicker: "VIBE 01", title: "The <i>romantic</i>", tag: "Sunset, just the two of you", swipe: "→",
  },
  {
    file: "set2-carousel-3", size: "square", layout: "vibe", bg: "#a80b28", fg: "#fff", photo: P2.aiParty, pos: "35% center",
    kicker: "VIBE 02", title: "The <i>party</i>", tag: "Music up, city glowing", swipe: "→",
  },
  {
    file: "set2-carousel-4", size: "square", layout: "vibe", bg: "#f6efe6", fg: "#0a2a43", photo: P2.goaGirls, pos: "center 45%",
    kicker: "VIBE 03", title: "The <i>girls' day</i>", tag: "Matching outfits optional", swipe: "→",
  },
  {
    file: "set2-carousel-5", size: "square", layout: "vibe", bg: "#d5edf0", fg: "#0a2a43", photo: P2.sailingPink, pos: "center 35%",
    kicker: "VIBE 04", title: "The <i>sail & chill</i>", tag: "Wind in your hair, nowhere to be", swipe: "→",
  },
  {
    file: "set2-carousel-6", size: "square", layout: "vibe", bg: "#0a2a43", fg: "#fff", photo: P2.princessTaj, pos: "center 55%",
    kicker: "VIBE 05", title: "Tell us your vibe.<br><i>We'll match the boat.</i>", cta: "Book on WhatsApp",
  },

  /* ===== College student offer ===== */
  {
    file: "student-story-599", size: "story", layout: "student",
    photo: F + "5-pax-sailing-boat/5-pax-sailing-boat-friends-group.jpg", pos: "center 40%",
    title: "Squad of 5?<br><i>Set sail.</i>", cap: "class of the sea 🌊", price: 599,
    slots: [["8–10 AM", "morning sail ☀️"], ["2–4 PM", "afternoon breeze 🌤️"], ["4–6 PM", "golden hour 🌅"]],
    fine: "Group of 5 · Your own sailboat for 2 hrs · Skipper included<b>🎓 Valid college ID required for all 5</b>",
    cta: "Book your slot",
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
