import{_ as N}from"./BaseButton-D9GBFNm9.js";import{d as E,j as U,l as k,z as n,y as B,o as M,c as z,a,s as u,f as s,E as p,t as A,p as S,I as w,n as j,ag as _,G as D,_ as R}from"./index-uuzcsTZV.js";/* empty css                 */import{E as F}from"./index-VThX3c2Y.js";import"./BaseIcon.vue_vue_type_script_setup_true_lang-TJqJVVhA.js";import"./index-Uz7jpQbw.js";import"./use-form-item-ByN4tT3K.js";const G={class:"layout"},W={class:"content"},X={class:"flex items-center justify-center space-x-2"},q={class:"mb-3 mt-8 text-center text-4xl font-bold text-primary"},H={class:"text-center"},P=60,J=E({__name:"PinCodeView",setup(K){const C=U(),{user:i}=k(),r=n(P),m=n(""),d=n(""),c=n(""),f=n(""),x=n(""),v=n(""),V=n(!1);B(()=>{h()});const h=()=>{r.value=P;const l=setInterval(()=>{r.value>0?r.value--:clearInterval(l)},1e3)},I=(l,t,o,g,e,b)=>{if(/[^0-9]/.test(l+t+o+g+e+b))return"Invalid input: All numbers must be single digits.";const y=parseInt(l+t+o+g+e+b);if(y<1e5||y>999999){D.error("Invalid OTP");return}return y},O=async()=>{try{V.value=!0;const l=I(m.value,d.value,c.value,f.value,x.value,v.value);await _.pinCode({code:l,email:i.patient?i.patient.info.email:i.doctor.info.email}),C.push({name:"SetNewPassword"}),V.value=!1}catch(l){V.value=!1,console.log(l)}},T=async()=>{try{await _.forgotPass({email:i.patient?i.patient.info.email:i.doctor.info.email}),h()}catch(l){console.log(l)}};return(l,t)=>{const o=F,g=N;return M(),z("div",G,[a("div",W,[a("div",null,[t[8]||(t[8]=a("p",{class:"text-label mb-3"},"Nhập OTP",-1)),t[9]||(t[9]=a("p",{class:"mb-8 text-center"}," Mã xác thực OTP vừa được gửi đến email của bạn. Vui lòng nhập mã OTP để đặt lại mật khẩu! ",-1)),a("div",X,[u(o,{modelValue:s(m),"onUpdate:modelValue":t[0]||(t[0]=e=>p(m)?m.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(d),"onUpdate:modelValue":t[1]||(t[1]=e=>p(d)?d.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(c),"onUpdate:modelValue":t[2]||(t[2]=e=>p(c)?c.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(f),"onUpdate:modelValue":t[3]||(t[3]=e=>p(f)?f.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(x),"onUpdate:modelValue":t[4]||(t[4]=e=>p(x)?x.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"]),u(o,{modelValue:s(v),"onUpdate:modelValue":t[5]||(t[5]=e=>p(v)?v.value=e:null),class:"input-otp",autocomplete:"off",style:{width:"56px",height:"56px"},type:"text"},null,8,["modelValue"])]),a("p",q,A(s(r))+"s",1),u(g,{loading:s(V),size:"large",class:"mx-auto mb-8 w-52",onClick:O},{default:S(()=>t[6]||(t[6]=[w("Xác nhận")])),_:1},8,["loading"]),a("p",H,[t[7]||(t[7]=w(" Ban không nhận được OTP, ")),a("span",{class:j(["cursor-pointer text-primary",{disable:s(r)}]),onClick:T}," gửi lại OTP?",2)])])])])}}}),lt=R(J,[["__scopeId","data-v-692dfb46"]]);export{lt as default};