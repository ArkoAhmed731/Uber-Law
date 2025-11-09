const state = {
  testimonialIndex: 0,
  testimonialTimer: null,
  filteredSpecialty: 'all',
  conversations: []
};

const workflowSteps = [
  {
    id: 'intake',
    title: 'Share your legal goal',
    subtitle: 'Answer a few guided prompts in Bangla or English so we understand the context.',
    highlights: [
      'Takes under two minutes',
      'Upload optional documents securely',
      'Instant summary for your records'
    ],
    actionLabel: 'See sample questions'
  },
  {
    id: 'match',
    title: 'Get matched with advocates',
    subtitle: 'We surface three verified lawyers based on specialty, language, and budget.',
    highlights: [
      'Compare credentials side-by-side',
      'Transparent pricing before you book',
      'Ratings from clients like you'
    ],
    actionLabel: 'Preview lawyer cards'
  },
  {
    id: 'resolve',
    title: 'Collaborate to resolution',
    subtitle: 'Choose chat, call, or in-person sessions and track every milestone in one place.',
    highlights: [
      'AI copilot drafts summaries',
      'Shared workspace for documents',
      'Payment reminders and receipts'
    ],
    actionLabel: 'View client portal'
  }
];

const lawyerDirectory = [
  {
    id: 'ayesha-nawrin',
    name: 'Adv. Ayesha Nawrin',
    specialty: 'family',
    title: 'Family & Women’s Rights',
    chambers: 'Dhaka Family Court',
    languages: ['Bangla', 'English'],
    rating: 4.9,
    responses: 'Avg. response 12 min',
    experience: '8 years · 320+ matters',
    bio: 'Focus on guardianship, domestic violence relief, and mediated settlements with trauma-informed care.'
  },
  {
    id: 'rahman-kamal',
    name: 'Adv. Rahman Kamal',
    specialty: 'property',
    title: 'Property & Land Settlement',
    chambers: 'Chattogram Land Tribunal',
    languages: ['Bangla', 'Chittagonian'],
    rating: 4.8,
    responses: 'Avg. response 18 min',
    experience: '12 years · 540+ matters',
    bio: 'Helps with land mutation, title checks, real estate due diligence, and boundary dispute resolution.'
  },
  {
    id: 'mita-saha',
    name: 'Adv. Mita Saha',
    specialty: 'business',
    title: 'Startup & SME Counsel',
    chambers: 'Supreme Court of Bangladesh',
    languages: ['Bangla', 'English'],
    rating: 5.0,
    responses: 'Avg. response 9 min',
    experience: '6 years · 190+ matters',
    bio: 'Advises entrepreneurs on incorporation, investment agreements, compliance, and contract drafting.'
  },
  {
    id: 'saif-alam',
    name: 'Adv. Saif Alam',
    specialty: 'criminal',
    title: 'Criminal Defense & Cyber Crime',
    chambers: 'Rajshahi District Court',
    languages: ['Bangla', 'Hindi'],
    rating: 4.7,
    responses: 'Avg. response 22 min',
    experience: '10 years · 410+ matters',
    bio: 'Handles bail, cyber harassment, narcotics, and white collar defence with nationwide representation.'
  },
  {
    id: 'lamia-faruk',
    name: 'Adv. Lamia Faruk',
    specialty: 'family',
    title: 'Child Custody & Mediation',
    chambers: 'Khulna Family Court',
    languages: ['Bangla'],
    rating: 4.95,
    responses: 'Avg. response 14 min',
    experience: '9 years · 270+ matters',
    bio: 'Certified mediator helping families agree on custody, guardianship, and alimony arrangements.'
  },
  {
    id: 'ziad-hasan',
    name: 'Adv. Ziad Hasan',
    specialty: 'business',
    title: 'Trade & Tax Counsel',
    chambers: 'Sylhet Chambers',
    languages: ['Bangla', 'English'],
    rating: 4.85,
    responses: 'Avg. response 16 min',
    experience: '11 years · 300+ matters',
    bio: 'Supports SMEs with VAT strategy, export/import compliance, contract negotiations, and labour law.'
  }
];

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '৳499',
    cadence: 'per question',
    highlight: 'Great for quick clarity',
    features: [
      'AI copilot + lawyer review',
      'Follow-up chat within 24 hours',
      'Document checklist for your case'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '৳3,900',
    cadence: 'per month',
    highlight: 'Perfect for SMEs & startups',
    features: [
      'Unlimited AI queries',
      '4 scheduled consultations',
      'Document review up to 20 pages',
      'Dedicated client success partner'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Let’s talk',
    cadence: 'custom retainers',
    highlight: 'Tailored for corporates & NGOs',
    features: [
      'On-site legal clinics',
      'Compliance workshops',
      'Custom integrations & reporting',
      'Priority case routing'
    ]
  }
];

