const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(path.join(__dirname,'../dist/partnership.js'),'utf8');
for(const recipient of ['isaac','joyce']){
 const handlers={},els={};
 for(const id of ['partner-form','partner-name','partner-org','partner-country','partner-interest','partner-message','partner-time','partner-recipient','partner-result','partner-fallback'])els['#'+id]={value:'',hidden:true,valid:true,setCustomValidity(msg){this.valid=!msg},reportValidity(){return this.valid},addEventListener(type,fn){handlers[type]=fn}};
 const values={'partner-name':'Alex & Co.','partner-org':'Example Group','partner-country':'United Kingdom','partner-interest':'Investment introduction','partner-message':'Please arrange an introduction — no commitment.','partner-time':'Tuesday 2 PM, London time','partner-recipient':recipient};for(const [id,value]of Object.entries(values))els['#'+id].value=value;
 let opened=[];vm.runInNewContext(source,{document:{querySelector:s=>els[s],querySelectorAll:()=>[]},window:{open:(...args)=>opened.push(args)},encodeURIComponent});
 handlers.submit({preventDefault(){}});assert.equal(opened.length,1);const url=new URL(opened[0][0]);assert.equal(url.hostname,'wa.me');assert.equal(url.pathname,recipient==='isaac'?'/254722693407':'/254722165863');const body=url.searchParams.get('text');for(const value of ['Alex & Co.','Example Group','United Kingdom','Investment introduction','Tuesday 2 PM, London time','— no commitment.'])assert(body.includes(value));assert.equal(opened[0][2],'noopener,noreferrer');assert.equal(els['#partner-result'].hidden,false);
 handlers.input({target:els['#partner-name']});assert.equal(els['#partner-result'].hidden,true,'Editing must invalidate the prepared link');
 els['#partner-name'].value='  ';handlers.submit({preventDefault(){}});assert.equal(opened.length,1,'Blank name must prevent handoff');
 els['#partner-name'].value='Alex';els['#partner-country'].value=' ';handlers.submit({preventDefault(){}});assert.equal(opened.length,1,'Blank country must prevent handoff');
}
console.log('PASS: partnership introduction for both contacts, encoded international details, blank-field rejection and stale-result invalidation. No messages sent.');
