// Browser QA with installed Chromium. No npm dependencies.
// node tools/check-palette.mjs [--live] [--screenshots]
import { spawn } from 'node:child_process';
import { mkdir, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const live = process.argv.includes('--live');
const screenshots = process.argv.includes('--screenshots');
const homeOnly = process.argv.includes('--home-only');
const output = resolve(root, 'examples/paleta');
const base = live ? 'https://psiconicoletartarelli.com.br' : 'http://127.0.0.1:8765';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const profile = await mkdtemp('/tmp/nicole-palette-chrome-');
const server = live ? null : spawn('python3', ['-m', 'http.server', '8765', '--bind', '127.0.0.1', '--directory', root], { stdio: 'ignore' });
const chrome = spawn('chromium-browser', ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', '--disable-gpu', '--remote-debugging-port=9229', `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
let socket;
try {
    let target;
    for (let n = 0; n < 75; n++) {
        try { target = await (await fetch('http://127.0.0.1:9229/json/new?about:blank', { method: 'PUT' })).json(); break; }
        catch { await sleep(200); }
    }
    if (!target) throw new Error('Chromium unavailable; could not open a browser target.');
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((ok, fail) => { socket.onopen = ok; socket.onerror = fail; });
    let sequence = 0;
    const pending = new Map();
    const exceptions = [];
    const responses = [];
    socket.onmessage = event => {
        const message = JSON.parse(event.data);
        if (message.id) {
            const call = pending.get(message.id);
            if (call) { pending.delete(message.id); clearTimeout(call.timer); message.error ? call.fail(new Error(JSON.stringify(message.error))) : call.ok(message.result); }
        } else if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
        else if (message.method === 'Network.responseReceived') {
            const response = message.params.response;
            if (response.status >= 400) responses.push({ url: response.url, status: response.status });
        }
    };
    const send = (method, params = {}) => new Promise((ok, fail) => {
        const id = ++sequence;
        const timer = setTimeout(() => { pending.delete(id); fail(new Error(`Timeout: ${method}`)); }, 15000);
        pending.set(id, { ok, fail, timer });
        socket.send(JSON.stringify({ id, method, params }));
    });
    const evaluate = async expression => {
        const response = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (response.exceptionDetails) throw new Error(response.exceptionDetails.text);
        return response.result.value;
    };
    await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
    await send('Network.setCacheDisabled', { cacheDisabled: true });
    await send('Network.setBlockedURLs', { urls: ['*googletagmanager.com*', '*google-analytics.com*', '*google.com/maps/embed*'] });
    await mkdir(output, { recursive: true });
    const paths = homeOnly ? ['/'] : live ? ['/', '/psicologa-infantil-porto-alegre/'] : ['/', '/psicologa-infantil-porto-alegre/', '/psicologa-adolescentes-porto-alegre/', '/psicanalise-adultos-porto-alegre/', '/conteudos/', '/conteudos/psicanalise-infantil-brincar/'];
    const results = [];
    for (const width of live ? [1440] : homeOnly ? [1440, 1280, 1024, 992, 768, 390, 320] : [1440, 390, 320]) {
        for (const path of paths) {
            await send('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 });
            await send('Page.navigate', { url: base + path });
            for (let n = 0; n < 60; n++) {
                if (await evaluate("document.readyState === 'complete'")) break;
                await sleep(150);
            }
            await evaluate('Promise.race([document.fonts.ready, new Promise(r=>setTimeout(r,2000))]).then(()=>true)');
            // Reveal scroll-triggered sections and lazy images, then return to the top.
            await evaluate('(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=800){scrollTo(0,y);await new Promise(r=>setTimeout(r,30));}scrollTo(0,0);return true;})()');
            await sleep(700);
            const checked = await evaluate(`(() => {
                const rgb = text => (text.match(/[\\d.]+/g) || []).map(Number);
                const composite = (front, back) => { const alpha=front[3]??1; return [0,1,2].map(i=>front[i]*alpha+back[i]*(1-alpha)).concat(1); };
                const background = e => { const chain=[]; for(let n=e;n;n=n.parentElement)chain.unshift(n); let value=[255,255,255,1]; for(const n of chain)value=composite(rgb(getComputedStyle(n).backgroundColor),value); return value; };
                const luminance = c => c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
                const ratio = (a,b) => { const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };
                const failures=[];let checkedText=0;
                for(const e of document.querySelectorAll('body *')){
                    if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||e.closest('script,style,[aria-hidden="true"]'))continue;
                    const s=getComputedStyle(e); const rect=e.getBoundingClientRect();
                    if(!rect.width||!rect.height||s.visibility!=='visible'||s.display==='none'||Number(s.opacity)===0)continue;
                    if(e.classList.contains('skip-link')&&rect.bottom<0)continue;
                    const bg=background(e);const fg=composite(rgb(s.color),bg);const contrast=ratio(fg,bg);
                    const large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.6667&&parseInt(s.fontWeight)>=700);const minimum=large?3:4.5;
                    checkedText++;
                    if(contrast<minimum)failures.push({text:e.textContent.trim().slice(0,80),selector:e.tagName.toLowerCase()+'.'+e.className,foreground:s.color,background:bg.slice(0,3).map(Math.round),contrast:+contrast.toFixed(2),minimum});
                }
                const sample = selector => {const e=document.querySelector(selector);if(!e)return null;const s=getComputedStyle(e);return {background:s.backgroundColor,color:s.color};};
                return {title:document.title,url:location.href,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,checkedText,contrastFailures:failures,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),palette:{hero:sample('.hero, .service-intro'),heading:sample('h1'),button:sample('.hero .btn, .service-intro .btn, .contents-contact .btn, .article-appointment .btn'),footer:sample('.footer, .service-footer')},localStyles:[...document.styleSheets].filter(s=>s.href?.startsWith(location.origin)).map(s=>({href:s.href,rules:s.cssRules.length}))};
            })()`);
            if (!live && path === '/') {
                checked.heroLayout = await evaluate("(()=>{const h=document.querySelector('.hero h1');const city=document.querySelector('.hero-location');const label=document.querySelector('#about .section-header p');const hero=document.querySelector('.hero');return {headingLines:Math.round(h.getBoundingClientRect().height/parseFloat(getComputedStyle(h).lineHeight)),cityFragments:city.getClientRects().length,aboutGap:Math.round(label.getBoundingClientRect().top-hero.getBoundingClientRect().bottom)};})()");
                if (width >= 992 && checked.heroLayout.headingLines !== 1) throw new Error('Desktop hero heading wraps');
                if (checked.heroLayout.cityFragments !== 1 || checked.heroLayout.aboutGap < 60) throw new Error('City wrapping or About spacing regression');
                console.log(JSON.stringify({path,width,heroLayout:checked.heroLayout}));
            }
            results.push({ path, ...checked });
            console.log(JSON.stringify({ path, width, checkedText:checked.checkedText, contrastFailures:checked.contrastFailures, overflow:checked.scrollWidth>checked.width, brokenImages:checked.brokenImages, palette:checked.palette }));
            if (screenshots && (live || width !== 320)) {
                const slug = path === '/' ? 'home' : path.split('/').filter(Boolean).at(-1);
                const shot = await send('Page.captureScreenshot', { format:'png', captureBeyondViewport:false });
                await writeFile(resolve(output, `${live?'publicado':'proposta'}-${slug}-${width}.png`), Buffer.from(shot.data,'base64'));
            }
            if(!live && path==='/' && width===1440){
                const button=await evaluate("(()=>{const r=document.querySelector('.hero .btn').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()");
                await send('Input.dispatchMouseEvent',{type:'mouseMoved',...button});
                await sleep(500);
                const hover=await evaluate("(()=>{const e=document.querySelector('.hero .btn'),s=getComputedStyle(e);return {color:s.color,background:s.backgroundColor};})()");
                if(hover.color!=='rgb(64, 86, 116)'||hover.background!=='rgba(0, 0, 0, 0)')throw new Error('Unexpected hero button hover colors');
                await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
                await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
                await evaluate("document.querySelector('.hero .btn').focus();true");
                const focus=await evaluate("(()=>{const s=getComputedStyle(document.activeElement);return {outline:s.outlineStyle,width:parseFloat(s.outlineWidth)};})()");
                if(focus.outline==='none'||focus.width<2)throw new Error('Keyboard focus indicator missing');
                await evaluate("document.activeElement.blur();scrollTo(0,500);true");
                await sleep(700);
                const sticky=await evaluate("(()=>{const e=document.querySelector('.navbar');return {sticky:e.classList.contains('nav-sticky'),background:getComputedStyle(e).backgroundColor};})()");
                if(!sticky.sticky||sticky.background!=='rgb(255, 255, 255)')throw new Error('Sticky navbar palette mismatch');
                console.log(JSON.stringify({interactions:'hero hover, keyboard focus, sticky navbar',passed:true,hover,focus,sticky}));
                await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0});
            }
            if(!live && path==='/' && width===390){
                const toggler=await evaluate("(()=>{const b=document.querySelector('.navbar-toggler');b.click();return true;})()");
                await sleep(450);
                const menu=await evaluate("(()=>{const e=document.querySelector('#navbarCollapse');return {open:e.classList.contains('show'),links:[...e.querySelectorAll('a')].length};})()");
                if(!toggler||!menu.open||menu.links!==7)throw new Error('Mobile navigation failed');
            }
        }
    }
    await writeFile(resolve(output, `${live?'publicado':'proposta'}${homeOnly?'-home':''}-check.json`),JSON.stringify({base,results,exceptions,responses},null,2));
    if (!live) {
        const home=results.find(r=>r.path==='/'); const service=results.find(r=>r.path==='/psicologa-infantil-porto-alegre/') || home;
        if(home.palette.hero.background!==service.palette.hero.background||home.palette.footer.background!==service.palette.footer.background)throw new Error('Homepage/service palette mismatch');
        if(results.some(r=>r.contrastFailures.length||r.scrollWidth>r.width||r.brokenImages.length||r.h1!==1)||exceptions.length||responses.some(r=>r.url.startsWith(base)&&!r.url.endsWith('/favicon.ico')))process.exitCode=1;
    }
    console.log(JSON.stringify({checkedPages:results.length,exceptions,localErrors:responses.filter(r=>r.url.startsWith(base))}));
} finally {
    socket?.close();chrome.kill('SIGTERM');server?.kill('SIGTERM');
    // Snap may still be releasing files when the browser exits.
    await sleep(500);await rm(profile,{recursive:true,force:true,maxRetries:3,retryDelay:200}).catch(()=>{});
}
