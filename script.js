/*
  URBAN BLOOM FLORIST — Assignment 2B
  Shared vanilla JavaScript for navigation, product filtering and enquiry feedback.
  No third-party JavaScript libraries are used.
*/
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-toggle") || document.querySelector(".menu-toggle");
  const navigation = document.getElementById("main-nav");

  // Responsive navigation: supports mouse, keyboard and Escape-key dismissal.
  function closeMenu() {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const opened = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(opened));
      menuButton.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
      menuButton.textContent = opened ? "✕" : "☰";
    });
    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Keep the copyright year current on every page.
  document.querySelectorAll("#current-year").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Mark the current page in the shared navigation.
  const currentFile = window.location.pathname.split("/").pop().toLowerCase() || "index.html";
  if (navigation) {
    navigation.querySelectorAll("a[href]").forEach(function (link) {
      const target = link.getAttribute("href").split("#")[0].toLowerCase();
      if (target === currentFile) link.setAttribute("aria-current", "page");
    });
  }

  // Product/occasion filtering on Flowers & Gifts page.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll(".product-card[data-category]");
  const filterStatus = document.getElementById("filter-status");
  if (filterButtons.length && productCards.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const selected = button.dataset.filter;
        let visibleCount = 0;
        productCards.forEach(function (card) {
          const categories = (card.dataset.category || "").split(/\s+/);
          const showCard = selected === "all" || categories.includes(selected);
          card.hidden = !showCard;
          if (showCard) visibleCount += 1;
        });
        filterButtons.forEach(function (item) {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        if (filterStatus) {
          filterStatus.textContent = selected === "all"
            ? "Showing all " + visibleCount + " arrangements"
            : "Showing " + visibleCount + " matching arrangement" + (visibleCount === 1 ? "" : "s");
        }
      });
    });
  }

  // Carry the selected product into the enquiry message when a product CTA is used.
  const productInterest = new URLSearchParams(window.location.search).get("product");
  const enquiryMessage = document.getElementById("message");
  if (productInterest && enquiryMessage) {
    enquiryMessage.value = "I am interested in " + productInterest + ". Please contact me with more information.";
  }

  // Front-end enquiry validation and clear demonstration feedback.
  const enquiryForm = document.getElementById("enquiry-form") || document.getElementById("contact-form");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!enquiryForm.reportValidity()) return;
      const feedback = document.getElementById("form-feedback") || enquiryForm.querySelector(".form-feedback");
      if (feedback) {
        const customerName = enquiryForm.elements.name ? enquiryForm.elements.name.value.trim() : "there";
        feedback.textContent = "Thank you, " + customerName + ". Your details passed the form checks. This demonstration website does not send or store enquiries; please contact Urban Bloom directly by phone or email.";
        feedback.classList.add("is-visible");
      }
      enquiryForm.reset();
    });
  }
});
