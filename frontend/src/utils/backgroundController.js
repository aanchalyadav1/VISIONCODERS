// Controls animated AI backgrounds per page
export function setPageBackground(path){
  const map = {
    '/': '/br/hero_knight_bg.jpg',
    '/chat': '/br/robot_bg.jpg',
    '/dashboard': '/br/orbit_bg.jpg',
    '/about': '/br/mask_bg.jpg'
  };
  const img = map[path] || '/br/hero_knight_bg.jpg';
  document.body.style.backgroundImage = `url(${img})`;
}