const testimonials = [
  {
    quote: 'The onboarding felt friendly and fast. We solved a land dispute without endless visits to chambers.',
    name: 'Sadia Rahman',
    role: 'Small business owner, Dhaka'
  },
  {
    quote: 'Our HR team gets answers on labour law in minutes. The Growth plan pays for itself every month.',
    name: 'Tanvir Ahmed',
    role: 'COO, venture-backed startup'
  },
  {
    quote: 'As an advocate, the platform gives me organized briefs and appreciative clients ready to take action.',
    name: 'Adv. Lamia Faruk',
    role: 'Family law specialist'
  }
];

const faqs = [
  {
    question: 'How are lawyers verified?',
    answer: 'We validate every license with the Bangladesh Bar Council, review NID, and vet experience before activating any profile.'
  },
  {
    question: 'Is my information secure?',
    answer: 'All documents are stored with bank-grade encryption. Only you and assigned lawyers can access shared files.'
  },
  {
    question: 'Do you support mobile wallets?',
    answer: 'Yes. Pay with bKash, Nagad, Rocket, bank cards, or bank transfer with instant receipts.'
  },
  {
    question: 'Can I get help outside Dhaka?',
    answer: 'Absolutely. Our network spans all 64 districts with video consultations for diaspora clients as well.'
  }
];

const promptSuggestions = [
  'Explain the steps to register a private limited company.',
  'Draft a rental agreement between landlord and tenant.',
  'What are bail options for a non-bailable offence?',
  'How do I transfer land ownership to a sibling?',
  'Create a checklist for SME labour law compliance.'
];

