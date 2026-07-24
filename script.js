/* FOUNDERPAGE — script.js v5 RESTORE */

const SITE = {
  whatsapp: {
    number: '5531900000000',
    messages: {
      header:  'Olá! Gostaria de solicitar um site pela FounderPage.',
      hero:    'Olá! Quero criar meu site com a FounderPage. Pode me ajudar?',
      cases:   'Olá! Vi os projetos da FounderPage e quero um site assim.',
      offer:   'Olá! Quero verificar a disponibilidade para criar meu site.',
      process: 'Olá! Quero começar meu projeto de site com a FounderPage.',
      final:   'Olá! Quero criar meu site com a FounderPage.',
      finalWA: 'Olá! Vim pelo site da FounderPage e gostaria de falar com vocês.',
      float:   'Olá! Tenho interesse em criar um site com a FounderPage.',
    }
  },
  instagram: 'https://instagram.com/founderpage',
  email: 'mailto:contato@founderpage.com.br',
  cases: {
    1: 'https://instagram.com/founderpage',
    2: 'https://instagram.com/founderpage',
    3: 'https://instagram.com/founderpage',
  },
  utm: { source: 'site', medium: 'lp', campaign: 'founderpage' }
};

function waLink(msg, extra) {
  extra = extra || {};
  const encoded = encodeURIComponent(msg);
  return 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encoded;
}

function initLinks() {
  const wa = SITE.whatsapp;
  const links = [
    ['btn-header',     wa.messages.header],
    ['btn-mob-cta',    wa.messages.header],
    ['btn-hero',       wa.messages.hero],
    ['btn-pillars-cta', 'Olá! Quero apresentar melhor minha empresa com a FounderPage.'],
    ['btn-cases',      wa.messages.cases],
    ['btn-offer',      wa.messages.offer],
    ['btn-process',    wa.messages.process],
    ['btn-guarantee',  'Olá! Quero criar meu site com a FounderPage com garantia de satisfação.'],
    ['btn-ministeps',  'Olá! Vi que é simples assim e quero começar meu site com a FounderPage!'],
    ['btn-final',      wa.messages.final],
    ['btn-final-wa',   wa.messages.finalWA],
    ['btn-wa-float',   wa.messages.float],
  ];
  links.forEach(function(pair) {
    var el = document.getElementById(pair[0]);
    if (!el) return;
    el.href = waLink(pair[1]);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  [1, 2, 3].forEach(function(n) {
    var el = document.getElementById('case-' + n + '-link');
    if (el) { el.href = SITE.cases[n]; el.target = '_blank'; el.rel = 'noopener'; }
  });

  var ig = document.getElementById('ft-ig');
  if (ig) { ig.href = SITE.instagram; ig.target = '_blank'; ig.rel = 'noopener'; }
  var em = document.getElementById('ft-em');
  if (em) em.href = SITE.email;
  var ftWa = document.getElementById('ft-wa');
  if (ftWa) { ftWa.href = waLink(wa.messages.float); ftWa.target = '_blank'; }
}

function initYear() {
  var el = document.getElementById('ft-year');
  if (el) el.textContent = new Date().getFullYear();
}

function initHeader() {
  // Cabeçalho estático no topo
}

function initMenu() {
  var btn   = document.getElementById('hamburger');
  var nav   = document.getElementById('mob-nav');
  var close = document.getElementById('mob-close');
  if (!btn || !nav) return;

  function openNav() {
    nav.style.display = 'flex';
    requestAnimationFrame(function() { nav.classList.add('open'); });
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    nav.classList.remove('open');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(function() {
      if (!nav.classList.contains('open')) nav.style.display = 'none';
    }, 250);
  }

  btn.addEventListener('click', openNav);
  if (close) close.addEventListener('click', closeNav);
  nav.querySelectorAll('[data-close]').forEach(function(el) {
    el.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeNav();
  });
}

function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('open');
      
      document.querySelectorAll('.faq-item.open').forEach(function(i) {
        i.classList.remove('open');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        var a = i.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
      });
      
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}

function initScrollProgress() {
  var bar = document.getElementById('scroll-progress');
  var milestone = document.getElementById('scroll-milestone');
  var offerSection = document.getElementById('offer');
  if (!bar) return;
  var ticking = false;
  
  function updateProgress() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var height = document.documentElement.scrollHeight - clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.height = scrolled + '%';
    
    if (offerSection && milestone) {
      var triggerPoint = offerSection.offsetTop - (clientHeight / 3);
      var milestonePercent = height > 0 ? (triggerPoint / height) * 100 : 0;
      milestonePercent = Math.max(5, Math.min(milestonePercent, 95));
      milestone.style.top = milestonePercent + '%';
      
      if (scrolled >= milestonePercent) {
        milestone.classList.add('active');
      } else {
        milestone.classList.remove('active');
      }
    }
    
    ticking = false;
  }
  
  updateProgress();
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
}

function initSmoothScroll() {
  var hHeight = (document.getElementById('header') || {}).offsetHeight || 72;
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - hHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

function initTicker() {
  var track = document.querySelector('.ticker-track');
  if (!track) return;
  var clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

function initUrgencyDate() {
  const el = document.getElementById('urgency-date');
  if (el) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    const day = String(targetDate.getDate()).padStart(2, '0');
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    el.textContent = `ATÉ DIA ${day}/${month}`;
  }
  
  const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
  const currentMonthName = monthNames[new Date().getMonth()];
  const monthEls = document.querySelectorAll('.dynamic-month');
  monthEls.forEach(m => m.textContent = currentMonthName);
}

function selectSegment(btn, value) {
  var pills = document.querySelectorAll('.segment-pill');
  pills.forEach(function(p) { p.classList.remove('active'); });
  btn.classList.add('active');
  var hidden = document.getElementById('lead-segment');
  if (hidden) hidden.value = value;
}

function handleLeadSubmit(e) {
  if (e) e.preventDefault();
  var name = document.getElementById('lead-name').value.trim();
  var phone = document.getElementById('lead-phone').value.trim();
  var company = document.getElementById('lead-company').value.trim() || 'Não informada';
  var segment = document.getElementById('lead-segment') ? document.getElementById('lead-segment').value : 'Não informado';

  var msg = 'Olá! Meu nome é ' + name + '.\n' +
            '📱 WhatsApp: ' + phone + '\n' +
            '🏢 Empresa: ' + company + '\n' +
            '💼 Segmento: ' + segment + '\n' +
            'Gostaria de solicitar um orçamento para o meu site com a FounderPage!';

  var url = waLink(msg);
  window.open(url, '_blank');
}

document.addEventListener('DOMContentLoaded', function() {
  initLinks();
  initYear();
  initHeader();
  initMenu();
  initFAQ();
  initReveal();
  initScrollProgress();
  initSmoothScroll();
  initTicker();
  initUrgencyDate();
});
