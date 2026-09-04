// ── Animações de scroll ──────────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));
document.querySelectorAll('.hero .fade-up').forEach((el,i) => {
  setTimeout(() => el.classList.add('visible'), 150 + i*150);
});

// ── Curiosidades accordion ───────────────────────────────────────────────────
function toggleCurio(card) {
  const isActive = card.classList.contains('active');
  document.querySelectorAll('.curio-card').forEach(c => c.classList.remove('active'));
  if (!isActive) card.classList.add('active');
}

// ── Nav ────────────────────────────────────────────────────────────
const paginaAtual = window.location.pathname.split("/").pop();

document.querySelectorAll("#navMonths a").forEach((link) => {
  if (link.getAttribute("href") === "#") {
    link.classList.remove("active");
    return;
  }

  const paginaDoLink = new URL(link.href).pathname.split("/").pop();

  link.classList.toggle("active", paginaDoLink === paginaAtual);
});

// ── Google Agenda ────────────────────────────────────────────────────────────
function addToCalendar(dateStr, title) {
  const [day, month, year] = dateStr.split("/").map(Number);

  const start = new Date(Date.UTC(year, month - 1, day));
  const end = new Date(Date.UTC(year, month - 1, day + 1));

  const formatDate = (date) =>
    `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatDate(start)}/${formatDate(end)}`,
    details: "Adicionado via Monthly Colors — monthlycolors.com",
    ctz: "America/Sao_Paulo"
  });

  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  const toast = document.getElementById("gcalToast");

  toast?.classList.add("show");
  setTimeout(() => toast?.classList.remove("show"), 2800);

  const isMobile = window.matchMedia(
    "(max-width: 820px), (pointer: coarse)"
  ).matches;

  if (isMobile) {
    window.location.assign(url);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

// ── Algoritmo de Fases da Lua (Jean Meeus) ───────────────────────────────────
// Retorna as 4 fases principais (nova, quarto crescente, cheia, minguante)
// de um dado mês/ano como objetos Date com datas reais e precisas.

function getMoonPhasesForMonth(year, month) {
  // Constante do ciclo lunar em dias
  const SYNODIC_MONTH = 29.53058867;


  // Calcula o JDE de um quarto (fase) a partir do JDE da lua nova mais próximo
  // phase: 0=nova, 0.25=crescente, 0.5=cheia, 0.75=minguante
  function jdeForPhase(k, phase) {
    const kp = k + phase;
    const T = kp / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const T4 = T3 * T;
    let JDE = 2451550.09766 + SYNODIC_MONTH * kp
      + 0.00015437 * T2
      - 0.000000150 * T3
      + 0.00000000073 * T4;
    const M  = deg2rad(2.5534  + 29.1053567 * kp - 0.0000014 * T2);
    const Mp = deg2rad(201.5643 + 385.8169366 * kp + 0.0107582 * T2 + 0.00001238 * T3 - 0.000000058 * T4);
    const F  = deg2rad(160.7108 + 390.6702669 * kp - 0.0016341 * T2 - 0.00000227 * T3 + 0.000000011 * T4);
    const Om = deg2rad(124.7746 - 1.5637558 * kp  + 0.0020672 * T2 + 0.00000215 * T3);
    if (phase === 0) {
      // Lua Nova — mesmas correções
      JDE += -0.40720 * Math.sin(Mp) + 0.17241 * Math.sin(M)
             +0.01608 * Math.sin(2*Mp) + 0.01039 * Math.sin(2*F)
             +0.00739 * Math.sin(Mp-M) - 0.00514 * Math.sin(Mp+M)
             +0.00208 * Math.sin(2*M) - 0.00111 * Math.sin(Mp-2*F)
             -0.00057 * Math.sin(Mp+2*F) + 0.00056 * Math.sin(2*Mp+M)
             -0.00042 * Math.sin(3*Mp) + 0.00042 * Math.sin(M+2*F)
             +0.00038 * Math.sin(M-2*F) - 0.00024 * Math.sin(2*Mp-M)
             -0.00017 * Math.sin(Om);
    } else if (phase === 0.5) {
      // Lua Cheia
      JDE += -0.40614 * Math.sin(Mp) + 0.17302 * Math.sin(M)
             +0.01614 * Math.sin(2*Mp) + 0.01043 * Math.sin(2*F)
             +0.00734 * Math.sin(Mp-M) - 0.00515 * Math.sin(Mp+M)
             +0.00209 * Math.sin(2*M) - 0.00111 * Math.sin(Mp-2*F)
             -0.00057 * Math.sin(Mp+2*F) + 0.00056 * Math.sin(2*Mp+M)
             -0.00042 * Math.sin(3*Mp) + 0.00042 * Math.sin(M+2*F)
             +0.00038 * Math.sin(M-2*F) - 0.00024 * Math.sin(2*Mp-M)
             -0.00017 * Math.sin(Om);
    } else {
      // Quartos (0.25 e 0.75)
      JDE += -0.62801 * Math.sin(Mp) + 0.17172 * Math.sin(M)
             -0.01183 * Math.sin(Mp+M) + 0.00862 * Math.sin(2*Mp)
             +0.00804 * Math.sin(2*F) + 0.00454 * Math.sin(Mp-M)
             +0.00204 * Math.sin(2*M) - 0.00180 * Math.sin(Mp-2*F)
             -0.00070 * Math.sin(Mp+2*F) - 0.00040 * Math.sin(3*Mp)
             -0.00034 * Math.sin(2*Mp-M) + 0.00032 * Math.sin(M+2*F)
             +0.00032 * Math.sin(M-2*F) - 0.00028 * Math.sin(Mp+2*M)
             +0.00027 * Math.sin(2*Mp+M) - 0.00017 * Math.sin(Om);
      // Correção W para quartos
      const W = 0.00306 - 0.00038*Math.cos(M) + 0.00026*Math.cos(Mp)
                -0.00002*Math.cos(Mp-M) + 0.00002*Math.cos(Mp+M)
                +0.00002*Math.cos(2*F);
      JDE += (phase === 0.25) ? W : -W;
    }
    return JDE;
  }

  function deg2rad(d) { return d * Math.PI / 180; }

  // Converte o JDE (Tempo Terrestre) para um instante UTC.
  function jdeToDate(jde) {
    const t = year - 2000;
    const deltaTSeconds = 62.92 + 0.32217 * t + 0.005589 * t * t;
    return new Date((jde - 2440587.5) * 86400000 - deltaTSeconds * 1000);
  }

  const brazilDateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: 'numeric', day: 'numeric',
  });
  function getBrazilDateParts(date) {
    const values = Object.fromEntries(brazilDateFormatter.formatToParts(date)
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, Number(part.value)]));
    return { year: values.year, month: values.month, day: values.day };
  }

  // Estima k inicial para o início do mês
  const approxK = Math.floor((year + (month - 1) / 12 - 2000) * 12.3685);

  // Procura as 4 fases cujas datas caem dentro do mês pedido
  const phases = [
    { phase: 0,    label: 'Nova',      icon: 'nova' },
    { phase: 0.25, label: 'Crescente', icon: 'crescente' },
    { phase: 0.5,  label: 'Cheia',     icon: 'cheia' },
    { phase: 0.75, label: 'Minguante', icon: 'minguante' },
  ];

  const result = [];
  for (let dk = -2; dk <= 2; dk++) {
    for (const p of phases) {
      const jde  = jdeForPhase(approxK + dk, p.phase);
      const date = jdeToDate(jde);
      const brazilDate = getBrazilDateParts(date);
      if (brazilDate.year === year && brazilDate.month === month) {
        result.push({ ...p, date, day: brazilDate.day, month: brazilDate.month });
      }
    }
  }
  // Exibe as fases na ordem em que realmente acontecem durante o mês.
  result.sort((a, b) => a.date - b.date);
  return result;
}

