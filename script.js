/* FOUNDERPAGE — script.js (Refatorado para SEO, Acessibilidade e CRO) */

const CONFIG = {
  // Número oficial de atendimento WhatsApp FounderPage
  whatsappNumber: '5531972247907',
  // URL do Web App do Google Sheets para gravação dos leads na planilha
  googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbzyVjoKCM4fO8084gW-xiNYKsNGXTkmOHv-LILKoYKu6jCW-ORRNt_gZCDSSClZfBDElg/exec',
  instagramUrl: 'https://instagram.com/founderpage',
  contactEmail: 'mailto:contato@founderpage.com.br',
  defaultMessages: {
    header: 'Olá! Gostaria de solicitar um orçamento para criação de site com a FounderPage.',
    hero: 'Olá! Quero criar meu site com a FounderPage. Pode me ajudar?',
    pillars: 'Olá! Quero apresentar melhor minha empresa com um site da FounderPage.',
    portfolio: 'Olá! Vi os projetos da FounderPage e gostaria de um orçamento.',
    guarantee: 'Olá! Quero criar meu site com a FounderPage com garantia de satisfação.',
    steps: 'Olá! Quero começar meu projeto de site com a FounderPage!',
    float: 'Olá! Tenho interesse em criar um site profissional com a FounderPage.',
    contact: 'Olá! Preenchi o formulário no site e gostaria de receber uma proposta.'
  }
};

// Verifica se o número de WhatsApp é um placeholder não configurado
function isPlaceholderNumber() {
  return !CONFIG.whatsappNumber || CONFIG.whatsappNumber === '5531900000000';
}

function buildWaLink(customMessage) {
  if (isPlaceholderNumber()) {
    console.warn('[SEO-WARNING] Número do WhatsApp ainda não configurado em CONFIG.whatsappNumber. Atualize no SEO-TODO.md');
  }
  const msg = encodeURIComponent(customMessage || CONFIG.defaultMessages.float);
  return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + msg;
}

function initLinks() {
  const linkMappings = [
    ['btn-header', CONFIG.defaultMessages.header],
    ['btn-mob-cta', CONFIG.defaultMessages.header],
    ['btn-hero', CONFIG.defaultMessages.hero],
    ['btn-pillars-cta', CONFIG.defaultMessages.pillars],
    ['btn-ministeps', CONFIG.defaultMessages.steps],
    ['btn-guarantee', CONFIG.defaultMessages.guarantee],
    ['btn-final', CONFIG.defaultMessages.header],
    ['btn-final-wa', CONFIG.defaultMessages.float],
    ['btn-wa-float', CONFIG.defaultMessages.float],
    ['ft-wa', CONFIG.defaultMessages.float]
  ];

  linkMappings.forEach(function(item) {
    var el = document.getElementById(item[0]);
    if (!el) return;
    el.href = buildWaLink(item[1]);
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
    el.addEventListener('click', function() {
      if (typeof fbq === 'function') {
        fbq('trackCustom', 'WhatsAppClick');
      }
    });
  });

  var ig = document.getElementById('ft-ig');
  if (ig) { ig.href = CONFIG.instagramUrl; ig.target = '_blank'; ig.rel = 'noopener noreferrer'; }

  var em = document.getElementById('ft-em');
  if (em) { em.href = CONFIG.contactEmail; }
}

function initYear() {
  var el = document.getElementById('ft-year');
  if (el) el.textContent = new Date().getFullYear();
}

function initMenu() {
  var btn = document.getElementById('hamburger');
  var nav = document.getElementById('mob-nav');
  var close = document.getElementById('mob-close');
  if (!btn || !nav) return;

  function openNav() {
    nav.style.display = 'flex';
    nav.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function() { nav.classList.add('open'); });
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (close) close.focus();
  }

  function closeNav() {
    nav.classList.remove('open');
    nav.setAttribute('aria-hidden', 'true');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    setTimeout(function() {
      if (!nav.classList.contains('open')) nav.style.display = 'none';
    }, 250);
    btn.focus();
  }

  btn.addEventListener('click', openNav);
  if (close) close.addEventListener('click', closeNav);

  nav.querySelectorAll('[data-close]').forEach(function(el) {
    el.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
    }
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
        var qBtn = i.querySelector('.faq-q');
        if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
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
  // Respeita preferência por movimento reduzido (prefers-reduced-motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
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
  if (!bar) return;
  var ticking = false;

  function updateProgress() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    var height = document.documentElement.scrollHeight - clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    bar.style.height = scrolled + '%';
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

function initInputValidation() {
  var nameInput = document.getElementById('lead-name');
  var phoneInput = document.getElementById('lead-phone');

  // Validação em tempo real do Nome (Bloqueia números e símbolos especiais)
  if (nameInput) {
    nameInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    });
  }

  // Validação e Máscara em tempo real do WhatsApp (Bloqueia letras e formata (XX) XXXXX-XXXX)
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      var v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);
      
      if (v.length > 10) {
        v = v.replace(/^(\d\d)(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d\d)(\d{4})(\d{0,4})$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d\d)(\d{0,5})$/, '($1) $2');
      } else if (v.length > 0) {
        v = v.replace(/^(\d*)$/, '($1');
      }
      e.target.value = v;
    });
  }
}

function sendToGoogleSheets(leadData) {
  if (!CONFIG.googleSheetsUrl) return;
  try {
    const formData = new FormData();
    formData.append('data', new Date().toLocaleString('pt-BR'));
    formData.append('nome', leadData.name);
    formData.append('whatsapp', leadData.phone);
    formData.append('empresa', leadData.company);

    fetch(CONFIG.googleSheetsUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).catch(function(err) {
      console.error('[GoogleSheets-Error]', err);
    });
  } catch (err) {
    console.error('[GoogleSheets-Error]', err);
  }
}

function initFormHandler() {
  initInputValidation();
  var form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var nameEl = document.getElementById('lead-name');
    var phoneEl = document.getElementById('lead-phone');
    var companyEl = document.getElementById('lead-company');

    var name = nameEl ? nameEl.value.trim() : '';
    var phone = phoneEl ? phoneEl.value.trim() : '';
    var company = companyEl && companyEl.value.trim() ? companyEl.value.trim() : 'Não informada';
    var digitsOnly = phone.replace(/\D/g, '');

    if (name.length < 3) {
      alert('Por favor, informe um nome válido (apenas letras).');
      if (nameEl) nameEl.focus();
      return;
    }

    if (digitsOnly.length < 10) {
      alert('Por favor, informe um número de WhatsApp válido com DDD (mínimo 10 dígitos).');
      if (phoneEl) phoneEl.focus();
      return;
    }

    // Salva os dados na planilha do Google Drive
    sendToGoogleSheets({ name: name, phone: phone, company: company });

    // Monta a mensagem e direciona para o WhatsApp
    var message = 'Olá! Meu nome é ' + name + '.\n' +
                  '📱 WhatsApp: ' + phone + '\n' +
                  '🏢 Empresa: ' + company + '\n' +
                  'Gostaria de receber uma proposta para criação de site com a FounderPage!';

    var url = buildWaLink(message);
    
    if (typeof fbq === 'function') {
      fbq('track', 'Lead');
    }

    window.open(url, '_blank');
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initLinks();
  initYear();
  initMenu();
  initFAQ();
  initReveal();
  initScrollProgress();
  initSmoothScroll();
  initFormHandler();
});
