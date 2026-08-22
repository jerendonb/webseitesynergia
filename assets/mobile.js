/* Behaviour specific to mobile.html. Loads after assets/script.js, which
   still owns translations, the concert list and the photo lightbox. */

(function () {
  "use strict";

  /* ── YouTube click-to-load ─────────────────────────────────────────── */

  document.querySelectorAll("button.m-video").forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-video");
      if (!id) return;

      var frame = document.createElement("iframe");
      frame.src =
        "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      frame.title = "Synergia Piano Trio \u2013 YouTube";
      frame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.allowFullscreen = true;

      var wrap = document.createElement("div");
      wrap.className = "m-video";
      wrap.appendChild(frame);

      button.parentNode.replaceChild(wrap, button);
    });
  });

  /* ── Fade sections in as they arrive ───────────────────────────────── */

  var reveals = Array.prototype.slice.call(document.querySelectorAll(".m-reveal"));

  if ("IntersectionObserver" in window) {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );

    reveals.forEach(function (el) {
      revealer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ── Scroll lives on .m-page, not the document. Hash links need a hand. ─ */

  var page = document.querySelector(".m-page");

  function scrollToId(id) {
    if (!id) return;
    if (id === "top") {
      if (page) page.scrollTo({ top: 0, behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute("href");
    if (!href || href.length < 2) return;
    var id = href.slice(1);
    if (id !== "top" && !document.getElementById(id)) return;
    e.preventDefault();
    scrollToId(id);
  });

  if (location.hash) {
    var startId = location.hash.slice(1);
    requestAnimationFrame(function () {
      scrollToId(startId);
    });
  }
}());
