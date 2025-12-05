export function parallaxEffect(element, intensity = 0.03) {
  window.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.clientX) * intensity;
    const y = (window.innerHeight / 2 - e.clientY) * intensity;
    element.style.transform = `translate(${x}px, ${y}px)`;
  });
}

export function applyParallaxToBackground(){
  window.addEventListener('scroll', ()=>{
    const scrollY = window.scrollY * 0.15;
    document.body.style.backgroundPositionY = `-${scrollY}px`;
  });
}