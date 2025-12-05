import { useEffect } from 'react'
import { parallaxEffect, applyParallaxToBackground } from '../animations/parallax'

export default function useParallax(ref){
  useEffect(()=>{
    if(ref.current){
      parallaxEffect(ref.current);
    }
    applyParallaxToBackground();
  },[]);
}