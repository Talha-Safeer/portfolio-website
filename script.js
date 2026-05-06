document.documentElement.classList.add("js");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const themeToggle = document.getElementById("themeToggle");
const contactForm = document.getElementById("contactForm");

if (year) year.textContent = new Date().getFullYear();

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeToggle) themeToggle.textContent = "☀";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "light");
      themeToggle.textContent = "☾";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
      themeToggle.textContent = "☀";
    }
  });
}

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 130;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });
  navItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name")?.value.trim() || "";
    const visitorEmail = document.getElementById("email")?.value.trim() || "";
    const subjectInput = document.getElementById("subject")?.value.trim() || "Website Contact";
    const message = document.getElementById("message")?.value.trim() || "";
    const receiverEmail = "talha.syed0323@gmail.com";
    const subject = `Portfolio Contact - ${subjectInput}`;
    const body = `Dear Syed Talha Safeer Gardezi,

I am contacting you through your portfolio website.

Name: ${name}
Email: ${visitorEmail}
Subject: ${subjectInput}

Message:
${message}

Thank you.`;
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(receiverEmail)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank");
  });
}
