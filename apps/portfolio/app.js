(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storage = {set(k,v){try{localStorage.setItem(k,v)}catch{} }};
  const languageButton = document.querySelector('#language');
  const themeButton = document.querySelector('#theme');
  function updateLanguage(lang) {
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar][data-en]').forEach(el => el.textContent = el.dataset[lang].replace(/\\n/g, '\n'));
    languageButton.textContent = lang === 'ar' ? 'EN' : 'ع';
    languageButton.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل للعربية');
    themeButton.setAttribute('aria-label', lang === 'ar' ? 'تغيير الوضع الفاتح والداكن' : 'Toggle light and dark mode');
    document.title = lang === 'ar' ? 'أحمد أمين — هويات بصرية وحضور يستاهل يتشاف' : 'Ahmad Ameen — Brand identity & social design';
    const message = lang === 'ar' ? 'أهلاً أحمد، شفت البورتفوليو وعندي مشروع حابب أتكلم معاك فيه.\nنوع المشروع: \nالميزانية التقريبية: \nالموعد المطلوب: ' : 'Hi Ahmad, I saw your portfolio and would like to discuss a project.\nProject type: \nEstimated budget: \nTarget date: ';
    document.querySelectorAll('.wa-link').forEach(a => a.href = 'https://wa.me/201090912747?text=' + encodeURIComponent(message));
    storage.set('ameen-lang', lang);
  }
  updateLanguage(root.lang === 'en' ? 'en' : 'ar');
  languageButton.addEventListener('click', () => updateLanguage(root.lang === 'ar' ? 'en' : 'ar'));
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', root.dataset.theme === 'light' ? 'true' : 'false');
    storage.set('ameen-theme', root.dataset.theme);
  });
  themeButton.setAttribute('aria-pressed', root.dataset.theme === 'light' ? 'true' : 'false');

  const projectDialog = document.querySelector('#project-dialog');
  const lightbox = document.querySelector('#lightbox');
  const gallery = document.querySelector('#project-gallery');
  const images = Array.from({length:18}, (_, i) => `assets/luqaimah-${String(i+1).padStart(2,'0')}.webp`);
  const order = [4,12,6,7,10,11,13,1,3,16,0,5,14,15,17,2,8,9];
  const labels = ['Uniform application','Round packaging','Pastry gift box','Cookie jars','Packaging collection','Apron application','Brand materials','Cookie wordmark','Cookie sleeve','Campaign visual','Cinnamon roll sleeve','Croissant packaging','Pastry carrier','Packaging showcase','Bakery uniform','Storefront application','Gift packaging','Pastry box'];
  let selectedImage = 0;
  let galleryCreated = false;
  function makeGallery() {
    if(galleryCreated) return;
    const chapters=[
      {number:'01',ar:'العلامة والتفاصيل',en:'The mark & the details',descAr:'ملامح الهوية من الشعار للخامات والباترن.',descEn:'The identity through its lettering, materials and pattern.',items:[6,7,1]},
      {number:'02',ar:'التغليف يحكي البراند',en:'Packaging carries the brand',descAr:'بوكسات وأكياس وتطبيقات بتجمعها نفس اللغة البصرية.',descEn:'Boxes, bags and applications connected by the same visual language.',items:[4,13,16,3]},
      {number:'03',ar:'مساحة للنكهة والشخصية',en:'Room for flavour & character',descAr:'تطبيقات تجمع المنتج والهوية في لقطة واحدة.',descEn:'Applications that bring product and identity into the same frame.',items:[8,10,11,9]},
      {number:'04',ar:'من التغليف للتجربة',en:'From packaging to experience',descAr:'حضور الهوية على الزي والواجهة وفي لحظات الاستخدام.',descEn:'The identity on uniforms, the storefront and in moments of use.',items:[0,5,14,15,17,2]}
    ];
    chapters.forEach(chapter=>{
      const section=document.createElement('section');section.className='case-chapter';
      const heading=document.createElement('div');heading.className='chapter-heading';
      const number=document.createElement('span');number.textContent=chapter.number+' / LUQAIMAH';
      const title=document.createElement('h3');title.dataset.ar=chapter.ar;title.dataset.en=chapter.en;title.textContent=root.lang==='ar'?chapter.ar:chapter.en;
      const description=document.createElement('p');description.dataset.ar=chapter.descAr;description.dataset.en=chapter.descEn;description.textContent=root.lang==='ar'?chapter.descAr:chapter.descEn;
      heading.append(number,title,description);section.append(heading);
      const mosaic=document.createElement('div');mosaic.className='case-mosaic mosaic-'+chapter.items.length;
      chapter.items.forEach(i=>{
        const button=document.createElement('button');button.className='case-photo';button.setAttribute('aria-label',`View ${labels[i]}`);
        const image=document.createElement('img');image.src=images[i];image.alt=`Luqaimah — ${labels[i]}`;image.loading='lazy';image.width=1122;image.height=1402;
        const caption=document.createElement('span');caption.className='case-photo-zoom';caption.textContent='+';caption.setAttribute('aria-hidden','true');
        button.append(image,caption);button.addEventListener('click',()=>openImage(i));mosaic.append(button);
      });section.append(mosaic);gallery.append(section);
    });
    galleryCreated = true;
  }
  function openProject(){makeGallery();projectDialog.showModal();projectDialog.scrollTop=0;document.body.classList.add('dialog-active')}
  addEventListener('portfolio:luqaimah',openProject);
  document.querySelectorAll('[data-open-project]').forEach(b=>b.addEventListener('click',openProject));
  document.querySelector('#close-project').addEventListener('click',()=>{document.querySelector('#luqaimah-video').pause();projectDialog.close()});
  projectDialog.addEventListener('cancel',()=>document.querySelector('#luqaimah-video').pause());
  projectDialog.addEventListener('close',()=>{document.querySelector('#luqaimah-video').pause();if(!lightbox.open)document.body.classList.remove('dialog-active')});
  function openImage(index){document.querySelector('#luqaimah-video').pause();selectedImage=index;renderImage();if(!lightbox.open)lightbox.showModal();document.body.classList.add('dialog-active')}
  function renderImage(){const img=document.querySelector('#lightbox-image');img.src=images[selectedImage];img.alt=`Luqaimah — ${labels[selectedImage]}`;document.querySelector('#image-counter').textContent=`${String(selectedImage+1).padStart(2,'0')} / 18 — ${labels[selectedImage]}`}
  function moveImage(delta){selectedImage=(selectedImage+delta+images.length)%images.length;renderImage()}
  document.querySelectorAll('[data-gallery-index]').forEach(b=>b.addEventListener('click',()=>openImage(Number(b.dataset.galleryIndex))));
  document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());
  document.querySelector('#previous-image').addEventListener('click',()=>moveImage(-1));
  document.querySelector('#next-image').addEventListener('click',()=>moveImage(1));
  lightbox.addEventListener('close',()=>{if(!projectDialog.open)document.body.classList.remove('dialog-active')});
  lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();moveImage(1)}if(e.key==='ArrowLeft'){e.preventDefault();moveImage(-1)}});
  lightbox.addEventListener('close',()=>{document.querySelector('#luqaimah-video').pause()});
  [projectDialog,lightbox].forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}}));


  document.querySelectorAll('.glass-portrait,.portrait').forEach(card=>{
    if(reduced)return;
    card.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const rect=card.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width,y=(e.clientY-rect.top)/rect.height;card.style.setProperty('--glass-x',`${x*100}%`);card.style.setProperty('--glass-y',`${y*100}%`);card.style.setProperty('--tilt-x',`${(y-.5)*-5}deg`);card.style.setProperty('--tilt-y',`${(x-.5)*6}deg`)});
    card.addEventListener('pointerleave',()=>{card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg')});
  });
  if(!reduced){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in-view');observer.unobserve(e.target)}}),{threshold:.15});document.querySelectorAll('.glass-reveal').forEach(el=>observer.observe(el));}
})();
