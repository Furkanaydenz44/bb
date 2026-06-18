const TL=n=>'₺'+Math.round(n).toLocaleString('tr-TR');
const IMG=id=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=560&q=70`;
const PIC={camera:'1516035069371-29a1b244cc32',lens:'1495707902641-75cac588d2e9',polaroid:'1526170375885-4d8ecf77b99f',vinyl:'1539375665275-f9de415ef9ac',sneaker:'1542291026-7eec264c27ff',jordan:'1556906781-9a412961c28c',watch:'1523275335684-37898b6baf30',watch2:'1547996160-81dfa63595aa',keyboard:'1587829741301-dc798b83add3',guitar:'1510915361894-db8b60106cb1',drone:'1473968512647-3e447244af8f',synth:'1598488035139-bdbb2231ce04',car:'1503376780353-7e6692767b70',controller:'1606144042614-b2417e99c4e3'};
const ICONP={
 search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
 flame:'<path d="M12 3c.8 2.8-1.8 4-1.8 6.4a1.8 1.8 0 0 0 3.6 0c0-.8-.2-1.3-.5-2C15.6 9 18 11.6 18 15a6 6 0 0 1-12 0c0-2.2 1.2-3.8 2.2-4.7.3 1 1 1.6 1.8 1.6C10.8 9 10.8 6 12 3Z"/>',
 bell:'<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10.3 20a2 2 0 0 0 3.4 0"/>',
 zap:'<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
 calc:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>',
 card:'<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19"/>',
 store:'<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M5 9.5v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><path d="M4 9.5a2.3 2.3 0 0 0 4.6 0 2.3 2.3 0 0 0 4.6 0 2.3 2.3 0 0 0 4.6 0"/>',
 shield:'<path d="M12 3l7 3v5c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3Z"/>',
 inbox:'<path d="M22 12h-5l-2 3H9l-2-3H2"/><path d="M5.5 6h13L22 12v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-6L5.5 6Z"/>',
 camera:'<path d="M3 8.5h3L7.5 6h9L18 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.2"/>',
 chat:'<path d="M21 11.5a8 8 0 0 1-11.5 7.2L3 21l2.3-6.5A8 8 0 1 1 21 11.5Z"/>',
 logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
 truck:'<path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="1.8"/><circle cx="17.5" cy="17" r="1.8"/>',
 check:'<path d="M5 12l4.5 4.5L20 6"/>',
 image:'<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 16-5-5L5 21"/>',
 chevR:'<path d="m9 6 6 6-6 6"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 shoe:'<path d="M2 16h13l5-1.6c1-.3 2 .3 2 1.4V17a2 2 0 0 1-2 2H2v-3Z"/><path d="M2 16v-3l4-4 3 2.2 3-1 3 2.8"/>',
 watch:'<circle cx="12" cy="12" r="5.5"/><path d="M12 9.2v2.8l1.8 1.1"/><path d="M9.2 6.4 9.8 3h4.4l.6 3.4M9.2 17.6l.6 3.4h4.4l.6-3.4"/>',
 disc:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.2"/>',
 drone:'<rect x="9" y="9" width="6" height="6" rx="1.6"/><circle cx="5" cy="5" r="2.4"/><circle cx="19" cy="5" r="2.4"/><circle cx="5" cy="19" r="2.4"/><circle cx="19" cy="19" r="2.4"/><path d="M7 7l1.6 1.6M17 7l-1.6 1.6M7 17l1.6-1.6M17 17l-1.6-1.6"/>',
 car:'<path d="M5 11l1.6-4.6A2 2 0 0 1 8.5 5h7a2 2 0 0 1 1.9 1.4L19 11"/><path d="M3.5 11h17v5a1 1 0 0 1-1 1h-1.3M5.8 17H4.5a1 1 0 0 1-1-1v-5"/><circle cx="7.5" cy="17" r="1.7"/><circle cx="16.5" cy="17" r="1.7"/>',
 tag:'<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1.3"/>'};
const ICONFILL={video:'<path d="M8 5v14l11-7z"/>',sparkle:'<path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3Z"/>'};
function ic(n,s){s=s||16;if(ICONFILL[n])return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-2px;flex:none">${ICONFILL[n]}</svg>`;return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;flex:none">${ICONP[n]||ICONP.tag}</svg>`;}
const CATICON={foto:'camera',muzik:'music',sneaker:'shoe',saat:'watch',koleksiyon:'disc',teknoloji:'drone',oto:'car'};
function catIcon(id,s){return ic(CATICON[id]||'tag',s||15);}
const GOLD='#F5A623';
function starSVG(s){s=s||11;return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${GOLD}" style="vertical-align:-1px;flex:none"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/></svg>`;}
function starRowSVG(n,s){s=s||12;let o='';for(let i=0;i<5;i++)o+=`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${i<Math.round(n)?GOLD:'#DAD3E8'}" style="vertical-align:-1px"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/></svg>`;return o;}
const sealSm='<svg width="13" height="13" viewBox="0 0 24 24" fill="#9D4EDD" style="vertical-align:-2px"><circle cx="12" cy="12" r="10"/><path d="m8 12 2.5 2.5L16 9" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function photoDiv(id,emoji,cls){return `<div class="photo ${cls||''}"><span class="ph-ic">${ic('image',22)}</span><img src="${IMG(id)}" onerror="this.remove()"></div>`;}
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function initials(b){return (b||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toLocaleUpperCase('tr');}

/* ---- KULLANICILAR (tek tip hesap, kalıcı rol yok) ---- */
const USERS={
  ahmetsafak:{u:'ahmetsafak',pass:'12345',name:'Ahmet Şafak',av:'AŞ',credits:120,score:4.8,reviews:38,sales:34,resp:'~1 saat',completion:98,city:'İstanbul',since:'Mar 2024',sigs:['Doğrulanmış','Güvenilir Satıcı','Hızlı Kargolayan','Sunum Kalitesi Yüksek']},
  furkan:{u:'furkan',pass:'54321',name:'Furkan Aydeniz',av:'FD',credits:90,score:4.6,reviews:21,sales:18,resp:'~2 saat',completion:95,city:'İstanbul',since:'Tem 2024',sigs:['Doğrulanmış','Sunum Kalitesi Yüksek']},
};
const NPC={emre:'Emre K.',derya:'Derya S.',murat:'Murat A.',kaan:'Kaan V.',selin:'Selin A.',can:'Can E.'};
function uName(u){return (USERS[u]&&USERS[u].name)||NPC[u]||u;}
function uAv(u){return (USERS[u]&&USERS[u].av)||initials(uName(u));}
function uScore(u){return (USERS[u]&&USERS[u].score)||4.6;}
function uVerified(u){return !!USERS[u];}
function uSigs(u){return (USERS[u]&&USERS[u].sigs)||['Sunum Kalitesi Yüksek'];}
function sigIcon(x){return x.includes('Doğrula')?'check':x.includes('Güvenilir')?'shield':x.includes('Hızlı')?'truck':x.includes('Sunum')?'camera':x.includes('Esnaf')?'store':'check';}
function uSigsHTML(u){return uSigs(u).map(x=>`<span class="sig ${x.includes('Doğrula')?'v':'g'}">${ic(sigIcon(x),12)} ${x}</span>`).join('');}

const CATS=[{id:'foto',name:'Foto & Kamera',emoji:'📷'},{id:'muzik',name:'Müzik & Enstrüman',emoji:'🎸'},{id:'sneaker',name:'Sneaker & Moda',emoji:'👟'},{id:'saat',name:'Saat & Mücevher',emoji:'⌚'},{id:'koleksiyon',name:'Koleksiyon & Plak',emoji:'💿'},{id:'teknoloji',name:'Teknoloji & Drone',emoji:'🛸'},{id:'oto',name:'Klasik Oto',emoji:'🚗'}];
const CITIES=['Adana','Adıyaman','Afyonkarahisar','Ağrı','Aksaray','Amasya','Ankara','Antalya','Ardahan','Artvin','Aydın','Balıkesir','Bartın','Batman','Bayburt','Bilecik','Bingöl','Bitlis','Bolu','Burdur','Bursa','Çanakkale','Çankırı','Çorum','Denizli','Diyarbakır','Düzce','Edirne','Elazığ','Erzincan','Erzurum','Eskişehir','Gaziantep','Giresun','Gümüşhane','Hakkâri','Hatay','Iğdır','Isparta','İstanbul','İzmir','Kahramanmaraş','Karabük','Karaman','Kars','Kastamonu','Kayseri','Kilis','Kırıkkale','Kırklareli','Kırşehir','Kocaeli','Konya','Kütahya','Malatya','Manisa','Mardin','Mersin','Muğla','Muş','Nevşehir','Niğde','Ordu','Osmaniye','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Şanlıurfa','Şırnak','Tekirdağ','Tokat','Trabzon','Tunceli','Uşak','Van','Yalova','Yozgat','Zonguldak'];
const catName=id=>(CATS.find(c=>c.id===id)||{}).name||'';
const catEmoji=id=>(CATS.find(c=>c.id===id)||{}).emoji||'🔖';

/* ---- TEKLİF KREDİSİ FORMÜLÜ (§10) ---- */
const CATK={foto:1.2,muzik:1.2,sneaker:1.1,saat:1.5,koleksiyon:1.4,teknoloji:1.05,oto:1.3};
function bandRate(v){if(v<=1000)return .01;if(v<=5000)return .006;if(v<=15000)return .0035;if(v<=50000)return .002;if(v<=100000)return .0012;return .0008;}
function bandPct(v){return (bandRate(v)*100).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2});}
function buyerK(badge){return (badge||'').includes('Güçlü')?0.85:(badge||'').includes('Doğrulan')?0.95:0.90;}
function maxCap(v,cat){return cat==='oto'?30:(v>=50000?30:20);}
function offerCredit(d){const v=Math.round((d.bMin+d.bMax)/2);const tl=v*bandRate(v)*(CATK[d.cat]||1)*buyerK(d.badge);return Math.max(1,Math.min(Math.round(tl/10),maxCap(v,d.cat)));}

/* ---- SHARED DATA ---- */
/* demand.owner = talebi açan kullanıcı; pres.by = sunumu yapan kullanıcı */
let DEMANDS=[
  {id:'d1',owner:'furkan',cat:'foto',ph:PIC.camera,title:'Leica M6 35mm film makinesi arıyorum',desc:'Tercihen 0.72 vizör, temiz optik, ışık ölçer çalışır durumda. İstanbul içi elden teslim.',bMin:45000,bMax:65000,city:'İstanbul',badge:'Aktif Alıcı',when:'2 saat önce',refImages:4,
   pres:[{by:'ahmetsafak',cond:'İkinci el · kutulu',city:'İstanbul',ph:PIC.camera,imgs:[PIC.camera,PIC.lens,PIC.polaroid,'1452780212940-6f5c0d14d848','1606986628253-05620e9b1b1a'],vids:1,desc:'Leica M6 0.72, 1998 üretim. Işık ölçer kalibre edildi, optik tertemiz, pirinç gövde temiz. Kutulu; fatura + 3 ay garanti ile elden veya sigortalı kargo.',status:'sunuldu',media:{images:5,videos:1}}],
   offers:[]},
  {id:'d2',owner:'ahmetsafak',cat:'sneaker',ph:PIC.jordan,title:"Air Jordan 1 'Chicago' OG — US 10",desc:'2015 veya OG baskı, deadstock tercih. Kutu ve orijinal bağcıklar tam olsun.',bMin:18000,bMax:26000,city:'Ankara',badge:'Güçlü Alıcı',when:'4 saat önce',refImages:3,pres:[],offers:[]},
  {id:'d8',owner:'derya',cat:'foto',ph:PIC.polaroid,title:'Polaroid SX-70 + film stoğu arıyorum',desc:'Çalışır durumda body, körük sızdırmasın. Yanında birkaç paket film olursa tercih.',bMin:6000,bMax:12000,city:'İzmir',badge:'Aktif Alıcı',when:'5 saat önce',refImages:3,pres:[],offers:[]},
  {id:'d9',owner:'emre',cat:'sneaker',ph:PIC.sneaker,title:'Yeezy 350 V2 Zebra — US 9',desc:'Orijinal, deadstock ya da çok temiz. StockX/Goat faturası ideal.',bMin:9000,bMax:14000,city:'İstanbul',badge:'Doğrulanmış',when:'1 saat önce',refImages:4,pres:[],offers:[]},
  {id:'d3',owner:'murat',cat:'muzik',ph:PIC.guitar,title:"Fender Stratocaster '72 reissue",desc:'Japonya veya Meksika üretimi, orijinal pickup. Kılıf dahil.',bMin:35000,bMax:50000,city:'İzmir',badge:'Doğrulanmış',when:'1 gün önce',refImages:2,pres:[],offers:[]},
  {id:'d11',owner:'selin',cat:'muzik',ph:PIC.synth,title:'Roland Juno-106 analog synth',desc:'Servis görmüş, tüm tuşlar çalışsın. Voice chip sorunu olmasın.',bMin:25000,bMax:40000,city:'İstanbul',badge:'Güçlü Alıcı',when:'1 gün önce',refImages:3,pres:[],offers:[]},
  {id:'d5',owner:'kaan',cat:'koleksiyon',ph:PIC.vinyl,featured:true,title:'Orijinal baskı jazz plak koleksiyonu',desc:'Blue Note / Impulse orijinal baskılar. VG+ ve üzeri. Liste karşılığı teklif beklerim.',bMin:8000,bMax:20000,city:'İstanbul',badge:'Aktif Alıcı',when:'3 saat önce',refImages:5,pres:[],offers:[]},
  {id:'d14',owner:'derya',cat:'koleksiyon',ph:PIC.vinyl,title:'Pink Floyd ilk baskı LP seti',desc:'DSOTM, Wish You Were Here ilk baskılar. Kapak ve plak durumu önemli.',bMin:5000,bMax:15000,city:'Ankara',badge:'Aktif Alıcı',when:'6 saat önce',refImages:3,pres:[],offers:[]},
  {id:'d6',owner:'selin',cat:'saat',ph:PIC.watch2,title:"Vintage Omega Seamaster (60'lar)",desc:'Orijinal kadran, servis görmüş mekanizma. Ekspertize açık olmalı.',bMin:30000,bMax:55000,city:'İstanbul',badge:'Güçlü Alıcı',when:'2 gün önce',refImages:3,pres:[],offers:[]},
  {id:'d10',owner:'murat',cat:'saat',ph:PIC.watch,title:'Seiko SKX007 dalış saati',desc:'Orijinal, modifiye olmayan. Bracelet veya kauçuk fark etmez.',bMin:7000,bMax:12000,city:'Ankara',badge:'Aktif Alıcı',when:'7 saat önce',refImages:2,pres:[],offers:[]},
  {id:'d7',owner:'can',cat:'teknoloji',ph:PIC.drone,title:'DJI Mavic 3 Pro drone (faturalı)',desc:'Fly More combo tercih. Düşük uçuş saati, hasarsız gimbal.',bMin:45000,bMax:60000,city:'Bursa',badge:'Doğrulanmış',when:'3 gün önce',refImages:4,pres:[],offers:[]},
  {id:'d12',owner:'can',cat:'teknoloji',ph:PIC.controller,title:'PS5 + 2 kol + 3 oyun bundle',desc:'Disk sürümü tercih, faturalı. Az kullanılmış olsun.',bMin:14000,bMax:20000,city:'Bursa',badge:'Aktif Alıcı',when:'2 saat önce',refImages:3,pres:[],offers:[]},
  {id:'d13',owner:'kaan',cat:'oto',ph:PIC.car,title:'Klasik VW Beetle 1303 (proje)',desc:'Restorasyona uygun, motoru çalışan. Ruhsat temiz olsun.',bMin:120000,bMax:180000,city:'İstanbul',badge:'Doğrulanmış',when:'1 gün önce',refImages:5,pres:[],offers:[]},
];
let CHATS=[];

