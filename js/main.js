(function () {
  var lb = document.getElementById('lb'), im = lb.querySelector('img'), cap = lb.querySelector('figcaption');
  var list = [], cur = 0;
  function show() { im.src = list[cur].src; im.alt = list[cur].alt; cap.textContent = list[cur].alt + (list.length > 1 ? '  (' + (cur + 1) + '/' + list.length + ')' : ''); }
  function open(l, i) { list = l; cur = i; lb.querySelector('.pv').hidden = lb.querySelector('.nx').hidden = l.length < 2; show(); lb.showModal(); }
  function step(d) { if (list.length > 1) { cur = (cur + d + list.length) % list.length; show(); } }
  function item(b) { return { src: b.dataset.full, alt: b.dataset.alt }; }

  document.querySelectorAll('.gal').forEach(function (g) {
    var main = g.querySelector('.main'), mi = main.querySelector('img'), ths = [].slice.call(g.querySelectorAll('.th')), sel = 0;
    function pick(i) { sel = i; mi.src = ths[i].dataset.full; mi.alt = ths[i].dataset.alt; ths.forEach(function (t, k) { t.setAttribute('aria-current', k === i); }); }
    pick(0);
    var port = g.classList.contains('port');
    ths.forEach(function (t, i) { t.addEventListener('click', function () { pick(i); if (port) open(ths.map(item), i); }); });
    main.addEventListener('click', function () { open(ths.map(item), sel); });
  });
  document.querySelectorAll('.feat').forEach(function (f) { f.addEventListener('click', function () { open([item(f)], 0); }); });

  lb.querySelector('.x').addEventListener('click', function () { lb.close(); });
  lb.querySelector('.pv').addEventListener('click', function () { step(-1); });
  lb.querySelector('.nx').addEventListener('click', function () { step(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
})();
