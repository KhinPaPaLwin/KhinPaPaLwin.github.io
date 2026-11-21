/* Small touches of motion. The site still works fully without this file. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 1. Fade things in as you scroll to them
  var items = document.querySelectorAll('section, .item, .stat, .gallery, .timeline li, .project-head');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // 2. Count numbers up, e.g. <span class="num" data-count="41" data-suffix="%">41%</span>
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = (el.dataset.count.split('.')[1] || '').length;
    var prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
    var start = null, duration = 1400;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); no.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach(function (n) { no.observe(n); });
  }

})();
