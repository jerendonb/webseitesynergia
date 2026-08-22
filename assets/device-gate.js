/* Phone → mobile site, tablet/desktop → desktop site.
   On Chrome, "Desktop site" in the browser menu is the way to see the
   desktop version on a phone; we do not keep a separate on-page switch. */
(function () {
  try {
    var page = (window.location.pathname.replace(/\/$/, "").split("/").pop() || "index.html").toLowerCase();
    var hash = window.location.hash;

    function isPhone() {
      /* Chrome / Edge: this is false when the visitor ticks "Desktop site". */
      if (navigator.userAgentData && typeof navigator.userAgentData.mobile === "boolean") {
        return navigator.userAgentData.mobile;
      }

      var ua = navigator.userAgent || "";
      /* Android tablets omit "Mobile"; iPadOS reports itself as Macintosh. */
      if (!/iPhone|iPod|Android.+Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return false;
      }
      if (!window.matchMedia("(pointer: coarse)").matches) return false;
      return Math.min(screen.width, screen.height) <= 700;
    }

    var mobileHome = {
      "mobile.html": "index.html",
      "mobile-trio.html": "trio.html",
      "mobile-programs.html": "programme.html"
    };

    var desktopHome = {
      "index.html": "mobile.html",
      "trio.html": "mobile-trio.html",
      "programme.html": "mobile-programs.html",
      "termine.html": "mobile.html#concerts",
      "media.html": "mobile.html#media",
      "kontakt.html": "mobile.html#contact",
      "presse.html": "mobile-trio.html#press"
    };

    if (mobileHome[page]) {
      if (!isPhone()) {
        window.location.replace(mobileHome[page] + hash);
      }
      return;
    }

    if (!isPhone()) return;

    var target = desktopHome[page];
    if (!target) return;
    if (page === "media.html" && hash) target = "mobile.html" + hash;
    else if (target.indexOf("#") === -1) target += hash;
    window.location.replace(target);
  } catch (e) {
    /* Leave the visitor where they are. */
  }
}());
