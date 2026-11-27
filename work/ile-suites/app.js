const OMW_WA = "2347070084679";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

addEventListener("scroll", () => $(".nav").classList.toggle("solid", scrollY > 40), { passive: true });

/*tabs*/$$(".tab").forEach(t => t.addEventListener("click", () => {
  /*tabs*/$$(".tab").forEach(x => x.classList.toggle("on", x === t));
  $$(".menu").forEach(m => m.classList.toggle("on", m.dataset.panel === t.dataset.tab));
}));

$$(".section > *, .apt, .amen-grid > div, figure, blockquote").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

const toast = $("#toast");
$("#toastWa").href = `https://wa.me/${OMW_WA}?text=${encodeURIComponent("Hello ONE Market Works, I saw the Ìlé Suites sample website and I'd like one for my business.")}`;
$("#toastClose").addEventListener("click", () => toast.classList.remove("show"));
$("#searchForm").addEventListener("submit", e => { e.preventDefault(); toast.classList.add("show"); });
$$("[data-apt]").forEach(a => a.addEventListener("click", () => { $("#aptSel").value = a.dataset.apt; }));
$("#bookForm").addEventListener("submit", e => { e.preventDefault(); toast.classList.add("show"); });
