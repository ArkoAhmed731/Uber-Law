const state = {
  testimonialIndex: 0,
  testimonialTimer: null,
  filteredSpecialty: 'all',
  conversations: []
};

const workflowSteps = [
  {
    id: 'need-assessment',
    title: 'Describe your legal need',
    subtitle: 'Answer a few smart questions in Bangla or English to get started.',
    highlights: ['Guided questionnaire under 2 minutes', 'Securely upload optional documents', 'Receive an instant intake summary'],
    actionLabel: 'Preview intake form'
  },
  {
    id: 'matchmaking',
    title: 'Match with the right lawyer',
    subtitle: 'AI pairs you with verified advocates based on specialty, budget, and language.',
    highlights: ['View top three recommended lawyers', 'Compare credentials and fees side-by-side', 'Chat before you commit'],
    actionLabel: 'See matching logic'
  },
  {
    id: 'resolution',
    title: 'Get advice or book representation',
    subtitle: 'Select instant chat, scheduled consultation, or long-term retainer support.',
    highlights: ['Transparent pricing & digital payments', 'Automatic reminders and summaries', 'Case status tracking dashboard'],
    actionLabel: 'Explore client portal'
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
    responses: 'Avg. response time: 12 minutes',
    experience: '8 years experience · 320+ resolved matters',
    bio: 'Specializes in guardianship, dowry disputes, domestic violence relief, and mediation for family conflicts.'
  },
  {
    id: 'rahman-kamal',
    name: 'Adv. Rahman Kamal',
    specialty: 'property',
    title: 'Property & Land Settlement',
    chambers: 'Chattogram Land Tribunal',
    languages: ['Bangla', 'Chittagonian'],
    rating: 4.8,
    responses: 'Avg. response time: 18 minutes',
    experience: '12 years experience · 540+ resolved matters',
    bio: 'Helps with land mutation, title checks, real estate due diligence, and resolving boundary disputes.'
  },
  {
    id: 'mita-saha',
    name: 'Adv. Mita Saha',
    specialty: 'business',
    title: 'Startup & SME Counsel',
    chambers: 'Supreme Court of Bangladesh',
    languages: ['Bangla', 'English'],
    rating: 5.0,
    responses: 'Avg. response time: 9 minutes',
    experience: '6 years experience · 190+ resolved matters',
    bio: 'Advises entrepreneurs on company registration, investment agreements, compliance, and contract drafting.'
  },
  {
    id: 'saif-alam',
    name: 'Adv. Saif Alam',
    specialty: 'criminal',
    title: 'Criminal Defense & Cyber Crime',
    chambers: 'Rajshahi District Court',
    languages: ['Bangla', 'Hindi'],
    rating: 4.7,
    responses: 'Avg. response time: 22 minutes',
    experience: '10 years experience · 410+ resolved matters',
    bio: 'Focuses on bail, fraud, cyber harassment, narcotics, and white collar defense with nationwide representation.'
  },
  {
    id: 'lamia-faruk',
    name: 'Adv. Lamia Faruk',
    specialty: 'family',
    title: 'Child Custody & Mediation',
    chambers: 'Khulna Family Court',
    languages: ['Bangla'],
    rating: 4.95,
    responses: 'Avg. response time: 14 minutes',
    experience: '9 years experience · 270+ resolved matters',
    bio: 'Certified mediator helping families reach amicable solutions for custody, guardianship, and alimony arrangements.'
  },
  {
    id: 'ziad-hasan',
    name: 'Adv. Ziad Hasan',
    specialty: 'business',
    title: 'Trade & Tax Counsel',
    chambers: 'Sylhet Chambers',
    languages: ['Bangla', 'English'],
    rating: 4.85,
    responses: 'Avg. response time: 16 minutes',
    experience: '11 years experience · 300+ resolved matters',
    bio: 'Supports SMEs with VAT strategy, export/import compliance, contract negotiations, and labour law matters.'
  }
];

const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '৳499',
    cadence: 'per question',
    highlight: 'Ideal for quick advice',
    features: [
      'AI triage & answer draft',
      'Response from a verified lawyer',
      'Follow-up chat within 24 hours'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '৳3,900',
    cadence: 'per month',
    highlight: 'Best for SMEs & startups',
    features: [
      'Unlimited AI queries',
      '4 scheduled consultations',
      'Document review up to 20 pages',
      'Dedicated client success manager'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Talk to us',
    cadence: 'custom retainers',
    highlight: 'Tailored for corporates & NGOs',
    features: [
      'On-site legal clinics',
      'Compliance training workshops',
      'Custom integrations & reporting',
      'Priority resolution SLA'
    ]
  }
];