const responseTemplates = [
  {
    keywords: ['company', 'register', 'incorporate'],
    answer: 'To register a private limited company you will need name clearance from RJSC, draft MoA & AoA, submit incorporation documents, and register for TIN, VAT, and trade license. Our lawyers can prepare each filing with you.'
  },
  {
    keywords: ['rental', 'tenant', 'landlord'],
    answer: 'A compliant rental agreement should include tenancy duration, deposit, utility responsibilities, termination clause, and dispute resolution forum. We can share a vetted template and customize it for you.'
  },
  {
    keywords: ['bail', 'offence', 'offense'],
    answer: 'Bail applications require showing special circumstances and ensuring documents are ready for the magistrate. A senior advocate from our panel can draft and file within 24 hours.'
  },
  {
    keywords: ['transfer', 'land', 'mutation'],
    answer: 'Land transfer usually needs a registered sale or gift deed, payment of duty, and a mutation application at AC Land office. We guide you through each stage and verify encumbrances.'
  }
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function initNavigation() {
  const currentPage = document.body.dataset.page;
  qsa('[data-page-link]').forEach((link) => {
    const isActive = link.dataset.pageLink === currentPage;
    link.classList.toggle('active', isActive);
  });

  const toggle = qs('.nav-toggle');
  const navLinks = qs('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = qs(targetId);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks?.classList.remove('open');
          toggle?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

function createToast(message) {
  const container = qs('#toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function openModal({ title, body, footerButtons = [] }) {
  const modal = qs('#modal');
  if (!modal) return;
  qs('#modal-title').textContent = title;
  const bodyEl = qs('#modal-body');
  const footer = qs('#modal-footer');
  bodyEl.innerHTML = '';
  if (typeof body === 'string') {
    bodyEl.innerHTML = body;
  } else if (body instanceof HTMLElement) {
    bodyEl.appendChild(body);
  }
  footer.innerHTML = '';
  footerButtons.forEach((btn) => {
    const button = document.createElement('button');
    button.className = `btn ${btn.variant || 'primary'}`;
    button.textContent = btn.label;
    if (btn.onClick) {
      button.addEventListener('click', btn.onClick);
    }
    footer.appendChild(button);
  });
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = qs('#modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function renderWorkflow() {
  const container = qs('#workflow');
  if (!container) return;
  container.innerHTML = '';
  workflowSteps.forEach((step, index) => {
    const card = document.createElement('article');
    card.className = 'card workflow-card';
    card.innerHTML = `
      <div class="workflow-header">
        <span class="badge">${index + 1}</span>
        <h3>${step.title}</h3>
      </div>
      <p class="workflow-subtitle">${step.subtitle}</p>
    `;
    const list = document.createElement('ul');
    list.className = 'workflow-list';
    step.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    card.appendChild(list);
    const action = document.createElement('button');
    action.className = 'btn link';
    action.dataset.action = 'workflow-details';
    action.dataset.stepId = step.id;
    action.textContent = step.actionLabel;
    card.appendChild(action);
    container.appendChild(card);
  });
}

function renderLawyers() {
  const grid = qs('#lawyer-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = lawyerDirectory.filter((lawyer) => {
    if (state.filteredSpecialty === 'all') return true;
    return lawyer.specialty === state.filteredSpecialty;
  });
  filtered.forEach((lawyer) => {
    const card = document.createElement('article');
    card.className = 'card lawyer-card';
    card.innerHTML = `
      <div class="lawyer-header">
        <h3>${lawyer.name}</h3>
        <span class="rating">★ ${lawyer.rating.toFixed(2)}</span>
      </div>
      <p class="lawyer-title">${lawyer.title}</p>
      <p class="lawyer-meta">${lawyer.chambers}</p>
      <p class="lawyer-meta">${lawyer.languages.join(', ')} · ${lawyer.responses}</p>
      <p class="lawyer-meta">${lawyer.experience}</p>
      <p class="lawyer-bio">${lawyer.bio}</p>
    `;
    const actions = document.createElement('div');
    actions.className = 'lawyer-actions';
    const profileBtn = document.createElement('button');
    profileBtn.className = 'btn outline';
    profileBtn.dataset.action = 'view-profile';
    profileBtn.dataset.lawyerId = lawyer.id;
    profileBtn.textContent = 'View profile';
    const bookBtn = document.createElement('button');
    bookBtn.className = 'btn accent';
    bookBtn.dataset.action = 'book-lawyer';
    bookBtn.dataset.lawyerId = lawyer.id;
    bookBtn.textContent = 'Book consultation';
    actions.append(profileBtn, bookBtn);
    card.appendChild(actions);
    grid.appendChild(card);
  });

  if (!filtered.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No lawyers available for this specialty right now. Try another filter or request a callback.';
    grid.appendChild(empty);
  }
}

function renderPricing() {
  const grid = qs('#pricing-grid');
  if (!grid) return;
  grid.innerHTML = '';
  pricingPlans.forEach((plan) => {
    const card = document.createElement('article');
    card.className = 'card pricing-card';
    card.innerHTML = `
      <div class="pricing-header">
        <h3>${plan.name}</h3>
        <p class="price">${plan.price}</p>
        <p class="cadence">${plan.cadence}</p>
        <p class="highlight">${plan.highlight}</p>
      </div>
    `;
    const list = document.createElement('ul');
    list.className = 'feature-list';
    plan.features.forEach((feature) => {
      const li = document.createElement('li');
      li.textContent = feature;
      list.appendChild(li);
    });
    card.appendChild(list);
    const button = document.createElement('button');
    button.className = 'btn accent';
    button.dataset.action = 'select-plan';
    button.dataset.planId = plan.id;
    button.textContent = plan.id === 'enterprise' ? 'Request a strategy call' : 'Choose this plan';
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function renderTestimonial() {
  const container = qs('#testimonial-content');
  if (!container) return;
  const dots = qs('#testimonial-dots');
  const testimonial = testimonials[state.testimonialIndex];
  container.innerHTML = `
    <blockquote>“${testimonial.quote}”</blockquote>
    <p class="name">${testimonial.name}</p>
    <p class="role">${testimonial.role}</p>
  `;
  if (dots) {
    dots.innerHTML = '';
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.dataset.action = 'go-testimonial';
      dot.dataset.index = String(index);
      if (index === state.testimonialIndex) {
        dot.classList.add('active');
      }
      dots.appendChild(dot);
    });
  }
}

function startTestimonialRotation() {
  const container = qs('#testimonial-content');
  if (!container) return;
  if (state.testimonialTimer) {
    clearInterval(state.testimonialTimer);
  }
  state.testimonialTimer = setInterval(() => {
    state.testimonialIndex = (state.testimonialIndex + 1) % testimonials.length;
    renderTestimonial();
  }, 6000);
}

function renderFaqs() {
  const container = qs('#faq-list');
  if (!container) return;
  container.innerHTML = '';
  faqs.forEach((item) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = item.question;
    const answer = document.createElement('p');
    answer.textContent = item.answer;
    details.append(summary, answer);
    container.appendChild(details);
  });
}

function renderPrompts() {
  const container = qs('#prompt-buttons');
  if (!container) return;
  container.innerHTML = '';
  promptSuggestions.forEach((prompt) => {
    const button = document.createElement('button');
    button.className = 'btn chip';
    button.dataset.action = 'use-prompt';
    button.textContent = prompt;
    container.appendChild(button);
  });
}

function renderChat() {
  const windowEl = qs('#chat-window');
  if (!windowEl) return;
  windowEl.innerHTML = '';
  state.conversations.forEach((item) => {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${item.role}`;
    bubble.innerHTML = `<strong>${item.role === 'user' ? 'You' : item.role === 'ai' ? 'AI Copilot' : 'Lawyer'}:</strong> ${item.text}`;
    windowEl.appendChild(bubble);
  });
  windowEl.scrollTop = windowEl.scrollHeight;
}

function addMessage(role, text) {
  state.conversations.push({ role, text });
  renderChat();
}

function findResponse(message) {
  const lower = message.toLowerCase();
  for (const template of responseTemplates) {
    if (template.keywords.some((keyword) => lower.includes(keyword))) {
      return template.answer;
    }
  }
  return 'Thanks! A verified lawyer will follow up with a detailed answer shortly. You can also request a callback for complex matters.';
}

function handleAction(action, target) {
  switch (action) {
    case 'join-waitlist':
      openModal({
        title: 'Join the waitlist',
        body: `
          <form class="stacked-form" id="waitlist-form">
            <label>Name<input type="text" name="name" required placeholder="Your full name" /></label>
            <label>Email<input type="email" name="email" required placeholder="you@example.com" /></label>
            <label>Primary legal need<select name="need" required><option value="">Select</option><option value="family">Family</option><option value="business">Business</option><option value="property">Property</option><option value="criminal">Criminal</option></select></label>
            <button type="submit" class="btn accent">Submit</button>
          </form>
        `
      });
      const waitlistForm = qs('#waitlist-form');
      waitlistForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        closeModal();
        createToast('Thanks! We will email your early access invite soon.');
      });
      break;
    case 'view-lawyers':
      window.location.href = 'lawyers.html';
      break;
    case 'explore-pricing':
      window.location.href = 'pricing.html';
      break;
    case 'open-contact':
      openModal({
        title: 'Talk to support',
        body: `
          <p>Share a few details and our care team will reach out within 15 minutes.</p>
          <form class="stacked-form" id="contact-form">
            <label>Phone<input type="tel" name="phone" required placeholder="01XXXXXXXXX" /></label>
            <label>Message<textarea name="message" rows="3" required placeholder="Tell us how we can help"></textarea></label>
            <button type="submit" class="btn accent">Request callback</button>
          </form>
        `
      });
      const contactForm = qs('#contact-form');
      contactForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        closeModal();
        createToast('Thanks! Our team will call you shortly.');
      });
      break;
    case 'view-intake':
      openModal({
        title: 'Smart intake preview',
        body: `
          <ol class="modal-list">
            <li>Select your legal area and urgency.</li>
            <li>Answer personalised questions in Bangla or English.</li>
            <li>Upload supporting files and receive an instant summary.</li>
          </ol>
          <p class="modal-note">All responses are private and can be edited anytime.</p>
        `,
        footerButtons: [
          {
            label: 'Start now',
            variant: 'accent',
            onClick: () => {
              closeModal();
              createToast('Intake flow will open in the full product.');
            }
          }
        ]
      });
      break;
    case 'workflow-details': {
      const stepId = target.dataset.stepId;
      const step = workflowSteps.find((item) => item.id === stepId);
      if (!step) return;
      openModal({
        title: step.title,
        body: `
          <p>${step.subtitle}</p>
          <ul class="modal-list">
            ${step.highlights.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        `
      });
      break;
    }
    case 'view-profile': {
      const lawyerId = target.dataset.lawyerId;
      const lawyer = lawyerDirectory.find((item) => item.id === lawyerId);
      if (!lawyer) return;
      openModal({
        title: lawyer.name,
        body: `
          <p><strong>${lawyer.title}</strong></p>
          <p>${lawyer.bio}</p>
          <p>${lawyer.languages.join(', ')} · ${lawyer.experience}</p>
        `,
        footerButtons: [
          {
            label: 'Book consultation',
            variant: 'accent',
            onClick: () => {
              closeModal();
              handleAction('book-lawyer', { dataset: { lawyerId } });
            }
          }
        ]
      });
      break;
    }
    case 'book-lawyer': {
      const lawyerId = target.dataset.lawyerId;
      const lawyer = lawyerDirectory.find((item) => item.id === lawyerId);
      if (!lawyer) return;
      openModal({
        title: `Book time with ${lawyer.name}`,
        body: `
          <form class="stacked-form" id="booking-form">
            <label>Preferred date<input type="date" required /></label>
            <label>Preferred time<input type="time" required /></label>
            <label>Notes<textarea rows="3" placeholder="Share context for your session"></textarea></label>
            <button type="submit" class="btn accent">Confirm request</button>
          </form>
        `
      });
      const bookingForm = qs('#booking-form');
      bookingForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        closeModal();
        createToast('Consultation request sent! Expect a confirmation soon.');
      });
      break;
    }
    case 'select-plan': {
      const planId = target.dataset.planId;
      const plan = pricingPlans.find((item) => item.id === planId);
      if (!plan) return;
      openModal({
        title: `${plan.name} plan`,
        body: `
          <p>${plan.highlight}</p>
          <ul class="modal-list">
            ${plan.features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
          <p class="modal-note">We will contact you to finalise payment after you confirm.</p>
        `,
        footerButtons: [
          {
            label: 'Confirm interest',
            variant: 'accent',
            onClick: () => {
              closeModal();
              createToast('Great choice! We will email the next steps.');
            }
          }
        ]
      });
      break;
    }
    case 'prev-testimonial':
      state.testimonialIndex = (state.testimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial();
      startTestimonialRotation();
      break;
    case 'next-testimonial':
      state.testimonialIndex = (state.testimonialIndex + 1) % testimonials.length;
      renderTestimonial();
      startTestimonialRotation();
      break;
    case 'go-testimonial':
      state.testimonialIndex = Number(target.dataset.index) || 0;
      renderTestimonial();
      startTestimonialRotation();
      break;
    case 'use-prompt': {
      const input = qs('#chat-input');
      if (!input) return;
      input.value = target.textContent || '';
      input.focus();
      break;
    }
    case 'send-message': {
      const input = qs('#chat-input');
      if (!input || !input.value.trim()) return;
      const message = input.value.trim();
      addMessage('user', message);
      input.value = '';
      setTimeout(() => {
        addMessage('ai', findResponse(message));
        setTimeout(() => {
          addMessage('lawyer', 'I can help you move forward. Would you like to schedule a call or chat now?');
        }, 1200);
      }, 800);
      break;
    }
    case 'call-support':
      navigator.clipboard?.writeText('+8801234567890');
      createToast('Support number copied to clipboard.');
      break;
    case 'email-support':
      navigator.clipboard?.writeText('support@bicharbebostha.com');
      createToast('Support email copied to clipboard.');
      break;
    case 'view-privacy':
      openModal({
        title: 'Privacy overview',
        body: '<p>We use bank-grade encryption, secure access logs, and regular audits to keep your data safe.</p>'
      });
      break;
    case 'view-terms':
      openModal({
        title: 'Terms snapshot',
        body: '<p>Use of the platform requires verified identity, respectful conduct, and confidentiality of legal advice.</p>'
      });
      break;
    case 'scroll-top':
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;
    case 'close-modal':
      closeModal();
      break;
    default:
      break;
  }
}

function initFilters() {
  const filterButtons = qsa('[data-filter]');
  if (!filterButtons.length) return;
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      state.filteredSpecialty = button.dataset.filter || 'all';
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      renderLawyers();
    });
  });
}

function initForms() {
  qsa('form.inline-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      form.reset();
      createToast('Thanks for subscribing!');
    });
  });

  const chatForm = qs('#chat-form');
  chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    handleAction('send-message', chatForm.querySelector('[data-action="send-message"]'));
  });
}

function initPage() {
  const page = document.body.dataset.page;
  if (page === 'home') {
    renderWorkflow();
    renderTestimonial();
    startTestimonialRotation();
  }
  if (page === 'lawyers') {
    renderLawyers();
    initFilters();
  }
  if (page === 'pricing') {
    renderPricing();
  }
  if (page === 'support') {
    renderPrompts();
    renderChat();
    renderFaqs();
  }
}

function initEventDelegation() {
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;
    const action = target.dataset.action;
    handleAction(action, target);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  const modal = qs('#modal');
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', () => closeModal());
}

function init() {
  initNavigation();
  initForms();
  initEventDelegation();
  initPage();
}

document.addEventListener('DOMContentLoaded', init);
