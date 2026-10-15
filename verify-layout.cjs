const {chromium}=require('playwright');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const pdfs=['CLEE_Workshops_Entreprises_2026-2027_FR.pdf','CLEE_Company_Workshops_2026-2027_EN.pdf','CLEE_Cahier_Ingenieur_2026-2027_Projet_et_Proposition.pdf'];
 for(const name of pdfs){const b=fs.readFileSync('assets/'+name);if(b.subarray(0,5).toString()!=='%PDF-')throw Error('Invalid PDF '+name)}
 const browser=await chromium.launch({headless:true});
 const errors=[];
 for(const width of [360,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.SITE_URL||pathToFileURL(path.resolve('index.html')).href,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>typeof window.CLEE_setLanguage==='function');
  for(const lang of ['fr','en']){
   await page.locator('[data-lang="'+lang+'"]').evaluate(button=>button.click());await page.waitForTimeout(50);
   const s=await page.evaluate(()=>{const cs=q=>getComputedStyle(document.querySelector(q));return{lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth,height:document.documentElement.scrollHeight,release:document.body.dataset.release,navy:cs('.intro').backgroundColor,white:cs('.offers').backgroundColor,font:cs('h1').fontFamily,weight:cs('h1').fontWeight,fontLoaded:[...document.fonts].some(f=>f.family==='Manrope'&&f.status==='loaded'),longDash:/[\u2013\u2014]/.test(document.body.innerText),stripes:[...document.querySelectorAll('.color-band i')].map(n=>getComputedStyle(n).backgroundColor)};});
   if(s.overflow||!s.lang.startsWith(lang))throw Error('Layout or language failed '+width+' '+lang+' '+JSON.stringify(s));
   if(width===1440&&s.height>950)throw Error('Desktop exceeds one page: '+s.height);
   if(s.release!=='premium-v5'||s.navy!=='rgb(17, 36, 58)'||s.white!=='rgb(255, 255, 255)')throw Error('Brand failed '+JSON.stringify(s));
   if(!s.fontLoaded||!s.font.includes('Manrope')||s.weight!=='800'||s.longDash)throw Error('Typography failed '+JSON.stringify(s));
   if(JSON.stringify(s.stripes)!==JSON.stringify(['rgb(229, 11, 20)','rgb(234, 79, 18)','rgb(33, 169, 60)','rgb(1, 181, 236)']))throw Error('Stripe colors failed');
   if(!(await page.locator('.poly-logo').evaluate(i=>i.complete&&i.naturalWidth>0)))throw Error('Logo missing');
   const workshop=await page.locator('.workshop-document').getAttribute('href');
   const expected=lang==='fr'?'assets/'+pdfs[0]:'assets/'+pdfs[1];if(workshop!==expected)throw Error('Wrong workshop '+workshop);
   const proposal=await page.locator('a[href="assets/'+pdfs[2]+'"]').count();if(proposal!==1)throw Error('Proposal missing');
   if(!(await page.locator('.form-link').getAttribute('href')).startsWith('https://docs.google.com/forms/'))throw Error('Form missing');
   if(process.env.SITE_URL){for(const href of [workshop,'assets/'+pdfs[2]]){const x=await page.request.get(new URL(href,process.env.SITE_URL).href);if(!x.ok()||(await x.body()).subarray(0,5).toString()!=='%PDF-')throw Error('Public PDF failed '+href)}}
   fs.mkdirSync('audit',{recursive:true});await page.screenshot({path:'audit/'+(process.env.SITE_URL?'live':'local')+'-'+width+'-'+lang+'.png',fullPage:true});
   console.log('PASS',width,lang,s.height,s.font,s.stripes.join('|'));
  }await page.close();
 }
 if(errors.length)throw Error(errors.join('\n'));await browser.close();console.log('PASS full visual, functional and public audit');
})().catch(e=>{console.error(e);process.exit(1)});

