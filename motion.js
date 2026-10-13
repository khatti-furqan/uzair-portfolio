/* Cinematic enhancements. Content and navigation remain usable without motion. */
(()=>{
 'use strict';
 const profile=window.PORTFOLIO.profile,projects=window.PORTFOLIO.projects||[];
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
 const fine=window.matchMedia('(hover: hover) and (pointer: fine)');
 const toggle=document.querySelector('.motion-toggle');
 let enabled=!reduce.matches,framePending=false,timeTimer;
 try{const pref=localStorage.getItem('uzair-motion');if(pref!==null)enabled=pref==='on'&&!reduce.matches}catch{}
 const safeImage=value=>{if(/^assets\/[\w./-]+$/.test(value||'')&&!value.includes('..'))return value;try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}};
 const scenes=document.querySelectorAll('.scene-layer');
 scenes.forEach((el,i)=>{const src=safeImage((profile.heroImages||[])[i]);if(src)el.style.backgroundImage=`url("${src.replace(/["\\\n\r]/g,encodeURIComponent)}")`});
 let heroVideo;
 if(profile.heroVideo&&/^assets\/[\w./-]+\.(mp4|webm)$/i.test(profile.heroVideo)&&!profile.heroVideo.includes('..')&&document.querySelector('.cinema-backdrop')){
  heroVideo=document.createElement('video');heroVideo.className='cinema-video';heroVideo.muted=true;heroVideo.loop=true;heroVideo.playsInline=true;heroVideo.preload='none';heroVideo.setAttribute('aria-hidden','true');heroVideo.src=profile.heroVideo;
  heroVideo.addEventListener('loadeddata',()=>scenes.forEach(s=>s.hidden=true));heroVideo.addEventListener('error',()=>scenes.forEach(s=>s.hidden=false));document.querySelector('.cinema-backdrop').prepend(heroVideo);
 }
 const clock=document.querySelector('#timecode');let elapsed=0,start=0;
 function refreshClock(){if(!clock)return;const t=elapsed+(start?performance.now()-start:0),sec=Math.floor(t/1000),pad=n=>String(n).padStart(2,'0');clock.textContent=`${pad(Math.floor(sec/3600))}:${pad(Math.floor(sec/60)%60)}:${pad(sec%60)}:${pad(Math.floor((t%1000)/1000*24))}`}
 function syncPlayback(){clearInterval(timeTimer);if(start){elapsed+=performance.now()-start;start=0}if(enabled&&!document.hidden){start=performance.now();if(clock)timeTimer=setInterval(refreshClock,100);if(heroVideo)heroVideo.play().catch(()=>{})}else heroVideo?.pause();refreshClock()}
 function setMotion(on,persist=false){enabled=on;document.body.classList.toggle('motion-off',!on);toggle.setAttribute('aria-pressed',String(on));toggle.textContent=on?'Motion on':'Motion off';if(!on){document.querySelectorAll('.reveal-pending').forEach(e=>e.classList.remove('reveal-pending'));document.querySelectorAll('.project').forEach(e=>e.style.transform='')}if(persist)try{localStorage.setItem('uzair-motion',on?'on':'off')}catch{}syncPlayback()}
 toggle.addEventListener('click',()=>setMotion(!enabled,true));reduce.addEventListener('change',e=>{if(e.matches)setMotion(false)});document.addEventListener('visibilitychange',syncPlayback);setMotion(enabled);
 const strip=document.querySelector('#filmstrip');
 if(strip){const entries=projects.filter(p=>safeImage(p.thumbnail));if(entries.length){const group=document.createElement('div');group.className='filmstrip-group';// At least six frames keep the strip filled on wide screens.
 const count=Math.max(entries.length,6);for(let i=0;i<count;i++){const p=entries[i%entries.length],a=document.createElement('a');a.className='film-frame';a.href='work.html?project='+encodeURIComponent(p.id);a.setAttribute('aria-label','View '+p.title);const img=document.createElement('img');img.src=safeImage(p.thumbnail);img.alt='';img.loading='lazy';const label=document.createElement('span');label.textContent=String(i+1).padStart(2,'0')+' / '+p.title+(p.demo?' · SAMPLE':'');a.append(img,label);group.append(a)}strip.append(group);const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('a').forEach(a=>a.tabIndex=-1);strip.append(clone)}else strip.closest('section').hidden=true}
 const slider=document.querySelector('#grade-slider');if(slider)slider.addEventListener('input',()=>slider.closest('.grade-demo').style.setProperty('--grade',slider.value+'%'));
 function scrollUpdate(){framePending=false;const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`}
 addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(scrollUpdate)}},{passive:true});scrollUpdate();addEventListener('resize',scrollUpdate);
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(items=>items.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.remove('reveal-pending');target.classList.add('reveal-visible');observer.unobserve(target)}}),{threshold:.08});document.querySelectorAll('.section-head,.approach,.grade-lab,.service,.process article,.about-copy,.contact-grid>div,.mini-cta,.cta').forEach(e=>{if(enabled)e.classList.add('reveal-pending');observer.observe(e)})}
 const light=document.querySelector('.cursor-light');let pointerPending=false,x=0,y=0;addEventListener('pointermove',e=>{if(!enabled||!fine.matches)return;x=e.clientX;y=e.clientY;if(!pointerPending){pointerPending=true;requestAnimationFrame(()=>{pointerPending=false;light.style.transform=`translate(${x-225}px,${y-225}px)`})}},{passive:true});
 // Cards are also generated when filters change: delegation keeps tilt working.
 document.addEventListener('pointermove',e=>{if(!enabled||!fine.matches)return;const card=e.target.closest('.project');if(!card)return;const r=card.getBoundingClientRect(),rx=(e.clientY-r.top)/r.height-.5,ry=(e.clientX-r.left)/r.width-.5;card.style.transform=`perspective(900px) rotateX(${-rx*3}deg) rotateY(${ry*4}deg)`},{passive:true});
 document.addEventListener('pointerout',e=>{const card=e.target.closest('.project');if(card&&!card.contains(e.relatedTarget))card.style.transform=''});
 const requested=new URLSearchParams(location.search).get('project');if(requested&&document.querySelector('#all-projects')){const match=projects.find(p=>p.id===requested);if(match){const button=Array.from(document.querySelectorAll('[data-project]')).find(b=>b.dataset.project===requested);button?.click()}}
})();
