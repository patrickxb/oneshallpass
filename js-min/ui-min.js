function key_data(a){var b=[a.email,a.passphrase,a.host,a.generation,a.secbits],c=b.join(";");a.key=c}function toggle_computing(){document.getElementById("result-need-input").style.visibility="hidden",document.getElementById("result-computing").style.visibility="visible",document.getElementById("result-computed").style.visibility="hidden",document.getElementById("select").style.visibility="hidden"}function toggle_computed(){document.getElementById("result-need-input").style.visibility="hidden",document.getElementById("result-computed").style.visibility="visible",document.getElementById("select").style.visibility="visible",document.getElementById("result-computing").style.visibility="hidden"}function fnDeSelect(){document.selection?document.selection.empty():window.getSelection&&window.getSelection().removeAllRanges()}function fnSelect(a){fnDeSelect();var b;document.selection?(b=document.body.createTextRange(),b.moveToElementText(a),b.select()):window.getSelection&&(b=document.createRange(),b.selectNode(a),window.getSelection().addRange(b))}function get_url_params(){var a={},b,c=/\+/g,d=/([^&=]+)=?([^&]*)/g,e=function(a){return decodeURIComponent(a.replace(c," "))},f=window.location.search.substring(1);while(b=d.exec(f))a[e(b[1])]=e(b[2]);return a}function select_pw(a){var b=document.getElementById("generated_pw").firstChild;fnSelect(b)}function format_pw(a){var b=a.slice(0,display_prefs.length);return b=add_syms(b,display_prefs.nsym),b}function finish_compute(a){a.computing=!1,context.key=null,toggle_computed();var b=document.getElementById("generated_pw").firstChild;b.nodeValue=format_pw(a.generated_pw)}function display_computing(a){var b=document.getElementById("computing").firstChild;b.nodeValue="computing.... "+a}function do_compute_loop(a,b){var c=b,d=10;a==context.key&&(pwgen(b,d,context)?finish_compute(b):(display_computing(b.iter),setTimeout(function(){do_compute_loop(a,c)},0)))}function do_compute(a){toggle_computing();var b=a.key,c=cache[b];c||(cache[b]=a,c=a),c.generated_pw?finish_compute(c):c.computing||(context.key=b,c.computing=!0,c.iter=0,display_computing(""),setTimeout(function(){do_compute_loop(b,c)},500))}function swizzle(a){var b=a.srcElement;b.value.length>0&&(inputs[b.id]=1);if(inputs.passphrase&&inputs.host&&inputs.email){var c={},d=["passphrase","host","email","generation","secbits"],e,f,g;for(e=0;e<d.length;e++)f=d[e],g=document.getElementById(f).value,c[f]=g;display_prefs.length=document.getElementById("length").value,display_prefs.nsym=document.getElementById("nsym").value,key_data(c),do_compute(c)}return 0}function ungray(a){a.className+=" input-black"}function acceptFocus(a){var b=a.srcElement;b.className.match("input-black")||(ungray(a.srcElement),a.srcElement.value="")}function prepopulate(){var a=get_url_params();if(typeof a.email!="undefined"&&a.email.length>0){var b=document.getElementById("email");ungray(b),b.value=a.email,inputs.email=1}}var inputs={},cache={},context={running:0,key:null},display_prefs={};