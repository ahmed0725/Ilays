
// Main JS: small interactions and validation.
document.addEventListener('DOMContentLoaded', function () {
  // Year replacements
  const yearElements = [...document.querySelectorAll('[id^="year"]')];
  yearElements.forEach(el => el.textContent = new Date().getFullYear());

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.querySelector('.nav-list');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('show');
    });
  }

  // Simple contact form handling (client-side only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const formMsg = document.getElementById('formMsg');

      // basic validation
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        formMsg.textContent = 'Please fill in all fields.';
        formMsg.style.color = '#fca5a5';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email.value)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.style.color = '#fca5a5';
        return;
      }

      // Simulate send (client-side)
      formMsg.textContent = 'Message sent (client-side). For real email, connect to a backend or use Formspree.';
      formMsg.style.color = '#86efac';
      contactForm.reset();
    });
  }

  // Member modal logic
  const members = document.querySelectorAll('.member-card');
  const modal = document.getElementById('profileModal');
  const modalClose = document.getElementById('modalClose');
  const modalName = document.getElementById('modalName');
  const modalEmail = document.getElementById('modalEmail');
  const modalBio = document.getElementById('modalBio');
  const modalImg = document.getElementById('modalImg');
  const modalRole = document.getElementById('modalRole');

  members.forEach(card => {
    card.addEventListener('click', () => openProfile(card));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openProfile(card); });
  });

  function openProfile(card) {
    const name = card.dataset.name || 'Student';
    const email = card.dataset.email || 'email@example.com';
    const bio = card.dataset.bio || '';
    const img = card.querySelector('img')?.src || 'assets/images/student1.png';
    const role = card.querySelector('p')?.textContent || '';

    modalName.textContent = name;
    modalEmail.textContent = email;
    modalBio.textContent = bio;
    modalImg.src = img;
    modalRole.textContent = role;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modalClose.focus();
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Keyboard: close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
