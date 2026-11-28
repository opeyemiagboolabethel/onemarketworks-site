const OMW_WA = "2349115640949";
const SITE = document.title.split("·")[0].trim();
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => "₦" + (Math.round(n / 500) * 500).toLocaleString("en-NG");

addEventListener("scroll", () => $(".nav").classList.toggle("solid", scrollY > 40), { passive: true });

/* Menu tabs */
$$(".tab").forEach(t => t.addEventListener("click", () => {
  $$(".tab", t.parentElement).forEach(x => x.classList.toggle("on", x === t));
  $$(".menu").forEach(m => m.classList.toggle("on", m.dataset.panel === t.dataset.tab));
}));

/* Gallery / portfolio filters */
function filterLooks(f) {
  $$(".filters button").forEach(b => b.classList.toggle("on", b.dataset.f === f));
  $$(".look").forEach(l => l.classList.toggle("hide", f !== "all" && l.dataset.cat !== f));
}
$$(".filters button").forEach(b => b.addEventListener("click", () => filterLooks(b.dataset.f)));
$$(".card[data-f]").forEach(c => c.addEventListener("click", () => filterLooks(c.dataset.f)));

/* Product category tabs */
$$(".ptabs button").forEach(b => b.addEventListener("click", () => {
  $$(".ptabs button").forEach(x => x.classList.toggle("on", x === b));
  $$(".prod").forEach(p => p.classList.toggle("hide", b.dataset.c !== "all" && p.dataset.c !== b.dataset.c));
}));

/* Cake builder */
if ($("#size")) {
  const calc = () => { $("#total").textContent = fmt(+$("#size").value * +$("#tiers").value + +$("#flavour").value + +$("#finish").value); };
  $$("#bookForm select").forEach(s => s.addEventListener("change", calc)); calc();
}

/* Swap estimator */
if ($("#swModel")) {
  const sw = () => {
    const val = +$("#swModel").value * +$("#swCond").value, to = +$("#swTo").value;
    $("#swVal").textContent = fmt(val); $("#swPay").textContent = fmt(Math.max(to - val, 0));
  };
  $$("#bookForm select").forEach(s => s.addEventListener("change", sw)); sw();
}

/* Event date checker (sample logic) */
if ($("#checkBtn")) {
  const d = $("#evDate"); d.min = new Date().toISOString().slice(0, 10);
  $("#checkBtn").addEventListener("click", () => {
    const out = $("#avail"); if (!d.value) { out.className = "avail"; out.textContent = "Pick a date first."; return; }
    const dt = new Date(d.value + "T12:00"), day = dt.getDay(), m = dt.getMonth(), n = dt.getDate();
    let cls = "ok", msg = "Good news: this date is open. Send your details for a quote.";
    if ((day === 6 || day === 5) && (m === 11 || n % 3 === 0)) { cls = "few"; msg = "Only 1 team left for this date. Request your quote today to hold it."; }
    if (day === 6 && m === 11 && n > 10 && n < 28) { cls = "no"; msg = "This Saturday is fully booked. Try the Friday or Sunday, or join the waitlist."; }
    out.className = "avail " + cls; out.textContent = msg;
  });
}
$$("[data-pack]").forEach(a => a.addEventListener("click", () => { const s = $("#packSel"); if (s) s.value = a.dataset.pack; }));

/* Reveal on scroll */
$$(".section > *, .item, .g, blockquote, .card, .prod, .pack, .look").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .1 });
$$(".reveal").forEach(el => io.observe(el));

/* Sample-site toast: order and booking actions explain this is a ONE Market Works concept */
const toast = $("#toast");
$("#toastWa").href = `https://wa.me/${OMW_WA}?text=${encodeURIComponent(`Hello ONE Market Works, I saw the ${SITE} sample website and I'd like one for my business.`)}`;
$("#toastClose").addEventListener("click", () => toast.classList.remove("show"));
const show = e => { e.preventDefault(); toast.classList.add("show"); };
$$("form").forEach(f => f.addEventListener("submit", show));
$$("[data-sample]").forEach(a => a.addEventListener("click", show));
$("#waFloat")?.addEventListener("click", show);