const testimonials = [
  {
    quote: 'We resolved a land dispute faster than ever. The curated lawyer matches and clear pricing eliminated all uncertainty.',
    name: 'Sadia Rahman',
    role: 'Small business owner, Dhaka'
  },
  {
    quote: 'Our HR team uses the SME plan to get instant answers on labour law compliance. Game changer for scaling responsibly.',
    name: 'Tanvir Ahmed',
    role: 'COO, Venture-backed startup'
  },
  {
    quote: 'As a lawyer, I finally have a digital storefront. Verified reviews and secure payments help me focus on client work.',
    name: 'Adv. Lamia Faruk',
    role: 'Family law specialist'
  }
];

const faqs = [
  {
    question: 'How do you verify lawyers on the platform?',
    answer: 'We partner with the Bangladesh Bar Council to validate licenses, collect NID copies, and review disciplinary history before activating any lawyer profile.'
  },
  {
    question: 'Is the AI legal advice legally binding?',
    answer: 'AI responses are meant for education and triage. Every interaction is reviewed or co-authored by a human lawyer before final delivery to ensure compliance with Bangladeshi law.'
  },
  {
    question: 'Can I pay using mobile wallets like bKash?',
    answer: 'Yes. We support bKash, Rocket, Nagad, bank cards, and direct bank transfers. All transactions are encrypted and receipted instantly.'
  },
  {
    question: 'Do you provide services outside Dhaka?',
    answer: 'Absolutely. Our lawyer network covers all 64 districts and supports diaspora clients across the globe via secure video consultations.'
  }
];

const promptSuggestions = [
  'Explain the process to register a private limited company.',
  'Draft a rental agreement between landlord and tenant.',
  'What are the bail options for a non-bailable offense?',
  'How do I transfer land ownership to a family member?',
  'Create a checklist for SME labour law compliance.'
];

const responseTemplates = [
  {
    keywords: ['company', 'register', 'incorporate'],
    answer: 'To register a private limited company in Bangladesh you will need to (1) name clearance from RJSC, (2) draft MoA & AoA, (3) submit incorporation documents, and (4) register for TIN, VAT, and trade license. Our legal team can guide each filing.'
  },
  {
    keywords: ['rental', 'tenant', 'landlord'],
    answer: 'A compliant rental agreement should cover tenancy duration, advance deposit, utility responsibilities, termination clause, and dispute resolution forum. We have a downloadable template vetted for Bangladeshi law.'
  },
  {
    keywords: ['bail', 'offense', 'arrest'],
    answer: 'Bail applications depend on the offense category. For non-bailable offenses you must show special circumstances—such as illness or lack of prima facie evidence. A senior advocate from our panel can draft and file within 24 hours.'
  },
  {
    keywords: ['transfer', 'land', 'mutation'],
    answer: 'Land transfer requires (1) verifying khatian, (2) executing a registered sale/gift deed, (3) paying registration & stamp duty, and (4) applying for mutation at AC Land office. We also help with vetting encumbrances.'
  }
];

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function smoothScrollTo(target) {
  const el = typeof target === 'string' ? qs(target) : target;
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top: offset, behavior: 'smooth' });
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
  }, 3200);
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
    button.className = btn.variant || 'primary';
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
  workflowSteps.forEach((step) => {
    const card = document.createElement('article');
    card.className = 'card step';
    const header = document.createElement('div');
    header.className = 'step-header';
    header.innerHTML = `<span class="badge">${workflowSteps.indexOf(step) + 1}</span><h3>${step.title}</h3>`;
    card.appendChild(header);
    const subtitle = document.createElement('p');
    subtitle.className = 'step-subtitle';
    subtitle.textContent = step.subtitle;
    card.appendChild(subtitle);
    const list = document.createElement('ul');
    list.className = 'step-list';
    step.highlights.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    card.appendChild(list);
    const action = document.createElement('button');
    action.className = 'inline';
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
    profileBtn.className = 'secondary';
    profileBtn.dataset.action = 'view-profile';
    profileBtn.dataset.lawyerId = lawyer.id;
    profileBtn.textContent = 'View profile';
    const bookBtn = document.createElement('button');
    bookBtn.className = 'primary';
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

function renderPrompts() {
  const container = qs('#prompt-buttons');
  if (!container) return;
  container.innerHTML = '';
  promptSuggestions.forEach((prompt) => {
    const btn = document.createElement('button');
    btn.className = 'secondary';
    btn.dataset.action = 'use-prompt';
    btn.textContent = prompt;
    container.appendChild(btn);
  });
}

function findResponse(message) {
  const lower = message.toLowerCase();
  for (const template of responseTemplates) {
    if (template.keywords.some((keyword) => lower.includes(keyword))) {
      return template.answer;
    }
  }
  return 'Thanks for your question! A verified lawyer will review the context and follow up within a few minutes. Meanwhile, you can upload supporting documents inside the client portal.';
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
    button.className = 'primary';
    button.dataset.action = 'select-plan';
    button.dataset.planId = plan.id;
    button.textContent = plan.id === 'enterprise' ? 'Talk to legal strategist' : 'Start plan';
    card.appendChild(button);
    grid.appendChild(card);
  });
}

