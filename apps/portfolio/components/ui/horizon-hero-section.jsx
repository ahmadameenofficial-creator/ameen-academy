import React, {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {gsap} from 'gsap';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Adapted from the user's Horizon component: original scene, local assets,
// bounded hero scroll, scoped GSAP animation, and a static WebGL fallback.
export function HorizonHero({lang}) {
 const containerRef=useRef(null),canvasRef=useRef(null),stageRef=useRef(null);
 const threeRefs=useRef({scene:null,camera:null,renderer:null,composer:null,stars:[],mountains:[],nebula:null});
 const [progress,setProgress]=useState(0);
 const [webgl,setWebgl]=useState(true);
 const ar=lang==='ar';
 useEffect(()=>{
  const mobile=innerWidth<700,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const refs=threeRefs.current;
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas:canvasRef.current,antialias:!mobile,alpha:true,powerPreference:'low-power'});}catch{setWebgl(false);return}
  refs.renderer=renderer;
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.5));renderer.setSize(innerWidth,innerHeight);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.5;
  refs.scene=new THREE.Scene();refs.scene.fog=new THREE.FogExp2(0x000000,.00025);
  refs.camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,.1,2200);refs.camera.position.set(0,30,300);
  refs.composer=new EffectComposer(renderer);refs.composer.addPass(new RenderPass(refs.scene,refs.camera));
  if(!mobile)refs.composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.8,.4,.85));
    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = mobile ? 1000 : 2400;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x3d6bff) },
          color2: { value: new THREE.Color(0xff2d55) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity * 0.12;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.015);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };


  createStarField();createNebula();createMountains();createAtmosphere();
  let raf=0,visible=true,last=0,target=0,current=0;
  const resize=()=>{const w=stageRef.current.clientWidth,h=stageRef.current.clientHeight;refs.camera.aspect=w/h;refs.camera.updateProjectionMatrix();renderer.setSize(w,h);refs.composer.setSize(w,h);if(reduce)render(0)};
  const scroll=()=>{const r=containerRef.current.getBoundingClientRect();target=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-stageRef.current.clientHeight)));setProgress(target);if(reduce)render(0)};
  function render(ms){const t=reduce?0:ms*.001;current+=(target-current)*.055;
   refs.stars.forEach(s=>s.material.uniforms.time.value=t);refs.nebula.material.uniforms.time.value=t*.15;
   refs.camera.position.set(Math.sin(t*.1)*2,30+current*20,300-current*930);refs.camera.lookAt(0,10,refs.camera.position.z-600);
   refs.mountains.forEach((m,i)=>{m.visible=current<.72;m.position.x=Math.sin(t*.1)*(i+1);});
   refs.composer.render();
  }
  function animate(ms){raf=0;if(!visible||document.hidden||reduce)return;if(ms-last>32){render(ms);last=ms}raf=requestAnimationFrame(animate)}
  const observer=new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible&&!raf&&!reduce)raf=requestAnimationFrame(animate);if(!visible&&raf){cancelAnimationFrame(raf);raf=0}},{threshold:0});observer.observe(containerRef.current);
  const visibility=()=>{if(document.hidden&&raf){cancelAnimationFrame(raf);raf=0}else if(visible&&!raf&&!reduce)raf=requestAnimationFrame(animate)};
  addEventListener('resize',resize);addEventListener('scroll',scroll,{passive:true});document.addEventListener('visibilitychange',visibility);resize();scroll();render(0);
  return()=>{cancelAnimationFrame(raf);observer.disconnect();removeEventListener('resize',resize);removeEventListener('scroll',scroll);document.removeEventListener('visibilitychange',visibility);refs.scene.traverse(o=>{o.geometry?.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose())}});refs.composer.passes.forEach(p=>p.dispose?.());refs.composer.dispose();renderer.dispose();refs.stars=[];refs.mountains=[];};
 },[]);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const ctx=gsap.context(()=>{gsap.fromTo('.horizon-title',{y:65,opacity:0,filter:'blur(15px)'},{y:0,opacity:1,filter:'blur(0px)',duration:1.4,ease:'power4.out'});gsap.fromTo('.horizon-subtitle',{y:25,opacity:0},{y:0,opacity:1,duration:1,delay:.35,ease:'power3.out'})},containerRef);return()=>ctx.revert()},[lang]);
 const slides=ar?[
 {k:'أحمد أمين — مصمم جرافيك أول',title:'أحمد أمين',sub:'هوية ليها شخصية. وتصميم يكمّل حكايتها.'},
 {k:'BRAND IDENTITY / SOCIAL MEDIA',title:'فكرة. وهوية. وأثر.',sub:'من أول البريف لآخر تفصيلة في التنفيذ.'},
 {k:'OPEN FOR FREELANCE PROJECTS',title:'نصمّم اللي جاي؟',sub:'خلّينا نبني حضور يعبّر عن براندك.'}
 ]:[
 {k:'AHMAD AMEEN — SENIOR GRAPHIC DESIGNER',title:'AHMAD AMEEN',sub:'Identity with character. Design that tells your story.'},
 {k:'BRAND IDENTITY / SOCIAL MEDIA',title:'IDEA. IDENTITY. IMPACT.',sub:'From the first brief to the last detail in production.'},
 {k:'OPEN FOR FREELANCE PROJECTS',title:'WHAT’S NEXT?',sub:'Let’s build a presence that feels like your brand.'}];
 const active=Math.min(2,Math.round(progress*2));
 return <section className="horizon-scroll" id="top" ref={containerRef} data-webgl={webgl}><div className="horizon-stage" ref={stageRef}>
  <div className="horizon-fallback" aria-hidden="true"/><canvas ref={canvasRef} className="horizon-canvas" aria-hidden="true"/>
  <div className="horizon-topline"><span><i/>{ar?'متاح لمشاريع فريلانس':'AVAILABLE FOR FREELANCE'}</span><span>CAIRO, EGYPT / WORLDWIDE</span></div>
  <div className="horizon-side" aria-hidden="true">DESIGN BEYOND THE ORDINARY</div>
  {slides.map((s,i)=>{const distance=Math.abs(progress*2-i),opacity=Math.max(0,1-distance*1.7);return <div key={i} className={'horizon-slide'+(i===active?' is-active':'')} style={{opacity,transform:`translateY(${(progress*2-i)*-65}px)`,pointerEvents:i===active?'auto':'none'}} aria-hidden={i!==active} inert={i!==active}>
   <p className="horizon-kicker">{s.k}</p>{i===0?<h1 className="horizon-title">{s.title}<span>.</span></h1>:<h2 className="horizon-title">{s.title}<span>.</span></h2>}
   <p className="horizon-subtitle">{s.sub}</p><div className="horizon-actions"><a className="pill" href="#work">{ar?'افتح فولدرات المشاريع':'OPEN PROJECT FOLDERS'}<b>↗</b></a><a href="#contact">{ar?'احكيلي عن مشروعك':'LET’S TALK'} <span>↗</span></a></div>
  </div>})}
  <div className="horizon-bottom"><a href="#work">{ar?'اكتشف الأعمال':'EXPLORE THE WORK'} <span>↓</span></a><div className="horizon-progress"><div><span style={{transform:`scaleX(${progress})`}}/></div><span>0{active+1} / 03</span></div><span>BRANDING / SOCIAL / PRINT</span></div>
 </div></section>
}
