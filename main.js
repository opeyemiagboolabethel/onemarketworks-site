// ===== Settings: put the business WhatsApp number here (international format, digits only), e.g. "2348012345678"
const WHATSAPP = "2347070074679";
const EMAIL = "onemarketworks@gmail.com";

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
$("#yr").textContent = new Date().getFullYear();

// contact helpers
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const mailLink = (subj, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
const fl = $("#waFloat");
if (WHATSAPP) { fl.href = waLink("Hello ONE Market Works, I'd like to know more about your services."); fl.target = "_blank"; fl.rel = "noopener"; }

// nav, progress, burger
const nav = $(".nav"), bar = $(".progress");
const onScroll = () => {
  nav.classList.toggle("scrolled", scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / h * 100) + "%";
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();
$(".burger").addEventListener("click", e => { const o = nav.classList.toggle("open"); e.currentTarget.setAttribute("aria-expanded", o); });
$$(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

// rotating headline
const rot = $$(".rotator span"); let ri = 0;
rot[0].classList.add("on");
if (!reduce) setInterval(() => {
  rot[ri].classList.remove("on"); rot[ri].classList.add("out");
  const prev = ri; setTimeout(() => rot[prev].classList.remove("out"), 700);
  ri = (ri + 1) % rot.length; rot[ri].classList.add("on");
}, 2600);

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
$$(".reveal").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + "ms"; io.observe(el); });

// 3D hero scene follows the pointer
const scene = $(".scene"), hero = $(".hero");
if (scene && !reduce) {
  let tx = -18, ty = 8, cx = tx, cy = ty;
  hero.addEventListener("pointermove", e => {
    const r = hero.getBoundingClientRect();
    tx = -18 + ((e.clientX - r.left) / r.width - .5) * 30;
    ty = 8 - ((e.clientY - r.top) / r.height - .5) * 18;
  });
  hero.addEventListener("pointerleave", () => { tx = -18; ty = 8; });
  (function loop() {
    cx += (tx - cx) * .06; cy += (ty - cy) * .06;
    const s = Math.min(scrollY, 600) / 600;
    scene.style.transform = `rotateY(${cx + s * 25}deg) rotateX(${cy - s * 10}deg) translateZ(${-s * 120}px)`;
    requestAnimationFrame(loop);
  })();
}

// sparkle network in hero
const cv = $(".sparks");
if (cv && !reduce) {
  const ctx = cv.getContext("2d"); let W, H, pts = [];
  const size = () => {
    const d = Math.min(devicePixelRatio, 2);
    W = cv.offsetWidth; H = cv.offsetHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(W * H / 16000);
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.8 + .6, g: Math.random() < .35 }));
  };
  size(); addEventListener("resize", size);
  let mx = -999, my = -999;
  hero.addEventListener("pointermove", e => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
  (function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = p.g ? "rgba(242,169,0,.85)" : "rgba(209,250,229,.55)"; ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 110) { ctx.strokeStyle = `rgba(209,250,229,${.12 * (1 - d / 110)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  })();
}

// tilt cards with spotlight
if (!reduce) $$(".tilt").forEach(c => {
  c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.transform = `perspective(900px) rotateY(${(x - .5) * 10}deg) rotateX(${(.5 - y) * 10}deg) translateY(-4px)`;
    c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
  });
  c.addEventListener("pointerleave", () => c.style.transform = "");
});

// magnetic button
if (!reduce) $$(".magnetic").forEach(b => {
  b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .15}px,${(e.clientY - r.top - r.height / 2) * .25}px)`; });
  b.addEventListener("pointerleave", () => b.style.transform = "");
});

// how-it-works progress line
const how = $(".how"), line = $(".how .line");
if (how && line) addEventListener("scroll", () => {
  const r = how.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * .7 - r.top) / (r.height * .6)));
  line.style.setProperty("--p", p * 100 + "%");
}, { passive: true });

// 3D carousel
const ring = $(".ring"), sites = $$(".site");
sites.forEach(s => { const im = s.querySelector("img"); if (!im) return; const f = () => s.classList.add("noimg"); im.addEventListener("error", f); if (im.complete && !im.naturalWidth) f(); });
if (ring) {
  const n = sites.length, step = 360 / n; let idx = 0, timer;
  const radius = () => Math.round((ring.offsetWidth / 2) / Math.tan(Math.PI / n)) + 40;
  const place = () => sites.forEach((s, i) => s.style.transform = `rotateY(${i * step}deg) translateZ(${radius()}px)`);
  const go = () => ring.style.transform = `translateZ(${-radius()}px) rotateY(${-idx * step}deg)`;
  place(); go(); addEventListener("resize", () => { place(); go(); });
  const next = () => { idx++; go(); }, prev = () => { idx--; go(); };
  $(".next").addEventListener("click", () => { next(); restart(); });
  $(".prev").addEventListener("click", () => { prev(); restart(); });
  const car = $(".carousel");
  car.addEventListener("keydown", e => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); });
  let sx = null, dragged = false;
  sites.forEach(s => s.addEventListener("click", e => { if (dragged) { e.preventDefault(); dragged = false; } }));
  car.addEventListener("pointerdown", e => { sx = e.clientX; });
  addEventListener("pointerup", e => { if (sx === null) return; const d = e.clientX - sx; dragged = Math.abs(d) > 8; if (Math.abs(d) > 40) { d < 0 ? next() : prev(); restart(); } sx = null; });
  const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(next, 3500); };
  restart();
}

// lead form → WhatsApp (if number set) or email
$("#leadForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const msg = `Hello ONE Market Works, I'd like a free website preview.\n\nName: ${f.name}\nBusiness: ${f.business}\nWhat we do: ${f.type}\nPhone/WhatsApp: ${f.phone}\nLocation: ${f.area || "-"}`;
  window.open(WHATSAPP ? waLink(msg) : mailLink(`Free website preview: ${f.business}`, msg), "_blank");
});
