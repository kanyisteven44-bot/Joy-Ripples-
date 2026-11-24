const $ = s => document.querySelector(s);
const menu=$('.menu'),nav=$('nav'),motion=window.matchMedia('(prefers-reduced-motion: reduce)');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>700)closeMenu()});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus()}});
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{if(!$('#plan')){window.location.href='contact.html?service='+encodeURIComponent(b.dataset.service)+'#plan';return}$('#service').value=b.dataset.service;$('#plan').scrollIntoView({behavior:motion.matches?'instant':'smooth'});$('#service').focus({preventScroll:true})}));
$('#year').textContent=new Date().getFullYear();
if($('#enquiry')){
const requested=new URLSearchParams(location.search).get('service');if([...$('#service').options].some(o=>o.value===requested))$('#service').value=requested;
const hints={'Food & drinks':'Tell us about dietary needs or your preferred meal time.','Accommodation':'Share your planned arrival, departure and number of rooms.','Outside catering':'Include your event location, preferred menu and serving time.','Venue hire for events':'Tell us the occasion, preferred timing and setup you have in mind.','Team building':'Share your group goals, preferred timing and catering needs.'};
function updateHint(){$('#service-hint').textContent=hints[$('#service').value]||''}$('#service').addEventListener('change',updateHint);updateHint();
const today=new Date();$('#date').min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
let draft='';
$('#enquiry').addEventListener('submit',e=>{
 e.preventDefault();
 const name=$('#name').value.trim();
 if(!name){$('#name').setCustomValidity('Please enter your name.');$('#name').reportValidity();return}
 const date=$('#date').value,guests=$('#guests').value;
 const recipient=$('#recipient').value==='joyce'?{name:'Joyce',phone:'254722165863'}:{name:'Isaac',phone:'254722693407'};
 draft=`Hello ${recipient.name}, I would like to enquire about Joy Ripples Resort.\n\nName: ${name}\nService: ${$('#service').value}\nPreferred date: ${date}\nGuests: ${guests}\n${$('#details').value.trim() ? 'Details: '+$('#details').value.trim()+'\n' : ''}\nPlease confirm availability and rates. Thank you.`;
 const result=$('#result');result.hidden=false;result.replaceChildren();
 const note=document.createElement('p');note.textContent='Your enquiry is ready. Review and send it in WhatsApp. Your booking is confirmed only after the resort responds.';
 const link=document.createElement('a');link.href='https://wa.me/'+recipient.phone+'?text='+encodeURIComponent(draft);link.target='_blank';link.rel='noopener noreferrer';link.className='underlink';link.textContent='Open WhatsApp again';
 result.append(note,link);$('#copy').hidden=false;
 window.open(link.href,'_blank','noopener,noreferrer');
});
$('#name').addEventListener('input',()=>$('#name').setCustomValidity(''));
$('#copy').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(draft);e.target.textContent='Enquiry copied'}catch{e.target.textContent='Copy unavailable — open WhatsApp above'}});
}
const dialog=$('#photo-dialog'),galleryItems=[...document.querySelectorAll('[data-image]')];let currentPhoto=0,photoTrigger;
function visiblePhotos(){return galleryItems.filter(item=>!item.hidden)}
function showPhoto(index){const list=visiblePhotos();currentPhoto=(index+list.length)%list.length;const item=list[currentPhoto];$('#dialog-image').src=item.dataset.image;$('#dialog-image').alt=item.querySelector('img').alt;$('#dialog-caption').textContent=item.dataset.caption;$('#photo-count').textContent=`${currentPhoto+1} / ${list.length}`}
if(dialog){
galleryItems.forEach(button=>button.addEventListener('click',()=>{photoTrigger=button;showPhoto(visiblePhotos().indexOf(button));dialog.showModal();document.body.style.overflow='hidden'}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.style.overflow='';photoTrigger?.focus({preventScroll:true})});
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
$('#photo-prev').addEventListener('click',()=>showPhoto(currentPhoto-1));$('#photo-next').addEventListener('click',()=>showPhoto(currentPhoto+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(currentPhoto+1)}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(currentPhoto-1)}});
}
document.querySelectorAll('[data-filter]').forEach(filter=>filter.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{const active=b===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});$('.gallery-grid').classList.toggle('filtered',filter.dataset.filter!=='all');galleryItems.forEach(item=>{item.hidden=filter.dataset.filter!=='all'&&item.dataset.category!==filter.dataset.filter;item.classList.remove('motion-pending')})}));
let revealObserver;
function reveals(){revealObserver?.disconnect();document.querySelectorAll('.reveal').forEach(el=>el.classList.remove('motion-pending'));if(motion.matches||!('IntersectionObserver'in window))return;revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('motion-pending');entry.target.classList.add('motion-visible');revealObserver.unobserve(entry.target)}}),{threshold:.06});document.querySelectorAll('.intro-images,.intro-copy,.brand-story,.section-heading,.card,.gather-photo,.gather-content,.faq>div,.occasion-grid,.plan form').forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight){el.classList.add('reveal','motion-pending');revealObserver.observe(el)}})}
reveals();motion.addEventListener('change',reveals);
let scheduled=false;
function updateScroll(){scheduled=false;const scroll=window.scrollY,max=document.documentElement.scrollHeight-window.innerHeight;$('.scroll-progress').style.transform=`scaleX(${max>0?scroll/max:0})`;$('header').classList.toggle('scrolled',scroll>20);const plan=$('#plan')?.getBoundingClientRect();$('.mobile-visit').classList.toggle('visible',scroll>window.innerHeight*.65&&(!plan||plan.top>window.innerHeight||plan.bottom<0))}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll)}},{passive:true});window.addEventListener('resize',updateScroll);updateScroll();