function renderTestimonial() {
  const container = qs('#testimonial-content');
  if (!container) return;
  const testimonial = testimonials[state.testimonialIndex];
  container.innerHTML = `
    <blockquote>“${testimonial.quote}”</blockquote>
    <p class="name">${testimonial.name}</p>
    <p class="role">${testimonial.role}</p>
  `;
}

function renderFaqs() {
  const container = qs('#faq-list');
  if (!container) return;
  container.innerHTML = '';
  faqs.forEach((faq, index) => {
    const item = document.createElement('article');
    item.className = 'faq-item';
    const button = document.createElement('button');
    button.className = 'faq-question';
    button.dataset.action = 'toggle-faq';
    button.dataset.index = index;
    button.innerHTML = `
      <span>${faq.question}</span>
      <span class="icon">+</span>
    `;
    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.textContent = faq.answer;
    item.append(button, answer);
    container.appendChild(item);
  });
}

function toggleFaq(index) {
  const container = qs('#faq-list');
  if (!container) return;
  const items = container.querySelectorAll('.faq-item');
  items.forEach((item, idx) => {
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.icon');
    if (idx === index) {
      const expanded = item.classList.toggle('expanded');
      answer.style.maxHeight = expanded ? `${answer.scrollHeight}px` : '0px';
      icon.textContent = expanded ? '−' : '+';
    } else {
      item.classList.remove('expanded');
      answer.style.maxHeight = '0px';
      icon.textContent = '+';
    }
  });
}

