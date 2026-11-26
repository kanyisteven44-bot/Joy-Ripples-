(()=>{
const q=s=>document.querySelector(s),form=q('#partner-form');
document.querySelectorAll('[data-partner-topic]').forEach(link=>link.addEventListener('click',()=>{q('#partner-interest').value=link.dataset.partnerTopic;q('#partner-result').hidden=true}));
form.addEventListener('submit',e=>{
 e.preventDefault();
 for(const id of ['partner-name','partner-country','partner-message']){const el=q('#'+id);el.setCustomValidity(el.value.trim()?'':'Please complete this field.');if(!el.reportValidity())return}
 if(!form.reportValidity())return;
 const recipient=q('#partner-recipient').value==='joyce'?{name:'Joyce',phone:'254722165863'}:{name:'Isaac',phone:'254722693407'};
 const message=`Hello ${recipient.name}, I would like to introduce my interest in Joy Ripples Resort.\n\nName: ${q('#partner-name').value.trim()}\nOrganisation: ${q('#partner-org').value.trim()||'Not specified'}\nCountry / region: ${q('#partner-country').value.trim()}\nInterest: ${q('#partner-interest').value}\n\n${q('#partner-message').value.trim()}\n\nPreferred meeting time / time zone: ${q('#partner-time').value.trim()||'To be discussed'}\n\nPlease let me know how we can arrange an introductory conversation. Thank you.`;
 const link=q('#partner-fallback');link.href='https://wa.me/'+recipient.phone+'?text='+encodeURIComponent(message);q('#partner-result').hidden=false;window.open(link.href,'_blank','noopener,noreferrer');
});
form.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');q('#partner-result').hidden=true});form.addEventListener('change',()=>q('#partner-result').hidden=true);
})();
