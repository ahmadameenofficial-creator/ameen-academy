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
 const zhalwaDialog=useRef<HTMLDialogElement>(null),zhalwaViewer=useRef<HTMLDialogElement>(null);
 const [zhalwaIndex,setZhalwaIndex]=useState(7);
 const zhalwaImages=projectAssets.zhalwa;
 const openZhalwaImage=(index:number)=>{setZhalwaIndex(index);zhalwaViewer.current?.showModal();document.body.classList.add('dialog-active')};
 const moveZhalwaImage=(step:number)=>setZhalwaIndex(i=>(i+step+zhalwaImages.length)%zhalwaImages.length);
 const covers=projectAssets.covers as Record<string,string>;
 const cover=(p:Project)=>p.local==='luqaimah'?'assets/luqaimah-05.webp':p.local==='zhalwa'?projectAssets.zhalwa[7]:covers[p.en];
 const [openFolders,setOpenFolders]=useState<Record<string,boolean>>({});
 const cats={brand:ar?'هوية بصرية':'Brand identity',social:ar?'سوشيال ميديا':'Social media',logo:ar?'لوجوهات':'Logo collection'};
 const choose=(p:Project)=>{if(p.local==='luqaimah'){dispatchEvent(new Event('portfolio:luqaimah'))}else if(p.local==='zhalwa'){zhalwaDialog.current?.showModal();if(zhalwaDialog.current)zhalwaDialog.current.scrollTop=0;document.body.classList.add('dialog-active')}};
 function files(p:Project):FolderFile[]{
  if(p.local==='luqaimah')return [{name:ar?'الهوية والتغليف':'Identity & packaging',image:'assets/luqaimah-05.webp'},{name:ar?'مجموعة التطبيقات':'Brand applications',image:'assets/luqaimah-14.webp'},{name:ar?'الخامات والتفاصيل':'Materials & details',image:'assets/luqaimah-07.webp'},{name:ar?'افتح المعرض الكامل':'Open full gallery',image:'assets/luqaimah-13.webp',meta:ar?'١٨ صورة':'18 images'}];
  if(p.local==='zhalwa')return [
   {name:ar?'الهوية والتغليف':'Identity & packaging',image:zhalwaImages[7]},
   {name:ar?'الشعار والمطبوعات':'The mark & print',image:zhalwaImages[8]},
   {name:ar?'تطبيقات الأكواب':'Cup applications',image:zhalwaImages[5]},
   {name:ar?'افتح المعرض الكامل':'Open full gallery',image:zhalwaImages[6],meta:ar?'١٣ صورة':'13 images'}
  ];
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
  <dialog ref={zhalwaDialog} className="zhalwa-dialog" aria-labelledby="zhalwa-title" onClose={()=>{if(!zhalwaViewer.current?.open)document.body.classList.remove('dialog-active')}}>
   <div className="dialog-bar"><span>SELECTED WORK / ZHALWA</span><button onClick={()=>zhalwaDialog.current?.close()} aria-label={ar?'غلق المشروع':'Close project'}>✕</button></div>
   <div className="case-intro zhalwa-intro"><div><p className="eyebrow">BRAND IDENTITY / PACKAGING / COFFEE</p><h2 id="zhalwa-title">{ar?'ظلوة':'Zhalwa'}</h2><p className="case-lede">{ar?'ظلوة بعض الوقت، كلّه لك.':'A little pause. All yours.'}</p><p>{ar?'هوية عربية للقهوة ولحظات الاستراحة. أزرق واضح، برتقالي دافئ وكريمي، مع لمسة ليمونية ونظام بصري ممتد عبر الأكواب والتغليف والزي.':'An Arabic identity for coffee and moments of pause. Cobalt blue, warm orange and cream, a lime accent, and a visual language carried across cups, packaging and uniforms.'}</p><div className="zhalwa-palette" aria-label="Zhalwa color palette">{['#214ee6','#f25b36','#f5ecd6','#d7df62'].map(c=><span key={c} style={{background:c}}/>)}</div></div><button className="case-opening-image" onClick={()=>openZhalwaImage(7)} aria-label={ar?'تكبير مجموعة التغليف':'Enlarge packaging collection'}><img src={zhalwaImages[7]} alt={ar?'مجموعة تغليف ظلوة: بوكس وأكياس وكوب':'Zhalwa packaging: box, bags and cup'} width={1024} height={1280}/></button></div>
   {[
    {ar:'الشعار والهوية',en:'The mark & identity',descAr:'الشعار العربي والباترن ممتدين على المطبوعات وتطبيقات الأكواب.',descEn:'The Arabic wordmark and pattern carried across print and cup applications.',items:[8,9]},
    {ar:'التغليف والأكواب',en:'Packaging & cups',descAr:'ألوان وتطبيقات مختلفة، بتتكلم نفس اللغة البصرية.',descEn:'Different colours and applications, speaking the same visual language.',items:[5,10,12]},
    {ar:'الزي والتفاصيل',en:'Uniforms & details',descAr:'من تطريز الزي للكاب وأكياس الطلبات، الهوية بتكمل حضورها.',descEn:'From embroidered uniforms to caps and takeaway bags, the identity carries through.',items:[6,3,4]},
    {ar:'البراند في الاستخدام',en:'The brand in use',descAr:'القهوة والمخبوزات والهوية في لحظات الاستخدام.',descEn:'Coffee, pastries and identity in moments of use.',items:[0,1,2,11]}
   ].map((chapter,index)=><section className="case-chapter zhalwa-chapter" key={chapter.en}><div className="chapter-heading"><span>{String(index+1).padStart(2,'0')} / ZHALWA</span><h3>{ar?chapter.ar:chapter.en}</h3><p>{ar?chapter.descAr:chapter.descEn}</p></div><div className={'case-mosaic mosaic-'+chapter.items.length}>{chapter.items.map(i=><button className="case-photo" key={i} onClick={()=>openZhalwaImage(i)} aria-label={(ar?'تكبير صورة ظلوة ':'Enlarge Zhalwa image ')+(i+1)}><img src={zhalwaImages[i]} alt={'Zhalwa — '+chapter.en+' '+(i+1)} width={1024} height={1280} loading="lazy"/><span className="case-photo-zoom" aria-hidden="true">+</span></button>)}</div></section>)}
   <div className="case-outro"><p>{ar?'هوية تربط كل نقطة تواصل.':'An identity connecting every touchpoint.'}</p><a className="pill" href={'https://wa.me/201090912747?text='+encodeURIComponent(ar?'أهلاً أحمد، شفت مشروع ظلوة وحابب أتكلم معاك عن مشروع هوية بصرية.':'Hi Ahmad, I saw Zhalwa and would like to discuss a brand identity project.')} target="_blank" rel="noopener"><span>{ar?'خلّينا نتكلم عن براندك':'Let’s talk about your brand'}</span><b>↗</b></a></div>
  </dialog>
  <dialog ref={zhalwaViewer} className="zhalwa-lightbox" aria-label={ar?'عارض صور ظلوة':'Zhalwa image viewer'} onClose={()=>{if(!zhalwaDialog.current?.open)document.body.classList.remove('dialog-active')}} onKeyDown={e=>{if(e.key==='ArrowRight'){e.preventDefault();moveZhalwaImage(1)}else if(e.key==='ArrowLeft'){e.preventDefault();moveZhalwaImage(-1)}}}>
   <button className="viewer-close" onClick={()=>zhalwaViewer.current?.close()} aria-label={ar?'غلق الصورة':'Close image'}>✕</button><button onClick={()=>moveZhalwaImage(-1)} aria-label={ar?'الصورة السابقة':'Previous image'}>←</button><figure><img src={zhalwaImages[zhalwaIndex]} alt={'Zhalwa — '+(zhalwaIndex+1)}/><figcaption>{String(zhalwaIndex+1).padStart(2,'0')} / 13</figcaption></figure><button onClick={()=>moveZhalwaImage(1)} aria-label={ar?'الصورة التالية':'Next image'}>→</button>
  </dialog>
 </>
}
createRoot(document.getElementById('hero-root')!).render(<HeroIsland/>);
createRoot(document.getElementById('folders-root')!).render(<ProjectFolders/>);