function handleHeroAction(action) {
  switch (action) {
    case 'launch-demo':
      openModal({
        title: 'Interactive product demo',
        body: `
          <p>Take a guided tour of our client portal. Explore how citizens submit cases, how AI drafts answers, and how lawyers collaborate in real time.</p>
          <ul class="modal-list">
            <li>Watch a 3 minute walkthrough</li>
            <li>Download a sample case summary PDF</li>
            <li>Preview the live analytics dashboard</li>
          </ul>
        `,
        footerButtons: [
          {
            label: 'Open demo environment',
            variant: 'primary',
            onClick: () => {
              createToast('Demo environment link sent to your email.');
              closeModal();
            }
          },
          {
            label: 'Close',
            variant: 'secondary',
            onClick: closeModal
          }
        ]
      });
      break;
    case 'view-lawyers':
      smoothScrollTo('#marketplace');
      createToast('Scroll down to explore featured lawyers.');
      break;
    case 'open-roadmap':
      smoothScrollTo('#roadmap');
      break;
    case 'join-waitlist':
      openModal({
        title: 'Join the early access waitlist',
        body: `
          <form class="waitlist-form">
            <label>Name<input type="text" required placeholder="Your full name"></label>
            <label>Email<input type="email" required placeholder="you@example.com"></label>
            <label>Primary legal need<select required><option value="">Select</option><option>Family</option><option>Business</option><option>Property</option><option>Criminal</option></select></label>
            <button type="submit" class="primary">Request access</button>
          </form>
        `,
        footerButtons: []
      });
      const waitlistForm = qs('.waitlist-form');
      if (waitlistForm) {
        waitlistForm.addEventListener('submit', (event) => {
          event.preventDefault();
          closeModal();
          createToast('Thanks! You are on the early access list.');
        });
      }
      break;
    case 'schedule-demo':
      openModal({
        title: 'Schedule a founder call',
        body: buildTimeSlots(),
        footerButtons: [
          {
            label: 'Need other times?',
            variant: 'secondary',
            onClick: () => {
              createToast('We will email you alternative time slots.');
              closeModal();
            }
          }
        ]
      });
      break;
    case 'download-deck':
      createToast('Investor deck is downloading… (check your downloads folder)');
      break;
    case 'view-playbook':
      openModal({
        title: 'Client onboarding playbook',
        body: `
          <p>We walk every new client through a verified process to ensure accuracy and trust.</p>
          <ol class="modal-list ordered">
            <li>Identity & document verification</li>
            <li>AI-generated case summary reviewed by a senior advocate</li>
            <li>Transparent fee structure shared upfront</li>
            <li>Weekly progress updates via app, SMS, and email</li>
          </ol>
        `,
        footerButtons: [
          {
            label: 'Download playbook PDF',
            variant: 'primary',
            onClick: () => {
              createToast('Playbook PDF sent to your email.');
              closeModal();
            }
          }
        ]
      });
      break;
    case 'subscribe-updates':
      createToast('Subscribed to roadmap updates! We will keep you posted.');
      break;
    case 'join-movement':
      openModal({
        title: 'Join the access to justice movement',
        body: `
          <p>We collaborate with legal aid organizations, universities, and civic innovators. Share how you would like to partner with Bichar Bebostha.</p>
          <textarea rows="4" placeholder="I want to help by…"></textarea>
        `,
        footerButtons: [
          {
            label: 'Submit interest',
            variant: 'primary',
            onClick: () => {
              closeModal();
              createToast('Thanks! Our partnerships team will reach out.');
            }
          }
        ]
      });
      break;
    case 'view-privacy':
      openModal({
        title: 'Privacy overview',
        body: '<p>We use bank-grade encryption and comply with the Digital Security Act. Full policy available on request.</p>'
      });
      break;
    case 'view-terms':
      openModal({
        title: 'Terms snapshot',
        body: '<p>Users agree to verified identity, respectful conduct, and non-disclosure of legal advice outside their case.</p>'
      });
      break;
    case 'contact-support':
      openModal({
        title: 'Talk to support',
        body: '<p>Email support@bicharbebostha.com or call +880 1234-567890 for urgent case escalations.</p>'
      });
      break;
    case 'scroll-top':
      smoothScrollTo('#top');
      break;
    default:
      break;
  }
}

function buildTimeSlots() {
  const wrapper = document.createElement('div');
  wrapper.className = 'time-slots';
  const slots = [
    { day: 'Tuesday', time: '10:00 AM BST' },
    { day: 'Tuesday', time: '2:30 PM BST' },
    { day: 'Wednesday', time: '11:15 AM BST' },
    { day: 'Thursday', time: '5:00 PM BST' }
  ];
  slots.forEach((slot) => {
    const button = document.createElement('button');
    button.className = 'primary';
    button.textContent = `${slot.day} · ${slot.time}`;
    button.addEventListener('click', () => {
      closeModal();
      createToast(`Booked a founder call for ${slot.day} at ${slot.time}.`);
    });
    wrapper.appendChild(button);
  });
  return wrapper;
}

function handleLawyerAction(action, id) {
  const lawyer = lawyerDirectory.find((item) => item.id === id);
  if (!lawyer) return;
  if (action === 'view-profile') {
    openModal({
      title: lawyer.name,
      body: `
        <p class="modal-subtitle">${lawyer.title}</p>
        <p>${lawyer.bio}</p>
        <p><strong>Languages:</strong> ${lawyer.languages.join(', ')}</p>
        <p><strong>Chambers:</strong> ${lawyer.chambers}</p>
        <p><strong>Track record:</strong> ${lawyer.experience}</p>
      `,
      footerButtons: [
        {
          label: 'Book consultation',
          variant: 'primary',
          onClick: () => {
            closeModal();
            openBookingFlow(lawyer);
          }
        },
        {
          label: 'Close',
          variant: 'secondary',
          onClick: closeModal
        }
      ]
    });
  }
  if (action === 'book-lawyer') {
    openBookingFlow(lawyer);
  }
}

