const navToggle = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const yearEl = document.querySelector('.year');
const form = document.querySelector('.cta-form');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (backToTop) {
  window.addEventListener('scroll', () => {
    const showButton = window.scrollY > 400;
    backToTop.classList.toggle('visible', showButton);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput?.value.trim();

    if (!email) {
      emailInput?.focus();
      return;
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = `Thanks, ${email}! We will reach out soon.`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 3200);

    form.reset();
  });
}