const PACKAGES=[{name:'Başlangıç',credits:20,price:199,icon:'⚡'},{name:'Standart',credits:60,price:499,icon:'🚀'},{name:'Profesyonel',credits:140,price:999,icon:'◆'},{name:'Kurumsal',credits:400,price:2499,icon:'🏢'}];
const SUBS=[{name:'Ücretsiz',price:'₺0',desc:'İlanları gör, kredi alarak teklif ver',cur:true,icon:'○'},{name:'Standart',price:'₺199/ay',desc:'Aylık kredi + kategori alarmı + düşük kredi maliyeti',icon:'◆'},{name:'Profesyonel',price:'₺499/ay',desc:'Anahtar kelime alarmı + öncelikli bildirim + avantajlı kredi',icon:'◆'},{name:'Esnafım',price:'₺899/ay',desc:'İşletme hesabı, toplu teklif, vitrin ve Esnaf rozeti',icon:'🏪'}];

/* ---- PER-PHONE STATE (me = giriş yapan kullanıcı) ---- */
const PH={
  B:{id:'B',me:null,stack:['home'],cat:'all',createCat:'foto',calcCat:'foto',calcBuyer:'aktif',refPhotos:[],presImgs:[],presVids:[],curDemand:null,curChat:null,pending:null},
  S:{id:'S',me:null,stack:['home'],cat:'all',createCat:'foto',calcCat:'foto',calcBuyer:'aktif',refPhotos:[],presImgs:[],presVids:[],curDemand:null,curChat:null,pending:null},
};
function P(pid){return PH[pid];}
function el(pid,id){return document.getElementById(pid+'-'+id);}
const META={home:['Talepler','Niş ürünler için fırsatlar'],kesfet:['Keşfet','Kategoriler ve araçlar'],create:['Talep Aç','Aradığın ürünü yayınla'],mesajlar:['Mesajlar','Sohbetlerin'],profil:['Profil','Hesabın'],detail:['Talep','',1],presdetail:['Sunumu İncele','',1],calc:['Teklif Kredisi','',1],kredi:['Kredi & Abonelik','',1],chat:['Sohbet','',1]};
var ROUTER_READY=false,ROUTE_APPLYING=false;

/* ---- REAL URL ROUTING ---- */
const ROUTE_BASE='/bulbana-web';
function trSlug(s){const map={'ç':'c','ğ':'g','ı':'i','i':'i','ö':'o','ş':'s','ü':'u','Ç':'c','Ğ':'g','İ':'i','I':'i','Ö':'o','Ş':'s','Ü':'u'};return String(s||'').replace(/[çğıiöşüÇĞİIÖŞÜ]/g,m=>map[m]||m).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80)||'sayfa';}
function userForPid(pid){return (P(pid)&&P(pid).me)||BOOT_USERS?.[pid]||(pid==='S'?'furkan':'ahmetsafak');}
function pidForUser(u){u=String(u||'').replace(/^@/,'').toLowerCase();if(u==='furkan')return 'S';if(u==='ahmetsafak')return 'B';return ACTIVE_PANES&&ACTIVE_PANES[0]?ACTIVE_PANES[0]:'B';}
function routeSlugForDemand(d){return `${trSlug(d.title)}-${d.id}`;}
function demandFromRouteSlug(slug){slug=String(slug||'');const id=(slug.match(/-(d[a-z0-9]+)$/i)||[])[1];return DEMANDS.find(d=>d.id===id)||DEMANDS.find(d=>routeSlugForDemand(d)===slug);}
function currentPid(){if(APP_MODE==='buyer')return 'B';if(APP_MODE==='seller')return 'S';return document.body.classList.contains('show-s')?'S':'B';}
function rolePath(pid,tail){return `${ROUTE_BASE}/@${encodeURIComponent(userForPid(pid))}${tail||'/'}`;}
function routeLocationPath(){return location.hash.startsWith('#'+ROUTE_BASE+'/')?decodeURIComponent(location.hash.slice(1)):decodeURIComponent(location.pathname);}
function setBrowserRoute(path,replace){if(!ROUTER_READY||ROUTE_APPLYING)return;if(location.protocol==='file:'){if(location.hash.slice(1)!==path)location.hash=path;return;}if(location.pathname+location.search+location.hash===path)return;history[replace?'replaceState':'pushState']({bulbana:true},'',path);}
function navigateAppPath(path,replace){if(location.protocol==='file:'){if(location.hash.slice(1)!==path)location.hash=path;applyBrowserRoute();return;}if(location.pathname!==path)history[replace?'replaceState':'pushState']({bulbana:true},'',path);applyBrowserRoute();}
function installAppLinkRouter(){
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;
    const a=e.target.closest&&e.target.closest('a[href]');
    if(!a)return;
    const url=new URL(a.getAttribute('href'),location.href);
    if(url.origin!==location.origin||!url.pathname.startsWith(ROUTE_BASE+'/'))return;
    e.preventDefault();
    e.stopImmediatePropagation();
    navigateAppPath(url.pathname);
  },true);
}
function pathForView(pid,id){const p=P(pid);if(id==='home')return p.cat&&p.cat!=='all'?rolePath(pid,`/kategori/${p.cat}/`):rolePath(pid,'/');if(id==='kesfet')return rolePath(pid,'/kesfet/');if(id==='create')return rolePath(pid,'/talep-ac/');if(id==='mesajlar')return rolePath(pid,'/mesajlar/');if(id==='profil')return rolePath(pid,'/profil/');if(id==='kredi')return rolePath(pid,'/kredi/');if(id==='calc')return rolePath(pid,'/araclar/teklif-kredisi/');if(id==='chat'&&p.curChat)return rolePath(pid,`/mesajlar/${encodeURIComponent(p.curChat)}/`);if(id==='presdetail'){const d=DEMANDS.find(x=>x.id===p.curDemand);const pr=d&&d.pres[p.curPres];return d?rolePath(pid,`/ilan/${routeSlugForDemand(d)}/sunum/${encodeURIComponent(pr?pr.by:p.curPres||0)}/`):rolePath(pid,'/');}if(id==='detail'){const d=DEMANDS.find(x=>x.id===p.curDemand);return d?rolePath(pid,`/ilan/${routeSlugForDemand(d)}/`):rolePath(pid,'/');}return rolePath(pid,'/');}
function routeAfterNav(pid,id,replace){setBrowserRoute(pathForView(pid,id),!!replace);}
function setVisibleRoutePane(pid){if(ACTIVE_PANES.length<2)return;document.body.classList.toggle('show-s',pid==='S');document.querySelectorAll('.paneswitch button').forEach(btn=>btn.classList.toggle('on',btn.dataset.p===pid));}
function applyBrowserRoute(opts){opts=opts||{};if(!ROUTER_READY)return;ROUTE_APPLYING=true;try{
  let path=routeLocationPath();
  let rel=path.startsWith(ROUTE_BASE)?path.slice(ROUTE_BASE.length):path;
  rel=rel.replace(/^\/+/,'').replace(/\/+$/,'');
  if(rel.endsWith('index.html'))rel=rel.replace(/\/?index\.html$/,'');
  let parts=rel?rel.split('/').filter(Boolean):[];
  let pid=APP_MODE==='seller'?'S':(APP_MODE==='buyer'?'B':currentPid());
  if(parts[0]&&parts[0][0]==='@'){pid=pidForUser(parts.shift());}
  if(!ACTIVE_PANES.includes(pid))pid=ACTIVE_PANES[0];
  setVisibleRoutePane(pid);
  const p=P(pid);
  const routeKind=parts[0]||'';
  if(routeKind==='kategori'&&parts[1]){p.cat=parts[1];selectTab(pid,'home');}
  else if(routeKind==='ilan'&&parts[1]){const d=demandFromRouteSlug(parts[1]);if(d){p.stack=['home'];p.curDemand=d.id;p.detailImg=0;if(parts[2]==='sunum'&&parts[3]){const ix=d.pres.findIndex(pr=>String(pr.by)===String(parts[3]));p.curPres=ix>-1?ix:0;p.galImg=0;renderPresGallery(pid);push(pid,'presdetail');}else{renderDetail(pid);push(pid,'detail');}}else{p.cat='all';selectTab(pid,'home');}}
  else if(routeKind==='kesfet')selectTab(pid,'kesfet');
  else if(routeKind==='talep-ac')selectTab(pid,'create');
  else if(routeKind==='mesajlar'&&parts[1]){const c=CHATS.find(x=>x.id===parts[1]);if(c){p.stack=['mesajlar'];p.curChat=c.id;push(pid,'chat');renderChat(pid);}else selectTab(pid,'mesajlar');}
  else if(routeKind==='mesajlar')selectTab(pid,'mesajlar');
  else if(routeKind==='profil')selectTab(pid,'profil');
  else if(routeKind==='kredi')selectTab(pid,'kredi');
  else if(routeKind==='araclar'&&parts[1]==='teklif-kredisi'){p.stack=['kesfet'];openCalc(pid);}
  else{p.cat='all';selectTab(pid,'home');}
  if(opts.replaceClean&&location.protocol!=='file:'&&(!rel||!rel.startsWith('@')))history.replaceState({bulbana:true},'',pathForView(pid,P(pid).stack[P(pid).stack.length-1]));
}finally{ROUTE_APPLYING=false;}}

