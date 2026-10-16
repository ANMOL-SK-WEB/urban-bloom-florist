
/* =========================================
   URBAN BLOOM FLORIST - JAVASCRIPT
   Local-file and ZIP-folder friendly
   ========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* MOBILE NAVIGATION */

  const menuButton = document.getElementById("menu-toggle");
  const navigation = document.getElementById("main-nav");

  if (menuButton && navigation) {

    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("is-open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");

        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
      }
    });
  }

  /* AUTOMATIC FOOTER YEAR */

  document.querySelectorAll("#current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  /* CURRENT PAGE NAVIGATION HIGHLIGHT */

  const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";

  if (navigation) {
    navigation.querySelectorAll("a[href]").forEach(function (link) {
      const href = link.getAttribute("href");

      if (!href) return;

      const cleanHref = href.split("#")[0].split("?")[0].toLowerCase();

      if (cleanHref === currentFile) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ENQUIRY FORM FEEDBACK */

  const enquiryForm = document.getElementById("enquiry-form");
  const contactForm = document.getElementById("contact-form");

  function attachFormFeedback(form) {
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.reportValidity()) {
        return;
      }

      let feedback = form.querySelector(".form-feedback");

      if (!feedback) {
        feedback = document.createElement("p");
        feedback.className = "form-feedback";
        feedback.setAttribute("role", "status");
        form.appendChild(feedback);
      }

      feedback.textContent =
        "Thank you for your enquiry. This website is a demonstration, " +
        "so your message has not been sent. Please contact the florist directly.";

      feedback.classList.add("is-visible");
    });
  }

  attachFormFeedback(enquiryForm);
  attachFormFeedback(contactForm);

  /* BACK TO TOP BUTTON */

  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});
