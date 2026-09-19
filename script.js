// ==========================================================================
// Harish Portfolio - Interactive Features & UX Script
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Navigation & Mobile Menu
  // ------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky Navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      const icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
      }
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll("#siteNav a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && siteNav.classList.contains("open")) {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fas fa-bars";
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Active Navigation Link Highlighting on Scroll
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveNav() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute("id");
      const currentNavLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

      if (currentNavLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        currentNavLink.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightActiveNav);

  // ------------------------------------------------------------------------
  // 3. Certifications Fullscreen Lightbox Modal
  // ------------------------------------------------------------------------
  const certCards = document.querySelectorAll(".cert-card");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");
  const modalCounter = document.getElementById("modalCounter");
  const modalClose = document.getElementById("modalClose");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentCertIndex = 0;
  const certData = [];

  // Collect certificate items
  certCards.forEach((card, index) => {
    const imgEl = card.querySelector(".cert-thumbnail");
    const titleEl = card.querySelector(".cert-title");
    const issuerEl = card.querySelector(".cert-issuer");

    certData.push({
      src: imgEl ? imgEl.src : "",
      alt: imgEl ? imgEl.alt : "Certificate",
      title: titleEl ? titleEl.textContent.trim() : "Certificate",
      issuer: issuerEl ? issuerEl.textContent.trim() : ""
    });

    card.addEventListener("click", () => {
      openModal(index);
    });
  });

  function openModal(index) {
    if (index < 0 || index >= certData.length) return;
    currentCertIndex = index;
    updateModalContent();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent scrolling while open
  }

  function updateModalContent() {
    const cert = certData[currentCertIndex];
    if (!cert) return;

    modalImg.style.opacity = "0.2";
    modalImg.style.transform = "scale(0.96)";

    setTimeout(() => {
      modalImg.src = cert.src;
      modalImg.alt = cert.alt;
      modalCaption.innerHTML = `${cert.title} <small>${cert.issuer}</small>`;
      if (modalCounter) {
        modalCounter.textContent = `${currentCertIndex + 1} of ${certData.length}`;
      }
      modalImg.style.opacity = "1";
      modalImg.style.transform = "scale(1)";
    }, 120);
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scrolling
  }

  function showNextCert() {
    currentCertIndex = (currentCertIndex + 1) % certData.length;
    updateModalContent();
  }

  function showPrevCert() {
    currentCertIndex = (currentCertIndex - 1 + certData.length) % certData.length;
    updateModalContent();
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeModal);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNextCert();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrevCert();
    });
  }

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal || !modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowRight") {
      showNextCert();
    } else if (e.key === "ArrowLeft") {
      showPrevCert();
    }
  });

  // ------------------------------------------------------------------------
  // 4. Contact Form Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show user-friendly success notification
      if (formSuccess) {
        formSuccess.style.display = "flex";
        setTimeout(() => {
          formSuccess.style.display = "none";
        }, 5000);
      }

      contactForm.reset();
    });
  }
});