/* ---- PHONE TEMPLATE ---- */
function phoneHTML(p){const P=p.id;
  return `<div class="col">
    <div class="plabel" id="${P}-plabel"><span class="who2">Giriş bekleniyor…</span></div>
    <div class="frame" id="${P}-frame"><div class="device">
      <div class="island"></div>
      <div class="statusbar"><span id="${P}-clock">9:41</span><span class="si">
        <svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="5" y="4.5" width="3" height="7.5" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1" opacity=".35"/></svg>
        <svg width="24" height="12" viewBox="0 0 25 13" fill="none"><rect x="1" y="1" width="20" height="11" rx="3" stroke="currentColor" stroke-opacity=".4"/><rect x="2.6" y="2.6" width="15" height="7.8" rx="1.6" fill="currentColor"/></svg></span></div>
      <header class="topbar" id="${P}-topbar">
        <div class="backbar" id="${P}-backbar"><button class="backbtn" onclick="pop('${P}')"><svg width="11" height="18" viewBox="0 0 13 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2 3 10l8 8"/></svg>Geri</button><div class="ttl" id="${P}-backtitle"></div></div>
        <div class="bigt"><div><h1 id="${P}-bigTitle">Talepler</h1><p class="sub" id="${P}-bigSub">Niş ürünler için fırsatlar</p></div>
          <span class="userpill" id="${P}-userpill"></span></div>
      </header>
      <div class="views" id="${P}-views">
        <section class="view active" id="${P}-v-home" data-tab="home"><div class="pad">
          <div style="height:6px"></div><div class="chips" id="${P}-catChips"></div><div style="height:12px"></div>
          <div id="${P}-feed"></div></div></section>
        <section class="view" id="${P}-v-kesfet" data-tab="kesfet"><div class="pad">
          <div id="${P}-kesfetBody"></div></div></section>
        <section class="view" id="${P}-v-create" data-tab="create"><div class="pad">
          <div class="note glass createbanner" style="margin:2px 0 18px;background:#F1E8FC;border-color:transparent;color:#7B2CBF"><b>Ücretsiz · 2 dakika.</b> Talebini aç, satıcılar sana ürün sunsun — kararı sen ver.</div>
          <div class="createcols">
          <div class="createform">
          <div class="label-sm">Kategori</div><div class="chips" id="${P}-createCats"></div>
          <div class="label-sm">Ne arıyorsun?</div>
          <div class="cform glass">
            <div class="cfield"><span class="fic">${ic('search',16)}</span><input id="${P}-cTitle" placeholder="Leica M6 35mm film makinesi" oninput="renderCreatePreview('${P}')"></div>
            <div class="cfield col"><label>Detay</label><textarea id="${P}-cDesc" placeholder="Durum, orijinallik, kusur, teslimat tercihi…"></textarea></div>
          </div>
          <div class="cityprice">
            <div class="cpcol">
              <div class="label-sm">Şehir</div>
              <div class="cform glass citycard" id="${P}-citycard">
                <button type="button" class="citytrigger" onclick="toggleCity('${P}')"><span class="fic">${ic('pin',16)}</span><span class="citylbl" id="${P}-cCityLbl">İstanbul</span><span class="citychev">${ic('chevR',16)}</span></button>
                <input type="hidden" id="${P}-cCity" value="İstanbul">
                <div class="citypanel" id="${P}-citypanel" hidden><input class="citysearch" id="${P}-citysearch" placeholder="Şehir ara…" oninput="filterCity('${P}')"><div class="citylist" id="${P}-citylist"></div></div>
              </div>
            </div>
            <div class="cpcol">
              <div class="label-sm">Sabit fiyat</div>
              <div class="cform glass"><div class="cfield"><span class="fic">₺</span><div class="cprice"><input id="${P}-cPrice" inputmode="numeric" placeholder="Alım fiyatı" oninput="renderCreatePreview('${P}')"></div></div></div>
              <div class="presets" id="${P}-presets"></div>
            </div>
          </div>
          <div class="label-sm">Referans fotoğraf · <span id="${P}-refCount" style="color:var(--tint);font-weight:700">0/10</span></div>
          <div class="refgrid" id="${P}-refGrid"></div>
          <div style="font-size:11px;color:var(--label3);margin:3px 3px 0;line-height:1.4">Aradığın ürünün görselleri — ilki <b>kapak</b> olur.</div>
          </div>
          <div class="createside">
          <div class="label-sm">Önizleme · satıcılar böyle görecek</div>
          <div id="${P}-createPreview"></div>
          <div class="cside-hint">Satıcılar bu kartı <b>Talepler</b> akışında görür; dokununca açıklama, tüm fotoğraflar ve <b>Ürün Sun</b> açılır.</div>
          <button class="btn fill cside-cta" style="width:100%" onclick="createDemand('${P}')">Talebi Yayınla</button>
          <div class="cside-note">Talep <b>ücretsiz</b> yayınlanır; satıcılar sana ürün sunar, kararı sen verirsin.</div>
          </div>
          </div>
          <div style="height:10px"></div></div></section>
        <section class="view" id="${P}-v-mesajlar" data-tab="mesajlar"><div class="pad">
          <div id="${P}-msgBody" style="margin-top:6px"></div></div></section>
        <section class="view" id="${P}-v-profil" data-tab="profil"><div class="pad" id="${P}-profilBody"></div></section>
        <section class="view push" id="${P}-v-detail"><div class="pad" id="${P}-detailBody"></div></section>
        <section class="view push" id="${P}-v-presdetail"><div class="pad" id="${P}-presdetailBody" style="padding-top:0"></div></section>
        <section class="view push" id="${P}-v-calc"><div class="pad">
          <div class="note glass" style="margin-top:4px"><b>Teklif kredisi formülü (§10)</b><br>İlan değeri × fiyat bandı × kategori × alıcı kalite. Kredi yalnızca <b>ilk resmi teklifte</b>; revizeler ücretsiz.</div>
          <div class="label-sm">İlan değeri (alıcı bütçesi)</div>
          <div class="form glass"><div class="rangewrap"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px"><b id="${P}-calcValLbl" style="font-size:20px;letter-spacing:-.03em">₺45.000</b><span id="${P}-calcBandLbl" style="font-size:11px;color:var(--label2)"></span></div><input type="range" id="${P}-calcVal" min="500" max="200000" step="500" value="45000" oninput="recalc('${P}')"></div></div>
          <div class="label-sm">Kategori</div><div class="form glass" style="padding:9px 11px"><div class="optrow" id="${P}-calcCats"></div></div>
          <div class="label-sm">Alıcı kalitesi</div><div class="form glass" style="padding:9px 11px"><div class="optrow" id="${P}-calcBuyers"></div></div>
          <div class="calcout glass"><div class="calcrow"><span>Fiyat bandı katsayısı</span><b id="${P}-rBand">%0,20</b></div><div class="calcrow"><span>Kategori katsayısı</span><b id="${P}-rCat">1,20</b></div><div class="calcrow"><span>Alıcı kalite katsayısı</span><b id="${P}-rBuyer">0,90</b></div><div class="calcrow"><span>Teklif bedeli</span><b id="${P}-rCost">₺—</b></div><div class="calcbig"><b id="${P}-rCredits">—</b><span>kredi · <span id="${P}-rCreditTl">—</span></span></div></div>
        </div></section>
        <section class="view push" id="${P}-v-kredi"><div class="pad">
          <div class="wallet" style="margin-top:4px"><small>Kredi bakiyesi</small><div class="amt"><span id="${P}-walletCredit">0</span> <span>kredi</span></div><p>Yalnızca <b>ilk resmi teklifte</b> kullanılır (formülle). Talep, sunum ve revize ücretsizdir.</p></div>
          <div class="label-sm">Kredi paketleri</div><div class="group glass" id="${P}-pkgList"></div>
          <div class="label-sm">Satıcı abonelikleri</div><div class="group glass" id="${P}-subList"></div></div></section>
        <section class="view push" id="${P}-v-chat"><div class="chatwrap">
          <div class="chatscroll" id="${P}-chatScroll"></div>
          <div class="offerDock hidden" id="${P}-offerDock"><button class="btn fill" onclick="reviseOffer('${P}')">↻ Teklifi Güncelle · ücretsiz</button></div>
          <div class="chatbar"><input id="${P}-chatInput" placeholder="Mesaj…" onkeydown="if(event.key==='Enter')sendMsg('${P}')"><button class="send" onclick="sendMsg('${P}')"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z"/></svg></button></div></div></section>
      </div>
      <nav class="tabbar">
        <button class="tab on" data-t="home" aria-label="Talepler" title="Talepler" onclick="selectTab('${P}','home')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/></svg>Talepler</button>
        <button class="tab" data-t="kesfet" aria-label="Keşfet" title="Keşfet" onclick="selectTab('${P}','kesfet')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>Keşfet</button>
        <button class="tab plus" data-t="create" aria-label="Talep Aç" title="Talep Aç" onclick="selectTab('${P}','create')"><span class="pl"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>
        <button class="tab" data-t="mesajlar" aria-label="Mesajlar" title="Mesajlar" onclick="selectTab('${P}','mesajlar')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8 8 0 0 1-11.5 7.2L3 21l2.3-6.5A8 8 0 1 1 21 11.5Z"/></svg>Mesajlar</button>
        <button class="tab" data-t="profil" aria-label="Profil" title="Profil" onclick="selectTab('${P}','profil')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/></svg>Profil</button>
      </nav>
      <div class="toast" id="${P}-toast"></div>
      <div class="sheetbg" id="${P}-sheetBg" onclick="if(event.target.id==='${P}-sheetBg')closeSheet('${P}')"><div class="sheet"><div class="grab"></div><h2 id="${P}-sheetTitle"></h2><p class="stext" id="${P}-sheetText"></p><div id="${P}-sheetBody"></div><div class="btnrow" id="${P}-sheetBtns"><button class="btn glass" onclick="closeSheet('${P}')">Vazgeç</button><button class="btn fill" id="${P}-sheetOk" onclick="confirmSheet('${P}')">Onayla</button></div></div></div>
      <div class="login" id="${P}-login"><span class="lglogo"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg></span>
        <h2>Aradığını ilan et, satıcılar gelsin.</h2><p class="lsub">Ters pazar: alıcı talep açar, satıcılar ürün sunar. Sabit rol yok.</p>
        <div class="benefits">
          <div class="benefit"><span class="bic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-8-8 18-2-7-8-3Z"/></svg></span><div><b>Talebini ücretsiz aç</b><span>Satıcılar sana gelir — aramakla uğraşma</span></div></div>
          <div class="benefit"><span class="bic"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span><div><b>Güvenli & komisyonsuz</b><span>Sistem içi teklif, takip ve değerlendirme</span></div></div>
        </div>
        <div class="lproof"><span class="avs"><span class="av">AŞ</span><span class="av">FD</span><span class="av">DS</span></span>12.000+ kişi Bulbana'da eşleşti</div>
        <div class="loginbox" id="${P}-loginbox">
          <input id="${P}-luser" placeholder="Kullanıcı adı" autocapitalize="off" autocomplete="off" onkeydown="if(event.key==='Enter')doLogin('${P}')">
          <input id="${P}-lpass" type="password" placeholder="Şifre" onkeydown="if(event.key==='Enter')doLogin('${P}')">
          <button class="btn fill" onclick="doLogin('${P}')">Giriş Yap <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          <div class="lhint">Demo: <b>ahmetsafak</b> / 12345 · <b>furkan</b> / 54321</div>
          <div class="quick"><button onclick="quickLogin('${P}','ahmetsafak')">ahmetsafak</button><button onclick="quickLogin('${P}','furkan')">furkan</button></div>
        </div></div>
    </div></div>
  </div>`;
}

/* ---- LOGIN ---- */
function doLogin(pid){const u=(el(pid,'luser').value||'').trim().toLowerCase();const pw=(el(pid,'lpass').value||'').trim();const acc=USERS[u];
  if(!acc||acc.pass!==pw){toast(pid,'Kullanıcı adı veya şifre hatalı.');const lb=el(pid,'loginbox');if(lb){lb.classList.remove('shake');void lb.offsetWidth;lb.classList.add('shake');}return;}
  loginAs(pid,u);}
function quickLogin(pid,u){el(pid,'luser').value=u;el(pid,'lpass').value=USERS[u].pass;doLogin(pid);}
function loginAs(pid,u,opts){const p=P(pid);p.me=u;el(pid,'login').classList.add('hide');updateIdentity(pid);p.stack=['home'];if(!(opts&&opts.skipNav))selectTab(pid,'home');toast(pid,'Hoş geldin, '+uName(u).split(' ')[0]+'!');}
function logout(pid){const p=P(pid);p.me=null;p.stack=['home'];el(pid,'login').classList.remove('hide');const lu=el(pid,'luser'),lp=el(pid,'lpass');if(lu)lu.value='';if(lp)lp.value='';}
function updateIdentity(pid){const p=P(pid);if(!p.me)return;const acc=USERS[p.me];const pl=document.getElementById(pid+'-plabel');if(pl)pl.innerHTML=`<span class="tag">@${esc(acc.u)}</span> <span class="who2">${esc(acc.name)}</span>`;const up=el(pid,'userpill');if(up)up.textContent='@'+acc.u;syncCredits(pid);}

/* ---- NAV ---- */
function viewEl(pid,id){return el(pid,'v-'+id);}
function p_qa(pid,sel){return el(pid,'frame').querySelectorAll(sel);}
function selectTab(pid,id){
  if(!P(pid).me)return;
  if(id==='kredi'){renderKredi(pid);push(pid,'kredi');routeAfterNav(pid,'kredi');return;}
  const p=P(pid);p.stack=[id];
  p_qa(pid,'.view').forEach(v=>v.classList.remove('active'));
  viewEl(pid,id).classList.add('active');
  p_qa(pid,'.tab[data-t]').forEach(t=>t.classList.toggle('on',t.dataset.t===id));
  setChrome(pid,id);
  if(id==='home')renderFeed(pid);if(id==='kesfet')renderKesfet(pid);if(id==='mesajlar')renderChatList(pid);if(id==='create'){renderCreateCats(pid);renderPresets(pid);renderRefGrid(pid);renderCreatePreview(pid);}if(id==='profil')renderProfil(pid);
  viewEl(pid,id).scrollTop=0;
  routeAfterNav(pid,id);
}
function push(pid,id){const p=P(pid);p.stack.push(id);const v=viewEl(pid,id);p_qa(pid,'.view').forEach(x=>{if(x!==v)x.classList.remove('active');});v.classList.add('push');void v.offsetWidth;v.classList.add('active');setChrome(pid,id);v.scrollTop=0;}
function pop(pid){const p=P(pid);if(p.stack.length<2)return;const cur=p.stack.pop();viewEl(pid,cur).classList.remove('active');const back=p.stack[p.stack.length-1];viewEl(pid,back).classList.add('active');setChrome(pid,back);routeAfterNav(pid,back);}
function setChrome(pid,id){const m=META[id]||META.home;const tb=el(pid,'topbar'),bb=el(pid,'backbar'),fr=el(pid,'frame');
  if(m[2]){tb.classList.add('compact');bb.classList.add('show');fr.classList.add('subview');el(pid,'backtitle').textContent=m[0];}
  else{tb.classList.remove('compact');bb.classList.remove('show');fr.classList.remove('subview');el(pid,'bigTitle').textContent=m[0];el(pid,'bigSub').textContent=m[1];}
  fr.querySelector('.tabbar').style.display=m[2]?'none':'flex';}

/* ---- FEED ---- */
function badgeClass(b){return b.includes('Güçlü')?'p':b.includes('Doğrulanmış')?'o':'g';}
function userChip(d){const nm=uName(d.owner);return `<span style="display:inline-flex;align-items:center;gap:5px;font-weight:600;color:var(--label2);overflow:hidden;white-space:nowrap"><i style="width:17px;height:17px;border-radius:50%;background:linear-gradient(150deg,#6A2DC4,#8B4FE6);color:#fff;font-size:8px;font-weight:800;display:grid;place-items:center;font-style:normal;flex:none">${initials(nm)}</i><b style="color:var(--label);font-weight:600">${esc(nm)}</b> · @${esc(d.owner)}</span>`;}
function renderChips(pid){const p=P(pid);el(pid,'catChips').innerHTML=`<a class="chip ${p.cat==='all'?'on':''}" href="${rolePath(pid,'/')}">Tümü</a>`+CATS.map(c=>`<a class="chip ${p.cat===c.id?'on':''}" href="${rolePath(pid,`/kategori/${c.id}/`)}">${catIcon(c.id,14)} ${c.name.split(' ')[0]}</a>`).join('');}
function setCat(pid,id){P(pid).cat=id;renderChips(pid);renderFeed(pid);routeAfterNav(pid,'home');}
function renderFeed(pid){const p=P(pid);if(!p.me)return;renderChips(pid);const acc=USERS[p.me];const fn=acc.name.split(' ')[0];
  let list=DEMANDS.filter(d=>p.cat==='all'||d.cat===p.cat);
  const others=list.filter(d=>d.owner!==p.me);const sort=p.sort||'yeni';
  if(sort==='butce')list=[...list].sort((a,b)=>fixedPriceOf(b)-fixedPriceOf(a));
  else if(sort==='acil')list=[...list].sort((a,b)=>(urgentOf(b)?1:0)-(urgentOf(a)?1:0));
  else list=[...list].sort((a,b)=>(b.featured?1:0)-(a.featured?1:0));
  const feed=el(pid,'feed');
  const greet=`<div class="greet"><div><h2>Merhaba ${esc(fn)}</h2><p>Bugün ${others.length} talep seni bekliyor</p></div><div class="gava">${acc.av}</div></div>`;
  const stats='';
  const sortbar=`<div class="sortbar">${[['yeni',ic('sparkle',12)+' En yeni'],['acil',ic('clock',12)+' Acil'],['butce','₺ Yüksek bütçe']].map(([k,l])=>`<button class="sortb ${sort===k?'on':''}" onclick="setSort('${pid}','${k}')">${l}</button>`).join('')}</div>`;
  const hot=others.filter(d=>urgentOf(d)||isFresh(d)).slice(0,6);
  const rail=hot.length?`<div class="sechead"><h3><span style="color:#9D4EDD;display:inline-flex;vertical-align:-2px">${ic('flame',15)}</span> Şimdi ilgi gören</h3><span class="more"><span class="livedot"></span> canlı</span></div><div class="rail">${hot.map(d=>railCard(pid,d)).join('')}</div>`:'';
  if(!list.length){feed.innerHTML=greet+stats+`<div class="note glass" style="text-align:center;margin-top:10px">Bu filtrede talep yok.</div>`;return;}
  const sechd=`<div class="sechead"><h3>${p.cat==='all'?'Tüm talepler':catName(p.cat)}</h3><span class="more">${list.length} ilan</span></div>`;
  feed.innerHTML=greet+stats+sortbar+rail+sechd+`<div class="feedgrid">${list.map(d=>gridCard(pid,d)).join('')}</div>`;}
