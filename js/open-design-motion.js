(function () {
  "use strict";

  var body = document.body;
  if (!body || !body.classList.contains("od-leclerc-theme")) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    body.classList.add("od-reduced-motion");
    return;
  }

  function initMotion() {
    body.classList.add("od-motion-ready");

    var revealTargets = [
      ".hero-kicker",
      ".cover-v1 .heading",
      ".cover-v1 .subheading",
      ".hero-actions",
      ".hero-meta",
      ".heading-h2",
      ".heading-h3",
      ".lead",
      "#about-section p",
      ".feature-v1",
      ".portfolio-item",
      ".skill-stack-item",
      "#skills-section .col-6",
      "#experience-section .mb-4",
      ".contact-info-v1 > div",
      ".form-outline-style-v1 .form-group"
    ].join(",");

    document.querySelectorAll(revealTargets).forEach(function (el, index) {
      el.classList.add("od-reveal");
      el.style.setProperty("--od-delay", Math.min(index % 6, 5) * 70 + "ms");
    });

    document.querySelectorAll(".heading-h2, .cover-v1 .heading").forEach(function (el) {
      el.classList.add("od-text-reveal");
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("od-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    });

    function isAlreadyVisible(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    }

    document.querySelectorAll(".od-reveal").forEach(function (el) {
      if (isAlreadyVisible(el)) {
        el.classList.add("od-in-view");
      } else {
        observer.observe(el);
      }
    });

    var hero = document.querySelector(".cover-v1");
    var ticking = false;

    function updateScrollMotion() {
      ticking = false;
      if (!hero) return;
      var rect = hero.getBoundingClientRect();
      var progress = Math.max(0, Math.min(1, Math.abs(rect.top) / Math.max(rect.height, 1)));
      hero.style.setProperty("--od-scroll-progress", progress.toFixed(3));
    }

    function requestScrollMotion() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrollMotion);
      }
    }

    updateScrollMotion();
    window.addEventListener("scroll", requestScrollMotion, { passive: true });
    window.addEventListener("resize", requestScrollMotion);
  }

  if (document.readyState === "complete") {
    initMotion();
  } else {
    window.addEventListener("load", initMotion);
  }
})();
