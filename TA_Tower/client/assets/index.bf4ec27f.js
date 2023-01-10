var X=Object.defineProperty;var D=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var O=(s,e,t)=>e in s?X(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,N=(s,e)=>{for(var t in e||(e={}))J.call(e,t)&&O(s,t,e[t]);if(D)for(var t of D(e))Z.call(e,t)&&O(s,t,e[t]);return s};import{r as ee,c as k,a as g,o as l,b as d,d as o,e as v,F as I,f as te,S as L,t as p,g as $,h as oe,u as P,w as ne,M as q,i as f,v as E,j as se,k as ae,l as ce,m as re,n as ie,p as le,q as de,s as ue,x as M,y,z as j,A as U,B as V,C as _e}from"./vendor.8d774bb3.js";const me=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))n(c);new MutationObserver(c=>{for(const r of c)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(c){const r={};return c.integrity&&(r.integrity=c.integrity),c.referrerpolicy&&(r.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?r.credentials="include":c.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(c){if(c.ep)return;c.ep=!0;const r=t(c);fetch(c.href,r)}};me();const i=ee({user:{},account:{},myTickets:[],towerEvents:[],activeEvent:null,comments:[],eventTickets:[]});var b=(s,e)=>{for(const[t,n]of e)s[t]=n;return s};const ve={name:"App",setup(){return{appState:k(()=>i)}}},pe={class:"d-md-none d-sm-block"},ge={class:"container-fluid bg-dark"},be={class:"row"},he={class:"col-md-11"},fe={class:"col-md-1 sidebar-bg d-sm-none d-md-block side-nav"};function ye(s,e,t,n,c,r){const a=g("Navbar"),m=g("router-view"),w=g("SideNavbar");return l(),d(I,null,[o("header",pe,[v(a)]),o("main",ge,[o("div",be,[o("div",he,[v(m)]),o("div",fe,[v(w)])])])],64)}var Ee=b(ve,[["render",ye]]);const R=window.location.origin.includes("localhost"),B=R?"http://localhost:3000":"",we="dev-ynre1pz7.us.auth0.com",ke="koI64hAUtt7sCgyAXvri3QAIUMhBENg4",xe="https://sandbox.com",u=te.create({baseURL:B,timeout:8e3});class $e{async getAccountTickets(){const e=await u.get("account/tickets");console.log(e.data,"attending tickets"),i.myTickets=e.data}async getEventTickets(e){const t=await u.get(`api/events/${e}/tickets`);console.log("all tickets",t.data),i.eventTickets=t.data}async createTicket(e){const t=await u.post("api/tickets",e);console.log("new ticket",t.data),i.eventTickets.unshift(t.data),i.myTickets.unshift(t.data),i.activeEvent.capacity--}async cancelTicket(e){await u.delete(`api/tickets/${e}`),i.myTickets=i.myTickets.filter(t=>t.id!=e)}}const H=new $e;class T{static async confirm(e="Are you sure?",t="You won't be able to revert this!",n="warning",c="Yes, delete it!"){try{return!!(await L.fire({title:e,text:t,icon:n,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:c})).isConfirmed}catch{return!1}}static toast(e="Warning!",t="warning",n="top-end",c=3e3,r=!0){L.fire({title:e,icon:t,position:n,timer:c,timerProgressBar:r,toast:!0,showConfirmButton:!1})}}const Te={props:{towerEvent:{type:Object,required:!0}},setup(s){return{async cancelTicket(){try{await H.cancelTicket(s.towerEvent.id)}catch(e){T.toast(e.message),logger.log(e)}}}}},Se={class:"d-flex bg-secondary ticket-container elevation-3"},Ae=["src"],Ce={class:"p-3 ticket-body"},De={class:"m-0 fs-2"},Oe={class:"m-0 pt-2 text-light"},Ne={class:"m-0 text-light"},Ie={class:"text-end pe-5"},Le=o("div",{class:"ticket-circle"},null,-1);function Pe(s,e,t,n,c,r){return l(),d("div",Se,[o("img",{class:"ticket-img",src:t.towerEvent.event.coverImg,alt:""},null,8,Ae),o("div",Ce,[o("div",null,[o("p",De,p(t.towerEvent.event.name),1),o("p",Oe,p(t.towerEvent.event.location),1),o("p",Ne,p(new Date(t.towerEvent.event.startDate).toDateString()),1)]),o("div",Ie,[o("button",{onClick:e[0]||(e[0]=a=>n.cancelTicket()),class:"btn btn-info"}," Cancel Ticket ")])]),Le])}var qe=b(Te,[["render",Pe]]),Me=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:qe});class je{async getEventComments(e){const t=await u.get(`api/events/${e}/comments`);console.log("event comments",t.data),i.comments=t.data}async createComment(e){const t=await u.post("api/comments",e);console.log(t),i.comments.unshift(t.data)}async deleteComment(e){await u.delete(`api/comments/${e}`),console.log("deleting comment"),i.comments=i.comments.filter(t=>t.id!=e)}}const Ue=new je;function x(s,e){if(R)console[s](`[${s}] :: ${new Date().toLocaleTimeString()} :: `,...e);else{switch(s){case"log":case"assert":return}console[s](`[${s}] :: ${new Date().toLocaleTimeString()} :: `,...e)}}const h={log(){x("log",arguments)},error(){x("error",arguments)},warn(){x("warn",arguments)},assert(){x("assert",arguments)},trace(){x("trace",arguments)}};const Ve={props:{comment:{type:Object,required:!0}},setup(s){return{async deleteComment(){try{await Ue.deleteComment(s.comment.id)}catch(e){T.toast(e.message),h.log(e)}}}}},Re={class:"d-flex"},Be=["title","src"],He={class:"comment-body ms-3 p-2 elevation-4"},ze={class:"d-flex justify-content-between"},Fe={class:"text-primary m-0"},Ke=o("span",{class:"text-secondary"},"said:",-1),We={class:"text-secondary pt-2"};function Ye(s,e,t,n,c,r){return l(),d("div",Re,[o("img",{title:t.comment.creator.name,class:"comment-img",src:t.comment.creator.picture,alt:""},null,8,Be),o("div",He,[o("div",ze,[o("p",Fe,[$(p(t.comment.creator.name)+" ",1),Ke]),o("i",{onClick:e[0]||(e[0]=a=>n.deleteComment()),class:"mdi mdi-close text-dark",title:"Delete Comment"})]),o("p",We,p(t.comment.body),1)])])}var Ge=b(Ve,[["render",Ye]]),Qe=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ge});class Xe{async getAllEvents(){const e=await u.get("api/events");console.log(e.data,"all tower events"),i.towerEvents=e.data}async getActiveEvent(e){const t=await u.get(`api/events/${e}`);console.log("active event",t.data),i.activeEvent=t.data}async createEvent(e){const t=await u.post("api/events",e);return console.log("new event",t.data),i.towerEvents.push(t.data),t.data}async editEvent(e){const t=await u.put(`api/events/${e.id}`,e);console.log("edited event",t.data),i.activeEvent=t.data}async cancelEvent(e){await u.delete(`api/events/${e}`),i.activeEvent.isCanceled=!0}}const z=new Xe;const Je={props:{towerEvent:{type:Object}},setup(s){const e=oe({}),t=P();return ne(()=>{e.value=N({},s.towerEvent)}),{editable:e,async handleSubmit(){try{if(e.value.id)await z.editEvent(e.value),q.getOrCreateInstance(document.getElementById("edit-event-modal")).toggle();else{const n=await z.createEvent(e.value);t.push({name:"Event",params:{id:n.id}}),q.getOrCreateInstance(document.getElementById("create-event-modal")).toggle()}}catch(n){h.log(n),T.toast(n.message)}}}}},Ze={class:"col-12"},et=o("label",{for:"inputEventName",class:"form-label text-dark"},"Event Name",-1),tt={class:"col-12"},ot=o("label",{for:"inputEventDescription",class:"form-label text-dark"},"Description",-1),nt={class:"col-12"},st=o("label",{for:"inputEventImage",class:"form-label text-dark"},"Event Image",-1),at={class:"col-12"},ct=o("label",{for:"inputEventLocation",class:"form-label text-dark"},"Event Location",-1),rt={class:"col-md-6"},it=o("label",{for:"inputEventDate",class:"form-label text-dark"},"Start Date",-1),lt={class:"col-md-4"},dt=o("label",{for:"inputEventType",class:"form-label text-dark"},"Event Type",-1),ut=ce('<option selected>Type...</option><option class="uppercase">concert</option><option class="uppercase">sport</option><option class="uppercase">convention</option><option class="uppercase">digital</option><option class="uppercase">expos</option>',6),_t=[ut],mt={class:"col-md-2"},vt=o("label",{for:"inputEventCapacity",class:"form-label text-dark"},"Capacity",-1),pt=o("div",{class:"d-flex justify-content-between my-3 px-3 pt-4"},[o("button",{type:"button","data-bs-dismiss":"modal","aria-label":"Close",class:"btn text-dark lighten-20 text-uppercase selectable"},[o("b",null," cancel ")]),o("button",{type:"submit",class:"btn text-primary text-uppercase selectable"},[o("b",null," submit ")])],-1);function gt(s,e,t,n,c,r){return l(),d("form",{onSubmit:e[7]||(e[7]=ae(a=>n.handleSubmit(),["prevent"])),class:"row g-3"},[o("div",Ze,[et,f(o("input",{type:"text",class:"form-control",id:"inputEventName","onUpdate:modelValue":e[0]||(e[0]=a=>n.editable.name=a),required:"true"},null,512),[[E,n.editable.name]])]),o("div",tt,[ot,f(o("textarea",{name:"eventDescription",rows:"5",type:"text",class:"form-control",id:"inputEventDescription","onUpdate:modelValue":e[1]||(e[1]=a=>n.editable.description=a),required:"true"},null,512),[[E,n.editable.description]])]),o("div",nt,[st,f(o("input",{type:"url",class:"form-control",id:"inputEventImage",placeholder:"Image Url...","onUpdate:modelValue":e[2]||(e[2]=a=>n.editable.coverImg=a),required:"true"},null,512),[[E,n.editable.coverImg]])]),o("div",at,[ct,f(o("input",{type:"text",class:"form-control",id:"inputEventLocation",placeholder:"Location","onUpdate:modelValue":e[3]||(e[3]=a=>n.editable.location=a),required:"true"},null,512),[[E,n.editable.location]])]),o("div",rt,[it,f(o("input",{type:"date",class:"form-control",id:"inputEventDate","onUpdate:modelValue":e[4]||(e[4]=a=>n.editable.startDate=a),required:"true"},null,512),[[E,n.editable.startDate]])]),o("div",lt,[dt,f(o("select",{id:"inputEventType",class:"form-select","onUpdate:modelValue":e[5]||(e[5]=a=>n.editable.type=a),required:"true"},_t,512),[[se,n.editable.type]])]),o("div",mt,[vt,f(o("input",{type:"number",class:"form-control",id:"inputEventCapacity","onUpdate:modelValue":e[6]||(e[6]=a=>n.editable.capacity=a),required:"true"},null,512),[[E,n.editable.capacity]])]),pt],32)}var bt=b(Je,[["render",gt]]),ht=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:bt});const ft="modulepreload",F={},yt="/",S=function(e,t){return!t||t.length===0?e():Promise.all(t.map(n=>{if(n=`${yt}${n}`,n in F)return;F[n]=!0;const c=n.endsWith(".css"),r=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${r}`))return;const a=document.createElement("link");if(a.rel=c?"stylesheet":ft,c||(a.as="script",a.crossOrigin=""),a.href=n,document.head.appendChild(a),c)return new Promise((m,w)=>{a.addEventListener("load",m),a.addEventListener("error",w)})})).then(()=>e())};function Et(s){switch(s){case"./pages/AboutPage.vue":return S(()=>import("./AboutPage.fe635abe.js"),["assets/AboutPage.fe635abe.js","assets/vendor.8d774bb3.js"]);case"./pages/AccountPage.vue":return S(()=>import("./AccountPage.b8aad9bb.js"),["assets/AccountPage.b8aad9bb.js","assets/AccountPage.bd2e62ea.css","assets/vendor.8d774bb3.js"]);case"./pages/EventDetailsPage.vue":return S(()=>import("./EventDetailsPage.e2e81083.js"),["assets/EventDetailsPage.e2e81083.js","assets/EventDetailsPage.816342d9.css","assets/vendor.8d774bb3.js"]);case"./pages/HomePage.vue":return S(()=>import("./HomePage.c55fd1d7.js"),["assets/HomePage.c55fd1d7.js","assets/HomePage.36219fad.css","assets/vendor.8d774bb3.js"]);default:return new Promise(function(e,t){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+s)))})}}function A(s){return()=>Et(`./pages/${s}.vue`)}const wt=[{path:"/",name:"Home",component:A("HomePage")},{path:"/about",name:"About",component:A("AboutPage")},{path:"/account",name:"Account",component:A("AccountPage"),beforeEnter:le},{path:"/event/:id",name:"Event",component:A("EventDetailsPage"),beforeEnter:de}],K=re({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:ie(),routes:wt});class kt{async getAccount(){try{const e=await u.get("/account");i.account=e.data}catch(e){h.error("HAVE YOU STARTED YOUR SERVER YET???",e)}}}const xt=new kt,$t={connection:"connection",connected:"connected",disconnect:"disconnect",authenticate:"authenticate",authenticated:"authenticated",userConnected:"userConnected",userDisconnected:"userDisconnected",error:"error"};class Tt{constructor(e=!1,t=B){}on(e,t){var n;return(n=this.socket)==null||n.on(e,t.bind(this)),this}onConnected(e){h.log("[SOCKET_CONNECTION]",e),this.connected=!0,this.playback()}onAuthenticated(e){h.log("[SOCKET_AUTHENTICATED]",e),this.authenticated=!0,this.playback()}authenticate(e){var t;(t=this.socket)==null||t.emit($t.authenticate,e)}onError(e){h.error("[SOCKET_ERROR]",e)}enqueue(e,t){h.log("[ENQUEING_ACTION]",{action:e,payload:t}),this.queue.push({action:e,payload:t})}playback(){h.log("[SOCKET_PLAYBACK]");const e=[...this.queue];this.queue=[],e.forEach(t=>{this.emit(t.action,t.payload)})}emit(e,t=void 0){if(this.requiresAuth&&!this.authenticated)return this.enqueue(e,t);if(!this.connected)return this.enqueue(e,t);this.socket.emit(e,t)}}class St extends Tt{constructor(){super();this.on("error",this.onError)}onError(e){T.toast(e.message,"error")}}const W=new St,_=ue({domain:we,clientId:ke,audience:xe,useRefreshTokens:!0,onRedirectCallback:s=>{K.push(s&&s.targetUrl?s.targetUrl:window.location.pathname)}});_.on(_.AUTH_EVENTS.AUTHENTICATED,async function(){u.defaults.headers.authorization=_.bearer,u.interceptors.request.use(At),i.user=_.user,await xt.getAccount(),W.authenticate(_.bearer),await H.getAccountTickets()});async function At(s){if(!_.isAuthenticated)return s;const e=_.identity.exp*1e3,t=e<Date.now(),n=e<Date.now()+1e3*60*60*12;return t?await _.loginWithPopup():n&&(await _.getTokenSilently(),u.defaults.headers.authorization=_.bearer,W.authenticate(_.bearer)),s}const Ct={setup(){return{user:k(()=>i.user),account:k(()=>i.account),async login(){_.loginWithPopup()},async logout(){_.logout({returnTo:window.location.origin})}}}},Y=s=>(j("data-v-b5f30be8"),s=s(),U(),s),Dt={class:"navbar-text"},Ot={key:1,class:"dropdown my-2 my-lg-0"},Nt={class:"dropdown-toggle selectable","data-bs-toggle":"dropdown","aria-expanded":"false",id:"authDropdown"},It={key:0},Lt=["src"],Pt={class:"mx-3 text-success lighten-30"},qt={class:"dropdown-menu p-0 list-group w-100","aria-labelledby":"authDropdown"},Mt=Y(()=>o("div",{class:"list-group-item list-group-item-action hoverable"}," Manage Account ",-1)),jt=Y(()=>o("i",{class:"mdi mdi-logout"},null,-1)),Ut=$(" logout "),Vt=[jt,Ut];function Rt(s,e,t,n,c,r){const a=g("router-link");return l(),d("span",Dt,[n.user.isAuthenticated?(l(),d("div",Ot,[o("div",Nt,[n.account.picture?(l(),d("div",It,[o("img",{src:n.account.picture,alt:"account photo",height:"40",class:"rounded"},null,8,Lt),o("span",Pt,p(n.account.name),1)])):M("",!0)]),o("div",qt,[v(a,{to:{name:"Account"}},{default:y(()=>[Mt]),_:1}),o("div",{class:"list-group-item list-group-item-action hoverable text-danger",onClick:e[1]||(e[1]=(...m)=>n.logout&&n.logout(...m))},Vt)])])):(l(),d("button",{key:0,class:"btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0",onClick:e[0]||(e[0]=(...m)=>n.login&&n.login(...m))}," Login "))])}var Bt=b(Ct,[["render",Rt],["__scopeId","data-v-b5f30be8"]]),Ht=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Bt});const zt={setup(){return{}}},Ft={class:"modal fade",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},Kt={class:"modal-dialog"},Wt={class:"modal-content"},Yt={class:"modal-header text-center"},Gt=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),Qt={class:"modal-body container-fluid"};function Xt(s,e,t,n,c,r){return l(),d("div",Ft,[o("div",Kt,[o("div",Wt,[o("div",Yt,[V(s.$slots,"title"),Gt]),o("div",Qt,[V(s.$slots,"body")])])])])}var Jt=b(zt,[["render",Xt]]),Zt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Jt}),eo="/assets/TowerLogo.cd20bebe.svg";const to={setup(){return{}}},G=s=>(j("data-v-1fc4016c"),s=s(),U(),s),oo={class:"navbar navbar-expand-lg navbar-dark bg-dark px-3"},no=G(()=>o("div",{class:"d-flex flex-column align-items-center"},[o("img",{alt:"logo",src:eo,height:"45"})],-1)),so=G(()=>o("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[o("span",{class:"navbar-toggler-icon"})],-1)),ao={class:"collapse navbar-collapse",id:"navbarText"},co={class:"navbar-nav me-auto"},ro=$(" About ");function io(s,e,t,n,c,r){const a=g("router-link"),m=g("Login");return l(),d("nav",oo,[v(a,{class:"navbar-brand d-flex",to:{name:"Home"}},{default:y(()=>[no]),_:1}),so,o("div",ao,[o("ul",co,[o("li",null,[v(a,{to:{name:"About"},class:"btn text-success lighten-30 selectable text-uppercase"},{default:y(()=>[ro]),_:1})])]),v(m)])])}var lo=b(to,[["render",io],["__scopeId","data-v-1fc4016c"]]),uo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:lo});const _o={setup(){return{user:k(()=>i.user),account:k(()=>i.account),async login(){AuthService.loginWithPopup()},async logout(){AuthService.logout({returnTo:window.location.origin})}}}},mo={class:"navbar-text pt-5"},vo={key:1,class:"dropdown my-2 my-lg-0 pt-5"},po={key:0,class:"text-center img-div"},go=["src"],bo={class:"pt-4 text-center"},ho=o("p",null,"Account",-1),fo=o("p",null,"Home",-1),yo=o("button",{"data-bs-toggle":"modal","data-bs-target":"#create-event-modal",class:"btn btn-success"}," Add Event ",-1),Eo=o("h3",{class:"text-secondary text-uppercase"},"Create Event",-1);function wo(s,e,t,n,c,r){const a=g("router-link"),m=g("EventForm"),w=g("Modal");return l(),d(I,null,[o("div",null,[o("span",mo,[n.user.isAuthenticated?(l(),d("div",vo,[o("div",null,[n.account.picture?(l(),d("div",po,[o("img",{src:n.account.picture,alt:"account photo",class:"rounded sidebar-img"},null,8,go)])):M("",!0)])])):(l(),d("button",{key:0,class:"btn btn-success selectable text-uppercase my-2 my-lg-0",onClick:e[0]||(e[0]=(...C)=>n.login&&n.login(...C))}," Login ")),o("div",bo,[v(a,{to:{name:"Account"}},{default:y(()=>[ho]),_:1}),v(a,{to:{name:"Home"}},{default:y(()=>[fo]),_:1}),yo,o("button",{onClick:e[1]||(e[1]=(...C)=>n.logout&&n.logout(...C)),class:"btn text-success pt-5"},"Logout")])])]),v(w,{id:"create-event-modal"},{title:y(()=>[Eo]),body:y(()=>[v(m)]),_:1})],64)}var ko=b(_o,[["render",wo]]),xo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ko});const $o={props:{towerEvent:{type:Object,required:!0}},setup(s){const e=P();return{router:e,goToEvent(){try{e.push({name:"Event",params:{id:s.towerEvent.id}})}catch(t){h.log(t)}}}}},To=["src"],So={class:"event-details p-2"},Ao={class:"m-0 fs-5 fw-bold"},Co={class:"m-0 text-light"},Do={class:"m-0 text-light"},Oo={key:0,class:"text-center bg-danger m-0"},No={key:1,class:"bg-info text-center m-0"},Io={key:2,class:"capacity my-0"},Lo={class:"text-primary"},Po=$(" spots left ");function qo(s,e,t,n,c,r){return l(),d("div",{class:"event-container elevation-5",onClick:e[0]||(e[0]=a=>n.goToEvent())},[o("img",{class:"img-fluid",src:t.towerEvent.coverImg,alt:""},null,8,To),o("div",So,[o("p",Ao,p(t.towerEvent.name),1),o("p",Co,p(t.towerEvent.location),1),o("p",Do,p(new Date(t.towerEvent.startDate).toDateString()),1),t.towerEvent.isCanceled?(l(),d("p",Oo," CANCELED ")):t.towerEvent.capacity==0?(l(),d("p",No," SOLD OUT ")):(l(),d("p",Io,[o("span",Lo,p(t.towerEvent.capacity),1),Po]))])])}var Mo=b($o,[["render",qo]]),jo=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Mo});function Uo(s){Object.entries({"./components/Attending.vue":Me,"./components/Comment.vue":Qe,"./components/EventForm.vue":ht,"./components/Login.vue":Ht,"./components/Modal.vue":Zt,"./components/Navbar.vue":uo,"./components/SideNavbar.vue":xo,"./components/TowerEvent.vue":jo}).forEach(([t,n])=>{const c=n.name||t.substr(t.lastIndexOf("/")+1).replace(/\.\w+$/,"");s.component(c,n.default)})}const Q=_e(Ee);Uo(Q);Q.use(K).mount("#app");export{i as A,T as P,b as _,eo as a,H as b,Ue as c,h as l,z as t};
