import{_ as u}from"./BaseButton-xfWhEwqO.js";import{d as w,j as f,y as _,ag as h,e as g,o as P,c as V,a as l,s as r,f as o,p as x,ai as v,H as y,J as b,_ as N}from"./index-DbpeAOcW.js";/* empty css                 */import{E as k}from"./index-D6IaY4m4.js";import"./BaseIcon.vue_vue_type_script_setup_true_lang-DxIm_va2.js";import"./index-FNLrM_iS.js";import"./use-form-item-BToUzSQv.js";const B={class:"layout"},E={class:"content"},I={class:"mt-[60px] space-y-8"},S=w({__name:"SetNewPasswordView",setup(C){const i=f(),a=_(!1),e=h({password:"",confirmPassword:""}),p=g(()=>!(e.password&&e.confirmPassword)),m=async()=>{try{a.value=!0;const t=sessionStorage.getItem("email"),s=await v.newPass({email:t,newPassword:e.password,confirmPassword:e.confirmPassword});sessionStorage.clear(),y.success(s.message),i.push({name:"Home"}),a.value=!1}catch(t){a.value=!1,console.log(t)}};return(t,s)=>{const d=k,c=u;return P(),V("div",B,[l("div",E,[l("div",null,[s[3]||(s[3]=l("p",{class:"text-label mb-3"},"Đặt lại mật khẩu",-1)),l("div",I,[r(d,{modelValue:o(e).password,"onUpdate:modelValue":s[0]||(s[0]=n=>o(e).password=n),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật khẩu mới","show-password":""},null,8,["modelValue"]),r(d,{modelValue:o(e).confirmPassword,"onUpdate:modelValue":s[1]||(s[1]=n=>o(e).confirmPassword=n),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật lại khẩu mới","show-password":""},null,8,["modelValue"]),r(c,{loading:o(a),disabled:o(p),size:"large",class:"mx-auto mb-8 w-52",onClick:m},{default:x(()=>s[2]||(s[2]=[b("Xác nhận")])),_:1},8,["loading","disabled"])])])])])}}}),R=N(S,[["__scopeId","data-v-dbff5b14"]]);export{R as default};