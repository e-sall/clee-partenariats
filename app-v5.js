(() => {
  'use strict';
  const config = window.CLEE_CONFIG || {};
  const email = config.CONTACT_EMAIL || 'partenariats@clee.polymtl.ca';
  const nodes = [...document.querySelectorAll('[data-en]')];
  const originals = new Map(nodes.map(node => [node, node.innerHTML]));
  const ariaNodes = [...document.querySelectorAll('[data-en-aria]')];
  const originalAria = new Map(ariaNodes.map(node => [node, node.getAttribute('aria-label')]));
  const metadata = {
    fr: {title: 'Partenariats entreprises | CL�E � Polytechnique Montr�al', description: 'Activit�s cibl�es et partenariats fondateurs du Cahier de l'ing�nieur. Construisez votre collaboration avec les �tudiants de Polytechnique Montr�al.', ogTitle: 'Votre entreprise. Les talents de demain. | CL�E', ogDescription: 'Rencontrez les �tudiants de Polytechnique Montr�al et construisez une collaboration qui a du sens.'},
    en: {title: 'Industry partnerships | CL�E � Polytechnique Montr�al', description: 'Tailored student activities and founding partnerships for the Cahier de l'ing�nieur. Build your collaboration with Polytechnique Montr�al students.', ogTitle: 'Your company. Tomorrow's talent. | CL�E', ogDescription: 'Connect with Polytechnique Montr�al students and build a meaningful collaboration.'}
  };
  function mailLink(lang) {
    const subject = lang === 'en' ? '15-minute conversation | CL�E partnership' : '�change de 15 minutes | Partenariat CL�E';
    const body = lang === 'en' ? 'Hello,\n\nWe would like to learn more about collaboration opportunities with the CL�E and arrange a short 15-minute conversation.\n\nCompany:\nAvailability:\n\nThank you!' : 'Bonjour,\n\nNous aimerions en savoir davantage sur les possibilit�s de collaboration avec le CL�E et organiser un court �change de 15 minutes.\n\nEntreprise :\nDisponibilit�s :\n\nMerci !';
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  function formURL() {
    try { const url = new URL(config.GOOGLE_FORM_URL); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
  }
  function setLanguage(lang, updateURL = true) {
    lang = lang === 'en' ? 'en' : 'fr';
    nodes.forEach(node => { node.innerHTML = lang === 'en' ? node.dataset.en : originals.get(node); });
    ariaNodes.forEach(node => node.setAttribute('aria-label', lang === 'en' ? node.dataset.enAria : originalAria.get(node)));
    document.documentElement.lang = lang === 'en' ? 'en-CA' : 'fr-CA';
    document.querySelectorAll('.workshop-document').forEach(link => { link.href = lang === 'en' ? 'assets/CLEE_Company_Workshops_2026-2027_EN.pdf' : 'assets/CLEE_Workshops_Entreprises_2026-2027_FR.pdf'; });
    document.title = metadata[lang].title;
    document.querySelector('meta[name="description"]').content = metadata[lang].description;
    document.querySelector('meta[property="og:title"]').content = metadata[lang].ogTitle;
    document.querySelector('meta[property="og:description"]').content = metadata[lang].ogDescription;
    document.querySelector('meta[property="og:locale"]').content = lang === 'en' ? 'en_CA' : 'fr_CA';
    document.querySelector('meta[property="og:locale:alternate"]').content = lang === 'en' ? 'fr_CA' : 'en_CA';
    const canonical = 'https://e-sall.github.io/clee-partenariats/' + (lang === 'en' ? '?lang=en' : '');
    document.querySelector('link[rel="canonical"]').href = canonical;
    document.querySelector('meta[property="og:url"]').content = canonical;
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    document.querySelectorAll('.mail-link').forEach(link => { link.href = mailLink(lang); });
    document.querySelectorAll('.form-link').forEach(link => {
      const url = formURL();
      link.href = url || mailLink(lang);
      if (!url) {
        link.removeAttribute('target');
        link.querySelector('span').textContent = lang === 'en' ? 'Express my interest by email' : 'Indiquer mon int�r�t par courriel';
        link.nextElementSibling.textContent = lang === 'en' ? 'Contact us by email while the form is unavailable.' : 'Contactez-nous par courriel en attendant le formulaire.';
      }
    });
    if (updateURL) {
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.set('lang','en'); else url.searchParams.delete('lang');
      try { window.history.replaceState(null, '', url); } catch { /* Also works when opened as a local file. */ }
    }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  window.addEventListener('popstate', () => setLanguage(new URLSearchParams(location.search).get('lang'), false));
  setLanguage(new URLSearchParams(location.search).get('lang'), false);
})();
