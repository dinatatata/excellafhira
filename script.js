document.getElementById("year").textContent = new Date().getFullYear();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("nav__links--open");
  burger.classList.toggle("nav__burger--open", open);
});
navLinks.querySelectorAll(".nav__link").forEach((l) => {
  l.addEventListener("click", () => {
    navLinks.classList.remove("nav__links--open");
    burger.classList.remove("nav__burger--open");
  });
});

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("nav--scrolled", window.scrollY > 50);
}, { passive: true });

const allLinks = document.querySelectorAll(".nav__link");
const sections = [...allLinks]
  .map((l) => document.querySelector(l.getAttribute("href")))
  .filter(Boolean);
const navObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const id = "#" + e.target.id;
      allLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === id));
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => navObs.observe(s));

if (!reduceMotion) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".anim-up").forEach((el) => obs.observe(el));
} else {
  document.querySelectorAll(".anim-up").forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll(".vol-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    document.querySelectorAll(".vol-tab").forEach((b) => {
      const active = b === btn;
      b.classList.toggle("vol-tab--active", active);
      b.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".vol-panel").forEach((p) => {
      const show = p.id === "tab-" + target;
      p.hidden = !show;
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbCap = document.getElementById("lightboxCaption");
const lbClose = document.getElementById("lightboxClose");

function openLB(img) {
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt || "";
  lbCap.textContent = img.dataset.caption || img.alt || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lbClose.focus();
}
function closeLB() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".lightbox-img").forEach((img) => {
  img.style.cursor = "zoom-in";
  img.tabIndex = 0;
  img.setAttribute("role", "button");
  img.addEventListener("click", () => openLB(img));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLB(img); }
  });
});
lbClose.addEventListener("click", closeLB);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) closeLB(); });

const countEls = document.querySelectorAll(".countup");
const countObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (reduceMotion) {
        el.textContent = target.toLocaleString("id-ID");
      } else {
        const dur = 1500;
        const start = performance.now();
        function tick(now) {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toLocaleString("id-ID");
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
      countObs.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
countEls.forEach((el) => countObs.observe(el));

const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => { backTop.hidden = window.scrollY < 600; }, { passive: true });
backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const t = document.querySelector(a.getAttribute("href"));
    if (!t) return;
    e.preventDefault();
    const top = t.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  });
});

if (!reduceMotion) {
  document.querySelectorAll(".polaroid, .skill-card, .work-card, .cert-card, .social-card, .role-card").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      el.style.transition = "transform 0.4s ease";
      setTimeout(() => { el.style.transition = ""; }, 400);
    });
  });
}