function setSort(pid,s){P(pid).sort=s;renderFeed(pid);routeAfterNav(pid,'home',true);}
function railCard(pid,d){return `<a class="railc" href="${rolePath(pid,`/ilan/${routeSlugForDemand(d)}/`)}"><div class="rph">${photoDiv(d.ph,d.emoji)}<span class="urg">${ic('clock',11)} ${isFresh(d)?esc(d.when):'Acil'}</span><span class="gview">${ic('eye',11)} ${viewersOf(d)}</span></div><div class="rb"><div class="rt">${esc(d.title)}</div><div class="rp">${budgetShort(d)}</div><div class="rm">${ic('pin',10)} ${esc(d.city)} · ${cnt(pid,d)}</div></div></a>`;}
function cnt(pid,d){return d.owner===P(pid).me?`${d.offers.length} teklif`:`${d.pres.length} sunum`;}
function isFresh(d){return /saat|az önce|dk|dakika/i.test(d.when||'');}
function trustShort(b){return b.includes('Güçlü')?'Güçlü Alıcı':b.includes('Doğrulan')?'Onaylı Alıcı':'Aktif Alıcı';}
function fixedPriceOf(d){return d.price||Math.round(((d.bMin||0)+(d.bMax||0))/2);}
function priceLabel(v){return Math.round(v).toLocaleString('tr-TR')+'₺';}
function budgetStr(d){return priceLabel(fixedPriceOf(d));}
function budgetShort(d){return priceLabel(fixedPriceOf(d));}
function shortName(nm){const a=String(nm).split(' ');return a[0]+(a[1]?' '+a[1][0]+'.':'');}
const STAR=starSVG(10);
const DOT='<span style="width:5px;height:5px;border-radius:50%;background:#9D4EDD;display:inline-block"></span>';
/* engagement helpers (deterministik — re-render'da zıplamaz) */
function hsh(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function viewersOf(d){return 4+(hsh(d.id)%21);}
function urgentOf(d){return /az önce|dk|dakika/.test(d.when||'')||(hsh(d.id)%5===0);}
function progPct(pid,d){const have=d.owner===P(pid).me?d.offers.length:d.pres.length;return Math.min(100,have*26+(d.owner===P(pid).me?15:34));}
const TRENDS=['Leica M6','Air Jordan 1','Omega Seamaster','DJI Mavic 3','Fender Strat','Rolex Datejust','Polaroid SX-70'];
const TOPSELLERS=[{name:'Derya Soysal',av:'DS',score:4.9,sales:51,sig:'Hızlı Kargolayan'},{name:'Ahmet Şafak',av:'AŞ',score:4.8,sales:34,sig:'Güvenilir Satıcı'},{name:'Emre Kaya',av:'EK',score:4.7,sales:28,sig:'Sunum Kalitesi'}];
const REVPOOL=[
 {av:'MK',by:'Mehmet K.',s:5,t:'Tam tarif ettiğim ürün geldi, kargo hızlıydı. Tekrar çalışırım.',w:'2 gün önce'},
 {av:'SA',by:'Selin A.',s:5,t:'Sunum birebir, iletişim çok iyiydi. Güvenle aldım.',w:'1 hafta önce'},
 {av:'EK',by:'Emre K.',s:4,t:'Ürün açıklandığı gibiydi, biraz geç kargolandı ama sorun çıkmadı.',w:'2 hafta önce'},
 {av:'DS',by:'Derya S.',s:5,t:'Fotoğraflar gerçeği yansıtıyordu, paketleme çok özenliydi.',w:'3 hafta önce'},
 {av:'CA',by:'Can A.',s:5,t:'Pazarlığa açıktı, sorularıma hızlı döndü. Memnun kaldım.',w:'1 ay önce'},
 {av:'BT',by:'Burak T.',s:4,t:'İkinci alışverişim, yine sorunsuz. Güvenilir satıcı.',w:'1 ay önce'}];
function reviewsFor(u){const h=hsh(u),L=REVPOOL.length;const a=[REVPOOL[h%L],REVPOOL[(h>>>4)%L],REVPOOL[(h>>>8)%L]];return a.filter((r,i)=>r&&a.indexOf(r)===i);}
const BUDPRESETS=[['₺5B',5000],['₺10B',10000],['₺25B',25000],['₺50B',50000],['₺100B',100000]];
function mineTag(pid,d){return d.owner===P(pid).me?`<span class="mine-tag">● Senin talebin</span>`:'';}
function heroCard(pid,d){return `<a class="hero" href="${rolePath(pid,`/ilan/${routeSlugForDemand(d)}/`)}">${photoDiv(d.ph,d.emoji)}<div class="scrim"></div><span class="pin">★ Öne çıkan</span>${isFresh(d)?`<span class="fresh">🔥 ${esc(d.when)}</span>`:''}<div class="info"><h3>${esc(d.title)}</h3><div class="meta"><span class="tb">@${esc(d.owner)}</span><span>📍 ${d.city}</span><span class="price">${budgetStr(d)}</span></div></div></a>`;}
function gridCard(pid,d){const mine=d.owner===P(pid).me;const nm=uName(d.owner);const u=urgentOf(d)&&!mine;
  const overlay=mine?`<span class="mineph">${DOT} Senin talebin</span>`:`${u?`<span class="urg">${ic('clock',11)} ${isFresh(d)?esc(d.when):'Acil'}</span>`:''}<span class="gview">${ic('eye',11)} ${viewersOf(d)}</span>`;
  const prog=`<div class="gprog"><i style="width:${progPct(pid,d)}%"></i></div><div class="gpline">${mine?(d.offers.length?d.offers.length+' teklif geldi':'Sunum bekleniyor'):(d.pres.length?d.pres.length+' satıcı sundu':'İlk sunan ol')}</div>`;
  return `<a class="gcard" href="${rolePath(pid,`/ilan/${routeSlugForDemand(d)}/`)}"><div class="gph">${photoDiv(d.ph,d.emoji)}${overlay}</div><div class="gbody"><div class="gtt">${esc(d.title)}</div><div class="glabel">${mine?'Senin fiyatın':'Fiyat'}</div><div class="gpr ${mine?'mineg':''}">${budgetShort(d)}</div><div class="gfoot">${mine?`<span class="minechip">${DOT} Senin</span><span class="gcount">${d.pres.length} sunum</span>`:`<span class="gav">${initials(nm)}</span><span class="gnm">${esc(shortName(nm))}</span><span class="grate">${STAR} ${uScore(d.owner)}</span>`}</div>${prog}</div></a>`;}
function renderKesfet(pid){if(!P(pid).me)return;const b=el(pid,'kesfetBody');if(!b)return;
  const search=`<div class="searchbar" onclick="toast('${pid}','Arama yakında — şimdilik kategori veya trend seç.')"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>Kategori veya ürün ara…</div>`;
  const trends=`<div class="label-sm">Trend aramalar</div><div class="trends">${TRENDS.slice(0,6).map(t=>`<button class="trend" onclick="toast('${pid}','“${esc(t)}” için talepler filtrelendi (demo).')">${esc(t)}</button>`).join('')}</div>`;
  const cats=`<div class="sechead"><h3>Kategoriler</h3><span class="more">${DEMANDS.length} talep</span></div><div class="tiles">${CATS.slice(0,6).map(c=>{const d=DEMANDS.find(x=>x.cat===c.id)||{ph:PIC.camera};return `<a class="gtile" href="${rolePath(pid,`/kategori/${c.id}/`)}">${photoDiv(d.ph,c.emoji)}<div class="scrim" style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 38%,rgba(8,7,4,.62))"></div><div class="cap"><b>${c.name.split(' ')[0]}</b><span>${DEMANDS.filter(x=>x.cat===c.id).length} talep</span></div></a>`;}).join('')}</div>`;
  const lead=`<div class="sechead"><h3>Haftanın satıcıları</h3><span class="more">sıralama</span></div><div class="group glass">${TOPSELLERS.map((s,i)=>`<div class="lead"><span class="rankb r${i+1}">${i+1}</span><span class="lav">${s.av}</span><div class="lt"><h4>${esc(s.name)}</h4><p>${starSVG(10)} ${s.score} · ${s.sales} satış · ${esc(s.sig)}</p></div><span class="lsc">${s.score}</span></div>`).join('')}</div>`;
  const tools=`<div class="sechead"><h3>Araçlar & gelir</h3></div><div class="toolg"><button class="tool" onclick="openCalc('${pid}')"><div class="ti">${ic('calc',18)}</div><h4>Teklif kredisi</h4><p>Maliyeti hesapla</p></button><button class="tool" onclick="selectTab('${pid}','kredi')"><div class="ti">${ic('card',18)}</div><h4>Kredi & Plan</h4><p>Paket & Esnafım</p></button><button class="tool" onclick="toast('${pid}','Anahtar kelime alarmı kuruldu.')"><div class="ti">${ic('bell',18)}</div><h4>Talep alarmı</h4><p>İlgini bildir</p></button><button class="tool" onclick="toast('${pid}','İlan 24 saat öne çıkarıldı.')"><div class="ti">${ic('zap',18)}</div><h4>Öne çıkar</h4><p>24 saat üstte</p></button></div>`;
  b.innerHTML=search+trends+cats+lead+tools;}

/* ---- DETAIL ---- */
function openDetail(pid,id){const p=P(pid);p.curDemand=id;p.detailImg=0;renderDetail(pid);push(pid,'detail');routeAfterNav(pid,'detail');}
function detailImgsFor(d){
  const related=(Array.isArray(DEMANDS)?DEMANDS.filter(x=>x.cat===d.cat).map(x=>x.ph):[]);
  const pres=(d.pres||[]).reduce((a,pr)=>a.concat(pr.ph?[pr.ph]:[],pr.imgs||[]),[]);
  const pool=(typeof refPoolFor==='function'?refPoolFor(d.cat):[]);
  return [d.ph].concat(pres,related,pool).filter(Boolean).filter((x,i,a)=>a.indexOf(x)===i).slice(0,10);
}
function setDetailImg(pid,n){const p=P(pid);const d=DEMANDS.find(x=>x.id===p.curDemand);if(!d)return;const imgs=detailImgsFor(d);if(!imgs.length)return;p.detailImg=(n+imgs.length)%imgs.length;renderDetail(pid);}
function stepDetailImg(pid,dir){setDetailImg(pid,(P(pid).detailImg||0)+dir);}
function presStatusLabel(pr){const s=pr.status||'sunuldu';return s==='teklif_verildi'?'<span class="badge g">Resmi teklif verildi · sohbet açık</span>':s==='teklif_istendi'?'<span class="badge o offer-requested">Teklif istendi</span>':s==='rejected'?'<span class="badge" style="background:rgba(181,70,46,.12);color:var(--red)">Beğenilmedi</span>':'<span class="badge">Sunuldu · inceleniyor</span>';}
function presActions(pid,d,pr,i){const me=P(pid).me;const isOwner=d.owner===me;const isMine=pr.by===me;const s=pr.status||'sunuldu';
  if(isOwner){
    if(s==='sunuldu')return `<div class="obtns" style="margin-top:9px"><button class="btn fill sm" onclick="requestOffer('${pid}','${d.id}',${i})">Teklif İste</button><button class="btn glass sm" onclick="rejectPres('${pid}','${d.id}',${i})">Beğenmedim</button></div>`;
    if(s==='teklif_istendi')return `<div class="badge o offer-requested" style="margin-top:9px;display:inline-flex">Teklif istendi · satıcı fiyat veriyor</div>`;
    if(s==='teklif_verildi')return '';
    return `<div class="badge" style="margin-top:9px;display:inline-flex">Beğenmedin</div>`;
  }
  if(isMine){
    if(s==='sunuldu')return `<div class="badge" style="margin-top:9px;display:inline-flex">Alıcı incelemesi bekleniyor</div>`;
    if(s==='teklif_istendi')return `<div class="seller-requested-banner">Teklif istendi <small>Alıcı resmi fiyat bekliyor</small></div><button class="btn fill sm" onclick="sellerOfficialOffer('${pid}','${d.id}',${i})">Resmi Teklif Ver · ${offerCredit(d)} kredi</button>`;
    if(s==='teklif_verildi')return `<button class="btn fill sm" style="margin-top:9px" onclick="openPresChat('${pid}','${d.id}',${i})">Sohbete geç</button>`;
    return `<div class="badge" style="margin-top:9px;display:inline-flex">Alıcı beğenmedi</div>`;
  }
  return '';
}
function renderDetail(pid){const p=P(pid);const d=DEMANDS.find(x=>x.id===p.curDemand);if(!d||!p.me)return;const me=p.me;const isOwner=d.owner===me;
  const lowest=d.offers.length?Math.min(...d.offers.map(o=>o.price)):null;
  const ownerName=uName(d.owner),ownerHandle=(USERS[d.owner]&&USERS[d.owner].u)||d.owner,ownerAv=uAv(d.owner);
  const myPres=d.pres.find(pr=>pr.by===me);
  const imgs=detailImgsFor(d),gi=Math.min(p.detailImg||0,Math.max(imgs.length-1,0)),mainImg=imgs[gi]||d.ph,thumbs=imgs.slice(0,6);
  const visPres=isOwner?d.pres:d.pres.filter(pr=>pr.by===me);
  const cta=isOwner
    ?`<div class="detail-hint">Bu senin talebin. Sağdaki listeden sunumu açıp <b>Teklif İste</b> dediğinde satıcı resmi teklif verecek.</div>`
    :(myPres?`<div class="detail-hint">Sunumun alıcıya iletildi. Alıcı <b>Teklif İste</b> derse resmi teklif butonu açılır. Tahmini maliyet: <b>${offerCredit(d)} kredi</b>.</div>`
      :`<button class="btn fill" onclick="presentProduct('${pid}','${d.id}')">${ic('store',17)} Ürün Sun</button><div class="detail-hint">Sunum ücretsiz. Alıcı beğenip teklif isterse resmi fiyatını verirsin; tahmini maliyet <b>${offerCredit(d)} kredi</b>.</div>`);
  const officialRows=d.offers.length?d.offers.slice().sort((a,b)=>a.price-b.price).map(o=>`<button class="detail-offer-row ${o.price===lowest?'best':''}" onclick="openPresChatBySeller('${pid}','${d.id}','${esc(o.by)}')"><span class="detail-offer-av">${uAv(o.by)}</span><span class="detail-offer-copy"><b>${esc(uName(o.by))}</b><small>${starSVG(10)} ${uScore(o.by)} · ${esc(o.dlv||'Teslimat')}</small></span><span class="detail-offer-price">${TL(o.price)}</span></button>`).join(''):'';
  const presRows=visPres.length?visPres.map(pr=>{const i=d.pres.indexOf(pr);const nm=uName(pr.by);const ni=pr.media?pr.media.images:((pr.imgs&&pr.imgs.length)||1);return `<button class="detail-offer-row" onclick="openPresGallery('${pid}','${d.id}',${i})"><span class="detail-offer-thumb"><img src="${IMG(pr.ph)}" onerror="this.style.opacity=0"></span><span class="detail-offer-copy"><b>${esc(isOwner?nm:'Senin sunumun')}</b><small>${ni} görsel · ${presStatePlain(pr.status||'sunuldu')}</small></span><span class="detail-offer-open">${ic('chevR',15)}</span></button>`;}).join(''):'';
  const listTitle=d.offers.length?'Resmi teklifler':(isOwner?'Ürün sunumları':'Sunum ve teklif');
  const listCount=d.offers.length?`${d.offers.length} teklif`:`${visPres.length} sunum`;
  const listBody=officialRows||presRows||`<div class="detail-empty-list"><b>Henüz teklif yok</b><span>${isOwner?'Satıcılar ürün sunduğunda burada listelenecek.':'Ürün sunarsan durumunu burada göreceksin.'}</span></div>`;
  const trustBand=`<div class="detail-trust-band"><div class="detail-trust-item"><span class="detail-trust-icon">${ic('shield',17)}</span><div><b>Sistem içi teklif</b><span>Fiyat, pazarlık ve onay akışı kayıt altında ilerler.</span></div></div><div class="detail-trust-item"><span class="detail-trust-icon">${ic('camera',17)}</span><div><b>Kanıtlı sunum</b><span>Fotoğraf, durum notu ve varsa video ile ürün doğrulanır.</span></div></div><div class="detail-trust-item"><span class="detail-trust-icon">${ic('truck',17)}</span><div><b>Kargo takipli</b><span>Onay sonrası teslimat ve takip bilgisi sistemde tutulur.</span></div></div></div>`;
  const specHTML=`<section class="detail-spec-card"><div class="detail-card-title"><h3>Aranan ürün kriterleri</h3><span>${catName(d.cat)}</span></div><div class="detail-spec-grid"><div class="detail-spec"><b>Bütçe net</b><span>${budgetStr(d)} seviyesine uygun ürün bekleniyor.</span></div><div class="detail-spec"><b>Orijinallik kanıtı</b><span>Fatura, kutu, seri no veya net fotoğraf avantaj sağlar.</span></div><div class="detail-spec"><b>Teslimat bölgesi</b><span>${esc(d.city)} içi hızlı teslimat öne çıkar.</span></div><div class="detail-spec"><b>Teklif maliyeti</b><span>Alıcı teklif isterse resmi fiyat ${offerCredit(d)} kredi.</span></div></div></section>`;
  const assuranceHTML=`<section class="detail-assurance-card"><h3>Bulbana güven akışı</h3><p>Satıcı ürünü sunar, alıcı beğenirse resmi teklif ister. Onay, pazarlık ve teslimat sistem içinde görünür kalır.</p><div class="detail-assurance-list"><span><i>1</i> Sunum ücretsiz gönderilir</span><span><i>2</i> Alıcı beğenirse resmi teklif ister</span><span><i>3</i> Anlaşma sonrası kargo takibi açılır</span></div></section>`;
  const imgControls=imgs.length>1?`<button type="button" class="detail-img-nav prev" aria-label="Önceki görsel" onclick="event.stopPropagation();stepDetailImg('${pid}',-1)">${ic('chevR',20)}</button><button type="button" class="detail-img-nav next" aria-label="Sonraki görsel" onclick="event.stopPropagation();stepDetailImg('${pid}',1)">${ic('chevR',20)}</button><span class="detail-img-count">${gi+1} / ${imgs.length}</span>`:'';
  el(pid,'detailBody').innerHTML=`<div class="detail-page">
    <section class="detail-media-card">
      <div class="detail-hero dhero">${photoDiv(mainImg,d.emoji)}<div class="scrim"></div><span class="pin">${catIcon(d.cat,12)} ${catName(d.cat)}</span>${isOwner?'<span class="fresh">'+DOT+' Senin talebin</span>':(isFresh(d)?'<span class="fresh">'+ic('flame',11)+' Yeni talep</span>':'')}${imgControls}</div>
      <div class="detail-media-foot"><span>${ic('image',14)} ${imgs.length} referans görsel</span><div class="detail-thumbs">${thumbs.map((ph,i)=>`<button type="button" class="detail-thumb ${i===gi?'on':''}" aria-label="Görsel ${i+1}" onclick="setDetailImg('${pid}',${i})"><img src="${IMG(ph)}" onerror="this.style.opacity=0"></button>`).join('')}</div></div>
    </section>
    <main class="detail-main">
      <section class="detail-info-card">
        <div class="detail-eyebrow"><span class="badge o">${catIcon(d.cat,12)} ${catName(d.cat)}</span><span class="dbadge">${ic('sparkle',11)} ${trustShort(d.badge)}</span>${isOwner?'<span class="mine-tag">'+DOT+' Senin talebin</span>':''}</div>
        <h2 class="detail-title">${esc(d.title)}</h2>
        <p class="detail-desc">${esc(d.desc)}</p>
        ${trustBand}
        <div class="detail-meta-row"><span>${ic('pin',13)} ${esc(d.city)}</span><span>${ic('clock',13)} ${esc(d.when)}</span><span>${ic('eye',13)} ${viewersOf(d)} izliyor</span><span>${ic('inbox',13)} ${d.pres.length} sunum</span></div>
      </section>
      ${specHTML}
      ${assuranceHTML}
    </main>
    <aside class="detail-aside">
      <section class="detail-price-panel">
        <div class="detail-price-label">Alıcının net fiyatı</div>
        <div class="detail-price-value">${budgetStr(d)}</div>
        <p class="detail-price-sub">Alıcı bu bütçeye uygun, doğrulanabilir ürün sunumu bekliyor.</p>
        <div class="detail-cta">${cta}</div>
        <div class="detail-kpis"><div class="detail-kpi"><b>${d.pres.length}</b><span>Sunum</span></div><div class="detail-kpi"><b>${d.offers.length}</b><span>Teklif</span></div><div class="detail-kpi"><b>${offerCredit(d)}</b><span>Kredi</span></div></div>
      </section>
      <section class="detail-offers-panel"><div class="detail-offers-head"><h3>${listTitle}</h3><span>${listCount}</span></div><div class="detail-offer-list">${listBody}</div></section>
    </aside>
  </div>`;}

