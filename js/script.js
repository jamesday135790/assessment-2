document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Gallery filter (Home)
  const filterBtns = document.querySelectorAll('.filters .chip');
  const cards = document.querySelectorAll('#projectGallery .card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const match = f === 'all' || card.dataset.category === f;
        card.style.display = match ? '' : 'none';
      });
    });
  });

  // Testimonials (simple)
  const quotes = [
    { q: '“Malik transformed our apartment — it finally feels like home.”', by: '— S. Khalid' },
    { q: '“Professional, calm, and on budget. Highly recommend.”', by: '— N. Perera' },
    { q: '“Loved the mood boards and the final sourcing list.”', by: '— A. Nguyen' },
  ];
  const qEl = document.getElementById('testimonial');
  let qi = 0;
  function renderQuote() { if (qEl) qEl.innerHTML = `${quotes[qi].q}<footer>${quotes[qi].by}</footer>`; }
  renderQuote();
  document.querySelectorAll('[data-testimonial]').forEach(btn => {
    btn.addEventListener('click', () => {
      qi = (btn.dataset.testimonial === 'next') ? (qi + 1) % quotes.length : (qi - 1 + quotes.length) % quotes.length;
      renderQuote();
    });
  });

  // Newsletter mini validation
  const newsForm = document.getElementById('newsletterForm');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsEmail');
      const msg = document.getElementById('newsMsg');
      if (!email.value || !/.+@.+\..+/.test(email.value)) {
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = '#ef4444';
      } else {
        msg.textContent = 'Thanks! You’re on the list.';
        msg.style.color = '#7dd3fc';
        email.value = '';
      }
    });
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = [
        { id: 'name', test: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
        { id: 'email', test: v => /.+@.+\..+/.test(v), msg: 'Enter a valid email.' },
        { id: 'projectType', test: v => !!v, msg: 'Please choose a project type.' },
        { id: 'message', test: v => v.trim().length >= 20, msg: 'Tell us a bit more (min 20 chars).' },
      ];
      let ok = true;
      fields.forEach(f => {
        const el = document.getElementById(f.id);
        const err = document.querySelector(`.error[data-for="${f.id}"]`);
        const valid = f.test(el.value);
        err.textContent = valid ? '' : f.msg;
        if (!valid) ok = false;
      });
      const msg = document.getElementById('contactMsg');
      if (ok) {
        msg.textContent = 'Thanks — we’ll get back to you within 1–2 business days.';
        form.reset();
      } else {
        msg.textContent = '';
      }
    });
  }
});
