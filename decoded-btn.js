/* SETTINGS */
LAME_SUS_LIMIT = 85;
LAME_DIFF_UNIT = (typeof setting == 'undefined' || setting == 'word') ? 'char' : 'word'; /* for objection similarity */

/* LINKS */
LAME_CURRENT_URL = window.location.href;
LAME_CDN = 'http://lamer.netlify.app/';

/* REGEX */
LAME_SUPPORTED_PAGES = {
  'project-page': ['project-page.js', /lame\.netlify\.app/],
  'crowd-monitoring': ['crowd-monitoring.js', /a\.flit\.to:4435\/admin#\/admin\/req_tr/],
  'arcade-objection': ['arcade-objection.js', /a3\.flit\.to\/#\/arcade\/arcade-objection/],
  'arcade-history': ['arcade-history.js', /a3\.flit\.to\/#\/arcade\/arcade-user-history/],
  'pro-applicant': ['pro-applicant.js', /a3\.flit\.to\/#\/pro-tr\/pro-applicant\/\d/],
  'flitto-api': ['mt-similarity.js', /api-demo\.flit\.to/],
  'translators-to': ['mt-similarity.js', /translators\.to/]
}

/* FLOW */
for (let page of LAME_SUPPORTED_PAGES) {
  /* If regex matches and script not yet injected */
  if (page[1].test(LAME_CURRENT_URL) && !document.head.querySelectorAll(`[src="${LAME_CDN}${page[0]}"]`).length) {
    injectRemoteScript(`${LAME_CDN}${page[0]}"]`)
  } else { reclick() }
}

/* EXTRACTED */
function injectRemoteScript(src) {
  return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', resolve);
      script.addEventListener('error', e => reject(e.error));
      document.head.appendChild(script);
  });
}