/* ---- SUNUM GALERİSİ (alıcı görselleri inceler) ---- */
function openPresGallery(pid,id,i){const p=P(pid);p.curDemand=id;p.curPres=i;p.galImg=0;renderPresGallery(pid);push(pid,'presdetail');routeAfterNav(pid,'presdetail');}
function setGalImg(pid,n){P(pid).galImg=n;renderPresGallery(pid);}
function requestOfferG(pid){const p=P(pid);requestOffer(pid,p.curDemand,p.curPres);if(p.stack[p.stack.length-1]==='presdetail')renderPresGallery(pid);}
function rejectPresG(pid){const p=P(pid);rejectPres(pid,p.curDemand,p.curPres);pop(pid);}
function renderPresGallery(pid){const p=P(pid);const d=DEMANDS.find(x=>x.id===p.curDemand);if(!d){pop(pid);return;}const pr=d.pres[p.curPres];if(!pr){pop(pid);return;}const me=p.me;const isOwner=d.owner===me;const imgs=(pr.imgs&&pr.imgs.length)?pr.imgs:[pr.ph];const gi=Math.min(p.galImg||0,imgs.length-1);const nm=uName(pr.by);const s=pr.status||'sunuldu';
  const main=`<div class="galmain">${photoDiv(imgs[gi],pr.emoji)}<span class="galcount">${gi+1} / ${imgs.length}</span></div>`;
  const thumbs=`<div class="galthumbs">${imgs.map((id2,n)=>`<button class="galth ${n===gi?'on':''}" onclick="setGalImg('${pid}',${n})"><img src="${IMG(id2)}" onerror="this.style.opacity=0"></button>`).join('')}${Array.from({length:(pr.vids||0)}).map((_,n)=>`<div class="galth vid">${ic('video',16)}<span class="vd">0:${('0'+(12+n*7)).slice(-2)}</span></div>`).join('')}</div>`;
  const seller=`<div class="galseller"><span class="gsav">${uAv(pr.by)}</span><div style="min-width:0"><div class="gsn">${esc(nm)}${uVerified(pr.by)?sealSm:''}</div><div class="gsm">${starSVG(11)} ${uScore(pr.by)} · ${esc(pr.cond||'İkinci el')} · ${ic('pin',10)} ${esc(pr.city||'İstanbul')}</div></div></div><div class="sigs" style="margin-top:9px">${uSigsHTML(pr.by)}</div>`;
  const ctx=`<div class="galctx"><div><div class="gxl">Alıcının fiyatı</div><div class="gxv">${budgetStr(d)}</div></div><div>${presStatusLabel(pr)}</div></div>`;
  const desc=`<div class="label-sm">Satıcının açıklaması</div><div class="note glass" style="margin-top:0">${esc(pr.desc)}</div>`;
  let actions='';
  if(isOwner&&s==='sunuldu')actions=`<div class="galbtns"><button class="btn fill" onclick="requestOfferG('${pid}')">Teklif İste</button><button class="btn glass" onclick="rejectPresG('${pid}')">Beğenmedim</button></div>`;
  else if(isOwner&&s==='teklif_istendi')actions=`<div class="note glass offer-requested-note" style="margin-top:14px">Teklif istendi · satıcı resmi fiyatını veriyor.</div>`;
  else if(isOwner&&s==='teklif_verildi')actions=`<div class="galbtns one"><button class="btn fill" onclick="openPresChat('${pid}','${d.id}',${p.curPres})">Sohbete geç · teklifi gör</button></div>`;
  else if(pr.by===me&&s==='teklif_istendi')actions=`<div class="seller-requested-banner">Teklif istendi <small>Alıcı resmi fiyat bekliyor</small></div><div class="galbtns one"><button class="btn fill" onclick="sellerOfficialOffer('${pid}','${d.id}',${p.curPres})">Resmi Teklif Ver · ${offerCredit(d)} kredi</button></div>`;
  else if(pr.by===me&&s==='teklif_verildi')actions=`<div class="galbtns one"><button class="btn fill" onclick="openPresChat('${pid}','${d.id}',${p.curPres})">Sohbete geç</button></div>`;
  else if(s==='rejected')actions=`<div class="note glass" style="margin-top:14px">Bu sunum beğenilmedi olarak işaretlendi.</div>`;
  el(pid,'presdetailBody').innerHTML=main+`<div class="galpad">${thumbs}<div class="galtitle">${esc(d.title)}</div>${seller}${ctx}${desc}${actions}</div>`;}
function requestOffer(pid,id,i){const d=DEMANDS.find(x=>x.id===id);if(!d||!d.pres[i])return;if(d.pres[i].status==='teklif_verildi'){openPresChat(pid,id,i);return;}d.pres[i].status='teklif_istendi';toast(pid,'Teklif istendi — satıcıya iletildi.');syncAll(pid);}
function rejectPres(pid,id,i){const d=DEMANDS.find(x=>x.id===id);if(!d||!d.pres[i])return;d.pres[i].status='rejected';toast(pid,'Sunum beğenilmedi olarak işaretlendi.');syncAll(pid);}
function presentProduct(pid,id){const d=DEMANDS.find(x=>x.id===id);const p=P(pid);p.presImgs=[];p.presVids=[];
  openSheet(pid,'Ürün Sun',`"${esc(d.title)}" talebine fotoğraflı sunum göndereceksin. Durum, açıklama, görsel ve video ekle — ücretsizdir.`,'Gönder',()=>{
    const desc=(el(pid,'presDesc')?.value||'').trim();if(desc.length<10){toast(pid,'Açıklama en az 10 karakter olmalı.');return false;}
    const gimgs=p.presImgs.length?p.presImgs.slice():refPoolFor(d.cat).slice(0,3);d.pres.unshift({by:p.me,cond:(el(pid,'presCond').value||'İkinci el'),city:'İstanbul',ph:gimgs[0]||d.ph,imgs:gimgs,vids:p.presVids.length,emoji:d.emoji,desc,status:'sunuldu',media:{images:gimgs.length,videos:p.presVids.length}});
    renderDetail(pid);toast(pid,'Sunum gönderildi; alıcı incelemesi bekleniyor.');syncAll(pid);});
  el(pid,'sheetBody').innerHTML=`<div class="cform glass"><div class="cfield"><span class="fic">${ic('tag',16)}</span><input id="${pid}-presCond" value="İkinci el" placeholder="Durum"></div><div class="cfield col"><label>Açıklama (10–250)</label><textarea id="${pid}-presDesc" maxlength="250" placeholder="Ürün durumu, varsa kusur, teslimat…"></textarea></div></div>
  <div class="label-sm">Görseller · <span id="${pid}-presImgCount" style="color:var(--tint);font-weight:800">0</span>/10</div><div class="refgrid" id="${pid}-presImgGrid"></div>
  <div class="label-sm">Video · opsiyonel · <span id="${pid}-presVidCount" style="color:var(--tint);font-weight:800">0</span>/3</div><div class="refgrid" id="${pid}-presVidGrid"></div>
  <div style="font-size:11px;color:var(--label3);margin:3px 3px 8px;line-height:1.4">İlk görsel <b>kapak</b> olur. Video çalışma/kondisyonu kanıtlar.</div>`;
  renderPresImgGrid(pid);renderPresVidGrid(pid);}
function renderPresImgGrid(pid){const p=P(pid);const g=el(pid,'presImgGrid');if(!g)return;g.innerHTML=p.presImgs.map((ph,i)=>`<div class="reftile ${i===0?'first':''}"><img src="${IMG(ph)}" onerror="this.style.opacity=0"><button class="rx" onclick="removePresImg('${pid}',${i})">×</button></div>`).join('')+(p.presImgs.length<10?`<button class="reftile add" onclick="addPresImg('${pid}')"><b>+</b><span>Görsel</span></button>`:'');const c=el(pid,'presImgCount');if(c)c.textContent=p.presImgs.length;}
function addPresImg(pid){const p=P(pid);if(p.presImgs.length>=10)return;const d=DEMANDS.find(x=>x.id===p.curDemand);const pool=refPoolFor(d?d.cat:'foto');p.presImgs.push(pool[p.presImgs.length%pool.length]);renderPresImgGrid(pid);}
function removePresImg(pid,i){P(pid).presImgs.splice(i,1);renderPresImgGrid(pid);}
function renderPresVidGrid(pid){const p=P(pid);const g=el(pid,'presVidGrid');if(!g)return;g.innerHTML=p.presVids.map((v,i)=>`<div class="reftile vid"><span class="dur">0:${('0'+(12+i*7)).slice(-2)}</span><button class="rx" onclick="removePresVid('${pid}',${i})">×</button></div>`).join('')+(p.presVids.length<3?`<button class="reftile add" onclick="addPresVid('${pid}')"><b>+</b><span>Video</span></button>`:'');const c=el(pid,'presVidCount');if(c)c.textContent=p.presVids.length;}
function addPresVid(pid){const p=P(pid);if(p.presVids.length>=3)return;p.presVids.push(1);renderPresVidGrid(pid);}
function removePresVid(pid,i){P(pid).presVids.splice(i,1);renderPresVidGrid(pid);}