// ── Renderiza o painel de fases da lua automaticamente ───────────────────────
(function renderMoonPanel() {
  const currentYear = new Date().getFullYear();
  const phases = getMoonPhasesForMonth(currentYear, 6); // Junho

  // Atualiza o subtítulo "Junho XXXX"
  const sub = document.querySelector('.moon-panel-sub');
  if (sub) sub.textContent = `Junho ${currentYear}`;

  // SVG templates para cada fase (reutiliza os SVGs originais)
  function moonSVG(type) {
  if (type === 'nova') return `
    <svg class="moon-svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="ng1auto" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#3B1818"/>
          <stop offset="100%" stop-color="#160A0B"/>
        </radialGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#ng1auto)"
        stroke="#813B32"
        stroke-width="1.5"
      />

      <circle cx="26" cy="26" r="4" fill="rgba(255,175,135,0.06)"/>
      <circle cx="38" cy="36" r="3" fill="rgba(255,175,135,0.04)"/>
    </svg>`;

  if (type === 'crescente') return `
    <svg class="moon-svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="qcgauto" cx="60%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#F2B082"/>
          <stop offset="50%" stop-color="#D86842"/>
          <stop offset="100%" stop-color="#9E332E"/>
        </radialGradient>

        <clipPath id="qc-clipauto">
          <rect x="32" y="4" width="28" height="56"/>
        </clipPath>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="#160A0B"
        stroke="#813B32"
        stroke-width="1"
      />

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#qcgauto)"
        clip-path="url(#qc-clipauto)"
      />

      <ellipse cx="32" cy="32" rx="8" ry="28" fill="#160A0B"/>
    </svg>`;

  if (type === 'cheia') return `
    <svg class="moon-svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="lcgauto" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#F6C29B"/>
          <stop offset="40%" stop-color="#DC7550"/>
          <stop offset="100%" stop-color="#A43D34"/>
        </radialGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="26"
        fill="url(#lcgauto)"
        stroke="rgba(220,117,80,0.45)"
        stroke-width="1"
      />

      <circle cx="24" cy="22" r="5" fill="rgba(116,43,35,0.27)"/>
      <circle cx="38" cy="30" r="3.5" fill="rgba(116,43,35,0.22)"/>
      <circle cx="28" cy="38" r="4" fill="rgba(116,43,35,0.22)"/>
    </svg>`;

  return `
    <svg class="moon-svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <radialGradient id="qmgauto" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#F2B082"/>
          <stop offset="50%" stop-color="#D86842"/>
          <stop offset="100%" stop-color="#9E332E"/>
        </radialGradient>

        <clipPath id="qm-clipauto">
          <rect x="4" y="4" width="28" height="56"/>
        </clipPath>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="#160A0B"
        stroke="#813B32"
        stroke-width="1"
      />

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#qmgauto)"
        clip-path="url(#qm-clipauto)"
      />

      <ellipse cx="32" cy="32" rx="8" ry="28" fill="#160A0B"/>
    </svg>`;
}

  const ptMonths = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  const row = document.querySelector('.moons-row');
  if (!row || phases.length === 0) return;

  row.innerHTML = phases.map(p => `
    <div class="moon-item">
      ${moonSVG(p.icon)}
      <span class="moon-label">${p.label}</span>
      <span class="moon-date">${p.day} ${ptMonths[p.month - 1]}</span>
    </div>
  `).join('');

  // Atualiza também a data da Lua Cheia no carrossel de datas
  const fullMoon = phases.find(p => p.icon === 'cheia');
  if (fullMoon) {
    const fullMoonCard = document.querySelector('[data-moon-date]');
    if (fullMoonCard) {
      fullMoonCard.querySelector('.date-num').textContent = String(fullMoon.day).padStart(2,'0');
    }
    // Atualiza o onclick do card de lua cheia no carrossel
    const gcalLinks = document.querySelectorAll('.date-gcal');
    gcalLinks.forEach(link => {
      const onclick = link.getAttribute('onclick') || '';
      if (onclick.includes('Lua de Morango')) {
        const d = String(fullMoon.day).padStart(2,'0');
        link.setAttribute('onclick',
          `addToCalendar('${d}/06/${currentYear}','Lua de Morango - Lua Cheia de Junho')`);
        const numEl = link.closest('.date-card')?.querySelector('.date-num');
        if (numEl) numEl.textContent = d;
      }
    });
  }

  // Atualiza todas as datas do carrossel para o ano atual
  document.querySelectorAll('.date-gcal').forEach(link => {
    const onclick = link.getAttribute('onclick') || '';
    const updated = onclick.replace(/\/2025'/g, `/${currentYear}'`)
                           .replace(/\/2026'/g, `/${currentYear}'`);
    link.setAttribute('onclick', updated);
  });
})();
