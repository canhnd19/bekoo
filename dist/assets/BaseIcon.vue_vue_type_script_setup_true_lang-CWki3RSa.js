const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/arrow-Bq3rMI3j.js","assets/index-J4Kp5RRN.js","assets/index-gTL0KKn2.css","assets/avatar-default-BG27JuJJ.js","assets/direction-down-Fax6tcSz.js","assets/direction-up-B5EG_Jpi.js","assets/doctor-D24zCws3.js","assets/loading-O7hvSioz.js","assets/menu-user-CmOhPdO3.js","assets/no-data-BgnO5NrG.js","assets/search-C-Ahn4Is.js","assets/user-Crc6QufR.js"])))=>i.map(i=>d[i]);
import{X as l,bV as d,bW as v,bX as m,bY as p,bZ as E,b_ as f,aj as g,d as P,bF as b,as as I,o as _,c as h,l as R,ai as O,f as w,h as A,b$ as e}from"./index-J4Kp5RRN.js";function D(s){var r=s==null?0:s.length;return r?l(s):[]}function L(s){return d(v(s,void 0,D),s+"")}function T(s,r,o){for(var t=-1,c=r.length,i={};++t<c;){var n=r[t],a=m(s,n);o(a,n)&&p(i,E(n,s),a)}return i}function V(s,r){return T(s,r,function(o,t){return f(s,t)})}var k=L(function(s,r){return s==null?{}:V(s,r)});class S extends Error{constructor(r){super(r),this.name="ElementPlusError"}}function B(s,r){throw new S(`[${s}] ${r}`)}function $(s,r){}const x=g({ariaLabel:String,ariaOrientation:{type:String,values:["horizontal","vertical","undefined"]},ariaControls:String}),z=s=>k(x,s),C=P({__name:"BaseIcon",props:{name:{default:""},size:{default:20}},emits:["click"],setup(s,{emit:r}){const o=s,t=r,c=Object.assign({"/src/icons/arrow.svg":()=>e(()=>import("./arrow-Bq3rMI3j.js"),__vite__mapDeps([0,1,2])),"/src/icons/avatar-default.svg":()=>e(()=>import("./avatar-default-BG27JuJJ.js"),__vite__mapDeps([3,1,2])),"/src/icons/direction-down.svg":()=>e(()=>import("./direction-down-Fax6tcSz.js"),__vite__mapDeps([4,1,2])),"/src/icons/direction-up.svg":()=>e(()=>import("./direction-up-B5EG_Jpi.js"),__vite__mapDeps([5,1,2])),"/src/icons/doctor.svg":()=>e(()=>import("./doctor-D24zCws3.js"),__vite__mapDeps([6,1,2])),"/src/icons/loading.svg":()=>e(()=>import("./loading-O7hvSioz.js"),__vite__mapDeps([7,1,2])),"/src/icons/menu-user.svg":()=>e(()=>import("./menu-user-CmOhPdO3.js"),__vite__mapDeps([8,1,2])),"/src/icons/no-data.svg":()=>e(()=>import("./no-data-BgnO5NrG.js"),__vite__mapDeps([9,1,2])),"/src/icons/search.svg":()=>e(()=>import("./search-C-Ahn4Is.js"),__vite__mapDeps([10,1,2])),"/src/icons/user.svg":()=>e(()=>import("./user-Crc6QufR.js"),__vite__mapDeps([11,1,2]))}),i=b();return I(async()=>{try{const n=await c[`/src/icons/${o.name}.svg`]();i.value=n}catch{console.error(`[base-icons] Icon '${o.name}' doesn't exist in 'src/icons'`)}}),(n,a)=>(_(),h("div",{class:"base-icon",style:A({width:n.size+"px"}),onClick:a[0]||(a[0]=u=>t("click",u))},[(_(),R(O(w(i))))],4))}});export{C as _,$ as d,D as f,k as p,B as t,z as u};