function openBookingFlow(lawyer) {
  openModal({
    title: `Book ${lawyer.name}`,
    body: `
      <p>Select how you would like to engage ${lawyer.name.split(' ')[1] || 'this lawyer'}.</p>
      <div class="booking-options">
        <button class="secondary" data-booking="chat">Instant chat — ৳799</button>
        <button class="secondary" data-booking="video">30 min video consult — ৳1,799</button>
        <button class="secondary" data-booking="court">Full case representation — Custom quote</button>
      </div>
    `,
    footerButtons: [
      {
        label: 'Confirm selection',
        variant: 'primary',
        onClick: () => {
          closeModal();
          createToast(`We will connect you with ${lawyer.name} within minutes.`);
        }
      }
    ]
  });
  const bookingButtons = qsa('[data-booking]');
  bookingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      bookingButtons.forEach((btn) => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
}

function handlePlanSelection(id) {
  const plan = pricingPlans.find((item) => item.id === id);
  if (!plan) return;
  createToast(`Great choice! A specialist will follow up about the ${plan.name} plan.`);
}

function rotateTestimonial(direction) {
  if (direction === 'next') {
    state.testimonialIndex = (state.testimonialIndex + 1) % testimonials.length;
  } else {
    state.testimonialIndex = (state.testimonialIndex - 1 + testimonials.length) % testimonials.length;
  }
  renderTestimonial();
}

function startTestimonialAutoRotate() {
  if (state.testimonialTimer) {
    clearInterval(state.testimonialTimer);
  }
  state.testimonialTimer = setInterval(() => {
    rotateTestimonial('next');
  }, 7000);
}

function handleWorkflowDetails(stepId) {
  const step = workflowSteps.find((item) => item.id === stepId);
  if (!step) return;
  openModal({
    title: step.title,
    body: `
      <p>${step.subtitle}</p>
      <ul class="modal-list">
        ${step.highlights.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `,
    footerButtons: [
      {
        label: 'Request personalized walkthrough',
        variant: 'primary',
        onClick: () => {
          closeModal();
          createToast('We scheduled a walkthrough for you. Check your email.');
        }
      }
    ]
  });
}

function handlePromptSubmit(message) {
  addMessage('user', message);
  const aiResponse = findResponse(message);
  setTimeout(() => {
    addMessage('ai', aiResponse);
    setTimeout(() => {
      addMessage('lawyer', 'A senior advocate is reviewing your case details and will join shortly.');
    }, 800);
  }, 500);
}

function initChat() {
  state.conversations = [
    { role: 'ai', text: 'Hello! I am your legal copilot. How can I help you today?' }
  ];
  renderChat();
}

function bindGlobalEvents() {
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    event.preventDefault();
    const action = button.dataset.action;
    if (['view-profile', 'book-lawyer'].includes(action)) {
      handleLawyerAction(action, button.dataset.lawyerId);
      return;
    }
    if (action === 'select-plan') {
      handlePlanSelection(button.dataset.planId);
      return;
    }
    if (action === 'workflow-details') {
      handleWorkflowDetails(button.dataset.stepId);
      return;
    }
    if (action === 'use-prompt') {
      const input = qs('#prompt-input');
      if (input) {
        input.value = button.textContent;
        input.focus();
      }
      return;
    }
    if (action === 'prev-testimonial') {
      rotateTestimonial('prev');
      startTestimonialAutoRotate();
      return;
    }
    if (action === 'next-testimonial') {
      rotateTestimonial('next');
      startTestimonialAutoRotate();
      return;
    }
    handleHeroAction(action);
  });

  document.addEventListener('click', (event) => {
    if (event.target.dataset?.action === 'close-modal' || event.target.closest('[data-action="close-modal"]')) {
      closeModal();
    }
  });

  const modal = qs('#modal');
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  qsa('a[href^="#"]').forEach((link) => {
    if (link.dataset.action) return;
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      event.preventDefault();
      smoothScrollTo(href);
    });
  });

  qsa('.filters button').forEach((button) => {
    button.addEventListener('click', () => {
      qsa('.filters button').forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      state.filteredSpecialty = button.dataset.filter;
      renderLawyers();
    });
  });

  const promptForm = qs('#prompt-form');
  if (promptForm) {
    promptForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = qs('#prompt-input');
      if (!input?.value.trim()) return;
      const message = input.value.trim();
      input.value = '';
      handlePromptSubmit(message);
    });
  }

  const contactForm = qs('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      contactForm.reset();
      createToast('Thanks! We will reach out shortly.');
    });
  }

  document.addEventListener('click', (event) => {
    if (event.target.matches('[data-booking]')) {
      event.preventDefault();
    }
  });
}

function renderInitialState() {
  const yearEl = qs('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  renderWorkflow();
  renderLawyers();
  renderPrompts();
  renderPricing();
  renderTestimonial();
  renderFaqs();
  initChat();
  qsa('.filters button')[0]?.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  renderInitialState();
  bindGlobalEvents();
  startTestimonialAutoRotate();
});