/* ---- CHAT ---- */
function ensureChat(demandId,sellerUser){let c=CHATS.find(x=>x.demandId===demandId&&x.seller===sellerUser);if(!c){const d=DEMANDS.find(x=>x.id===demandId);c={id:'c'+Date.now()+Math.floor(Math.random()*99),demandId,demandTitle:d?d.title:'',owner:d?d.owner:'',seller:sellerUser,ph:d?d.ph:PIC.camera,emoji:d?d.emoji:'💬',last:'',msgs:[]};CHATS.unshift(c);}return c;}
function openPresChat(pid,id,i){const d=DEMANDS.find(x=>x.id===id);if(!d||!d.pres[i])return;const c=ensureChat(id,d.pres[i].by);P(pid).curChat=c.id;push(pid,'chat');renderChat(pid);routeAfterNav(pid,'chat');}
function openPresChatBySeller(pid,id,sellerUser){const c=ensureChat(id,sellerUser);P(pid).curChat=c.id;push(pid,'chat');renderChat(pid);routeAfterNav(pid,'chat');}
function sellerOfficialOffer(pid,id,i){const d=DEMANDS.find(x=>x.id===id);if(!d||!d.pres[i])return;const me=P(pid).me;const cost=offerCredit(d);const acc=USERS[me];
  openSheet(pid,'Resmi Teklif Ver',`Bu <b>ilk resmi teklif ${cost} kredi</b> harcar (formülle). Sohbet açılır; sonraki revizeler <b>ücretsiz</b>.`,`${cost} kredi harca`,()=>{
    if(acc.credits<cost){toast(pid,'Yetersiz kredi — paket al.');return false;}
    const pr=parseInt((el(pid,'offerPrice').value||'').replace(/[^0-9]/g,''))||0;if(pr<=0){toast(pid,'Geçerli fiyat gir.');return false;}
    const dlv=(el(pid,'offerDlv').value||'').trim()||'2 gün kargo';const note=(el(pid,'offerNote').value||'').trim();
    acc.credits-=cost;syncCredits(pid);
    d.pres[i].status='teklif_verildi';
    const c=ensureChat(id,me);
    c.msgs.push({offer:pr,by:me,status:'pending',first:true,credit:cost,dlv,note:note||'Resmi satıcı teklifi'});c.last='Resmi teklif: '+TL(pr);
    d.offers=d.offers.filter(o=>o.by!==me);d.offers.push({by:me,price:pr,dlv});
    P(pid).curChat=c.id;renderDetail(pid);push(pid,'chat');renderChat(pid);toast(pid,`Teklif verildi · ${cost} kredi harcandı.`);syncAll(pid);});
  el(pid,'sheetBody').innerHTML=`<div class="form glass"><div class="frow"><label>Fiyat (₺)</label><input id="${pid}-offerPrice" type="number" inputmode="numeric" placeholder="${Math.round((d.bMin+d.bMax)/2)}"></div><div class="frow"><label>Teslimat</label><input id="${pid}-offerDlv" placeholder="2 gün kargo / elden"></div><div class="frow col"><label style="display:block;margin-bottom:4px">Not</label><textarea id="${pid}-offerNote" placeholder="Durum, garanti, teslimat…"></textarea></div></div>`;}
function reviseOffer(pid,prefill='',prenote=''){const p=P(pid);const c=CHATS.find(x=>x.id===p.curChat);if(!c||p.me!==c.seller){toast(pid,'Teklif güncelleme satıcı tarafındadır.');return;}
  openSheet(pid,'Teklifi Güncelle','Revize teklif <b>ücretsizdir</b> — kredi harcanmaz. Yeni fiyatını gir; alıcı yalnızca <b>son</b> teklifi onaylayabilir.','Güncel teklifi gönder',()=>{
    const pr=parseInt((el(pid,'rvPrice').value||'').replace(/[^0-9]/g,''))||0;if(pr<=0){toast(pid,'Geçerli fiyat gir.');return false;}
    const note=(el(pid,'rvNote').value||'').trim();
    c.msgs.forEach(m=>{if(m.offer!==undefined&&m.status==='pending')m.status='superseded';});
    c.msgs.push({offer:pr,by:p.me,status:'pending',first:false,credit:0,note:note||'Güncel teklif (ücretsiz revize)'});c.last='Güncel teklif: '+TL(pr);
    const d=DEMANDS.find(x=>x.id===c.demandId);if(d){d.offers=d.offers.filter(o=>o.by!==c.seller);d.offers.push({by:c.seller,price:pr,dlv:'güncel'});}
    toast(pid,'Teklif güncellendi (ücretsiz).');syncAll(pid);});
  el(pid,'sheetBody').innerHTML=`<div class="form glass"><div class="frow"><label>Yeni fiyat (₺)</label><input id="${pid}-rvPrice" type="number" inputmode="numeric" value="${esc(prefill)}"></div><div class="frow col"><label style="display:block;margin-bottom:4px">Not</label><textarea id="${pid}-rvNote" placeholder="Örn. Pazarlığa istinaden güncellendi.">${esc(prenote)}</textarea></div></div>`;}
function offerFromCounter(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i]||c.msgs[i].counterOffer===undefined)return;const price=c.msgs[i].counterOffer;
  c.msgs[i].status='answered';
  c.msgs.forEach(m=>{if(m.offer!==undefined&&m.status==='pending')m.status='superseded';});
  c.msgs.push({offer:price,by:c.seller,status:'accepted',first:false,credit:0,note:'Alıcının pazarlık fiyatı kabul edildi'});
  c.msgs.push({sys:true,t:'Satıcı pazarlık fiyatını kabul etti — sipariş açıldı, 3 günlük kargo sayacı başladı.'});
  c.last='Anlaşıldı: '+TL(price);
  const d=DEMANDS.find(x=>x.id===c.demandId);if(d){d.offers=d.offers.filter(o=>o.by!==c.seller);d.offers.push({by:c.seller,price:price,dlv:'anlaşıldı'});}
  toast(pid,'Pazarlık kabul edildi — sipariş açıldı.');syncAll(pid);}
function chatsForPhone(pid){const me=P(pid).me;return CHATS.filter(c=>c.owner===me||c.seller===me);}
function statusOfChat(pid,c){const me=P(pid).me;const iAmBuyer=me===c.owner;
  if(c.msgs.some(m=>m.status==='shipped'))return{cls:'ship',t:ic('truck',11)+' Kargoda',un:0};
  if(c.msgs.some(m=>m.status==='accepted'))return{cls:'deal',t:ic('check',11)+' Anlaşıldı',un:0};
  if(c.msgs.some(m=>m.offer!==undefined&&m.status==='pending'))return iAmBuyer?{cls:'wait',t:'Teklif seni bekliyor',un:1}:{cls:'neg',t:'Yanıt bekleniyor',un:0};
  return{cls:'neg',t:'Görüşme',un:0};}
function renderChatList(pid){const p=P(pid);if(!p.me)return;const b=el(pid,'msgBody');if(!b)return;const all=chatsForPhone(pid);const filt=p.msgFilter||'all';
  let list=all;if(filt==='buyer')list=all.filter(c=>c.owner===p.me);else if(filt==='seller')list=all.filter(c=>c.seller===p.me);
  const tabs=`<div class="msgtabs">${[['all','Tümü'],['buyer','Alıcı'],['seller','Satıcı']].map(([k,l])=>`<button class="msgtab ${filt===k?'on':''}" onclick="setMsgFilter('${pid}','${k}')">${l}</button>`).join('')}</div>`;
  const orders=all.filter(c=>c.msgs.some(m=>m.status==='accepted'||m.status==='shipped'));
  const ordHTML=orders.length?`<div class="label-sm">Aktif siparişler</div><div class="ordstrip">${orders.map(c=>{const om=c.msgs.filter(m=>m.offer!==undefined).pop();const sh=c.msgs.some(m=>m.status==='shipped');return `<button class="ordc" onclick="openChatById('${pid}','${c.id}')"><small>${sh?'Kargoda':'Sipariş'}</small><h4>${esc(c.demandTitle)}</h4><div class="op">${om?TL(om.offer):''}</div><div class="os">${sh?ic('truck',11)+' Yolda · takip':ic('clock',11)+' 3 gün sayaç'}</div></button>`;}).join('')}</div>`:'';
  if(!list.length){b.innerHTML=tabs+ordHTML+`<div class="note glass" style="text-align:center;margin-top:10px">Henüz sohbet yok.<br><span style="color:#8C84A0">Bir talebe ürün sun ya da gelen sunumda “Teklif İste” de — satıcı resmi teklif verince sohbet açılır.</span></div>`;return;}
  const rows=`<div class="label-sm">Sohbetler</div><div class="group glass">${list.map(c=>{const other=c.owner===p.me?c.seller:c.owner;const st=statusOfChat(pid,c);return `<button class="msgrow" onclick="openChatById('${pid}','${c.id}')"><span class="mav">${uAv(other)}${st.un?`<span class="un">${st.un}</span>`:''}</span><div class="mt"><div class="mh"><h4>${esc(uName(other))}</h4><span class="mtime">${c.owner===p.me?'Alıcısın':'Satıcısın'}</span></div><p>${esc(c.demandTitle)} · ${esc(c.last||'sohbet')}</p><span class="mstat ${st.cls}">${st.t}</span></div></button>`;}).join('')}</div>`;
  b.innerHTML=tabs+ordHTML+rows;}
function setMsgFilter(pid,f){P(pid).msgFilter=f;renderChatList(pid);}
function openChatById(pid,cid){P(pid).curChat=cid;push(pid,'chat');renderChat(pid);routeAfterNav(pid,'chat');}
function lastPendingOffer(c){for(let i=c.msgs.length-1;i>=0;i--){if(c.msgs[i].offer!==undefined&&c.msgs[i].status==='pending')return i;}return -1;}
function renderChat(pid){const p=P(pid);const c=CHATS.find(x=>x.id===p.curChat);if(!c||!p.me)return;const me=p.me;
  const iAmBuyer=me===c.owner;const iAmSeller=me===c.seller;const other=iAmBuyer?c.seller:c.owner;el(pid,'backtitle').textContent=uName(other);
  const hasOffer=c.msgs.some(m=>m.offer!==undefined);
  el(pid,'offerDock').classList.add('hidden');
  const lastP=lastPendingOffer(c);const wrap=el(pid,'chatScroll');
  const safety=`<div class="safetyNotice"><i style="color:#9D4EDD">${ic('shield',17)}</i><div><b>Güvenli sohbet</b>Telefon, adres, IBAN veya ödeme bilgisi paylaşma. Teslimat/takip yalnızca sistem alanlarından girilir.</div></div>`;
  wrap.innerHTML=`<div class="daypill"><span>${esc(c.demandTitle)}</span></div>${safety}`+c.msgs.map((m,i)=>{
    if(m.sys)return `<div class="sys">${esc(m.t)}</div>`;
    if(m.counterOffer!==undefined){const mine=m.by===me;const s=m.status||'pending';let foot='';
      if(s==='pending'&&iAmSeller&&!mine)foot=`<div style="display:grid;gap:7px;margin-top:6px"><button class="btn fill sm" onclick="offerFromCounter('${pid}',${i})">✓ Bu fiyata teklif ver</button><button class="btn glass sm" onclick="reviseOffer('${pid}')">Farklı fiyat öner</button></div>`;
      else if(s==='answered')foot=`<div style="font-size:11px;color:#5C7A00;margin-top:5px;font-weight:700">Satıcı pazarlığı kabul etti — anlaşıldı</div>`;
      else foot=`<div style="font-size:11px;color:var(--label3);margin-top:2px">Satıcı yanıtı bekleniyor</div>`;
      return `<div class="line" style="align-items:${mine?'flex-end':'flex-start'}"><div class="offercard ${mine?'mine':''}"><small>${mine?'Gönderdiğin pazarlık':'Alıcı pazarlık fiyatı'}</small><b>${TL(m.counterOffer)}</b><p>${esc(m.note||'Bu fiyata anlaşabilir miyiz?')}</p>${m.baseOffer?`<div style="font-size:10.5px;color:var(--label3);margin:-3px 0 8px">İlk teklif: ${TL(m.baseOffer)}</div>`:''}${foot}</div></div>`;}
    if(m.offer!==undefined){const mine=m.by===me;const s=m.status||'pending';const isLast=(i===lastP);let foot='';
      if(s==='pending'&&iAmBuyer&&!mine&&isLast)foot=`<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><button class="btn fill sm" onclick="acceptOffer('${pid}',${i})">Onayla</button><button class="btn glass sm" onclick="rejectOffer('${pid}',${i})">Reddet</button><button class="btn tint sm" onclick="negotiate('${pid}',${i})">Pazarlık</button></div>`;
      else if(s==='pending'&&!isLast)foot=`<div style="font-size:11px;color:var(--label3);margin-top:2px">Daha güncel bir teklif var</div>`;
      else if(s==='pending')foot=`<div style="font-size:11px;color:var(--label3);margin-top:2px">${iAmSeller?'Alıcı':'Karşı taraf'} yanıtı bekleniyor</div>`;
      else if(s==='superseded')foot=`<div style="font-size:11px;color:var(--label3);margin-top:2px">Güncel teklifle değiştirildi</div>`;
      else if(s==='accepted')foot=`<div class="note" style="padding:8px 0 0;background:transparent"><b>Sipariş onaylandı.</b> Kargo sayacı başladı (3 gün).${iAmSeller?`<div class="obtns" style="margin-top:7px"><button class="btn fill sm" onclick="shipOrder('${pid}',${i})">Kargoya verdim</button><button class="btn glass sm" onclick="missShip('${pid}',${i})">3 günü kaçır</button></div>`:''}</div>`;
      else if(s==='shipped')foot=`<div style="font-size:11px;color:var(--tint);margin-top:5px;font-weight:800">Kargoda · Takip: ${esc(m.trackingNo)}</div><div class="trackMap"><span class="trackPin">🚚</span></div>`;
      else if(s==='rejected')foot=`<div style="font-size:11px;color:var(--red);margin-top:5px;font-weight:700">Teklif reddedildi</div>`;
      else if(s==='expired')foot=`<div style="font-size:11px;color:var(--red);margin-top:5px;font-weight:700">Süre aştı · kredi yandı, puan düştü</div>`;
      return `<div class="line" style="align-items:${mine?'flex-end':'flex-start'}"><div class="offercard ${mine?'mine':''}"><small>${mine?'Gönderdiğin teklif':'Resmi teklif'}${m.first===false?' · revize':''}</small><b>${TL(m.offer)}</b><p>${esc(m.note||'')}</p><div style="font-size:10.5px;color:var(--label3);margin:-3px 0 8px">${m.first===false?'Ücretsiz revize (kredi yok)':'İlk teklif · '+(m.credit||'-')+' kredi'}</div>${foot}</div></div>`;}
    return `<div class="line"><div class="bub ${m.by===me?'me':'them'}">${esc(m.t)}</div></div>`;}).join('');
  wrap.scrollTop=wrap.scrollHeight;}
