// ====== UNICO FILE DA MODIFICARE: link, prezzi, video, chiamata, email ======
window.CFG = {
  guideLink: "https://buy.stripe.com/14AeVddJO0Kg9vL7erfIs03", // Payment Link della guida
  guideCode: "GUIDA80",     // codice promo applicato in automatico
  fullPrice: "9,90",        // prezzo pieno (barrato)
  price: "2",               // prezzo con il codice
  videoId: "",              // ID del video di 3 minuti su YouTube (es. dQw4w9WgXcQ). Vuoto = segnaposto
  callUrl: "",              // link per fissare la chiamata (Calendly, Cal.com, WhatsApp...). Vuoto = scrive via email
  whatsapp: "",             // numero WhatsApp con prefisso e senza + né spazi (es. 34600123456). Vuoto = il pulsante resta nascosto
  support: "mallamo.simone@gmail.com",
  // Recensioni REALI di chi ha fatto il percorso. Se la lista è vuota la sezione resta nascosta.
  // Ogni voce: { text: "frase del cliente", name: "Nome", role: "chi è / da dove" }  (usa solo recensioni autorizzate)
  reviews: []
};
document.addEventListener("DOMContentLoaded", () => {
  const C = window.CFG, q = s => document.querySelectorAll(s);
  const withCode = (l, c) => c ? l + (l.includes("?") ? "&" : "?") + "prefilled_promo_code=" + encodeURIComponent(c) : l;
  q("[data-buy]").forEach(a => a.href = withCode(C.guideLink, C.guideCode));
  q("[data-price]").forEach(e => e.textContent = C.price);
  q("[data-full-price]").forEach(e => e.textContent = C.fullPrice);
  q("[data-code]").forEach(e => e.textContent = C.guideCode);
  q("[data-support]").forEach(e => { e.textContent = C.support; e.href = "mailto:" + C.support; });
  const call = C.callUrl || ("mailto:" + C.support + "?subject=" + encodeURIComponent("Vorrei fissare una chiamata"));
  q("[data-call]").forEach(a => { a.href = call; if (C.callUrl) { a.target = "_blank"; a.rel = "noopener"; } });
  q("[data-wa]").forEach(a => {
    const n = String(C.whatsapp || "").replace(/\D/g, "");
    if (!n) return;
    a.href = "https://wa.me/" + n + "?text=" + encodeURIComponent("Ciao Simone, ho scaricato la guida e vorrei maggiori informazioni sul percorso Da 0 a Property Manager.");
    a.hidden = false;
  });
  const esc = s => String(s || "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const rv = (C.reviews || []).filter(r => r && r.text);
  q("[data-reviews]").forEach(b => {
    if (!rv.length) return;
    b.querySelector("[data-reviews-list]").innerHTML = rv.map(r => '<figure class="rcard"><blockquote>“' + esc(r.text) + '”</blockquote><figcaption><b>' + esc(r.name) + '</b>' + (r.role ? ' · ' + esc(r.role) : '') + '</figcaption></figure>').join("");
    b.hidden = false;
  });
  q("[data-video]").forEach(b => {
    if (C.videoId) b.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(C.videoId) + '?rel=0&modestbranding=1" title="Video di presentazione" allow="accelerometer;autoplay;encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>';
  });
});
