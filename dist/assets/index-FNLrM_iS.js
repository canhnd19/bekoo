import{ch as O,be as x,ci as W,aA as R,y as F,z as U,$ as E,aq as _,aa as B,M as D}from"./index-DbpeAOcW.js";var V=/\s/;function $(n){for(var t=n.length;t--&&V.test(n.charAt(t)););return t}var P=/^\s+/;function H(n){return n&&n.slice(0,$(n)+1).replace(P,"")}var k=NaN,j=/^[-+]0x[0-9a-f]+$/i,q=/^0b[01]+$/i,w=/^0o[0-7]+$/i,z=parseInt;function N(n){if(typeof n=="number")return n;if(O(n))return k;if(x(n)){var t=typeof n.valueOf=="function"?n.valueOf():n;n=x(t)?t+"":t}if(typeof n!="string")return n===0?n:+n;n=H(n);var a=q.test(n);return a||w.test(n)?z(n.slice(2),a?2:8):j.test(n)?k:+n}var C=function(){return W.Date.now()},G="Expected a function",K=Math.max,X=Math.min;function Y(n,t,a){var s,u,f,l,e,o,c=0,v=!1,p=!1,r=!0;if(typeof n!="function")throw new TypeError(G);t=N(t)||0,x(a)&&(v=!!a.leading,p="maxWait"in a,f=p?K(N(a.maxWait)||0,t):f,r="trailing"in a?!!a.trailing:r);function d(i){var m=s,h=u;return s=u=void 0,c=i,l=n.apply(h,m),l}function I(i){return c=i,e=setTimeout(g,t),v?d(i):l}function S(i){var m=i-o,h=i-c,A=t-m;return p?X(A,f-h):A}function b(i){var m=i-o,h=i-c;return o===void 0||m>=t||m<0||p&&h>=f}function g(){var i=C();if(b(i))return y(i);e=setTimeout(g,S(i))}function y(i){return e=void 0,r&&s?d(i):(s=u=void 0,l)}function L(){e!==void 0&&clearTimeout(e),c=0,s=o=u=e=void 0}function M(){return e===void 0?l:y(C())}function T(){var i=C(),m=b(i);if(s=arguments,u=this,o=i,m){if(e===void 0)return I(o);if(p)return clearTimeout(e),e=setTimeout(g,t),d(o)}return e===void 0&&(e=setTimeout(g,t)),l}return T.cancel=L,T.flush=M,T}const Z="update:modelValue",nn="change",en="input",J=n=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(n);function tn(n,{beforeFocus:t,afterFocus:a,beforeBlur:s,afterBlur:u}={}){const f=B(),{emit:l}=f,e=R(),o=F(!1),c=r=>{_(t)&&t(r)||o.value||(o.value=!0,l("focus",r),a==null||a())},v=r=>{var d;_(s)&&s(r)||r.relatedTarget&&((d=e.value)!=null&&d.contains(r.relatedTarget))||(o.value=!1,l("blur",r),u==null||u())},p=()=>{var r,d;(r=e.value)!=null&&r.contains(document.activeElement)&&e.value!==document.activeElement||(d=n.value)==null||d.focus()};return U(e,r=>{r&&r.setAttribute("tabindex","-1")}),E(e,"focus",c,!0),E(e,"blur",v,!0),E(e,"click",p,!0),{isFocused:o,wrapperRef:e,handleFocus:c,handleBlur:v}}function an({afterComposition:n,emit:t}){const a=F(!1),s=e=>{t==null||t("compositionstart",e),a.value=!0},u=e=>{var o;t==null||t("compositionupdate",e);const c=(o=e.target)==null?void 0:o.value,v=c[c.length-1]||"";a.value=!J(v)},f=e=>{t==null||t("compositionend",e),a.value&&(a.value=!1,D(()=>n(e)))};return{isComposing:a,handleComposition:e=>{e.type==="compositionend"?f(e):u(e)},handleCompositionStart:s,handleCompositionUpdate:u,handleCompositionEnd:f}}export{nn as C,en as I,Z as U,tn as a,Y as d,an as u};