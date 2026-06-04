const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));
document.querySelectorAll('.hero .fade-up').forEach((el,i) => {
  setTimeout(() => el.classList.add('visible'), 150 + i*150);
});

function toggleCurio(card) {
  const isActive = card.classList.contains('active');
  document.querySelectorAll('.curio-card').forEach(c => c.classList.remove('active'));
  if (!isActive) card.classList.add('active');
}

function scrollCarousel(dir) {
  document.getElementById('datesCarousel').scrollBy({ left: dir * 230, behavior: 'smooth' });
}

function addToCalendar(dateStr, title) {
  const parts = dateStr.split('/');
  const startDate = `${parts[2]}${parts[1].padStart(2,'0')}${parts[0].padStart(2,'0')}`;
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${startDate}&details=${encodeURIComponent('Adicionado via Monthly Colors — monthlycolors.com')}`;
  const toast = document.getElementById('gcalToast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
  window.open(url, '_blank');
}