function acceptOffer(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i])return;c.msgs[i].status='accepted';c.last='Sipariş onaylandı';c.msgs.push({sys:true,t:'Alıcı teklifi onayladı 🎉 — sipariş açıldı, 3 günlük kargo sayacı başladı.'});toast(pid,'Onayladın — kargo sayacı başladı.');syncAll(pid);}
function rejectOffer(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i])return;c.msgs[i].status='rejected';c.last='Teklif reddedildi';c.msgs.push({sys:true,t:'Alıcı teklifi reddetti.'});toast(pid,'Teklifi reddettin.');syncAll(pid);}
function negotiate(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i])return;const base=c.msgs[i].offer||0;
  openSheet(pid,'Pazarlık Et','Satıcıya iletmek istediğin fiyatı yaz. Bu resmi teklif değildir; satıcı kabul ederse güncel teklifini gönderir (ücretsiz).','Pazarlık gönder',()=>{
    const pr=parseInt((el(pid,'cPrice').value||'').replace(/[^0-9]/g,''))||0;if(pr<=0){toast(pid,'Geçerli fiyat gir.');return false;}
    const note=(el(pid,'cNote').value||'').trim();c.msgs.push({counterOffer:pr,by:P(pid).me,status:'pending',baseOffer:base,note:note||'Bu fiyata hemen onaylarım.'});c.last='Pazarlık: '+TL(pr);
    toast(pid,'Pazarlık satıcıya gönderildi.');syncAll(pid);});
  const sug=base?Math.round(base*.92):'';
  el(pid,'sheetBody').innerHTML=`<div class="form glass"><div class="frow"><label>Fiyat (₺)</label><input id="${pid}-cPrice" type="number" inputmode="numeric" value="${sug}"></div><div class="frow col"><label style="display:block;margin-bottom:4px">Not</label><textarea id="${pid}-cNote" placeholder="Örn. Bu fiyata hemen onaylarım."></textarea></div></div>`;}
function shipOrder(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i])return;
  openSheet(pid,'Kargo bilgisi','Alıcının canlı takip edebilmesi için <b>kargo firması + takip no</b> gir.','Kargoyu bildir',()=>{
    const no=(el(pid,'trkNo').value||'').trim();const firm=(el(pid,'trkFirm').value||'').trim()||'Kargo';if(no.length<5){toast(pid,'Geçerli takip no gir.');return false;}
    c.msgs[i].status='shipped';c.msgs[i].trackingNo=no;c.msgs[i].firm=firm;c.last='Kargoda · '+no;c.msgs.push({sys:true,t:`Satıcı ürünü ${esc(firm)} ile kargoladı. Takip: ${esc(no)}`});
    toast(pid,'Kargo bilgisi kaydedildi.');syncAll(pid);});
  el(pid,'sheetBody').innerHTML=`<div class="form glass"><div class="frow"><label>Firma</label><input id="${pid}-trkFirm" placeholder="Yurtiçi / MNG / Aras"></div><div class="frow"><label>Takip no</label><input id="${pid}-trkNo" placeholder="1234567890"></div></div>`;}
function missShip(pid,i){const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c||!c.msgs[i])return;c.msgs[i].status='expired';if(USERS[c.seller])USERS[c.seller].score=Math.max(1,USERS[c.seller].score-.2);c.last='Kargo süresi aştı';c.msgs.push({sys:true,t:'3 gün içinde kargolanmadı: satıcı güven puanı düştü.'});toast(pid,'Süre aştı — puan düştü.');syncAll(pid);}
function sendMsg(pid){const inp=el(pid,'chatInput');const t=inp.value.trim();if(!t)return;const c=CHATS.find(x=>x.id===P(pid).curChat);if(!c)return;c.msgs.push({by:P(pid).me,t});c.last=t;inp.value='';syncAll(pid);}

/* ---- KREDI / CALC / CREATE / PROFIL ---- */
function renderKredi(pid){const p=P(pid);if(!p.me)return;const acc=USERS[p.me];el(pid,'walletCredit').textContent=acc.credits;
  el(pid,'pkgList').innerHTML=PACKAGES.map(pk=>`<div class="pkg"><div class="pi">${pk.icon}</div><div class="pt"><h3>${pk.name}</h3><p>${pk.credits} kredi · ${(pk.price/pk.credits).toLocaleString('tr-TR',{minimumFractionDigits:2,maximumFractionDigits:2})} ₺</p></div><button class="buy" onclick="buyPkg('${pid}',${pk.credits},${pk.price})">${TL(pk.price)}</button></div>`).join('');
  const sl=el(pid,'subList');if(sl)sl.innerHTML=SUBS.map(s=>`<div class="pkg"><div class="pi" style="${s.cur?'background:var(--fill);color:var(--label2)':''}">${s.icon}</div><div class="pt"><h3>${s.name} ${s.cur?'<span class="badge g">Aktif</span>':''}</h3><p>${s.desc}</p></div><button class="buy" style="${s.cur?'background:var(--fill2);color:var(--label2)':''}" onclick="toast('${pid}','${s.name} planı seçildi (demo).')">${s.price}</button></div>`).join('');}
function buyPkg(pid,cr,price){const acc=USERS[P(pid).me];acc.credits+=cr;syncCredits(pid);renderKredi(pid);toast(pid,cr+' kredi eklendi.');}
function renderCreateCats(pid){const p=P(pid);el(pid,'createCats').innerHTML=CATS.map(c=>`<button class="chip ${p.createCat===c.id?'on':''}" onclick="P('${pid}').createCat='${c.id}';renderCreateCats('${pid}');renderCreatePreview('${pid}')">${catIcon(c.id,14)} ${c.name.split(' ')[0]}</button>`).join('');}
function renderPresets(pid){const g=el(pid,'presets');if(!g)return;g.innerHTML=BUDPRESETS.map((b,i)=>`<button class="preset" onclick="applyPreset('${pid}',${i})">${b[0]}</button>`).join('');}
function applyPreset(pid,i){const b=BUDPRESETS[i];if(el(pid,'cPrice'))el(pid,'cPrice').value=b[1];renderCreatePreview(pid);}
function renderCityList(pid,q){var list=el(pid,'citylist');if(!list)return;q=(q||'').toLocaleLowerCase('tr');var cur=el(pid,'cCity')?el(pid,'cCity').value:'';list.innerHTML=CITIES.filter(function(c){return !q||c.toLocaleLowerCase('tr').indexOf(q)>-1;}).map(function(c){return '<button type="button" class="cityopt'+(c===cur?' sel':'')+'" onclick="pickCity(\''+pid+'\',this.textContent)">'+esc(c)+'</button>';}).join('')||'<div class="cityempty">Sonuç yok</div>';}
function toggleCity(pid){var card=el(pid,'citycard'),pop=el(pid,'citypanel');if(!card||!pop)return;var open=card.classList.contains('open');['B','S'].forEach(function(o){var c=el(o,'citycard'),p=el(o,'citypanel');if(c)c.classList.remove('open');if(p)p.hidden=true;});if(!open){card.classList.add('open');pop.hidden=false;var s=el(pid,'citysearch');if(s)s.value='';renderCityList(pid,'');if(s)setTimeout(function(){s.focus();},10);}}
function filterCity(pid){renderCityList(pid,el(pid,'citysearch').value);}
function pickCity(pid,c){var inp=el(pid,'cCity');if(inp)inp.value=c;var lbl=el(pid,'cCityLbl');if(lbl)lbl.textContent=c;var card=el(pid,'citycard'),pop=el(pid,'citypanel');if(card)card.classList.remove('open');if(pop)pop.hidden=true;renderCreatePreview(pid);}
document.addEventListener('pointerdown',function(e){var t=e.target;['B','S'].forEach(function(p){var card=el(p,'citycard'),pop=el(p,'citypanel');if(card&&card.classList.contains('open')&&!(t.closest&&t.closest('#'+p+'-citycard'))){card.classList.remove('open');if(pop)pop.hidden=true;}});},true);
function renderCreatePreview(pid){const p=P(pid);const c=el(pid,'createPreview');if(!c)return;const t=(el(pid,'cTitle')?.value||'').trim();const city=(el(pid,'cCity')?.value||'').trim()||'İstanbul';const desc=(el(pid,'cDesc')?.value||'').trim();const fixed=parseInt((el(pid,'cPrice')?.value||'').replace(/[^0-9]/g,''))||0;const photos=p.refPhotos||[];
  const pm={foto:PIC.polaroid,muzik:PIC.guitar,sneaker:PIC.sneaker,saat:PIC.watch,koleksiyon:PIC.vinyl,teknoloji:PIC.controller,oto:PIC.car};
  const d={id:'pvw',owner:p.me,cat:p.createCat,ph:photos[0]||pm[p.createCat]||PIC.camera,emoji:catEmoji(p.createCat),title:t||'Talep başlığın burada görünecek',desc:desc||'Yeni alıcı talebi.',bMin:fixed,bMax:fixed,price:fixed,city,badge:'Aktif Alıcı',when:'az önce',refImages:photos.length,pres:[],offers:[]};
  const viewer=pid==='B'?'S':'B';
  let html=gridCard(viewer,d).replace(/\sonclick="[^"]*"/,'').replace(/\shref="[^"]*"/,'').replace('<a class="gcard"','<div class="gcard prevgcard"').replace(/<\/a>\s*$/,'</div>');
  if(!fixed)html=html.replace('>'+priceLabel(0)+'</div>','>Fiyat belirt</div>');
  c.innerHTML=html;}
const REFPOOL={foto:['1516035069371-29a1b244cc32','1495707902641-75cac588d2e9','1526170375885-4d8ecf77b99f'],muzik:['1510915361894-db8b60106cb1','1598488035139-bdbb2231ce04'],sneaker:['1542291026-7eec264c27ff','1556906781-9a412961c28c'],saat:['1523275335684-37898b6baf30','1547996160-81dfa63595aa'],koleksiyon:['1539375665275-f9de415ef9ac','1516035069371-29a1b244cc32'],teknoloji:['1473968512647-3e447244af8f','1587829741301-dc798b83add3','1606144042614-b2417e99c4e3'],oto:['1503376780353-7e6692767b70']};
function refPoolFor(cat){return REFPOOL[cat]||REFPOOL.foto;}
function renderRefGrid(pid){const p=P(pid);const g=el(pid,'refGrid');if(!g)return;g.innerHTML=p.refPhotos.map((ph,i)=>`<div class="reftile ${i===0?'first':''}"><img src="${IMG(ph)}" onerror="this.style.opacity=0"><button class="rx" onclick="removeRefPhoto('${pid}',${i})">×</button></div>`).join('')+(p.refPhotos.length<10?`<button class="reftile add" onclick="addRefPhoto('${pid}')"><b>+</b><span>Foto ekle</span></button>`:'');const cc=el(pid,'refCount');if(cc)cc.textContent=p.refPhotos.length+'/10';if(el(pid,'createPreview'))renderCreatePreview(pid);}
function addRefPhoto(pid){const p=P(pid);if(p.refPhotos.length>=10){toast(pid,'En fazla 10 fotoğraf.');return;}const pool=refPoolFor(p.createCat);p.refPhotos.push(pool[p.refPhotos.length%pool.length]);renderRefGrid(pid);}
function removeRefPhoto(pid,i){P(pid).refPhotos.splice(i,1);renderRefGrid(pid);}
function createDemand(pid){const p=P(pid);if(!p.me)return;const t=el(pid,'cTitle').value.trim();if(!t){toast(pid,'Önce ne aradığını yaz.');return;}
  if(p.refPhotos.length<1){toast(pid,'En az 1 referans fotoğraf ekle.');return;}
  const fixedPrice=parseInt((el(pid,'cPrice').value||'').replace(/[^0-9]/g,''))||5000;const bMin=fixedPrice,bMax=fixedPrice;
  const pm={foto:PIC.polaroid,muzik:PIC.guitar,sneaker:PIC.sneaker,saat:PIC.watch,koleksiyon:PIC.vinyl,teknoloji:PIC.controller,oto:PIC.car};const id='dn'+Date.now();
  DEMANDS.unshift({id,owner:p.me,cat:p.createCat,ph:p.refPhotos[0]||pm[p.createCat]||PIC.camera,emoji:catEmoji(p.createCat),title:t,desc:el(pid,'cDesc').value.trim()||'Yeni alıcı talebi.',bMin,bMax,city:el(pid,'cCity').value.trim()||'İstanbul',badge:'Aktif Alıcı',when:'az önce',refImages:p.refPhotos.length,pres:[],offers:[]});
  el(pid,'cTitle').value=el(pid,'cPrice').value=el(pid,'cDesc').value='';el(pid,'cCity').value='İstanbul';var _l=el(pid,'cCityLbl');if(_l)_l.textContent='İstanbul';p.refPhotos=[];renderRefGrid(pid);
  toast(pid,'Talep yayınlandı! Diğer kullanıcılar görüyor.');openDetail(pid,id);syncAll(pid);}
const CALCBQ=[['aktif','Aktif (0,90)',0.90],['guclu','Güçlü (0,85)',0.85],['dogrulanmis','Doğrulanmış (0,95)',0.95],['normal','Normal (1,00)',1.00]];
function calcBuyerK(idc){const f=CALCBQ.find(x=>x[0]===idc);return f?f[2]:0.90;}
function renderCalcOptions(pid){const p=P(pid);el(pid,'calcCats').innerHTML=CATS.map(c=>`<button class="opt ${p.calcCat===c.id?'on':''}" onclick="P('${pid}').calcCat='${c.id}';renderCalcOptions('${pid}');recalc('${pid}')">${c.emoji} ${c.name.split(' ')[0]} ·${(CATK[c.id]||1).toLocaleString('tr-TR',{minimumFractionDigits:2})}</button>`).join('');
  el(pid,'calcBuyers').innerHTML=CALCBQ.map(b=>`<button class="opt ${p.calcBuyer===b[0]?'on':''}" onclick="P('${pid}').calcBuyer='${b[0]}';renderCalcOptions('${pid}');recalc('${pid}')">${b[1]}</button>`).join('');}
function recalc(pid){const p=P(pid);const v=+el(pid,'calcVal').value;const ck=CATK[p.calcCat]||1;const bk=calcBuyerK(p.calcBuyer);
  el(pid,'calcValLbl').textContent=TL(v);el(pid,'calcBandLbl').textContent='bant %'+bandPct(v);
  const tl=v*bandRate(v)*ck*bk;const cr=Math.max(1,Math.min(Math.round(tl/10),maxCap(v,p.calcCat)));
  el(pid,'rBand').textContent='%'+bandPct(v);el(pid,'rCat').textContent=ck.toLocaleString('tr-TR',{minimumFractionDigits:2});el(pid,'rBuyer').textContent=bk.toLocaleString('tr-TR',{minimumFractionDigits:2});el(pid,'rCost').textContent=TL(tl);el(pid,'rCredits').textContent=cr;el(pid,'rCreditTl').textContent='≈ '+TL(cr*10);}
