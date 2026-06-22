const steps = Array.from(document.querySelectorAll(".story-step"));

function activateStep(index) {
  steps.forEach((step, i) => step.classList.toggle("active", i === index));
}

function pathMotion(dotSelector, pathSelector, duration, delay = 0) {
  const dot = document.querySelector(dotSelector);
  const path = document.querySelector(pathSelector);
  if (!dot || !path || !window.gsap) return;

  const length = path.getTotalLength();
  gsap.to(dot, {
    duration,
    repeat: -1,
    delay,
    ease: "none",
    motionPath: null,
    onUpdate: function () {
      const progress = this.progress();
      const point = path.getPointAtLength(progress * length);
      gsap.set(dot, { attr: { cx: point.x, cy: point.y } });
    }
  });
}

if (window.gsap) {
  gsap.registerEffect({
    name: "dashFlow",
    effect: (targets, config) => {
      return gsap.to(targets, {
        strokeDashoffset: config.reverse ? 36 : -36,
        duration: config.duration || 1.05,
        repeat: -1,
        ease: "none"
      });
    },
    defaults: { duration: 1.05, reverse: false }
  });

  gsap.effects.dashFlow(".supply, .through", { duration: 1.0 });
  gsap.effects.dashFlow(".return", { duration: 1.35, reverse: true });

  gsap.from(".hero-copy, .hero-badges div", {
    y: 18,
    opacity: 0,
    duration: 0.8,
    stagger: 0.08,
    ease: "power2.out"
  });

  gsap.from(".simulation-card, .story-card, .evidence > *", {
    y: 22,
    opacity: 0,
    duration: 0.75,
    stagger: 0.08,
    delay: 0.15,
    ease: "power2.out"
  });

  gsap.to(".rack i", {
    boxShadow: "inset 0 0 26px rgba(121, 220, 255, .88)",
    filter: "saturate(.58) brightness(1.18)",
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    stagger: { each: 0.08, from: "start" },
    ease: "sine.inOut"
  });

  pathMotion(".m1", ".s1", 3.2, 0);
  pathMotion(".m2", ".s2", 3.1, 0.55);
  pathMotion(".m3", ".s3", 3.4, 1.1);
  pathMotion(".m4", ".t2", 2.8, 1.6);
  pathMotion(".m5", ".r1", 3.6, 0.2);
  pathMotion(".m6", ".r2", 3.8, 1.2);

  const timeline = gsap.timeline({ repeat: -1 });
  timeline
    .call(() => activateStep(0)).to({}, { duration: 2.4 })
    .call(() => activateStep(1)).to({}, { duration: 2.4 })
    .call(() => activateStep(2)).to({}, { duration: 2.4 })
    .call(() => activateStep(3)).to({}, { duration: 2.4 });
}
