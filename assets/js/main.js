// TruckManager — sdílené skripty
// Mobilní menu, přepínač jazyka, rotující hero text
(function () {
  "use strict";

  document.addEventListener("click", function (e) {
    // --- Mobilní navigace ---
    var navToggle = e.target.closest(".nav-toggle");
    if (navToggle) {
      var nav = document.querySelector(".main-nav");
      if (nav) { nav.classList.toggle("open"); }
      return;
    }

    // --- Přepínač jazyka ---
    var langBtn = e.target.closest(".lang-switch > button");
    if (langBtn) {
      langBtn.parentElement.classList.toggle("open");
      return;
    }

    // Klik mimo — zavřít otevřená menu
    if (!e.target.closest(".lang-switch")) {
      document.querySelectorAll(".lang-switch.open").forEach(function (el) {
        el.classList.remove("open");
      });
    }
    if (!e.target.closest(".main-nav") && !e.target.closest(".nav-toggle")) {
      var openNav = document.querySelector(".main-nav.open");
      if (openNav) { openNav.classList.remove("open"); }
    }
  });

  // --- Rotující text v hero ---
  function initRotatingText() {
    var container = document.getElementById("rotatingText");
    if (!container) { return; }
    var items = container.querySelectorAll("span");
    if (items.length < 2) { return; }
    var current = 0;
    setInterval(function () {
      items[current].classList.remove("active");
      current = (current + 1) % items.length;
      items[current].classList.add("active");
    }, 3000);
  }

  initRotatingText();

  // --- Cookie lišta + Clarity ---
  function initCookieBanner() {
    var banner = document.querySelector(".cookie-banner");
    if (!banner) { return; }

    var consent = localStorage.getItem("tm-cookie-consent");
    if (consent === "accepted") {
      loadClarity();
      return;
    }
    if (consent === "declined") {
      return;
    }

    banner.classList.add("show");

    document.querySelectorAll("[data-cookie-accept]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem("tm-cookie-consent", "accepted");
        banner.classList.remove("show");
        loadClarity();
      });
    });

    document.querySelectorAll("[data-cookie-decline]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        localStorage.setItem("tm-cookie-consent", "declined");
        banner.classList.remove("show");
      });
    });
  }

  function loadClarity() {
    if (window.clarity) { return; }
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y39oeksfct");
  }

  initCookieBanner();

  // --- Potvrzení odeslání formuláře (FormSubmit návrat) ---
  if (window.location.search.indexOf("odeslano=1") > -1) {
    var form = document.querySelector("form.form");
    if (form) {
      var success = document.createElement("div");
      success.className = "alert alert--success";
      success.style.cssText = "background:#d4edda;color:#155724;padding:16px 20px;border-radius:8px;margin-bottom:24px;border:1px solid #c3e6cb;";
      success.innerHTML = "<strong>Děkujeme!</strong> Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.";
      form.parentNode.insertBefore(success, form);
      form.style.display = "none";
    }
  }
})();
