import{_ as N}from"./BaseButton-BAV78QR1.js";import{d as U,j as k,be as B,a7 as a,aI as E,o as M,c as A,a as n,q as u,f as s,ad as i,t as S,m as j,ag as w,n as z,bg as _,a$ as D,_ as R}from"./index-BoUtu4Q9.js";import{E as q}from"./el-input-B7uNoYW_.js";import"./BaseIcon.vue_vue_type_script_setup_true_lang-CPmMP-up.js";import"./use-form-item-C5jVcATw.js";const F={class:"layout"},W={class:"content"},X={class:"flex items-center justify-center space-x-2"},$={class:"mb-3 mt-8 text-center text-4xl font-bold text-primary"},G={class:"text-center"},P=60,H=U({__name:"PinCodeView",setup(J){const C=k(),{user:y}=B(),p=a(P),r=a(""),d=a(""),m=a(""),c=a(""),x=a(""),f=a(""),v=a(!1);E(()=>{h()});const h=()=>{p.value=P;const l=setInterval(()=>{p.value>0?p.value--:clearInterval(l)},1e3)},I=(l,e,o,g,t,b)=>{if(/[^0-9]/.test(l+e+o+g+t+b))return"Invalid input: All numbers must be single digits.";const V=parseInt(l+e+o+g+t+b);if(V<1e5||V>999999){D.error("Invalid OTP");return}return V},O=async()=>{try{v.value=!0;const l=I(r.value,d.value,m.value,c.value,x.value,f.value);await _.pinCode({code:l,email:y.email}),C.push({name:"SetNewPassword"}),v.value=!1}catch(l){v.value=!1,console.log(l)}},T=async()=>{try{await _.forgotPass({email:y.email}),h()}catch(l){console.log(l)}};return(l,e)=>{const o=q,g=N;return M(),A("div",F,[n("div",W,[n("div",null,[e[8]||(e[8]=n("p",{class:"text-label mb-3"},"Nhập OTP",-1)),e[9]||(e[9]=n("p",{class:"mb-8 text-center"}," Mã xác thực OTP vừa được gửi đến email của bạn. Vui lòng nhập mã OTP để đặt lại mật khẩu! ",-1)),n("div",X,[u(o,{modelValue:s(r),"onUpdate:modelValue":e[0]||(e[0]=t=>i(r)?r.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(d),"onUpdate:modelValue":e[1]||(e[1]=t=>i(d)?d.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(m),"onUpdate:modelValue":e[2]||(e[2]=t=>i(m)?m.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(c),"onUpdate:modelValue":e[3]||(e[3]=t=>i(c)?c.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(x),"onUpdate:modelValue":e[4]||(e[4]=t=>i(x)?x.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(f),"onUpdate:modelValue":e[5]||(e[5]=t=>i(f)?f.value=t:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"])]),n("p",$,S(s(p))+"s",1),u(g,{loading:s(v),size:"large",class:"mx-auto mb-8 w-52",onClick:O},{default:j(()=>e[6]||(e[6]=[w("Xác nhận")])),_:1},8,["loading"]),n("p",G,[e[7]||(e[7]=w(" Ban không nhận được OTP, ")),n("span",{class:z(["cursor-pointer text-primary",{disable:s(p)}]),onClick:T}," gửi lại OTP?",2)])])])])}}}),ee=R(H,[["__scopeId","data-v-d5ad68a5"]]);export{ee as default};