import React, {useEffect,useRef,useState} from 'react';

// Adapted from the user's Horizon component: original scene, local assets,
// bounded hero scroll, CSS entrances, deferred scene loading and a static fallback.
export function HorizonHero({lang}) {
 const containerRef=useRef(null),canvasRef=useRef(null),stageRef=useRef(null);
 const [progress,setProgress]=useState(0);
 const [webgl,setWebgl]=useState(true);
 const ar=lang==='ar';
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let cancelled=false,dispose;const load=()=>{
   if(cancelled)return;
   if(!window.__AMEEN_HORIZON_LOADING__)window.__AMEEN_HORIZON_LOADING__=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('assets/horizon-scene.js',document.baseURI).href;script.async=true;script.onload=resolve;script.onerror=reject;document.head.append(script)});
   window.__AMEEN_HORIZON_LOADING__.then(()=>{if(cancelled)return;dispose=window.__AMEEN_HORIZON_SCENE__({container:containerRef.current,canvas:canvasRef.current,stage:stageRef.current,onProgress:()=>{},onFallback:setWebgl})}).catch(()=>setWebgl(false));
  };
  const token='requestIdleCallback' in window?requestIdleCallback(load,{timeout:1200}):setTimeout(load,180);
  return()=>{cancelled=true;if('cancelIdleCallback' in window)cancelIdleCallback(token);else clearTimeout(token);dispose?.()};
 },[]);
 useEffect(()=>{let raf=0,last=-1;const update=()=>{raf=0;const r=containerRef.current.getBoundingClientRect();const value=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-stageRef.current.clientHeight)));if(Math.abs(value-last)>.004){last=value;setProgress(value)}};const scroll=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll);update();return()=>{removeEventListener('scroll',scroll);removeEventListener('resize',scroll);cancelAnimationFrame(raf)}},[]);

 const slides=ar?[
 {k:'أحمد أمين — آرت دايركتور فريلانسر',title:'أحمد أمين',sub:'هوية ليها شخصية. وتصميم يكمّل حكايتها.'},
 {k:'BRAND IDENTITY / SOCIAL MEDIA',title:'فكرة. وهوية. وأثر.',sub:'من أول البريف لآخر تفصيلة في التنفيذ.'},
 {k:'OPEN FOR FREELANCE PROJECTS',title:'نصمّم اللي جاي؟',sub:'خلّينا نبني حضور يعبّر عن براندك.'}
 ]:[
 {k:'AHMAD AMEEN — FREELANCE ART DIRECTOR',title:'AHMAD AMEEN',sub:'Identity with character. Design that tells your story.'},
 {k:'BRAND IDENTITY / SOCIAL MEDIA',title:'IDEA. IDENTITY. IMPACT.',sub:'From the first brief to the last detail in production.'},
 {k:'OPEN FOR FREELANCE PROJECTS',title:'WHAT’S NEXT?',sub:'Let’s build a presence that feels like your brand.'}];
 const active=Math.min(2,Math.round(progress*2));
 return <section className="horizon-scroll" id="top" ref={containerRef} data-webgl={webgl}><div className="horizon-stage" ref={stageRef}>
  <div className="horizon-fallback" aria-hidden="true"/><canvas ref={canvasRef} className="horizon-canvas" aria-hidden="true"/>
  <div className="horizon-topline"><span><i/>{ar?'متاح لمشاريع فريلانس':'AVAILABLE FOR FREELANCE'}</span><span>CAIRO, EGYPT / WORLDWIDE</span></div>
  <div className="horizon-side" aria-hidden="true">DESIGN BEYOND THE ORDINARY</div>
  {slides.map((s,i)=>{const distance=Math.abs(progress*2-i),opacity=Math.max(0,1-distance*1.7);return <div key={i} className={'horizon-slide'+(i===active?' is-active':'')} style={{opacity,transform:`translateY(${(progress*2-i)*-65}px)`,pointerEvents:i===active?'auto':'none'}} aria-hidden={i!==active} inert={i!==active}>
   <p className="horizon-kicker">{s.k}</p>{i===0?<h1 key={lang} className="horizon-title">{s.title}<span>.</span></h1>:<h2 key={lang} className="horizon-title">{s.title}<span>.</span></h2>}
   <p key={lang+"-subtitle"} className="horizon-subtitle">{s.sub}</p><div className="horizon-actions"><a className="pill" href="#work">{ar?'افتح فولدرات المشاريع':'OPEN PROJECT FOLDERS'}<b>↗</b></a><a href="#contact">{ar?'احكيلي عن مشروعك':'LET’S TALK'} <span>↗</span></a></div>
  </div>})}
  <div className="horizon-bottom"><a href="#work">{ar?'اكتشف الأعمال':'EXPLORE THE WORK'} <span>↓</span></a><div className="horizon-progress"><div><span style={{transform:`scaleX(${progress})`}}/></div><span>0{active+1} / 03</span></div><span>BRANDING / SOCIAL / PRINT</span></div>
 </div></section>
}
