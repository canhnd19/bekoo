import{_ as C}from"./BaseIcon.vue_vue_type_script_setup_true_lang-Cbn_-B4r.js";import{_ as T}from"./BaseInput-DP5znCvV.js";import{d as S,y as d,B as D,o as a,c as i,a as t,s as h,f as s,D as P,F as g,q as p,I as j,p as k,t as r,m as F,N,P as V,_ as H}from"./index-CnR2gPXj.js";import{S as I,P as A,N as M,a as q}from"./swiper-vue-XG--u7si.js";/* empty css                 */import"./index-DgnzOb9I.js";import"./index-C43BPXCE.js";import"./use-form-item-RVLqmdKb.js";const E="/images/homepage_banner.png",L=[{icon:"/images/doctor.png",label:"Đặt khám theo bác sĩ"},{icon:"/images/tele.png",label:"Tư vấn khám bệnh qua video"},{icon:"/images/dat-lich-xet-nghiem.png",label:"Đặt lịch xét nghiệm"},{icon:"/images/goi_kham.png",label:"Gói khám sức khỏe"},{icon:"/images/tiem-chung.png",label:"Đặt lịch tiêm chủng"},{icon:"/images/y-te-tai-nha.png",label:"Y tế tại nhà"},{icon:"/images/thanhtoanvp.png",label:"Thanh toán viện phí"}],K=[{icon:"/images/luotdatkham.png",value:"3.0M+",label:"Lượt khám"},{icon:"/images/bacsi.png",value:"100+",label:"Bác sĩ"},{icon:"/images/luottruycapthang.png",value:"850K+",label:"Lượt truy cập tháng"},{icon:"/images/luottruycapngay.png",value:"28.3K++",label:"Lượt truy cập trong ngày"}],G=[{detailFeelPeople:"Đặt lịch xét nghiệm bên này rất gọn, có ngày giờ cụ thể luôn lên là được xét nghiệm liền không rườm rà gì mấy. An tâm đặt cho gia đình, có cả xét nghiệm tận nhà, không mất thời gian.",name:"Yến Chi ",avatar:"/images/feedback2.jpg"},{detailFeelPeople:"Cảm ơn Bekoo giúp mình và gia đình tiết kiệm thời gian và công sức khi đi khám. Ba mình lớn tuổi nên mắt yếu, đi khám BV Mắt ở xa lên tới Hà nội khám cực với đông nhưng từ bây giờ chỉ cần đặt khám qua Bekoo, không cần xếp hàng chờ đợi.",name:"Mộc Trà",avatar:"/images/feedback1.jpg"},{detailFeelPeople:"Tôi rất hài lòng với dịch vụ đặt lịch của Bekoo. Ứng dụng dễ sử dụng, giúp tôi đặt lịch khám nhanh chóng mà không cần chờ đợi. Điều tuyệt vời là có thể chọn bác sĩ theo nhu cầu và lịch trình cá nhân. ",name:"Mai Vy",avatar:"/images/feedback3.jpg"},{detailFeelPeople:"Dịch vụ Bekoo giúp tôi tiết kiệm nhiều thời gian nhờ vào tính năng đặt lịch trực tuyến. Từ khi sử dụng Bekoo, tôi không còn phải xếp hàng dài ở bệnh viện nữa. Giao diện đơn giản, dễ hiểu, thông tin rõ ràng về các bác sĩ và dịch vụ.",name:"Mạnh Hùng",avatar:"/images/feedback4.jpg"},{detailFeelPeople:"Bekoo thực sự là một ứng dụng hữu ích trong việc chăm sóc sức khỏe! Tôi ấn tượng với tính năng nhắc nhở tự động, giúp tôi không bao giờ quên lịch hẹn. Hệ thống đặt lịch rất mượt, giao diện thân thiện. ",name:"Roãn Quyền",avatar:"/images/feedback5.jpg"},{detailFeelPeople:"Đặt lịch khám qua Bekoo rất dễ dàng và tiện lợi. Tôi đánh giá cao tính năng thanh toán trực tuyến và cập nhật lịch sử khám bệnh. Giao diện trực quan, giúp tôi dễ dàng tìm kiếm và lựa chọn dịch vụ.",name:"An Nhung",avatar:"/images/feedback6.jpg"}],R={class:"relative"},Y={class:"absolute top-20 w-full"},O={class:"carousel"},U=["src"],$={class:"mt-2 text-center"},z={class:"container mt-28"},Q={class:"my-8 grid grid-cols-8 gap-x-12 gap-y-8"},X=["onClick"],J=["src"],W={class:"mt-2 text-center text-[20px]"},Z={class:"show-more"},tt={key:0,class:"is-loading"},et={key:1},nt={key:2},at={class:"container mt-28"},st={class:"feedback-card"},it={class:"mx-auto"},ot={class:"border-border-table flex items-center justify-center space-x-2 border-t border-solid pt-4"},lt=["src"],ct={class:"text-base font-semibold"},rt={class:"statistics"},ht={class:"container"},gt={class:"statistics-item"},mt=["src"],dt={class:"text-center text-2xl font-bold text-[#24313d]"},pt={class:"mt-2 text-center text-[20px] text-[#757575]"},ut=S({__name:"HomeView",setup(vt){const b=[A,M],x=d([]),u=d(""),c=d(!1),{department:_}=D(),m=d({pageIndex:1,pageSize:40,totalElements:0,loading:!1}),f=async()=>{try{m.value.loading=!0;const o=await N.getAllDepartment();x.value=o.value.contentResponse,m.value.loading=!1}catch(o){m.value.loading=!1,console.log(o)}},y=()=>{c.value=!c.value,c.value&&f()},w=o=>{sessionStorage.setItem("department-name",o.name),V.push({name:"Department Detail",params:{id:o.id}})};return(o,e)=>{const B=T,v=C;return a(),i(g,null,[t("div",R,[e[4]||(e[4]=t("img",{src:E,alt:""},null,-1)),t("div",Y,[e[1]||(e[1]=t("p",{class:"mb-2 text-center text-2xl text-[#11a2f3]"},"Nền tảng công nghệ",-1)),e[2]||(e[2]=t("p",{class:"text-center text-4xl font-bold"},"Kết nối người dân với Cơ sở - Dịch vụ Y tế",-1)),h(B,{modelValue:s(u),"onUpdate:modelValue":e[0]||(e[0]=n=>P(u)?u.value=n:null),placeholder:"Tìm kiếm gói khám",class:"input-search","show-icon":!0},null,8,["modelValue"]),e[3]||(e[3]=t("p",{class:"mt-5 text-center text-xl"},"Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa",-1))]),t("div",O,[(a(!0),i(g,null,p(s(L),(n,l)=>(a(),i("div",{key:l,class:"carousel-item"},[t("img",{src:n.icon,alt:"",class:"mx-auto w-14"},null,8,U),t("p",$,r(n.label),1)]))),128))])]),t("div",z,[e[5]||(e[5]=t("p",{class:"label"},"CHUYÊN KHOA",-1)),t("div",Q,[(a(!0),i(g,null,p(s(c)?s(_):s(_),(n,l)=>(a(),i("div",{key:l,class:"cursor-pointer",onClick:_t=>w(n)},[t("img",{src:n.urlImage,alt:"",class:"mx-auto w-20"},null,8,J),t("p",W,r(n.name),1)],8,X))),128))]),t("div",{class:"flex items-center justify-center",onClick:y},[t("div",Z,[s(m).loading?(a(),i("div",tt,[h(v,{name:"loading",class:"text-black"})])):j("",!0),s(c)?(a(),i("p",et,"Thu gọn")):(a(),i("p",nt,"Xem tất cả")),h(v,{name:s(c)?"direction-up":"direction-down",class:"ml-2"},null,8,["name"])])])]),t("div",at,[e[6]||(e[6]=t("p",{class:"label"},"Cảm nhận từ khách hàng",-1)),h(s(I),{ref:"{swiperRef}","slides-per-view":3,"space-between":40,pagination:{type:"fraction"},navigation:!0,modules:b,class:"my-swiper my-8"},{default:k(()=>[(a(!0),i(g,null,p(s(G),(n,l)=>(a(),F(s(q),{key:l},{default:k(()=>[t("div",st,[t("div",it,[h(v,{name:"icon-feedback",class:"ml-2 flex justify-center text-[#ced3d9]"})]),t("p",null,r(n.detailFeelPeople),1),t("div",ot,[t("img",{src:n.avatar,alt:"",class:"h-10 w-10 rounded-full object-cover"},null,8,lt),t("p",ct,r(n.name),1)])])]),_:2},1024))),128))]),_:1},512)]),e[8]||(e[8]=t("div",{class:"bg"},null,-1)),t("div",rt,[t("div",ht,[e[7]||(e[7]=t("p",{class:"label"},"THỐNG KÊ",-1)),t("div",gt,[(a(!0),i(g,null,p(s(K),(n,l)=>(a(),i("div",{key:l,class:"cursor-pointer"},[t("img",{src:n.icon,alt:"",class:"mx-auto w-24"},null,8,mt),t("p",dt,r(n.value),1),t("p",pt,r(n.label),1)]))),128))])])])],64)}}}),Tt=H(ut,[["__scopeId","data-v-2d103ae8"]]);export{Tt as default};