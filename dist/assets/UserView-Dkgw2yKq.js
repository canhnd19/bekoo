import{_ as w,p as B,E as N}from"./el-table-column-6WSWt8ow.js";import{_ as A}from"./BaseIcon.vue_vue_type_script_setup_true_lang-VlVcOp2a.js";import{d as D,B as S,y as u,x as V,C as _,o as R,c as T,a as s,s as o,f as l,D as L,p as r,F as M,E as P,t as c,_ as k}from"./index-BnMVRsxL.js";import"./el-select-CL4zeqrw.js";import{_ as z}from"./BaseInput-qgGQ2ks9.js";import{D as O}from"./index-CIlCm72v.js";import{_ as q}from"./PopupConfirmDelete.vue_vue_type_script_setup_true_lang-CL1j38Bq.js";import"./BasePagination-CWu-npWt.js";import"./el-scrollbar-BZv1-oNc.js";import"./el-popper-Cyno07na.js";import"./use-form-item-B5vMFdIe.js";import"./index-DgYtd1Rx.js";import"./index-MX7bgonx.js";import"./index-DKZNULkZ.js";import"./index-1tdxL5vW.js";import"./BaseLoading-8wKejsYQ.js";import"./castArray-CPOMpCgi.js";/* empty css                 */import"./BasePopup-B3BjFSXq.js";import"./refs-Bu8gOaRa.js";import"./BaseButton-ZDblJ4ex.js";const F={class:"rounded-lg p-4"},$={class:"flex items-start justify-between"},j={class:"flex items-center justify-end space-x-3"},G=D({__name:"UserView",setup(H){const{setOpenPopup:f}=S(),e=u({...O}),m=u(""),v=u([]),g=u({}),d=u(!1);V(()=>{p()});const p=async(t="")=>{try{e.value.loading=!0;const n=t==="search"?await _.getAllUserByName(m.value,e.value):await _.getAllUser(e.value);v.value=n.value.contentResponse,e.value.totalElements=n.value.totalElements,e.value.loading=!1}catch(n){e.value.loading=!1,console.log(n)}},h=t=>{g.value=t,f("popup-confirm-delete")},x=async()=>{try{d.value=!0;const t=await _.deteteUser([g.value.id]);P.success(t.message),f("popup-confirm-delete",!1),d.value=!1,p()}catch(t){d.value=!1,console.log(t)}},E=t=>{e.value.pageSize=t,e.value.pageIndex=1,p()},I=t=>{e.value.pageIndex=t,p()},U=()=>{e.value={...e.value,pageIndex:1,pageSize:10,totalElements:0},p("search")};return(t,n)=>{const b=z,i=N,y=A,C=w;return R(),T(M,null,[s("div",F,[s("div",$,[o(b,{modelValue:l(m),"onUpdate:modelValue":n[0]||(n[0]=a=>L(m)?m.value=a:null),class:"input-search","show-icon":!0,onChange:U},null,8,["modelValue"])]),o(C,{page:l(e).pageIndex,"onUpdate:page":n[1]||(n[1]=a=>l(e).pageIndex=a),limit:l(e).pageSize,"onUpdate:limit":n[2]||(n[2]=a=>l(e).pageSize=a),data:l(v),query:l(e),class:"mt-6",label:"user",onPageChange:I,onLimitChange:E},{default:r(()=>[o(i,{type:"index",index:a=>("printIndex"in t?t.printIndex:l(B))(a,l(e)),label:"#",align:"center"},null,8,["index"]),o(i,{label:"NAME"},{default:r(({row:a})=>[s("p",null,c(a.name),1)]),_:1}),o(i,{label:"EMAIL"},{default:r(({row:a})=>[s("p",null,c(a.email),1)]),_:1}),o(i,{label:"PHONE NUMBER",width:"200"},{default:r(({row:a})=>[s("p",null,c(a.phoneNumber),1)]),_:1}),o(i,{label:"GENDER",width:"90"},{default:r(({row:a})=>[s("p",null,c(a.gender),1)]),_:1}),o(i,{label:"ACTION",width:"120",align:"right"},{default:r(({row:a})=>[s("div",j,[o(y,{name:"delete",onClick:Q=>h(a)},null,8,["onClick"])])]),_:1})]),_:1},8,["page","limit","data","query"])]),o(q,{name:l(g).email,type:"người dùng","is-loading-button":l(d),onDelete:x},null,8,["name","is-loading-button"])],64)}}}),_e=k(G,[["__scopeId","data-v-59a9a66a"]]);export{_e as default};