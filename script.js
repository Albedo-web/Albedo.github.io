const S = window.SITE, $ = q => document.querySelector(q);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const el = (t, c, x) => Object.assign(document.createElement(t), { className: c || '', textContent: x || '' });

/* 1. Fill the page from content.js */
document.documentElement.style.setProperty('--a', S.accent);
document.title = S.name + ' | ' + S.role;
$('#logo').textContent = S.name;
$('#role').textContent = S.role;
$('#role2').textContent = S.role2;
$('#about').textContent = S.about;
$('#sk3d').textContent = S.skills3d;
$('#skmo').textContent = S.skillsMotion;
$('#mail').textContent = S.email; $('#mail').href = 'mailto:' + S.email;
S.links.forEach(l => { const a = el('a', '', l.label); a.href = l.url; a.target = '_blank'; a.rel = 'noopener'; $('#links').append(a); });
S.projects.forEach(p => {
  const c = el(p.link ? 'a' : 'figure', 'card'), box = el('div', 'media');
  if (p.link) { c.href = p.link; c.target = '_blank'; c.rel = 'noopener'; }
  if (p.media) {
    const vid = /\.(mp4|webm)$/i.test(p.media), m = el(vid ? 'video' : 'img');
    m.src = p.media;
    if (vid) Object.assign(m, { muted: true, loop: true, autoplay: true, playsInline: true });
    else { m.alt = p.title; m.loading = 'lazy'; }
    box.append(m);
  }
  c.append(box, el('b', '', p.title), el('small', '', p.tag));
  ($(`.grid[data-type="${p.type}"]`) || $('.grid')).append(c);
});

/* 2. 3D hero (Three.js) */
const cv = $('#gl'), R = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
R.setPixelRatio(Math.min(devicePixelRatio, 2));
const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100);
const g = new THREE.Group(), col = new THREE.Color(S.accent);
sc.add(g, new THREE.AmbientLight(0xffffff, .65));
const L1 = new THREE.PointLight(0xffffff, 1.8), L2 = new THREE.PointLight(col, 1.4);
L1.position.set(5, 5, 6); L2.position.set(-6, -3, 3); sc.add(L1, L2);
const solid = new THREE.Mesh(new THREE.TorusKnotGeometry(1, .3, 240, 36),
  new THREE.MeshStandardMaterial({ color: col, roughness: .38, metalness: .15 }));
const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.3, 1),
  new THREE.MeshBasicMaterial({ color: 0x17171b, wireframe: true, transparent: true, opacity: .2 }));
g.add(solid, wire);

if (S.model) { // optional: replace the demo shape with your own .glb
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
  s.onload = () => new THREE.GLTFLoader().load(S.model, o => {
    const m = o.scene, b = new THREE.Box3().setFromObject(m), k = 3 / b.getSize(new THREE.Vector3()).length();
    m.scale.setScalar(k); m.position.sub(b.getCenter(new THREE.Vector3()).multiplyScalar(k));
    g.remove(solid); g.add(m);
  });
  document.head.append(s);
}

let tx = 0, ty = 0, mx = 0, my = 0, p = 0; // pointer target/smoothed, hero scroll progress
function fit() {
  const w = innerWidth, h = innerHeight, wide = w > 800;
  R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix();
  g.position.set(wide ? 2.2 : 0, wide ? 0 : 1.7, 0); g.scale.setScalar(wide ? 1 : .75);
}
addEventListener('resize', fit); fit();
addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; });
(function loop(t) {
  requestAnimationFrame(loop);
  if (p >= 1) return; // hero is off-screen: stop rendering
  mx += (tx - mx) * .05; my += (ty - my) * .05;
  const k = reduce ? 0 : t * .001;
  g.rotation.set(my * .8 + p, k * .25 + mx * 1.6 + p * 3, 0);
  wire.rotation.y = -k * .3;
  cam.position.z = 7 - p * 2.5;
  R.render(sc, cam);
})(0);

/* 3. Scroll animations (GSAP) */
gsap.registerPlugin(ScrollTrigger);
// the 3D object turns and flies toward you as you scroll, then fades out
ScrollTrigger.create({ trigger: '.work', start: 'top bottom', end: 'top top',
  onUpdate: s => { p = s.progress; cv.style.opacity = 1 - p; } });

if (!reduce) {
  // page-load moment
  gsap.from('.hero h1 span, .lead', { y: 70, opacity: 0, duration: 1.2, stagger: .14, ease: 'power3.out', delay: .15 });
  gsap.from(solid.scale, { x: 0, y: 0, z: 0, duration: 1.8, ease: 'elastic.out(1,.55)' });
  gsap.to('.hero', { y: -90, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true } });

  // project cards wipe in once
  gsap.set('.card', { clipPath: 'inset(100% 0 0 0)' });
  ScrollTrigger.batch('.card', { start: 'top 90%', once: true,
    onEnter: b => gsap.to(b, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, stagger: .12, ease: 'power3.out' }) });

  // the motion moment: pinned, scrubbed by scroll
  gsap.timeline({ scrollTrigger: { trigger: '.pin', start: 'top top', end: '+=180%', scrub: 1, pin: true } })
    .fromTo('.shape', { scale: .15, borderRadius: '50%', rotation: 0 },
      { scale: 2.4, borderRadius: '10%', rotation: 200, ease: 'none', duration: 3 }, 0)
    .from('.big span:nth-child(1)', { xPercent: -130, opacity: 0, duration: 1 }, 0)
    .from('.big span:nth-child(2)', { yPercent: 150, opacity: 0, duration: 1 }, .6)
    .from('.big span:nth-child(3)', { xPercent: 130, opacity: 0, duration: 1 }, 1.2);
}
addEventListener('load', () => ScrollTrigger.refresh());
