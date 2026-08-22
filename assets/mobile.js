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
}());
