const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.join(__dirname,'..','dist'),money=n=>'KES '+n.toLocaleString('en-KE');
for(const person of ['isaac','joyce']){
 const s=fs.readFileSync(path.join(root,'shop.js'),'utf8');
 const products=vm.runInNewContext(s.slice(s.indexOf('const products='),s.indexOf('const q='))+'products');
 const part=s.slice(s.indexOf("q('#cart-enquiry').addEventListener"),s.indexOf("q('#cart-name').addEventListener"));
 const els={};for(const id of ['cart-enquiry','cart-name','cart-recipient','cart-date','cart-notes','cart-wa-fallback','cart-lines'])els['#'+id]={value:'',hidden:true};
 Object.assign(els['#cart-name'],{value:'Test Guest'});els['#cart-recipient'].value=person;els['#cart-date'].value='2026-12-20';els['#cart-notes'].value='Lunch & dietary requests';let valid=true;els['#cart-lines'].querySelectorAll=()=>[{reportValidity:()=>valid}];let callback,url;
 els['#cart-enquiry'].addEventListener=(t,h)=>callback=h;
 const cart=[{id:'chicken',variant:1,quantity:2},{id:'buffet',variant:0,quantity:20}];
 vm.runInNewContext(part,{q:k=>els[k],products,cart,total:()=>23200,money,window:{open:u=>url=u},encodeURIComponent});callback({preventDefault(){}});
 assert.equal(new URL(url).pathname,person==='isaac'?'/254722693407':'/254722165863');const msg=new URL(url).searchParams.get('text');assert(msg.includes('KES 23,200'));assert(msg.includes('20 guests'));assert(msg.includes('not a confirmed order'));
 valid=false;url=undefined;callback({preventDefault(){}});assert.equal(url,undefined,'Invalid visible cart quantity must block handoff');
}
for(const person of ['isaac','joyce']){
 const s=fs.readFileSync(path.join(root,'catering.js'),'utf8');const part=s.slice(s.indexOf("form.addEventListener('submit'"),s.indexOf(";['event-name'"));let callback,url;
 const values={'event-name':'Test Guest','event-location':'Sample venue','event-package':'1550','event-guests':'40','event-recipient':person,'event-date':'2026-12-20','event-time':'13:30','event-type':'Corporate or team event','event-style':'Buffet service','event-needs':'Vegetarian requests'};const els={};for(const [id,value]of Object.entries(values))els['#'+id]={value,selectedOptions:[{textContent:'Extended buffet'}]};els['#event-wa']={};
 vm.runInNewContext(part,{q:k=>els[k],money,form:{addEventListener:(t,h)=>callback=h,reportValidity:()=>true},window:{open:u=>url=u},encodeURIComponent});callback({preventDefault(){}});
 assert.equal(new URL(url).pathname,person==='isaac'?'/254722693407':'/254722165863');const msg=new URL(url).searchParams.get('text');for(const expected of ['KES 62,000','Sample venue','13:30','not confirmed resort rates'])assert(msg.includes(expected));
}
for(const person of ['isaac','joyce']){
 const s=fs.readFileSync(path.join(root,'app.js'),'utf8');const part=s.slice(s.indexOf("$('#enquiry').addEventListener('submit'"),s.indexOf("$('#name').addEventListener"));let callback,url;const els={};for(const id of ['enquiry','name','recipient','date','guests','service','details','result','copy'])els['#'+id]={value:'',replaceChildren(){},append(){}};for(const [id,value]of Object.entries({name:'Test Guest',recipient:person,date:'2026-12-20',guests:'20',service:'Food & drinks',details:'Dietary requests & lunch'}))els['#'+id].value=value;els['#enquiry'].addEventListener=(t,h)=>callback=h;
 vm.runInNewContext('let draft="";'+part,{$:k=>els[k],document:{createElement:()=>({})},window:{open:u=>url=u},encodeURIComponent});callback({preventDefault(){}});assert.equal(new URL(url).pathname,person==='isaac'?'/254722693407':'/254722165863');assert(new URL(url).searchParams.get('text').includes('Dietary requests & lunch'));
}
console.log('PASS: contact, cart and catering enquiries for both recipients; cart validation, totals and encoded event details. No messages sent.');
