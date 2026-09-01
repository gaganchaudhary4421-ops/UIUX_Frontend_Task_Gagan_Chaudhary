(function () {
  "use strict";

  /* ---- Header: shadow on scroll ---- */
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () =>
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---- Dashboard sidebar toggle (mobile) ---- */
  const dashToggle = document.querySelector(".dash-menu-toggle");
  const dashSidebar = document.querySelector(".dash-sidebar");
  if (dashToggle && dashSidebar) {
    dashToggle.addEventListener("click", () => {
      const isOpen = dashSidebar.classList.toggle("is-open");
      dashToggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.addEventListener("click", (e) => {
      if (
        dashSidebar.classList.contains("is-open") &&
        !dashSidebar.contains(e.target) &&
        !dashToggle.contains(e.target)
      ) {
        dashSidebar.classList.remove("is-open");
        dashToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Tab filters (services / courses) ---- */
  document.querySelectorAll("[data-tab-group]").forEach((group) => {
    const groupName = group.getAttribute("data-tab-group");
    const targets = document.querySelectorAll(
      `[data-tab-content="${groupName}"]`,
    );
    const buttons = group.querySelectorAll(".tab-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");

        targets.forEach((item) => {
          const cats = (item.getAttribute("data-category") || "").split(" ");
          const show = filter === "all" || cats.includes(filter);
          item.style.display = show ? "" : "none";
        });
      });
    });
  });

  /* ---- Animated stat counters (single reveal, on scroll into view) ---- */
  const counters = document.querySelectorAll("[data-count-to]");
  if (counters.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count-to"));
          const suffix = el.getAttribute("data-suffix") || "";
          const duration = 1200;
          const start = performance.now();

          function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((c) => obs.observe(c));
  }

  /* ---- Progress bar fill (dashboard) ---- */
  const progressBars = document.querySelectorAll("[data-progress]");
  if (progressBars.length && "IntersectionObserver" in window) {
    const obs2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.width = el.getAttribute("data-progress") + "%";
          obs2.unobserve(el);
        });
      },
      { threshold: 0.3 },
    );
    progressBars.forEach((b) => obs2.observe(b));
  }

  /* ---- Password visibility toggle ---- */
  document.querySelectorAll(".toggle-visibility").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = btn.parentElement.querySelector("input");
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.setAttribute(
        "aria-label",
        isPassword ? "Hide password" : "Show password",
      );
      btn.textContent = isPassword ? "Hide" : "Show";
    });
  });

  /* ---- Login form validation ---- */
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      const email = loginForm.querySelector("#email");
      const password = loginForm.querySelector("#password");

      const emailField = email.closest(".field");
      const passField = password.closest(".field");
      emailField.classList.remove("has-error");
      passField.classList.remove("has-error");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        emailField.classList.add("has-error");
        valid = false;
      }
      if (password.value.trim().length < 6) {
        passField.classList.add("has-error");
        valid = false;
      }

      const status = document.getElementById("form-status");
      if (!valid) {
        if (status) {
          status.textContent =
            "Please fix the highlighted fields before continuing.";
          status.style.color = "#D64545";
        }
        return;
      }

      if (status) {
        status.textContent = "Signing you in…";
        status.style.color = "#5B6B82";
      }
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.setAttribute("disabled", "true");

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }
})();