function openCalc(pid){renderCalcOptions(pid);push(pid,'calc');setTimeout(()=>recalc(pid),0);routeAfterNav(pid,'calc');}
function starRow(score){const f=Math.floor(score);const rem=score-f;let s='';for(let i=0;i<f;i++)s+='★';if(rem>=.25){s+='<span style="opacity:.45">★</span>';}while(((s.match(/★/g)||[]).length)<5)s+='<span style="opacity:.2">★</span>';return s;}
function presStatePlain(s){return s==='teklif_verildi'?'Resmi teklif verildi · sohbet açık':s==='teklif_istendi'?'Teklif istendi · fiyat bekleniyor':s==='rejected'?'Alıcı beğenmedi':'Sunuldu · inceleniyor';}
function openMyDemands(pid){const me=P(pid).me;const list=DEMANDS.filter(d=>d.owner===me);
  const html=list.length?list.map(d=>`<button class="listrow" onclick="closeSheet('${pid}');openDetail('${pid}','${d.id}')"><div class="lt">${photoDiv(d.ph,d.emoji)}</div><div class="li"><h4>${esc(d.title)}</h4><p>${budgetStr(d)} · ${d.offers.length} teklif · ${d.pres.length} sunum</p></div><span class="chev">›</span></button>`).join(''):`<div class="note">Henüz talep açmadın. Alttaki “+” ile ilk talebini oluştur.</div>`;
  openListSheet(pid,'Taleplerim',html);}
function openMyPres(pid){const me=P(pid).me;const rows=[];DEMANDS.forEach(d=>d.pres.forEach(pr=>{if(pr.by===me)rows.push([d,pr]);}));
  const html=rows.length?rows.map(([d,pr])=>`<button class="listrow" onclick="closeSheet('${pid}');openDetail('${pid}','${d.id}')"><div class="lt">${photoDiv(pr.ph,pr.emoji)}</div><div class="li"><h4>${esc(d.title)}</h4><p>${presStatePlain(pr.status)}</p></div><span class="chev">›</span></button>`).join(''):`<div class="note">Henüz sunum yapmadın. Başkasının talebine gir, “Ürün Sun”.</div>`;
  openListSheet(pid,'Sunumlarım',html);}
function renderProfil(pid){const p=P(pid);if(!p.me)return;const acc=USERS[p.me];
  const myDemands=DEMANDS.filter(d=>d.owner===p.me).length;
  const myPres=DEMANDS.reduce((n,d)=>n+d.pres.filter(pr=>pr.by===p.me).length,0);
  const myChats=CHATS.filter(c=>c.owner===p.me||c.seller===p.me).length;
  const b=el(pid,'profilBody');if(!b)return;
  b.innerHTML=`
   <div class="pfhead">
     <span class="pfav">${acc.av}</span>
     <div class="pfmain"><div class="pfname">${esc(acc.name)} ${sealSm}</div>
       <div class="pfsub">@${esc(acc.u)} · ${ic('pin',12)} ${esc(acc.city)}</div>
       <div class="pfstars">${starRowSVG(acc.score,13)}<b>${acc.score.toLocaleString('tr-TR',{minimumFractionDigits:1})}</b><span class="pfrev">· ${acc.reviews}</span></div>
     </div>
   </div>
   <div class="levelcard"><div class="lv">${ic('shield',22)}</div><div class="lvt"><h4>Seviye ${Math.min(5,2+Math.floor(acc.sales/12))} · ${acc.score>=4.8?'Güvenilir Satıcı':'Yükselen Satıcı'}</h4><p>%${acc.completion} tamamlama · ${esc(acc.resp)} yanıt · sonraki seviyeye ${12-(acc.sales%12)} satış</p><div class="lvbar"><i style="width:${Math.round((acc.sales%12)/12*100)}%"></i></div></div></div>
   <div class="pf4">
     <div class="pf4i"><b>${acc.sales}</b><span>satış</span></div>
     <div class="pf4i"><b>${myDemands}</b><span>talep</span></div>
     <div class="pf4i"><b>${myPres}</b><span>sunum</span></div>
     <div class="pf4i"><b class="g" id="${pid}-pCredits">${acc.credits}</b><span>kredi</span></div>
   </div>
   <div class="label-sm">Güven sinyalleri</div>
   <div class="sigs" style="gap:7px">${uSigsHTML(p.me)}</div>
   <div class="sechead" style="margin:18px 2px 10px"><h3 style="font-size:14px">Değerlendirmeler</h3><span class="more">${acc.reviews} yorum · ${acc.score.toLocaleString('tr-TR',{minimumFractionDigits:1})} ortalama</span></div>
   <div class="group glass">${reviewsFor(p.me).map(r=>`<div class="revrow"><div class="rh"><span class="rav">${r.av}</span><span class="rn">${esc(r.by)}</span><span class="rw">${r.w}</span></div><div class="rs">${starRowSVG(r.s,11)}</div><p>${esc(r.t)}</p></div>`).join('')}</div>
   <div class="label-sm">Aktivitem</div>
   <div class="group glass">
     <button class="actrow" onclick="openMyDemands('${pid}')"><span class="actic">${ic('inbox',17)}</span><span class="actt">Taleplerim</span><em>${myDemands} ›</em></button>
     <button class="actrow" onclick="openMyPres('${pid}')"><span class="actic">${ic('camera',17)}</span><span class="actt">Sunumlarım</span><em>${myPres} ›</em></button>
     <button class="actrow" onclick="selectTab('${pid}','mesajlar')"><span class="actic">${ic('chat',17)}</span><span class="actt">Sohbetler & siparişler</span><em>${myChats} ›</em></button>
   </div>
   <button class="bizcard" onclick="selectTab('${pid}','kredi')"><div class="bi">${ic('store',19)}</div><div class="bt"><h3>İşletmen mi var? Esnafım planı</h3><p>Vitrin, toplu teklif ve Esnaf rozetiyle öne çık.</p></div><span class="chev">${ic('chevR',16)}</span></button>
   <div class="label-sm">Hesap</div>
   <div class="group glass">
     <button class="actrow" onclick="selectTab('${pid}','kredi')"><span class="actic">${ic('card',17)}</span><span class="actt">Kredi & Abonelik</span><em><span id="${pid}-creditRow">${acc.credits}</span> kredi ›</em></button>
     <button class="actrow danger" onclick="logout('${pid}')"><span class="actic">${ic('logout',17)}</span><span class="actt">Çıkış yap</span><em>›</em></button>
   </div>
   <div class="pfoot">Bulbana · ters pazar · tek hesap, işleme göre rol</div>`;}

/* ---- SHEET / MISC ---- */
function openSheet(pid,title,text,ok,cb){el(pid,'sheetTitle').textContent=title;el(pid,'sheetText').innerHTML=text;el(pid,'sheetBody').innerHTML='';el(pid,'sheetOk').textContent=ok||'Onayla';const bn=el(pid,'sheetBtns');if(bn)bn.style.display='grid';P(pid).pending=cb;el(pid,'sheetBg').classList.add('show');}
function openListSheet(pid,title,html){el(pid,'sheetTitle').textContent=title;el(pid,'sheetText').innerHTML='';el(pid,'sheetBody').innerHTML=html;const bn=el(pid,'sheetBtns');if(bn)bn.style.display='none';P(pid).pending=null;el(pid,'sheetBg').classList.add('show');}
function closeSheet(pid){el(pid,'sheetBg').classList.remove('show');}
function confirmSheet(pid){const cb=P(pid).pending;if(cb){if(cb()===false)return;}closeSheet(pid);}
function syncCredits(pid){const acc=USERS[P(pid).me];if(!acc)return;['pCredits','walletCredit','creditRow'].forEach(k=>{const e=el(pid,k);if(e)e.textContent=acc.credits;});}
function toggleTheme(){const h=document.documentElement;h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';}
function toast(pid,m){const t=el(pid,'toast');t.textContent=m;t.classList.add('show');clearTimeout(t.__t);t.__t=setTimeout(()=>t.classList.remove('show'),2300);}
function clock(){const d=new Date();let h=d.getHours(),m=d.getMinutes();['B','S'].forEach(p=>{const e=el(p,'clock');if(e)e.textContent=h+':'+(m<10?'0':'')+m;});}

/* ---- LIVE SYNC ---- */
function refreshPhone(pid){const p=P(pid);if(!p.me)return;const top=p.stack[p.stack.length-1];
  if(top==='home')renderFeed(pid);else if(top==='kesfet')renderKesfet(pid);else if(top==='mesajlar')renderChatList(pid);else if(top==='detail')renderDetail(pid);else if(top==='presdetail')renderPresGallery(pid);else if(top==='chat'){if(CHATS.find(x=>x.id===p.curChat))renderChat(pid);}else if(top==='kredi')renderKredi(pid);else if(top==='profil')renderProfil(pid);}
function flash(pid){const f=el(pid,'frame');if(!f||!P(pid).me)return;f.classList.add('ring');clearTimeout(f.__r);f.__r=setTimeout(()=>f.classList.remove('ring'),1200);}
function syncAll(origin){['B','S'].forEach(refreshPhone);const other=origin==='B'?'S':'B';if(origin&&P(other).me)flash(other);}

/* ---- BOOT ---- */
const APP_MODE=document.body.dataset.appMode||'dual';
const ACTIVE_PANES=APP_MODE==='buyer'?['B']:(APP_MODE==='seller'?['S']:['B','S']);
const BOOT_USERS={B:document.body.dataset.buyerUser||'ahmetsafak',S:document.body.dataset.sellerUser||'furkan'};
document.getElementById('board').innerHTML=ACTIVE_PANES.map(pid=>phoneHTML(PH[pid])).join('');
ACTIVE_PANES.forEach(pid=>{renderChips(pid);renderCreateCats(pid);});
/* web demo: aktif panelleri otomatik aç */
if(ACTIVE_PANES.includes('B'))loginAs('B',BOOT_USERS.B);
if(ACTIVE_PANES.includes('S'))loginAs('S',BOOT_USERS.S);
/* panel kimliği + dar ekran Alıcı/Satıcı geçişi */
(function(){
  var b=document.getElementById('board');
  ACTIVE_PANES.forEach(function(pid,i){if(b.children[i])b.children[i].setAttribute('data-pane',pid);});
  if(ACTIVE_PANES.length>1){
    var sw=document.createElement('div');sw.className='paneswitch';
    sw.innerHTML='<button data-p="B" class="on">Ahmet · Alıcı</button><button data-p="S">Furkan · Satıcı</button>';
    document.body.appendChild(sw);
    sw.addEventListener('click',function(e){var btn=e.target.closest('button');if(!btn)return;document.body.classList.toggle('show-s',btn.dataset.p==='S');[].slice.call(sw.children).forEach(function(x){x.classList.toggle('on',x===btn);});setTimeout(fitPanes,0);routeAfterNav(btn.dataset.p,'home');});
  }
  ACTIVE_PANES.forEach(function(pid){var dev=document.querySelector('#'+pid+'-frame .device');if(!dev||!PH[pid].me)return;var acc=USERS[PH[pid].me];var bar=document.createElement('div');bar.className='webtop';bar.innerHTML='<div class="brand"><span class="bmark"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg></span>Bulbana</div><div class="webuser"><span class="ucredit"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px"><rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19"/></svg> '+acc.credits+' kredi</span><span class="uava">'+acc.av+'</span><span class="uname">'+esc(acc.name)+'</span></div>';dev.insertBefore(bar,dev.firstChild);});
  function fitPanes(){var wide=window.innerWidth>880&&ACTIVE_PANES.length>1;[].slice.call(document.querySelectorAll('.board>.col')).forEach(function(col){var f=col.querySelector('.frame');if(!f)return;f.style.transform=wide?'scale('+(col.clientWidth/1280)+')':'none';});}
  window.fitPanes=fitPanes;window.addEventListener('resize',fitPanes);
  fitPanes();requestAnimationFrame(fitPanes);setTimeout(fitPanes,250);
})();
ROUTER_READY=true;
installAppLinkRouter();
window.addEventListener('popstate',function(){applyBrowserRoute();});
applyBrowserRoute({replaceClean:true});
clock();setInterval(clock,15000);

/* ---- FARE İLE SÜRÜKLE-KAYDIR (dokunmatik hissi) ---- */
(function(){
  function scn(el,ax){while(el&&el.nodeType===1&&el!==document.body){var cs=getComputedStyle(el);if(ax==='y'&&el.scrollHeight-el.clientHeight>2&&/(auto|scroll)/.test(cs.overflowY))return el;if(ax==='x'&&el.scrollWidth-el.clientWidth>2&&/(auto|scroll)/.test(cs.overflowX))return el;el=el.parentElement;}return null;}
  var d=null;
  document.addEventListener('dragstart',function(e){e.preventDefault();},true);
  document.addEventListener('pointerdown',function(e){
    if(e.pointerType==='touch'||e.button!==0)return;
    if(/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)||(e.target.closest&&e.target.closest('input[type=range]')))return;
    if(e.target.closest&&e.target.closest('a,button,[role="button"]'))return;
    var vy=scn(e.target,'y')||(document.scrollingElement&&document.scrollingElement.scrollHeight-window.innerHeight>2?document.scrollingElement:null);
    var hx=scn(e.target,'x');
    if(!vy&&!hx)return;
    d={x:e.clientX,y:e.clientY,vy:vy,hx:hx,sty:vy?vy.scrollTop:0,slx:hx?hx.scrollLeft:0,axis:null,moved:false,lx:e.clientX,ly:e.clientY,vX:0,vY:0,t:Date.now()};
  });
  document.addEventListener('pointermove',function(e){
    if(!d)return;
    var dx=e.clientX-d.x,dy=e.clientY-d.y;
    if(!d.axis){if(Math.abs(dx)<6&&Math.abs(dy)<6)return;d.axis=(Math.abs(dx)>Math.abs(dy)&&d.hx)?'x':'y';d.moved=true;document.body.classList.add('dragging');}
    var now=Date.now(),dt=(now-d.t)||16;
    if(d.axis==='x'&&d.hx){d.hx.scrollLeft=d.slx-dx;d.vX=(e.clientX-d.lx)/dt;}
    else if(d.vy){d.vy.scrollTop=d.sty-dy;d.vY=(e.clientY-d.ly)/dt;}
    d.lx=e.clientX;d.ly=e.clientY;d.t=now;e.preventDefault();
  },{passive:false});
  function mom(el,ax,v){v*=15;if(Math.abs(v)<0.6)return;function step(){v*=0.94;if(ax==='x')el.scrollLeft-=v;else el.scrollTop-=v;if(Math.abs(v)>0.4)requestAnimationFrame(step);}requestAnimationFrame(step);}
  function end(){if(!d)return;if(d.moved){var blk=function(ev){ev.stopPropagation();ev.preventDefault();document.removeEventListener('click',blk,true);};document.addEventListener('click',blk,true);setTimeout(function(){document.removeEventListener('click',blk,true);},70);if(d.axis==='x'&&d.hx)mom(d.hx,'x',d.vX);else if(d.vy)mom(d.vy,'y',d.vY);}document.body.classList.remove('dragging');d=null;}
  document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
})();
