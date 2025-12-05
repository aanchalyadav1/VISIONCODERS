export const pageTransition = {
  type: 'tween',
  duration: 0.35,
  ease: 'easeOut'
};

export const softGlow = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: 'easeInOut'
    }
  }
};