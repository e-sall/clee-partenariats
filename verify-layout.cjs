const {chromium}=require('playwright');
const fs=require('node:fs');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 for(const name of ['workshops-fr.pdf','workshops-en.pdf','cahier-partenariat.pdf']){
  const bytes=fs.readFileSync('assets/'+name);
  if(bytes.subarray(0,5).toString()!=='%PDF-') throw Error('Invalid PDF '+name);
 }
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage();
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 for(const width of [360,390,768,1440]){
  await page.setViewportSize({width,height:900});
  await page.goto(pathToFileURL(path.resolve('index.html')).href);
  for(const lang of ['en','fr']){
   await page.locator('[data-lang="'+lang+'"]').click();
   const state=await page.evaluate(()=>({lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth>innerWidth,height:document.documentElement.scrollHeight}));
   if(state.overflow) throw Error('Horizontal overflow at '+width+' '+lang);
   if(!state.lang.startsWith(lang)) throw Error('Language switch failed');
   if(width===1440&&state.height>950) throw Error('Desktop one-pager too tall: '+state.height);
   const logo=await page.locator('.poly-logo').evaluate(img=>img.complete&&img.naturalWidth>0);
   if(!logo) throw Error('Logo failed to load');
   const pdf=await page.locator('.workshop-document').getAttribute('href');
   if(pdf!=='assets/workshops-'+lang+'.pdf') throw Error('Wrong workshop PDF language');
   if(await page.locator('.offer a[href="assets/cahier-partenariat.pdf"]').count()!==1) throw Error('Cahier link missing');
   const mail=await page.locator('.mail-link').getAttribute('href');
   if(!mail.includes('body=')||!mail.includes('partenariats@clee.polymtl.ca')) throw Error('Invalid email CTA');
   if(!(await page.locator('.form-link').getAttribute('href')).startsWith('https://docs.google.com/forms/')) throw Error('Invalid form');
   console.log('PASS',width,lang,'height',state.height);
  }
 }
 if(errors.length) throw Error(errors.join('\n'));
 console.log('PASS desktop/mobile layout, FR/EN, email and form links');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
