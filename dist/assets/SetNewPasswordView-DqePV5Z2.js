import{_ as w}from"./BaseButton-DITACc66.js";import{d as f,j as _,aX as h,x,aY as P,e as V,o as g,c as v,a as l,q as r,f as o,m as y,aZ as N,E as b,A as k,_ as E}from"./index-B7eiBTV4.js";import{E as B}from"./el-input-BFNIFuDq.js";import"./BaseIcon.vue_vue_type_script_setup_true_lang-BM6B5sPu.js";import"./use-form-item-B4Ai76jW.js";const A={class:"layout"},C={class:"content"},I={class:"mt-[60px] space-y-8"},S=f({__name:"SetNewPasswordView",setup(U){const i=_(),{user:p}=h(),a=x(!1),s=P({password:"",confirmPassword:""}),m=V(()=>!(s.password&&s.confirmPassword)),c=async()=>{try{a.value=!0;const t=await N.newPass({email:p.email,newPassword:s.password,confirmPassword:s.confirmPassword});b.success(t.message),i.push({name:"Home"}),a.value=!1}catch(t){a.value=!1,console.log(t)}};return(t,e)=>{const d=B,u=w;return g(),v("div",A,[l("div",C,[l("div",null,[e[3]||(e[3]=l("p",{class:"text-label mb-3"},"Đặt lại mật khẩu",-1)),l("div",I,[r(d,{modelValue:o(s).password,"onUpdate:modelValue":e[0]||(e[0]=n=>o(s).password=n),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật khẩu mới","show-password":""},null,8,["modelValue"]),r(d,{modelValue:o(s).confirmPassword,"onUpdate:modelValue":e[1]||(e[1]=n=>o(s).confirmPassword=n),class:"input",autocomplete:"off",style:{width:"100%",height:"56px"},type:"password",placeholder:"Nhập mật lại khẩu mới","show-password":""},null,8,["modelValue"]),r(u,{loading:o(a),disabled:o(m),size:"large",class:"mx-auto mb-8 w-52",onClick:c},{default:y(()=>e[2]||(e[2]=[k("Xác nhận")])),_:1},8,["loading","disabled"])])])])])}}}),M=E(S,[["__scopeId","data-v-7f7f1228"]]);export{M as default};