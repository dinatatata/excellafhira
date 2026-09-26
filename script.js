document.getElementById("year").textContent = new Date().getFullYear();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const navToggle = document.getElementById("navToggle");
const navLinksEl = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinksEl.classList.toggle("nav__links--open");
  navToggle.classList.toggle("nav__toggle--open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinksEl.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksEl.classList.remove("nav__links--open");
    navToggle.classList.remove("nav__toggle--open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const progressEl = document.getElementById("progress");
function updateProgress() {
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  progressEl.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
}
document.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const links = document.querySelectorAll(".nav__link");
const targets = [...links]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      links.forEach((link) => {
        link.classList.toggle("nav__link--active", link.getAttribute("href") === id);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
targets.forEach((el) => navObserver.observe(el));

if (!reduceMotion) {
  const revealSelectors = [
    ".intro__grid", ".about__grid", ".edu__grid", ".skills__grid",
    ".org__grid", ".work-card", ".cert-card", ".social-card",
    ".contact__grid", ".tabs", ".volunteer__content",
    ".section-header", ".timeline__item", ".tools-bar",
    ".skill-card", ".org__role"
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(","));
  revealEls.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", (i % 6) * 80 + "ms");
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(
    ".intro__grid, .about__grid, .edu__grid, .skills__grid, .org__grid, .work-card, .cert-card, .social-card, .contact__grid, .tabs, .volunteer__content, .section-header, .timeline__item, .tools-bar, .skill-card, .org__role"
  ).forEach((el) => el.classList.add("reveal", "reveal--visible"));
}

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");
tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("tab-btn--active", active);
      b.setAttribute("aria-selected", String(active));
    });
    tabPanels.forEach((panel) => {
      const show = panel.id === "tab-" + target;
      panel.hidden = !show;
      panel.classList.toggle("tab-panel--active", show);
    });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(img) {
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt || "";
  lightboxCaption.textContent = img.dataset.caption || img.alt || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".lightbox-img").forEach((img) => {
  img.style.cursor = "zoom-in";
  img.tabIndex = 0;
  img.setAttribute("role", "button");
  img.addEventListener("click", () => openLightbox(img));
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox(img);
    }
  });
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

const countEls = document.querySelectorAll(".countup");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (reduceMotion) {
        el.textContent = target.toLocaleString("id-ID");
      } else {
        const duration = 1500;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString("id-ID");
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
countEls.forEach((el) => countObserver.observe(el));

const toTop = document.getElementById("toTop");
document.addEventListener(
  "scroll",
  () => { toTop.hidden = window.scrollY < 600; },
  { passive: true }
);
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

(function particles() {
  if (reduceMotion) return;
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots = [];
  const COUNT = 60;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < COUNT; i++) {
    dots.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0) d.x = w;
      if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h;
      if (d.y > h) d.y = 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(194, 58, 92, ${d.opacity})`;
      ctx.fill();
    });

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(194, 58, 92, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

(function customCursor() {
  if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) return;
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (!cursor || !dot) return;

  let cx = 0, cy = 0, dx = 0, dy = 0;

  document.addEventListener("mousemove", (e) => {
    cx = e.clientX;
    cy = e.clientY;
    dot.style.left = cx + "px";
    dot.style.top = cy + "px";
  });

  function loop() {
    dx += (cx - dx) * 0.12;
    dy += (cy - dy) * 0.12;
    cursor.style.left = dx + "px";
    cursor.style.top = dy + "px";
    requestAnimationFrame(loop);
  }
  loop();

  const hoverables = document.querySelectorAll("a, button, .lightbox-img, [data-magnetic]");
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "56px";
      cursor.style.height = "56px";
      cursor.style.borderColor = "rgba(232, 86, 122, 0.5)";
      cursor.style.background = "rgba(194, 58, 92, 0.08)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "36px";
      cursor.style.height = "36px";
      cursor.style.borderColor = "";
      cursor.style.background = "transparent";
    });
  });
})();

(function magneticEffect() {
  if (window.matchMedia("(pointer: coarse)").matches || reduceMotion) return;
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
      el.style.transition = "transform 0.4s ease";
      setTimeout(() => { el.style.transition = ""; }, 400);
    });
  });
})();

(function smoothNavScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    });
  });
})();
