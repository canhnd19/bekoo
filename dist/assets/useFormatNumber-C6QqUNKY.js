function n(t){if(!t)return"0";const r=t.toString().split(".");return r[0]=r[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),r.join(".")}export{n as u};
