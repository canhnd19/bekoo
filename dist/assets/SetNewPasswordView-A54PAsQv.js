import{_ as w}from"./BaseButton-D9GBFNm9.js";import{d as f,j as _,l as h,z as g,af as P,e as V,o as x,c as v,a as n,s as d,f as e,p as y,ag as N,G as b,I as k,_ as B}from"./index-uuzcsTZV.js";/* empty css                 */import{E}from"./index-VThX3c2Y.js";import"./BaseIcon.vue_vue_type_script_setup_true_lang-TJqJVVhA.js";import"./index-Uz7jpQbw.js";import"./use-form-item-ByN4tT3K.js";const I={class:"layout"},C={class:"content"},S={class:"mt-[60px] space-y-8"},z=f({__name:"SetNewPasswordView",setup(A){const p=_(),{user:l}=h(),a=g(!1),s=P({password:"",confirmPassword:""}),m=V(()=>!(s.password&&s.confirmPassword)),c=async()=>{try{a.value=!0;const t=await N.newPass({email:l.patient?l.patient.info.email:l.doctor.info.email,newPassword:s.password,confirmPassword:s.confirmPassword});b.success(t.message),p.push({name:"Home"}),a.value=!1}catch(t){a.value=!1,console.log(t)}};return(t,o)=>{const i=E,u=w;return x(),v("div",I,[n("div",C,[n("div",null,[o[3]||(o[3]=n("p",{class:"text-label mb-3"},"Đặt lại mật khẩu",-1)),n("div",S,[d(i,{modelValue:e(s).password,"onUpdate:modelValue":o[0]||(o[0]=r=>e(s).password=r),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật khẩu mới","show-password":""},null,8,["modelValue"]),d(i,{modelValue:e(s).confirmPassword,"onUpdate:modelValue":o[1]||(o[1]=r=>e(s).confirmPassword=r),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật lại khẩu mới","show-password":""},null,8,["modelValue"]),d(u,{loading:e(a),disabled:e(m),size:"large",class:"mx-auto mb-8 w-52",onClick:c},{default:y(()=>o[2]||(o[2]=[k("Xác nhận")])),_:1},8,["loading","disabled"])])])])])}}}),X=B(z,[["__scopeId","data-v-1f997ef5"]]);export{X as default};