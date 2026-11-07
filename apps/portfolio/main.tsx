import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {HorizonHero} from './components/ui/horizon-hero-section';
import projectAssets from './project-assets.json';
import GlassFolder, {type FolderFile} from './components/ui/glass-folder-cards';

type Project={name:string;en:string;category:'brand'|'social'|'logo';slug?:string;local?:'luqaimah'|'zhalwa';color:string};
const projects:Project[]=[
 {name:'لقيمة',en:'Luqaimah',category:'brand',local:'luqaimah',color:'#ad672d'},
 {name:'ظلوة',en:'Zhalwa',category:'brand',local:'zhalwa',color:'#214ee6'},
 {name:'ZAHMA',en:'ZAHMA',category:'brand',slug:'254397281/ZAHMA-Brand-identity-(-fashion-)',color:'#ff2d55'},
 {name:'MARBEX',en:'MARBEX',category:'brand',slug:'246130111/MARBEX-BRAND-BOOK',color:'#b98a5b'},
 {name:'Social Media 2025',en:'Social Media 2025',category:'social',slug:'223537143/social-media-designs-2025',color:'#7d62d9'},
 {name:'It’s King Media',en:'It’s King Media',category:'brand',slug:'192390365/Its-king-media-brand-strategy',color:'#dd972c'},
 {name:'النخبة',en:'Alnokhba',category:'social',slug:'223536195/Alnokhba-Office-Social-Media-Designs',color:'#00a99c'},
 {name:'ALARABI',en:'ALARABI',category:'brand',slug:'165632913/ALARABI-sport-club-rebranding',color:'#d63549'},
 {name:'VAR M Logofolio',en:'VAR M Logofolio',category:'logo',slug:'217367637/logofolio-Var-M-2024',color:'#3d6bff'},
 {name:'Creatives Hub',en:'Creatives Hub',category:'logo',slug:'110020799/LOGOFOLIO-VOL-1-CREATIVES-HUB',color:'#c46891'},
 {name:'Logotypes & Marks',en:'Logotypes & Marks',category:'logo',slug:'202103457/Logotypes-Marks-Collection-2024',color:'#9b71dd'},
 {name:'Vet Clinic',en:'Vet Clinic',category:'social',slug:'223227001/Veterinary-Clinic-Social-Media-Designs',color:'#2fbf71'},
 {name:'Coffee',en:'Coffee',category:'social',slug:'217755799/Coffee-Social-Media-Designs',color:'#b7794f'},
 {name:'Speech Program',en:'Speech Program',category:'social',slug:'223230675/speech-program-Social-Media-Designs',color:'#f0527d'},
];
function usePreferences(){
 const [settings,setSettings]=useState({lang:document.documentElement.lang,theme:document.documentElement.dataset.theme});
 useEffect(()=>{const ob=new MutationObserver(()=>setSettings({lang:document.documentElement.lang,theme:document.documentElement.dataset.theme}));ob.observe(document.documentElement,{attributes:true,attributeFilter:['lang','data-theme']});return()=>ob.disconnect()},[]);
 return settings;
}
function HeroIsland(){const {lang}=usePreferences();return <HorizonHero lang={lang}/>}
function ResponsiveFolder(props:Omit<React.ComponentProps<typeof GlassFolder>,'width'>){
 const host=useRef<HTMLDivElement>(null);const [width,setWidth]=useState(120);
 useEffect(()=>{const element=host.current;if(!element)return;const resize=()=>setWidth(Math.max(96,Math.min(340,Math.floor(element.getBoundingClientRect().width))));resize();const observer=new ResizeObserver(resize);observer.observe(element);return()=>observer.disconnect()},[]);
 return <div className="folder-object" ref={host}><GlassFolder {...props} width={width}/></div>
}
function ProjectFolders(){
 const {lang,theme}=usePreferences();const ar=lang==='ar';
 const [filter,setFilter]=useState('all');
 const zhalwaDialog=useRef<HTMLDialogElement>(null);
 const covers=projectAssets.covers as Record<string,string>;
 const cover=(p:Project)=>p.local==='luqaimah'?'assets/luqaimah-05.webp':p.local==='zhalwa'?projectAssets.zhalwa[0]:covers[p.en];
 const [openFolders,setOpenFolders]=useState<Record<string,boolean>>({});
 const cats={brand:ar?'هوية بصرية':'Brand identity',social:ar?'سوشيال ميديا':'Social media',logo:ar?'لوجوهات':'Logo collection'};
 const choose=(p:Project)=>{if(p.local==='luqaimah'){dispatchEvent(new Event('portfolio:luqaimah'))}else if(p.local==='zhalwa'){zhalwaDialog.current?.showModal();document.body.classList.add('dialog-active')}};
 function files(p:Project):FolderFile[]{
  if(p.local==='luqaimah')return [{name:ar?'الهوية والتغليف':'Identity & packaging',image:'assets/luqaimah-05.webp'},{name:ar?'مجموعة التطبيقات':'Brand applications',image:'assets/luqaimah-14.webp'},{name:ar?'الخامات والتفاصيل':'Materials & details',image:'assets/luqaimah-07.webp'},{name:ar?'افتح المعرض الكامل':'Open full gallery',image:'assets/luqaimah-13.webp',meta:ar?'١٨ صورة':'18 images'}];
  if(p.local==='zhalwa')return [{name:ar?'ظلوة — الهوية البصرية':'Zhalwa — visual identity',meta:ar?'قهوة ومخبوزات':'Coffee & bakery',art:{style:'streak',colors:['#1348dc','#f25b36','#f5ecd6','#d7df62'],gloss:.3}},{name:ar?'استكشف فكرة الهوية':'Explore the identity',meta:cats.brand,art:{style:'marble',colors:['#153fe0','#203fc1','#f5ecd6','#f75c33'],scale:.9,warp:1.5}}];
  const href='https://www.behance.net/gallery/'+p.slug;
  return [{name:p.en,meta:cats[p.category],image:cover(p),art:{style:'streak',colors:['#090c18',p.color,'#e9e4e0',p.color],scale:.75,warp:1.7},href},{name:ar?'افتح المشروع على Behance':'View project on Behance',meta:'BEHANCE ↗',art:{style:'marble',colors:[p.color,'#111321','#f8f3e8'],scale:1.1,warp:2},href}];
 }
 return <>
  <div className="folder-controls"><div className="folder-filters" role="group" aria-label={ar?'تصفية المشاريع':'Filter projects'}>{[['all',ar?'كل المشاريع':'All projects'],['brand',cats.brand],['social',cats.social],['logo',cats.logo]].map(([id,label])=><button key={id} aria-pressed={filter===id} onClick={()=>setFilter(id)}>{label}<span>{id==='all'?projects.length:projects.filter(p=>p.category===id).length}</span></button>)}</div><p className="folder-instructions">{ar?'افتح المشروع مباشرة، أو استكشف البطاقات داخل الفولدر':'Open a project directly, or explore the cards inside its folder'}</p></div>
  <div className="folder-grid">{projects.filter(p=>filter==='all'||p.category===filter).map((p,i)=><article className="folder-project" key={p.en} style={{'--project-color':p.color} as React.CSSProperties}>
   <div className="folder-project-number"><span>{String(projects.indexOf(p)+1).padStart(2,'0')} /</span><span>{p.local?(ar?'مشروع مختار':'SELECTED PROJECT'):'BEHANCE PROJECT'}</span></div>
   <ResponsiveFolder key={`${p.en}-${lang}`} label={ar?p.name:p.en} meta={cats[p.category]} tone={theme==='light'?'light':'dark'} image={cover(p)} coverImage={cover(p)} art={{style:'streak',colors:p.local==='zhalwa'?['#183dd4','#365aff','#f25b36','#ece3cc']:['#14121e',p.color,'#f0d7ce',p.color],scale:.85,warp:1.3,gloss:.35}} files={files(p)} action="none" open={!!openFolders[p.en]} onOpenChange={open=>setOpenFolders(old=>({...old,[p.en]:open}))} onFileSelect={()=>choose(p)} appearDelay={Math.min(i%3*110,220)}/>
   <div className="folder-caption"><div><h3>{ar?p.name:p.en}</h3><p>{cats[p.category]}</p></div></div>
   {p.local?<button className="project-direct-open" onClick={()=>choose(p)}><span>{ar?'افتح مشروع '+p.name:'View '+p.en+' project'}</span><span aria-hidden="true">↗</span></button>:<a className="project-direct-open" href={'https://www.behance.net/gallery/'+p.slug} target="_blank" rel="noopener"><span>{ar?'افتح مشروع '+p.name:'View '+p.en+' project'}</span><span aria-hidden="true">↗</span></a>}

  </article>)}</div>
  <dialog ref={zhalwaDialog} className="zhalwa-dialog" onClose={()=>document.body.classList.remove('dialog-active')}><div className="dialog-bar"><span>SELECTED PROJECT / BRAND IDENTITY</span><button onClick={()=>zhalwaDialog.current?.close()} aria-label="Close">✕</button></div><div className="zhalwa-intro"><span>COFFEE & BAKERY</span><h2>{ar?'ظلوة':'ZHALWA'}</h2><p>{ar?'هوية عربية للقهوة ولحظات الاستراحة. أزرق واضح، برتقالي دافئ وكريمي، مع لمسة ليمونية ونظام بصري ممتد عبر الأكواب والتغليف والزي.':'An Arabic identity for coffee and moments of pause. Cobalt blue, warm orange and cream, a lime accent, and a visual language carried across cups, packaging and uniforms.'}</p><div className="zhalwa-palette" aria-label="Zhalwa color palette">{['#214ee6','#f25b36','#f5ecd6','#d7df62'].map(c=><span key={c} style={{background:c}}/>)}</div>{[
 {ar:'الشعار والهوية',en:'The mark & identity',descAr:'حضور الشعار والألوان في نقاط التواصل الأساسية.',descEn:'The mark and palette across key touchpoints.',items:[3,2]},
 {ar:'التغليف والأكواب',en:'Packaging & cups',descAr:'نظام واحد يربط الأكواب والأكياس والبوكسات.',descEn:'One visual system connecting cups, bags and boxes.',items:[4,6,1,5]},
 {ar:'الزي والتفاصيل',en:'Uniforms & details',descAr:'الهوية في تفاصيل اللبس والتطبيقات الصغيرة.',descEn:'The identity carried into uniforms and smaller details.',items:[7,8,9]},
 {ar:'البراند في الاستخدام',en:'The brand in use',descAr:'من المنتج للحظة اللي يوصل فيها للعميل.',descEn:'From the product to a moment in the customer’s hands.',items:[0,10,11,12]}
 ].map((chapter,index)=>{const photos=chapter.items.map(i=>(projectAssets.zhalwa as string[])[i]).filter(Boolean);return <section className="case-chapter zhalwa-chapter" key={chapter.en}><div className="chapter-heading"><span>{String(index+1).padStart(2,'0')} / ZHALWA</span><h3>{ar?chapter.ar:chapter.en}</h3><p>{ar?chapter.descAr:chapter.descEn}</p></div>{photos.length>0?<div className={'case-mosaic mosaic-'+photos.length}>{photos.map((src,i)=><figure key={src}><img src={src} alt={'Zhalwa — '+chapter.en+' '+(i+1)} loading="lazy"/></figure>)}</div>:null}</section>})}</div></dialog>
 </>
}
createRoot(document.getElementById('hero-root')!).render(<HeroIsland/>);
createRoot(document.getElementById('folders-root')!).render(<ProjectFolders/>);
