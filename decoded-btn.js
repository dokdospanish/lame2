LAME_CDN = `https://lame.netlify.com/`;
LAME_CURRENT_URL = window.location.href;


let LAME_SUPPORTED_SITES = [
  {rx: /lame\.netlify\.app/, scriptSrc: `${LAME_CDN}project=page.js`},
  {rx: /a\.flit\.to:4435\/admin#\/admin\/req_tr/, scriptSrc: `${LAME_CDN}crowd-monitoring.js`},
  {rx: /a3\.flit\.to\/#\/arcade\/arcade-objection/, scriptSrc: `${LAME_CDN}arcade-objection.js`},
  {rx: /a3\.flit\.to\/#\/arcade\/arcade-user-history/, scriptSrc: `${LAME_CDN}arcade-history.js`},
  {rx: /api-demo\.flit\.to/, scriptSrc: `${LAME_CDN}extend-simi-sites.js`},
  {rx: /translators\.to/, scriptSrc: `${LAME_CDN}extend-simi-sites.js`},
  {rx: /a3\.flit\.to\/#\/pro-tr\/pro-applicant\/\d/, scriptSrc: `${LAME_CDN}pro-applicant.js`},
];


let matchedScript;
for (let {rx, scriptSrc} of LAME_SUPPORTED_SITES) {
  if (rx.test(LAME_CURRENT_URL)) { matchedSite = scriptSrc }
}
if (!matchedScript) { throw 'Site not supported by LAME' }



if (!document.head.querySelectorAll(`[src="${matchedScript}"]`).length) {
  injectRemoteScript(matchedScript)
  .then(lameify())
}
else {
  lameify()
}



function injectRemoteScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', e => reject(e.error));
    document.head.appendChild(script);
  });
}
