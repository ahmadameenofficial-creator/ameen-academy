"use strict";(()=>{var WE=Object.create;var Qv=Object.defineProperty;var XE=Object.getOwnPropertyDescriptor;var qE=Object.getOwnPropertyNames;var YE=Object.getPrototypeOf,ZE=Object.prototype.hasOwnProperty;var ji=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var QE=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qE(t))!ZE.call(n,s)&&s!==e&&Qv(n,s,{get:()=>t[s],enumerable:!(i=XE(t,s))||i.enumerable});return n};var $i=(n,t,e)=>(e=n!=null?WE(YE(n)):{},QE(t||!n||!n.__esModule?Qv(e,"default",{value:n,enumerable:!0}):e,n));var oy=ji(Wt=>{"use strict";var Jp=Symbol.for("react.transitional.element"),KE=Symbol.for("react.portal"),JE=Symbol.for("react.fragment"),jE=Symbol.for("react.strict_mode"),$E=Symbol.for("react.profiler"),tA=Symbol.for("react.consumer"),eA=Symbol.for("react.context"),nA=Symbol.for("react.forward_ref"),iA=Symbol.for("react.suspense"),sA=Symbol.for("react.memo"),ey=Symbol.for("react.lazy"),Kv=Symbol.iterator;function rA(n){return n===null||typeof n!="object"?null:(n=Kv&&n[Kv]||n["@@iterator"],typeof n=="function"?n:null)}var ny={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},iy=Object.assign,sy={};function uo(n,t,e){this.props=n,this.context=t,this.refs=sy,this.updater=e||ny}uo.prototype.isReactComponent={};uo.prototype.setState=function(n,t){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,t,"setState")};uo.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function ry(){}ry.prototype=uo.prototype;function jp(n,t,e){this.props=n,this.context=t,this.refs=sy,this.updater=e||ny}var $p=jp.prototype=new ry;$p.constructor=jp;iy($p,uo.prototype);$p.isPureReactComponent=!0;var Jv=Array.isArray,we={H:null,A:null,T:null,S:null},ay=Object.prototype.hasOwnProperty;function tm(n,t,e,i,s,r){return e=r.ref,{$$typeof:Jp,type:n,key:t,ref:e!==void 0?e:null,props:r}}function aA(n,t){return tm(n.type,t,void 0,void 0,void 0,n.props)}function em(n){return typeof n=="object"&&n!==null&&n.$$typeof===Jp}function oA(n){var t={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(e){return t[e]})}var jv=/\/+/g;function Kp(n,t){return typeof n=="object"&&n!==null&&n.key!=null?oA(""+n.key):t.toString(36)}function $v(){}function lA(n){switch(n.status){case"fulfilled":return n.value;case"rejected":throw n.reason;default:switch(typeof n.status=="string"?n.then($v,$v):(n.status="pending",n.then(function(t){n.status==="pending"&&(n.status="fulfilled",n.value=t)},function(t){n.status==="pending"&&(n.status="rejected",n.reason=t)})),n.status){case"fulfilled":return n.value;case"rejected":throw n.reason}}throw n}function co(n,t,e,i,s){var r=typeof n;(r==="undefined"||r==="boolean")&&(n=null);var a=!1;if(n===null)a=!0;else switch(r){case"bigint":case"string":case"number":a=!0;break;case"object":switch(n.$$typeof){case Jp:case KE:a=!0;break;case ey:return a=n._init,co(a(n._payload),t,e,i,s)}}if(a)return s=s(n),a=i===""?"."+Kp(n,0):i,Jv(s)?(e="",a!=null&&(e=a.replace(jv,"$&/")+"/"),co(s,t,e,"",function(c){return c})):s!=null&&(em(s)&&(s=aA(s,e+(s.key==null||n&&n.key===s.key?"":(""+s.key).replace(jv,"$&/")+"/")+a)),t.push(s)),1;a=0;var o=i===""?".":i+":";if(Jv(n))for(var l=0;l<n.length;l++)i=n[l],r=o+Kp(i,l),a+=co(i,t,e,r,s);else if(l=rA(n),typeof l=="function")for(n=l.call(n),l=0;!(i=n.next()).done;)i=i.value,r=o+Kp(i,l++),a+=co(i,t,e,r,s);else if(r==="object"){if(typeof n.then=="function")return co(lA(n),t,e,i,s);throw t=String(n),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return a}function th(n,t,e){if(n==null)return n;var i=[],s=0;return co(n,i,"","",function(r){return t.call(e,r,s++)}),i}function cA(n){if(n._status===-1){var t=n._result;t=t(),t.then(function(e){(n._status===0||n._status===-1)&&(n._status=1,n._result=e)},function(e){(n._status===0||n._status===-1)&&(n._status=2,n._result=e)}),n._status===-1&&(n._status=0,n._result=t)}if(n._status===1)return n._result.default;throw n._result}var ty=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function uA(){}Wt.Children={map:th,forEach:function(n,t,e){th(n,function(){t.apply(this,arguments)},e)},count:function(n){var t=0;return th(n,function(){t++}),t},toArray:function(n){return th(n,function(t){return t})||[]},only:function(n){if(!em(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Wt.Component=uo;Wt.Fragment=JE;Wt.Profiler=$E;Wt.PureComponent=jp;Wt.StrictMode=jE;Wt.Suspense=iA;Wt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=we;Wt.act=function(){throw Error("act(...) is not supported in production builds of React.")};Wt.cache=function(n){return function(){return n.apply(null,arguments)}};Wt.cloneElement=function(n,t,e){if(n==null)throw Error("The argument must be a React element, but you passed "+n+".");var i=iy({},n.props),s=n.key,r=void 0;if(t!=null)for(a in t.ref!==void 0&&(r=void 0),t.key!==void 0&&(s=""+t.key),t)!ay.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=e;else if(1<a){for(var o=Array(a),l=0;l<a;l++)o[l]=arguments[l+2];i.children=o}return tm(n.type,s,void 0,void 0,r,i)};Wt.createContext=function(n){return n={$$typeof:eA,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null},n.Provider=n,n.Consumer={$$typeof:tA,_context:n},n};Wt.createElement=function(n,t,e){var i,s={},r=null;if(t!=null)for(i in t.key!==void 0&&(r=""+t.key),t)ay.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var a=arguments.length-2;if(a===1)s.children=e;else if(1<a){for(var o=Array(a),l=0;l<a;l++)o[l]=arguments[l+2];s.children=o}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)s[i]===void 0&&(s[i]=a[i]);return tm(n,r,void 0,void 0,null,s)};Wt.createRef=function(){return{current:null}};Wt.forwardRef=function(n){return{$$typeof:nA,render:n}};Wt.isValidElement=em;Wt.lazy=function(n){return{$$typeof:ey,_payload:{_status:-1,_result:n},_init:cA}};Wt.memo=function(n,t){return{$$typeof:sA,type:n,compare:t===void 0?null:t}};Wt.startTransition=function(n){var t=we.T,e={};we.T=e;try{var i=n(),s=we.S;s!==null&&s(e,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(uA,ty)}catch(r){ty(r)}finally{we.T=t}};Wt.unstable_useCacheRefresh=function(){return we.H.useCacheRefresh()};Wt.use=function(n){return we.H.use(n)};Wt.useActionState=function(n,t,e){return we.H.useActionState(n,t,e)};Wt.useCallback=function(n,t){return we.H.useCallback(n,t)};Wt.useContext=function(n){return we.H.useContext(n)};Wt.useDebugValue=function(){};Wt.useDeferredValue=function(n,t){return we.H.useDeferredValue(n,t)};Wt.useEffect=function(n,t){return we.H.useEffect(n,t)};Wt.useId=function(){return we.H.useId()};Wt.useImperativeHandle=function(n,t,e){return we.H.useImperativeHandle(n,t,e)};Wt.useInsertionEffect=function(n,t){return we.H.useInsertionEffect(n,t)};Wt.useLayoutEffect=function(n,t){return we.H.useLayoutEffect(n,t)};Wt.useMemo=function(n,t){return we.H.useMemo(n,t)};Wt.useOptimistic=function(n,t){return we.H.useOptimistic(n,t)};Wt.useReducer=function(n,t,e){return we.H.useReducer(n,t,e)};Wt.useRef=function(n){return we.H.useRef(n)};Wt.useState=function(n){return we.H.useState(n)};Wt.useSyncExternalStore=function(n,t,e){return we.H.useSyncExternalStore(n,t,e)};Wt.useTransition=function(){return we.H.useTransition()};Wt.version="19.0.0"});var ho=ji((TO,ly)=>{"use strict";ly.exports=oy()});var vy=ji(pe=>{"use strict";function rm(n,t){var e=n.length;n.push(t);t:for(;0<e;){var i=e-1>>>1,s=n[i];if(0<eh(s,t))n[i]=t,n[e]=s,e=i;else break t}}function Fi(n){return n.length===0?null:n[0]}function ih(n){if(n.length===0)return null;var t=n[0],e=n.pop();if(e!==t){n[0]=e;t:for(var i=0,s=n.length,r=s>>>1;i<r;){var a=2*(i+1)-1,o=n[a],l=a+1,c=n[l];if(0>eh(o,e))l<s&&0>eh(c,o)?(n[i]=c,n[l]=e,i=l):(n[i]=o,n[a]=e,i=a);else if(l<s&&0>eh(c,e))n[i]=c,n[l]=e,i=l;else break t}}return t}function eh(n,t){var e=n.sortIndex-t.sortIndex;return e!==0?e:n.id-t.id}pe.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(cy=performance,pe.unstable_now=function(){return cy.now()}):(nm=Date,uy=nm.now(),pe.unstable_now=function(){return nm.now()-uy});var cy,nm,uy,ts=[],ir=[],hA=1,gi=null,xn=3,sh=!1,na=!1,Hl=!1,dy=typeof setTimeout=="function"?setTimeout:null,py=typeof clearTimeout=="function"?clearTimeout:null,hy=typeof setImmediate<"u"?setImmediate:null;function nh(n){for(var t=Fi(ir);t!==null;){if(t.callback===null)ih(ir);else if(t.startTime<=n)ih(ir),t.sortIndex=t.expirationTime,rm(ts,t);else break;t=Fi(ir)}}function am(n){if(Hl=!1,nh(n),!na)if(Fi(ts)!==null)na=!0,om();else{var t=Fi(ir);t!==null&&lm(am,t.startTime-n)}}var rh=!1,kl=-1,my=5,gy=-1;function _y(){return!(pe.unstable_now()-gy<my)}function im(){if(rh){var n=pe.unstable_now();gy=n;var t=!0;try{t:{na=!1,Hl&&(Hl=!1,py(kl),kl=-1),sh=!0;var e=xn;try{e:{for(nh(n),gi=Fi(ts);gi!==null&&!(gi.expirationTime>n&&_y());){var i=gi.callback;if(typeof i=="function"){gi.callback=null,xn=gi.priorityLevel;var s=i(gi.expirationTime<=n);if(n=pe.unstable_now(),typeof s=="function"){gi.callback=s,nh(n),t=!0;break e}gi===Fi(ts)&&ih(ts),nh(n)}else ih(ts);gi=Fi(ts)}if(gi!==null)t=!0;else{var r=Fi(ir);r!==null&&lm(am,r.startTime-n),t=!1}}break t}finally{gi=null,xn=e,sh=!1}t=void 0}}finally{t?Fl():rh=!1}}}var Fl;typeof hy=="function"?Fl=function(){hy(im)}:typeof MessageChannel<"u"?(sm=new MessageChannel,fy=sm.port2,sm.port1.onmessage=im,Fl=function(){fy.postMessage(null)}):Fl=function(){dy(im,0)};var sm,fy;function om(){rh||(rh=!0,Fl())}function lm(n,t){kl=dy(function(){n(pe.unstable_now())},t)}pe.unstable_IdlePriority=5;pe.unstable_ImmediatePriority=1;pe.unstable_LowPriority=4;pe.unstable_NormalPriority=3;pe.unstable_Profiling=null;pe.unstable_UserBlockingPriority=2;pe.unstable_cancelCallback=function(n){n.callback=null};pe.unstable_continueExecution=function(){na||sh||(na=!0,om())};pe.unstable_forceFrameRate=function(n){0>n||125<n?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):my=0<n?Math.floor(1e3/n):5};pe.unstable_getCurrentPriorityLevel=function(){return xn};pe.unstable_getFirstCallbackNode=function(){return Fi(ts)};pe.unstable_next=function(n){switch(xn){case 1:case 2:case 3:var t=3;break;default:t=xn}var e=xn;xn=t;try{return n()}finally{xn=e}};pe.unstable_pauseExecution=function(){};pe.unstable_requestPaint=function(){};pe.unstable_runWithPriority=function(n,t){switch(n){case 1:case 2:case 3:case 4:case 5:break;default:n=3}var e=xn;xn=n;try{return t()}finally{xn=e}};pe.unstable_scheduleCallback=function(n,t,e){var i=pe.unstable_now();switch(typeof e=="object"&&e!==null?(e=e.delay,e=typeof e=="number"&&0<e?i+e:i):e=i,n){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=e+s,n={id:hA++,callback:t,priorityLevel:n,startTime:e,expirationTime:s,sortIndex:-1},e>i?(n.sortIndex=e,rm(ir,n),Fi(ts)===null&&n===Fi(ir)&&(Hl?(py(kl),kl=-1):Hl=!0,lm(am,e-i))):(n.sortIndex=s,rm(ts,n),na||sh||(na=!0,om())),n};pe.unstable_shouldYield=_y;pe.unstable_wrapCallback=function(n){var t=xn;return function(){var e=xn;xn=t;try{return n.apply(this,arguments)}finally{xn=e}}}});var xy=ji((AO,yy)=>{"use strict";yy.exports=vy()});var by=ji(Nn=>{"use strict";var fA=ho();function Sy(n){var t="https://react.dev/errors/"+n;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var e=2;e<arguments.length;e++)t+="&args[]="+encodeURIComponent(arguments[e])}return"Minified React error #"+n+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function sr(){}var Ln={d:{f:sr,r:function(){throw Error(Sy(522))},D:sr,C:sr,L:sr,m:sr,X:sr,S:sr,M:sr},p:0,findDOMNode:null},dA=Symbol.for("react.portal");function pA(n,t,e){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dA,key:i==null?null:""+i,children:n,containerInfo:t,implementation:e}}var Vl=fA.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function ah(n,t){if(n==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Nn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Ln;Nn.createPortal=function(n,t){var e=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Sy(299));return pA(n,t,null,e)};Nn.flushSync=function(n){var t=Vl.T,e=Ln.p;try{if(Vl.T=null,Ln.p=2,n)return n()}finally{Vl.T=t,Ln.p=e,Ln.d.f()}};Nn.preconnect=function(n,t){typeof n=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Ln.d.C(n,t))};Nn.prefetchDNS=function(n){typeof n=="string"&&Ln.d.D(n)};Nn.preinit=function(n,t){if(typeof n=="string"&&t&&typeof t.as=="string"){var e=t.as,i=ah(e,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;e==="style"?Ln.d.S(n,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:r}):e==="script"&&Ln.d.X(n,{crossOrigin:i,integrity:s,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Nn.preinitModule=function(n,t){if(typeof n=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var e=ah(t.as,t.crossOrigin);Ln.d.M(n,{crossOrigin:e,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Ln.d.M(n)};Nn.preload=function(n,t){if(typeof n=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var e=t.as,i=ah(e,t.crossOrigin);Ln.d.L(n,e,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Nn.preloadModule=function(n,t){if(typeof n=="string")if(t){var e=ah(t.as,t.crossOrigin);Ln.d.m(n,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:e,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Ln.d.m(n)};Nn.requestFormReset=function(n){Ln.d.r(n)};Nn.unstable_batchedUpdates=function(n,t){return n(t)};Nn.useFormState=function(n,t,e){return Vl.H.useFormState(n,t,e)};Nn.useFormStatus=function(){return Vl.H.useHostTransitionStatus()};Nn.version="19.0.0"});var Ey=ji((RO,Ty)=>{"use strict";function My(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(My)}catch(n){console.error(n)}}My(),Ty.exports=by()});var xb=ji(Af=>{"use strict";var $e=xy(),Wx=ho(),mA=Ey();function j(n){var t="https://react.dev/errors/"+n;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var e=2;e<arguments.length;e++)t+="&args[]="+encodeURIComponent(arguments[e])}return"Minified React error #"+n+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Xx(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}var gA=Symbol.for("react.element"),oh=Symbol.for("react.transitional.element"),Jl=Symbol.for("react.portal"),yo=Symbol.for("react.fragment"),qx=Symbol.for("react.strict_mode"),Hm=Symbol.for("react.profiler"),_A=Symbol.for("react.provider"),Yx=Symbol.for("react.consumer"),Rs=Symbol.for("react.context"),Ng=Symbol.for("react.forward_ref"),km=Symbol.for("react.suspense"),Vm=Symbol.for("react.suspense_list"),Og=Symbol.for("react.memo"),or=Symbol.for("react.lazy"),Zx=Symbol.for("react.offscreen"),vA=Symbol.for("react.memo_cache_sentinel"),Ay=Symbol.iterator;function Gl(n){return n===null||typeof n!="object"?null:(n=Ay&&n[Ay]||n["@@iterator"],typeof n=="function"?n:null)}var yA=Symbol.for("react.client.reference");function Gm(n){if(n==null)return null;if(typeof n=="function")return n.$$typeof===yA?null:n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case yo:return"Fragment";case Jl:return"Portal";case Hm:return"Profiler";case qx:return"StrictMode";case km:return"Suspense";case Vm:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case Rs:return(n.displayName||"Context")+".Provider";case Yx:return(n._context.displayName||"Context")+".Consumer";case Ng:var t=n.render;return n=n.displayName,n||(n=t.displayName||t.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case Og:return t=n.displayName||null,t!==null?t:Gm(n.type)||"Memo";case or:t=n._payload,n=n._init;try{return Gm(n(t))}catch{}}return null}var Ft=Wx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,be=Object.assign,cm,wy;function jl(n){if(cm===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);cm=t&&t[1]||"",wy=-1<e.stack.indexOf(`
    at`)?" (<anonymous>)":-1<e.stack.indexOf("@")?"@unknown:0:0":""}return`
`+cm+n+wy}var um=!1;function hm(n,t){if(!n||um)return"";um=!0;var e=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(h){var f=h}Reflect.construct(n,[],d)}else{try{d.call()}catch(h){f=h}n.call(d.prototype)}}else{try{throw Error()}catch(h){f=h}(d=n())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(h){if(h&&f&&typeof h.stack=="string")return[h.stack,f.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=i.DetermineComponentFrameRoot(),a=r[0],o=r[1];if(a&&o){var l=a.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var u=`
`+l[i].replace(" at new "," at ");return n.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",n.displayName)),u}while(1<=i&&0<=s);break}}}finally{um=!1,Error.prepareStackTrace=e}return(e=n?n.displayName||n.name:"")?jl(e):""}function xA(n){switch(n.tag){case 26:case 27:case 5:return jl(n.type);case 16:return jl("Lazy");case 13:return jl("Suspense");case 19:return jl("SuspenseList");case 0:case 15:return n=hm(n.type,!1),n;case 11:return n=hm(n.type.render,!1),n;case 1:return n=hm(n.type,!0),n;default:return""}}function Ry(n){try{var t="";do t+=xA(n),n=n.return;while(n);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}function Yo(n){var t=n,e=n;if(n.alternate)for(;t.return;)t=t.return;else{n=t;do t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;while(n)}return t.tag===3?e:null}function Qx(n){if(n.tag===13){var t=n.memoizedState;if(t===null&&(n=n.alternate,n!==null&&(t=n.memoizedState)),t!==null)return t.dehydrated}return null}function Cy(n){if(Yo(n)!==n)throw Error(j(188))}function SA(n){var t=n.alternate;if(!t){if(t=Yo(n),t===null)throw Error(j(188));return t!==n?null:n}for(var e=n,i=t;;){var s=e.return;if(s===null)break;var r=s.alternate;if(r===null){if(i=s.return,i!==null){e=i;continue}break}if(s.child===r.child){for(r=s.child;r;){if(r===e)return Cy(s),n;if(r===i)return Cy(s),t;r=r.sibling}throw Error(j(188))}if(e.return!==i.return)e=s,i=r;else{for(var a=!1,o=s.child;o;){if(o===e){a=!0,e=s,i=r;break}if(o===i){a=!0,i=s,e=r;break}o=o.sibling}if(!a){for(o=r.child;o;){if(o===e){a=!0,e=r,i=s;break}if(o===i){a=!0,i=r,e=s;break}o=o.sibling}if(!a)throw Error(j(189))}}if(e.alternate!==i)throw Error(j(190))}if(e.tag!==3)throw Error(j(188));return e.stateNode.current===e?n:t}function Kx(n){var t=n.tag;if(t===5||t===26||t===27||t===6)return n;for(n=n.child;n!==null;){if(t=Kx(n),t!==null)return t;n=n.sibling}return null}var $l=Array.isArray,Se=mA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ca={pending:!1,data:null,method:null,action:null},Wm=[],xo=-1;function os(n){return{current:n}}function ln(n){0>xo||(n.current=Wm[xo],Wm[xo]=null,xo--)}function Ee(n,t){xo++,Wm[xo]=n.current,n.current=t}var is=os(null),_c=os(null),mr=os(null),Bh=os(null);function zh(n,t){switch(Ee(mr,t),Ee(_c,n),Ee(is,null),n=t.nodeType,n){case 9:case 11:t=(t=t.documentElement)&&(t=t.namespaceURI)?Ux(t):0;break;default:if(n=n===8?t.parentNode:t,t=n.tagName,n=n.namespaceURI)n=Ux(n),t=lb(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}ln(is),Ee(is,t)}function zo(){ln(is),ln(_c),ln(mr)}function Xm(n){n.memoizedState!==null&&Ee(Bh,n);var t=is.current,e=lb(t,n.type);t!==e&&(Ee(_c,n),Ee(is,e))}function Fh(n){_c.current===n&&(ln(is),ln(_c)),Bh.current===n&&(ln(Bh),Rc._currentValue=ca)}var qm=Object.prototype.hasOwnProperty,Pg=$e.unstable_scheduleCallback,fm=$e.unstable_cancelCallback,bA=$e.unstable_shouldYield,MA=$e.unstable_requestPaint,ss=$e.unstable_now,TA=$e.unstable_getCurrentPriorityLevel,Jx=$e.unstable_ImmediatePriority,jx=$e.unstable_UserBlockingPriority,Hh=$e.unstable_NormalPriority,EA=$e.unstable_LowPriority,$x=$e.unstable_IdlePriority,AA=$e.log,wA=$e.unstable_setDisableYieldValue,Lc=null,$n=null;function RA(n){if($n&&typeof $n.onCommitFiberRoot=="function")try{$n.onCommitFiberRoot(Lc,n,void 0,(n.current.flags&128)===128)}catch{}}function dr(n){if(typeof AA=="function"&&wA(n),$n&&typeof $n.setStrictMode=="function")try{$n.setStrictMode(Lc,n)}catch{}}var ti=Math.clz32?Math.clz32:UA,CA=Math.log,DA=Math.LN2;function UA(n){return n>>>=0,n===0?32:31-(CA(n)/DA|0)|0}var lh=128,ch=4194304;function sa(n){var t=n&42;if(t!==0)return t;switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194176;case 4194304:case 8388608:case 16777216:case 33554432:return n&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return n}}function ff(n,t){var e=n.pendingLanes;if(e===0)return 0;var i=0,s=n.suspendedLanes,r=n.pingedLanes,a=n.warmLanes;n=n.finishedLanes!==0;var o=e&134217727;return o!==0?(e=o&~s,e!==0?i=sa(e):(r&=o,r!==0?i=sa(r):n||(a=o&~a,a!==0&&(i=sa(a))))):(o=e&~s,o!==0?i=sa(o):r!==0?i=sa(r):n||(a=e&~a,a!==0&&(i=sa(a)))),i===0?0:t!==0&&t!==i&&(t&s)===0&&(s=i&-i,a=t&-t,s>=a||s===32&&(a&4194176)!==0)?t:i}function Nc(n,t){return(n.pendingLanes&~(n.suspendedLanes&~n.pingedLanes)&t)===0}function LA(n,t){switch(n){case 1:case 2:case 4:case 8:return t+250;case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function t1(){var n=lh;return lh<<=1,(lh&4194176)===0&&(lh=128),n}function e1(){var n=ch;return ch<<=1,(ch&62914560)===0&&(ch=4194304),n}function dm(n){for(var t=[],e=0;31>e;e++)t.push(n);return t}function Oc(n,t){n.pendingLanes|=t,t!==268435456&&(n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0)}function NA(n,t,e,i,s,r){var a=n.pendingLanes;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.warmLanes=0,n.expiredLanes&=e,n.entangledLanes&=e,n.errorRecoveryDisabledLanes&=e,n.shellSuspendCounter=0;var o=n.entanglements,l=n.expirationTimes,c=n.hiddenUpdates;for(e=a&~e;0<e;){var u=31-ti(e),d=1<<u;o[u]=0,l[u]=-1;var f=c[u];if(f!==null)for(c[u]=null,u=0;u<f.length;u++){var h=f[u];h!==null&&(h.lane&=-536870913)}e&=~d}i!==0&&n1(n,i,0),r!==0&&s===0&&n.tag!==0&&(n.suspendedLanes|=r&~(a&~t))}function n1(n,t,e){n.pendingLanes|=t,n.suspendedLanes&=~t;var i=31-ti(t);n.entangledLanes|=t,n.entanglements[i]=n.entanglements[i]|1073741824|e&4194218}function i1(n,t){var e=n.entangledLanes|=t;for(n=n.entanglements;e;){var i=31-ti(e),s=1<<i;s&t|n[i]&t&&(n[i]|=t),e&=~s}}function s1(n){return n&=-n,2<n?8<n?(n&134217727)!==0?32:268435456:8:2}function r1(){var n=Se.p;return n!==0?n:(n=window.event,n===void 0?32:vb(n.type))}function OA(n,t){var e=Se.p;try{return Se.p=n,t()}finally{Se.p=e}}var wr=Math.random().toString(36).slice(2),Sn="__reactFiber$"+wr,kn="__reactProps$"+wr,Zo="__reactContainer$"+wr,Ym="__reactEvents$"+wr,PA="__reactListeners$"+wr,IA="__reactHandles$"+wr,Dy="__reactResources$"+wr,vc="__reactMarker$"+wr;function Ig(n){delete n[Sn],delete n[kn],delete n[Ym],delete n[PA],delete n[IA]}function oa(n){var t=n[Sn];if(t)return t;for(var e=n.parentNode;e;){if(t=e[Zo]||e[Sn]){if(e=t.alternate,t.child!==null||e!==null&&e.child!==null)for(n=Nx(n);n!==null;){if(e=n[Sn])return e;n=Nx(n)}return t}n=e,e=n.parentNode}return null}function Qo(n){if(n=n[Sn]||n[Zo]){var t=n.tag;if(t===5||t===6||t===13||t===26||t===27||t===3)return n}return null}function tc(n){var t=n.tag;if(t===5||t===26||t===27||t===6)return n.stateNode;throw Error(j(33))}function Do(n){var t=n[Dy];return t||(t=n[Dy]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function an(n){n[vc]=!0}var a1=new Set,o1={};function xa(n,t){Fo(n,t),Fo(n+"Capture",t)}function Fo(n,t){for(o1[n]=t,n=0;n<t.length;n++)a1.add(t[n])}var Os=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),BA=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Uy={},Ly={};function zA(n){return qm.call(Ly,n)?!0:qm.call(Uy,n)?!1:BA.test(n)?Ly[n]=!0:(Uy[n]=!0,!1)}function Eh(n,t,e){if(zA(t))if(e===null)n.removeAttribute(t);else{switch(typeof e){case"undefined":case"function":case"symbol":n.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){n.removeAttribute(t);return}}n.setAttribute(t,""+e)}}function uh(n,t,e){if(e===null)n.removeAttribute(t);else{switch(typeof e){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(t);return}n.setAttribute(t,""+e)}}function Ss(n,t,e,i){if(i===null)n.removeAttribute(e);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":n.removeAttribute(e);return}n.setAttributeNS(t,e,""+i)}}function xi(n){switch(typeof n){case"bigint":case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function l1(n){var t=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function FA(n){var t=l1(n)?"checked":"value",e=Object.getOwnPropertyDescriptor(n.constructor.prototype,t),i=""+n[t];if(!n.hasOwnProperty(t)&&typeof e<"u"&&typeof e.get=="function"&&typeof e.set=="function"){var s=e.get,r=e.set;return Object.defineProperty(n,t,{configurable:!0,get:function(){return s.call(this)},set:function(a){i=""+a,r.call(this,a)}}),Object.defineProperty(n,t,{enumerable:e.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){n._valueTracker=null,delete n[t]}}}}function kh(n){n._valueTracker||(n._valueTracker=FA(n))}function c1(n){if(!n)return!1;var t=n._valueTracker;if(!t)return!0;var e=t.getValue(),i="";return n&&(i=l1(n)?n.checked?"true":"false":n.value),n=i,n!==e?(t.setValue(n),!0):!1}function Vh(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}var HA=/[\n"\\]/g;function Mi(n){return n.replace(HA,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Zm(n,t,e,i,s,r,a,o){n.name="",a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"?n.type=a:n.removeAttribute("type"),t!=null?a==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+xi(t)):n.value!==""+xi(t)&&(n.value=""+xi(t)):a!=="submit"&&a!=="reset"||n.removeAttribute("value"),t!=null?Qm(n,a,xi(t)):e!=null?Qm(n,a,xi(e)):i!=null&&n.removeAttribute("value"),s==null&&r!=null&&(n.defaultChecked=!!r),s!=null&&(n.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?n.name=""+xi(o):n.removeAttribute("name")}function u1(n,t,e,i,s,r,a,o){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(n.type=r),t!=null||e!=null){if(!(r!=="submit"&&r!=="reset"||t!=null))return;e=e!=null?""+xi(e):"",t=t!=null?""+xi(t):e,o||t===n.value||(n.value=t),n.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,n.checked=o?n.checked:!!i,n.defaultChecked=!!i,a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(n.name=a)}function Qm(n,t,e){t==="number"&&Vh(n.ownerDocument)===n||n.defaultValue===""+e||(n.defaultValue=""+e)}function Uo(n,t,e,i){if(n=n.options,t){t={};for(var s=0;s<e.length;s++)t["$"+e[s]]=!0;for(e=0;e<n.length;e++)s=t.hasOwnProperty("$"+n[e].value),n[e].selected!==s&&(n[e].selected=s),s&&i&&(n[e].defaultSelected=!0)}else{for(e=""+xi(e),t=null,s=0;s<n.length;s++){if(n[s].value===e){n[s].selected=!0,i&&(n[s].defaultSelected=!0);return}t!==null||n[s].disabled||(t=n[s])}t!==null&&(t.selected=!0)}}function h1(n,t,e){if(t!=null&&(t=""+xi(t),t!==n.value&&(n.value=t),e==null)){n.defaultValue!==t&&(n.defaultValue=t);return}n.defaultValue=e!=null?""+xi(e):""}function f1(n,t,e,i){if(t==null){if(i!=null){if(e!=null)throw Error(j(92));if($l(i)){if(1<i.length)throw Error(j(93));i=i[0]}e=i}e==null&&(e=""),t=e}e=xi(t),n.defaultValue=e,i=n.textContent,i===e&&i!==""&&i!==null&&(n.value=i)}function Ho(n,t){if(t){var e=n.firstChild;if(e&&e===n.lastChild&&e.nodeType===3){e.nodeValue=t;return}}n.textContent=t}var kA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ny(n,t,e){var i=t.indexOf("--")===0;e==null||typeof e=="boolean"||e===""?i?n.setProperty(t,""):t==="float"?n.cssFloat="":n[t]="":i?n.setProperty(t,e):typeof e!="number"||e===0||kA.has(t)?t==="float"?n.cssFloat=e:n[t]=(""+e).trim():n[t]=e+"px"}function d1(n,t,e){if(t!=null&&typeof t!="object")throw Error(j(62));if(n=n.style,e!=null){for(var i in e)!e.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?n.setProperty(i,""):i==="float"?n.cssFloat="":n[i]="");for(var s in t)i=t[s],t.hasOwnProperty(s)&&e[s]!==i&&Ny(n,s,i)}else for(var r in t)t.hasOwnProperty(r)&&Ny(n,r,t[r])}function Bg(n){if(n.indexOf("-")===-1)return!1;switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var VA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),GA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ah(n){return GA.test(""+n)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":n}var Km=null;function zg(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var So=null,Lo=null;function Oy(n){var t=Qo(n);if(t&&(n=t.stateNode)){var e=n[kn]||null;t:switch(n=t.stateNode,t.type){case"input":if(Zm(n,e.value,e.defaultValue,e.defaultValue,e.checked,e.defaultChecked,e.type,e.name),t=e.name,e.type==="radio"&&t!=null){for(e=n;e.parentNode;)e=e.parentNode;for(e=e.querySelectorAll('input[name="'+Mi(""+t)+'"][type="radio"]'),t=0;t<e.length;t++){var i=e[t];if(i!==n&&i.form===n.form){var s=i[kn]||null;if(!s)throw Error(j(90));Zm(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<e.length;t++)i=e[t],i.form===n.form&&c1(i)}break t;case"textarea":h1(n,e.value,e.defaultValue);break t;case"select":t=e.value,t!=null&&Uo(n,!!e.multiple,t,!1)}}}var pm=!1;function p1(n,t,e){if(pm)return n(t,e);pm=!0;try{var i=n(t);return i}finally{if(pm=!1,(So!==null||Lo!==null)&&(bf(),So&&(t=So,n=Lo,Lo=So=null,Oy(t),n)))for(t=0;t<n.length;t++)Oy(n[t])}}function yc(n,t){var e=n.stateNode;if(e===null)return null;var i=e[kn]||null;if(i===null)return null;e=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break t;default:n=!1}if(n)return null;if(e&&typeof e!="function")throw Error(j(231,t,typeof e));return e}var Jm=!1;if(Os)try{fo={},Object.defineProperty(fo,"passive",{get:function(){Jm=!0}}),window.addEventListener("test",fo,fo),window.removeEventListener("test",fo,fo)}catch{Jm=!1}var fo,pr=null,Fg=null,wh=null;function m1(){if(wh)return wh;var n,t=Fg,e=t.length,i,s="value"in pr?pr.value:pr.textContent,r=s.length;for(n=0;n<e&&t[n]===s[n];n++);var a=e-n;for(i=1;i<=a&&t[e-i]===s[r-i];i++);return wh=s.slice(n,1<i?1-i:void 0)}function Rh(n){var t=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&t===13&&(n=13)):n=t,n===10&&(n=13),32<=n||n===13?n:0}function hh(){return!0}function Py(){return!1}function Vn(n){function t(e,i,s,r,a){this._reactName=e,this._targetInst=s,this.type=i,this.nativeEvent=r,this.target=a,this.currentTarget=null;for(var o in n)n.hasOwnProperty(o)&&(e=n[o],this[o]=e?e(r):r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?hh:Py,this.isPropagationStopped=Py,this}return be(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!="unknown"&&(e.returnValue=!1),this.isDefaultPrevented=hh)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!="unknown"&&(e.cancelBubble=!0),this.isPropagationStopped=hh)},persist:function(){},isPersistent:hh}),t}var Sa={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},df=Vn(Sa),Pc=be({},Sa,{view:0,detail:0}),WA=Vn(Pc),mm,gm,Wl,pf=be({},Pc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Hg,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Wl&&(Wl&&n.type==="mousemove"?(mm=n.screenX-Wl.screenX,gm=n.screenY-Wl.screenY):gm=mm=0,Wl=n),mm)},movementY:function(n){return"movementY"in n?n.movementY:gm}}),Iy=Vn(pf),XA=be({},pf,{dataTransfer:0}),qA=Vn(XA),YA=be({},Pc,{relatedTarget:0}),_m=Vn(YA),ZA=be({},Sa,{animationName:0,elapsedTime:0,pseudoElement:0}),QA=Vn(ZA),KA=be({},Sa,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),JA=Vn(KA),jA=be({},Sa,{data:0}),By=Vn(jA),$A={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tw={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ew={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nw(n){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(n):(n=ew[n])?!!t[n]:!1}function Hg(){return nw}var iw=be({},Pc,{key:function(n){if(n.key){var t=$A[n.key]||n.key;if(t!=="Unidentified")return t}return n.type==="keypress"?(n=Rh(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?tw[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Hg,charCode:function(n){return n.type==="keypress"?Rh(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Rh(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),sw=Vn(iw),rw=be({},pf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),zy=Vn(rw),aw=be({},Pc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Hg}),ow=Vn(aw),lw=be({},Sa,{propertyName:0,elapsedTime:0,pseudoElement:0}),cw=Vn(lw),uw=be({},pf,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),hw=Vn(uw),fw=be({},Sa,{newState:0,oldState:0}),dw=Vn(fw),pw=[9,13,27,32],kg=Os&&"CompositionEvent"in window,nc=null;Os&&"documentMode"in document&&(nc=document.documentMode);var mw=Os&&"TextEvent"in window&&!nc,g1=Os&&(!kg||nc&&8<nc&&11>=nc),Fy=" ",Hy=!1;function _1(n,t){switch(n){case"keyup":return pw.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function v1(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var bo=!1;function gw(n,t){switch(n){case"compositionend":return v1(t);case"keypress":return t.which!==32?null:(Hy=!0,Fy);case"textInput":return n=t.data,n===Fy&&Hy?null:n;default:return null}}function _w(n,t){if(bo)return n==="compositionend"||!kg&&_1(n,t)?(n=m1(),wh=Fg=pr=null,bo=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return g1&&t.locale!=="ko"?null:t.data;default:return null}}var vw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ky(n){var t=n&&n.nodeName&&n.nodeName.toLowerCase();return t==="input"?!!vw[n.type]:t==="textarea"}function y1(n,t,e,i){So?Lo?Lo.push(i):Lo=[i]:So=i,t=rf(t,"onChange"),0<t.length&&(e=new df("onChange","change",null,e,i),n.push({event:e,listeners:t}))}var ic=null,xc=null;function yw(n){rb(n,0)}function mf(n){var t=tc(n);if(c1(t))return n}function Vy(n,t){if(n==="change")return t}var x1=!1;Os&&(Os?(dh="oninput"in document,dh||(vm=document.createElement("div"),vm.setAttribute("oninput","return;"),dh=typeof vm.oninput=="function"),fh=dh):fh=!1,x1=fh&&(!document.documentMode||9<document.documentMode));var fh,dh,vm;function Gy(){ic&&(ic.detachEvent("onpropertychange",S1),xc=ic=null)}function S1(n){if(n.propertyName==="value"&&mf(xc)){var t=[];y1(t,xc,n,zg(n)),p1(yw,t)}}function xw(n,t,e){n==="focusin"?(Gy(),ic=t,xc=e,ic.attachEvent("onpropertychange",S1)):n==="focusout"&&Gy()}function Sw(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return mf(xc)}function bw(n,t){if(n==="click")return mf(t)}function Mw(n,t){if(n==="input"||n==="change")return mf(t)}function Tw(n,t){return n===t&&(n!==0||1/n===1/t)||n!==n&&t!==t}var ni=typeof Object.is=="function"?Object.is:Tw;function Sc(n,t){if(ni(n,t))return!0;if(typeof n!="object"||n===null||typeof t!="object"||t===null)return!1;var e=Object.keys(n),i=Object.keys(t);if(e.length!==i.length)return!1;for(i=0;i<e.length;i++){var s=e[i];if(!qm.call(t,s)||!ni(n[s],t[s]))return!1}return!0}function Wy(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Xy(n,t){var e=Wy(n);n=0;for(var i;e;){if(e.nodeType===3){if(i=n+e.textContent.length,n<=t&&i>=t)return{node:e,offset:t-n};n=i}t:{for(;e;){if(e.nextSibling){e=e.nextSibling;break t}e=e.parentNode}e=void 0}e=Wy(e)}}function b1(n,t){return n&&t?n===t?!0:n&&n.nodeType===3?!1:t&&t.nodeType===3?b1(n,t.parentNode):"contains"in n?n.contains(t):n.compareDocumentPosition?!!(n.compareDocumentPosition(t)&16):!1:!1}function M1(n){n=n!=null&&n.ownerDocument!=null&&n.ownerDocument.defaultView!=null?n.ownerDocument.defaultView:window;for(var t=Vh(n.document);t instanceof n.HTMLIFrameElement;){try{var e=typeof t.contentWindow.location.href=="string"}catch{e=!1}if(e)n=t.contentWindow;else break;t=Vh(n.document)}return t}function Vg(n){var t=n&&n.nodeName&&n.nodeName.toLowerCase();return t&&(t==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||t==="textarea"||n.contentEditable==="true")}function Ew(n,t){var e=M1(t);t=n.focusedElem;var i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&b1(t.ownerDocument.documentElement,t)){if(i!==null&&Vg(t)){if(n=i.start,e=i.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var s=t.textContent.length,r=Math.min(i.start,s);i=i.end===void 0?r:Math.min(i.end,s),!e.extend&&r>i&&(s=i,i=r,r=s),s=Xy(t,r);var a=Xy(t,i);s&&a&&(e.rangeCount!==1||e.anchorNode!==s.node||e.anchorOffset!==s.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(n=n.createRange(),n.setStart(s.node,s.offset),e.removeAllRanges(),r>i?(e.addRange(n),e.extend(a.node,a.offset)):(n.setEnd(a.node,a.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Aw=Os&&"documentMode"in document&&11>=document.documentMode,Mo=null,jm=null,sc=null,$m=!1;function qy(n,t,e){var i=e.window===e?e.document:e.nodeType===9?e:e.ownerDocument;$m||Mo==null||Mo!==Vh(i)||(i=Mo,"selectionStart"in i&&Vg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),sc&&Sc(sc,i)||(sc=i,i=rf(jm,"onSelect"),0<i.length&&(t=new df("onSelect","select",null,t,e),n.push({event:t,listeners:i}),t.target=Mo)))}function ia(n,t){var e={};return e[n.toLowerCase()]=t.toLowerCase(),e["Webkit"+n]="webkit"+t,e["Moz"+n]="moz"+t,e}var To={animationend:ia("Animation","AnimationEnd"),animationiteration:ia("Animation","AnimationIteration"),animationstart:ia("Animation","AnimationStart"),transitionrun:ia("Transition","TransitionRun"),transitionstart:ia("Transition","TransitionStart"),transitioncancel:ia("Transition","TransitionCancel"),transitionend:ia("Transition","TransitionEnd")},ym={},T1={};Os&&(T1=document.createElement("div").style,"AnimationEvent"in window||(delete To.animationend.animation,delete To.animationiteration.animation,delete To.animationstart.animation),"TransitionEvent"in window||delete To.transitionend.transition);function ba(n){if(ym[n])return ym[n];if(!To[n])return n;var t=To[n],e;for(e in t)if(t.hasOwnProperty(e)&&e in T1)return ym[n]=t[e];return n}var E1=ba("animationend"),A1=ba("animationiteration"),w1=ba("animationstart"),ww=ba("transitionrun"),Rw=ba("transitionstart"),Cw=ba("transitioncancel"),R1=ba("transitionend"),C1=new Map,Yy="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");function Gi(n,t){C1.set(n,t),xa(t,[n])}var yi=[],Eo=0,Gg=0;function gf(){for(var n=Eo,t=Gg=Eo=0;t<n;){var e=yi[t];yi[t++]=null;var i=yi[t];yi[t++]=null;var s=yi[t];yi[t++]=null;var r=yi[t];if(yi[t++]=null,i!==null&&s!==null){var a=i.pending;a===null?s.next=s:(s.next=a.next,a.next=s),i.pending=s}r!==0&&D1(e,s,r)}}function _f(n,t,e,i){yi[Eo++]=n,yi[Eo++]=t,yi[Eo++]=e,yi[Eo++]=i,Gg|=i,n.lanes|=i,n=n.alternate,n!==null&&(n.lanes|=i)}function Wg(n,t,e,i){return _f(n,t,e,i),Gh(n)}function Mr(n,t){return _f(n,null,null,t),Gh(n)}function D1(n,t,e){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e);for(var s=!1,r=n.return;r!==null;)r.childLanes|=e,i=r.alternate,i!==null&&(i.childLanes|=e),r.tag===22&&(n=r.stateNode,n===null||n._visibility&1||(s=!0)),n=r,r=r.return;s&&t!==null&&n.tag===3&&(r=n.stateNode,s=31-ti(e),r=r.hiddenUpdates,n=r[s],n===null?r[s]=[t]:n.push(t),t.lane=e|536870912)}function Gh(n){if(50<gc)throw gc=0,Sg=null,Error(j(185));for(var t=n.return;t!==null;)n=t,t=n.return;return n.tag===3?n.stateNode:null}var Ao={},Zy=new WeakMap;function Ti(n,t){if(typeof n=="object"&&n!==null){var e=Zy.get(n);return e!==void 0?e:(t={value:n,source:t,stack:Ry(t)},Zy.set(n,t),t)}return{value:n,source:t,stack:Ry(t)}}var wo=[],Ro=0,Wh=null,Xh=0,Si=[],bi=0,ua=null,Cs=1,Ds="";function ra(n,t){wo[Ro++]=Xh,wo[Ro++]=Wh,Wh=n,Xh=t}function U1(n,t,e){Si[bi++]=Cs,Si[bi++]=Ds,Si[bi++]=ua,ua=n;var i=Cs;n=Ds;var s=32-ti(i)-1;i&=~(1<<s),e+=1;var r=32-ti(t)+s;if(30<r){var a=s-s%5;r=(i&(1<<a)-1).toString(32),i>>=a,s-=a,Cs=1<<32-ti(t)+s|e<<s|i,Ds=r+n}else Cs=1<<r|e<<s|i,Ds=n}function Xg(n){n.return!==null&&(ra(n,1),U1(n,1,0))}function qg(n){for(;n===Wh;)Wh=wo[--Ro],wo[Ro]=null,Xh=wo[--Ro],wo[Ro]=null;for(;n===ua;)ua=Si[--bi],Si[bi]=null,Ds=Si[--bi],Si[bi]=null,Cs=Si[--bi],Si[bi]=null}var On=null,dn=null,se=!1,ki=null,es=!1,tg=Error(j(519));function ma(n){var t=Error(j(418,""));throw bc(Ti(t,n)),tg}function Qy(n){var t=n.stateNode,e=n.type,i=n.memoizedProps;switch(t[Sn]=n,t[kn]=i,e){case"dialog":Qt("cancel",t),Qt("close",t);break;case"iframe":case"object":case"embed":Qt("load",t);break;case"video":case"audio":for(e=0;e<Ec.length;e++)Qt(Ec[e],t);break;case"source":Qt("error",t);break;case"img":case"image":case"link":Qt("error",t),Qt("load",t);break;case"details":Qt("toggle",t);break;case"input":Qt("invalid",t),u1(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0),kh(t);break;case"select":Qt("invalid",t);break;case"textarea":Qt("invalid",t),f1(t,i.value,i.defaultValue,i.children),kh(t)}e=i.children,typeof e!="string"&&typeof e!="number"&&typeof e!="bigint"||t.textContent===""+e||i.suppressHydrationWarning===!0||ob(t.textContent,e)?(i.popover!=null&&(Qt("beforetoggle",t),Qt("toggle",t)),i.onScroll!=null&&Qt("scroll",t),i.onScrollEnd!=null&&Qt("scrollend",t),i.onClick!=null&&(t.onclick=Tf),t=!0):t=!1,t||ma(n)}function Ky(n){for(On=n.return;On;)switch(On.tag){case 3:case 27:es=!0;return;case 5:case 13:es=!1;return;default:On=On.return}}function Xl(n){if(n!==On)return!1;if(!se)return Ky(n),se=!0,!1;var t=!1,e;if((e=n.tag!==3&&n.tag!==27)&&((e=n.tag===5)&&(e=n.type,e=!(e!=="form"&&e!=="button")||Rg(n.type,n.memoizedProps)),e=!e),e&&(t=!0),t&&dn&&ma(n),Ky(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(j(317));t:{for(n=n.nextSibling,t=0;n;){if(n.nodeType===8)if(e=n.data,e==="/$"){if(t===0){dn=Vi(n.nextSibling);break t}t--}else e!=="$"&&e!=="$!"&&e!=="$?"||t++;n=n.nextSibling}dn=null}}else dn=On?Vi(n.stateNode.nextSibling):null;return!0}function Ic(){dn=On=null,se=!1}function bc(n){ki===null?ki=[n]:ki.push(n)}var rc=Error(j(460)),L1=Error(j(474)),eg={then:function(){}};function Jy(n){return n=n.status,n==="fulfilled"||n==="rejected"}function ph(){}function N1(n,t,e){switch(e=n[e],e===void 0?n.push(t):e!==t&&(t.then(ph,ph),t=e),t.status){case"fulfilled":return t.value;case"rejected":throw n=t.reason,n===rc?Error(j(483)):n;default:if(typeof t.status=="string")t.then(ph,ph);else{if(n=xe,n!==null&&100<n.shellSuspendCounter)throw Error(j(482));n=t,n.status="pending",n.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw n=t.reason,n===rc?Error(j(483)):n}throw ac=t,rc}}var ac=null;function jy(){if(ac===null)throw Error(j(459));var n=ac;return ac=null,n}var No=null,Mc=0;function mh(n){var t=Mc;return Mc+=1,No===null&&(No=[]),N1(No,n,t)}function ql(n,t){t=t.props.ref,n.ref=t!==void 0?t:null}function gh(n,t){throw t.$$typeof===gA?Error(j(525)):(n=Object.prototype.toString.call(t),Error(j(31,n==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":n)))}function $y(n){var t=n._init;return t(n._payload)}function O1(n){function t(p,v){if(n){var y=p.deletions;y===null?(p.deletions=[v],p.flags|=16):y.push(v)}}function e(p,v){if(!n)return null;for(;v!==null;)t(p,v),v=v.sibling;return null}function i(p){for(var v=new Map;p!==null;)p.key!==null?v.set(p.key,p):v.set(p.index,p),p=p.sibling;return v}function s(p,v){return p=vr(p,v),p.index=0,p.sibling=null,p}function r(p,v,y){return p.index=y,n?(y=p.alternate,y!==null?(y=y.index,y<v?(p.flags|=33554434,v):y):(p.flags|=33554434,v)):(p.flags|=1048576,v)}function a(p){return n&&p.alternate===null&&(p.flags|=33554434),p}function o(p,v,y,x){return v===null||v.tag!==6?(v=Um(y,p.mode,x),v.return=p,v):(v=s(v,y),v.return=p,v)}function l(p,v,y,x){var M=y.type;return M===yo?u(p,v,y.props.children,x,y.key):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===or&&$y(M)===v.type)?(v=s(v,y.props),ql(v,y),v.return=p,v):(v=Nh(y.type,y.key,y.props,null,p.mode,x),ql(v,y),v.return=p,v)}function c(p,v,y,x){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=Lm(y,p.mode,x),v.return=p,v):(v=s(v,y.children||[]),v.return=p,v)}function u(p,v,y,x,M){return v===null||v.tag!==7?(v=fa(y,p.mode,x,M),v.return=p,v):(v=s(v,y),v.return=p,v)}function d(p,v,y){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Um(""+v,p.mode,y),v.return=p,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case oh:return y=Nh(v.type,v.key,v.props,null,p.mode,y),ql(y,v),y.return=p,y;case Jl:return v=Lm(v,p.mode,y),v.return=p,v;case or:var x=v._init;return v=x(v._payload),d(p,v,y)}if($l(v)||Gl(v))return v=fa(v,p.mode,y,null),v.return=p,v;if(typeof v.then=="function")return d(p,mh(v),y);if(v.$$typeof===Rs)return d(p,_h(p,v),y);gh(p,v)}return null}function f(p,v,y,x){var M=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return M!==null?null:o(p,v,""+y,x);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case oh:return y.key===M?l(p,v,y,x):null;case Jl:return y.key===M?c(p,v,y,x):null;case or:return M=y._init,y=M(y._payload),f(p,v,y,x)}if($l(y)||Gl(y))return M!==null?null:u(p,v,y,x,null);if(typeof y.then=="function")return f(p,v,mh(y),x);if(y.$$typeof===Rs)return f(p,v,_h(p,y),x);gh(p,y)}return null}function h(p,v,y,x,M){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return p=p.get(y)||null,o(v,p,""+x,M);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case oh:return p=p.get(x.key===null?y:x.key)||null,l(v,p,x,M);case Jl:return p=p.get(x.key===null?y:x.key)||null,c(v,p,x,M);case or:var w=x._init;return x=w(x._payload),h(p,v,y,x,M)}if($l(x)||Gl(x))return p=p.get(y)||null,u(v,p,x,M,null);if(typeof x.then=="function")return h(p,v,y,mh(x),M);if(x.$$typeof===Rs)return h(p,v,y,_h(v,x),M);gh(v,x)}return null}function m(p,v,y,x){for(var M=null,w=null,E=v,R=v=0,b=null;E!==null&&R<y.length;R++){E.index>R?(b=E,E=null):b=E.sibling;var S=f(p,E,y[R],x);if(S===null){E===null&&(E=b);break}n&&E&&S.alternate===null&&t(p,E),v=r(S,v,R),w===null?M=S:w.sibling=S,w=S,E=b}if(R===y.length)return e(p,E),se&&ra(p,R),M;if(E===null){for(;R<y.length;R++)E=d(p,y[R],x),E!==null&&(v=r(E,v,R),w===null?M=E:w.sibling=E,w=E);return se&&ra(p,R),M}for(E=i(E);R<y.length;R++)b=h(E,p,R,y[R],x),b!==null&&(n&&b.alternate!==null&&E.delete(b.key===null?R:b.key),v=r(b,v,R),w===null?M=b:w.sibling=b,w=b);return n&&E.forEach(function(D){return t(p,D)}),se&&ra(p,R),M}function _(p,v,y,x){if(y==null)throw Error(j(151));for(var M=null,w=null,E=v,R=v=0,b=null,S=y.next();E!==null&&!S.done;R++,S=y.next()){E.index>R?(b=E,E=null):b=E.sibling;var D=f(p,E,S.value,x);if(D===null){E===null&&(E=b);break}n&&E&&D.alternate===null&&t(p,E),v=r(D,v,R),w===null?M=D:w.sibling=D,w=D,E=b}if(S.done)return e(p,E),se&&ra(p,R),M;if(E===null){for(;!S.done;R++,S=y.next())S=d(p,S.value,x),S!==null&&(v=r(S,v,R),w===null?M=S:w.sibling=S,w=S);return se&&ra(p,R),M}for(E=i(E);!S.done;R++,S=y.next())S=h(E,p,R,S.value,x),S!==null&&(n&&S.alternate!==null&&E.delete(S.key===null?R:S.key),v=r(S,v,R),w===null?M=S:w.sibling=S,w=S);return n&&E.forEach(function(k){return t(p,k)}),se&&ra(p,R),M}function g(p,v,y,x){if(typeof y=="object"&&y!==null&&y.type===yo&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case oh:t:{for(var M=y.key;v!==null;){if(v.key===M){if(M=y.type,M===yo){if(v.tag===7){e(p,v.sibling),x=s(v,y.props.children),x.return=p,p=x;break t}}else if(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===or&&$y(M)===v.type){e(p,v.sibling),x=s(v,y.props),ql(x,y),x.return=p,p=x;break t}e(p,v);break}else t(p,v);v=v.sibling}y.type===yo?(x=fa(y.props.children,p.mode,x,y.key),x.return=p,p=x):(x=Nh(y.type,y.key,y.props,null,p.mode,x),ql(x,y),x.return=p,p=x)}return a(p);case Jl:t:{for(M=y.key;v!==null;){if(v.key===M)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){e(p,v.sibling),x=s(v,y.children||[]),x.return=p,p=x;break t}else{e(p,v);break}else t(p,v);v=v.sibling}x=Lm(y,p.mode,x),x.return=p,p=x}return a(p);case or:return M=y._init,y=M(y._payload),g(p,v,y,x)}if($l(y))return m(p,v,y,x);if(Gl(y)){if(M=Gl(y),typeof M!="function")throw Error(j(150));return y=M.call(y),_(p,v,y,x)}if(typeof y.then=="function")return g(p,v,mh(y),x);if(y.$$typeof===Rs)return g(p,v,_h(p,y),x);gh(p,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,v!==null&&v.tag===6?(e(p,v.sibling),x=s(v,y),x.return=p,p=x):(e(p,v),x=Um(y,p.mode,x),x.return=p,p=x),a(p)):e(p,v)}return function(p,v,y,x){try{Mc=0;var M=g(p,v,y,x);return No=null,M}catch(E){if(E===rc)throw E;var w=Ei(29,E,null,p.mode);return w.lanes=x,w.return=p,w}}}var ga=O1(!0),P1=O1(!1),ko=os(null),qh=os(0);function tx(n,t){n=Bs,Ee(qh,n),Ee(ko,t),Bs=n|t.baseLanes}function ng(){Ee(qh,Bs),Ee(ko,ko.current)}function Yg(){Bs=qh.current,ln(ko),ln(qh)}var wi=os(null),rs=null;function cr(n){var t=n.alternate;Ee(je,je.current&1),Ee(wi,n),rs===null&&(t===null||ko.current!==null||t.memoizedState!==null)&&(rs=n)}function I1(n){if(n.tag===22){if(Ee(je,je.current),Ee(wi,n),rs===null){var t=n.alternate;t!==null&&t.memoizedState!==null&&(rs=n)}}else ur(n)}function ur(){Ee(je,je.current),Ee(wi,wi.current)}function Us(n){ln(wi),rs===n&&(rs=null),ln(je)}var je=os(0);function Yh(n){for(var t=n;t!==null;){if(t.tag===13){var e=t.memoizedState;if(e!==null&&(e=e.dehydrated,e===null||e.data==="$?"||e.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Dw=typeof AbortController<"u"?AbortController:function(){var n=[],t=this.signal={aborted:!1,addEventListener:function(e,i){n.push(i)}};this.abort=function(){t.aborted=!0,n.forEach(function(e){return e()})}},Uw=$e.unstable_scheduleCallback,Lw=$e.unstable_NormalPriority,Je={$$typeof:Rs,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zg(){return{controller:new Dw,data:new Map,refCount:0}}function Bc(n){n.refCount--,n.refCount===0&&Uw(Lw,function(){n.controller.abort()})}var oc=null,ig=0,Vo=0,Oo=null;function Nw(n,t){if(oc===null){var e=oc=[];ig=0,Vo=_0(),Oo={status:"pending",value:void 0,then:function(i){e.push(i)}}}return ig++,t.then(ex,ex),t}function ex(){if(--ig===0&&oc!==null){Oo!==null&&(Oo.status="fulfilled");var n=oc;oc=null,Vo=0,Oo=null;for(var t=0;t<n.length;t++)(0,n[t])()}}function Ow(n,t){var e=[],i={status:"pending",value:null,reason:null,then:function(s){e.push(s)}};return n.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<e.length;s++)(0,e[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<e.length;s++)(0,e[s])(void 0)}),i}var nx=Ft.S;Ft.S=function(n,t){typeof t=="object"&&t!==null&&typeof t.then=="function"&&Nw(n,t),nx!==null&&nx(n,t)};var ha=os(null);function Qg(){var n=ha.current;return n!==null?n:xe.pooledCache}function Ch(n,t){t===null?Ee(ha,ha.current):Ee(ha,t.pool)}function B1(){var n=Qg();return n===null?null:{parent:Je._currentValue,pool:n}}var Tr=0,qt=null,fe=null,Ze=null,Zh=!1,Po=!1,_a=!1,Qh=0,Tc=0,Io=null,Pw=0;function We(){throw Error(j(321))}function Kg(n,t){if(t===null)return!1;for(var e=0;e<t.length&&e<n.length;e++)if(!ni(n[e],t[e]))return!1;return!0}function Jg(n,t,e,i,s,r){return Tr=r,qt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ft.H=n===null||n.memoizedState===null?Ma:Rr,_a=!1,r=e(i,s),_a=!1,Po&&(r=F1(t,e,i,s)),z1(n),r}function z1(n){Ft.H=as;var t=fe!==null&&fe.next!==null;if(Tr=0,Ze=fe=qt=null,Zh=!1,Tc=0,Io=null,t)throw Error(j(300));n===null||on||(n=n.dependencies,n!==null&&jh(n)&&(on=!0))}function F1(n,t,e,i){qt=n;var s=0;do{if(Po&&(Io=null),Tc=0,Po=!1,25<=s)throw Error(j(301));if(s+=1,Ze=fe=null,n.updateQueue!=null){var r=n.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}Ft.H=Ta,r=t(e,i)}while(Po);return r}function Iw(){var n=Ft.H,t=n.useState()[0];return t=typeof t.then=="function"?zc(t):t,n=n.useState()[0],(fe!==null?fe.memoizedState:null)!==n&&(qt.flags|=1024),t}function jg(){var n=Qh!==0;return Qh=0,n}function $g(n,t,e){t.updateQueue=n.updateQueue,t.flags&=-2053,n.lanes&=~e}function t0(n){if(Zh){for(n=n.memoizedState;n!==null;){var t=n.queue;t!==null&&(t.pending=null),n=n.next}Zh=!1}Tr=0,Ze=fe=qt=null,Po=!1,Tc=Qh=0,Io=null}function Hn(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?qt.memoizedState=Ze=n:Ze=Ze.next=n,Ze}function Qe(){if(fe===null){var n=qt.alternate;n=n!==null?n.memoizedState:null}else n=fe.next;var t=Ze===null?qt.memoizedState:Ze.next;if(t!==null)Ze=t,fe=n;else{if(n===null)throw qt.alternate===null?Error(j(467)):Error(j(310));fe=n,n={memoizedState:fe.memoizedState,baseState:fe.baseState,baseQueue:fe.baseQueue,queue:fe.queue,next:null},Ze===null?qt.memoizedState=Ze=n:Ze=Ze.next=n}return Ze}var vf;vf=function(){return{lastEffect:null,events:null,stores:null,memoCache:null}};function zc(n){var t=Tc;return Tc+=1,Io===null&&(Io=[]),n=N1(Io,n,t),t=qt,(Ze===null?t.memoizedState:Ze.next)===null&&(t=t.alternate,Ft.H=t===null||t.memoizedState===null?Ma:Rr),n}function yf(n){if(n!==null&&typeof n=="object"){if(typeof n.then=="function")return zc(n);if(n.$$typeof===Rs)return bn(n)}throw Error(j(438,String(n)))}function e0(n){var t=null,e=qt.updateQueue;if(e!==null&&(t=e.memoCache),t==null){var i=qt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),e===null&&(e=vf(),qt.updateQueue=e),e.memoCache=t,e=t.data[t.index],e===void 0)for(e=t.data[t.index]=Array(n),i=0;i<n;i++)e[i]=vA;return t.index++,e}function Ps(n,t){return typeof t=="function"?t(n):t}function Dh(n){var t=Qe();return n0(t,fe,n)}function n0(n,t,e){var i=n.queue;if(i===null)throw Error(j(311));i.lastRenderedReducer=e;var s=n.baseQueue,r=i.pending;if(r!==null){if(s!==null){var a=s.next;s.next=r.next,r.next=a}t.baseQueue=s=r,i.pending=null}if(r=n.baseState,s===null)n.memoizedState=r;else{t=s.next;var o=a=null,l=null,c=t,u=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(jt&d)===d:(Tr&d)===d){var f=c.revertLane;if(f===0)l!==null&&(l=l.next={lane:0,revertLane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===Vo&&(u=!0);else if((Tr&f)===f){c=c.next,f===Vo&&(u=!0);continue}else d={lane:0,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,a=r):l=l.next=d,qt.lanes|=f,Ar|=f;d=c.action,_a&&e(r,d),r=c.hasEagerState?c.eagerState:e(r,d)}else f={lane:d,revertLane:c.revertLane,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,a=r):l=l.next=f,qt.lanes|=d,Ar|=d;c=c.next}while(c!==null&&c!==t);if(l===null?a=r:l.next=o,!ni(r,n.memoizedState)&&(on=!0,u&&(e=Oo,e!==null)))throw e;n.memoizedState=r,n.baseState=a,n.baseQueue=l,i.lastRenderedState=r}return s===null&&(i.lanes=0),[n.memoizedState,i.dispatch]}function xm(n){var t=Qe(),e=t.queue;if(e===null)throw Error(j(311));e.lastRenderedReducer=n;var i=e.dispatch,s=e.pending,r=t.memoizedState;if(s!==null){e.pending=null;var a=s=s.next;do r=n(r,a.action),a=a.next;while(a!==s);ni(r,t.memoizedState)||(on=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),e.lastRenderedState=r}return[r,i]}function H1(n,t,e){var i=qt,s=Qe(),r=se;if(r){if(e===void 0)throw Error(j(407));e=e()}else e=t();var a=!ni((fe||s).memoizedState,e);if(a&&(s.memoizedState=e,on=!0),s=s.queue,i0(G1.bind(null,i,s,n),[n]),s.getSnapshot!==t||a||Ze!==null&&Ze.memoizedState.tag&1){if(i.flags|=2048,Go(9,V1.bind(null,i,s,e,t),{destroy:void 0},null),xe===null)throw Error(j(349));r||(Tr&60)!==0||k1(i,t,e)}return e}function k1(n,t,e){n.flags|=16384,n={getSnapshot:t,value:e},t=qt.updateQueue,t===null?(t=vf(),qt.updateQueue=t,t.stores=[n]):(e=t.stores,e===null?t.stores=[n]:e.push(n))}function V1(n,t,e,i){t.value=e,t.getSnapshot=i,W1(t)&&X1(n)}function G1(n,t,e){return e(function(){W1(t)&&X1(n)})}function W1(n){var t=n.getSnapshot;n=n.value;try{var e=t();return!ni(n,e)}catch{return!0}}function X1(n){var t=Mr(n,2);t!==null&&Pn(t,n,2)}function sg(n){var t=Hn();if(typeof n=="function"){var e=n;if(n=e(),_a){dr(!0);try{e()}finally{dr(!1)}}}return t.memoizedState=t.baseState=n,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ps,lastRenderedState:n},t}function q1(n,t,e,i){return n.baseState=e,n0(n,fe,typeof i=="function"?i:Ps)}function Bw(n,t,e,i,s){if(Sf(n))throw Error(j(485));if(n=t.action,n!==null){var r={payload:s,action:n,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(a){r.listeners.push(a)}};Ft.T!==null?e(!0):r.isTransition=!1,i(r),e=t.pending,e===null?(r.next=t.pending=r,Y1(t,r)):(r.next=e.next,t.pending=e.next=r)}}function Y1(n,t){var e=t.action,i=t.payload,s=n.state;if(t.isTransition){var r=Ft.T,a={};Ft.T=a;try{var o=e(s,i),l=Ft.S;l!==null&&l(a,o),ix(n,t,o)}catch(c){rg(n,t,c)}finally{Ft.T=r}}else try{r=e(s,i),ix(n,t,r)}catch(c){rg(n,t,c)}}function ix(n,t,e){e!==null&&typeof e=="object"&&typeof e.then=="function"?e.then(function(i){sx(n,t,i)},function(i){return rg(n,t,i)}):sx(n,t,e)}function sx(n,t,e){t.status="fulfilled",t.value=e,Z1(t),n.state=e,t=n.pending,t!==null&&(e=t.next,e===t?n.pending=null:(e=e.next,t.next=e,Y1(n,e)))}function rg(n,t,e){var i=n.pending;if(n.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=e,Z1(t),t=t.next;while(t!==i)}n.action=null}function Z1(n){n=n.listeners;for(var t=0;t<n.length;t++)(0,n[t])()}function Q1(n,t){return t}function K1(n,t){if(se){var e=xe.formState;if(e!==null){t:{var i=qt;if(se){if(dn){e:{for(var s=dn,r=es;s.nodeType!==8;){if(!r){s=null;break e}if(s=Vi(s.nextSibling),s===null){s=null;break e}}r=s.data,s=r==="F!"||r==="F"?s:null}if(s){dn=Vi(s.nextSibling),i=s.data==="F!";break t}}ma(i)}i=!1}i&&(t=e[0])}}return e=Hn(),e.memoizedState=e.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Q1,lastRenderedState:t},e.queue=i,e=dS.bind(null,qt,i),i.dispatch=e,i=sg(!1),r=o0.bind(null,qt,!1,i.queue),i=Hn(),s={state:t,dispatch:null,action:n,pending:null},i.queue=s,e=Bw.bind(null,qt,s,r,e),s.dispatch=e,i.memoizedState=n,[t,e,!1]}function J1(n){var t=Qe();return j1(t,fe,n)}function j1(n,t,e){t=n0(n,t,Q1)[0],n=Dh(Ps)[0],t=typeof t=="object"&&t!==null&&typeof t.then=="function"?zc(t):t;var i=Qe(),s=i.queue,r=s.dispatch;return e!==i.memoizedState&&(qt.flags|=2048,Go(9,zw.bind(null,s,e),{destroy:void 0},null)),[t,r,n]}function zw(n,t){n.action=t}function $1(n){var t=Qe(),e=fe;if(e!==null)return j1(t,e,n);Qe(),t=t.memoizedState,e=Qe();var i=e.queue.dispatch;return e.memoizedState=n,[t,i,!1]}function Go(n,t,e,i){return n={tag:n,create:t,inst:e,deps:i,next:null},t=qt.updateQueue,t===null&&(t=vf(),qt.updateQueue=t),e=t.lastEffect,e===null?t.lastEffect=n.next=n:(i=e.next,e.next=n,n.next=i,t.lastEffect=n),n}function tS(){return Qe().memoizedState}function Uh(n,t,e,i){var s=Hn();qt.flags|=n,s.memoizedState=Go(1|t,e,{destroy:void 0},i===void 0?null:i)}function xf(n,t,e,i){var s=Qe();i=i===void 0?null:i;var r=s.memoizedState.inst;fe!==null&&i!==null&&Kg(i,fe.memoizedState.deps)?s.memoizedState=Go(t,e,r,i):(qt.flags|=n,s.memoizedState=Go(1|t,e,r,i))}function rx(n,t){Uh(8390656,8,n,t)}function i0(n,t){xf(2048,8,n,t)}function eS(n,t){return xf(4,2,n,t)}function nS(n,t){return xf(4,4,n,t)}function iS(n,t){if(typeof t=="function"){n=n();var e=t(n);return function(){typeof e=="function"?e():t(null)}}if(t!=null)return n=n(),t.current=n,function(){t.current=null}}function sS(n,t,e){e=e!=null?e.concat([n]):null,xf(4,4,iS.bind(null,t,n),e)}function s0(){}function rS(n,t){var e=Qe();t=t===void 0?null:t;var i=e.memoizedState;return t!==null&&Kg(t,i[1])?i[0]:(e.memoizedState=[n,t],n)}function aS(n,t){var e=Qe();t=t===void 0?null:t;var i=e.memoizedState;if(t!==null&&Kg(t,i[1]))return i[0];if(i=n(),_a){dr(!0);try{n()}finally{dr(!1)}}return e.memoizedState=[i,t],i}function r0(n,t,e){return e===void 0||(Tr&1073741824)!==0?n.memoizedState=t:(n.memoizedState=e,n=ZS(),qt.lanes|=n,Ar|=n,e)}function oS(n,t,e,i){return ni(e,t)?e:ko.current!==null?(n=r0(n,e,i),ni(n,t)||(on=!0),n):(Tr&42)===0?(on=!0,n.memoizedState=e):(n=ZS(),qt.lanes|=n,Ar|=n,t)}function lS(n,t,e,i,s){var r=Se.p;Se.p=r!==0&&8>r?r:8;var a=Ft.T,o={};Ft.T=o,o0(n,!1,t,e);try{var l=s(),c=Ft.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=Ow(l,i);lc(n,t,u,ei(n))}else lc(n,t,i,ei(n))}catch(d){lc(n,t,{then:function(){},status:"rejected",reason:d},ei())}finally{Se.p=r,Ft.T=a}}function Fw(){}function ag(n,t,e,i){if(n.tag!==5)throw Error(j(476));var s=cS(n).queue;lS(n,s,t,ca,e===null?Fw:function(){return uS(n),e(i)})}function cS(n){var t=n.memoizedState;if(t!==null)return t;t={memoizedState:ca,baseState:ca,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ps,lastRenderedState:ca},next:null};var e={};return t.next={memoizedState:e,baseState:e,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ps,lastRenderedState:e},next:null},n.memoizedState=t,n=n.alternate,n!==null&&(n.memoizedState=t),t}function uS(n){var t=cS(n).next.queue;lc(n,t,{},ei())}function a0(){return bn(Rc)}function hS(){return Qe().memoizedState}function fS(){return Qe().memoizedState}function Hw(n){for(var t=n.return;t!==null;){switch(t.tag){case 24:case 3:var e=ei();n=gr(e);var i=_r(t,n,e);i!==null&&(Pn(i,t,e),uc(i,t,e)),t={cache:Zg()},n.payload=t;return}t=t.return}}function kw(n,t,e){var i=ei();e={lane:i,revertLane:0,action:e,hasEagerState:!1,eagerState:null,next:null},Sf(n)?pS(t,e):(e=Wg(n,t,e,i),e!==null&&(Pn(e,n,i),mS(e,t,i)))}function dS(n,t,e){var i=ei();lc(n,t,e,i)}function lc(n,t,e,i){var s={lane:i,revertLane:0,action:e,hasEagerState:!1,eagerState:null,next:null};if(Sf(n))pS(t,s);else{var r=n.alternate;if(n.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var a=t.lastRenderedState,o=r(a,e);if(s.hasEagerState=!0,s.eagerState=o,ni(o,a))return _f(n,t,s,0),xe===null&&gf(),!1}catch{}if(e=Wg(n,t,s,i),e!==null)return Pn(e,n,i),mS(e,t,i),!0}return!1}function o0(n,t,e,i){if(i={lane:2,revertLane:_0(),action:i,hasEagerState:!1,eagerState:null,next:null},Sf(n)){if(t)throw Error(j(479))}else t=Wg(n,e,i,2),t!==null&&Pn(t,n,2)}function Sf(n){var t=n.alternate;return n===qt||t!==null&&t===qt}function pS(n,t){Po=Zh=!0;var e=n.pending;e===null?t.next=t:(t.next=e.next,e.next=t),n.pending=t}function mS(n,t,e){if((e&4194176)!==0){var i=t.lanes;i&=n.pendingLanes,e|=i,t.lanes=e,i1(n,e)}}var as={readContext:bn,use:yf,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useLayoutEffect:We,useInsertionEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useSyncExternalStore:We,useId:We};as.useCacheRefresh=We;as.useMemoCache=We;as.useHostTransitionStatus=We;as.useFormState=We;as.useActionState=We;as.useOptimistic=We;var Ma={readContext:bn,use:yf,useCallback:function(n,t){return Hn().memoizedState=[n,t===void 0?null:t],n},useContext:bn,useEffect:rx,useImperativeHandle:function(n,t,e){e=e!=null?e.concat([n]):null,Uh(4194308,4,iS.bind(null,t,n),e)},useLayoutEffect:function(n,t){return Uh(4194308,4,n,t)},useInsertionEffect:function(n,t){Uh(4,2,n,t)},useMemo:function(n,t){var e=Hn();t=t===void 0?null:t;var i=n();if(_a){dr(!0);try{n()}finally{dr(!1)}}return e.memoizedState=[i,t],i},useReducer:function(n,t,e){var i=Hn();if(e!==void 0){var s=e(t);if(_a){dr(!0);try{e(t)}finally{dr(!1)}}}else s=t;return i.memoizedState=i.baseState=s,n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:s},i.queue=n,n=n.dispatch=kw.bind(null,qt,n),[i.memoizedState,n]},useRef:function(n){var t=Hn();return n={current:n},t.memoizedState=n},useState:function(n){n=sg(n);var t=n.queue,e=dS.bind(null,qt,t);return t.dispatch=e,[n.memoizedState,e]},useDebugValue:s0,useDeferredValue:function(n,t){var e=Hn();return r0(e,n,t)},useTransition:function(){var n=sg(!1);return n=lS.bind(null,qt,n.queue,!0,!1),Hn().memoizedState=n,[!1,n]},useSyncExternalStore:function(n,t,e){var i=qt,s=Hn();if(se){if(e===void 0)throw Error(j(407));e=e()}else{if(e=t(),xe===null)throw Error(j(349));(jt&60)!==0||k1(i,t,e)}s.memoizedState=e;var r={value:e,getSnapshot:t};return s.queue=r,rx(G1.bind(null,i,r,n),[n]),i.flags|=2048,Go(9,V1.bind(null,i,r,e,t),{destroy:void 0},null),e},useId:function(){var n=Hn(),t=xe.identifierPrefix;if(se){var e=Ds,i=Cs;e=(i&~(1<<32-ti(i)-1)).toString(32)+e,t=":"+t+"R"+e,e=Qh++,0<e&&(t+="H"+e.toString(32)),t+=":"}else e=Pw++,t=":"+t+"r"+e.toString(32)+":";return n.memoizedState=t},useCacheRefresh:function(){return Hn().memoizedState=Hw.bind(null,qt)}};Ma.useMemoCache=e0;Ma.useHostTransitionStatus=a0;Ma.useFormState=K1;Ma.useActionState=K1;Ma.useOptimistic=function(n){var t=Hn();t.memoizedState=t.baseState=n;var e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=e,t=o0.bind(null,qt,!0,e),e.dispatch=t,[n,t]};var Rr={readContext:bn,use:yf,useCallback:rS,useContext:bn,useEffect:i0,useImperativeHandle:sS,useInsertionEffect:eS,useLayoutEffect:nS,useMemo:aS,useReducer:Dh,useRef:tS,useState:function(){return Dh(Ps)},useDebugValue:s0,useDeferredValue:function(n,t){var e=Qe();return oS(e,fe.memoizedState,n,t)},useTransition:function(){var n=Dh(Ps)[0],t=Qe().memoizedState;return[typeof n=="boolean"?n:zc(n),t]},useSyncExternalStore:H1,useId:hS};Rr.useCacheRefresh=fS;Rr.useMemoCache=e0;Rr.useHostTransitionStatus=a0;Rr.useFormState=J1;Rr.useActionState=J1;Rr.useOptimistic=function(n,t){var e=Qe();return q1(e,fe,n,t)};var Ta={readContext:bn,use:yf,useCallback:rS,useContext:bn,useEffect:i0,useImperativeHandle:sS,useInsertionEffect:eS,useLayoutEffect:nS,useMemo:aS,useReducer:xm,useRef:tS,useState:function(){return xm(Ps)},useDebugValue:s0,useDeferredValue:function(n,t){var e=Qe();return fe===null?r0(e,n,t):oS(e,fe.memoizedState,n,t)},useTransition:function(){var n=xm(Ps)[0],t=Qe().memoizedState;return[typeof n=="boolean"?n:zc(n),t]},useSyncExternalStore:H1,useId:hS};Ta.useCacheRefresh=fS;Ta.useMemoCache=e0;Ta.useHostTransitionStatus=a0;Ta.useFormState=$1;Ta.useActionState=$1;Ta.useOptimistic=function(n,t){var e=Qe();return fe!==null?q1(e,fe,n,t):(e.baseState=n,[n,e.queue.dispatch])};function Sm(n,t,e,i){t=n.memoizedState,e=e(i,t),e=e==null?t:be({},t,e),n.memoizedState=e,n.lanes===0&&(n.updateQueue.baseState=e)}var og={isMounted:function(n){return(n=n._reactInternals)?Yo(n)===n:!1},enqueueSetState:function(n,t,e){n=n._reactInternals;var i=ei(),s=gr(i);s.payload=t,e!=null&&(s.callback=e),t=_r(n,s,i),t!==null&&(Pn(t,n,i),uc(t,n,i))},enqueueReplaceState:function(n,t,e){n=n._reactInternals;var i=ei(),s=gr(i);s.tag=1,s.payload=t,e!=null&&(s.callback=e),t=_r(n,s,i),t!==null&&(Pn(t,n,i),uc(t,n,i))},enqueueForceUpdate:function(n,t){n=n._reactInternals;var e=ei(),i=gr(e);i.tag=2,t!=null&&(i.callback=t),t=_r(n,i,e),t!==null&&(Pn(t,n,e),uc(t,n,e))}};function ax(n,t,e,i,s,r,a){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,r,a):t.prototype&&t.prototype.isPureReactComponent?!Sc(e,i)||!Sc(s,r):!0}function ox(n,t,e,i){n=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(e,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(e,i),t.state!==n&&og.enqueueReplaceState(t,t.state,null)}function va(n,t){var e=t;if("ref"in t){e={};for(var i in t)i!=="ref"&&(e[i]=t[i])}if(n=n.defaultProps){e===t&&(e=be({},e));for(var s in n)e[s]===void 0&&(e[s]=n[s])}return e}var Kh=typeof reportError=="function"?reportError:function(n){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof n=="object"&&n!==null&&typeof n.message=="string"?String(n.message):String(n),error:n});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",n);return}console.error(n)};function gS(n){Kh(n)}function _S(n){console.error(n)}function vS(n){Kh(n)}function Jh(n,t){try{var e=n.onUncaughtError;e(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function lx(n,t,e){try{var i=n.onCaughtError;i(e.value,{componentStack:e.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function lg(n,t,e){return e=gr(e),e.tag=3,e.payload={element:null},e.callback=function(){Jh(n,t)},e}function yS(n){return n=gr(n),n.tag=3,n}function xS(n,t,e,i){var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var r=i.value;n.payload=function(){return s(r)},n.callback=function(){lx(t,e,i)}}var a=e.stateNode;a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){lx(t,e,i),typeof s!="function"&&(yr===null?yr=new Set([this]):yr.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Vw(n,t,e,i,s){if(e.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=e.alternate,t!==null&&Fc(t,e,s,!0),e=wi.current,e!==null){switch(e.tag){case 13:return rs===null?Mg():e.alternate===null&&ze===0&&(ze=3),e.flags&=-257,e.flags|=65536,e.lanes=s,i===eg?e.flags|=16384:(t=e.updateQueue,t===null?e.updateQueue=new Set([i]):t.add(i),Om(n,i,s)),!1;case 22:return e.flags|=65536,i===eg?e.flags|=16384:(t=e.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},e.updateQueue=t):(e=t.retryQueue,e===null?t.retryQueue=new Set([i]):e.add(i)),Om(n,i,s)),!1}throw Error(j(435,e.tag))}return Om(n,i,s),Mg(),!1}if(se)return t=wi.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==tg&&(n=Error(j(422),{cause:i}),bc(Ti(n,e)))):(i!==tg&&(t=Error(j(423),{cause:i}),bc(Ti(t,e))),n=n.current.alternate,n.flags|=65536,s&=-s,n.lanes|=s,i=Ti(i,e),s=lg(n.stateNode,i,s),wm(n,s),ze!==4&&(ze=2)),!1;var r=Error(j(520),{cause:i});if(r=Ti(r,e),pc===null?pc=[r]:pc.push(r),ze!==4&&(ze=2),t===null)return!0;i=Ti(i,e),e=t;do{switch(e.tag){case 3:return e.flags|=65536,n=s&-s,e.lanes|=n,n=lg(e.stateNode,i,n),wm(e,n),!1;case 1:if(t=e.type,r=e.stateNode,(e.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(yr===null||!yr.has(r))))return e.flags|=65536,s&=-s,e.lanes|=s,s=yS(s),xS(s,n,e,i),wm(e,s),!1}e=e.return}while(e!==null);return!1}var SS=Error(j(461)),on=!1;function fn(n,t,e,i){t.child=n===null?P1(t,null,e,i):ga(t,n.child,e,i)}function cx(n,t,e,i,s){e=e.render;var r=t.ref;if("ref"in i){var a={};for(var o in i)o!=="ref"&&(a[o]=i[o])}else a=i;return ya(t),i=Jg(n,t,e,a,r,s),o=jg(),n!==null&&!on?($g(n,t,s),Is(n,t,s)):(se&&o&&Xg(t),t.flags|=1,fn(n,t,i,s),t.child)}function ux(n,t,e,i,s){if(n===null){var r=e.type;return typeof r=="function"&&!f0(r)&&r.defaultProps===void 0&&e.compare===null?(t.tag=15,t.type=r,bS(n,t,r,i,s)):(n=Nh(e.type,null,i,t,t.mode,s),n.ref=t.ref,n.return=t,t.child=n)}if(r=n.child,!l0(n,s)){var a=r.memoizedProps;if(e=e.compare,e=e!==null?e:Sc,e(a,i)&&n.ref===t.ref)return Is(n,t,s)}return t.flags|=1,n=vr(r,i),n.ref=t.ref,n.return=t,t.child=n}function bS(n,t,e,i,s){if(n!==null){var r=n.memoizedProps;if(Sc(r,i)&&n.ref===t.ref)if(on=!1,t.pendingProps=i=r,l0(n,s))(n.flags&131072)!==0&&(on=!0);else return t.lanes=n.lanes,Is(n,t,s)}return cg(n,t,e,i,s)}function MS(n,t,e){var i=t.pendingProps,s=i.children,r=(t.stateNode._pendingVisibility&2)!==0,a=n!==null?n.memoizedState:null;if(cc(n,t),i.mode==="hidden"||r){if((t.flags&128)!==0){if(i=a!==null?a.baseLanes|e:e,n!==null){for(s=t.child=n.child,r=0;s!==null;)r=r|s.lanes|s.childLanes,s=s.sibling;t.childLanes=r&~i}else t.childLanes=0,t.child=null;return hx(n,t,i,e)}if((e&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},n!==null&&Ch(t,a!==null?a.cachePool:null),a!==null?tx(t,a):ng(),I1(t);else return t.lanes=t.childLanes=536870912,hx(n,t,a!==null?a.baseLanes|e:e,e)}else a!==null?(Ch(t,a.cachePool),tx(t,a),ur(t),t.memoizedState=null):(n!==null&&Ch(t,null),ng(),ur(t));return fn(n,t,s,e),t.child}function hx(n,t,e,i){var s=Qg();return s=s===null?null:{parent:Je._currentValue,pool:s},t.memoizedState={baseLanes:e,cachePool:s},n!==null&&Ch(t,null),ng(),I1(t),n!==null&&Fc(n,t,i,!0),null}function cc(n,t){var e=t.ref;if(e===null)n!==null&&n.ref!==null&&(t.flags|=2097664);else{if(typeof e!="function"&&typeof e!="object")throw Error(j(284));(n===null||n.ref!==e)&&(t.flags|=2097664)}}function cg(n,t,e,i,s){return ya(t),e=Jg(n,t,e,i,void 0,s),i=jg(),n!==null&&!on?($g(n,t,s),Is(n,t,s)):(se&&i&&Xg(t),t.flags|=1,fn(n,t,e,s),t.child)}function fx(n,t,e,i,s,r){return ya(t),t.updateQueue=null,e=F1(t,i,e,s),z1(n),i=jg(),n!==null&&!on?($g(n,t,r),Is(n,t,r)):(se&&i&&Xg(t),t.flags|=1,fn(n,t,e,r),t.child)}function dx(n,t,e,i,s){if(ya(t),t.stateNode===null){var r=Ao,a=e.contextType;typeof a=="object"&&a!==null&&(r=bn(a)),r=new e(i,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=og,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=i,r.state=t.memoizedState,r.refs={},c0(t),a=e.contextType,r.context=typeof a=="object"&&a!==null?bn(a):Ao,r.state=t.memoizedState,a=e.getDerivedStateFromProps,typeof a=="function"&&(Sm(t,e,a,i),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(a=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),a!==r.state&&og.enqueueReplaceState(r,r.state,null),fc(t,i,r,s),hc(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(n===null){r=t.stateNode;var o=t.memoizedProps,l=va(e,o);r.props=l;var c=r.context,u=e.contextType;a=Ao,typeof u=="object"&&u!==null&&(a=bn(u));var d=e.getDerivedStateFromProps;u=typeof d=="function"||typeof r.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,u||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o||c!==a)&&ox(t,r,i,a),lr=!1;var f=t.memoizedState;r.state=f,fc(t,i,r,s),hc(),c=t.memoizedState,o||f!==c||lr?(typeof d=="function"&&(Sm(t,e,d,i),c=t.memoizedState),(l=lr||ax(t,e,l,i,f,c,a))?(u||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),r.props=i,r.state=c,r.context=a,i=l):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{r=t.stateNode,mg(n,t),a=t.memoizedProps,u=va(e,a),r.props=u,d=t.pendingProps,f=r.context,c=e.contextType,l=Ao,typeof c=="object"&&c!==null&&(l=bn(c)),o=e.getDerivedStateFromProps,(c=typeof o=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(a!==d||f!==l)&&ox(t,r,i,l),lr=!1,f=t.memoizedState,r.state=f,fc(t,i,r,s),hc();var h=t.memoizedState;a!==d||f!==h||lr||n!==null&&n.dependencies!==null&&jh(n.dependencies)?(typeof o=="function"&&(Sm(t,e,o,i),h=t.memoizedState),(u=lr||ax(t,e,u,i,f,h,l)||n!==null&&n.dependencies!==null&&jh(n.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(i,h,l),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(i,h,l)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=h),r.props=i,r.state=h,r.context=l,i=u):(typeof r.componentDidUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&f===n.memoizedState||(t.flags|=1024),i=!1)}return r=i,cc(n,t),i=(t.flags&128)!==0,r||i?(r=t.stateNode,e=i&&typeof e.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,n!==null&&i?(t.child=ga(t,n.child,null,s),t.child=ga(t,null,e,s)):fn(n,t,e,s),t.memoizedState=r.state,n=t.child):n=Is(n,t,s),n}function px(n,t,e,i){return Ic(),t.flags|=256,fn(n,t,e,i),t.child}var bm={dehydrated:null,treeContext:null,retryLane:0};function Mm(n){return{baseLanes:n,cachePool:B1()}}function Tm(n,t,e){return n=n!==null?n.childLanes&~e:0,t&&(n|=Ai),n}function TS(n,t,e){var i=t.pendingProps,s=!1,r=(t.flags&128)!==0,a;if((a=r)||(a=n!==null&&n.memoizedState===null?!1:(je.current&2)!==0),a&&(s=!0,t.flags&=-129),a=(t.flags&32)!==0,t.flags&=-33,n===null){if(se){if(s?cr(t):ur(t),se){var o=dn,l;if(l=o){t:{for(l=o,o=es;l.nodeType!==8;){if(!o){o=null;break t}if(l=Vi(l.nextSibling),l===null){o=null;break t}}o=l}o!==null?(t.memoizedState={dehydrated:o,treeContext:ua!==null?{id:Cs,overflow:Ds}:null,retryLane:536870912},l=Ei(18,null,null,0),l.stateNode=o,l.return=t,t.child=l,On=t,dn=null,l=!0):l=!1}l||ma(t)}if(o=t.memoizedState,o!==null&&(o=o.dehydrated,o!==null))return o.data==="$!"?t.lanes=16:t.lanes=536870912,null;Us(t)}return o=i.children,i=i.fallback,s?(ur(t),s=t.mode,o=hg({mode:"hidden",children:o},s),i=fa(i,s,e,null),o.return=t,i.return=t,o.sibling=i,t.child=o,s=t.child,s.memoizedState=Mm(e),s.childLanes=Tm(n,a,e),t.memoizedState=bm,i):(cr(t),ug(t,o))}if(l=n.memoizedState,l!==null&&(o=l.dehydrated,o!==null)){if(r)t.flags&256?(cr(t),t.flags&=-257,t=Em(n,t,e)):t.memoizedState!==null?(ur(t),t.child=n.child,t.flags|=128,t=null):(ur(t),s=i.fallback,o=t.mode,i=hg({mode:"visible",children:i.children},o),s=fa(s,o,e,null),s.flags|=2,i.return=t,s.return=t,i.sibling=s,t.child=i,ga(t,n.child,null,e),i=t.child,i.memoizedState=Mm(e),i.childLanes=Tm(n,a,e),t.memoizedState=bm,t=s);else if(cr(t),o.data==="$!"){if(a=o.nextSibling&&o.nextSibling.dataset,a)var c=a.dgst;a=c,i=Error(j(419)),i.stack="",i.digest=a,bc({value:i,source:null,stack:null}),t=Em(n,t,e)}else if(on||Fc(n,t,e,!1),a=(e&n.childLanes)!==0,on||a){if(a=xe,a!==null){if(i=e&-e,(i&42)!==0)i=1;else switch(i){case 2:i=1;break;case 8:i=4;break;case 32:i=16;break;case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:i=64;break;case 268435456:i=134217728;break;default:i=0}if(i=(i&(a.suspendedLanes|e))!==0?0:i,i!==0&&i!==l.retryLane)throw l.retryLane=i,Mr(n,i),Pn(a,n,i),SS}o.data==="$?"||Mg(),t=Em(n,t,e)}else o.data==="$?"?(t.flags|=128,t.child=n.child,t=i2.bind(null,n),o._reactRetry=t,t=null):(n=l.treeContext,dn=Vi(o.nextSibling),On=t,se=!0,ki=null,es=!1,n!==null&&(Si[bi++]=Cs,Si[bi++]=Ds,Si[bi++]=ua,Cs=n.id,Ds=n.overflow,ua=t),t=ug(t,i.children),t.flags|=4096);return t}return s?(ur(t),s=i.fallback,o=t.mode,l=n.child,c=l.sibling,i=vr(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&31457280,c!==null?s=vr(c,s):(s=fa(s,o,e,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,i=s,s=t.child,o=n.child.memoizedState,o===null?o=Mm(e):(l=o.cachePool,l!==null?(c=Je._currentValue,l=l.parent!==c?{parent:c,pool:c}:l):l=B1(),o={baseLanes:o.baseLanes|e,cachePool:l}),s.memoizedState=o,s.childLanes=Tm(n,a,e),t.memoizedState=bm,i):(cr(t),e=n.child,n=e.sibling,e=vr(e,{mode:"visible",children:i.children}),e.return=t,e.sibling=null,n!==null&&(a=t.deletions,a===null?(t.deletions=[n],t.flags|=16):a.push(n)),t.child=e,t.memoizedState=null,e)}function ug(n,t){return t=hg({mode:"visible",children:t},n.mode),t.return=n,n.child=t}function hg(n,t){return qS(n,t,0,null)}function Em(n,t,e){return ga(t,n.child,null,e),n=ug(t,t.pendingProps.children),n.flags|=2,t.memoizedState=null,n}function mx(n,t,e){n.lanes|=t;var i=n.alternate;i!==null&&(i.lanes|=t),dg(n.return,t,e)}function Am(n,t,e,i,s){var r=n.memoizedState;r===null?n.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:e,tailMode:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=e,r.tailMode=s)}function ES(n,t,e){var i=t.pendingProps,s=i.revealOrder,r=i.tail;if(fn(n,t,i.children,e),i=je.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(n!==null&&(n.flags&128)!==0)t:for(n=t.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&mx(n,e,t);else if(n.tag===19)mx(n,e,t);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break t;for(;n.sibling===null;){if(n.return===null||n.return===t)break t;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}switch(Ee(je,i),s){case"forwards":for(e=t.child,s=null;e!==null;)n=e.alternate,n!==null&&Yh(n)===null&&(s=e),e=e.sibling;e=s,e===null?(s=t.child,t.child=null):(s=e.sibling,e.sibling=null),Am(t,!1,s,e,r);break;case"backwards":for(e=null,s=t.child,t.child=null;s!==null;){if(n=s.alternate,n!==null&&Yh(n)===null){t.child=s;break}n=s.sibling,s.sibling=e,e=s,s=n}Am(t,!0,e,null,r);break;case"together":Am(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Is(n,t,e){if(n!==null&&(t.dependencies=n.dependencies),Ar|=t.lanes,(e&t.childLanes)===0)if(n!==null){if(Fc(n,t,e,!1),(e&t.childLanes)===0)return null}else return null;if(n!==null&&t.child!==n.child)throw Error(j(153));if(t.child!==null){for(n=t.child,e=vr(n,n.pendingProps),t.child=e,e.return=t;n.sibling!==null;)n=n.sibling,e=e.sibling=vr(n,n.pendingProps),e.return=t;e.sibling=null}return t.child}function l0(n,t){return(n.lanes&t)!==0?!0:(n=n.dependencies,!!(n!==null&&jh(n)))}function Gw(n,t,e){switch(t.tag){case 3:zh(t,t.stateNode.containerInfo),hr(t,Je,n.memoizedState.cache),Ic();break;case 27:case 5:Xm(t);break;case 4:zh(t,t.stateNode.containerInfo);break;case 10:hr(t,t.type,t.memoizedProps.value);break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(cr(t),t.flags|=128,null):(e&t.child.childLanes)!==0?TS(n,t,e):(cr(t),n=Is(n,t,e),n!==null?n.sibling:null);cr(t);break;case 19:var s=(n.flags&128)!==0;if(i=(e&t.childLanes)!==0,i||(Fc(n,t,e,!1),i=(e&t.childLanes)!==0),s){if(i)return ES(n,t,e);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Ee(je,je.current),i)break;return null;case 22:case 23:return t.lanes=0,MS(n,t,e);case 24:hr(t,Je,n.memoizedState.cache)}return Is(n,t,e)}function AS(n,t,e){if(n!==null)if(n.memoizedProps!==t.pendingProps)on=!0;else{if(!l0(n,e)&&(t.flags&128)===0)return on=!1,Gw(n,t,e);on=(n.flags&131072)!==0}else on=!1,se&&(t.flags&1048576)!==0&&U1(t,Xh,t.index);switch(t.lanes=0,t.tag){case 16:t:{n=t.pendingProps;var i=t.elementType,s=i._init;if(i=s(i._payload),t.type=i,typeof i=="function")f0(i)?(n=va(i,n),t.tag=1,t=dx(null,t,i,n,e)):(t.tag=0,t=cg(null,t,i,n,e));else{if(i!=null){if(s=i.$$typeof,s===Ng){t.tag=11,t=cx(null,t,i,n,e);break t}else if(s===Og){t.tag=14,t=ux(null,t,i,n,e);break t}}throw t=Gm(i)||i,Error(j(306,t,""))}}return t;case 0:return cg(n,t,t.type,t.pendingProps,e);case 1:return i=t.type,s=va(i,t.pendingProps),dx(n,t,i,s,e);case 3:t:{if(zh(t,t.stateNode.containerInfo),n===null)throw Error(j(387));var r=t.pendingProps;s=t.memoizedState,i=s.element,mg(n,t),fc(t,r,null,e);var a=t.memoizedState;if(r=a.cache,hr(t,Je,r),r!==s.cache&&pg(t,[Je],e,!0),hc(),r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=px(n,t,r,e);break t}else if(r!==i){i=Ti(Error(j(424)),t),bc(i),t=px(n,t,r,e);break t}else for(dn=Vi(t.stateNode.containerInfo.firstChild),On=t,se=!0,ki=null,es=!0,e=P1(t,null,r,e),t.child=e;e;)e.flags=e.flags&-3|4096,e=e.sibling;else{if(Ic(),r===i){t=Is(n,t,e);break t}fn(n,t,r,e)}t=t.child}return t;case 26:return cc(n,t),n===null?(e=Px(t.type,null,t.pendingProps,null))?t.memoizedState=e:se||(e=t.type,n=t.pendingProps,i=af(mr.current).createElement(e),i[Sn]=t,i[kn]=n,pn(i,e,n),an(i),t.stateNode=i):t.memoizedState=Px(t.type,n.memoizedProps,t.pendingProps,n.memoizedState),null;case 27:return Xm(t),n===null&&se&&(i=t.stateNode=ub(t.type,t.pendingProps,mr.current),On=t,es=!0,dn=Vi(i.firstChild)),i=t.pendingProps.children,n!==null||se?fn(n,t,i,e):t.child=ga(t,null,i,e),cc(n,t),t.child;case 5:return n===null&&se&&((s=i=dn)&&(i=_2(i,t.type,t.pendingProps,es),i!==null?(t.stateNode=i,On=t,dn=Vi(i.firstChild),es=!1,s=!0):s=!1),s||ma(t)),Xm(t),s=t.type,r=t.pendingProps,a=n!==null?n.memoizedProps:null,i=r.children,Rg(s,r)?i=null:a!==null&&Rg(s,a)&&(t.flags|=32),t.memoizedState!==null&&(s=Jg(n,t,Iw,null,null,e),Rc._currentValue=s),cc(n,t),fn(n,t,i,e),t.child;case 6:return n===null&&se&&((n=e=dn)&&(e=v2(e,t.pendingProps,es),e!==null?(t.stateNode=e,On=t,dn=null,n=!0):n=!1),n||ma(t)),null;case 13:return TS(n,t,e);case 4:return zh(t,t.stateNode.containerInfo),i=t.pendingProps,n===null?t.child=ga(t,null,i,e):fn(n,t,i,e),t.child;case 11:return cx(n,t,t.type,t.pendingProps,e);case 7:return fn(n,t,t.pendingProps,e),t.child;case 8:return fn(n,t,t.pendingProps.children,e),t.child;case 12:return fn(n,t,t.pendingProps.children,e),t.child;case 10:return i=t.pendingProps,hr(t,t.type,i.value),fn(n,t,i.children,e),t.child;case 9:return s=t.type._context,i=t.pendingProps.children,ya(t),s=bn(s),i=i(s),t.flags|=1,fn(n,t,i,e),t.child;case 14:return ux(n,t,t.type,t.pendingProps,e);case 15:return bS(n,t,t.type,t.pendingProps,e);case 19:return ES(n,t,e);case 22:return MS(n,t,e);case 24:return ya(t),i=bn(Je),n===null?(s=Qg(),s===null&&(s=xe,r=Zg(),s.pooledCache=r,r.refCount++,r!==null&&(s.pooledCacheLanes|=e),s=r),t.memoizedState={parent:i,cache:s},c0(t),hr(t,Je,s)):((n.lanes&e)!==0&&(mg(n,t),fc(t,null,null,e),hc()),s=n.memoizedState,r=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),hr(t,Je,i)):(i=r.cache,hr(t,Je,i),i!==s.cache&&pg(t,[Je],e,!0))),fn(n,t,t.pendingProps.children,e),t.child;case 29:throw t.pendingProps}throw Error(j(156,t.tag))}var fg=os(null),Ea=null,Ls=null;function hr(n,t,e){Ee(fg,t._currentValue),t._currentValue=e}function Ns(n){n._currentValue=fg.current,ln(fg)}function dg(n,t,e){for(;n!==null;){var i=n.alternate;if((n.childLanes&t)!==t?(n.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),n===e)break;n=n.return}}function pg(n,t,e,i){var s=n.child;for(s!==null&&(s.return=n);s!==null;){var r=s.dependencies;if(r!==null){var a=s.child;r=r.firstContext;t:for(;r!==null;){var o=r;r=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){r.lanes|=e,o=r.alternate,o!==null&&(o.lanes|=e),dg(r.return,e,n),i||(a=null);break t}r=o.next}}else if(s.tag===18){if(a=s.return,a===null)throw Error(j(341));a.lanes|=e,r=a.alternate,r!==null&&(r.lanes|=e),dg(a,e,n),a=null}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===n){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}}function Fc(n,t,e,i){n=null;for(var s=t,r=!1;s!==null;){if(!r){if((s.flags&524288)!==0)r=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var a=s.alternate;if(a===null)throw Error(j(387));if(a=a.memoizedProps,a!==null){var o=s.type;ni(s.pendingProps.value,a.value)||(n!==null?n.push(o):n=[o])}}else if(s===Bh.current){if(a=s.alternate,a===null)throw Error(j(387));a.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(n!==null?n.push(Rc):n=[Rc])}s=s.return}n!==null&&pg(t,n,e,i),t.flags|=262144}function jh(n){for(n=n.firstContext;n!==null;){if(!ni(n.context._currentValue,n.memoizedValue))return!0;n=n.next}return!1}function ya(n){Ea=n,Ls=null,n=n.dependencies,n!==null&&(n.firstContext=null)}function bn(n){return wS(Ea,n)}function _h(n,t){return Ea===null&&ya(n),wS(n,t)}function wS(n,t){var e=t._currentValue;if(t={context:t,memoizedValue:e,next:null},Ls===null){if(n===null)throw Error(j(308));Ls=t,n.dependencies={lanes:0,firstContext:t},n.flags|=524288}else Ls=Ls.next=t;return e}var lr=!1;function c0(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mg(n,t){n=n.updateQueue,t.updateQueue===n&&(t.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,callbacks:null})}function gr(n){return{lane:n,tag:0,payload:null,callback:null,next:null}}function _r(n,t,e){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,(Ce&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=Gh(n),D1(n,null,e),t}return _f(n,i,t,e),Gh(n)}function uc(n,t,e){if(t=t.updateQueue,t!==null&&(t=t.shared,(e&4194176)!==0)){var i=t.lanes;i&=n.pendingLanes,e|=i,t.lanes=e,i1(n,e)}}function wm(n,t){var e=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,e===i)){var s=null,r=null;if(e=e.firstBaseUpdate,e!==null){do{var a={lane:e.lane,tag:e.tag,payload:e.payload,callback:null,next:null};r===null?s=r=a:r=r.next=a,e=e.next}while(e!==null);r===null?s=r=t:r=r.next=t}else s=r=t;e={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:r,shared:i.shared,callbacks:i.callbacks},n.updateQueue=e;return}n=e.lastBaseUpdate,n===null?e.firstBaseUpdate=t:n.next=t,e.lastBaseUpdate=t}var gg=!1;function hc(){if(gg){var n=Oo;if(n!==null)throw n}}function fc(n,t,e,i){gg=!1;var s=n.updateQueue;lr=!1;var r=s.firstBaseUpdate,a=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?r=c:a.next=c,a=l;var u=n.alternate;u!==null&&(u=u.updateQueue,o=u.lastBaseUpdate,o!==a&&(o===null?u.firstBaseUpdate=c:o.next=c,u.lastBaseUpdate=l))}if(r!==null){var d=s.baseState;a=0,u=c=l=null,o=r;do{var f=o.lane&-536870913,h=f!==o.lane;if(h?(jt&f)===f:(i&f)===f){f!==0&&f===Vo&&(gg=!0),u!==null&&(u=u.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var m=n,_=o;f=t;var g=e;switch(_.tag){case 1:if(m=_.payload,typeof m=="function"){d=m.call(g,d,f);break t}d=m;break t;case 3:m.flags=m.flags&-65537|128;case 0:if(m=_.payload,f=typeof m=="function"?m.call(g,d,f):m,f==null)break t;d=be({},d,f);break t;case 2:lr=!0}}f=o.callback,f!==null&&(n.flags|=64,h&&(n.flags|=8192),h=s.callbacks,h===null?s.callbacks=[f]:h.push(f))}else h={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},u===null?(c=u=h,l=d):u=u.next=h,a|=f;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;h=o,o=h.next,h.next=null,s.lastBaseUpdate=h,s.shared.pending=null}}while(!0);u===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=u,r===null&&(s.shared.lanes=0),Ar|=a,n.lanes=a,n.memoizedState=d}}function RS(n,t){if(typeof n!="function")throw Error(j(191,n));n.call(t)}function CS(n,t){var e=n.callbacks;if(e!==null)for(n.callbacks=null,n=0;n<e.length;n++)RS(e[n],t)}function Hc(n,t){try{var e=t.updateQueue,i=e!==null?e.lastEffect:null;if(i!==null){var s=i.next;e=s;do{if((e.tag&n)===n){i=void 0;var r=e.create,a=e.inst;i=r(),a.destroy=i}e=e.next}while(e!==s)}}catch(o){me(t,t.return,o)}}function Er(n,t,e){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var r=s.next;i=r;do{if((i.tag&n)===n){var a=i.inst,o=a.destroy;if(o!==void 0){a.destroy=void 0,s=t;var l=e;try{o()}catch(c){me(s,l,c)}}}i=i.next}while(i!==r)}}catch(c){me(t,t.return,c)}}function DS(n){var t=n.updateQueue;if(t!==null){var e=n.stateNode;try{CS(t,e)}catch(i){me(n,n.return,i)}}}function US(n,t,e){e.props=va(n.type,n.memoizedProps),e.state=n.memoizedState;try{e.componentWillUnmount()}catch(i){me(n,t,i)}}function la(n,t){try{var e=n.ref;if(e!==null){var i=n.stateNode;switch(n.tag){case 26:case 27:case 5:var s=i;break;default:s=i}typeof e=="function"?n.refCleanup=e(s):e.current=s}}catch(r){me(n,t,r)}}function jn(n,t){var e=n.ref,i=n.refCleanup;if(e!==null)if(typeof i=="function")try{i()}catch(s){me(n,t,s)}finally{n.refCleanup=null,n=n.alternate,n!=null&&(n.refCleanup=null)}else if(typeof e=="function")try{e(null)}catch(s){me(n,t,s)}else e.current=null}function LS(n){var t=n.type,e=n.memoizedProps,i=n.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":e.autoFocus&&i.focus();break t;case"img":e.src?i.src=e.src:e.srcSet&&(i.srcset=e.srcSet)}}catch(s){me(n,n.return,s)}}function gx(n,t,e){try{var i=n.stateNode;f2(i,n.type,e,t),i[kn]=t}catch(s){me(n,n.return,s)}}function NS(n){return n.tag===5||n.tag===3||n.tag===26||n.tag===27||n.tag===4}function Rm(n){t:for(;;){for(;n.sibling===null;){if(n.return===null||NS(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==27&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue t;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function _g(n,t,e){var i=n.tag;if(i===5||i===6)n=n.stateNode,t?e.nodeType===8?e.parentNode.insertBefore(n,t):e.insertBefore(n,t):(e.nodeType===8?(t=e.parentNode,t.insertBefore(n,e)):(t=e,t.appendChild(n)),e=e._reactRootContainer,e!=null||t.onclick!==null||(t.onclick=Tf));else if(i!==4&&i!==27&&(n=n.child,n!==null))for(_g(n,t,e),n=n.sibling;n!==null;)_g(n,t,e),n=n.sibling}function $h(n,t,e){var i=n.tag;if(i===5||i===6)n=n.stateNode,t?e.insertBefore(n,t):e.appendChild(n);else if(i!==4&&i!==27&&(n=n.child,n!==null))for($h(n,t,e),n=n.sibling;n!==null;)$h(n,t,e),n=n.sibling}var Es=!1,Be=!1,Cm=!1,_x=typeof WeakSet=="function"?WeakSet:Set,rn=null,vx=!1;function Ww(n,t){if(n=n.containerInfo,Ag=uf,n=M1(n),Vg(n)){if("selectionStart"in n)var e={start:n.selectionStart,end:n.selectionEnd};else t:{e=(e=n.ownerDocument)&&e.defaultView||window;var i=e.getSelection&&e.getSelection();if(i&&i.rangeCount!==0){e=i.anchorNode;var s=i.anchorOffset,r=i.focusNode;i=i.focusOffset;try{e.nodeType,r.nodeType}catch{e=null;break t}var a=0,o=-1,l=-1,c=0,u=0,d=n,f=null;e:for(;;){for(var h;d!==e||s!==0&&d.nodeType!==3||(o=a+s),d!==r||i!==0&&d.nodeType!==3||(l=a+i),d.nodeType===3&&(a+=d.nodeValue.length),(h=d.firstChild)!==null;)f=d,d=h;for(;;){if(d===n)break e;if(f===e&&++c===s&&(o=a),f===r&&++u===i&&(l=a),(h=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=h}e=o===-1||l===-1?null:{start:o,end:l}}else e=null}e=e||{start:0,end:0}}else e=null;for(wg={focusedElem:n,selectionRange:e},uf=!1,rn=t;rn!==null;)if(t=rn,n=t.child,(t.subtreeFlags&1028)!==0&&n!==null)n.return=t,rn=n;else for(;rn!==null;){switch(t=rn,r=t.alternate,n=t.flags,t.tag){case 0:break;case 11:case 15:break;case 1:if((n&1024)!==0&&r!==null){n=void 0,e=t,s=r.memoizedProps,r=r.memoizedState,i=e.stateNode;try{var m=va(e.type,s,e.elementType===e.type);n=i.getSnapshotBeforeUpdate(m,r),i.__reactInternalSnapshotBeforeUpdate=n}catch(_){me(e,e.return,_)}}break;case 3:if((n&1024)!==0){if(n=t.stateNode.containerInfo,e=n.nodeType,e===9)Cg(n);else if(e===1)switch(n.nodeName){case"HEAD":case"HTML":case"BODY":Cg(n);break;default:n.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((n&1024)!==0)throw Error(j(163))}if(n=t.sibling,n!==null){n.return=t.return,rn=n;break}rn=t.return}return m=vx,vx=!1,m}function OS(n,t,e){var i=e.flags;switch(e.tag){case 0:case 11:case 15:Ms(n,e),i&4&&Hc(5,e);break;case 1:if(Ms(n,e),i&4)if(n=e.stateNode,t===null)try{n.componentDidMount()}catch(o){me(e,e.return,o)}else{var s=va(e.type,t.memoizedProps);t=t.memoizedState;try{n.componentDidUpdate(s,t,n.__reactInternalSnapshotBeforeUpdate)}catch(o){me(e,e.return,o)}}i&64&&DS(e),i&512&&la(e,e.return);break;case 3:if(Ms(n,e),i&64&&(i=e.updateQueue,i!==null)){if(n=null,e.child!==null)switch(e.child.tag){case 27:case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}try{CS(i,n)}catch(o){me(e,e.return,o)}}break;case 26:Ms(n,e),i&512&&la(e,e.return);break;case 27:case 5:Ms(n,e),t===null&&i&4&&LS(e),i&512&&la(e,e.return);break;case 12:Ms(n,e);break;case 13:Ms(n,e),i&4&&BS(n,e);break;case 22:if(s=e.memoizedState!==null||Es,!s){t=t!==null&&t.memoizedState!==null||Be;var r=Es,a=Be;Es=s,(Be=t)&&!a?ar(n,e,(e.subtreeFlags&8772)!==0):Ms(n,e),Es=r,Be=a}i&512&&(e.memoizedProps.mode==="manual"?la(e,e.return):jn(e,e.return));break;default:Ms(n,e)}}function PS(n){var t=n.alternate;t!==null&&(n.alternate=null,PS(t)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(t=n.stateNode,t!==null&&Ig(t)),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}var Ye=null,Kn=!1;function bs(n,t,e){for(e=e.child;e!==null;)IS(n,t,e),e=e.sibling}function IS(n,t,e){if($n&&typeof $n.onCommitFiberUnmount=="function")try{$n.onCommitFiberUnmount(Lc,e)}catch{}switch(e.tag){case 26:Be||jn(e,t),bs(n,t,e),e.memoizedState?e.memoizedState.count--:e.stateNode&&(e=e.stateNode,e.parentNode.removeChild(e));break;case 27:Be||jn(e,t);var i=Ye,s=Kn;for(Ye=e.stateNode,bs(n,t,e),e=e.stateNode,t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Ig(e),Ye=i,Kn=s;break;case 5:Be||jn(e,t);case 6:s=Ye;var r=Kn;if(Ye=null,bs(n,t,e),Ye=s,Kn=r,Ye!==null)if(Kn)try{n=Ye,i=e.stateNode,n.nodeType===8?n.parentNode.removeChild(i):n.removeChild(i)}catch(a){me(e,t,a)}else try{Ye.removeChild(e.stateNode)}catch(a){me(e,t,a)}break;case 18:Ye!==null&&(Kn?(t=Ye,e=e.stateNode,t.nodeType===8?Fm(t.parentNode,e):t.nodeType===1&&Fm(t,e),Uc(t)):Fm(Ye,e.stateNode));break;case 4:i=Ye,s=Kn,Ye=e.stateNode.containerInfo,Kn=!0,bs(n,t,e),Ye=i,Kn=s;break;case 0:case 11:case 14:case 15:Be||Er(2,e,t),Be||Er(4,e,t),bs(n,t,e);break;case 1:Be||(jn(e,t),i=e.stateNode,typeof i.componentWillUnmount=="function"&&US(e,t,i)),bs(n,t,e);break;case 21:bs(n,t,e);break;case 22:Be||jn(e,t),Be=(i=Be)||e.memoizedState!==null,bs(n,t,e),Be=i;break;default:bs(n,t,e)}}function BS(n,t){if(t.memoizedState===null&&(n=t.alternate,n!==null&&(n=n.memoizedState,n!==null&&(n=n.dehydrated,n!==null))))try{Uc(n)}catch(e){me(t,t.return,e)}}function Xw(n){switch(n.tag){case 13:case 19:var t=n.stateNode;return t===null&&(t=n.stateNode=new _x),t;case 22:return n=n.stateNode,t=n._retryCache,t===null&&(t=n._retryCache=new _x),t;default:throw Error(j(435,n.tag))}}function Dm(n,t){var e=Xw(n);t.forEach(function(i){var s=s2.bind(null,n,i);e.has(i)||(e.add(i),i.then(s,s))})}function _i(n,t){var e=t.deletions;if(e!==null)for(var i=0;i<e.length;i++){var s=e[i],r=n,a=t,o=a;t:for(;o!==null;){switch(o.tag){case 27:case 5:Ye=o.stateNode,Kn=!1;break t;case 3:Ye=o.stateNode.containerInfo,Kn=!0;break t;case 4:Ye=o.stateNode.containerInfo,Kn=!0;break t}o=o.return}if(Ye===null)throw Error(j(160));IS(r,a,s),Ye=null,Kn=!1,r=s.alternate,r!==null&&(r.return=null),s.return=null}if(t.subtreeFlags&13878)for(t=t.child;t!==null;)zS(t,n),t=t.sibling}var Hi=null;function zS(n,t){var e=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:_i(t,n),vi(n),i&4&&(Er(3,n,n.return),Hc(3,n),Er(5,n,n.return));break;case 1:_i(t,n),vi(n),i&512&&(Be||e===null||jn(e,e.return)),i&64&&Es&&(n=n.updateQueue,n!==null&&(i=n.callbacks,i!==null&&(e=n.shared.hiddenCallbacks,n.shared.hiddenCallbacks=e===null?i:e.concat(i))));break;case 26:var s=Hi;if(_i(t,n),vi(n),i&512&&(Be||e===null||jn(e,e.return)),i&4){var r=e!==null?e.memoizedState:null;if(i=n.memoizedState,e===null)if(i===null)if(n.stateNode===null){t:{i=n.type,e=n.memoizedProps,s=s.ownerDocument||s;e:switch(i){case"title":r=s.getElementsByTagName("title")[0],(!r||r[vc]||r[Sn]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=s.createElement(i),s.head.insertBefore(r,s.querySelector("head > title"))),pn(r,i,e),r[Sn]=n,an(r),i=r;break t;case"link":var a=Bx("link","href",s).get(i+(e.href||""));if(a){for(var o=0;o<a.length;o++)if(r=a[o],r.getAttribute("href")===(e.href==null?null:e.href)&&r.getAttribute("rel")===(e.rel==null?null:e.rel)&&r.getAttribute("title")===(e.title==null?null:e.title)&&r.getAttribute("crossorigin")===(e.crossOrigin==null?null:e.crossOrigin)){a.splice(o,1);break e}}r=s.createElement(i),pn(r,i,e),s.head.appendChild(r);break;case"meta":if(a=Bx("meta","content",s).get(i+(e.content||""))){for(o=0;o<a.length;o++)if(r=a[o],r.getAttribute("content")===(e.content==null?null:""+e.content)&&r.getAttribute("name")===(e.name==null?null:e.name)&&r.getAttribute("property")===(e.property==null?null:e.property)&&r.getAttribute("http-equiv")===(e.httpEquiv==null?null:e.httpEquiv)&&r.getAttribute("charset")===(e.charSet==null?null:e.charSet)){a.splice(o,1);break e}}r=s.createElement(i),pn(r,i,e),s.head.appendChild(r);break;default:throw Error(j(468,i))}r[Sn]=n,an(r),i=r}n.stateNode=i}else zx(s,n.type,n.stateNode);else n.stateNode=Ix(s,i,n.memoizedProps);else r!==i?(r===null?e.stateNode!==null&&(e=e.stateNode,e.parentNode.removeChild(e)):r.count--,i===null?zx(s,n.type,n.stateNode):Ix(s,i,n.memoizedProps)):i===null&&n.stateNode!==null&&gx(n,n.memoizedProps,e.memoizedProps)}break;case 27:if(i&4&&n.alternate===null){s=n.stateNode,r=n.memoizedProps;try{for(var l=s.firstChild;l;){var c=l.nextSibling,u=l.nodeName;l[vc]||u==="HEAD"||u==="BODY"||u==="SCRIPT"||u==="STYLE"||u==="LINK"&&l.rel.toLowerCase()==="stylesheet"||s.removeChild(l),l=c}for(var d=n.type,f=s.attributes;f.length;)s.removeAttributeNode(f[0]);pn(s,d,r),s[Sn]=n,s[kn]=r}catch(m){me(n,n.return,m)}}case 5:if(_i(t,n),vi(n),i&512&&(Be||e===null||jn(e,e.return)),n.flags&32){s=n.stateNode;try{Ho(s,"")}catch(m){me(n,n.return,m)}}i&4&&n.stateNode!=null&&(s=n.memoizedProps,gx(n,s,e!==null?e.memoizedProps:s)),i&1024&&(Cm=!0);break;case 6:if(_i(t,n),vi(n),i&4){if(n.stateNode===null)throw Error(j(162));i=n.memoizedProps,e=n.stateNode;try{e.nodeValue=i}catch(m){me(n,n.return,m)}}break;case 3:if(Ph=null,s=Hi,Hi=of(t.containerInfo),_i(t,n),Hi=s,vi(n),i&4&&e!==null&&e.memoizedState.isDehydrated)try{Uc(t.containerInfo)}catch(m){me(n,n.return,m)}Cm&&(Cm=!1,FS(n));break;case 4:i=Hi,Hi=of(n.stateNode.containerInfo),_i(t,n),vi(n),Hi=i;break;case 12:_i(t,n),vi(n);break;case 13:_i(t,n),vi(n),n.child.flags&8192&&n.memoizedState!==null!=(e!==null&&e.memoizedState!==null)&&(m0=ss()),i&4&&(i=n.updateQueue,i!==null&&(n.updateQueue=null,Dm(n,i)));break;case 22:if(i&512&&(Be||e===null||jn(e,e.return)),l=n.memoizedState!==null,c=e!==null&&e.memoizedState!==null,u=Es,d=Be,Es=u||l,Be=d||c,_i(t,n),Be=d,Es=u,vi(n),t=n.stateNode,t._current=n,t._visibility&=-3,t._visibility|=t._pendingVisibility&2,i&8192&&(t._visibility=l?t._visibility&-2:t._visibility|1,l&&(t=Es||Be,e===null||c||t||go(n)),n.memoizedProps===null||n.memoizedProps.mode!=="manual"))t:for(e=null,t=n;;){if(t.tag===5||t.tag===26||t.tag===27){if(e===null){c=e=t;try{if(s=c.stateNode,l)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{a=c.stateNode,o=c.memoizedProps.style;var h=o!=null&&o.hasOwnProperty("display")?o.display:null;a.style.display=h==null||typeof h=="boolean"?"":(""+h).trim()}}catch(m){me(c,c.return,m)}}}else if(t.tag===6){if(e===null){c=t;try{c.stateNode.nodeValue=l?"":c.memoizedProps}catch(m){me(c,c.return,m)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===n)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;e===t&&(e=null),t=t.return}e===t&&(e=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=n.updateQueue,i!==null&&(e=i.retryQueue,e!==null&&(i.retryQueue=null,Dm(n,e))));break;case 19:_i(t,n),vi(n),i&4&&(i=n.updateQueue,i!==null&&(n.updateQueue=null,Dm(n,i)));break;case 21:break;default:_i(t,n),vi(n)}}function vi(n){var t=n.flags;if(t&2){try{if(n.tag!==27){t:{for(var e=n.return;e!==null;){if(NS(e)){var i=e;break t}e=e.return}throw Error(j(160))}switch(i.tag){case 27:var s=i.stateNode,r=Rm(n);$h(n,r,s);break;case 5:var a=i.stateNode;i.flags&32&&(Ho(a,""),i.flags&=-33);var o=Rm(n);$h(n,o,a);break;case 3:case 4:var l=i.stateNode.containerInfo,c=Rm(n);_g(n,c,l);break;default:throw Error(j(161))}}}catch(u){me(n,n.return,u)}n.flags&=-3}t&4096&&(n.flags&=-4097)}function FS(n){if(n.subtreeFlags&1024)for(n=n.child;n!==null;){var t=n;FS(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),n=n.sibling}}function Ms(n,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)OS(n,t.alternate,t),t=t.sibling}function go(n){for(n=n.child;n!==null;){var t=n;switch(t.tag){case 0:case 11:case 14:case 15:Er(4,t,t.return),go(t);break;case 1:jn(t,t.return);var e=t.stateNode;typeof e.componentWillUnmount=="function"&&US(t,t.return,e),go(t);break;case 26:case 27:case 5:jn(t,t.return),go(t);break;case 22:jn(t,t.return),t.memoizedState===null&&go(t);break;default:go(t)}n=n.sibling}}function ar(n,t,e){for(e=e&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,s=n,r=t,a=r.flags;switch(r.tag){case 0:case 11:case 15:ar(s,r,e),Hc(4,r);break;case 1:if(ar(s,r,e),i=r,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(c){me(i,i.return,c)}if(i=r,s=i.updateQueue,s!==null){var o=i.stateNode;try{var l=s.shared.hiddenCallbacks;if(l!==null)for(s.shared.hiddenCallbacks=null,s=0;s<l.length;s++)RS(l[s],o)}catch(c){me(i,i.return,c)}}e&&a&64&&DS(r),la(r,r.return);break;case 26:case 27:case 5:ar(s,r,e),e&&i===null&&a&4&&LS(r),la(r,r.return);break;case 12:ar(s,r,e);break;case 13:ar(s,r,e),e&&a&4&&BS(s,r);break;case 22:r.memoizedState===null&&ar(s,r,e),la(r,r.return);break;default:ar(s,r,e)}t=t.sibling}}function u0(n,t){var e=null;n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),n=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),n!==e&&(n!=null&&n.refCount++,e!=null&&Bc(e))}function h0(n,t){n=null,t.alternate!==null&&(n=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==n&&(t.refCount++,n!=null&&Bc(n))}function rr(n,t,e,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)HS(n,t,e,i),t=t.sibling}function HS(n,t,e,i){var s=t.flags;switch(t.tag){case 0:case 11:case 15:rr(n,t,e,i),s&2048&&Hc(9,t);break;case 3:rr(n,t,e,i),s&2048&&(n=null,t.alternate!==null&&(n=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==n&&(t.refCount++,n!=null&&Bc(n)));break;case 12:if(s&2048){rr(n,t,e,i),n=t.stateNode;try{var r=t.memoizedProps,a=r.id,o=r.onPostCommit;typeof o=="function"&&o(a,t.alternate===null?"mount":"update",n.passiveEffectDuration,-0)}catch(l){me(t,t.return,l)}}else rr(n,t,e,i);break;case 23:break;case 22:r=t.stateNode,t.memoizedState!==null?r._visibility&4?rr(n,t,e,i):dc(n,t):r._visibility&4?rr(n,t,e,i):(r._visibility|=4,_o(n,t,e,i,(t.subtreeFlags&10256)!==0)),s&2048&&u0(t.alternate,t);break;case 24:rr(n,t,e,i),s&2048&&h0(t.alternate,t);break;default:rr(n,t,e,i)}}function _o(n,t,e,i,s){for(s=s&&(t.subtreeFlags&10256)!==0,t=t.child;t!==null;){var r=n,a=t,o=e,l=i,c=a.flags;switch(a.tag){case 0:case 11:case 15:_o(r,a,o,l,s),Hc(8,a);break;case 23:break;case 22:var u=a.stateNode;a.memoizedState!==null?u._visibility&4?_o(r,a,o,l,s):dc(r,a):(u._visibility|=4,_o(r,a,o,l,s)),s&&c&2048&&u0(a.alternate,a);break;case 24:_o(r,a,o,l,s),s&&c&2048&&h0(a.alternate,a);break;default:_o(r,a,o,l,s)}t=t.sibling}}function dc(n,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var e=n,i=t,s=i.flags;switch(i.tag){case 22:dc(e,i),s&2048&&u0(i.alternate,i);break;case 24:dc(e,i),s&2048&&h0(i.alternate,i);break;default:dc(e,i)}t=t.sibling}}var ec=8192;function po(n){if(n.subtreeFlags&ec)for(n=n.child;n!==null;)kS(n),n=n.sibling}function kS(n){switch(n.tag){case 26:po(n),n.flags&ec&&n.memoizedState!==null&&U2(Hi,n.memoizedState,n.memoizedProps);break;case 5:po(n);break;case 3:case 4:var t=Hi;Hi=of(n.stateNode.containerInfo),po(n),Hi=t;break;case 22:n.memoizedState===null&&(t=n.alternate,t!==null&&t.memoizedState!==null?(t=ec,ec=16777216,po(n),ec=t):po(n));break;default:po(n)}}function VS(n){var t=n.alternate;if(t!==null&&(n=t.child,n!==null)){t.child=null;do t=n.sibling,n.sibling=null,n=t;while(n!==null)}}function Yl(n){var t=n.deletions;if((n.flags&16)!==0){if(t!==null)for(var e=0;e<t.length;e++){var i=t[e];rn=i,WS(i,n)}VS(n)}if(n.subtreeFlags&10256)for(n=n.child;n!==null;)GS(n),n=n.sibling}function GS(n){switch(n.tag){case 0:case 11:case 15:Yl(n),n.flags&2048&&Er(9,n,n.return);break;case 3:Yl(n);break;case 12:Yl(n);break;case 22:var t=n.stateNode;n.memoizedState!==null&&t._visibility&4&&(n.return===null||n.return.tag!==13)?(t._visibility&=-5,Lh(n)):Yl(n);break;default:Yl(n)}}function Lh(n){var t=n.deletions;if((n.flags&16)!==0){if(t!==null)for(var e=0;e<t.length;e++){var i=t[e];rn=i,WS(i,n)}VS(n)}for(n=n.child;n!==null;){switch(t=n,t.tag){case 0:case 11:case 15:Er(8,t,t.return),Lh(t);break;case 22:e=t.stateNode,e._visibility&4&&(e._visibility&=-5,Lh(t));break;default:Lh(t)}n=n.sibling}}function WS(n,t){for(;rn!==null;){var e=rn;switch(e.tag){case 0:case 11:case 15:Er(8,e,t);break;case 23:case 22:if(e.memoizedState!==null&&e.memoizedState.cachePool!==null){var i=e.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Bc(e.memoizedState.cache)}if(i=e.child,i!==null)i.return=e,rn=i;else t:for(e=n;rn!==null;){i=rn;var s=i.sibling,r=i.return;if(PS(i),i===e){rn=null;break t}if(s!==null){s.return=r,rn=s;break t}rn=r}}}function qw(n,t,e,i){this.tag=n,this.key=e,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ei(n,t,e,i){return new qw(n,t,e,i)}function f0(n){return n=n.prototype,!(!n||!n.isReactComponent)}function vr(n,t){var e=n.alternate;return e===null?(e=Ei(n.tag,t,n.key,n.mode),e.elementType=n.elementType,e.type=n.type,e.stateNode=n.stateNode,e.alternate=n,n.alternate=e):(e.pendingProps=t,e.type=n.type,e.flags=0,e.subtreeFlags=0,e.deletions=null),e.flags=n.flags&31457280,e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},e.sibling=n.sibling,e.index=n.index,e.ref=n.ref,e.refCleanup=n.refCleanup,e}function XS(n,t){n.flags&=31457282;var e=n.alternate;return e===null?(n.childLanes=0,n.lanes=t,n.child=null,n.subtreeFlags=0,n.memoizedProps=null,n.memoizedState=null,n.updateQueue=null,n.dependencies=null,n.stateNode=null):(n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.subtreeFlags=0,n.deletions=null,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,n.type=e.type,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n}function Nh(n,t,e,i,s,r){var a=0;if(i=n,typeof n=="function")f0(n)&&(a=1);else if(typeof n=="string")a=C2(n,e,is.current)?26:n==="html"||n==="head"||n==="body"?27:5;else t:switch(n){case yo:return fa(e.children,s,r,t);case qx:a=8,s|=24;break;case Hm:return n=Ei(12,e,t,s|2),n.elementType=Hm,n.lanes=r,n;case km:return n=Ei(13,e,t,s),n.elementType=km,n.lanes=r,n;case Vm:return n=Ei(19,e,t,s),n.elementType=Vm,n.lanes=r,n;case Zx:return qS(e,s,r,t);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case _A:case Rs:a=10;break t;case Yx:a=9;break t;case Ng:a=11;break t;case Og:a=14;break t;case or:a=16,i=null;break t}a=29,e=Error(j(130,n===null?"null":typeof n,"")),i=null}return t=Ei(a,e,t,s),t.elementType=n,t.type=i,t.lanes=r,t}function fa(n,t,e,i){return n=Ei(7,n,i,t),n.lanes=e,n}function qS(n,t,e,i){n=Ei(22,n,i,t),n.elementType=Zx,n.lanes=e;var s={_visibility:1,_pendingVisibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null,_current:null,detach:function(){var r=s._current;if(r===null)throw Error(j(456));if((s._pendingVisibility&2)===0){var a=Mr(r,2);a!==null&&(s._pendingVisibility|=2,Pn(a,r,2))}},attach:function(){var r=s._current;if(r===null)throw Error(j(456));if((s._pendingVisibility&2)!==0){var a=Mr(r,2);a!==null&&(s._pendingVisibility&=-3,Pn(a,r,2))}}};return n.stateNode=s,n}function Um(n,t,e){return n=Ei(6,n,null,t),n.lanes=e,n}function Lm(n,t,e){return t=Ei(4,n.children!==null?n.children:[],n.key,t),t.lanes=e,t.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},t}function Ts(n){n.flags|=4}function yx(n,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)n.flags&=-16777217;else if(n.flags|=16777216,!db(t)){if(t=wi.current,t!==null&&((jt&4194176)===jt?rs!==null:(jt&62914560)!==jt&&(jt&536870912)===0||t!==rs))throw ac=eg,L1;n.flags|=8192}}function vh(n,t){t!==null&&(n.flags|=4),n.flags&16384&&(t=n.tag!==22?e1():536870912,n.lanes|=t,Wo|=t)}function Zl(n,t){if(!se)switch(n.tailMode){case"hidden":t=n.tail;for(var e=null;t!==null;)t.alternate!==null&&(e=t),t=t.sibling;e===null?n.tail=null:e.sibling=null;break;case"collapsed":e=n.tail;for(var i=null;e!==null;)e.alternate!==null&&(i=e),e=e.sibling;i===null?t||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function Re(n){var t=n.alternate!==null&&n.alternate.child===n.child,e=0,i=0;if(t)for(var s=n.child;s!==null;)e|=s.lanes|s.childLanes,i|=s.subtreeFlags&31457280,i|=s.flags&31457280,s.return=n,s=s.sibling;else for(s=n.child;s!==null;)e|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=n,s=s.sibling;return n.subtreeFlags|=i,n.childLanes=e,t}function Yw(n,t,e){var i=t.pendingProps;switch(qg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Re(t),null;case 1:return Re(t),null;case 3:return e=t.stateNode,i=null,n!==null&&(i=n.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Ns(Je),zo(),e.pendingContext&&(e.context=e.pendingContext,e.pendingContext=null),(n===null||n.child===null)&&(Xl(t)?Ts(t):n===null||n.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ki!==null&&(bg(ki),ki=null))),Re(t),null;case 26:return e=t.memoizedState,n===null?(Ts(t),e!==null?(Re(t),yx(t,e)):(Re(t),t.flags&=-16777217)):e?e!==n.memoizedState?(Ts(t),Re(t),yx(t,e)):(Re(t),t.flags&=-16777217):(n.memoizedProps!==i&&Ts(t),Re(t),t.flags&=-16777217),null;case 27:Fh(t),e=mr.current;var s=t.type;if(n!==null&&t.stateNode!=null)n.memoizedProps!==i&&Ts(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Re(t),null}n=is.current,Xl(t)?Qy(t,n):(n=ub(s,i,e),t.stateNode=n,Ts(t))}return Re(t),null;case 5:if(Fh(t),e=t.type,n!==null&&t.stateNode!=null)n.memoizedProps!==i&&Ts(t);else{if(!i){if(t.stateNode===null)throw Error(j(166));return Re(t),null}if(n=is.current,Xl(t))Qy(t,n);else{switch(s=af(mr.current),n){case 1:n=s.createElementNS("http://www.w3.org/2000/svg",e);break;case 2:n=s.createElementNS("http://www.w3.org/1998/Math/MathML",e);break;default:switch(e){case"svg":n=s.createElementNS("http://www.w3.org/2000/svg",e);break;case"math":n=s.createElementNS("http://www.w3.org/1998/Math/MathML",e);break;case"script":n=s.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild);break;case"select":n=typeof i.is=="string"?s.createElement("select",{is:i.is}):s.createElement("select"),i.multiple?n.multiple=!0:i.size&&(n.size=i.size);break;default:n=typeof i.is=="string"?s.createElement(e,{is:i.is}):s.createElement(e)}}n[Sn]=t,n[kn]=i;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)n.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=n;t:switch(pn(n,e,i),e){case"button":case"input":case"select":case"textarea":n=!!i.autoFocus;break t;case"img":n=!0;break t;default:n=!1}n&&Ts(t)}}return Re(t),t.flags&=-16777217,null;case 6:if(n&&t.stateNode!=null)n.memoizedProps!==i&&Ts(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(j(166));if(n=mr.current,Xl(t)){if(n=t.stateNode,e=t.memoizedProps,i=null,s=On,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}n[Sn]=t,n=!!(n.nodeValue===e||i!==null&&i.suppressHydrationWarning===!0||ob(n.nodeValue,e)),n||ma(t)}else n=af(n).createTextNode(i),n[Sn]=t,t.stateNode=n}return Re(t),null;case 13:if(i=t.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(s=Xl(t),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(j(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(j(317));s[Sn]=t}else Ic(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Re(t),s=!1}else ki!==null&&(bg(ki),ki=null),s=!0;if(!s)return t.flags&256?(Us(t),t):(Us(t),null)}if(Us(t),(t.flags&128)!==0)return t.lanes=e,t;if(e=i!==null,n=n!==null&&n.memoizedState!==null,e){i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool);var r=null;i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(r=i.memoizedState.cachePool.pool),r!==s&&(i.flags|=2048)}return e!==n&&e&&(t.child.flags|=8192),vh(t,t.updateQueue),Re(t),null;case 4:return zo(),n===null&&v0(t.stateNode.containerInfo),Re(t),null;case 10:return Ns(t.type),Re(t),null;case 19:if(ln(je),s=t.memoizedState,s===null)return Re(t),null;if(i=(t.flags&128)!==0,r=s.rendering,r===null)if(i)Zl(s,!1);else{if(ze!==0||n!==null&&(n.flags&128)!==0)for(n=t.child;n!==null;){if(r=Yh(n),r!==null){for(t.flags|=128,Zl(s,!1),n=r.updateQueue,t.updateQueue=n,vh(t,n),t.subtreeFlags=0,n=e,e=t.child;e!==null;)XS(e,n),e=e.sibling;return Ee(je,je.current&1|2),t.child}n=n.sibling}s.tail!==null&&ss()>tf&&(t.flags|=128,i=!0,Zl(s,!1),t.lanes=4194304)}else{if(!i)if(n=Yh(r),n!==null){if(t.flags|=128,i=!0,n=n.updateQueue,t.updateQueue=n,vh(t,n),Zl(s,!0),s.tail===null&&s.tailMode==="hidden"&&!r.alternate&&!se)return Re(t),null}else 2*ss()-s.renderingStartTime>tf&&e!==536870912&&(t.flags|=128,i=!0,Zl(s,!1),t.lanes=4194304);s.isBackwards?(r.sibling=t.child,t.child=r):(n=s.last,n!==null?n.sibling=r:t.child=r,s.last=r)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=ss(),t.sibling=null,n=je.current,Ee(je,i?n&1|2:n&1),t):(Re(t),null);case 22:case 23:return Us(t),Yg(),i=t.memoizedState!==null,n!==null?n.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(e&536870912)!==0&&(t.flags&128)===0&&(Re(t),t.subtreeFlags&6&&(t.flags|=8192)):Re(t),e=t.updateQueue,e!==null&&vh(t,e.retryQueue),e=null,n!==null&&n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(e=n.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==e&&(t.flags|=2048),n!==null&&ln(ha),null;case 24:return e=null,n!==null&&(e=n.memoizedState.cache),t.memoizedState.cache!==e&&(t.flags|=2048),Ns(Je),Re(t),null;case 25:return null}throw Error(j(156,t.tag))}function Zw(n,t){switch(qg(t),t.tag){case 1:return n=t.flags,n&65536?(t.flags=n&-65537|128,t):null;case 3:return Ns(Je),zo(),n=t.flags,(n&65536)!==0&&(n&128)===0?(t.flags=n&-65537|128,t):null;case 26:case 27:case 5:return Fh(t),null;case 13:if(Us(t),n=t.memoizedState,n!==null&&n.dehydrated!==null){if(t.alternate===null)throw Error(j(340));Ic()}return n=t.flags,n&65536?(t.flags=n&-65537|128,t):null;case 19:return ln(je),null;case 4:return zo(),null;case 10:return Ns(t.type),null;case 22:case 23:return Us(t),Yg(),n!==null&&ln(ha),n=t.flags,n&65536?(t.flags=n&-65537|128,t):null;case 24:return Ns(Je),null;case 25:return null;default:return null}}function YS(n,t){switch(qg(t),t.tag){case 3:Ns(Je),zo();break;case 26:case 27:case 5:Fh(t);break;case 4:zo();break;case 13:Us(t);break;case 19:ln(je);break;case 10:Ns(t.type);break;case 22:case 23:Us(t),Yg(),n!==null&&ln(ha);break;case 24:Ns(Je)}}var Qw={getCacheForType:function(n){var t=bn(Je),e=t.data.get(n);return e===void 0&&(e=n(),t.data.set(n,e)),e}},Kw=typeof WeakMap=="function"?WeakMap:Map,Ce=0,xe=null,Yt=null,jt=0,ye=0,Jn=null,As=!1,Ko=!1,d0=!1,Bs=0,ze=0,Ar=0,da=0,p0=0,Ai=0,Wo=0,pc=null,ns=null,vg=!1,m0=0,tf=1/0,ef=null,yr=null,yh=!1,aa=null,mc=0,yg=0,xg=null,gc=0,Sg=null;function ei(){if((Ce&2)!==0&&jt!==0)return jt&-jt;if(Ft.T!==null){var n=Vo;return n!==0?n:_0()}return r1()}function ZS(){Ai===0&&(Ai=(jt&536870912)===0||se?t1():536870912);var n=wi.current;return n!==null&&(n.flags|=32),Ai}function Pn(n,t,e){(n===xe&&ye===2||n.cancelPendingCommit!==null)&&(Xo(n,0),ws(n,jt,Ai,!1)),Oc(n,e),((Ce&2)===0||n!==xe)&&(n===xe&&((Ce&2)===0&&(da|=e),ze===4&&ws(n,jt,Ai,!1)),ls(n))}function QS(n,t,e){if((Ce&6)!==0)throw Error(j(327));var i=!e&&(t&60)===0&&(t&n.expiredLanes)===0||Nc(n,t),s=i?$w(n,t):Nm(n,t,!0),r=i;do{if(s===0){Ko&&!i&&ws(n,t,0,!1);break}else if(s===6)ws(n,t,0,!As);else{if(e=n.current.alternate,r&&!Jw(e)){s=Nm(n,t,!1),r=!1;continue}if(s===2){if(r=t,n.errorRecoveryDisabledLanes&r)var a=0;else a=n.pendingLanes&-536870913,a=a!==0?a:a&536870912?536870912:0;if(a!==0){t=a;t:{var o=n;s=pc;var l=o.current.memoizedState.isDehydrated;if(l&&(Xo(o,a).flags|=256),a=Nm(o,a,!1),a!==2){if(d0&&!l){o.errorRecoveryDisabledLanes|=r,da|=r,s=4;break t}r=ns,ns=s,r!==null&&bg(r)}s=a}if(r=!1,s!==2)continue}}if(s===1){Xo(n,0),ws(n,t,0,!0);break}t:{switch(i=n,s){case 0:case 1:throw Error(j(345));case 4:if((t&4194176)===t){ws(i,t,Ai,!As);break t}break;case 2:ns=null;break;case 3:case 5:break;default:throw Error(j(329))}if(i.finishedWork=e,i.finishedLanes=t,(t&62914560)===t&&(r=m0+300-ss(),10<r)){if(ws(i,t,Ai,!As),ff(i,0)!==0)break t;i.timeoutHandle=cb(xx.bind(null,i,e,ns,ef,vg,t,Ai,da,Wo,As,2,-0,0),r);break t}xx(i,e,ns,ef,vg,t,Ai,da,Wo,As,0,-0,0)}}break}while(!0);ls(n)}function bg(n){ns===null?ns=n:ns.push.apply(ns,n)}function xx(n,t,e,i,s,r,a,o,l,c,u,d,f){var h=t.subtreeFlags;if((h&8192||(h&16785408)===16785408)&&(wc={stylesheets:null,count:0,unsuspend:D2},kS(t),t=L2(),t!==null)){n.cancelPendingCommit=t(bx.bind(null,n,e,i,s,a,o,l,1,d,f)),ws(n,r,a,!c);return}bx(n,e,i,s,a,o,l,u,d,f)}function Jw(n){for(var t=n;;){var e=t.tag;if((e===0||e===11||e===15)&&t.flags&16384&&(e=t.updateQueue,e!==null&&(e=e.stores,e!==null)))for(var i=0;i<e.length;i++){var s=e[i],r=s.getSnapshot;s=s.value;try{if(!ni(r(),s))return!1}catch{return!1}}if(e=t.child,t.subtreeFlags&16384&&e!==null)e.return=t,t=e;else{if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ws(n,t,e,i){t&=~p0,t&=~da,n.suspendedLanes|=t,n.pingedLanes&=~t,i&&(n.warmLanes|=t),i=n.expirationTimes;for(var s=t;0<s;){var r=31-ti(s),a=1<<r;i[r]=-1,s&=~a}e!==0&&n1(n,e,t)}function bf(){return(Ce&6)===0?(kc(0,!1),!1):!0}function g0(){if(Yt!==null){if(ye===0)var n=Yt.return;else n=Yt,Ls=Ea=null,t0(n),No=null,Mc=0,n=Yt;for(;n!==null;)YS(n.alternate,n),n=n.return;Yt=null}}function Xo(n,t){n.finishedWork=null,n.finishedLanes=0;var e=n.timeoutHandle;e!==-1&&(n.timeoutHandle=-1,p2(e)),e=n.cancelPendingCommit,e!==null&&(n.cancelPendingCommit=null,e()),g0(),xe=n,Yt=e=vr(n.current,null),jt=t,ye=0,Jn=null,As=!1,Ko=Nc(n,t),d0=!1,Wo=Ai=p0=da=Ar=ze=0,ns=pc=null,vg=!1,(t&8)!==0&&(t|=t&32);var i=n.entangledLanes;if(i!==0)for(n=n.entanglements,i&=t;0<i;){var s=31-ti(i),r=1<<s;t|=n[s],i&=~r}return Bs=t,gf(),e}function KS(n,t){qt=null,Ft.H=as,t===rc?(t=jy(),ye=3):t===L1?(t=jy(),ye=4):ye=t===SS?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Jn=t,Yt===null&&(ze=1,Jh(n,Ti(t,n.current)))}function JS(){var n=Ft.H;return Ft.H=as,n===null?as:n}function jS(){var n=Ft.A;return Ft.A=Qw,n}function Mg(){ze=4,As||(jt&4194176)!==jt&&wi.current!==null||(Ko=!0),(Ar&134217727)===0&&(da&134217727)===0||xe===null||ws(xe,jt,Ai,!1)}function Nm(n,t,e){var i=Ce;Ce|=2;var s=JS(),r=jS();(xe!==n||jt!==t)&&(ef=null,Xo(n,t)),t=!1;var a=ze;t:do try{if(ye!==0&&Yt!==null){var o=Yt,l=Jn;switch(ye){case 8:g0(),a=6;break t;case 3:case 2:case 6:wi.current===null&&(t=!0);var c=ye;if(ye=0,Jn=null,Co(n,o,l,c),e&&Ko){a=0;break t}break;default:c=ye,ye=0,Jn=null,Co(n,o,l,c)}}jw(),a=ze;break}catch(u){KS(n,u)}while(!0);return t&&n.shellSuspendCounter++,Ls=Ea=null,Ce=i,Ft.H=s,Ft.A=r,Yt===null&&(xe=null,jt=0,gf()),a}function jw(){for(;Yt!==null;)$S(Yt)}function $w(n,t){var e=Ce;Ce|=2;var i=JS(),s=jS();xe!==n||jt!==t?(ef=null,tf=ss()+500,Xo(n,t)):Ko=Nc(n,t);t:do try{if(ye!==0&&Yt!==null){t=Yt;var r=Jn;e:switch(ye){case 1:ye=0,Jn=null,Co(n,t,r,1);break;case 2:if(Jy(r)){ye=0,Jn=null,Sx(t);break}t=function(){ye===2&&xe===n&&(ye=7),ls(n)},r.then(t,t);break t;case 3:ye=7;break t;case 4:ye=5;break t;case 7:Jy(r)?(ye=0,Jn=null,Sx(t)):(ye=0,Jn=null,Co(n,t,r,7));break;case 5:var a=null;switch(Yt.tag){case 26:a=Yt.memoizedState;case 5:case 27:var o=Yt;if(!a||db(a)){ye=0,Jn=null;var l=o.sibling;if(l!==null)Yt=l;else{var c=o.return;c!==null?(Yt=c,Mf(c)):Yt=null}break e}}ye=0,Jn=null,Co(n,t,r,5);break;case 6:ye=0,Jn=null,Co(n,t,r,6);break;case 8:g0(),ze=6;break t;default:throw Error(j(462))}}t2();break}catch(u){KS(n,u)}while(!0);return Ls=Ea=null,Ft.H=i,Ft.A=s,Ce=e,Yt!==null?0:(xe=null,jt=0,gf(),ze)}function t2(){for(;Yt!==null&&!bA();)$S(Yt)}function $S(n){var t=AS(n.alternate,n,Bs);n.memoizedProps=n.pendingProps,t===null?Mf(n):Yt=t}function Sx(n){var t=n,e=t.alternate;switch(t.tag){case 15:case 0:t=fx(e,t,t.pendingProps,t.type,void 0,jt);break;case 11:t=fx(e,t,t.pendingProps,t.type.render,t.ref,jt);break;case 5:t0(t);default:YS(e,t),t=Yt=XS(t,Bs),t=AS(e,t,Bs)}n.memoizedProps=n.pendingProps,t===null?Mf(n):Yt=t}function Co(n,t,e,i){Ls=Ea=null,t0(t),No=null,Mc=0;var s=t.return;try{if(Vw(n,s,t,e,jt)){ze=1,Jh(n,Ti(e,n.current)),Yt=null;return}}catch(r){if(s!==null)throw Yt=s,r;ze=1,Jh(n,Ti(e,n.current)),Yt=null;return}t.flags&32768?(se||i===1?n=!0:Ko||(jt&536870912)!==0?n=!1:(As=n=!0,(i===2||i===3||i===6)&&(i=wi.current,i!==null&&i.tag===13&&(i.flags|=16384))),tb(t,n)):Mf(t)}function Mf(n){var t=n;do{if((t.flags&32768)!==0){tb(t,As);return}n=t.return;var e=Yw(t.alternate,t,Bs);if(e!==null){Yt=e;return}if(t=t.sibling,t!==null){Yt=t;return}Yt=t=n}while(t!==null);ze===0&&(ze=5)}function tb(n,t){do{var e=Zw(n.alternate,n);if(e!==null){e.flags&=32767,Yt=e;return}if(e=n.return,e!==null&&(e.flags|=32768,e.subtreeFlags=0,e.deletions=null),!t&&(n=n.sibling,n!==null)){Yt=n;return}Yt=n=e}while(n!==null);ze=6,Yt=null}function bx(n,t,e,i,s,r,a,o,l,c){var u=Ft.T,d=Se.p;try{Se.p=2,Ft.T=null,e2(n,t,e,i,d,s,r,a,o,l,c)}finally{Ft.T=u,Se.p=d}}function e2(n,t,e,i,s,r,a,o){do Bo();while(aa!==null);if((Ce&6)!==0)throw Error(j(327));var l=n.finishedWork;if(i=n.finishedLanes,l===null)return null;if(n.finishedWork=null,n.finishedLanes=0,l===n.current)throw Error(j(177));n.callbackNode=null,n.callbackPriority=0,n.cancelPendingCommit=null;var c=l.lanes|l.childLanes;if(c|=Gg,NA(n,i,c,r,a,o),n===xe&&(Yt=xe=null,jt=0),(l.subtreeFlags&10256)===0&&(l.flags&10256)===0||yh||(yh=!0,yg=c,xg=e,r2(Hh,function(){return Bo(!0),null})),e=(l.flags&15990)!==0,(l.subtreeFlags&15990)!==0||e?(e=Ft.T,Ft.T=null,r=Se.p,Se.p=2,a=Ce,Ce|=4,Ww(n,l),zS(l,n),Ew(wg,n.containerInfo),uf=!!Ag,wg=Ag=null,n.current=l,OS(n,l.alternate,l),MA(),Ce=a,Se.p=r,Ft.T=e):n.current=l,yh?(yh=!1,aa=n,mc=i):eb(n,c),c=n.pendingLanes,c===0&&(yr=null),RA(l.stateNode,s),ls(n),t!==null)for(s=n.onRecoverableError,l=0;l<t.length;l++)c=t[l],s(c.value,{componentStack:c.stack});return(mc&3)!==0&&Bo(),c=n.pendingLanes,(i&4194218)!==0&&(c&42)!==0?n===Sg?gc++:(gc=0,Sg=n):gc=0,kc(0,!1),null}function eb(n,t){(n.pooledCacheLanes&=t)===0&&(t=n.pooledCache,t!=null&&(n.pooledCache=null,Bc(t)))}function Bo(){if(aa!==null){var n=aa,t=yg;yg=0;var e=s1(mc),i=Ft.T,s=Se.p;try{if(Se.p=32>e?32:e,Ft.T=null,aa===null)var r=!1;else{e=xg,xg=null;var a=aa,o=mc;if(aa=null,mc=0,(Ce&6)!==0)throw Error(j(331));var l=Ce;if(Ce|=4,GS(a.current),HS(a,a.current,o,e),Ce=l,kc(0,!1),$n&&typeof $n.onPostCommitFiberRoot=="function")try{$n.onPostCommitFiberRoot(Lc,a)}catch{}r=!0}return r}finally{Se.p=s,Ft.T=i,eb(n,t)}}return!1}function Mx(n,t,e){t=Ti(e,t),t=lg(n.stateNode,t,2),n=_r(n,t,2),n!==null&&(Oc(n,2),ls(n))}function me(n,t,e){if(n.tag===3)Mx(n,n,e);else for(;t!==null;){if(t.tag===3){Mx(t,n,e);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(yr===null||!yr.has(i))){n=Ti(e,n),e=yS(2),i=_r(t,e,2),i!==null&&(xS(e,i,t,n),Oc(i,2),ls(i));break}}t=t.return}}function Om(n,t,e){var i=n.pingCache;if(i===null){i=n.pingCache=new Kw;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(e)||(d0=!0,s.add(e),n=n2.bind(null,n,t,e),t.then(n,n))}function n2(n,t,e){var i=n.pingCache;i!==null&&i.delete(t),n.pingedLanes|=n.suspendedLanes&e,n.warmLanes&=~e,xe===n&&(jt&e)===e&&(ze===4||ze===3&&(jt&62914560)===jt&&300>ss()-m0?(Ce&2)===0&&Xo(n,0):p0|=e,Wo===jt&&(Wo=0)),ls(n)}function nb(n,t){t===0&&(t=e1()),n=Mr(n,t),n!==null&&(Oc(n,t),ls(n))}function i2(n){var t=n.memoizedState,e=0;t!==null&&(e=t.retryLane),nb(n,e)}function s2(n,t){var e=0;switch(n.tag){case 13:var i=n.stateNode,s=n.memoizedState;s!==null&&(e=s.retryLane);break;case 19:i=n.stateNode;break;case 22:i=n.stateNode._retryCache;break;default:throw Error(j(314))}i!==null&&i.delete(t),nb(n,e)}function r2(n,t){return Pg(n,t)}var nf=null,vo=null,Tg=!1,sf=!1,Pm=!1,pa=0;function ls(n){n!==vo&&n.next===null&&(vo===null?nf=vo=n:vo=vo.next=n),sf=!0,Tg||(Tg=!0,o2(a2))}function kc(n,t){if(!Pm&&sf){Pm=!0;do for(var e=!1,i=nf;i!==null;){if(!t)if(n!==0){var s=i.pendingLanes;if(s===0)var r=0;else{var a=i.suspendedLanes,o=i.pingedLanes;r=(1<<31-ti(42|n)+1)-1,r&=s&~(a&~o),r=r&201326677?r&201326677|1:r?r|2:0}r!==0&&(e=!0,Tx(i,r))}else r=jt,r=ff(i,i===xe?r:0),(r&3)===0||Nc(i,r)||(e=!0,Tx(i,r));i=i.next}while(e);Pm=!1}}function a2(){sf=Tg=!1;var n=0;pa!==0&&(d2()&&(n=pa),pa=0);for(var t=ss(),e=null,i=nf;i!==null;){var s=i.next,r=ib(i,t);r===0?(i.next=null,e===null?nf=s:e.next=s,s===null&&(vo=e)):(e=i,(n!==0||(r&3)!==0)&&(sf=!0)),i=s}kc(n,!1)}function ib(n,t){for(var e=n.suspendedLanes,i=n.pingedLanes,s=n.expirationTimes,r=n.pendingLanes&-62914561;0<r;){var a=31-ti(r),o=1<<a,l=s[a];l===-1?((o&e)===0||(o&i)!==0)&&(s[a]=LA(o,t)):l<=t&&(n.expiredLanes|=o),r&=~o}if(t=xe,e=jt,e=ff(n,n===t?e:0),i=n.callbackNode,e===0||n===t&&ye===2||n.cancelPendingCommit!==null)return i!==null&&i!==null&&fm(i),n.callbackNode=null,n.callbackPriority=0;if((e&3)===0||Nc(n,e)){if(t=e&-e,t===n.callbackPriority)return t;switch(i!==null&&fm(i),s1(e)){case 2:case 8:e=jx;break;case 32:e=Hh;break;case 268435456:e=$x;break;default:e=Hh}return i=sb.bind(null,n),e=Pg(e,i),n.callbackPriority=t,n.callbackNode=e,t}return i!==null&&i!==null&&fm(i),n.callbackPriority=2,n.callbackNode=null,2}function sb(n,t){var e=n.callbackNode;if(Bo()&&n.callbackNode!==e)return null;var i=jt;return i=ff(n,n===xe?i:0),i===0?null:(QS(n,i,t),ib(n,ss()),n.callbackNode!=null&&n.callbackNode===e?sb.bind(null,n):null)}function Tx(n,t){if(Bo())return null;QS(n,t,!0)}function o2(n){m2(function(){(Ce&6)!==0?Pg(Jx,n):n()})}function _0(){return pa===0&&(pa=t1()),pa}function Ex(n){return n==null||typeof n=="symbol"||typeof n=="boolean"?null:typeof n=="function"?n:Ah(""+n)}function Ax(n,t){var e=t.ownerDocument.createElement("input");return e.name=t.name,e.value=t.value,n.id&&e.setAttribute("form",n.id),t.parentNode.insertBefore(e,t),n=new FormData(n),e.parentNode.removeChild(e),n}function l2(n,t,e,i,s){if(t==="submit"&&e&&e.stateNode===s){var r=Ex((s[kn]||null).action),a=i.submitter;a&&(t=(t=a[kn]||null)?Ex(t.formAction):a.getAttribute("formAction"),t!==null&&(r=t,a=null));var o=new df("action","action",null,i,s);n.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(pa!==0){var l=a?Ax(s,a):new FormData(s);ag(e,{pending:!0,data:l,method:s.method,action:r},null,l)}}else typeof r=="function"&&(o.preventDefault(),l=a?Ax(s,a):new FormData(s),ag(e,{pending:!0,data:l,method:s.method,action:r},r,l))},currentTarget:s}]})}}for(xh=0;xh<Yy.length;xh++)Sh=Yy[xh],wx=Sh.toLowerCase(),Rx=Sh[0].toUpperCase()+Sh.slice(1),Gi(wx,"on"+Rx);var Sh,wx,Rx,xh;Gi(E1,"onAnimationEnd");Gi(A1,"onAnimationIteration");Gi(w1,"onAnimationStart");Gi("dblclick","onDoubleClick");Gi("focusin","onFocus");Gi("focusout","onBlur");Gi(ww,"onTransitionRun");Gi(Rw,"onTransitionStart");Gi(Cw,"onTransitionCancel");Gi(R1,"onTransitionEnd");Fo("onMouseEnter",["mouseout","mouseover"]);Fo("onMouseLeave",["mouseout","mouseover"]);Fo("onPointerEnter",["pointerout","pointerover"]);Fo("onPointerLeave",["pointerout","pointerover"]);xa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));xa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));xa("onBeforeInput",["compositionend","keypress","textInput","paste"]);xa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));xa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));xa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),c2=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ec));function rb(n,t){t=(t&4)!==0;for(var e=0;e<n.length;e++){var i=n[e],s=i.event;i=i.listeners;t:{var r=void 0;if(t)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==r&&s.isPropagationStopped())break t;r=o,s.currentTarget=c;try{r(s)}catch(u){Kh(u)}s.currentTarget=null,r=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==r&&s.isPropagationStopped())break t;r=o,s.currentTarget=c;try{r(s)}catch(u){Kh(u)}s.currentTarget=null,r=l}}}}function Qt(n,t){var e=t[Ym];e===void 0&&(e=t[Ym]=new Set);var i=n+"__bubble";e.has(i)||(ab(t,n,2,!1),e.add(i))}function Im(n,t,e){var i=0;t&&(i|=4),ab(e,n,i,t)}var bh="_reactListening"+Math.random().toString(36).slice(2);function v0(n){if(!n[bh]){n[bh]=!0,a1.forEach(function(e){e!=="selectionchange"&&(c2.has(e)||Im(e,!1,n),Im(e,!0,n))});var t=n.nodeType===9?n:n.ownerDocument;t===null||t[bh]||(t[bh]=!0,Im("selectionchange",!1,t))}}function ab(n,t,e,i){switch(vb(t)){case 2:var s=P2;break;case 8:s=I2;break;default:s=b0}e=s.bind(null,t,e,n),s=void 0,!Jm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?n.addEventListener(t,e,{capture:!0,passive:s}):n.addEventListener(t,e,!0):s!==void 0?n.addEventListener(t,e,{passive:s}):n.addEventListener(t,e,!1)}function Bm(n,t,e,i,s){var r=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===s||o.nodeType===8&&o.parentNode===s)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===s||l.nodeType===8&&l.parentNode===s))return;a=a.return}for(;o!==null;){if(a=oa(o),a===null)return;if(l=a.tag,l===5||l===6||l===26||l===27){i=r=a;continue t}o=o.parentNode}}i=i.return}p1(function(){var c=r,u=zg(e),d=[];t:{var f=C1.get(n);if(f!==void 0){var h=df,m=n;switch(n){case"keypress":if(Rh(e)===0)break t;case"keydown":case"keyup":h=sw;break;case"focusin":m="focus",h=_m;break;case"focusout":m="blur",h=_m;break;case"beforeblur":case"afterblur":h=_m;break;case"click":if(e.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":h=Iy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":h=qA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":h=ow;break;case E1:case A1:case w1:h=QA;break;case R1:h=cw;break;case"scroll":case"scrollend":h=WA;break;case"wheel":h=hw;break;case"copy":case"cut":case"paste":h=JA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":h=zy;break;case"toggle":case"beforetoggle":h=dw}var _=(t&4)!==0,g=!_&&(n==="scroll"||n==="scrollend"),p=_?f!==null?f+"Capture":null:f;_=[];for(var v=c,y;v!==null;){var x=v;if(y=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||y===null||p===null||(x=yc(v,p),x!=null&&_.push(Ac(v,x,y))),g)break;v=v.return}0<_.length&&(f=new h(f,m,null,e,u),d.push({event:f,listeners:_}))}}if((t&7)===0){t:{if(f=n==="mouseover"||n==="pointerover",h=n==="mouseout"||n==="pointerout",f&&e!==Km&&(m=e.relatedTarget||e.fromElement)&&(oa(m)||m[Zo]))break t;if((h||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,h?(m=e.relatedTarget||e.toElement,h=c,m=m?oa(m):null,m!==null&&(g=Yo(m),_=m.tag,m!==g||_!==5&&_!==27&&_!==6)&&(m=null)):(h=null,m=c),h!==m)){if(_=Iy,x="onMouseLeave",p="onMouseEnter",v="mouse",(n==="pointerout"||n==="pointerover")&&(_=zy,x="onPointerLeave",p="onPointerEnter",v="pointer"),g=h==null?f:tc(h),y=m==null?f:tc(m),f=new _(x,v+"leave",h,e,u),f.target=g,f.relatedTarget=y,x=null,oa(u)===c&&(_=new _(p,v+"enter",m,e,u),_.target=y,_.relatedTarget=g,x=_),g=x,h&&m)e:{for(_=h,p=m,v=0,y=_;y;y=mo(y))v++;for(y=0,x=p;x;x=mo(x))y++;for(;0<v-y;)_=mo(_),v--;for(;0<y-v;)p=mo(p),y--;for(;v--;){if(_===p||p!==null&&_===p.alternate)break e;_=mo(_),p=mo(p)}_=null}else _=null;h!==null&&Cx(d,f,h,_,!1),m!==null&&g!==null&&Cx(d,g,m,_,!0)}}t:{if(f=c?tc(c):window,h=f.nodeName&&f.nodeName.toLowerCase(),h==="select"||h==="input"&&f.type==="file")var M=Vy;else if(ky(f))if(x1)M=Mw;else{M=Sw;var w=xw}else h=f.nodeName,!h||h.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&Bg(c.elementType)&&(M=Vy):M=bw;if(M&&(M=M(n,c))){y1(d,M,e,u);break t}w&&w(n,f,c),n==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&Qm(f,"number",f.value)}switch(w=c?tc(c):window,n){case"focusin":(ky(w)||w.contentEditable==="true")&&(Mo=w,jm=c,sc=null);break;case"focusout":sc=jm=Mo=null;break;case"mousedown":$m=!0;break;case"contextmenu":case"mouseup":case"dragend":$m=!1,qy(d,e,u);break;case"selectionchange":if(Aw)break;case"keydown":case"keyup":qy(d,e,u)}var E;if(kg)t:{switch(n){case"compositionstart":var R="onCompositionStart";break t;case"compositionend":R="onCompositionEnd";break t;case"compositionupdate":R="onCompositionUpdate";break t}R=void 0}else bo?_1(n,e)&&(R="onCompositionEnd"):n==="keydown"&&e.keyCode===229&&(R="onCompositionStart");R&&(g1&&e.locale!=="ko"&&(bo||R!=="onCompositionStart"?R==="onCompositionEnd"&&bo&&(E=m1()):(pr=u,Fg="value"in pr?pr.value:pr.textContent,bo=!0)),w=rf(c,R),0<w.length&&(R=new By(R,n,null,e,u),d.push({event:R,listeners:w}),E?R.data=E:(E=v1(e),E!==null&&(R.data=E)))),(E=mw?gw(n,e):_w(n,e))&&(R=rf(c,"onBeforeInput"),0<R.length&&(w=new By("onBeforeInput","beforeinput",null,e,u),d.push({event:w,listeners:R}),w.data=E)),l2(d,n,c,e,u)}rb(d,t)})}function Ac(n,t,e){return{instance:n,listener:t,currentTarget:e}}function rf(n,t){for(var e=t+"Capture",i=[];n!==null;){var s=n,r=s.stateNode;s=s.tag,s!==5&&s!==26&&s!==27||r===null||(s=yc(n,e),s!=null&&i.unshift(Ac(n,s,r)),s=yc(n,t),s!=null&&i.push(Ac(n,s,r))),n=n.return}return i}function mo(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5&&n.tag!==27);return n||null}function Cx(n,t,e,i,s){for(var r=t._reactName,a=[];e!==null&&e!==i;){var o=e,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=yc(e,r),c!=null&&a.unshift(Ac(e,c,l))):s||(c=yc(e,r),c!=null&&a.push(Ac(e,c,l)))),e=e.return}a.length!==0&&n.push({event:t,listeners:a})}var u2=/\r\n?/g,h2=/\u0000|\uFFFD/g;function Dx(n){return(typeof n=="string"?n:""+n).replace(u2,`
`).replace(h2,"")}function ob(n,t){return t=Dx(t),Dx(n)===t}function Tf(){}function he(n,t,e,i,s,r){switch(e){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||Ho(n,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&Ho(n,""+i);break;case"className":uh(n,"class",i);break;case"tabIndex":uh(n,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":uh(n,e,i);break;case"style":d1(n,i,r);break;case"data":if(t!=="object"){uh(n,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||e!=="href")){n.removeAttribute(e);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){n.removeAttribute(e);break}i=Ah(""+i),n.setAttribute(e,i);break;case"action":case"formAction":if(typeof i=="function"){n.setAttribute(e,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(e==="formAction"?(t!=="input"&&he(n,t,"name",s.name,s,null),he(n,t,"formEncType",s.formEncType,s,null),he(n,t,"formMethod",s.formMethod,s,null),he(n,t,"formTarget",s.formTarget,s,null)):(he(n,t,"encType",s.encType,s,null),he(n,t,"method",s.method,s,null),he(n,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){n.removeAttribute(e);break}i=Ah(""+i),n.setAttribute(e,i);break;case"onClick":i!=null&&(n.onclick=Tf);break;case"onScroll":i!=null&&Qt("scroll",n);break;case"onScrollEnd":i!=null&&Qt("scrollend",n);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(e=i.__html,e!=null){if(s.children!=null)throw Error(j(60));n.innerHTML=e}}break;case"multiple":n.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":n.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){n.removeAttribute("xlink:href");break}e=Ah(""+i),n.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",e);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(e,""+i):n.removeAttribute(e);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(e,""):n.removeAttribute(e);break;case"capture":case"download":i===!0?n.setAttribute(e,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?n.setAttribute(e,i):n.removeAttribute(e);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?n.setAttribute(e,i):n.removeAttribute(e);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?n.removeAttribute(e):n.setAttribute(e,i);break;case"popover":Qt("beforetoggle",n),Qt("toggle",n),Eh(n,"popover",i);break;case"xlinkActuate":Ss(n,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":Ss(n,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":Ss(n,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":Ss(n,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":Ss(n,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":Ss(n,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":Ss(n,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":Ss(n,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":Ss(n,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Eh(n,"is",i);break;case"innerText":case"textContent":break;default:(!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(e=VA.get(e)||e,Eh(n,e,i))}}function Eg(n,t,e,i,s,r){switch(e){case"style":d1(n,i,r);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(j(61));if(e=i.__html,e!=null){if(s.children!=null)throw Error(j(60));n.innerHTML=e}}break;case"children":typeof i=="string"?Ho(n,i):(typeof i=="number"||typeof i=="bigint")&&Ho(n,""+i);break;case"onScroll":i!=null&&Qt("scroll",n);break;case"onScrollEnd":i!=null&&Qt("scrollend",n);break;case"onClick":i!=null&&(n.onclick=Tf);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!o1.hasOwnProperty(e))t:{if(e[0]==="o"&&e[1]==="n"&&(s=e.endsWith("Capture"),t=e.slice(2,s?e.length-7:void 0),r=n[kn]||null,r=r!=null?r[e]:null,typeof r=="function"&&n.removeEventListener(t,r,s),typeof i=="function")){typeof r!="function"&&r!==null&&(e in n?n[e]=null:n.hasAttribute(e)&&n.removeAttribute(e)),n.addEventListener(t,i,s);break t}e in n?n[e]=i:i===!0?n.setAttribute(e,""):Eh(n,e,i)}}}function pn(n,t,e){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Qt("error",n),Qt("load",n);var i=!1,s=!1,r;for(r in e)if(e.hasOwnProperty(r)){var a=e[r];if(a!=null)switch(r){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:he(n,t,r,a,e,null)}}s&&he(n,t,"srcSet",e.srcSet,e,null),i&&he(n,t,"src",e.src,e,null);return;case"input":Qt("invalid",n);var o=r=a=s=null,l=null,c=null;for(i in e)if(e.hasOwnProperty(i)){var u=e[i];if(u!=null)switch(i){case"name":s=u;break;case"type":a=u;break;case"checked":l=u;break;case"defaultChecked":c=u;break;case"value":r=u;break;case"defaultValue":o=u;break;case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(j(137,t));break;default:he(n,t,i,u,e,null)}}u1(n,r,o,l,c,a,s,!1),kh(n);return;case"select":Qt("invalid",n),i=a=r=null;for(s in e)if(e.hasOwnProperty(s)&&(o=e[s],o!=null))switch(s){case"value":r=o;break;case"defaultValue":a=o;break;case"multiple":i=o;default:he(n,t,s,o,e,null)}t=r,e=a,n.multiple=!!i,t!=null?Uo(n,!!i,t,!1):e!=null&&Uo(n,!!i,e,!0);return;case"textarea":Qt("invalid",n),r=s=i=null;for(a in e)if(e.hasOwnProperty(a)&&(o=e[a],o!=null))switch(a){case"value":i=o;break;case"defaultValue":s=o;break;case"children":r=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(j(91));break;default:he(n,t,a,o,e,null)}f1(n,i,s,r),kh(n);return;case"option":for(l in e)e.hasOwnProperty(l)&&(i=e[l],i!=null)&&(l==="selected"?n.selected=i&&typeof i!="function"&&typeof i!="symbol":he(n,t,l,i,e,null));return;case"dialog":Qt("cancel",n),Qt("close",n);break;case"iframe":case"object":Qt("load",n);break;case"video":case"audio":for(i=0;i<Ec.length;i++)Qt(Ec[i],n);break;case"image":Qt("error",n),Qt("load",n);break;case"details":Qt("toggle",n);break;case"embed":case"source":case"link":Qt("error",n),Qt("load",n);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in e)if(e.hasOwnProperty(c)&&(i=e[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(j(137,t));default:he(n,t,c,i,e,null)}return;default:if(Bg(t)){for(u in e)e.hasOwnProperty(u)&&(i=e[u],i!==void 0&&Eg(n,t,u,i,e,void 0));return}}for(o in e)e.hasOwnProperty(o)&&(i=e[o],i!=null&&he(n,t,o,i,e,null))}function f2(n,t,e,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,r=null,a=null,o=null,l=null,c=null,u=null;for(h in e){var d=e[h];if(e.hasOwnProperty(h)&&d!=null)switch(h){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(h)||he(n,t,h,null,i,d)}}for(var f in i){var h=i[f];if(d=e[f],i.hasOwnProperty(f)&&(h!=null||d!=null))switch(f){case"type":r=h;break;case"name":s=h;break;case"checked":c=h;break;case"defaultChecked":u=h;break;case"value":a=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(j(137,t));break;default:h!==d&&he(n,t,f,h,i,d)}}Zm(n,a,o,l,c,u,r,s);return;case"select":h=a=o=f=null;for(r in e)if(l=e[r],e.hasOwnProperty(r)&&l!=null)switch(r){case"value":break;case"multiple":h=l;default:i.hasOwnProperty(r)||he(n,t,r,null,i,l)}for(s in i)if(r=i[s],l=e[s],i.hasOwnProperty(s)&&(r!=null||l!=null))switch(s){case"value":f=r;break;case"defaultValue":o=r;break;case"multiple":a=r;default:r!==l&&he(n,t,s,r,i,l)}t=o,e=a,i=h,f!=null?Uo(n,!!e,f,!1):!!i!=!!e&&(t!=null?Uo(n,!!e,t,!0):Uo(n,!!e,e?[]:"",!1));return;case"textarea":h=f=null;for(o in e)if(s=e[o],e.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:he(n,t,o,null,i,s)}for(a in i)if(s=i[a],r=e[a],i.hasOwnProperty(a)&&(s!=null||r!=null))switch(a){case"value":f=s;break;case"defaultValue":h=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(j(91));break;default:s!==r&&he(n,t,a,s,i,r)}h1(n,f,h);return;case"option":for(var m in e)f=e[m],e.hasOwnProperty(m)&&f!=null&&!i.hasOwnProperty(m)&&(m==="selected"?n.selected=!1:he(n,t,m,null,i,f));for(l in i)f=i[l],h=e[l],i.hasOwnProperty(l)&&f!==h&&(f!=null||h!=null)&&(l==="selected"?n.selected=f&&typeof f!="function"&&typeof f!="symbol":he(n,t,l,f,i,h));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var _ in e)f=e[_],e.hasOwnProperty(_)&&f!=null&&!i.hasOwnProperty(_)&&he(n,t,_,null,i,f);for(c in i)if(f=i[c],h=e[c],i.hasOwnProperty(c)&&f!==h&&(f!=null||h!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(j(137,t));break;default:he(n,t,c,f,i,h)}return;default:if(Bg(t)){for(var g in e)f=e[g],e.hasOwnProperty(g)&&f!==void 0&&!i.hasOwnProperty(g)&&Eg(n,t,g,void 0,i,f);for(u in i)f=i[u],h=e[u],!i.hasOwnProperty(u)||f===h||f===void 0&&h===void 0||Eg(n,t,u,f,i,h);return}}for(var p in e)f=e[p],e.hasOwnProperty(p)&&f!=null&&!i.hasOwnProperty(p)&&he(n,t,p,null,i,f);for(d in i)f=i[d],h=e[d],!i.hasOwnProperty(d)||f===h||f==null&&h==null||he(n,t,d,f,i,h)}var Ag=null,wg=null;function af(n){return n.nodeType===9?n:n.ownerDocument}function Ux(n){switch(n){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function lb(n,t){if(n===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return n===1&&t==="foreignObject"?0:n}function Rg(n,t){return n==="textarea"||n==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var zm=null;function d2(){var n=window.event;return n&&n.type==="popstate"?n===zm?!1:(zm=n,!0):(zm=null,!1)}var cb=typeof setTimeout=="function"?setTimeout:void 0,p2=typeof clearTimeout=="function"?clearTimeout:void 0,Lx=typeof Promise=="function"?Promise:void 0,m2=typeof queueMicrotask=="function"?queueMicrotask:typeof Lx<"u"?function(n){return Lx.resolve(null).then(n).catch(g2)}:cb;function g2(n){setTimeout(function(){throw n})}function Fm(n,t){var e=t,i=0;do{var s=e.nextSibling;if(n.removeChild(e),s&&s.nodeType===8)if(e=s.data,e==="/$"){if(i===0){n.removeChild(s),Uc(t);return}i--}else e!=="$"&&e!=="$?"&&e!=="$!"||i++;e=s}while(e);Uc(t)}function Cg(n){var t=n.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var e=t;switch(t=t.nextSibling,e.nodeName){case"HTML":case"HEAD":case"BODY":Cg(e),Ig(e);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(e.rel.toLowerCase()==="stylesheet")continue}n.removeChild(e)}}function _2(n,t,e,i){for(;n.nodeType===1;){var s=e;if(n.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(n.nodeName!=="INPUT"||n.type!=="hidden"))break}else if(i){if(!n[vc])switch(t){case"meta":if(!n.hasAttribute("itemprop"))break;return n;case"link":if(r=n.getAttribute("rel"),r==="stylesheet"&&n.hasAttribute("data-precedence"))break;if(r!==s.rel||n.getAttribute("href")!==(s.href==null?null:s.href)||n.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||n.getAttribute("title")!==(s.title==null?null:s.title))break;return n;case"style":if(n.hasAttribute("data-precedence"))break;return n;case"script":if(r=n.getAttribute("src"),(r!==(s.src==null?null:s.src)||n.getAttribute("type")!==(s.type==null?null:s.type)||n.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&r&&n.hasAttribute("async")&&!n.hasAttribute("itemprop"))break;return n;default:return n}}else if(t==="input"&&n.type==="hidden"){var r=s.name==null?null:""+s.name;if(s.type==="hidden"&&n.getAttribute("name")===r)return n}else return n;if(n=Vi(n.nextSibling),n===null)break}return null}function v2(n,t,e){if(t==="")return null;for(;n.nodeType!==3;)if((n.nodeType!==1||n.nodeName!=="INPUT"||n.type!=="hidden")&&!e||(n=Vi(n.nextSibling),n===null))return null;return n}function Vi(n){for(;n!=null;n=n.nextSibling){var t=n.nodeType;if(t===1||t===3)break;if(t===8){if(t=n.data,t==="$"||t==="$!"||t==="$?"||t==="F!"||t==="F")break;if(t==="/$")return null}}return n}function Nx(n){n=n.previousSibling;for(var t=0;n;){if(n.nodeType===8){var e=n.data;if(e==="$"||e==="$!"||e==="$?"){if(t===0)return n;t--}else e==="/$"&&t++}n=n.previousSibling}return null}function ub(n,t,e){switch(t=af(e),n){case"html":if(n=t.documentElement,!n)throw Error(j(452));return n;case"head":if(n=t.head,!n)throw Error(j(453));return n;case"body":if(n=t.body,!n)throw Error(j(454));return n;default:throw Error(j(451))}}var Ri=new Map,Ox=new Set;function of(n){return typeof n.getRootNode=="function"?n.getRootNode():n.ownerDocument}var zs=Se.d;Se.d={f:y2,r:x2,D:S2,C:b2,L:M2,m:T2,X:A2,S:E2,M:w2};function y2(){var n=zs.f(),t=bf();return n||t}function x2(n){var t=Qo(n);t!==null&&t.tag===5&&t.type==="form"?uS(t):zs.r(n)}var Jo=typeof document>"u"?null:document;function hb(n,t,e){var i=Jo;if(i&&typeof t=="string"&&t){var s=Mi(t);s='link[rel="'+n+'"][href="'+s+'"]',typeof e=="string"&&(s+='[crossorigin="'+e+'"]'),Ox.has(s)||(Ox.add(s),n={rel:n,crossOrigin:e,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),pn(t,"link",n),an(t),i.head.appendChild(t)))}}function S2(n){zs.D(n),hb("dns-prefetch",n,null)}function b2(n,t){zs.C(n,t),hb("preconnect",n,t)}function M2(n,t,e){zs.L(n,t,e);var i=Jo;if(i&&n&&t){var s='link[rel="preload"][as="'+Mi(t)+'"]';t==="image"&&e&&e.imageSrcSet?(s+='[imagesrcset="'+Mi(e.imageSrcSet)+'"]',typeof e.imageSizes=="string"&&(s+='[imagesizes="'+Mi(e.imageSizes)+'"]')):s+='[href="'+Mi(n)+'"]';var r=s;switch(t){case"style":r=qo(n);break;case"script":r=jo(n)}Ri.has(r)||(n=be({rel:"preload",href:t==="image"&&e&&e.imageSrcSet?void 0:n,as:t},e),Ri.set(r,n),i.querySelector(s)!==null||t==="style"&&i.querySelector(Vc(r))||t==="script"&&i.querySelector(Gc(r))||(t=i.createElement("link"),pn(t,"link",n),an(t),i.head.appendChild(t)))}}function T2(n,t){zs.m(n,t);var e=Jo;if(e&&n){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+Mi(i)+'"][href="'+Mi(n)+'"]',r=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=jo(n)}if(!Ri.has(r)&&(n=be({rel:"modulepreload",href:n},t),Ri.set(r,n),e.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(e.querySelector(Gc(r)))return}i=e.createElement("link"),pn(i,"link",n),an(i),e.head.appendChild(i)}}}function E2(n,t,e){zs.S(n,t,e);var i=Jo;if(i&&n){var s=Do(i).hoistableStyles,r=qo(n);t=t||"default";var a=s.get(r);if(!a){var o={loading:0,preload:null};if(a=i.querySelector(Vc(r)))o.loading=5;else{n=be({rel:"stylesheet",href:n,"data-precedence":t},e),(e=Ri.get(r))&&y0(n,e);var l=a=i.createElement("link");an(l),pn(l,"link",n),l._p=new Promise(function(c,u){l.onload=c,l.onerror=u}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Oh(a,t,i)}a={type:"stylesheet",instance:a,count:1,state:o},s.set(r,a)}}}function A2(n,t){zs.X(n,t);var e=Jo;if(e&&n){var i=Do(e).hoistableScripts,s=jo(n),r=i.get(s);r||(r=e.querySelector(Gc(s)),r||(n=be({src:n,async:!0},t),(t=Ri.get(s))&&x0(n,t),r=e.createElement("script"),an(r),pn(r,"link",n),e.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(s,r))}}function w2(n,t){zs.M(n,t);var e=Jo;if(e&&n){var i=Do(e).hoistableScripts,s=jo(n),r=i.get(s);r||(r=e.querySelector(Gc(s)),r||(n=be({src:n,async:!0,type:"module"},t),(t=Ri.get(s))&&x0(n,t),r=e.createElement("script"),an(r),pn(r,"link",n),e.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(s,r))}}function Px(n,t,e,i){var s=(s=mr.current)?of(s):null;if(!s)throw Error(j(446));switch(n){case"meta":case"title":return null;case"style":return typeof e.precedence=="string"&&typeof e.href=="string"?(t=qo(e.href),e=Do(s).hoistableStyles,i=e.get(t),i||(i={type:"style",instance:null,count:0,state:null},e.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(e.rel==="stylesheet"&&typeof e.href=="string"&&typeof e.precedence=="string"){n=qo(e.href);var r=Do(s).hoistableStyles,a=r.get(n);if(a||(s=s.ownerDocument||s,a={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(n,a),(r=s.querySelector(Vc(n)))&&!r._p&&(a.instance=r,a.state.loading=5),Ri.has(n)||(e={rel:"preload",as:"style",href:e.href,crossOrigin:e.crossOrigin,integrity:e.integrity,media:e.media,hrefLang:e.hrefLang,referrerPolicy:e.referrerPolicy},Ri.set(n,e),r||R2(s,n,e,a.state))),t&&i===null)throw Error(j(528,""));return a}if(t&&i!==null)throw Error(j(529,""));return null;case"script":return t=e.async,e=e.src,typeof e=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=jo(e),e=Do(s).hoistableScripts,i=e.get(t),i||(i={type:"script",instance:null,count:0,state:null},e.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(j(444,n))}}function qo(n){return'href="'+Mi(n)+'"'}function Vc(n){return'link[rel="stylesheet"]['+n+"]"}function fb(n){return be({},n,{"data-precedence":n.precedence,precedence:null})}function R2(n,t,e,i){n.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=n.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),pn(t,"link",e),an(t),n.head.appendChild(t))}function jo(n){return'[src="'+Mi(n)+'"]'}function Gc(n){return"script[async]"+n}function Ix(n,t,e){if(t.count++,t.instance===null)switch(t.type){case"style":var i=n.querySelector('style[data-href~="'+Mi(e.href)+'"]');if(i)return t.instance=i,an(i),i;var s=be({},e,{"data-href":e.href,"data-precedence":e.precedence,href:null,precedence:null});return i=(n.ownerDocument||n).createElement("style"),an(i),pn(i,"style",s),Oh(i,e.precedence,n),t.instance=i;case"stylesheet":s=qo(e.href);var r=n.querySelector(Vc(s));if(r)return t.state.loading|=4,t.instance=r,an(r),r;i=fb(e),(s=Ri.get(s))&&y0(i,s),r=(n.ownerDocument||n).createElement("link"),an(r);var a=r;return a._p=new Promise(function(o,l){a.onload=o,a.onerror=l}),pn(r,"link",i),t.state.loading|=4,Oh(r,e.precedence,n),t.instance=r;case"script":return r=jo(e.src),(s=n.querySelector(Gc(r)))?(t.instance=s,an(s),s):(i=e,(s=Ri.get(r))&&(i=be({},e),x0(i,s)),n=n.ownerDocument||n,s=n.createElement("script"),an(s),pn(s,"link",i),n.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(j(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Oh(i,e.precedence,n));return t.instance}function Oh(n,t,e){for(var i=e.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,r=s,a=0;a<i.length;a++){var o=i[a];if(o.dataset.precedence===t)r=o;else if(r!==s)break}r?r.parentNode.insertBefore(n,r.nextSibling):(t=e.nodeType===9?e.head:e,t.insertBefore(n,t.firstChild))}function y0(n,t){n.crossOrigin==null&&(n.crossOrigin=t.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=t.referrerPolicy),n.title==null&&(n.title=t.title)}function x0(n,t){n.crossOrigin==null&&(n.crossOrigin=t.crossOrigin),n.referrerPolicy==null&&(n.referrerPolicy=t.referrerPolicy),n.integrity==null&&(n.integrity=t.integrity)}var Ph=null;function Bx(n,t,e){if(Ph===null){var i=new Map,s=Ph=new Map;s.set(e,i)}else s=Ph,i=s.get(e),i||(i=new Map,s.set(e,i));if(i.has(n))return i;for(i.set(n,null),e=e.getElementsByTagName(n),s=0;s<e.length;s++){var r=e[s];if(!(r[vc]||r[Sn]||n==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var a=r.getAttribute(t)||"";a=n+a;var o=i.get(a);o?o.push(r):i.set(a,[r])}}return i}function zx(n,t,e){n=n.ownerDocument||n,n.head.insertBefore(e,t==="title"?n.querySelector("head > title"):null)}function C2(n,t,e){if(e===1||t.itemProp!=null)return!1;switch(n){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(n=t.disabled,typeof t.precedence=="string"&&n==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function db(n){return!(n.type==="stylesheet"&&(n.state.loading&3)===0)}var wc=null;function D2(){}function U2(n,t,e){if(wc===null)throw Error(j(475));var i=wc;if(t.type==="stylesheet"&&(typeof e.media!="string"||matchMedia(e.media).matches!==!1)&&(t.state.loading&4)===0){if(t.instance===null){var s=qo(e.href),r=n.querySelector(Vc(s));if(r){n=r._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(i.count++,i=lf.bind(i),n.then(i,i)),t.state.loading|=4,t.instance=r,an(r);return}r=n.ownerDocument||n,e=fb(e),(s=Ri.get(s))&&y0(e,s),r=r.createElement("link"),an(r);var a=r;a._p=new Promise(function(o,l){a.onload=o,a.onerror=l}),pn(r,"link",e),t.instance=r}i.stylesheets===null&&(i.stylesheets=new Map),i.stylesheets.set(t,n),(n=t.state.preload)&&(t.state.loading&3)===0&&(i.count++,t=lf.bind(i),n.addEventListener("load",t),n.addEventListener("error",t))}}function L2(){if(wc===null)throw Error(j(475));var n=wc;return n.stylesheets&&n.count===0&&Dg(n,n.stylesheets),0<n.count?function(t){var e=setTimeout(function(){if(n.stylesheets&&Dg(n,n.stylesheets),n.unsuspend){var i=n.unsuspend;n.unsuspend=null,i()}},6e4);return n.unsuspend=t,function(){n.unsuspend=null,clearTimeout(e)}}:null}function lf(){if(this.count--,this.count===0){if(this.stylesheets)Dg(this,this.stylesheets);else if(this.unsuspend){var n=this.unsuspend;this.unsuspend=null,n()}}}var cf=null;function Dg(n,t){n.stylesheets=null,n.unsuspend!==null&&(n.count++,cf=new Map,t.forEach(N2,n),cf=null,lf.call(n))}function N2(n,t){if(!(t.state.loading&4)){var e=cf.get(n);if(e)var i=e.get(null);else{e=new Map,cf.set(n,e);for(var s=n.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<s.length;r++){var a=s[r];(a.nodeName==="LINK"||a.getAttribute("media")!=="not all")&&(e.set(a.dataset.precedence,a),i=a)}i&&e.set(null,i)}s=t.instance,a=s.getAttribute("data-precedence"),r=e.get(a)||i,r===i&&e.set(null,s),e.set(a,s),this.count++,i=lf.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),r?r.parentNode.insertBefore(s,r.nextSibling):(n=n.nodeType===9?n.head:n,n.insertBefore(s,n.firstChild)),t.state.loading|=4}}var Rc={$$typeof:Rs,Provider:null,Consumer:null,_currentValue:ca,_currentValue2:ca,_threadCount:0};function O2(n,t,e,i,s,r,a,o){this.tag=1,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=dm(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.finishedLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=dm(0),this.hiddenUpdates=dm(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=r,this.onRecoverableError=a,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=o,this.incompleteTransitions=new Map}function pb(n,t,e,i,s,r,a,o,l,c,u,d){return n=new O2(n,t,e,a,o,l,c,d),t=1,r===!0&&(t|=24),r=Ei(3,null,null,t),n.current=r,r.stateNode=n,t=Zg(),t.refCount++,n.pooledCache=t,t.refCount++,r.memoizedState={element:i,isDehydrated:e,cache:t},c0(r),n}function mb(n){return n?(n=Ao,n):Ao}function gb(n,t,e,i,s,r){s=mb(s),i.context===null?i.context=s:i.pendingContext=s,i=gr(t),i.payload={element:e},r=r===void 0?null:r,r!==null&&(i.callback=r),e=_r(n,i,t),e!==null&&(Pn(e,n,t),uc(e,n,t))}function Fx(n,t){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var e=n.retryLane;n.retryLane=e!==0&&e<t?e:t}}function S0(n,t){Fx(n,t),(n=n.alternate)&&Fx(n,t)}function _b(n){if(n.tag===13){var t=Mr(n,67108864);t!==null&&Pn(t,n,67108864),S0(n,67108864)}}var uf=!0;function P2(n,t,e,i){var s=Ft.T;Ft.T=null;var r=Se.p;try{Se.p=2,b0(n,t,e,i)}finally{Se.p=r,Ft.T=s}}function I2(n,t,e,i){var s=Ft.T;Ft.T=null;var r=Se.p;try{Se.p=8,b0(n,t,e,i)}finally{Se.p=r,Ft.T=s}}function b0(n,t,e,i){if(uf){var s=Ug(i);if(s===null)Bm(n,t,i,hf,e),Hx(n,i);else if(z2(s,n,t,e,i))i.stopPropagation();else if(Hx(n,i),t&4&&-1<B2.indexOf(n)){for(;s!==null;){var r=Qo(s);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var a=sa(r.pendingLanes);if(a!==0){var o=r;for(o.pendingLanes|=2,o.entangledLanes|=2;a;){var l=1<<31-ti(a);o.entanglements[1]|=l,a&=~l}ls(r),(Ce&6)===0&&(tf=ss()+500,kc(0,!1))}}break;case 13:o=Mr(r,2),o!==null&&Pn(o,r,2),bf(),S0(r,2)}if(r=Ug(i),r===null&&Bm(n,t,i,hf,e),r===s)break;s=r}s!==null&&i.stopPropagation()}else Bm(n,t,i,null,e)}}function Ug(n){return n=zg(n),M0(n)}var hf=null;function M0(n){if(hf=null,n=oa(n),n!==null){var t=Yo(n);if(t===null)n=null;else{var e=t.tag;if(e===13){if(n=Qx(t),n!==null)return n;n=null}else if(e===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;n=null}else t!==n&&(n=null)}}return hf=n,null}function vb(n){switch(n){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(TA()){case Jx:return 2;case jx:return 8;case Hh:case EA:return 32;case $x:return 268435456;default:return 32}default:return 32}}var Lg=!1,xr=null,Sr=null,br=null,Cc=new Map,Dc=new Map,fr=[],B2="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Hx(n,t){switch(n){case"focusin":case"focusout":xr=null;break;case"dragenter":case"dragleave":Sr=null;break;case"mouseover":case"mouseout":br=null;break;case"pointerover":case"pointerout":Cc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Dc.delete(t.pointerId)}}function Ql(n,t,e,i,s,r){return n===null||n.nativeEvent!==r?(n={blockedOn:t,domEventName:e,eventSystemFlags:i,nativeEvent:r,targetContainers:[s]},t!==null&&(t=Qo(t),t!==null&&_b(t)),n):(n.eventSystemFlags|=i,t=n.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),n)}function z2(n,t,e,i,s){switch(t){case"focusin":return xr=Ql(xr,n,t,e,i,s),!0;case"dragenter":return Sr=Ql(Sr,n,t,e,i,s),!0;case"mouseover":return br=Ql(br,n,t,e,i,s),!0;case"pointerover":var r=s.pointerId;return Cc.set(r,Ql(Cc.get(r)||null,n,t,e,i,s)),!0;case"gotpointercapture":return r=s.pointerId,Dc.set(r,Ql(Dc.get(r)||null,n,t,e,i,s)),!0}return!1}function yb(n){var t=oa(n.target);if(t!==null){var e=Yo(t);if(e!==null){if(t=e.tag,t===13){if(t=Qx(e),t!==null){n.blockedOn=t,OA(n.priority,function(){if(e.tag===13){var i=ei(),s=Mr(e,i);s!==null&&Pn(s,e,i),S0(e,i)}});return}}else if(t===3&&e.stateNode.current.memoizedState.isDehydrated){n.blockedOn=e.tag===3?e.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ih(n){if(n.blockedOn!==null)return!1;for(var t=n.targetContainers;0<t.length;){var e=Ug(n.nativeEvent);if(e===null){e=n.nativeEvent;var i=new e.constructor(e.type,e);Km=i,e.target.dispatchEvent(i),Km=null}else return t=Qo(e),t!==null&&_b(t),n.blockedOn=e,!1;t.shift()}return!0}function kx(n,t,e){Ih(n)&&e.delete(t)}function F2(){Lg=!1,xr!==null&&Ih(xr)&&(xr=null),Sr!==null&&Ih(Sr)&&(Sr=null),br!==null&&Ih(br)&&(br=null),Cc.forEach(kx),Dc.forEach(kx)}function Mh(n,t){n.blockedOn===t&&(n.blockedOn=null,Lg||(Lg=!0,$e.unstable_scheduleCallback($e.unstable_NormalPriority,F2)))}var Th=null;function Vx(n){Th!==n&&(Th=n,$e.unstable_scheduleCallback($e.unstable_NormalPriority,function(){Th===n&&(Th=null);for(var t=0;t<n.length;t+=3){var e=n[t],i=n[t+1],s=n[t+2];if(typeof i!="function"){if(M0(i||e)===null)continue;break}var r=Qo(e);r!==null&&(n.splice(t,3),t-=3,ag(r,{pending:!0,data:s,method:e.method,action:i},i,s))}}))}function Uc(n){function t(l){return Mh(l,n)}xr!==null&&Mh(xr,n),Sr!==null&&Mh(Sr,n),br!==null&&Mh(br,n),Cc.forEach(t),Dc.forEach(t);for(var e=0;e<fr.length;e++){var i=fr[e];i.blockedOn===n&&(i.blockedOn=null)}for(;0<fr.length&&(e=fr[0],e.blockedOn===null);)yb(e),e.blockedOn===null&&fr.shift();if(e=(n.ownerDocument||n).$$reactFormReplay,e!=null)for(i=0;i<e.length;i+=3){var s=e[i],r=e[i+1],a=s[kn]||null;if(typeof r=="function")a||Vx(e);else if(a){var o=null;if(r&&r.hasAttribute("formAction")){if(s=r,a=r[kn]||null)o=a.formAction;else if(M0(s)!==null)continue}else o=a.action;typeof o=="function"?e[i+1]=o:(e.splice(i,3),i-=3),Vx(e)}}}function T0(n){this._internalRoot=n}Ef.prototype.render=T0.prototype.render=function(n){var t=this._internalRoot;if(t===null)throw Error(j(409));var e=t.current,i=ei();gb(e,i,n,t,null,null)};Ef.prototype.unmount=T0.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var t=n.containerInfo;n.tag===0&&Bo(),gb(n.current,2,null,n,null,null),bf(),t[Zo]=null}};function Ef(n){this._internalRoot=n}Ef.prototype.unstable_scheduleHydration=function(n){if(n){var t=r1();n={blockedOn:null,target:n,priority:t};for(var e=0;e<fr.length&&t!==0&&t<fr[e].priority;e++);fr.splice(e,0,n),e===0&&yb(n)}};var Gx=Wx.version;if(Gx!=="19.0.0")throw Error(j(527,Gx,"19.0.0"));Se.findDOMNode=function(n){var t=n._reactInternals;if(t===void 0)throw typeof n.render=="function"?Error(j(188)):(n=Object.keys(n).join(","),Error(j(268,n)));return n=SA(t),n=n!==null?Kx(n):null,n=n===null?null:n.stateNode,n};var H2={bundleType:0,version:"19.0.0",rendererPackageName:"react-dom",currentDispatcherRef:Ft,findFiberByHostInstance:oa,reconcilerVersion:"19.0.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Kl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Kl.isDisabled&&Kl.supportsFiber))try{Lc=Kl.inject(H2),$n=Kl}catch{}var Kl;Af.createRoot=function(n,t){if(!Xx(n))throw Error(j(299));var e=!1,i="",s=gS,r=_S,a=vS,o=null;return t!=null&&(t.unstable_strictMode===!0&&(e=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(a=t.onRecoverableError),t.unstable_transitionCallbacks!==void 0&&(o=t.unstable_transitionCallbacks)),t=pb(n,1,!1,null,null,e,i,s,r,a,o,null),n[Zo]=t.current,v0(n.nodeType===8?n.parentNode:n),new T0(t)};Af.hydrateRoot=function(n,t,e){if(!Xx(n))throw Error(j(299));var i=!1,s="",r=gS,a=_S,o=vS,l=null,c=null;return e!=null&&(e.unstable_strictMode===!0&&(i=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onUncaughtError!==void 0&&(r=e.onUncaughtError),e.onCaughtError!==void 0&&(a=e.onCaughtError),e.onRecoverableError!==void 0&&(o=e.onRecoverableError),e.unstable_transitionCallbacks!==void 0&&(l=e.unstable_transitionCallbacks),e.formState!==void 0&&(c=e.formState)),t=pb(n,1,!0,t,e??null,i,s,r,a,o,l,c),t.context=mb(null),e=t.current,i=ei(),s=gr(i),s.callback=null,_r(e,s,i),t.current.lanes=i,Oc(t,i),ls(t),n[Zo]=t.current,v0(n),new Ef(t)};Af.version="19.0.0"});var Mb=ji((DO,bb)=>{"use strict";function Sb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sb)}catch(n){console.error(n)}}Sb(),bb.exports=xb()});var AE=ji(Xp=>{"use strict";var sO=Symbol.for("react.transitional.element"),rO=Symbol.for("react.fragment");function EE(n,t,e){var i=null;if(e!==void 0&&(i=""+e),t.key!==void 0&&(i=""+t.key),"key"in t){e={};for(var s in t)s!=="key"&&(e[s]=t[s])}else e=t;return t=e.ref,{$$typeof:sO,type:n,key:i,ref:t!==void 0?t:null,props:e}}Xp.Fragment=rO;Xp.jsx=EE;Xp.jsxs=EE});var ao=ji((bz,wE)=>{"use strict";wE.exports=AE()});var Ji=$i(ho(),1),kv=$i(Mb(),1);var Ki=$i(ho(),1);var Qb=0,a_=1,Kb=2;var o_=1,Jb=2,fs=3,Xs=0,gn=1,ci=2,Zi=0,Na=1,Qs=2,l_=3,c_=4,jb=5,Br=100,$b=101,tM=102,eM=103,nM=104,iM=200,sM=201,rM=202,aM=203,Jf=204,jf=205,oM=206,lM=207,cM=208,uM=209,hM=210,fM=211,dM=212,pM=213,mM=214,wd=0,Rd=1,Cd=2,Oa=3,Dd=4,Ud=5,Ld=6,Nd=7,u_=0,gM=1,_M=2,Ks=0,vM=1,yM=2,xM=3,Od=4,SM=5,bM=6,MM=7;var h_=300,ka=301,Va=302,Pd=303,Id=304,Eu=306,$f=1e3,Ir=1001,td=1002,Di=1003,TM=1004;var Au=1005;var Yi=1006,Bd=1007;var Vr=1008;var ds=1009,f_=1010,d_=1011,xl=1012,zd=1013,Gr=1014,ps=1015,Li=1016,Fd=1017,Hd=1018,Ga=1020,p_=35902,m_=1021,g_=1022,Ni=1023,__=1024,v_=1025,La=1026,Pa=1027,y_=1028,kd=1029,x_=1030,Vd=1031;var Gd=1033,wu=33776,Ru=33777,Cu=33778,Du=33779,Wd=35840,Xd=35841,qd=35842,Yd=35843,Zd=36196,Qd=37492,Kd=37496,Jd=37808,jd=37809,$d=37810,tp=37811,ep=37812,np=37813,ip=37814,sp=37815,rp=37816,ap=37817,op=37818,lp=37819,cp=37820,up=37821,Uu=36492,hp=36494,fp=36495,S_=36283,dp=36284,pp=36285,mp=36286;var Jc=2300,ed=2301,Kf=2302,K0=2400,J0=2401,j0=2402;var EM=3200,AM=3201;var wM=0,RM=1,Js="",ri="srgb",Ia="srgb-linear",jc="linear",ue="srgb";var Da=7680;var $0=519,CM=512,DM=513,UM=514,b_=515,LM=516,NM=517,OM=518,PM=519,t_=35044;var M_="300 es",us=2e3,$c=2001;var qs=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var E0=Math.PI/180,nd=180/Math.PI;function Sl(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[t&255]+Mn[t>>8&255]+"-"+Mn[t>>16&15|64]+Mn[t>>24&255]+"-"+Mn[e&63|128]+Mn[e>>8&255]+"-"+Mn[e>>16&255]+Mn[e>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function Zt(n,t,e){return Math.max(t,Math.min(e,n))}function k2(n,t){return(n%t+t)%t}function A0(n,t,e){return(1-e)*n+e*t}function Wc(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Gn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var mt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ht=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],h=i[5],m=i[8],_=s[0],g=s[3],p=s[6],v=s[1],y=s[4],x=s[7],M=s[2],w=s[5],E=s[8];return r[0]=a*_+o*v+l*M,r[3]=a*g+o*y+l*w,r[6]=a*p+o*x+l*E,r[1]=c*_+u*v+d*M,r[4]=c*g+u*y+d*w,r[7]=c*p+u*x+d*E,r[2]=f*_+h*v+m*M,r[5]=f*g+h*y+m*w,r[8]=f*p+h*x+m*E,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,f=o*l-u*r,h=c*r-a*l,m=e*d+i*f+s*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return t[0]=d*_,t[1]=(s*c-u*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=h*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(w0.makeScale(t,e)),this}rotate(t){return this.premultiply(w0.makeRotation(-t)),this}translate(t,e){return this.premultiply(w0.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},w0=new Ht;function T_(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function tu(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function IM(){let n=tu("canvas");return n.style.display="block",n}var Tb={};function Wr(n){n in Tb||(Tb[n]=!0,console.warn(n))}function BM(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function zM(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function FM(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Eb=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ab=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function V2(){let n={enabled:!0,workingColorSpace:Ia,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ue&&(s.r=Ws(s.r),s.g=Ws(s.g),s.b=Ws(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ue&&(s.r=fl(s.r),s.g=fl(s.g),s.b=fl(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Js?jc:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ia]:{primaries:t,whitePoint:i,transfer:jc,toXYZ:Eb,fromXYZ:Ab,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:t,whitePoint:i,transfer:ue,toXYZ:Eb,fromXYZ:Ab,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}}),n}var ee=V2();function Ws(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fl(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var $o,id=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{$o===void 0&&($o=tu("canvas")),$o.width=t.width,$o.height=t.height;let i=$o.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=$o}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=tu("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ws(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ws(e[i]/255)*255):e[i]=Ws(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},G2=0,pl=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:G2++}),this.uuid=Sl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(R0(s[a].image)):r.push(R0(s[a]))}else r=R0(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function R0(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?id.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var W2=0,ai=class n extends qs{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Ir,s=Ir,r=Yi,a=Vr,o=Ni,l=ds,c=n.DEFAULT_ANISOTROPY,u=Js){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:W2++}),this.uuid=Sl(),this.name="",this.source=new pl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==h_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $f:t.x=t.x-Math.floor(t.x);break;case Ir:t.x=t.x<0?0:1;break;case td:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $f:t.y=t.y-Math.floor(t.y);break;case Ir:t.y=t.y<0?0:1;break;case td:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ai.DEFAULT_IMAGE=null;ai.DEFAULT_MAPPING=h_;ai.DEFAULT_ANISOTROPY=1;var He=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(c+1)/2,x=(h+1)/2,M=(p+1)/2,w=(u+f)/4,E=(d+_)/4,R=(m+g)/4;return y>x&&y>M?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=w/i,r=E/i):x>M?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=w/s,r=R/s):M<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),i=E/r,s=R/r),this.set(i,s,r,e),this}let v=Math.sqrt((g-m)*(g-m)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-_)/v,this.z=(f-u)/v,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},sd=class extends qs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new He(0,0,t,e),this.scissorTest=!1,this.viewport=new He(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new ai(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new pl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends sd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},eu=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Di,this.minFilter=Di,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var rd=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Di,this.minFilter=Di,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ys=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],f=r[a+0],h=r[a+1],m=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=h,t[e+2]=m,t[e+3]=_;return}if(d!==_||l!==f||c!==h||u!==m){let g=1-o,p=l*f+c*h+u*m+d*_,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){let M=Math.sqrt(y),w=Math.atan2(M,p*v);g=Math.sin(g*w)/M,o=Math.sin(o*w)/M}let x=o*v;if(l=l*g+f*x,c=c*g+h*x,u=u*g+m*x,d=d*g+_*x,g===1-o){let M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],f=r[a+1],h=r[a+2],m=r[a+3];return t[e]=o*m+u*d+l*h-c*f,t[e+1]=l*m+u*f+c*d-o*h,t[e+2]=c*m+u*h+o*f-l*d,t[e+3]=u*m-o*d-l*f-c*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),f=l(i/2),h=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=f*u*d+c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d-f*h*m;break;case"YXZ":this._x=f*u*d+c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d+f*h*m;break;case"ZXY":this._x=f*u*d-c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d-f*h*m;break;case"ZYX":this._x=f*u*d-c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d+f*h*m;break;case"YZX":this._x=f*u*d+c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d-f*h*m;break;case"XZY":this._x=f*u*d-c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d+f*h*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],f=i+o+d;if(f>0){let h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(a-s)*h}else if(i>o&&i>d){let h=2*Math.sqrt(1+i-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+a)/h,this._z=(r+c)/h}else if(o>d){let h=2*Math.sqrt(1+o-i-d);this._w=(r-c)/h,this._x=(s+a)/h,this._y=.25*h,this._z=(l+u)/h}else{let h=2*Math.sqrt(1+d-i-o);this._w=(a-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let h=1-e;return this._w=h*a+e*this._w,this._x=h*i+e*this._x,this._y=h*s+e*this._y,this._z=h*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=a*d+this._w*f,this._x=i*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(wb.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(wb.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Zt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return C0.copy(this).projectOnVector(t),this.sub(C0)}reflect(t){return this.sub(C0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Zt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},C0=new I,wb=new Ys,zr=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Wi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Wi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=Wi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Wi):Wi.fromBufferAttribute(r,a),Wi.applyMatrix4(t.matrixWorld),this.expandByPoint(Wi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wf.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),wf.copy(i.boundingBox)),wf.applyMatrix4(t.matrixWorld),this.union(wf)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Wi),Wi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xc),Rf.subVectors(this.max,Xc),tl.subVectors(t.a,Xc),el.subVectors(t.b,Xc),nl.subVectors(t.c,Xc),Cr.subVectors(el,tl),Dr.subVectors(nl,el),Aa.subVectors(tl,nl);let e=[0,-Cr.z,Cr.y,0,-Dr.z,Dr.y,0,-Aa.z,Aa.y,Cr.z,0,-Cr.x,Dr.z,0,-Dr.x,Aa.z,0,-Aa.x,-Cr.y,Cr.x,0,-Dr.y,Dr.x,0,-Aa.y,Aa.x,0];return!D0(e,tl,el,nl,Rf)||(e=[1,0,0,0,1,0,0,0,1],!D0(e,tl,el,nl,Rf))?!1:(Cf.crossVectors(Cr,Dr),e=[Cf.x,Cf.y,Cf.z],D0(e,tl,el,nl,Rf))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Wi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Wi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Fs=[new I,new I,new I,new I,new I,new I,new I,new I],Wi=new I,wf=new zr,tl=new I,el=new I,nl=new I,Cr=new I,Dr=new I,Aa=new I,Xc=new I,Rf=new I,Cf=new I,wa=new I;function D0(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){wa.fromArray(n,r);let o=s.x*Math.abs(wa.x)+s.y*Math.abs(wa.y)+s.z*Math.abs(wa.z),l=t.dot(wa),c=e.dot(wa),u=i.dot(wa);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var X2=new zr,qc=new I,U0=new I,Ba=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):X2.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qc.subVectors(t,this.center);let e=qc.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(qc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(U0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qc.copy(t.center).add(U0)),this.expandByPoint(qc.copy(t.center).sub(U0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Hs=new I,L0=new I,Df=new I,Ur=new I,N0=new I,Uf=new I,O0=new I,nu=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Hs)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Hs.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Hs.copy(this.origin).addScaledVector(this.direction,e),Hs.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){L0.copy(t).add(e).multiplyScalar(.5),Df.copy(e).sub(t).normalize(),Ur.copy(this.origin).sub(L0);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Df),o=Ur.dot(this.direction),l=-Ur.dot(Df),c=Ur.lengthSq(),u=Math.abs(1-a*a),d,f,h,m;if(u>0)if(d=a*l-o,f=a*o-l,m=r*u,d>=0)if(f>=-m)if(f<=m){let _=1/u;d*=_,f*=_,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(L0).addScaledVector(Df,f),h}intersectSphere(t,e){Hs.subVectors(t.center,this.origin);let i=Hs.dot(this.direction),s=Hs.dot(Hs)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Hs)!==null}intersectTriangle(t,e,i,s,r){N0.subVectors(e,t),Uf.subVectors(i,t),O0.crossVectors(N0,Uf);let a=this.direction.dot(O0),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ur.subVectors(this.origin,t);let l=o*this.direction.dot(Uf.crossVectors(Ur,Uf));if(l<0)return null;let c=o*this.direction.dot(N0.cross(Ur));if(c<0||l+c>a)return null;let u=-o*Ur.dot(O0);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fe=class n{constructor(t,e,i,s,r,a,o,l,c,u,d,f,h,m,_,g){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,d,f,h,m,_,g)}set(t,e,i,s,r,a,o,l,c,u,d,f,h,m,_,g){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/il.setFromMatrixColumn(t,0).length(),r=1/il.setFromMatrixColumn(t,1).length(),a=1/il.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*u,h=a*d,m=o*u,_=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=h+m*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=m+h*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*u,h=l*d,m=c*u,_=c*d;e[0]=f+_*o,e[4]=m*o-h,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=h*o-m,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*u,h=l*d,m=c*u,_=c*d;e[0]=f-_*o,e[4]=-a*d,e[8]=m+h*o,e[1]=h+m*o,e[5]=a*u,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*u,h=a*d,m=o*u,_=o*d;e[0]=l*u,e[4]=m*c-h,e[8]=f*c+_,e[1]=l*d,e[5]=_*c+f,e[9]=h*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,h=a*c,m=o*l,_=o*c;e[0]=l*u,e[4]=_-f*d,e[8]=m*d+h,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=h*d+m,e[10]=f-_*d}else if(t.order==="XZY"){let f=a*l,h=a*c,m=o*l,_=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=f*d+_,e[5]=a*u,e[9]=h*d-m,e[2]=m*d-h,e[6]=o*u,e[10]=_*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(q2,t,Y2)}lookAt(t,e,i){let s=this.elements;return ii.subVectors(t,e),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),Lr.crossVectors(i,ii),Lr.lengthSq()===0&&(Math.abs(i.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),Lr.crossVectors(i,ii)),Lr.normalize(),Lf.crossVectors(ii,Lr),s[0]=Lr.x,s[4]=Lf.x,s[8]=ii.x,s[1]=Lr.y,s[5]=Lf.y,s[9]=ii.y,s[2]=Lr.z,s[6]=Lf.z,s[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],h=i[13],m=i[2],_=i[6],g=i[10],p=i[14],v=i[3],y=i[7],x=i[11],M=i[15],w=s[0],E=s[4],R=s[8],b=s[12],S=s[1],D=s[5],k=s[9],B=s[13],X=s[2],V=s[6],F=s[10],G=s[14],O=s[3],K=s[7],et=s[11],nt=s[15];return r[0]=a*w+o*S+l*X+c*O,r[4]=a*E+o*D+l*V+c*K,r[8]=a*R+o*k+l*F+c*et,r[12]=a*b+o*B+l*G+c*nt,r[1]=u*w+d*S+f*X+h*O,r[5]=u*E+d*D+f*V+h*K,r[9]=u*R+d*k+f*F+h*et,r[13]=u*b+d*B+f*G+h*nt,r[2]=m*w+_*S+g*X+p*O,r[6]=m*E+_*D+g*V+p*K,r[10]=m*R+_*k+g*F+p*et,r[14]=m*b+_*B+g*G+p*nt,r[3]=v*w+y*S+x*X+M*O,r[7]=v*E+y*D+x*V+M*K,r[11]=v*R+y*k+x*F+M*et,r[15]=v*b+y*B+x*G+M*nt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],f=t[10],h=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*l*d-s*c*d-r*o*f+i*c*f+s*o*h-i*l*h)+_*(+e*l*h-e*c*f+r*a*f-s*a*h+s*c*u-r*l*u)+g*(+e*c*d-e*o*h-r*a*d+i*a*h+r*o*u-i*c*u)+p*(-s*o*u-e*l*d+e*o*f+s*a*d-i*a*f+i*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],f=t[10],h=t[11],m=t[12],_=t[13],g=t[14],p=t[15],v=d*g*c-_*f*c+_*l*h-o*g*h-d*l*p+o*f*p,y=m*f*c-u*g*c-m*l*h+a*g*h+u*l*p-a*f*p,x=u*_*c-m*d*c+m*o*h-a*_*h-u*o*p+a*d*p,M=m*d*l-u*_*l-m*o*f+a*_*f+u*o*g-a*d*g,w=e*v+i*y+s*x+r*M;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let E=1/w;return t[0]=v*E,t[1]=(_*f*r-d*g*r-_*s*h+i*g*h+d*s*p-i*f*p)*E,t[2]=(o*g*r-_*l*r+_*s*c-i*g*c-o*s*p+i*l*p)*E,t[3]=(d*l*r-o*f*r-d*s*c+i*f*c+o*s*h-i*l*h)*E,t[4]=y*E,t[5]=(u*g*r-m*f*r+m*s*h-e*g*h-u*s*p+e*f*p)*E,t[6]=(m*l*r-a*g*r-m*s*c+e*g*c+a*s*p-e*l*p)*E,t[7]=(a*f*r-u*l*r+u*s*c-e*f*c-a*s*h+e*l*h)*E,t[8]=x*E,t[9]=(m*d*r-u*_*r-m*i*h+e*_*h+u*i*p-e*d*p)*E,t[10]=(a*_*r-m*o*r+m*i*c-e*_*c-a*i*p+e*o*p)*E,t[11]=(u*o*r-a*d*r-u*i*c+e*d*c+a*i*h-e*o*h)*E,t[12]=M*E,t[13]=(u*_*s-m*d*s+m*i*f-e*_*f-u*i*g+e*d*g)*E,t[14]=(m*o*s-a*_*s-m*i*l+e*_*l+a*i*g-e*o*g)*E,t[15]=(a*d*s-u*o*s+u*i*l-e*d*l-a*i*f+e*o*f)*E,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,f=r*c,h=r*u,m=r*d,_=a*u,g=a*d,p=o*d,v=l*c,y=l*u,x=l*d,M=i.x,w=i.y,E=i.z;return s[0]=(1-(_+p))*M,s[1]=(h+x)*M,s[2]=(m-y)*M,s[3]=0,s[4]=(h-x)*w,s[5]=(1-(f+p))*w,s[6]=(g+v)*w,s[7]=0,s[8]=(m+y)*E,s[9]=(g-v)*E,s[10]=(1-(f+_))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=il.set(s[0],s[1],s[2]).length(),a=il.set(s[4],s[5],s[6]).length(),o=il.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Xi.copy(this);let c=1/r,u=1/a,d=1/o;return Xi.elements[0]*=c,Xi.elements[1]*=c,Xi.elements[2]*=c,Xi.elements[4]*=u,Xi.elements[5]*=u,Xi.elements[6]*=u,Xi.elements[8]*=d,Xi.elements[9]*=d,Xi.elements[10]*=d,e.setFromRotationMatrix(Xi),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=us){let l=this.elements,c=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),f=(i+s)/(i-s),h,m;if(o===us)h=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===$c)h=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=us){let l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(a-r),f=(e+t)*c,h=(i+s)*u,m,_;if(o===us)m=(a+r)*d,_=-2*d;else if(o===$c)m=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},il=new I,Xi=new Fe,q2=new I(0,0,0),Y2=new I(1,1,1),Lr=new I,Lf=new I,ii=new I,Rb=new Fe,Cb=new Ys,hs=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Zt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Zt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rb.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rb,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Cb.setFromEuler(this),this.setFromQuaternion(Cb,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hs.DEFAULT_ORDER="XYZ";var iu=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Z2=0,Db=new I,sl=new Ys,ks=new Fe,Nf=new I,Yc=new I,Q2=new I,K2=new Ys,Ub=new I(1,0,0),Lb=new I(0,1,0),Nb=new I(0,0,1),Ob={type:"added"},J2={type:"removed"},rl={type:"childadded",child:null},P0={type:"childremoved",child:null},oi=class n extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Z2++}),this.uuid=Sl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new I,e=new hs,i=new Ys,s=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Fe},normalMatrix:{value:new Ht}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new iu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return sl.setFromAxisAngle(t,e),this.quaternion.multiply(sl),this}rotateOnWorldAxis(t,e){return sl.setFromAxisAngle(t,e),this.quaternion.premultiply(sl),this}rotateX(t){return this.rotateOnAxis(Ub,t)}rotateY(t){return this.rotateOnAxis(Lb,t)}rotateZ(t){return this.rotateOnAxis(Nb,t)}translateOnAxis(t,e){return Db.copy(t).applyQuaternion(this.quaternion),this.position.add(Db.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ub,t)}translateY(t){return this.translateOnAxis(Lb,t)}translateZ(t){return this.translateOnAxis(Nb,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ks.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Nf.copy(t):Nf.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Yc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ks.lookAt(Yc,Nf,this.up):ks.lookAt(Nf,Yc,this.up),this.quaternion.setFromRotationMatrix(ks),s&&(ks.extractRotation(s.matrixWorld),sl.setFromRotationMatrix(ks),this.quaternion.premultiply(sl.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ob),rl.child=t,this.dispatchEvent(rl),rl.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(J2),P0.child=t,this.dispatchEvent(P0),P0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ks.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ks.multiply(t.parent.matrixWorld)),t.applyMatrix4(ks),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ob),rl.child=t,this.dispatchEvent(rl),rl.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yc,t,Q2),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yc,K2,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),f=a(t.skeletons),h=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),h.length>0&&(i.animations=h),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};oi.DEFAULT_UP=new I(0,1,0);oi.DEFAULT_MATRIX_AUTO_UPDATE=!0;oi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var qi=new I,Vs=new I,I0=new I,Gs=new I,al=new I,ol=new I,Pb=new I,B0=new I,z0=new I,F0=new I,H0=new He,k0=new He,V0=new He,Pr=class n{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),qi.subVectors(t,e),s.cross(qi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){qi.subVectors(s,e),Vs.subVectors(i,e),I0.subVectors(t,e);let a=qi.dot(qi),o=qi.dot(Vs),l=qi.dot(I0),c=Vs.dot(Vs),u=Vs.dot(I0),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,h=(c*l-o*u)*f,m=(a*u-o*l)*f;return r.set(1-h-m,m,h)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Gs)===null?!1:Gs.x>=0&&Gs.y>=0&&Gs.x+Gs.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Gs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Gs.x),l.addScaledVector(a,Gs.y),l.addScaledVector(o,Gs.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return H0.setScalar(0),k0.setScalar(0),V0.setScalar(0),H0.fromBufferAttribute(t,e),k0.fromBufferAttribute(t,i),V0.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(H0,r.x),a.addScaledVector(k0,r.y),a.addScaledVector(V0,r.z),a}static isFrontFacing(t,e,i,s){return qi.subVectors(i,e),Vs.subVectors(t,e),qi.cross(Vs).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qi.subVectors(this.c,this.b),Vs.subVectors(this.a,this.b),qi.cross(Vs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;al.subVectors(s,i),ol.subVectors(r,i),B0.subVectors(t,i);let l=al.dot(B0),c=ol.dot(B0);if(l<=0&&c<=0)return e.copy(i);z0.subVectors(t,s);let u=al.dot(z0),d=ol.dot(z0);if(u>=0&&d<=u)return e.copy(s);let f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(al,a);F0.subVectors(t,r);let h=al.dot(F0),m=ol.dot(F0);if(m>=0&&h<=m)return e.copy(r);let _=h*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(i).addScaledVector(ol,o);let g=u*m-h*d;if(g<=0&&d-u>=0&&h-m>=0)return Pb.subVectors(r,s),o=(d-u)/(d-u+(h-m)),e.copy(s).addScaledVector(Pb,o);let p=1/(g+_+f);return a=_*p,o=f*p,e.copy(i).addScaledVector(al,a).addScaledVector(ol,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},HM={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nr={h:0,s:0,l:0},Of={h:0,s:0,l:0};function G0(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var zt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=i,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ee.workingColorSpace){if(t=k2(t,1),e=Zt(e,0,1),i=Zt(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=G0(a,r,t+1/3),this.g=G0(a,r,t),this.b=G0(a,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=ri){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){let i=HM[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ws(t.r),this.g=Ws(t.g),this.b=Ws(t.b),this}copyLinearToSRGB(t){return this.r=fl(t.r),this.g=fl(t.g),this.b=fl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return ee.fromWorkingColorSpace(Tn.copy(this),t),Math.round(Zt(Tn.r*255,0,255))*65536+Math.round(Zt(Tn.g*255,0,255))*256+Math.round(Zt(Tn.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Tn.copy(this),e);let i=Tn.r,s=Tn.g,r=Tn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Tn.copy(this),e),t.r=Tn.r,t.g=Tn.g,t.b=Tn.b,t}getStyle(t=ri){ee.fromWorkingColorSpace(Tn.copy(this),t);let e=Tn.r,i=Tn.g,s=Tn.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Nr),this.setHSL(Nr.h+t,Nr.s+e,Nr.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Nr),t.getHSL(Of);let i=A0(Nr.h,Of.h,e),s=A0(Nr.s,Of.s,e),r=A0(Nr.l,Of.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tn=new zt;zt.NAMES=HM;var j2=0,Fr=class extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:j2++}),this.uuid=Sl(),this.name="",this.type="Material",this.blending=Na,this.side=Xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jf,this.blendDst=jf,this.blendEquation=Br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Oa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Da,this.stencilZFail=Da,this.stencilZPass=Da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Na&&(i.blending=this.blending),this.side!==Xs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Jf&&(i.blendSrc=this.blendSrc),this.blendDst!==jf&&(i.blendDst=this.blendDst),this.blendEquation!==Br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Oa&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Da&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Da&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Da&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Zs=class extends Fr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hs,this.combine=u_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ke=new I,Pf=new mt,$2=0,mn=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$2++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=t_,this.updateRanges=[],this.gpuType=ps,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Pf.fromBufferAttribute(this,e),Pf.applyMatrix3(t),this.setXY(e,Pf.x,Pf.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix3(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ke.fromBufferAttribute(this,e),Ke.applyMatrix4(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ke.fromBufferAttribute(this,e),Ke.applyNormalMatrix(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ke.fromBufferAttribute(this,e),Ke.transformDirection(t),this.setXYZ(e,Ke.x,Ke.y,Ke.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Wc(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Gn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wc(e,this.array)),e}setX(t,e){return this.normalized&&(e=Gn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wc(e,this.array)),e}setY(t,e){return this.normalized&&(e=Gn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wc(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Gn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wc(e,this.array)),e}setW(t,e){return this.normalized&&(e=Gn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Gn(e,this.array),i=Gn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Gn(e,this.array),i=Gn(i,this.array),s=Gn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Gn(e,this.array),i=Gn(i,this.array),s=Gn(s,this.array),r=Gn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==t_&&(t.usage=this.usage),t}};var su=class extends mn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var ru=class extends mn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var tn=class extends mn{constructor(t,e,i){super(new Float32Array(t),e,i)}},tR=0,Ci=new Fe,W0=new oi,ll=new I,si=new zr,Zc=new zr,cn=new I,In=class n extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tR++}),this.uuid=Sl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(T_(t)?ru:su)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ci.makeRotationFromQuaternion(t),this.applyMatrix4(Ci),this}rotateX(t){return Ci.makeRotationX(t),this.applyMatrix4(Ci),this}rotateY(t){return Ci.makeRotationY(t),this.applyMatrix4(Ci),this}rotateZ(t){return Ci.makeRotationZ(t),this.applyMatrix4(Ci),this}translate(t,e,i){return Ci.makeTranslation(t,e,i),this.applyMatrix4(Ci),this}scale(t,e,i){return Ci.makeScale(t,e,i),this.applyMatrix4(Ci),this}lookAt(t){return W0.lookAt(t),W0.updateMatrix(),this.applyMatrix4(W0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ll).negate(),this.translate(ll.x,ll.y,ll.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new tn(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];si.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ba);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let i=this.boundingSphere.center;if(si.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Zc.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(si.min,Zc.min),si.expandByPoint(cn),cn.addVectors(si.max,Zc.max),si.expandByPoint(cn)):(si.expandByPoint(Zc.min),si.expandByPoint(Zc.max))}si.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)cn.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(cn));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)cn.fromBufferAttribute(o,c),l&&(ll.fromBufferAttribute(t,c),cn.add(ll)),s=Math.max(s,i.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mn(new Float32Array(4*i.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new I,l[R]=new I;let c=new I,u=new I,d=new I,f=new mt,h=new mt,m=new mt,_=new I,g=new I;function p(R,b,S){c.fromBufferAttribute(i,R),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,S),f.fromBufferAttribute(r,R),h.fromBufferAttribute(r,b),m.fromBufferAttribute(r,S),u.sub(c),d.sub(c),h.sub(f),m.sub(f);let D=1/(h.x*m.y-m.x*h.y);isFinite(D)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(D),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(D),o[R].add(_),o[b].add(_),o[S].add(_),l[R].add(g),l[b].add(g),l[S].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,b=v.length;R<b;++R){let S=v[R],D=S.start,k=S.count;for(let B=D,X=D+k;B<X;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let y=new I,x=new I,M=new I,w=new I;function E(R){M.fromBufferAttribute(s,R),w.copy(M);let b=o[R];y.copy(b),y.sub(M.multiplyScalar(M.dot(b))).normalize(),x.crossVectors(w,b);let D=x.dot(l[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,D)}for(let R=0,b=v.length;R<b;++R){let S=v[R],D=S.start,k=S.count;for(let B=D,X=D+k;B<X;B+=3)E(t.getX(B+0)),E(t.getX(B+1)),E(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,h=i.count;f<h;f++)i.setXYZ(f,0,0,0);let s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(t)for(let f=0,h=t.count;f<h;f+=3){let m=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,h=e.count;f<h;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)cn.fromBufferAttribute(t,e),cn.normalize(),t.setXYZ(e,cn.x,cn.y,cn.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u),h=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?h=l[_]*o.data.stride+o.offset:h=l[_]*u;for(let p=0;p<u;p++)f[m++]=c[h++]}return new mn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let f=c[u],h=t(f,i);l.push(h)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){let h=c[d];u.push(h.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ib=new Fe,Ra=new nu,If=new Ba,Bb=new I,Bf=new I,zf=new I,Ff=new I,X0=new I,Hf=new I,zb=new I,kf=new I,un=class extends oi{constructor(t=new In,e=new Zs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Hf.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(X0.fromBufferAttribute(d,t),a?Hf.addScaledVector(X0,u):Hf.addScaledVector(X0.sub(e),u))}e.add(Hf)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),If.copy(i.boundingSphere),If.applyMatrix4(r),Ra.copy(t.ray).recast(t.near),!(If.containsPoint(Ra.origin)===!1&&(Ra.intersectSphere(If,Bb)===null||Ra.origin.distanceToSquared(Bb)>(t.far-t.near)**2))&&(Ib.copy(r).invert(),Ra.copy(t.ray).applyMatrix4(Ib),!(i.boundingBox!==null&&Ra.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ra)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,h.start),y=Math.min(o.count,Math.min(g.start+g.count,h.start+h.count));for(let x=v,M=y;x<M;x+=3){let w=o.getX(x),E=o.getX(x+1),R=o.getX(x+2);s=Vf(this,p,t,i,c,u,d,w,E,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,h.start),_=Math.min(o.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){let v=o.getX(g),y=o.getX(g+1),x=o.getX(g+2);s=Vf(this,a,t,i,c,u,d,v,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=f.length;m<_;m++){let g=f[m],p=a[g.materialIndex],v=Math.max(g.start,h.start),y=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let x=v,M=y;x<M;x+=3){let w=x,E=x+1,R=x+2;s=Vf(this,p,t,i,c,u,d,w,E,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let m=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let g=m,p=_;g<p;g+=3){let v=g,y=g+1,x=g+2;s=Vf(this,a,t,i,c,u,d,v,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};function eR(n,t,e,i,s,r,a,o){let l;if(t.side===gn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Xs,o),l===null)return null;kf.copy(o),kf.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(kf);return c<e.near||c>e.far?null:{distance:c,point:kf.clone(),object:n}}function Vf(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Bf),n.getVertexPosition(l,zf),n.getVertexPosition(c,Ff);let u=eR(n,t,e,i,Bf,zf,Ff,zb);if(u){let d=new I;Pr.getBarycoord(zb,Bf,zf,Ff,d),s&&(u.uv=Pr.getInterpolatedAttribute(s,o,l,c,d,new mt)),r&&(u.uv1=Pr.getInterpolatedAttribute(r,o,l,c,d,new mt)),a&&(u.normal=Pr.getInterpolatedAttribute(a,o,l,c,d,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new I,materialIndex:0};Pr.getNormal(Bf,zf,Ff,f.normal),u.face=f,u.barycoord=d}return u}var ml=class n extends In{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],f=0,h=0;m("z","y","x",-1,-1,i,e,t,a,r,0),m("z","y","x",1,-1,i,e,-t,a,r,1),m("x","z","y",1,1,t,i,e,s,a,2),m("x","z","y",1,-1,t,i,-e,s,a,3),m("x","y","z",1,-1,t,e,i,s,r,4),m("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new tn(c,3)),this.setAttribute("normal",new tn(u,3)),this.setAttribute("uv",new tn(d,2));function m(_,g,p,v,y,x,M,w,E,R,b){let S=x/E,D=M/R,k=x/2,B=M/2,X=w/2,V=E+1,F=R+1,G=0,O=0,K=new I;for(let et=0;et<F;et++){let nt=et*D-B;for(let lt=0;lt<V;lt++){let Rt=lt*S-k;K[_]=Rt*v,K[g]=nt*y,K[p]=X,c.push(K.x,K.y,K.z),K[_]=0,K[g]=0,K[p]=w>0?1:-1,u.push(K.x,K.y,K.z),d.push(lt/E),d.push(1-et/R),G+=1}}for(let et=0;et<R;et++)for(let nt=0;nt<E;nt++){let lt=f+nt+V*et,Rt=f+nt+V*(et+1),z=f+(nt+1)+V*(et+1),J=f+(nt+1)+V*et;l.push(lt,Rt,J),l.push(Rt,z,J),O+=6}o.addGroup(h,O,b),h+=O,f+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Wa(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function wn(n){let t={};for(let e=0;e<n.length;e++){let i=Wa(n[e]);for(let s in i)t[s]=i[s]}return t}function nR(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function E_(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}var Xa={clone:Wa,merge:wn},iR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ue=class extends Fr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iR,this.fragmentShader=sR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wa(t.uniforms),this.uniformsGroups=nR(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},au=class extends oi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe,this.coordinateSystem=us}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Or=new I,Fb=new mt,Hb=new mt,En=class extends au{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=nd*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(E0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return nd*2*Math.atan(Math.tan(E0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Or.x,Or.y).multiplyScalar(-t/Or.z),Or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Or.x,Or.y).multiplyScalar(-t/Or.z)}getViewSize(t,e){return this.getViewBounds(t,Fb,Hb),e.subVectors(Hb,Fb)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(E0*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},cl=-90,ul=1,ad=class extends oi{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new En(cl,ul,t,e);s.layers=this.layers,this.add(s);let r=new En(cl,ul,t,e);r.layers=this.layers,this.add(r);let a=new En(cl,ul,t,e);a.layers=this.layers,this.add(a);let o=new En(cl,ul,t,e);o.layers=this.layers,this.add(o);let l=new En(cl,ul,t,e);l.layers=this.layers,this.add(l);let c=new En(cl,ul,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===us)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===$c)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,f,h),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},ou=class extends ai{constructor(t,e,i,s,r,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:ka,super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},od=class extends An{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new ou(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Yi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ml(5,5,5),r=new Ue({name:"CubemapFromEquirect",uniforms:Wa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Zi});r.uniforms.tEquirect.value=e;let a=new un(s,r),o=e.minFilter;return e.minFilter===Vr&&(e.minFilter=Yi),new ad(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},Ua=class extends oi{constructor(){super(),this.isGroup=!0,this.type="Group"}},rR={type:"move"},gl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ua,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ua,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ua,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,i),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,m=.005;c.inputState.pinching&&f>h+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=h-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rR)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ua;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},lu=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var cu=class extends oi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hs,this.environmentIntensity=1,this.environmentRotation=new hs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var q0=new I,aR=new I,oR=new Ht,cs=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=q0.subVectors(i,e).cross(aR.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(q0),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||oR.getNormalMatrix(t),s=this.coplanarPoint(q0).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ca=new Ba,Gf=new I,uu=class{constructor(t=new cs,e=new cs,i=new cs,s=new cs,r=new cs,a=new cs){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=us){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],d=s[6],f=s[7],h=s[8],m=s[9],_=s[10],g=s[11],p=s[12],v=s[13],y=s[14],x=s[15];if(i[0].setComponents(l-r,f-c,g-h,x-p).normalize(),i[1].setComponents(l+r,f+c,g+h,x+p).normalize(),i[2].setComponents(l+a,f+u,g+m,x+v).normalize(),i[3].setComponents(l-a,f-u,g-m,x-v).normalize(),i[4].setComponents(l-o,f-d,g-_,x-y).normalize(),e===us)i[5].setComponents(l+o,f+d,g+_,x+y).normalize();else if(e===$c)i[5].setComponents(o,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ca.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ca.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ca)}intersectsSprite(t){return Ca.center.set(0,0,0),Ca.radius=.7071067811865476,Ca.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ca)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Gf.x=s.normal.x>0?t.max.x:t.min.x,Gf.y=s.normal.y>0?t.max.y:t.min.y,Gf.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Gf)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ld=class extends Fr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},kb=new Fe,e_=new nu,Wf=new Ba,Xf=new I,hu=class extends oi{constructor(t=new In,e=new ld){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wf.copy(i.boundingSphere),Wf.applyMatrix4(s),Wf.radius+=r,t.ray.intersectsSphere(Wf)===!1)return;kb.copy(s).invert(),e_.copy(t.ray).applyMatrix4(kb);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let f=Math.max(0,a.start),h=Math.min(c.count,a.start+a.count);for(let m=f,_=h;m<_;m++){let g=c.getX(m);Xf.fromBufferAttribute(d,g),Vb(Xf,g,l,s,t,e,this)}}else{let f=Math.max(0,a.start),h=Math.min(d.count,a.start+a.count);for(let m=f,_=h;m<_;m++)Xf.fromBufferAttribute(d,m),Vb(Xf,m,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Vb(n,t,e,i,s,r,a){let o=e_.distanceSqToPoint(n);if(o<e){let l=new I;e_.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var fu=class extends ai{constructor(t,e,i,s,r,a,o,l,c,u=La){if(u!==La&&u!==Pa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===La&&(i=Gr),i===void 0&&u===Pa&&(i=Ga),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Di,this.minFilter=l!==void 0?l:Di,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new pl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},li=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let u=i[s],f=i[s+1]-u,h=(a-u)/f;return(s+h)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new mt:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){let i=new I,s=[],r=[],a=[],o=new I,l=new Fe;for(let h=0;h<=t;h++){let m=h/t;s[h]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let h=1;h<=t;h++){if(r[h]=r[h-1].clone(),a[h]=a[h-1].clone(),o.crossVectors(s[h-1],s[h]),o.length()>Number.EPSILON){o.normalize();let m=Math.acos(Zt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(l.makeRotationAxis(o,m))}a[h].crossVectors(s[h],r[h])}if(e===!0){let h=Math.acos(Zt(r[0].dot(r[t]),-1,1));h/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(h=-h);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],h*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},_l=class extends li{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new mt){let i=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,h=c-this.aY;l=f*u-h*d+this.aX,c=f*d+h*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},cd=class extends _l{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function A_(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let f=(a-r)/c-(o-r)/(c+u)+(o-a)/u,h=(o-a)/u-(l-a)/(u+d)+(l-o)/d;f*=u,h*=u,s(a,o,f,h)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var qf=new I,Y0=new A_,Z0=new A_,Q0=new A_,ud=class extends li{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new I){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(qf.subVectors(s[0],s[1]).add(s[0]),c=qf);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(qf.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=qf),this.curveType==="centripetal"||this.curveType==="chordal"){let h=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),h),_=Math.pow(d.distanceToSquared(f),h),g=Math.pow(f.distanceToSquared(u),h);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Y0.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,m,_,g),Z0.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,m,_,g),Q0.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,m,_,g)}else this.curveType==="catmullrom"&&(Y0.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),Z0.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),Q0.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(Y0.calc(l),Z0.calc(l),Q0.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Gb(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function lR(n,t){let e=1-n;return e*e*t}function cR(n,t){return 2*(1-n)*n*t}function uR(n,t){return n*n*t}function Qc(n,t,e,i){return lR(n,t)+cR(n,e)+uR(n,i)}function hR(n,t){let e=1-n;return e*e*e*t}function fR(n,t){let e=1-n;return 3*e*e*n*t}function dR(n,t){return 3*(1-n)*n*n*t}function pR(n,t){return n*n*n*t}function Kc(n,t,e,i,s){return hR(n,t)+fR(n,e)+dR(n,i)+pR(n,s)}var du=class extends li{constructor(t=new mt,e=new mt,i=new mt,s=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new mt){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Kc(t,s.x,r.x,a.x,o.x),Kc(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},hd=class extends li{constructor(t=new I,e=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Kc(t,s.x,r.x,a.x,o.x),Kc(t,s.y,r.y,a.y,o.y),Kc(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},pu=class extends li{constructor(t=new mt,e=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new mt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},fd=class extends li{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},mu=class extends li{constructor(t=new mt,e=new mt,i=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new mt){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Qc(t,s.x,r.x,a.x),Qc(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dd=class extends li{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(Qc(t,s.x,r.x,a.x),Qc(t,s.y,r.y,a.y),Qc(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},gu=class extends li{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new mt){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(Gb(o,l.x,c.x,u.x,d.x),Gb(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new mt().fromArray(s))}return this}},Wb=Object.freeze({__proto__:null,ArcCurve:cd,CatmullRomCurve3:ud,CubicBezierCurve:du,CubicBezierCurve3:hd,EllipseCurve:_l,LineCurve:pu,LineCurve3:fd,QuadraticBezierCurve:mu,QuadraticBezierCurve3:dd,SplineCurve:gu}),pd=class extends li{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wb[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new Wb[s.type]().fromJSON(s))}return this}},_u=class extends pd{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new pu(this.currentPoint.clone(),new mt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new mu(this.currentPoint.clone(),new mt(t,e),new mt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new du(this.currentPoint.clone(),new mt(t,e),new mt(i,s),new mt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new gu(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new _l(t,e,i,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var vl=class extends _u{constructor(t){super(t),this.uuid=Sl(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new _u().fromJSON(s))}return this}},n_=class{static triangulate(t,e,i=2){let s=e&&e.length,r=s?e[0]*i:t.length,a=kM(t,0,r,i,!0),o=[];if(!a||a.next===a.prev)return o;let l,c,u,d,f,h,m;if(s&&(a=yR(t,e,a,i)),t.length>80*i){l=u=t[0],c=d=t[1];for(let _=i;_<r;_+=i)f=t[_],h=t[_+1],f<l&&(l=f),h<c&&(c=h),f>u&&(u=f),h>d&&(d=h);m=Math.max(u-l,d-c),m=m!==0?32767/m:0}return vu(a,o,i,l,c,m,0),o}};function kM(n,t,e,i,s){let r,a;if(s===DR(n,t,e,i)>0)for(r=t;r<e;r+=i)a=Xb(r,n[r],n[r+1],a);else for(r=e-i;r>=t;r-=i)a=Xb(r,n[r],n[r+1],a);return a&&gp(a,a.next)&&(xu(a),a=a.next),a}function za(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(gp(e,e.next)||De(e.prev,e,e.next)===0)){if(xu(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function vu(n,t,e,i,s,r,a){if(!n)return;!a&&r&&TR(n,i,s,r);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?gR(n,i,s,r):mR(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),xu(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=_R(za(n),t,e),vu(n,t,e,i,s,r,2)):a===2&&vR(n,t,e,i,s,r):vu(za(n),t,e,i,s,r,1);break}}}function mR(n){let t=n.prev,e=n,i=n.next;if(De(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,h=o>l?o>c?o:c:l>c?l:c,m=i.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=h&&hl(s,o,r,l,a,c,m.x,m.y)&&De(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function gR(n,t,e,i){let s=n.prev,r=n,a=n.next;if(De(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,f=a.y,h=o<l?o<c?o:c:l<c?l:c,m=u<d?u<f?u:f:d<f?d:f,_=o>l?o>c?o:c:l>c?l:c,g=u>d?u>f?u:f:d>f?d:f,p=i_(h,m,t,e,i),v=i_(_,g,t,e,i),y=n.prevZ,x=n.nextZ;for(;y&&y.z>=p&&x&&x.z<=v;){if(y.x>=h&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&hl(o,u,l,d,c,f,y.x,y.y)&&De(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=h&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&hl(o,u,l,d,c,f,x.x,x.y)&&De(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=p;){if(y.x>=h&&y.x<=_&&y.y>=m&&y.y<=g&&y!==s&&y!==a&&hl(o,u,l,d,c,f,y.x,y.y)&&De(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=v;){if(x.x>=h&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==a&&hl(o,u,l,d,c,f,x.x,x.y)&&De(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function _R(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!gp(s,r)&&VM(s,i,i.next,r)&&yu(s,r)&&yu(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),xu(i),xu(i.next),i=n=r),i=i.next}while(i!==n);return za(i)}function vR(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&wR(a,o)){let l=GM(a,o);a=za(a,a.next),l=za(l,l.next),vu(a,t,e,i,s,r,0),vu(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function yR(n,t,e,i){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=kM(n,o,l,i,!1),c===c.next&&(c.steiner=!0),s.push(AR(c));for(s.sort(xR),r=0;r<s.length;r++)e=SR(s[r],e);return e}function xR(n,t){return n.x-t.x}function SR(n,t){let e=bR(n,t);if(!e)return t;let i=GM(e,n);return za(i,i.next),za(e,e.next)}function bR(n,t){let e=t,i=-1/0,s,r=n.x,a=n.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,u=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&hl(a<c?r:i,a,l,c,a<c?i:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),yu(e,n)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&MR(s,e)))&&(s=e,u=d)),e=e.next;while(e!==o);return s}function MR(n,t){return De(n.prev,n,t.prev)<0&&De(t.next,n,n.next)<0}function TR(n,t,e,i){let s=n;do s.z===0&&(s.z=i_(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,ER(s)}function ER(n){let t,e,i,s,r,a,o,l,c=1;do{for(e=n,n=null,r=null,a=0;e;){for(a++,i=e,o=0,t=0;t<c&&(o++,i=i.nextZ,!!i);t++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,o--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(a>1);return n}function i_(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function AR(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function hl(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function wR(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!RR(n,t)&&(yu(n,t)&&yu(t,n)&&CR(n,t)&&(De(n.prev,n,t.prev)||De(n,t.prev,t))||gp(n,t)&&De(n.prev,n,n.next)>0&&De(t.prev,t,t.next)>0)}function De(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function gp(n,t){return n.x===t.x&&n.y===t.y}function VM(n,t,e,i){let s=Zf(De(n,t,e)),r=Zf(De(n,t,i)),a=Zf(De(e,i,n)),o=Zf(De(e,i,t));return!!(s!==r&&a!==o||s===0&&Yf(n,e,t)||r===0&&Yf(n,i,t)||a===0&&Yf(e,n,i)||o===0&&Yf(e,t,i))}function Yf(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Zf(n){return n>0?1:n<0?-1:0}function RR(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&VM(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function yu(n,t){return De(n.prev,n,n.next)<0?De(n,t,n.next)>=0&&De(n,n.prev,t)>=0:De(n,t,n.prev)<0||De(n,n.next,t)<0}function CR(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function GM(n,t){let e=new s_(n.i,n.x,n.y),i=new s_(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Xb(n,t,e,i){let s=new s_(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function xu(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function s_(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function DR(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var dl=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];qb(t),Yb(i,t);let a=t.length;e.forEach(qb);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Yb(i,e[l]);let o=n_.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function qb(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Yb(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var Fa=class n extends In{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=t/o,f=e/l,h=[],m=[],_=[],g=[];for(let p=0;p<u;p++){let v=p*f-a;for(let y=0;y<c;y++){let x=y*d-r;m.push(x,-v,0),_.push(0,0,1),g.push(y/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){let y=v+c*p,x=v+c*(p+1),M=v+1+c*(p+1),w=v+1+c*p;h.push(y,x,w),h.push(x,M,w)}this.setIndex(h),this.setAttribute("position",new tn(m,3)),this.setAttribute("normal",new tn(_,3)),this.setAttribute("uv",new tn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Su=class n extends In{constructor(t=new vl([new mt(0,.5),new mt(-.5,-.5),new mt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let i=[],s=[],r=[],a=[],o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new tn(s,3)),this.setAttribute("normal",new tn(r,3)),this.setAttribute("uv",new tn(a,2));function c(u){let d=s.length/3,f=u.extractPoints(e),h=f.shape,m=f.holes;dl.isClockWise(h)===!1&&(h=h.reverse());for(let g=0,p=m.length;g<p;g++){let v=m[g];dl.isClockWise(v)===!0&&(m[g]=v.reverse())}let _=dl.triangulateShape(h,m);for(let g=0,p=m.length;g<p;g++){let v=m[g];h=h.concat(v)}for(let g=0,p=h.length;g<p;g++){let v=h[g];s.push(v.x,v.y,0),r.push(0,0,1),a.push(v.x,v.y)}for(let g=0,p=_.length;g<p;g++){let v=_[g],y=v[0]+d,x=v[1]+d,M=v[2]+d;i.push(y,x,M),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return UR(e,t)}static fromJSON(t,e){let i=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];i.push(a)}return new n(i,t.curveSegments)}};function UR(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){let s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}var bu=class n extends In{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new I,f=new I,h=[],m=[],_=[],g=[];for(let p=0;p<=i;p++){let v=[],y=p/i,x=0;p===0&&a===0?x=.5/e:p===i&&l===Math.PI&&(x=-.5/e);for(let M=0;M<=e;M++){let w=M/e;d.x=-t*Math.cos(s+w*r)*Math.sin(a+y*o),d.y=t*Math.cos(a+y*o),d.z=t*Math.sin(s+w*r)*Math.sin(a+y*o),m.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),g.push(w+x,1-y),v.push(c++)}u.push(v)}for(let p=0;p<i;p++)for(let v=0;v<e;v++){let y=u[p][v+1],x=u[p][v],M=u[p+1][v],w=u[p+1][v+1];(p!==0||a>0)&&h.push(y,x,w),(p!==i-1||l<Math.PI)&&h.push(x,M,w)}this.setIndex(h),this.setAttribute("position",new tn(m,3)),this.setAttribute("normal",new tn(_,3)),this.setAttribute("uv",new tn(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var md=class extends Fr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=EM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},gd=class extends Fr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qf(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function LR(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var Ha=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];t:{e:{let a;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break e}a=e.length;break n}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break e}a=i,i=0;break n}break t}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},_d=class extends Ha{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:K0,endingEnd:K0}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case J0:r=t,o=2*e-i;break;case j0:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case J0:a=t,l=2*i-e;break;case j0:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,m=(i-e)/(s-e),_=m*m,g=_*m,p=-f*g+2*f*_-f*m,v=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*m+1,y=(-1-h)*g+(1.5+h)*_+.5*m,x=h*g-h*_;for(let M=0;M!==o;++M)r[M]=p*a[u+M]+v*a[c+M]+y*a[l+M]+x*a[d+M];return r}},vd=class extends Ha{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-e)/(s-e),d=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*d+a[l+f]*u;return r}},yd=class extends Ha{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ui=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qf(e,this.TimeBufferType),this.values=Qf(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Qf(t.times,Array),values:Qf(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new yd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new vd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new _d(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Jc:e=this.InterpolantFactoryMethodDiscrete;break;case ed:e=this.InterpolantFactoryMethodLinear;break;case Kf:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jc;case this.InterpolantFactoryMethodLinear:return ed;case this.InterpolantFactoryMethodSmooth:return Kf}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&LR(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Kf,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,f=d-i,h=d+i;for(let m=0;m!==i;++m){let _=e[d+m];if(_!==e[f+m]||_!==e[h+m]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,f=a*i;for(let h=0;h!==i;++h)e[f+h]=e[d+h]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ui.prototype.TimeBufferType=Float32Array;Ui.prototype.ValueBufferType=Float32Array;Ui.prototype.DefaultInterpolation=ed;var Hr=class extends Ui{constructor(t,e,i){super(t,e,i)}};Hr.prototype.ValueTypeName="bool";Hr.prototype.ValueBufferType=Array;Hr.prototype.DefaultInterpolation=Jc;Hr.prototype.InterpolantFactoryMethodLinear=void 0;Hr.prototype.InterpolantFactoryMethodSmooth=void 0;var xd=class extends Ui{};xd.prototype.ValueTypeName="color";var Sd=class extends Ui{};Sd.prototype.ValueTypeName="number";var bd=class extends Ha{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)Ys.slerpFlat(r,0,a,c-o,a,c,l);return r}},Mu=class extends Ui{InterpolantFactoryMethodLinear(t){return new bd(this.times,this.values,this.getValueSize(),t)}};Mu.prototype.ValueTypeName="quaternion";Mu.prototype.InterpolantFactoryMethodSmooth=void 0;var kr=class extends Ui{constructor(t,e,i){super(t,e,i)}};kr.prototype.ValueTypeName="string";kr.prototype.ValueBufferType=Array;kr.prototype.DefaultInterpolation=Jc;kr.prototype.InterpolantFactoryMethodLinear=void 0;kr.prototype.InterpolantFactoryMethodSmooth=void 0;var Md=class extends Ui{};Md.prototype.ValueTypeName="vector";var Td=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){let h=c[d],m=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return m}return null}}},WM=new Td,Ed=class{constructor(t){this.manager=t!==void 0?t:WM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ed.DEFAULT_MATERIAL_NAME="__DEFAULT";var yl=class extends au{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var Ad=class extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}},Tu=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zb(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Zb();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Zb(){return performance.now()}var w_="\\[\\]\\.:\\/",NR=new RegExp("["+w_+"]","g"),R_="[^"+w_+"]",OR="[^"+w_.replace("\\.","")+"]",PR=/((?:WC+[\/:])*)/.source.replace("WC",R_),IR=/(WCOD+)?/.source.replace("WCOD",OR),BR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",R_),zR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",R_),FR=new RegExp("^"+PR+IR+BR+zR+"$"),HR=["material","materials","bones","map"],r_=class{constructor(t,e,i){let s=i||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(NR,"")}static parseTrackName(t){let e=FR.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);HR.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=r_;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var UO=new Float32Array(1);function C_(n,t,e,i){let s=kR(i);switch(e){case m_:return n*t;case __:return n*t;case v_:return n*t*2;case y_:return n*t/s.components*s.byteLength;case kd:return n*t/s.components*s.byteLength;case x_:return n*t*2/s.components*s.byteLength;case Vd:return n*t*2/s.components*s.byteLength;case g_:return n*t*3/s.components*s.byteLength;case Ni:return n*t*4/s.components*s.byteLength;case Gd:return n*t*4/s.components*s.byteLength;case wu:case Ru:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Cu:case Du:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Xd:case Yd:return Math.max(n,16)*Math.max(t,8)/4;case Wd:case qd:return Math.max(n,8)*Math.max(t,8)/2;case Zd:case Qd:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Kd:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Jd:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jd:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case $d:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case tp:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ep:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case np:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ip:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case sp:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case rp:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ap:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case op:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case lp:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case cp:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case up:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Uu:case hp:case fp:return Math.ceil(n/4)*Math.ceil(t/4)*16;case S_:case dp:return Math.ceil(n/4)*Math.ceil(t/4)*8;case pp:case mp:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function kR(n){switch(n){case ds:case f_:return{byteLength:1,components:1};case xl:case d_:case Li:return{byteLength:2,components:1};case Fd:case Hd:return{byteLength:2,components:4};case Gr:case zd:case ps:return{byteLength:4,components:1};case p_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"174"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="174");function pT(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function GR(n){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){let m=d[f],_=d[h];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,d[f]=_)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){let _=d[h];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var WR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,XR=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qR=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,YR=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ZR=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,QR=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,KR=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,JR=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jR=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$R=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,eC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,aC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,oC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cC=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hC=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fC=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,dC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pC=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_C=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,xC="gl_FragColor = linearToOutputTexel( gl_FragColor );",SC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,MC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,TC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,EC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,AC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,RC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,CC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,DC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,UC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,LC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,NC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,PC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,IC=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,BC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,FC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,HC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,VC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,GC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,WC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,XC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qC=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,YC=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ZC=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,QC=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,KC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,JC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,jC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$C=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t3=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,e3=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,n3=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,i3=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,s3=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,r3=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,a3=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,l3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,c3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,u3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,h3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,f3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,d3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,p3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,m3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,g3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,v3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,y3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,x3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,S3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,M3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,T3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,E3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,A3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,w3=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,R3=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,C3=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D3=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,U3=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,L3=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,N3=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,O3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,P3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,I3=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,B3=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,z3=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,F3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,H3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,k3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,V3=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,G3=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,W3=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,q3=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,K3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,J3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,j3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tD=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eD=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,nD=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iD=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sD=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rD=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aD=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oD=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lD=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cD=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,uD=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hD=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fD=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dD=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pD=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mD=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gD=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_D=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,vD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yD=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xD=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,SD=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,bD=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:WR,alphahash_pars_fragment:XR,alphamap_fragment:qR,alphamap_pars_fragment:YR,alphatest_fragment:ZR,alphatest_pars_fragment:QR,aomap_fragment:KR,aomap_pars_fragment:JR,batching_pars_vertex:jR,batching_vertex:$R,begin_vertex:tC,beginnormal_vertex:eC,bsdfs:nC,iridescence_fragment:iC,bumpmap_pars_fragment:sC,clipping_planes_fragment:rC,clipping_planes_pars_fragment:aC,clipping_planes_pars_vertex:oC,clipping_planes_vertex:lC,color_fragment:cC,color_pars_fragment:uC,color_pars_vertex:hC,color_vertex:fC,common:dC,cube_uv_reflection_fragment:pC,defaultnormal_vertex:mC,displacementmap_pars_vertex:gC,displacementmap_vertex:_C,emissivemap_fragment:vC,emissivemap_pars_fragment:yC,colorspace_fragment:xC,colorspace_pars_fragment:SC,envmap_fragment:bC,envmap_common_pars_fragment:MC,envmap_pars_fragment:TC,envmap_pars_vertex:EC,envmap_physical_pars_fragment:IC,envmap_vertex:AC,fog_vertex:wC,fog_pars_vertex:RC,fog_fragment:CC,fog_pars_fragment:DC,gradientmap_pars_fragment:UC,lightmap_pars_fragment:LC,lights_lambert_fragment:NC,lights_lambert_pars_fragment:OC,lights_pars_begin:PC,lights_toon_fragment:BC,lights_toon_pars_fragment:zC,lights_phong_fragment:FC,lights_phong_pars_fragment:HC,lights_physical_fragment:kC,lights_physical_pars_fragment:VC,lights_fragment_begin:GC,lights_fragment_maps:WC,lights_fragment_end:XC,logdepthbuf_fragment:qC,logdepthbuf_pars_fragment:YC,logdepthbuf_pars_vertex:ZC,logdepthbuf_vertex:QC,map_fragment:KC,map_pars_fragment:JC,map_particle_fragment:jC,map_particle_pars_fragment:$C,metalnessmap_fragment:t3,metalnessmap_pars_fragment:e3,morphinstance_vertex:n3,morphcolor_vertex:i3,morphnormal_vertex:s3,morphtarget_pars_vertex:r3,morphtarget_vertex:a3,normal_fragment_begin:o3,normal_fragment_maps:l3,normal_pars_fragment:c3,normal_pars_vertex:u3,normal_vertex:h3,normalmap_pars_fragment:f3,clearcoat_normal_fragment_begin:d3,clearcoat_normal_fragment_maps:p3,clearcoat_pars_fragment:m3,iridescence_pars_fragment:g3,opaque_fragment:_3,packing:v3,premultiplied_alpha_fragment:y3,project_vertex:x3,dithering_fragment:S3,dithering_pars_fragment:b3,roughnessmap_fragment:M3,roughnessmap_pars_fragment:T3,shadowmap_pars_fragment:E3,shadowmap_pars_vertex:A3,shadowmap_vertex:w3,shadowmask_pars_fragment:R3,skinbase_vertex:C3,skinning_pars_vertex:D3,skinning_vertex:U3,skinnormal_vertex:L3,specularmap_fragment:N3,specularmap_pars_fragment:O3,tonemapping_fragment:P3,tonemapping_pars_fragment:I3,transmission_fragment:B3,transmission_pars_fragment:z3,uv_pars_fragment:F3,uv_pars_vertex:H3,uv_vertex:k3,worldpos_vertex:V3,background_vert:G3,background_frag:W3,backgroundCube_vert:X3,backgroundCube_frag:q3,cube_vert:Y3,cube_frag:Z3,depth_vert:Q3,depth_frag:K3,distanceRGBA_vert:J3,distanceRGBA_frag:j3,equirect_vert:$3,equirect_frag:tD,linedashed_vert:eD,linedashed_frag:nD,meshbasic_vert:iD,meshbasic_frag:sD,meshlambert_vert:rD,meshlambert_frag:aD,meshmatcap_vert:oD,meshmatcap_frag:lD,meshnormal_vert:cD,meshnormal_frag:uD,meshphong_vert:hD,meshphong_frag:fD,meshphysical_vert:dD,meshphysical_frag:pD,meshtoon_vert:mD,meshtoon_frag:gD,points_vert:_D,points_frag:vD,shadow_vert:yD,shadow_frag:xD,sprite_vert:SD,sprite_frag:bD},ft={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},ms={basic:{uniforms:wn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:wn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:wn([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:wn([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:wn([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new zt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:wn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:wn([ft.points,ft.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:wn([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:wn([ft.common,ft.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:wn([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:wn([ft.sprite,ft.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:wn([ft.common,ft.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:wn([ft.lights,ft.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};ms.physical={uniforms:wn([ms.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};var _p={r:0,b:0,g:0},qa=new hs,MD=new Fe;function TD(n,t,e,i,s,r,a){let o=new zt(0),l=r===!0?0:1,c,u,d=null,f=0,h=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1,M=m(y);M===null?p(o,l):M&&M.isColor&&(p(M,1),x=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(y,x){let M=m(x);M&&(M.isCubeTexture||M.mapping===Eu)?(u===void 0&&(u=new un(new ml(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:Wa(ms.backgroundCube.uniforms),vertexShader:ms.backgroundCube.vertexShader,fragmentShader:ms.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),qa.copy(x.backgroundRotation),qa.x*=-1,qa.y*=-1,qa.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qa.y*=-1,qa.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(MD.makeRotationFromEuler(qa)),u.material.toneMapped=ee.getTransfer(M.colorSpace)!==ue,(d!==M||f!==M.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,d=M,f=M.version,h=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new un(new Fa(2,2),new Ue({name:"BackgroundMaterial",uniforms:Wa(ms.background.uniforms),vertexShader:ms.background.vertexShader,fragmentShader:ms.background.fragmentShader,side:Xs,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ee.getTransfer(M.colorSpace)!==ue,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||f!==M.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,d=M,f=M.version,h=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,x){y.getRGB(_p,E_(n)),i.buffers.color.setClear(_p.r,_p.g,_p.b,x,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(o,l)},render:_,addToRenderList:g,dispose:v}}function ED(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null),r=s,a=!1;function o(S,D,k,B,X){let V=!1,F=d(B,k,D);r!==F&&(r=F,c(r.object)),V=h(S,B,k,X),V&&m(S,B,k,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(S,D,k,B),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,D,k){let B=k.wireframe===!0,X=i[S.id];X===void 0&&(X={},i[S.id]=X);let V=X[D.id];V===void 0&&(V={},X[D.id]=V);let F=V[B];return F===void 0&&(F=f(l()),V[B]=F),F}function f(S){let D=[],k=[],B=[];for(let X=0;X<e;X++)D[X]=0,k[X]=0,B[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:B,object:S,attributes:{},index:null}}function h(S,D,k,B){let X=r.attributes,V=D.attributes,F=0,G=k.getAttributes();for(let O in G)if(G[O].location>=0){let et=X[O],nt=V[O];if(nt===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(nt=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(nt=S.instanceColor)),et===void 0||et.attribute!==nt||nt&&et.data!==nt.data)return!0;F++}return r.attributesNum!==F||r.index!==B}function m(S,D,k,B){let X={},V=D.attributes,F=0,G=k.getAttributes();for(let O in G)if(G[O].location>=0){let et=V[O];et===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(et=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(et=S.instanceColor));let nt={};nt.attribute=et,et&&et.data&&(nt.data=et.data),X[O]=nt,F++}r.attributes=X,r.attributesNum=F,r.index=B}function _(){let S=r.newAttributes;for(let D=0,k=S.length;D<k;D++)S[D]=0}function g(S){p(S,0)}function p(S,D){let k=r.newAttributes,B=r.enabledAttributes,X=r.attributeDivisors;k[S]=1,B[S]===0&&(n.enableVertexAttribArray(S),B[S]=1),X[S]!==D&&(n.vertexAttribDivisor(S,D),X[S]=D)}function v(){let S=r.newAttributes,D=r.enabledAttributes;for(let k=0,B=D.length;k<B;k++)D[k]!==S[k]&&(n.disableVertexAttribArray(k),D[k]=0)}function y(S,D,k,B,X,V,F){F===!0?n.vertexAttribIPointer(S,D,k,X,V):n.vertexAttribPointer(S,D,k,B,X,V)}function x(S,D,k,B){_();let X=B.attributes,V=k.getAttributes(),F=D.defaultAttributeValues;for(let G in V){let O=V[G];if(O.location>=0){let K=X[G];if(K===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(K=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(K=S.instanceColor)),K!==void 0){let et=K.normalized,nt=K.itemSize,lt=t.get(K);if(lt===void 0)continue;let Rt=lt.buffer,z=lt.type,J=lt.bytesPerElement,ct=z===n.INT||z===n.UNSIGNED_INT||K.gpuType===zd;if(K.isInterleavedBufferAttribute){let rt=K.data,ht=rt.stride,Ot=K.offset;if(rt.isInstancedInterleavedBuffer){for(let At=0;At<O.locationSize;At++)p(O.location+At,rt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let At=0;At<O.locationSize;At++)g(O.location+At);n.bindBuffer(n.ARRAY_BUFFER,Rt);for(let At=0;At<O.locationSize;At++)y(O.location+At,nt/O.locationSize,z,et,ht*J,(Ot+nt/O.locationSize*At)*J,ct)}else{if(K.isInstancedBufferAttribute){for(let rt=0;rt<O.locationSize;rt++)p(O.location+rt,K.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let rt=0;rt<O.locationSize;rt++)g(O.location+rt);n.bindBuffer(n.ARRAY_BUFFER,Rt);for(let rt=0;rt<O.locationSize;rt++)y(O.location+rt,nt/O.locationSize,z,et,nt*J,nt/O.locationSize*rt*J,ct)}}else if(F!==void 0){let et=F[G];if(et!==void 0)switch(et.length){case 2:n.vertexAttrib2fv(O.location,et);break;case 3:n.vertexAttrib3fv(O.location,et);break;case 4:n.vertexAttrib4fv(O.location,et);break;default:n.vertexAttrib1fv(O.location,et)}}}}v()}function M(){R();for(let S in i){let D=i[S];for(let k in D){let B=D[k];for(let X in B)u(B[X].object),delete B[X];delete D[k]}delete i[S]}}function w(S){if(i[S.id]===void 0)return;let D=i[S.id];for(let k in D){let B=D[k];for(let X in B)u(B[X].object),delete B[X];delete D[k]}delete i[S.id]}function E(S){for(let D in i){let k=i[D];if(k[S.id]===void 0)continue;let B=k[S.id];for(let X in B)u(B[X].object),delete B[X];delete k[S.id]}}function R(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function AD(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),e.update(u,i,d))}function o(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let h=0;for(let m=0;m<d;m++)h+=u[m];e.update(h,i,1)}function l(c,u,d,f){if(d===0)return;let h=t.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<c.length;m++)a(c[m],u[m],f[m]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_]*f[_];e.update(m,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function wD(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let E=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==Ni&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let R=E===Li&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==ds&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ps&&!R)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=m>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:M,maxSamples:w}}function RD(n){let t=this,e=null,i=0,s=!1,r=!1,a=new cs,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let h=d.length!==0||f||i!==0||s;return s=f,i=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,h){let m=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{let v=r?0:i,y=v*4,x=p.clippingState||null;l.value=x,x=u(m,f,y,h);for(let M=0;M!==y;++M)x[M]=e[M];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,f,h,m){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,m!==!0||g===null){let p=h+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<p)&&(g=new Float32Array(p));for(let y=0,x=h;y!==_;++y,x+=4)a.copy(d[y]).applyMatrix4(v,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function CD(n){let t=new WeakMap;function e(a,o){return o===Pd?a.mapping=ka:o===Id&&(a.mapping=Va),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Pd||o===Id)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new od(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Ml=4,XM=[.125,.215,.35,.446,.526,.582],Qa=20,D_=new yl,qM=new zt,U_=null,L_=0,N_=0,O_=!1,Za=(1+Math.sqrt(5))/2,bl=1/Za,YM=[new I(-Za,bl,0),new I(Za,bl,0),new I(-bl,0,Za),new I(bl,0,Za),new I(0,Za,-bl),new I(0,Za,bl),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],DD=new I,xp=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=DD}=r;U_=this._renderer.getRenderTarget(),L_=this._renderer.getActiveCubeFace(),N_=this._renderer.getActiveMipmapLevel(),O_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=KM(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=QM(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(U_,L_,N_),this._renderer.xr.enabled=O_,t.scissorTest=!1,vp(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ka||t.mapping===Va?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),U_=this._renderer.getRenderTarget(),L_=this._renderer.getActiveCubeFace(),N_=this._renderer.getActiveMipmapLevel(),O_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Yi,minFilter:Yi,generateMipmaps:!1,type:Li,format:Ni,colorSpace:Ia,depthBuffer:!1},s=ZM(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ZM(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=UD(r)),this._blurMaterial=LD(r,t,e)}return s}_compileMaterial(t){let e=new un(this._lodPlanes[0],t);this._renderer.compile(e,D_)}_sceneToCubeUV(t,e,i,s,r){let l=new En(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(qM),d.toneMapping=Ks,d.autoClear=!1;let m=new Zs({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1}),_=new un(new ml,m),g=!1,p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,g=!0):(m.color.copy(qM),g=!0);for(let v=0;v<6;v++){let y=v%3;y===0?(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[v],r.y,r.z)):y===1?(l.up.set(0,0,c[v]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[v],r.z)):(l.up.set(0,c[v],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[v]));let x=this._cubeSize;vp(s,y*x,v>2?x:0,x,x),d.setRenderTarget(s),g&&d.render(_,l),d.render(t,l)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=h,d.autoClear=f,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===ka||t.mapping===Va;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=KM()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=QM());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new un(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;vp(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,D_)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=YM[(s-r-1)%YM.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new un(this._lodPlanes[s],c),f=c.uniforms,h=this._sizeLods[i]-1,m=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Qa-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):Qa;g>Qa&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qa}`);let p=[],v=0;for(let E=0;E<Qa;++E){let R=E/_,b=Math.exp(-R*R/2);p.push(b),E===0?v+=b:E<g&&(v+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=m,f.mipInt.value=y-i;let x=this._sizeLods[s],M=3*x*(s>y-Ml?s-y+Ml:0),w=4*(this._cubeSize-x);vp(e,M,w,3*x,2*x),l.setRenderTarget(e),l.render(d,D_)}};function UD(n){let t=[],e=[],i=[],s=n,r=n-Ml+1+XM.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ml?l=XM[a-n+Ml-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,m=6,_=3,g=2,p=1,v=new Float32Array(_*m*h),y=new Float32Array(g*m*h),x=new Float32Array(p*m*h);for(let w=0;w<h;w++){let E=w%3*2/3-1,R=w>2?0:-1,b=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(b,_*m*w),y.set(f,g*m*w);let S=[w,w,w,w,w,w];x.set(S,p*m*w)}let M=new In;M.setAttribute("position",new mn(v,_)),M.setAttribute("uv",new mn(y,g)),M.setAttribute("faceIndex",new mn(x,p)),t.push(M),s>Ml&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function ZM(n,t,e){let i=new An(n,t,e);return i.texture.mapping=Eu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vp(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function LD(n,t,e){let i=new Float32Array(Qa),s=new I(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:Qa,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:W_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function QM(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:W_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function KM(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:W_(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function W_(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ND(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Pd||l===Id,u=l===ka||l===Va;if(c||u){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new xp(n)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let h=o.image;return c&&h&&h.height>0||u&&h&&s(h)?(e===null&&(e=new xp(n)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function OD(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&Wr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function PD(n,t,e,i){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",a),delete s[f.id];let h=r.get(f);h&&(t.remove(h),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(d){let f=d.attributes;for(let h in f)t.update(f[h],n.ARRAY_BUFFER)}function c(d){let f=[],h=d.index,m=d.attributes.position,_=0;if(h!==null){let v=h.array;_=h.version;for(let y=0,x=v.length;y<x;y+=3){let M=v[y+0],w=v[y+1],E=v[y+2];f.push(M,w,w,E,E,M)}}else if(m!==void 0){let v=m.array;_=m.version;for(let y=0,x=v.length/3-1;y<x;y+=3){let M=y+0,w=y+1,E=y+2;f.push(M,w,w,E,E,M)}}else return;let g=new(T_(f)?ru:su)(f,1);g.version=_;let p=r.get(d);p&&t.remove(p),r.set(d,g)}function u(d){let f=r.get(d);if(f){let h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function ID(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function c(f,h,m){m!==0&&(n.drawElementsInstanced(i,h,r,f*a,m),e.update(h,i,m))}function u(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];e.update(g,i,1)}function d(f,h,m,_){if(m===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/a,h[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(i,h,0,r,f,0,_,0,m);let p=0;for(let v=0;v<m;v++)p+=h[v]*_[v];e.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function BD(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function zD(n,t,e){let i=new WeakMap,s=new He;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=i.get(o);if(f===void 0||f.count!==d){let b=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();let h=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],y=0;h===!0&&(y=1),m===!0&&(y=2),_===!0&&(y=3);let x=o.attributes.position.count*y,M=1;x>t.maxTextureSize&&(M=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let w=new Float32Array(x*M*4*d),E=new eu(w,x,M,d);E.type=ps,E.needsUpdate=!0;let R=y*4;for(let S=0;S<d;S++){let D=g[S],k=p[S],B=v[S],X=x*M*4*S;for(let V=0;V<D.count;V++){let F=V*R;h===!0&&(s.fromBufferAttribute(D,V),w[X+F+0]=s.x,w[X+F+1]=s.y,w[X+F+2]=s.z,w[X+F+3]=0),m===!0&&(s.fromBufferAttribute(k,V),w[X+F+4]=s.x,w[X+F+5]=s.y,w[X+F+6]=s.z,w[X+F+7]=0),_===!0&&(s.fromBufferAttribute(B,V),w[X+F+8]=s.x,w[X+F+9]=s.y,w[X+F+10]=s.z,w[X+F+11]=B.itemSize===4?s.w:1)}}f={count:d,texture:E,size:new mt(x,M)},i.set(o,f),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let h=0;for(let _=0;_<c.length;_++)h+=c[_];let m=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function FD(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var mT=new ai,JM=new fu(1,1),gT=new eu,_T=new rd,vT=new ou,jM=[],$M=[],tT=new Float32Array(16),eT=new Float32Array(9),nT=new Float32Array(4);function El(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=jM[s];if(r===void 0&&(r=new Float32Array(s),jM[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function en(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function nn(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function bp(n,t){let e=$M[t];e===void 0&&(e=new Int32Array(t),$M[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function HD(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function kD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2fv(this.addr,t),nn(e,t)}}function VD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(en(e,t))return;n.uniform3fv(this.addr,t),nn(e,t)}}function GD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4fv(this.addr,t),nn(e,t)}}function WD(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;nT.set(i),n.uniformMatrix2fv(this.addr,!1,nT),nn(e,i)}}function XD(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;eT.set(i),n.uniformMatrix3fv(this.addr,!1,eT),nn(e,i)}}function qD(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(en(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),nn(e,t)}else{if(en(e,i))return;tT.set(i),n.uniformMatrix4fv(this.addr,!1,tT),nn(e,i)}}function YD(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function ZD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2iv(this.addr,t),nn(e,t)}}function QD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;n.uniform3iv(this.addr,t),nn(e,t)}}function KD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4iv(this.addr,t),nn(e,t)}}function JD(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function jD(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(en(e,t))return;n.uniform2uiv(this.addr,t),nn(e,t)}}function $D(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(en(e,t))return;n.uniform3uiv(this.addr,t),nn(e,t)}}function tU(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(en(e,t))return;n.uniform4uiv(this.addr,t),nn(e,t)}}function eU(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(JM.compareFunction=b_,r=JM):r=mT,e.setTexture2D(t||r,s)}function nU(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||_T,s)}function iU(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||vT,s)}function sU(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||gT,s)}function rU(n){switch(n){case 5126:return HD;case 35664:return kD;case 35665:return VD;case 35666:return GD;case 35674:return WD;case 35675:return XD;case 35676:return qD;case 5124:case 35670:return YD;case 35667:case 35671:return ZD;case 35668:case 35672:return QD;case 35669:case 35673:return KD;case 5125:return JD;case 36294:return jD;case 36295:return $D;case 36296:return tU;case 35678:case 36198:case 36298:case 36306:case 35682:return eU;case 35679:case 36299:case 36307:return nU;case 35680:case 36300:case 36308:case 36293:return iU;case 36289:case 36303:case 36311:case 36292:return sU}}function aU(n,t){n.uniform1fv(this.addr,t)}function oU(n,t){let e=El(t,this.size,2);n.uniform2fv(this.addr,e)}function lU(n,t){let e=El(t,this.size,3);n.uniform3fv(this.addr,e)}function cU(n,t){let e=El(t,this.size,4);n.uniform4fv(this.addr,e)}function uU(n,t){let e=El(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function hU(n,t){let e=El(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function fU(n,t){let e=El(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function dU(n,t){n.uniform1iv(this.addr,t)}function pU(n,t){n.uniform2iv(this.addr,t)}function mU(n,t){n.uniform3iv(this.addr,t)}function gU(n,t){n.uniform4iv(this.addr,t)}function _U(n,t){n.uniform1uiv(this.addr,t)}function vU(n,t){n.uniform2uiv(this.addr,t)}function yU(n,t){n.uniform3uiv(this.addr,t)}function xU(n,t){n.uniform4uiv(this.addr,t)}function SU(n,t,e){let i=this.cache,s=t.length,r=bp(e,s);en(i,r)||(n.uniform1iv(this.addr,r),nn(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||mT,r[a])}function bU(n,t,e){let i=this.cache,s=t.length,r=bp(e,s);en(i,r)||(n.uniform1iv(this.addr,r),nn(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||_T,r[a])}function MU(n,t,e){let i=this.cache,s=t.length,r=bp(e,s);en(i,r)||(n.uniform1iv(this.addr,r),nn(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||vT,r[a])}function TU(n,t,e){let i=this.cache,s=t.length,r=bp(e,s);en(i,r)||(n.uniform1iv(this.addr,r),nn(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gT,r[a])}function EU(n){switch(n){case 5126:return aU;case 35664:return oU;case 35665:return lU;case 35666:return cU;case 35674:return uU;case 35675:return hU;case 35676:return fU;case 5124:case 35670:return dU;case 35667:case 35671:return pU;case 35668:case 35672:return mU;case 35669:case 35673:return gU;case 5125:return _U;case 36294:return vU;case 36295:return yU;case 36296:return xU;case 35678:case 36198:case 36298:case 36306:case 35682:return SU;case 35679:case 36299:case 36307:return bU;case 35680:case 36300:case 36308:case 36293:return MU;case 36289:case 36303:case 36311:case 36292:return TU}}var I_=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=rU(e.type)}},B_=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=EU(e.type)}},z_=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},P_=/(\w+)(\])?(\[|\.)?/g;function iT(n,t){n.seq.push(t),n.map[t.id]=t}function AU(n,t,e){let i=n.name,s=i.length;for(P_.lastIndex=0;;){let r=P_.exec(i),a=P_.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){iT(e,c===void 0?new I_(o,n,t):new B_(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new z_(o),iT(e,d)),e=d}}}var Tl=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);AU(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function sT(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var wU=37297,RU=0;function CU(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var rT=new Ht;function DU(n){ee._getMatrix(rT,ee.workingColorSpace,n);let t=`mat3( ${rT.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(n)){case jc:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function aT(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+CU(n.getShaderSource(t),a)}else return s}function UU(n,t){let e=DU(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function LU(n,t){let e;switch(t){case vM:e="Linear";break;case yM:e="Reinhard";break;case xM:e="Cineon";break;case Od:e="ACESFilmic";break;case bM:e="AgX";break;case MM:e="Neutral";break;case SM:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var yp=new I;function NU(){ee.getLuminanceCoefficients(yp);let n=yp.x.toFixed(4),t=yp.y.toFixed(4),e=yp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function OU(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lu).join(`
`)}function PU(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function IU(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Lu(n){return n!==""}function oT(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function lT(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var BU=/^[ \t]*#include +<([\w\d./]+)>/gm;function F_(n){return n.replace(BU,FU)}var zU=new Map;function FU(n,t){let e=Xt[t];if(e===void 0){let i=zU.get(t);if(i!==void 0)e=Xt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return F_(e)}var HU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cT(n){return n.replace(HU,kU)}function kU(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uT(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function VU(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===o_?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jb?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===fs&&(t="SHADOWMAP_TYPE_VSM"),t}function GU(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ka:case Va:t="ENVMAP_TYPE_CUBE";break;case Eu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function WU(n){let t="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Va&&(t="ENVMAP_MODE_REFRACTION"),t}function XU(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case u_:t="ENVMAP_BLENDING_MULTIPLY";break;case gM:t="ENVMAP_BLENDING_MIX";break;case _M:t="ENVMAP_BLENDING_ADD";break}return t}function qU(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function YU(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=VU(e),c=GU(e),u=WU(e),d=XU(e),f=qU(e),h=OU(e),m=PU(r),_=s.createProgram(),g,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Lu).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Lu).join(`
`),p.length>0&&(p+=`
`)):(g=[uT(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lu).join(`
`),p=[uT(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ks?"#define TONE_MAPPING":"",e.toneMapping!==Ks?Xt.tonemapping_pars_fragment:"",e.toneMapping!==Ks?LU("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,UU("linearToOutputTexel",e.outputColorSpace),NU(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Lu).join(`
`)),a=F_(a),a=oT(a,e),a=lT(a,e),o=F_(o),o=oT(o,e),o=lT(o,e),a=cT(a),o=cT(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===M_?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===M_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let y=v+g+a,x=v+p+o,M=sT(s,s.VERTEX_SHADER,y),w=sT(s,s.FRAGMENT_SHADER,x);s.attachShader(_,M),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function E(D){if(n.debug.checkShaderErrors){let k=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(M).trim(),X=s.getShaderInfoLog(w).trim(),V=!0,F=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,M,w);else{let G=aT(s,M,"vertex"),O=aT(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+G+`
`+O)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||X==="")&&(F=!1);F&&(D.diagnostics={runnable:V,programLog:k,vertexShader:{log:B,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(M),s.deleteShader(w),R=new Tl(s,_),b=IU(s,_)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,wU)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=RU++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=w,this}var ZU=0,H_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new k_(t),e.set(t,i)),i}},k_=class{constructor(t){this.id=ZU++,this.code=t,this.usedTimes=0}};function QU(n,t,e,i,s,r,a){let o=new iu,l=new H_,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,h=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,S,D,k,B){let X=k.fog,V=B.geometry,F=b.isMeshStandardMaterial?k.environment:null,G=(b.isMeshStandardMaterial?e:t).get(b.envMap||F),O=G&&G.mapping===Eu?G.image.height:null,K=m[b.type];b.precision!==null&&(h=s.getMaxPrecision(b.precision),h!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",h,"instead."));let et=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,nt=et!==void 0?et.length:0,lt=0;V.morphAttributes.position!==void 0&&(lt=1),V.morphAttributes.normal!==void 0&&(lt=2),V.morphAttributes.color!==void 0&&(lt=3);let Rt,z,J,ct;if(K){let ce=ms[K];Rt=ce.vertexShader,z=ce.fragmentShader}else Rt=b.vertexShader,z=b.fragmentShader,l.update(b),J=l.getVertexShaderID(b),ct=l.getFragmentShaderID(b);let rt=n.getRenderTarget(),ht=n.state.buffers.depth.getReversed(),Ot=B.isInstancedMesh===!0,At=B.isBatchedMesh===!0,ne=!!b.map,ae=!!b.matcap,Ct=!!G,U=!!b.aoMap,Ge=!!b.lightMap,kt=!!b.bumpMap,it=!!b.normalMap,at=!!b.displacementMap,Ut=!!b.emissiveMap,ut=!!b.metalnessMap,C=!!b.roughnessMap,T=b.anisotropy>0,H=b.clearcoat>0,Z=b.dispersion>0,tt=b.iridescence>0,Q=b.sheen>0,Tt=b.transmission>0,gt=T&&!!b.anisotropyMap,xt=H&&!!b.clearcoatMap,$t=H&&!!b.clearcoatNormalMap,ot=H&&!!b.clearcoatRoughnessMap,St=tt&&!!b.iridescenceMap,Nt=tt&&!!b.iridescenceThicknessMap,Pt=Q&&!!b.sheenColorMap,bt=Q&&!!b.sheenRoughnessMap,Jt=!!b.specularMap,Gt=!!b.specularColorMap,ve=!!b.specularIntensityMap,L=Tt&&!!b.transmissionMap,dt=Tt&&!!b.thicknessMap,Y=!!b.gradientMap,$=!!b.alphaMap,vt=b.alphaTest>0,_t=!!b.alphaHash,Vt=!!b.extensions,Pe=Ks;b.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(Pe=n.toneMapping);let yn={shaderID:K,shaderType:b.type,shaderName:b.name,vertexShader:Rt,fragmentShader:z,defines:b.defines,customVertexShaderID:J,customFragmentShaderID:ct,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:h,batching:At,batchingColor:At&&B._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&B.instanceColor!==null,instancingMorph:Ot&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?n.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Ia,alphaToCoverage:!!b.alphaToCoverage,map:ne,matcap:ae,envMap:Ct,envMapMode:Ct&&G.mapping,envMapCubeUVHeight:O,aoMap:U,lightMap:Ge,bumpMap:kt,normalMap:it,displacementMap:f&&at,emissiveMap:Ut,normalMapObjectSpace:it&&b.normalMapType===RM,normalMapTangentSpace:it&&b.normalMapType===wM,metalnessMap:ut,roughnessMap:C,anisotropy:T,anisotropyMap:gt,clearcoat:H,clearcoatMap:xt,clearcoatNormalMap:$t,clearcoatRoughnessMap:ot,dispersion:Z,iridescence:tt,iridescenceMap:St,iridescenceThicknessMap:Nt,sheen:Q,sheenColorMap:Pt,sheenRoughnessMap:bt,specularMap:Jt,specularColorMap:Gt,specularIntensityMap:ve,transmission:Tt,transmissionMap:L,thicknessMap:dt,gradientMap:Y,opaque:b.transparent===!1&&b.blending===Na&&b.alphaToCoverage===!1,alphaMap:$,alphaTest:vt,alphaHash:_t,combine:b.combine,mapUv:ne&&_(b.map.channel),aoMapUv:U&&_(b.aoMap.channel),lightMapUv:Ge&&_(b.lightMap.channel),bumpMapUv:kt&&_(b.bumpMap.channel),normalMapUv:it&&_(b.normalMap.channel),displacementMapUv:at&&_(b.displacementMap.channel),emissiveMapUv:Ut&&_(b.emissiveMap.channel),metalnessMapUv:ut&&_(b.metalnessMap.channel),roughnessMapUv:C&&_(b.roughnessMap.channel),anisotropyMapUv:gt&&_(b.anisotropyMap.channel),clearcoatMapUv:xt&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ot&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:bt&&_(b.sheenRoughnessMap.channel),specularMapUv:Jt&&_(b.specularMap.channel),specularColorMapUv:Gt&&_(b.specularColorMap.channel),specularIntensityMapUv:ve&&_(b.specularIntensityMap.channel),transmissionMapUv:L&&_(b.transmissionMap.channel),thicknessMapUv:dt&&_(b.thicknessMap.channel),alphaMapUv:$&&_(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(it||T),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(ne||$),fog:!!X,useFog:b.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:ht,skinning:B.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,decodeVideoTexture:ne&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:Ut&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ci,flipSided:b.side===gn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Vt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&b.extensions.multiDraw===!0||At)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return yn.vertexUv1s=c.has(1),yn.vertexUv2s=c.has(2),yn.vertexUv3s=c.has(3),c.clear(),yn}function p(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(v(S,b),y(S,b),S.push(n.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function v(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function y(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function x(b){let S=m[b.type],D;if(S){let k=ms[S];D=Xa.clone(k.uniforms)}else D=b.uniforms;return D}function M(b,S){let D;for(let k=0,B=u.length;k<B;k++){let X=u[k];if(X.cacheKey===S){D=X,++D.usedTimes;break}}return D===void 0&&(D=new YU(n,S,b,r),u.push(D)),D}function w(b){if(--b.usedTimes===0){let S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function E(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:M,releaseProgram:w,releaseShaderCache:E,programs:u,dispose:R}}function KU(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function JU(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function hT(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function fT(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d,f,h,m,_,g){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:m,renderOrder:d.renderOrder,z:_,group:g},n[t]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=_,p.group=g),t++,p}function o(d,f,h,m,_,g){let p=a(d,f,h,m,_,g);h.transmission>0?i.push(p):h.transparent===!0?s.push(p):e.push(p)}function l(d,f,h,m,_,g){let p=a(d,f,h,m,_,g);h.transmission>0?i.unshift(p):h.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,f){e.length>1&&e.sort(d||JU),i.length>1&&i.sort(f||hT),s.length>1&&s.sort(f||hT)}function u(){for(let d=t,f=n.length;d<f;d++){let h=n[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function jU(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new fT,n.set(i,[a])):s>=r.length?(a=new fT,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function $U(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new zt};break;case"SpotLight":e={position:new I,direction:new I,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function tL(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var eL=0;function nL(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function iL(n){let t=new $U,e=tL(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);let s=new I,r=new Fe,a=new Fe;function o(c){let u=0,d=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let h=0,m=0,_=0,g=0,p=0,v=0,y=0,x=0,M=0,w=0,E=0;c.sort(nL);for(let b=0,S=c.length;b<S;b++){let D=c[b],k=D.color,B=D.intensity,X=D.distance,V=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=k.r*B,d+=k.g*B,f+=k.b*B;else if(D.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(D.sh.coefficients[F],B);E++}else if(D.isDirectionalLight){let F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let G=D.shadow,O=e.get(D);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,i.directionalShadow[h]=O,i.directionalShadowMap[h]=V,i.directionalShadowMatrix[h]=D.shadow.matrix,v++}i.directional[h]=F,h++}else if(D.isSpotLight){let F=t.get(D);F.position.setFromMatrixPosition(D.matrixWorld),F.color.copy(k).multiplyScalar(B),F.distance=X,F.coneCos=Math.cos(D.angle),F.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),F.decay=D.decay,i.spot[_]=F;let G=D.shadow;if(D.map&&(i.spotLightMap[M]=D.map,M++,G.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[_]=G.matrix,D.castShadow){let O=e.get(D);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,i.spotShadow[_]=O,i.spotShadowMap[_]=V,x++}_++}else if(D.isRectAreaLight){let F=t.get(D);F.color.copy(k).multiplyScalar(B),F.halfWidth.set(D.width*.5,0,0),F.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=F,g++}else if(D.isPointLight){let F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),F.distance=D.distance,F.decay=D.decay,D.castShadow){let G=D.shadow,O=e.get(D);O.shadowIntensity=G.intensity,O.shadowBias=G.bias,O.shadowNormalBias=G.normalBias,O.shadowRadius=G.radius,O.shadowMapSize=G.mapSize,O.shadowCameraNear=G.camera.near,O.shadowCameraFar=G.camera.far,i.pointShadow[m]=O,i.pointShadowMap[m]=V,i.pointShadowMatrix[m]=D.shadow.matrix,y++}i.point[m]=F,m++}else if(D.isHemisphereLight){let F=t.get(D);F.skyColor.copy(D.color).multiplyScalar(B),F.groundColor.copy(D.groundColor).multiplyScalar(B),i.hemi[p]=F,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;let R=i.hash;(R.directionalLength!==h||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==x||R.numSpotMaps!==M||R.numLightProbes!==E)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=x+M-w,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=E,R.directionalLength=h,R.pointLength=m,R.spotLength=_,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=x,R.numSpotMaps=M,R.numLightProbes=E,i.version=eL++)}function l(c,u){let d=0,f=0,h=0,m=0,_=0,g=u.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let y=c[p];if(y.isDirectionalLight){let x=i.directional[d];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(y.isSpotLight){let x=i.spot[h];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),h++}else if(y.isRectAreaLight){let x=i.rectArea[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){let x=i.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let x=i.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:i}}function dT(n){let t=new iL(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function a(u){i.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function sL(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new dT(n),t.set(s,[o])):r>=a.length?(o=new dT(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var rL=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,aL=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function oL(n,t,e){let i=new uu,s=new mt,r=new mt,a=new He,o=new md({depthPacking:AM}),l=new gd,c={},u=e.maxTextureSize,d={[Xs]:gn,[gn]:Xs,[ci]:ci},f=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:rL,fragmentShader:aL}),h=f.clone();h.defines.HORIZONTAL_PASS=1;let m=new In;m.setAttribute("position",new mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new un(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=o_;let p=this.type;this.render=function(w,E,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;let b=n.getRenderTarget(),S=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Zi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let B=p!==fs&&this.type===fs,X=p===fs&&this.type!==fs;for(let V=0,F=w.length;V<F;V++){let G=w[V],O=G.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let K=O.getFrameExtents();if(s.multiply(K),r.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/K.x),s.x=r.x*K.x,O.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/K.y),s.y=r.y*K.y,O.mapSize.y=r.y)),O.map===null||B===!0||X===!0){let nt=this.type!==fs?{minFilter:Di,magFilter:Di}:{};O.map!==null&&O.map.dispose(),O.map=new An(s.x,s.y,nt),O.map.texture.name=G.name+".shadowMap",O.camera.updateProjectionMatrix()}n.setRenderTarget(O.map),n.clear();let et=O.getViewportCount();for(let nt=0;nt<et;nt++){let lt=O.getViewport(nt);a.set(r.x*lt.x,r.y*lt.y,r.x*lt.z,r.y*lt.w),k.viewport(a),O.updateMatrices(G,nt),i=O.getFrustum(),x(E,R,O.camera,G,this.type)}O.isPointLightShadow!==!0&&this.type===fs&&v(O,R),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(b,S,D)};function v(w,E){let R=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,h.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new An(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(E,null,R,f,_,null),h.uniforms.shadow_pass.value=w.mapPass.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(E,null,R,h,_,null)}function y(w,E,R,b){let S=null,D=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)S=D;else if(S=R.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){let k=S.uuid,B=E.uuid,X=c[k];X===void 0&&(X={},c[k]=X);let V=X[B];V===void 0&&(V=S.clone(),X[B]=V,E.addEventListener("dispose",M)),S=V}if(S.visible=E.visible,S.wireframe=E.wireframe,b===fs?S.side=E.shadowSide!==null?E.shadowSide:E.side:S.side=E.shadowSide!==null?E.shadowSide:d[E.side],S.alphaMap=E.alphaMap,S.alphaTest=E.alphaTest,S.map=E.map,S.clipShadows=E.clipShadows,S.clippingPlanes=E.clippingPlanes,S.clipIntersection=E.clipIntersection,S.displacementMap=E.displacementMap,S.displacementScale=E.displacementScale,S.displacementBias=E.displacementBias,S.wireframeLinewidth=E.wireframeLinewidth,S.linewidth=E.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let k=n.properties.get(S);k.light=R}return S}function x(w,E,R,b,S){if(w.visible===!1)return;if(w.layers.test(E.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&S===fs)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let B=t.update(w),X=w.material;if(Array.isArray(X)){let V=B.groups;for(let F=0,G=V.length;F<G;F++){let O=V[F],K=X[O.materialIndex];if(K&&K.visible){let et=y(w,K,b,S);w.onBeforeShadow(n,w,E,R,B,et,O),n.renderBufferDirect(R,null,B,et,w,O),w.onAfterShadow(n,w,E,R,B,et,O)}}}else if(X.visible){let V=y(w,X,b,S);w.onBeforeShadow(n,w,E,R,B,V,null),n.renderBufferDirect(R,null,B,V,w,null),w.onAfterShadow(n,w,E,R,B,V,null)}}let k=w.children;for(let B=0,X=k.length;B<X;B++)x(k[B],E,R,b,S)}function M(w){w.target.removeEventListener("dispose",M);for(let R in c){let b=c[R],S=w.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var lL={[wd]:Rd,[Cd]:Ld,[Dd]:Nd,[Oa]:Ud,[Rd]:wd,[Ld]:Cd,[Nd]:Dd,[Ud]:Oa};function cL(n,t){function e(){let L=!1,dt=new He,Y=null,$=new He(0,0,0,0);return{setMask:function(vt){Y!==vt&&!L&&(n.colorMask(vt,vt,vt,vt),Y=vt)},setLocked:function(vt){L=vt},setClear:function(vt,_t,Vt,Pe,yn){yn===!0&&(vt*=Pe,_t*=Pe,Vt*=Pe),dt.set(vt,_t,Vt,Pe),$.equals(dt)===!1&&(n.clearColor(vt,_t,Vt,Pe),$.copy(dt))},reset:function(){L=!1,Y=null,$.set(-1,0,0,0)}}}function i(){let L=!1,dt=!1,Y=null,$=null,vt=null;return{setReversed:function(_t){if(dt!==_t){let Vt=t.get("EXT_clip_control");dt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);let Pe=vt;vt=null,this.setClear(Pe)}dt=_t},getReversed:function(){return dt},setTest:function(_t){_t?rt(n.DEPTH_TEST):ht(n.DEPTH_TEST)},setMask:function(_t){Y!==_t&&!L&&(n.depthMask(_t),Y=_t)},setFunc:function(_t){if(dt&&(_t=lL[_t]),$!==_t){switch(_t){case wd:n.depthFunc(n.NEVER);break;case Rd:n.depthFunc(n.ALWAYS);break;case Cd:n.depthFunc(n.LESS);break;case Oa:n.depthFunc(n.LEQUAL);break;case Dd:n.depthFunc(n.EQUAL);break;case Ud:n.depthFunc(n.GEQUAL);break;case Ld:n.depthFunc(n.GREATER);break;case Nd:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}$=_t}},setLocked:function(_t){L=_t},setClear:function(_t){vt!==_t&&(dt&&(_t=1-_t),n.clearDepth(_t),vt=_t)},reset:function(){L=!1,Y=null,$=null,vt=null,dt=!1}}}function s(){let L=!1,dt=null,Y=null,$=null,vt=null,_t=null,Vt=null,Pe=null,yn=null;return{setTest:function(ce){L||(ce?rt(n.STENCIL_TEST):ht(n.STENCIL_TEST))},setMask:function(ce){dt!==ce&&!L&&(n.stencilMask(ce),dt=ce)},setFunc:function(ce,Bi,xs){(Y!==ce||$!==Bi||vt!==xs)&&(n.stencilFunc(ce,Bi,xs),Y=ce,$=Bi,vt=xs)},setOp:function(ce,Bi,xs){(_t!==ce||Vt!==Bi||Pe!==xs)&&(n.stencilOp(ce,Bi,xs),_t=ce,Vt=Bi,Pe=xs)},setLocked:function(ce){L=ce},setClear:function(ce){yn!==ce&&(n.clearStencil(ce),yn=ce)},reset:function(){L=!1,dt=null,Y=null,$=null,vt=null,_t=null,Vt=null,Pe=null,yn=null}}}let r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},f=new WeakMap,h=[],m=null,_=!1,g=null,p=null,v=null,y=null,x=null,M=null,w=null,E=new zt(0,0,0),R=0,b=!1,S=null,D=null,k=null,B=null,X=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,G=0,O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=G>=1):O.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=G>=2);let K=null,et={},nt=n.getParameter(n.SCISSOR_BOX),lt=n.getParameter(n.VIEWPORT),Rt=new He().fromArray(nt),z=new He().fromArray(lt);function J(L,dt,Y,$){let vt=new Uint8Array(4),_t=n.createTexture();n.bindTexture(L,_t),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<Y;Vt++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(dt+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return _t}let ct={};ct[n.TEXTURE_2D]=J(n.TEXTURE_2D,n.TEXTURE_2D,1),ct[n.TEXTURE_CUBE_MAP]=J(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ct[n.TEXTURE_2D_ARRAY]=J(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ct[n.TEXTURE_3D]=J(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(n.DEPTH_TEST),a.setFunc(Oa),kt(!1),it(a_),rt(n.CULL_FACE),U(Zi);function rt(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function ht(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function Ot(L,dt){return d[L]!==dt?(n.bindFramebuffer(L,dt),d[L]=dt,L===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=dt),L===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function At(L,dt){let Y=h,$=!1;if(L){Y=f.get(dt),Y===void 0&&(Y=[],f.set(dt,Y));let vt=L.textures;if(Y.length!==vt.length||Y[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,Vt=vt.length;_t<Vt;_t++)Y[_t]=n.COLOR_ATTACHMENT0+_t;Y.length=vt.length,$=!0}}else Y[0]!==n.BACK&&(Y[0]=n.BACK,$=!0);$&&n.drawBuffers(Y)}function ne(L){return m!==L?(n.useProgram(L),m=L,!0):!1}let ae={[Br]:n.FUNC_ADD,[$b]:n.FUNC_SUBTRACT,[tM]:n.FUNC_REVERSE_SUBTRACT};ae[eM]=n.MIN,ae[nM]=n.MAX;let Ct={[iM]:n.ZERO,[sM]:n.ONE,[rM]:n.SRC_COLOR,[Jf]:n.SRC_ALPHA,[hM]:n.SRC_ALPHA_SATURATE,[cM]:n.DST_COLOR,[oM]:n.DST_ALPHA,[aM]:n.ONE_MINUS_SRC_COLOR,[jf]:n.ONE_MINUS_SRC_ALPHA,[uM]:n.ONE_MINUS_DST_COLOR,[lM]:n.ONE_MINUS_DST_ALPHA,[fM]:n.CONSTANT_COLOR,[dM]:n.ONE_MINUS_CONSTANT_COLOR,[pM]:n.CONSTANT_ALPHA,[mM]:n.ONE_MINUS_CONSTANT_ALPHA};function U(L,dt,Y,$,vt,_t,Vt,Pe,yn,ce){if(L===Zi){_===!0&&(ht(n.BLEND),_=!1);return}if(_===!1&&(rt(n.BLEND),_=!0),L!==jb){if(L!==g||ce!==b){if((p!==Br||x!==Br)&&(n.blendEquation(n.FUNC_ADD),p=Br,x=Br),ce)switch(L){case Na:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qs:n.blendFunc(n.ONE,n.ONE);break;case l_:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case c_:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Na:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case l_:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case c_:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,y=null,M=null,w=null,E.set(0,0,0),R=0,g=L,b=ce}return}vt=vt||dt,_t=_t||Y,Vt=Vt||$,(dt!==p||vt!==x)&&(n.blendEquationSeparate(ae[dt],ae[vt]),p=dt,x=vt),(Y!==v||$!==y||_t!==M||Vt!==w)&&(n.blendFuncSeparate(Ct[Y],Ct[$],Ct[_t],Ct[Vt]),v=Y,y=$,M=_t,w=Vt),(Pe.equals(E)===!1||yn!==R)&&(n.blendColor(Pe.r,Pe.g,Pe.b,yn),E.copy(Pe),R=yn),g=L,b=!1}function Ge(L,dt){L.side===ci?ht(n.CULL_FACE):rt(n.CULL_FACE);let Y=L.side===gn;dt&&(Y=!Y),kt(Y),L.blending===Na&&L.transparent===!1?U(Zi):U(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);let $=L.stencilWrite;o.setTest($),$&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ut(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?rt(n.SAMPLE_ALPHA_TO_COVERAGE):ht(n.SAMPLE_ALPHA_TO_COVERAGE)}function kt(L){S!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),S=L)}function it(L){L!==Qb?(rt(n.CULL_FACE),L!==D&&(L===a_?n.cullFace(n.BACK):L===Kb?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ht(n.CULL_FACE),D=L}function at(L){L!==k&&(F&&n.lineWidth(L),k=L)}function Ut(L,dt,Y){L?(rt(n.POLYGON_OFFSET_FILL),(B!==dt||X!==Y)&&(n.polygonOffset(dt,Y),B=dt,X=Y)):ht(n.POLYGON_OFFSET_FILL)}function ut(L){L?rt(n.SCISSOR_TEST):ht(n.SCISSOR_TEST)}function C(L){L===void 0&&(L=n.TEXTURE0+V-1),K!==L&&(n.activeTexture(L),K=L)}function T(L,dt,Y){Y===void 0&&(K===null?Y=n.TEXTURE0+V-1:Y=K);let $=et[Y];$===void 0&&($={type:void 0,texture:void 0},et[Y]=$),($.type!==L||$.texture!==dt)&&(K!==Y&&(n.activeTexture(Y),K=Y),n.bindTexture(L,dt||ct[L]),$.type=L,$.texture=dt)}function H(){let L=et[K];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Z(){try{n.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function tt(){try{n.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{n.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Tt(){try{n.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(){try{n.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{n.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function $t(){try{n.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{n.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function St(){try{n.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Nt(){try{n.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Pt(L){Rt.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),Rt.copy(L))}function bt(L){z.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),z.copy(L))}function Jt(L,dt){let Y=c.get(dt);Y===void 0&&(Y=new WeakMap,c.set(dt,Y));let $=Y.get(L);$===void 0&&($=n.getUniformBlockIndex(dt,L.name),Y.set(L,$))}function Gt(L,dt){let $=c.get(dt).get(L);l.get(dt)!==$&&(n.uniformBlockBinding(dt,$,L.__bindingPointIndex),l.set(dt,$))}function ve(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},K=null,et={},d={},f=new WeakMap,h=[],m=null,_=!1,g=null,p=null,v=null,y=null,x=null,M=null,w=null,E=new zt(0,0,0),R=0,b=!1,S=null,D=null,k=null,B=null,X=null,Rt.set(0,0,n.canvas.width,n.canvas.height),z.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:ht,bindFramebuffer:Ot,drawBuffers:At,useProgram:ne,setBlending:U,setMaterial:Ge,setFlipSided:kt,setCullFace:it,setLineWidth:at,setPolygonOffset:Ut,setScissorTest:ut,activeTexture:C,bindTexture:T,unbindTexture:H,compressedTexImage2D:Z,compressedTexImage3D:tt,texImage2D:St,texImage3D:Nt,updateUBOMapping:Jt,uniformBlockBinding:Gt,texStorage2D:$t,texStorage3D:ot,texSubImage2D:Q,texSubImage3D:Tt,compressedTexSubImage2D:gt,compressedTexSubImage3D:xt,scissor:Pt,viewport:bt,reset:ve}}function uL(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,u=new WeakMap,d,f=new WeakMap,h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(C,T){return h?new OffscreenCanvas(C,T):tu("canvas")}function _(C,T,H){let Z=1,tt=ut(C);if((tt.width>H||tt.height>H)&&(Z=H/Math.max(tt.width,tt.height)),Z<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let Q=Math.floor(Z*tt.width),Tt=Math.floor(Z*tt.height);d===void 0&&(d=m(Q,Tt));let gt=T?m(Q,Tt):d;return gt.width=Q,gt.height=Tt,gt.getContext("2d").drawImage(C,0,0,Q,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+Q+"x"+Tt+")."),gt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),C;return C}function g(C){return C.generateMipmaps}function p(C){n.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,T,H,Z,tt=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Q=T;if(T===n.RED&&(H===n.FLOAT&&(Q=n.R32F),H===n.HALF_FLOAT&&(Q=n.R16F),H===n.UNSIGNED_BYTE&&(Q=n.R8)),T===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.R8UI),H===n.UNSIGNED_SHORT&&(Q=n.R16UI),H===n.UNSIGNED_INT&&(Q=n.R32UI),H===n.BYTE&&(Q=n.R8I),H===n.SHORT&&(Q=n.R16I),H===n.INT&&(Q=n.R32I)),T===n.RG&&(H===n.FLOAT&&(Q=n.RG32F),H===n.HALF_FLOAT&&(Q=n.RG16F),H===n.UNSIGNED_BYTE&&(Q=n.RG8)),T===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RG8UI),H===n.UNSIGNED_SHORT&&(Q=n.RG16UI),H===n.UNSIGNED_INT&&(Q=n.RG32UI),H===n.BYTE&&(Q=n.RG8I),H===n.SHORT&&(Q=n.RG16I),H===n.INT&&(Q=n.RG32I)),T===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),H===n.UNSIGNED_INT&&(Q=n.RGB32UI),H===n.BYTE&&(Q=n.RGB8I),H===n.SHORT&&(Q=n.RGB16I),H===n.INT&&(Q=n.RGB32I)),T===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),H===n.UNSIGNED_INT&&(Q=n.RGBA32UI),H===n.BYTE&&(Q=n.RGBA8I),H===n.SHORT&&(Q=n.RGBA16I),H===n.INT&&(Q=n.RGBA32I)),T===n.RGB&&H===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),T===n.RGBA){let Tt=tt?jc:ee.getTransfer(Z);H===n.FLOAT&&(Q=n.RGBA32F),H===n.HALF_FLOAT&&(Q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Q=Tt===ue?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function x(C,T){let H;return C?T===null||T===Gr||T===Ga?H=n.DEPTH24_STENCIL8:T===ps?H=n.DEPTH32F_STENCIL8:T===xl&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Gr||T===Ga?H=n.DEPTH_COMPONENT24:T===ps?H=n.DEPTH_COMPONENT32F:T===xl&&(H=n.DEPTH_COMPONENT16),H}function M(C,T){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Di&&C.minFilter!==Yi?Math.log2(Math.max(T.width,T.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?T.mipmaps.length:1}function w(C){let T=C.target;T.removeEventListener("dispose",w),R(T),T.isVideoTexture&&u.delete(T)}function E(C){let T=C.target;T.removeEventListener("dispose",E),S(T)}function R(C){let T=i.get(C);if(T.__webglInit===void 0)return;let H=C.source,Z=f.get(H);if(Z){let tt=Z[T.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&b(C),Object.keys(Z).length===0&&f.delete(H)}i.remove(C)}function b(C){let T=i.get(C);n.deleteTexture(T.__webglTexture);let H=C.source,Z=f.get(H);delete Z[T.__cacheKey],a.memory.textures--}function S(C){let T=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(T.__webglFramebuffer[Z]))for(let tt=0;tt<T.__webglFramebuffer[Z].length;tt++)n.deleteFramebuffer(T.__webglFramebuffer[Z][tt]);else n.deleteFramebuffer(T.__webglFramebuffer[Z]);T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer[Z])}else{if(Array.isArray(T.__webglFramebuffer))for(let Z=0;Z<T.__webglFramebuffer.length;Z++)n.deleteFramebuffer(T.__webglFramebuffer[Z]);else n.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&n.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&n.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Z=0;Z<T.__webglColorRenderbuffer.length;Z++)T.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(T.__webglColorRenderbuffer[Z]);T.__webglDepthRenderbuffer&&n.deleteRenderbuffer(T.__webglDepthRenderbuffer)}let H=C.textures;for(let Z=0,tt=H.length;Z<tt;Z++){let Q=i.get(H[Z]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),a.memory.textures--),i.remove(H[Z])}i.remove(C)}let D=0;function k(){D=0}function B(){let C=D;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function X(C){let T=[];return T.push(C.wrapS),T.push(C.wrapT),T.push(C.wrapR||0),T.push(C.magFilter),T.push(C.minFilter),T.push(C.anisotropy),T.push(C.internalFormat),T.push(C.format),T.push(C.type),T.push(C.generateMipmaps),T.push(C.premultiplyAlpha),T.push(C.flipY),T.push(C.unpackAlignment),T.push(C.colorSpace),T.join()}function V(C,T){let H=i.get(C);if(C.isVideoTexture&&at(C),C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){let Z=C.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(H,C,T);return}}e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+T)}function F(C,T){let H=i.get(C);if(C.version>0&&H.__version!==C.version){z(H,C,T);return}e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+T)}function G(C,T){let H=i.get(C);if(C.version>0&&H.__version!==C.version){z(H,C,T);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+T)}function O(C,T){let H=i.get(C);if(C.version>0&&H.__version!==C.version){J(H,C,T);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+T)}let K={[$f]:n.REPEAT,[Ir]:n.CLAMP_TO_EDGE,[td]:n.MIRRORED_REPEAT},et={[Di]:n.NEAREST,[TM]:n.NEAREST_MIPMAP_NEAREST,[Au]:n.NEAREST_MIPMAP_LINEAR,[Yi]:n.LINEAR,[Bd]:n.LINEAR_MIPMAP_NEAREST,[Vr]:n.LINEAR_MIPMAP_LINEAR},nt={[CM]:n.NEVER,[PM]:n.ALWAYS,[DM]:n.LESS,[b_]:n.LEQUAL,[UM]:n.EQUAL,[OM]:n.GEQUAL,[LM]:n.GREATER,[NM]:n.NOTEQUAL};function lt(C,T){if(T.type===ps&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Yi||T.magFilter===Bd||T.magFilter===Au||T.magFilter===Vr||T.minFilter===Yi||T.minFilter===Bd||T.minFilter===Au||T.minFilter===Vr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,K[T.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,K[T.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,K[T.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,et[T.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,et[T.minFilter]),T.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,nt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Di||T.minFilter!==Au&&T.minFilter!==Vr||T.type===ps&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||i.get(T).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),i.get(T).__currentAnisotropy=T.anisotropy}}}function Rt(C,T){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,T.addEventListener("dispose",w));let Z=T.source,tt=f.get(Z);tt===void 0&&(tt={},f.set(Z,tt));let Q=X(T);if(Q!==C.__cacheKey){tt[Q]===void 0&&(tt[Q]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),tt[Q].usedTimes++;let Tt=tt[C.__cacheKey];Tt!==void 0&&(tt[C.__cacheKey].usedTimes--,Tt.usedTimes===0&&b(T)),C.__cacheKey=Q,C.__webglTexture=tt[Q].texture}return H}function z(C,T,H){let Z=n.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Z=n.TEXTURE_3D);let tt=Rt(C,T),Q=T.source;e.bindTexture(Z,C.__webglTexture,n.TEXTURE0+H);let Tt=i.get(Q);if(Q.version!==Tt.__version||tt===!0){e.activeTexture(n.TEXTURE0+H);let gt=ee.getPrimaries(ee.workingColorSpace),xt=T.colorSpace===Js?null:ee.getPrimaries(T.colorSpace),$t=T.colorSpace===Js||gt===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let ot=_(T.image,!1,s.maxTextureSize);ot=Ut(T,ot);let St=r.convert(T.format,T.colorSpace),Nt=r.convert(T.type),Pt=y(T.internalFormat,St,Nt,T.colorSpace,T.isVideoTexture);lt(Z,T);let bt,Jt=T.mipmaps,Gt=T.isVideoTexture!==!0,ve=Tt.__version===void 0||tt===!0,L=Q.dataReady,dt=M(T,ot);if(T.isDepthTexture)Pt=x(T.format===Pa,T.type),ve&&(Gt?e.texStorage2D(n.TEXTURE_2D,1,Pt,ot.width,ot.height):e.texImage2D(n.TEXTURE_2D,0,Pt,ot.width,ot.height,0,St,Nt,null));else if(T.isDataTexture)if(Jt.length>0){Gt&&ve&&e.texStorage2D(n.TEXTURE_2D,dt,Pt,Jt[0].width,Jt[0].height);for(let Y=0,$=Jt.length;Y<$;Y++)bt=Jt[Y],Gt?L&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,bt.width,bt.height,St,Nt,bt.data):e.texImage2D(n.TEXTURE_2D,Y,Pt,bt.width,bt.height,0,St,Nt,bt.data);T.generateMipmaps=!1}else Gt?(ve&&e.texStorage2D(n.TEXTURE_2D,dt,Pt,ot.width,ot.height),L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ot.width,ot.height,St,Nt,ot.data)):e.texImage2D(n.TEXTURE_2D,0,Pt,ot.width,ot.height,0,St,Nt,ot.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){Gt&&ve&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,Pt,Jt[0].width,Jt[0].height,ot.depth);for(let Y=0,$=Jt.length;Y<$;Y++)if(bt=Jt[Y],T.format!==Ni)if(St!==null)if(Gt){if(L)if(T.layerUpdates.size>0){let vt=C_(bt.width,bt.height,T.format,T.type);for(let _t of T.layerUpdates){let Vt=bt.data.subarray(_t*vt/bt.data.BYTES_PER_ELEMENT,(_t+1)*vt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,_t,bt.width,bt.height,1,St,Vt)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,bt.width,bt.height,ot.depth,St,bt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Y,Pt,bt.width,bt.height,ot.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Y,0,0,0,bt.width,bt.height,ot.depth,St,Nt,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Y,Pt,bt.width,bt.height,ot.depth,0,St,Nt,bt.data)}else{Gt&&ve&&e.texStorage2D(n.TEXTURE_2D,dt,Pt,Jt[0].width,Jt[0].height);for(let Y=0,$=Jt.length;Y<$;Y++)bt=Jt[Y],T.format!==Ni?St!==null?Gt?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,Y,0,0,bt.width,bt.height,St,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,Y,Pt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?L&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,bt.width,bt.height,St,Nt,bt.data):e.texImage2D(n.TEXTURE_2D,Y,Pt,bt.width,bt.height,0,St,Nt,bt.data)}else if(T.isDataArrayTexture)if(Gt){if(ve&&e.texStorage3D(n.TEXTURE_2D_ARRAY,dt,Pt,ot.width,ot.height,ot.depth),L)if(T.layerUpdates.size>0){let Y=C_(ot.width,ot.height,T.format,T.type);for(let $ of T.layerUpdates){let vt=ot.data.subarray($*Y/ot.data.BYTES_PER_ELEMENT,($+1)*Y/ot.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ot.width,ot.height,1,St,Nt,vt)}T.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ot.width,ot.height,ot.depth,St,Nt,ot.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Pt,ot.width,ot.height,ot.depth,0,St,Nt,ot.data);else if(T.isData3DTexture)Gt?(ve&&e.texStorage3D(n.TEXTURE_3D,dt,Pt,ot.width,ot.height,ot.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ot.width,ot.height,ot.depth,St,Nt,ot.data)):e.texImage3D(n.TEXTURE_3D,0,Pt,ot.width,ot.height,ot.depth,0,St,Nt,ot.data);else if(T.isFramebufferTexture){if(ve)if(Gt)e.texStorage2D(n.TEXTURE_2D,dt,Pt,ot.width,ot.height);else{let Y=ot.width,$=ot.height;for(let vt=0;vt<dt;vt++)e.texImage2D(n.TEXTURE_2D,vt,Pt,Y,$,0,St,Nt,null),Y>>=1,$>>=1}}else if(Jt.length>0){if(Gt&&ve){let Y=ut(Jt[0]);e.texStorage2D(n.TEXTURE_2D,dt,Pt,Y.width,Y.height)}for(let Y=0,$=Jt.length;Y<$;Y++)bt=Jt[Y],Gt?L&&e.texSubImage2D(n.TEXTURE_2D,Y,0,0,St,Nt,bt):e.texImage2D(n.TEXTURE_2D,Y,Pt,St,Nt,bt);T.generateMipmaps=!1}else if(Gt){if(ve){let Y=ut(ot);e.texStorage2D(n.TEXTURE_2D,dt,Pt,Y.width,Y.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,St,Nt,ot)}else e.texImage2D(n.TEXTURE_2D,0,Pt,St,Nt,ot);g(T)&&p(Z),Tt.__version=Q.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function J(C,T,H){if(T.image.length!==6)return;let Z=Rt(C,T),tt=T.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+H);let Q=i.get(tt);if(tt.version!==Q.__version||Z===!0){e.activeTexture(n.TEXTURE0+H);let Tt=ee.getPrimaries(ee.workingColorSpace),gt=T.colorSpace===Js?null:ee.getPrimaries(T.colorSpace),xt=T.colorSpace===Js||Tt===gt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,T.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,T.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let $t=T.isCompressedTexture||T.image[0].isCompressedTexture,ot=T.image[0]&&T.image[0].isDataTexture,St=[];for(let $=0;$<6;$++)!$t&&!ot?St[$]=_(T.image[$],!0,s.maxCubemapSize):St[$]=ot?T.image[$].image:T.image[$],St[$]=Ut(T,St[$]);let Nt=St[0],Pt=r.convert(T.format,T.colorSpace),bt=r.convert(T.type),Jt=y(T.internalFormat,Pt,bt,T.colorSpace),Gt=T.isVideoTexture!==!0,ve=Q.__version===void 0||Z===!0,L=tt.dataReady,dt=M(T,Nt);lt(n.TEXTURE_CUBE_MAP,T);let Y;if($t){Gt&&ve&&e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Jt,Nt.width,Nt.height);for(let $=0;$<6;$++){Y=St[$].mipmaps;for(let vt=0;vt<Y.length;vt++){let _t=Y[vt];T.format!==Ni?Pt!==null?Gt?L&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,_t.width,_t.height,Pt,_t.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,Jt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,_t.width,_t.height,Pt,bt,_t.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,Jt,_t.width,_t.height,0,Pt,bt,_t.data)}}}else{if(Y=T.mipmaps,Gt&&ve){Y.length>0&&dt++;let $=ut(St[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,dt,Jt,$.width,$.height)}for(let $=0;$<6;$++)if(ot){Gt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,St[$].width,St[$].height,Pt,bt,St[$].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Jt,St[$].width,St[$].height,0,Pt,bt,St[$].data);for(let vt=0;vt<Y.length;vt++){let Vt=Y[vt].image[$].image;Gt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,Vt.width,Vt.height,Pt,bt,Vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,Jt,Vt.width,Vt.height,0,Pt,bt,Vt.data)}}else{Gt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Pt,bt,St[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Jt,Pt,bt,St[$]);for(let vt=0;vt<Y.length;vt++){let _t=Y[vt];Gt?L&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,Pt,bt,_t.image[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,Jt,Pt,bt,_t.image[$])}}}g(T)&&p(n.TEXTURE_CUBE_MAP),Q.__version=tt.version,T.onUpdate&&T.onUpdate(T)}C.__version=T.version}function ct(C,T,H,Z,tt,Q){let Tt=r.convert(H.format,H.colorSpace),gt=r.convert(H.type),xt=y(H.internalFormat,Tt,gt,H.colorSpace),$t=i.get(T),ot=i.get(H);if(ot.__renderTarget=T,!$t.__hasExternalTextures){let St=Math.max(1,T.width>>Q),Nt=Math.max(1,T.height>>Q);tt===n.TEXTURE_3D||tt===n.TEXTURE_2D_ARRAY?e.texImage3D(tt,Q,xt,St,Nt,T.depth,0,Tt,gt,null):e.texImage2D(tt,Q,xt,St,Nt,0,Tt,gt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),it(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,tt,ot.__webglTexture,0,kt(T)):(tt===n.TEXTURE_2D||tt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,tt,ot.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(C,T,H){if(n.bindRenderbuffer(n.RENDERBUFFER,C),T.depthBuffer){let Z=T.depthTexture,tt=Z&&Z.isDepthTexture?Z.type:null,Q=x(T.stencilBuffer,tt),Tt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=kt(T);it(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,Q,T.width,T.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,Q,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,Q,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Tt,n.RENDERBUFFER,C)}else{let Z=T.textures;for(let tt=0;tt<Z.length;tt++){let Q=Z[tt],Tt=r.convert(Q.format,Q.colorSpace),gt=r.convert(Q.type),xt=y(Q.internalFormat,Tt,gt,Q.colorSpace),$t=kt(T);H&&it(T)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,$t,xt,T.width,T.height):it(T)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,$t,xt,T.width,T.height):n.renderbufferStorage(n.RENDERBUFFER,xt,T.width,T.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ht(C,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Z=i.get(T.depthTexture);Z.__renderTarget=T,(!Z.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),V(T.depthTexture,0);let tt=Z.__webglTexture,Q=kt(T);if(T.depthTexture.format===La)it(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,tt,0);else if(T.depthTexture.format===Pa)it(T)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ot(C){let T=i.get(C),H=C.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==C.depthTexture){let Z=C.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),Z){let tt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,Z.removeEventListener("dispose",tt)};Z.addEventListener("dispose",tt),T.__depthDisposeCallback=tt}T.__boundDepthTexture=Z}if(C.depthTexture&&!T.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");ht(T.__webglFramebuffer,C)}else if(H){T.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer[Z]),T.__webglDepthbuffer[Z]===void 0)T.__webglDepthbuffer[Z]=n.createRenderbuffer(),rt(T.__webglDepthbuffer[Z],C,!1);else{let tt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=T.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=n.createRenderbuffer(),rt(T.__webglDepthbuffer,C,!1);else{let Z=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=T.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,tt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function At(C,T,H){let Z=i.get(C);T!==void 0&&ct(Z.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ot(C)}function ne(C){let T=C.texture,H=i.get(C),Z=i.get(T);C.addEventListener("dispose",E);let tt=C.textures,Q=C.isWebGLCubeRenderTarget===!0,Tt=tt.length>1;if(Tt||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=T.version,a.memory.textures++),Q){H.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer[gt]=[];for(let xt=0;xt<T.mipmaps.length;xt++)H.__webglFramebuffer[gt][xt]=n.createFramebuffer()}else H.__webglFramebuffer[gt]=n.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){H.__webglFramebuffer=[];for(let gt=0;gt<T.mipmaps.length;gt++)H.__webglFramebuffer[gt]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Tt)for(let gt=0,xt=tt.length;gt<xt;gt++){let $t=i.get(tt[gt]);$t.__webglTexture===void 0&&($t.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&it(C)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let gt=0;gt<tt.length;gt++){let xt=tt[gt];H.__webglColorRenderbuffer[gt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[gt]);let $t=r.convert(xt.format,xt.colorSpace),ot=r.convert(xt.type),St=y(xt.internalFormat,$t,ot,xt.colorSpace,C.isXRRenderTarget===!0),Nt=kt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Nt,St,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,H.__webglColorRenderbuffer[gt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),rt(H.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),lt(n.TEXTURE_CUBE_MAP,T);for(let gt=0;gt<6;gt++)if(T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)ct(H.__webglFramebuffer[gt][xt],C,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,xt);else ct(H.__webglFramebuffer[gt],C,T,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);g(T)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let gt=0,xt=tt.length;gt<xt;gt++){let $t=tt[gt],ot=i.get($t);e.bindTexture(n.TEXTURE_2D,ot.__webglTexture),lt(n.TEXTURE_2D,$t),ct(H.__webglFramebuffer,C,$t,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,0),g($t)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let gt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(gt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(gt,Z.__webglTexture),lt(gt,T),T.mipmaps&&T.mipmaps.length>0)for(let xt=0;xt<T.mipmaps.length;xt++)ct(H.__webglFramebuffer[xt],C,T,n.COLOR_ATTACHMENT0,gt,xt);else ct(H.__webglFramebuffer,C,T,n.COLOR_ATTACHMENT0,gt,0);g(T)&&p(gt),e.unbindTexture()}C.depthBuffer&&Ot(C)}function ae(C){let T=C.textures;for(let H=0,Z=T.length;H<Z;H++){let tt=T[H];if(g(tt)){let Q=v(C),Tt=i.get(tt).__webglTexture;e.bindTexture(Q,Tt),p(Q),e.unbindTexture()}}}let Ct=[],U=[];function Ge(C){if(C.samples>0){if(it(C)===!1){let T=C.textures,H=C.width,Z=C.height,tt=n.COLOR_BUFFER_BIT,Q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=i.get(C),gt=T.length>1;if(gt)for(let xt=0;xt<T.length;xt++)e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let xt=0;xt<T.length;xt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(tt|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(tt|=n.STENCIL_BUFFER_BIT)),gt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);let $t=i.get(T[xt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$t,0)}n.blitFramebuffer(0,0,H,Z,0,0,H,Z,tt,n.NEAREST),l===!0&&(Ct.length=0,U.length=0,Ct.push(n.COLOR_ATTACHMENT0+xt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ct.push(Q),U.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),gt)for(let xt=0;xt<T.length;xt++){e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);let $t=i.get(T[xt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xt,n.TEXTURE_2D,$t,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let T=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[T])}}}function kt(C){return Math.min(s.maxSamples,C.samples)}function it(C){let T=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function at(C){let T=a.render.frame;u.get(C)!==T&&(u.set(C,T),C.update())}function Ut(C,T){let H=C.colorSpace,Z=C.format,tt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Ia&&H!==Js&&(ee.getTransfer(H)===ue?(Z!==Ni||tt!==ds)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),T}function ut(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=V,this.setTexture2DArray=F,this.setTexture3D=G,this.setTextureCube=O,this.rebindTextures=At,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=ae,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=it}function hL(n,t){function e(i,s=Js){let r,a=ee.getTransfer(s);if(i===ds)return n.UNSIGNED_BYTE;if(i===Fd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Hd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===p_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===f_)return n.BYTE;if(i===d_)return n.SHORT;if(i===xl)return n.UNSIGNED_SHORT;if(i===zd)return n.INT;if(i===Gr)return n.UNSIGNED_INT;if(i===ps)return n.FLOAT;if(i===Li)return n.HALF_FLOAT;if(i===m_)return n.ALPHA;if(i===g_)return n.RGB;if(i===Ni)return n.RGBA;if(i===__)return n.LUMINANCE;if(i===v_)return n.LUMINANCE_ALPHA;if(i===La)return n.DEPTH_COMPONENT;if(i===Pa)return n.DEPTH_STENCIL;if(i===y_)return n.RED;if(i===kd)return n.RED_INTEGER;if(i===x_)return n.RG;if(i===Vd)return n.RG_INTEGER;if(i===Gd)return n.RGBA_INTEGER;if(i===wu||i===Ru||i===Cu||i===Du)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===wu)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ru)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cu)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Du)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===wu)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ru)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cu)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Du)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Wd||i===Xd||i===qd||i===Yd)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Wd)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xd)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qd)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yd)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zd||i===Qd||i===Kd)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Zd||i===Qd)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Kd)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Jd||i===jd||i===$d||i===tp||i===ep||i===np||i===ip||i===sp||i===rp||i===ap||i===op||i===lp||i===cp||i===up)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Jd)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jd)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$d)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===tp)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ep)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===np)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ip)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sp)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rp)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ap)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===op)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lp)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cp)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===up)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Uu||i===hp||i===fp)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Uu)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===hp)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fp)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===S_||i===dp||i===pp||i===mp)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Uu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===dp)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pp)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mp)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ga?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var fL=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dL=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,V_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new ai,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Ue({vertexShader:fL,fragmentShader:dL,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new un(new Fa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},G_=class extends qs{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,m=null,_=new V_,g=e.getContextAttributes(),p=null,v=null,y=[],x=[],M=new mt,w=null,E=new En;E.viewport=new He;let R=new En;R.viewport=new He;let b=[E,R],S=new Ad,D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let J=y[z];return J===void 0&&(J=new gl,y[z]=J),J.getTargetRaySpace()},this.getControllerGrip=function(z){let J=y[z];return J===void 0&&(J=new gl,y[z]=J),J.getGripSpace()},this.getHand=function(z){let J=y[z];return J===void 0&&(J=new gl,y[z]=J),J.getHandSpace()};function B(z){let J=x.indexOf(z.inputSource);if(J===-1)return;let ct=y[J];ct!==void 0&&(ct.update(z.inputSource,z.frame,c||a),ct.dispatchEvent({type:z.type,data:z.inputSource}))}function X(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",V);for(let z=0;z<y.length;z++){let J=x[z];J!==null&&(x[z]=null,y[z].disconnect(J))}D=null,k=null,_.reset(),t.setRenderTarget(p),h=null,f=null,d=null,s=null,v=null,Rt.stop(),i.isPresenting=!1,t.setPixelRatio(w),t.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){o=z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",X),s.addEventListener("inputsourceschange",V),g.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(M),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,rt=null,ht=null;g.depth&&(ht=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=g.stencil?Pa:La,rt=g.stencil?Ga:Gr);let Ot={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Ot),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new An(f.textureWidth,f.textureHeight,{format:Ni,type:ds,depthTexture:new fu(f.textureWidth,f.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let ct={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new An(h.framebufferWidth,h.framebufferHeight,{format:Ni,type:ds,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Rt.setContext(s),Rt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function V(z){for(let J=0;J<z.removed.length;J++){let ct=z.removed[J],rt=x.indexOf(ct);rt>=0&&(x[rt]=null,y[rt].disconnect(ct))}for(let J=0;J<z.added.length;J++){let ct=z.added[J],rt=x.indexOf(ct);if(rt===-1){for(let Ot=0;Ot<y.length;Ot++)if(Ot>=x.length){x.push(ct),rt=Ot;break}else if(x[Ot]===null){x[Ot]=ct,rt=Ot;break}if(rt===-1)break}let ht=y[rt];ht&&ht.connect(ct)}}let F=new I,G=new I;function O(z,J,ct){F.setFromMatrixPosition(J.matrixWorld),G.setFromMatrixPosition(ct.matrixWorld);let rt=F.distanceTo(G),ht=J.projectionMatrix.elements,Ot=ct.projectionMatrix.elements,At=ht[14]/(ht[10]-1),ne=ht[14]/(ht[10]+1),ae=(ht[9]+1)/ht[5],Ct=(ht[9]-1)/ht[5],U=(ht[8]-1)/ht[0],Ge=(Ot[8]+1)/Ot[0],kt=At*U,it=At*Ge,at=rt/(-U+Ge),Ut=at*-U;if(J.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Ut),z.translateZ(at),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ht[10]===-1)z.projectionMatrix.copy(J.projectionMatrix),z.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{let ut=At+at,C=ne+at,T=kt-Ut,H=it+(rt-Ut),Z=ae*ne/C*ut,tt=Ct*ne/C*ut;z.projectionMatrix.makePerspective(T,H,Z,tt,ut,C),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function K(z,J){J===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(J.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let J=z.near,ct=z.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(ct=_.depthFar)),S.near=R.near=E.near=J,S.far=R.far=E.far=ct,(D!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,k=S.far),E.layers.mask=z.layers.mask|2,R.layers.mask=z.layers.mask|4,S.layers.mask=E.layers.mask|R.layers.mask;let rt=z.parent,ht=S.cameras;K(S,rt);for(let Ot=0;Ot<ht.length;Ot++)K(ht[Ot],rt);ht.length===2?O(S,E,R):S.projectionMatrix.copy(E.projectionMatrix),et(z,S,rt)};function et(z,J,ct){ct===null?z.matrix.copy(J.matrixWorld):(z.matrix.copy(ct.matrixWorld),z.matrix.invert(),z.matrix.multiply(J.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(J.projectionMatrix),z.projectionMatrixInverse.copy(J.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=nd*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let nt=null;function lt(z,J){if(u=J.getViewerPose(c||a),m=J,u!==null){let ct=u.views;h!==null&&(t.setRenderTargetFramebuffer(v,h.framebuffer),t.setRenderTarget(v));let rt=!1;ct.length!==S.cameras.length&&(S.cameras.length=0,rt=!0);for(let At=0;At<ct.length;At++){let ne=ct[At],ae=null;if(h!==null)ae=h.getViewport(ne);else{let U=d.getViewSubImage(f,ne);ae=U.viewport,At===0&&(t.setRenderTargetTextures(v,U.colorTexture,f.ignoreDepthValues?void 0:U.depthStencilTexture),t.setRenderTarget(v))}let Ct=b[At];Ct===void 0&&(Ct=new En,Ct.layers.enable(At),Ct.viewport=new He,b[At]=Ct),Ct.matrix.fromArray(ne.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(ne.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(ae.x,ae.y,ae.width,ae.height),At===0&&(S.matrix.copy(Ct.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),rt===!0&&S.cameras.push(Ct)}let ht=s.enabledFeatures;if(ht&&ht.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&d){let At=d.getDepthInformation(ct[0]);At&&At.isValid&&At.texture&&_.init(t,At,s.renderState)}}for(let ct=0;ct<y.length;ct++){let rt=x[ct],ht=y[ct];rt!==null&&ht!==void 0&&ht.update(rt,J,c||a)}nt&&nt(z,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),m=null}let Rt=new pT;Rt.setAnimationLoop(lt),this.setAnimationLoop=function(z){nt=z},this.dispose=function(){}}},Ya=new hs,pL=new Fe;function mL(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,E_(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,v,y,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&h(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,v,y):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===gn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===gn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let v=t.get(p),y=v.envMap,x=v.envMapRotation;y&&(g.envMap.value=y,Ya.copy(x),Ya.x*=-1,Ya.y*=-1,Ya.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ya.y*=-1,Ya.z*=-1),g.envMapRotation.value.setFromMatrix4(pL.makeRotationFromEuler(Ya)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,v,y){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*v,g.scale.value=y*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,v){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let v=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function gL(n,t,e,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){let x=y.program;i.uniformBlockBinding(v,x)}function c(v,y){let x=s[v.id];x===void 0&&(m(v),x=u(v),s[v.id]=x,v.addEventListener("dispose",g));let M=y.program;i.updateUBOMapping(v,M);let w=t.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function u(v){let y=d();v.__bindingPointIndex=y;let x=n.createBuffer(),M=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,M,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){let y=s[v.id],x=v.uniforms,M=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let w=0,E=x.length;w<E;w++){let R=Array.isArray(x[w])?x[w]:[x[w]];for(let b=0,S=R.length;b<S;b++){let D=R[b];if(h(D,w,b,M)===!0){let k=D.__offset,B=Array.isArray(D.value)?D.value:[D.value],X=0;for(let V=0;V<B.length;V++){let F=B[V],G=_(F);typeof F=="number"||typeof F=="boolean"?(D.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,k+X,D.__data)):F.isMatrix3?(D.__data[0]=F.elements[0],D.__data[1]=F.elements[1],D.__data[2]=F.elements[2],D.__data[3]=0,D.__data[4]=F.elements[3],D.__data[5]=F.elements[4],D.__data[6]=F.elements[5],D.__data[7]=0,D.__data[8]=F.elements[6],D.__data[9]=F.elements[7],D.__data[10]=F.elements[8],D.__data[11]=0):(F.toArray(D.__data,X),X+=G.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,y,x,M){let w=v.value,E=y+"_"+x;if(M[E]===void 0)return typeof w=="number"||typeof w=="boolean"?M[E]=w:M[E]=w.clone(),!0;{let R=M[E];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return M[E]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function m(v){let y=v.uniforms,x=0,M=16;for(let E=0,R=y.length;E<R;E++){let b=Array.isArray(y[E])?y[E]:[y[E]];for(let S=0,D=b.length;S<D;S++){let k=b[S],B=Array.isArray(k.value)?k.value:[k.value];for(let X=0,V=B.length;X<V;X++){let F=B[X],G=_(F),O=x%M,K=O%G.boundary,et=O+K;x+=K,et!==0&&M-et<G.storage&&(x+=M-et),k.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=G.storage}}}let w=x%M;return w>0&&(x+=M-w),v.__size=x,v.__cache={},this}function _(v){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function g(v){let y=v.target;y.removeEventListener("dispose",g);let x=a.indexOf(y.__bindingPointIndex);a.splice(x,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}var Sp=class{constructor(t={}){let{canvas:e=IM(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=a;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this.toneMapping=Ks,this.toneMappingExposure=1;let x=this,M=!1,w=0,E=0,R=null,b=-1,S=null,D=new He,k=new He,B=null,X=new zt(0),V=0,F=e.width,G=e.height,O=1,K=null,et=null,nt=new He(0,0,F,G),lt=new He(0,0,F,G),Rt=!1,z=new uu,J=!1,ct=!1;this.transmissionResolutionScale=1;let rt=new Fe,ht=new Fe,Ot=new I,At=new He,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ae=!1;function Ct(){return R===null?O:1}let U=i;function Ge(A,N){return e.getContext(A,N)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"174"}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",_t,!1),U===null){let N="webgl2";if(U=Ge(N,A),U===null)throw Ge(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let kt,it,at,Ut,ut,C,T,H,Z,tt,Q,Tt,gt,xt,$t,ot,St,Nt,Pt,bt,Jt,Gt,ve,L;function dt(){kt=new OD(U),kt.init(),Gt=new hL(U,kt),it=new wD(U,kt,t,Gt),at=new cL(U,kt),it.reverseDepthBuffer&&f&&at.buffers.depth.setReversed(!0),Ut=new BD(U),ut=new KU,C=new uL(U,kt,at,ut,it,Gt,Ut),T=new CD(x),H=new ND(x),Z=new GR(U),ve=new ED(U,Z),tt=new PD(U,Z,Ut,ve),Q=new FD(U,tt,Z,Ut),Pt=new zD(U,it,C),ot=new RD(ut),Tt=new QU(x,T,H,kt,it,ve,ot),gt=new mL(x,ut),xt=new jU,$t=new sL(kt),Nt=new TD(x,T,H,at,Q,h,l),St=new oL(x,Q,it),L=new gL(U,Ut,it,at),bt=new AD(U,kt,Ut),Jt=new ID(U,kt,Ut),Ut.programs=Tt.programs,x.capabilities=it,x.extensions=kt,x.properties=ut,x.renderLists=xt,x.shadowMap=St,x.state=at,x.info=Ut}dt();let Y=new G_(x,U);this.xr=Y,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=kt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=kt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(F,G,!1))},this.getSize=function(A){return A.set(F,G)},this.setSize=function(A,N,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=A,G=N,e.width=Math.floor(A*O),e.height=Math.floor(N*O),W===!0&&(e.style.width=A+"px",e.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(F*O,G*O).floor()},this.setDrawingBufferSize=function(A,N,W){F=A,G=N,O=W,e.width=Math.floor(A*W),e.height=Math.floor(N*W),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(D)},this.getViewport=function(A){return A.copy(nt)},this.setViewport=function(A,N,W,q){A.isVector4?nt.set(A.x,A.y,A.z,A.w):nt.set(A,N,W,q),at.viewport(D.copy(nt).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(lt)},this.setScissor=function(A,N,W,q){A.isVector4?lt.set(A.x,A.y,A.z,A.w):lt.set(A,N,W,q),at.scissor(k.copy(lt).multiplyScalar(O).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(A){at.setScissorTest(Rt=A)},this.setOpaqueSort=function(A){K=A},this.setTransparentSort=function(A){et=A},this.getClearColor=function(A){return A.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor(...arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha(...arguments)},this.clear=function(A=!0,N=!0,W=!0){let q=0;if(A){let P=!1;if(R!==null){let st=R.texture.format;P=st===Gd||st===Vd||st===kd}if(P){let st=R.texture.type,pt=st===ds||st===Gr||st===xl||st===Ga||st===Fd||st===Hd,yt=Nt.getClearColor(),Mt=Nt.getClearAlpha(),It=yt.r,Bt=yt.g,wt=yt.b;pt?(m[0]=It,m[1]=Bt,m[2]=wt,m[3]=Mt,U.clearBufferuiv(U.COLOR,0,m)):(_[0]=It,_[1]=Bt,_[2]=wt,_[3]=Mt,U.clearBufferiv(U.COLOR,0,_))}else q|=U.COLOR_BUFFER_BIT}N&&(q|=U.DEPTH_BUFFER_BIT),W&&(q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),Nt.dispose(),xt.dispose(),$t.dispose(),ut.dispose(),T.dispose(),H.dispose(),Q.dispose(),ve.dispose(),L.dispose(),Tt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Vv),Y.removeEventListener("sessionend",Gv),ta.stop()};function $(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let A=Ut.autoReset,N=St.enabled,W=St.autoUpdate,q=St.needsUpdate,P=St.type;dt(),Ut.autoReset=A,St.enabled=N,St.autoUpdate=W,St.needsUpdate=q,St.type=P}function _t(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Vt(A){let N=A.target;N.removeEventListener("dispose",Vt),Pe(N)}function Pe(A){yn(A),ut.remove(A)}function yn(A){let N=ut.get(A).programs;N!==void 0&&(N.forEach(function(W){Tt.releaseProgram(W)}),A.isShaderMaterial&&Tt.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,W,q,P,st){N===null&&(N=ne);let pt=P.isMesh&&P.matrixWorld.determinant()<0,yt=zE(A,N,W,q,P);at.setMaterial(q,pt);let Mt=W.index,It=1;if(q.wireframe===!0){if(Mt=tt.getWireframeAttribute(W),Mt===void 0)return;It=2}let Bt=W.drawRange,wt=W.attributes.position,te=Bt.start*It,oe=(Bt.start+Bt.count)*It;st!==null&&(te=Math.max(te,st.start*It),oe=Math.min(oe,(st.start+st.count)*It)),Mt!==null?(te=Math.max(te,0),oe=Math.min(oe,Mt.count)):wt!=null&&(te=Math.max(te,0),oe=Math.min(oe,wt.count));let qe=oe-te;if(qe<0||qe===1/0)return;ve.setup(P,q,yt,W,Mt);let Ie,ie=bt;if(Mt!==null&&(Ie=Z.get(Mt),ie=Jt,ie.setIndex(Ie)),P.isMesh)q.wireframe===!0?(at.setLineWidth(q.wireframeLinewidth*Ct()),ie.setMode(U.LINES)):ie.setMode(U.TRIANGLES);else if(P.isLine){let Dt=q.linewidth;Dt===void 0&&(Dt=1),at.setLineWidth(Dt*Ct()),P.isLineSegments?ie.setMode(U.LINES):P.isLineLoop?ie.setMode(U.LINE_LOOP):ie.setMode(U.LINE_STRIP)}else P.isPoints?ie.setMode(U.POINTS):P.isSprite&&ie.setMode(U.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)Wr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ie.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))ie.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{let Dt=P._multiDrawStarts,hn=P._multiDrawCounts,le=P._multiDrawCount,zi=Mt?Z.get(Mt).bytesPerElement:1,lo=ut.get(q).currentProgram.getUniforms();for(let Qn=0;Qn<le;Qn++)lo.setValue(U,"_gl_DrawID",Qn),ie.render(Dt[Qn]/zi,hn[Qn])}else if(P.isInstancedMesh)ie.renderInstances(te,qe,P.count);else if(W.isInstancedBufferGeometry){let Dt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,hn=Math.min(W.instanceCount,Dt);ie.renderInstances(te,qe,hn)}else ie.render(te,qe)};function ce(A,N,W){A.transparent===!0&&A.side===ci&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,$u(A,N,W),A.side=Xs,A.needsUpdate=!0,$u(A,N,W),A.side=ci):$u(A,N,W)}this.compile=function(A,N,W=null){W===null&&(W=A),p=$t.get(W),p.init(N),y.push(p),W.traverseVisible(function(P){P.isLight&&P.layers.test(N.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),A!==W&&A.traverseVisible(function(P){P.isLight&&P.layers.test(N.layers)&&(p.pushLight(P),P.castShadow&&p.pushShadow(P))}),p.setupLights();let q=new Set;return A.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;let st=P.material;if(st)if(Array.isArray(st))for(let pt=0;pt<st.length;pt++){let yt=st[pt];ce(yt,W,P),q.add(yt)}else ce(st,W,P),q.add(st)}),p=y.pop(),q},this.compileAsync=function(A,N,W=null){let q=this.compile(A,N,W);return new Promise(P=>{function st(){if(q.forEach(function(pt){ut.get(pt).currentProgram.isReady()&&q.delete(pt)}),q.size===0){P(A);return}setTimeout(st,10)}kt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let Bi=null;function xs(A){Bi&&Bi(A)}function Vv(){ta.stop()}function Gv(){ta.start()}let ta=new pT;ta.setAnimationLoop(xs),typeof self<"u"&&ta.setContext(self),this.setAnimationLoop=function(A){Bi=A,Y.setAnimationLoop(A),A===null?ta.stop():ta.start()},Y.addEventListener("sessionstart",Vv),Y.addEventListener("sessionend",Gv),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(N),N=Y.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,N,R),p=$t.get(A,y.length),p.init(N),y.push(p),ht.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),z.setFromProjectionMatrix(ht),ct=this.localClippingEnabled,J=ot.init(this.clippingPlanes,ct),g=xt.get(A,v.length),g.init(),v.push(g),Y.enabled===!0&&Y.isPresenting===!0){let st=x.xr.getDepthSensingMesh();st!==null&&Zp(st,N,-1/0,x.sortObjects)}Zp(A,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(K,et),ae=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,ae&&Nt.addToRenderList(g,A),this.info.render.frame++,J===!0&&ot.beginShadows();let W=p.state.shadowsArray;St.render(W,A,N),J===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=g.opaque,P=g.transmissive;if(p.setupLights(),N.isArrayCamera){let st=N.cameras;if(P.length>0)for(let pt=0,yt=st.length;pt<yt;pt++){let Mt=st[pt];Xv(q,P,A,Mt)}ae&&Nt.render(A);for(let pt=0,yt=st.length;pt<yt;pt++){let Mt=st[pt];Wv(g,A,Mt,Mt.viewport)}}else P.length>0&&Xv(q,P,A,N),ae&&Nt.render(A),Wv(g,A,N);R!==null&&E===0&&(C.updateMultisampleRenderTarget(R),C.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(x,A,N),ve.resetDefaultState(),b=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],J===!0&&ot.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?g=v[v.length-1]:g=null};function Zp(A,N,W,q){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)W=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||z.intersectsSprite(A)){q&&At.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ht);let pt=Q.update(A),yt=A.material;yt.visible&&g.push(A,pt,yt,W,At.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||z.intersectsObject(A))){let pt=Q.update(A),yt=A.material;if(q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),At.copy(A.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),At.copy(pt.boundingSphere.center)),At.applyMatrix4(A.matrixWorld).applyMatrix4(ht)),Array.isArray(yt)){let Mt=pt.groups;for(let It=0,Bt=Mt.length;It<Bt;It++){let wt=Mt[It],te=yt[wt.materialIndex];te&&te.visible&&g.push(A,pt,te,W,At.z,wt)}}else yt.visible&&g.push(A,pt,yt,W,At.z,null)}}let st=A.children;for(let pt=0,yt=st.length;pt<yt;pt++)Zp(st[pt],N,W,q)}function Wv(A,N,W,q){let P=A.opaque,st=A.transmissive,pt=A.transparent;p.setupLightsView(W),J===!0&&ot.setGlobalState(x.clippingPlanes,W),q&&at.viewport(D.copy(q)),P.length>0&&ju(P,N,W),st.length>0&&ju(st,N,W),pt.length>0&&ju(pt,N,W),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Xv(A,N,W,q){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[q.id]===void 0&&(p.state.transmissionRenderTarget[q.id]=new An(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Li:ds,minFilter:Vr,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));let st=p.state.transmissionRenderTarget[q.id],pt=q.viewport||D;st.setSize(pt.z*x.transmissionResolutionScale,pt.w*x.transmissionResolutionScale);let yt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(X),V=x.getClearAlpha(),V<1&&x.setClearColor(16777215,.5),x.clear(),ae&&Nt.render(W);let Mt=x.toneMapping;x.toneMapping=Ks;let It=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),p.setupLightsView(q),J===!0&&ot.setGlobalState(x.clippingPlanes,q),ju(A,W,q),C.updateMultisampleRenderTarget(st),C.updateRenderTargetMipmap(st),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let wt=0,te=N.length;wt<te;wt++){let oe=N[wt],qe=oe.object,Ie=oe.geometry,ie=oe.material,Dt=oe.group;if(ie.side===ci&&qe.layers.test(q.layers)){let hn=ie.side;ie.side=gn,ie.needsUpdate=!0,qv(qe,W,q,Ie,ie,Dt),ie.side=hn,ie.needsUpdate=!0,Bt=!0}}Bt===!0&&(C.updateMultisampleRenderTarget(st),C.updateRenderTargetMipmap(st))}x.setRenderTarget(yt),x.setClearColor(X,V),It!==void 0&&(q.viewport=It),x.toneMapping=Mt}function ju(A,N,W){let q=N.isScene===!0?N.overrideMaterial:null;for(let P=0,st=A.length;P<st;P++){let pt=A[P],yt=pt.object,Mt=pt.geometry,It=q===null?pt.material:q,Bt=pt.group;yt.layers.test(W.layers)&&qv(yt,N,W,Mt,It,Bt)}}function qv(A,N,W,q,P,st){A.onBeforeRender(x,N,W,q,P,st),A.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),P.onBeforeRender(x,N,W,q,A,st),P.transparent===!0&&P.side===ci&&P.forceSinglePass===!1?(P.side=gn,P.needsUpdate=!0,x.renderBufferDirect(W,N,q,P,A,st),P.side=Xs,P.needsUpdate=!0,x.renderBufferDirect(W,N,q,P,A,st),P.side=ci):x.renderBufferDirect(W,N,q,P,A,st),A.onAfterRender(x,N,W,q,P,st)}function $u(A,N,W){N.isScene!==!0&&(N=ne);let q=ut.get(A),P=p.state.lights,st=p.state.shadowsArray,pt=P.state.version,yt=Tt.getParameters(A,P.state,st,N,W),Mt=Tt.getProgramCacheKey(yt),It=q.programs;q.environment=A.isMeshStandardMaterial?N.environment:null,q.fog=N.fog,q.envMap=(A.isMeshStandardMaterial?H:T).get(A.envMap||q.environment),q.envMapRotation=q.environment!==null&&A.envMap===null?N.environmentRotation:A.envMapRotation,It===void 0&&(A.addEventListener("dispose",Vt),It=new Map,q.programs=It);let Bt=It.get(Mt);if(Bt!==void 0){if(q.currentProgram===Bt&&q.lightsStateVersion===pt)return Zv(A,yt),Bt}else yt.uniforms=Tt.getUniforms(A),A.onBeforeCompile(yt,x),Bt=Tt.acquireProgram(yt,Mt),It.set(Mt,Bt),q.uniforms=yt.uniforms;let wt=q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(wt.clippingPlanes=ot.uniform),Zv(A,yt),q.needsLights=HE(A),q.lightsStateVersion=pt,q.needsLights&&(wt.ambientLightColor.value=P.state.ambient,wt.lightProbe.value=P.state.probe,wt.directionalLights.value=P.state.directional,wt.directionalLightShadows.value=P.state.directionalShadow,wt.spotLights.value=P.state.spot,wt.spotLightShadows.value=P.state.spotShadow,wt.rectAreaLights.value=P.state.rectArea,wt.ltc_1.value=P.state.rectAreaLTC1,wt.ltc_2.value=P.state.rectAreaLTC2,wt.pointLights.value=P.state.point,wt.pointLightShadows.value=P.state.pointShadow,wt.hemisphereLights.value=P.state.hemi,wt.directionalShadowMap.value=P.state.directionalShadowMap,wt.directionalShadowMatrix.value=P.state.directionalShadowMatrix,wt.spotShadowMap.value=P.state.spotShadowMap,wt.spotLightMatrix.value=P.state.spotLightMatrix,wt.spotLightMap.value=P.state.spotLightMap,wt.pointShadowMap.value=P.state.pointShadowMap,wt.pointShadowMatrix.value=P.state.pointShadowMatrix),q.currentProgram=Bt,q.uniformsList=null,Bt}function Yv(A){if(A.uniformsList===null){let N=A.currentProgram.getUniforms();A.uniformsList=Tl.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function Zv(A,N){let W=ut.get(A);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function zE(A,N,W,q,P){N.isScene!==!0&&(N=ne),C.resetTextureUnits();let st=N.fog,pt=q.isMeshStandardMaterial?N.environment:null,yt=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ia,Mt=(q.isMeshStandardMaterial?H:T).get(q.envMap||pt),It=q.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Bt=!!W.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),wt=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,oe=!!W.morphAttributes.color,qe=Ks;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(qe=x.toneMapping);let Ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ie=Ie!==void 0?Ie.length:0,Dt=ut.get(q),hn=p.state.lights;if(J===!0&&(ct===!0||A!==S)){let Un=A===S&&q.id===b;ot.setState(q,A,Un)}let le=!1;q.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==hn.state.version||Dt.outputColorSpace!==yt||P.isBatchedMesh&&Dt.batching===!1||!P.isBatchedMesh&&Dt.batching===!0||P.isBatchedMesh&&Dt.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&Dt.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&Dt.instancing===!1||!P.isInstancedMesh&&Dt.instancing===!0||P.isSkinnedMesh&&Dt.skinning===!1||!P.isSkinnedMesh&&Dt.skinning===!0||P.isInstancedMesh&&Dt.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Dt.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&Dt.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&Dt.instancingMorph===!1&&P.morphTexture!==null||Dt.envMap!==Mt||q.fog===!0&&Dt.fog!==st||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==ot.numPlanes||Dt.numIntersection!==ot.numIntersection)||Dt.vertexAlphas!==It||Dt.vertexTangents!==Bt||Dt.morphTargets!==wt||Dt.morphNormals!==te||Dt.morphColors!==oe||Dt.toneMapping!==qe||Dt.morphTargetsCount!==ie)&&(le=!0):(le=!0,Dt.__version=q.version);let zi=Dt.currentProgram;le===!0&&(zi=$u(q,N,P));let lo=!1,Qn=!1,zl=!1,Te=zi.getUniforms(),pi=Dt.uniforms;if(at.useProgram(zi.program)&&(lo=!0,Qn=!0,zl=!0),q.id!==b&&(b=q.id,Qn=!0),lo||S!==A){at.buffers.depth.getReversed()?(rt.copy(A.projectionMatrix),zM(rt),FM(rt),Te.setValue(U,"projectionMatrix",rt)):Te.setValue(U,"projectionMatrix",A.projectionMatrix),Te.setValue(U,"viewMatrix",A.matrixWorldInverse);let Fn=Te.map.cameraPosition;Fn!==void 0&&Fn.setValue(U,Ot.setFromMatrixPosition(A.matrixWorld)),it.logarithmicDepthBuffer&&Te.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Te.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Qn=!0,zl=!0)}if(P.isSkinnedMesh){Te.setOptional(U,P,"bindMatrix"),Te.setOptional(U,P,"bindMatrixInverse");let Un=P.skeleton;Un&&(Un.boneTexture===null&&Un.computeBoneTexture(),Te.setValue(U,"boneTexture",Un.boneTexture,C))}P.isBatchedMesh&&(Te.setOptional(U,P,"batchingTexture"),Te.setValue(U,"batchingTexture",P._matricesTexture,C),Te.setOptional(U,P,"batchingIdTexture"),Te.setValue(U,"batchingIdTexture",P._indirectTexture,C),Te.setOptional(U,P,"batchingColorTexture"),P._colorsTexture!==null&&Te.setValue(U,"batchingColorTexture",P._colorsTexture,C));let mi=W.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&Pt.update(P,W,zi),(Qn||Dt.receiveShadow!==P.receiveShadow)&&(Dt.receiveShadow=P.receiveShadow,Te.setValue(U,"receiveShadow",P.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(pi.envMap.value=Mt,pi.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&N.environment!==null&&(pi.envMapIntensity.value=N.environmentIntensity),Qn&&(Te.setValue(U,"toneMappingExposure",x.toneMappingExposure),Dt.needsLights&&FE(pi,zl),st&&q.fog===!0&&gt.refreshFogUniforms(pi,st),gt.refreshMaterialUniforms(pi,q,O,G,p.state.transmissionRenderTarget[A.id]),Tl.upload(U,Yv(Dt),pi,C)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Tl.upload(U,Yv(Dt),pi,C),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Te.setValue(U,"center",P.center),Te.setValue(U,"modelViewMatrix",P.modelViewMatrix),Te.setValue(U,"normalMatrix",P.normalMatrix),Te.setValue(U,"modelMatrix",P.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Un=q.uniformsGroups;for(let Fn=0,Qp=Un.length;Fn<Qp;Fn++){let ea=Un[Fn];L.update(ea,zi),L.bind(ea,zi)}}return zi}function FE(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function HE(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,N,W){ut.get(A.texture).__webglTexture=N,ut.get(A.depthTexture).__webglTexture=W;let q=ut.get(A);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=W===void 0,q.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,N){let W=ut.get(A);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};let kE=U.createFramebuffer();this.setRenderTarget=function(A,N=0,W=0){R=A,w=N,E=W;let q=!0,P=null,st=!1,pt=!1;if(A){let Mt=ut.get(A);if(Mt.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(U.FRAMEBUFFER,null),q=!1;else if(Mt.__webglFramebuffer===void 0)C.setupRenderTarget(A);else if(Mt.__hasExternalTextures)C.rebindTextures(A,ut.get(A.texture).__webglTexture,ut.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let wt=A.depthTexture;if(Mt.__boundDepthTexture!==wt){if(wt!==null&&ut.has(wt)&&(A.width!==wt.image.width||A.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(A)}}let It=A.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(pt=!0);let Bt=ut.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Bt[N])?P=Bt[N][W]:P=Bt[N],st=!0):A.samples>0&&C.useMultisampledRTT(A)===!1?P=ut.get(A).__webglMultisampledFramebuffer:Array.isArray(Bt)?P=Bt[W]:P=Bt,D.copy(A.viewport),k.copy(A.scissor),B=A.scissorTest}else D.copy(nt).multiplyScalar(O).floor(),k.copy(lt).multiplyScalar(O).floor(),B=Rt;if(W!==0&&(P=kE),at.bindFramebuffer(U.FRAMEBUFFER,P)&&q&&at.drawBuffers(A,P),at.viewport(D),at.scissor(k),at.setScissorTest(B),st){let Mt=ut.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,Mt.__webglTexture,W)}else if(pt){let Mt=ut.get(A.texture),It=N;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Mt.__webglTexture,W,It)}else if(A!==null&&W!==0){let Mt=ut.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Mt.__webglTexture,W)}b=-1},this.readRenderTargetPixels=function(A,N,W,q,P,st,pt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=ut.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&pt!==void 0&&(yt=yt[pt]),yt){at.bindFramebuffer(U.FRAMEBUFFER,yt);try{let Mt=A.texture,It=Mt.format,Bt=Mt.type;if(!it.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-q&&W>=0&&W<=A.height-P&&U.readPixels(N,W,q,P,Gt.convert(It),Gt.convert(Bt),st)}finally{let Mt=R!==null?ut.get(R).__webglFramebuffer:null;at.bindFramebuffer(U.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(A,N,W,q,P,st,pt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=ut.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&pt!==void 0&&(yt=yt[pt]),yt){let Mt=A.texture,It=Mt.format,Bt=Mt.type;if(!it.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=A.width-q&&W>=0&&W<=A.height-P){at.bindFramebuffer(U.FRAMEBUFFER,yt);let wt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,wt),U.bufferData(U.PIXEL_PACK_BUFFER,st.byteLength,U.STREAM_READ),U.readPixels(N,W,q,P,Gt.convert(It),Gt.convert(Bt),0);let te=R!==null?ut.get(R).__webglFramebuffer:null;at.bindFramebuffer(U.FRAMEBUFFER,te);let oe=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await BM(U,oe,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,wt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,st),U.deleteBuffer(wt),U.deleteSync(oe),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,N=null,W=0){A.isTexture!==!0&&(Wr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,A=arguments[1]);let q=Math.pow(2,-W),P=Math.floor(A.image.width*q),st=Math.floor(A.image.height*q),pt=N!==null?N.x:0,yt=N!==null?N.y:0;C.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,pt,yt,P,st),at.unbindTexture()};let VE=U.createFramebuffer(),GE=U.createFramebuffer();this.copyTextureToTexture=function(A,N,W=null,q=null,P=0,st=null){A.isTexture!==!0&&(Wr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,A=arguments[1],N=arguments[2],st=arguments[3]||0,W=null),st===null&&(P!==0?(Wr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),st=P,P=0):st=0);let pt,yt,Mt,It,Bt,wt,te,oe,qe,Ie=A.isCompressedTexture?A.mipmaps[st]:A.image;if(W!==null)pt=W.max.x-W.min.x,yt=W.max.y-W.min.y,Mt=W.isBox3?W.max.z-W.min.z:1,It=W.min.x,Bt=W.min.y,wt=W.isBox3?W.min.z:0;else{let mi=Math.pow(2,-P);pt=Math.floor(Ie.width*mi),yt=Math.floor(Ie.height*mi),A.isDataArrayTexture?Mt=Ie.depth:A.isData3DTexture?Mt=Math.floor(Ie.depth*mi):Mt=1,It=0,Bt=0,wt=0}q!==null?(te=q.x,oe=q.y,qe=q.z):(te=0,oe=0,qe=0);let ie=Gt.convert(N.format),Dt=Gt.convert(N.type),hn;N.isData3DTexture?(C.setTexture3D(N,0),hn=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(C.setTexture2DArray(N,0),hn=U.TEXTURE_2D_ARRAY):(C.setTexture2D(N,0),hn=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);let le=U.getParameter(U.UNPACK_ROW_LENGTH),zi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),lo=U.getParameter(U.UNPACK_SKIP_PIXELS),Qn=U.getParameter(U.UNPACK_SKIP_ROWS),zl=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ie.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ie.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,It),U.pixelStorei(U.UNPACK_SKIP_ROWS,Bt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,wt);let Te=A.isDataArrayTexture||A.isData3DTexture,pi=N.isDataArrayTexture||N.isData3DTexture;if(A.isDepthTexture){let mi=ut.get(A),Un=ut.get(N),Fn=ut.get(mi.__renderTarget),Qp=ut.get(Un.__renderTarget);at.bindFramebuffer(U.READ_FRAMEBUFFER,Fn.__webglFramebuffer),at.bindFramebuffer(U.DRAW_FRAMEBUFFER,Qp.__webglFramebuffer);for(let ea=0;ea<Mt;ea++)Te&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ut.get(A).__webglTexture,P,wt+ea),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ut.get(N).__webglTexture,st,qe+ea)),U.blitFramebuffer(It,Bt,pt,yt,te,oe,pt,yt,U.DEPTH_BUFFER_BIT,U.NEAREST);at.bindFramebuffer(U.READ_FRAMEBUFFER,null),at.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(P!==0||A.isRenderTargetTexture||ut.has(A)){let mi=ut.get(A),Un=ut.get(N);at.bindFramebuffer(U.READ_FRAMEBUFFER,VE),at.bindFramebuffer(U.DRAW_FRAMEBUFFER,GE);for(let Fn=0;Fn<Mt;Fn++)Te?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,mi.__webglTexture,P,wt+Fn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,mi.__webglTexture,P),pi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Un.__webglTexture,st,qe+Fn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Un.__webglTexture,st),P!==0?U.blitFramebuffer(It,Bt,pt,yt,te,oe,pt,yt,U.COLOR_BUFFER_BIT,U.NEAREST):pi?U.copyTexSubImage3D(hn,st,te,oe,qe+Fn,It,Bt,pt,yt):U.copyTexSubImage2D(hn,st,te,oe,It,Bt,pt,yt);at.bindFramebuffer(U.READ_FRAMEBUFFER,null),at.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else pi?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(hn,st,te,oe,qe,pt,yt,Mt,ie,Dt,Ie.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(hn,st,te,oe,qe,pt,yt,Mt,ie,Ie.data):U.texSubImage3D(hn,st,te,oe,qe,pt,yt,Mt,ie,Dt,Ie):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,st,te,oe,pt,yt,ie,Dt,Ie.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,st,te,oe,Ie.width,Ie.height,ie,Ie.data):U.texSubImage2D(U.TEXTURE_2D,st,te,oe,pt,yt,ie,Dt,Ie);U.pixelStorei(U.UNPACK_ROW_LENGTH,le),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,zi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,lo),U.pixelStorei(U.UNPACK_SKIP_ROWS,Qn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,zl),st===0&&N.generateMipmaps&&U.generateMipmap(hn),at.unbindTexture()},this.copyTextureToTexture3D=function(A,N,W=null,q=null,P=0){return A.isTexture!==!0&&(Wr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,q=arguments[1]||null,A=arguments[2],N=arguments[3],P=arguments[4]||0),Wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,N,W,q,P)},this.initRenderTarget=function(A){ut.get(A).__webglFramebuffer===void 0&&C.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?C.setTextureCube(A,0):A.isData3DTexture?C.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?C.setTexture2DArray(A,0):C.setTexture2D(A,0),at.unbindTexture()},this.resetState=function(){w=0,E=0,R=null,at.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return us}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}};function js(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function wT(n,t){n.prototype=Object.create(t.prototype),n.prototype.constructor=n,n.__proto__=t}var Yn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},zu={duration:.5,overwrite:!1,delay:0},lv,_n,Ae,Pi=1e8,_e=1/Pi,j_=Math.PI*2,vL=j_/4,yL=0,RT=Math.sqrt,xL=Math.cos,SL=Math.sin,sn=function(t){return typeof t=="string"},ke=function(t){return typeof t=="function"},tr=function(t){return typeof t=="number"},Lp=function(t){return typeof t>"u"},vs=function(t){return typeof t=="object"},qn=function(t){return t!==!1},cv=function(){return typeof window<"u"},Mp=function(t){return ke(t)||sn(t)},CT=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Cn=Array.isArray,bL=/random\([^)]+\)/g,ML=/,\s*/g,yT=/(?:-?\.?\d|\.)+/gi,uv=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,$a=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,X_=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,hv=/[+-]=-?[.\d]+/,TL=/[^,'"\[\]\s]+/gi,EL=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ne,gs,$_,fv,hi={},wp={},DT,UT=function(t){return(wp=wl(t,hi))&&Dn},Np=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Fu=function(t,e){return!e&&console.warn(t)},LT=function(t,e){return t&&(hi[t]=e)&&wp&&(wp[t]=e)||hi},Hu=function(){return 0},AL={suppressEvents:!0,isStart:!0,kill:!1},Tp={suppressEvents:!0,kill:!1},wL={suppressEvents:!0},dv={},qr=[],tv={},NT,Wn={},q_={},xT=30,Ep=[],pv="",mv=function(t){var e=t[0],i,s;if(vs(e)||ke(e)||(t=[t]),!(i=(e._gsap||{}).harness)){for(s=Ep.length;s--&&!Ep[s].targetTest(e););i=Ep[s]}for(s=t.length;s--;)t[s]&&(t[s]._gsap||(t[s]._gsap=new yv(t[s],i)))||t.splice(s,1);return t},Yr=function(t){return t._gsap||mv(Ii(t))[0]._gsap},gv=function(t,e,i){return(i=t[e])&&ke(i)?t[e]():Lp(i)&&t.getAttribute&&t.getAttribute(e)||i},Bn=function(t,e){return(t=t.split(",")).forEach(e)||t},Ve=function(t){return Math.round(t*1e5)/1e5||0},Le=function(t){return Math.round(t*1e7)/1e7||0},to=function(t,e){var i=e.charAt(0),s=parseFloat(e.substr(2));return t=parseFloat(t),i==="+"?t+s:i==="-"?t-s:i==="*"?t*s:t/s},RL=function(t,e){for(var i=e.length,s=0;t.indexOf(e[s])<0&&++s<i;);return s<i},Rp=function(){var t=qr.length,e=qr.slice(0),i,s;for(tv={},qr.length=0,i=0;i<t;i++)s=e[i],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},_v=function(t){return!!(t._initted||t._startAt||t.add)},OT=function(t,e,i,s){qr.length&&!_n&&Rp(),t.render(e,i,s||!!(_n&&e<0&&_v(t))),qr.length&&!_n&&Rp()},PT=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(TL).length<2?e:sn(t)?t.trim():t},IT=function(t){return t},fi=function(t,e){for(var i in e)i in t||(t[i]=e[i]);return t},CL=function(t){return function(e,i){for(var s in i)s in e||s==="duration"&&t||s==="ease"||(e[s]=i[s])}},wl=function(t,e){for(var i in e)t[i]=e[i];return t},ST=function n(t,e){for(var i in e)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=vs(e[i])?n(t[i]||(t[i]={}),e[i]):e[i]);return t},Cp=function(t,e){var i={},s;for(s in t)s in e||(i[s]=t[s]);return i},Pu=function(t){var e=t.parent||Ne,i=t.keyframes?CL(Cn(t.keyframes)):fi;if(qn(t.inherit))for(;e;)i(t,e.vars.defaults),e=e.parent||e._dp;return t},DL=function(t,e){for(var i=t.length,s=i===e.length;s&&i--&&t[i]===e[i];);return i<0},BT=function(t,e,i,s,r){i===void 0&&(i="_first"),s===void 0&&(s="_last");var a=t[s],o;if(r)for(o=e[r];a&&a[r]>o;)a=a._prev;return a?(e._next=a._next,a._next=e):(e._next=t[i],t[i]=e),e._next?e._next._prev=e:t[s]=e,e._prev=a,e.parent=e._dp=t,e},Op=function(t,e,i,s){i===void 0&&(i="_first"),s===void 0&&(s="_last");var r=e._prev,a=e._next;r?r._next=a:t[i]===e&&(t[i]=a),a?a._prev=r:t[s]===e&&(t[s]=r),e._next=e._prev=e.parent=null},Zr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Ka=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var i=t;i;)i._dirty=1,i=i.parent;return t},UL=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},ev=function(t,e,i,s){return t._startAt&&(_n?t._startAt.revert(Tp):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,s))},LL=function n(t){return!t||t._ts&&n(t.parent)},bT=function(t){return t._repeat?Rl(t._tTime,t=t.duration()+t._rDelay)*t:0},Rl=function(t,e){var i=Math.floor(t=Le(t/e));return t&&i===t?i-1:i},Dp=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Pp=function(t){return t._end=Le(t._start+(t._tDur/Math.abs(t._ts||t._rts||_e)||0))},Ip=function(t,e){var i=t._dp;return i&&i.smoothChildTiming&&t._ts&&(t._start=Le(i._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Pp(t),i._dirty||Ka(i,t)),t},zT=function(t,e){var i;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(i=Dp(t.rawTime(),e),(!e._dur||Gu(0,e.totalDuration(),i)-e._tTime>_e)&&e.render(i,!0)),Ka(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(i=t;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;t._zTime=-_e}},_s=function(t,e,i,s){return e.parent&&Zr(e),e._start=Le((tr(i)?i:i||t!==Ne?Oi(t,i,e):t._time)+e._delay),e._end=Le(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),BT(t,e,"_first","_last",t._sort?"_start":0),nv(e)||(t._recent=e),s||zT(t,e),t._ts<0&&Ip(t,t._tTime),t},FT=function(t,e){return(hi.ScrollTrigger||Np("scrollTrigger",e))&&hi.ScrollTrigger.create(e,t)},HT=function(t,e,i,s,r){if(bv(t,e,r),!t._initted)return 1;if(!i&&t._pt&&!_n&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&NT!==Xn.frame)return qr.push(t),t._lazy=[r,s],1},NL=function n(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||n(e))},nv=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},OL=function(t,e,i,s){var r=t.ratio,a=e<0||!e&&(!t._start&&NL(t)&&!(!t._initted&&nv(t))||(t._ts<0||t._dp._ts<0)&&!nv(t))?0:1,o=t._rDelay,l=0,c,u,d;if(o&&t._repeat&&(l=Gu(0,t._tDur,e),u=Rl(l,o),t._yoyo&&u&1&&(a=1-a),u!==Rl(t._tTime,o)&&(r=1-a,t.vars.repeatRefresh&&t._initted&&t.invalidate())),a!==r||_n||s||t._zTime===_e||!e&&t._zTime){if(!t._initted&&HT(t,e,s,i,l))return;for(d=t._zTime,t._zTime=e||(i?_e:0),i||(i=e&&!d),t.ratio=a,t._from&&(a=1-a),t._time=0,t._tTime=l,c=t._pt;c;)c.r(a,c.d),c=c._next;e<0&&ev(t,e,i,!0),t._onUpdate&&!i&&ui(t,"onUpdate"),l&&t._repeat&&!i&&t.parent&&ui(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===a&&(a&&Zr(t,1),!i&&!_n&&(ui(t,a?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},PL=function(t,e,i){var s;if(i>e)for(s=t._first;s&&s._start<=i;){if(s.data==="isPause"&&s._start>e)return s;s=s._next}else for(s=t._last;s&&s._start>=i;){if(s.data==="isPause"&&s._start<e)return s;s=s._prev}},Cl=function(t,e,i,s){var r=t._repeat,a=Le(e)||0,o=t._tTime/t._tDur;return o&&!s&&(t._time*=a/t._dur),t._dur=a,t._tDur=r?r<0?1e10:Le(a*(r+1)+t._rDelay*r):a,o>0&&!s&&Ip(t,t._tTime=t._tDur*o),t.parent&&Pp(t),i||Ka(t.parent,t),t},MT=function(t){return t instanceof Rn?Ka(t):Cl(t,t._dur)},IL={_start:0,endTime:Hu,totalDuration:Hu},Oi=function n(t,e,i){var s=t.labels,r=t._recent||IL,a=t.duration()>=Pi?r.endTime(!1):t._dur,o,l,c;return sn(e)&&(isNaN(e)||e in s)?(l=e.charAt(0),c=e.substr(-1)==="%",o=e.indexOf("="),l==="<"||l===">"?(o>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(o<0?r:i).totalDuration()/100:1)):o<0?(e in s||(s[e]=a),s[e]):(l=parseFloat(e.charAt(o-1)+e.substr(o+1)),c&&i&&(l=l/100*(Cn(i)?i[0]:i).totalDuration()),o>1?n(t,e.substr(0,o-1),i)+l:a+l)):e==null?a:+e},Iu=function(t,e,i){var s=tr(e[1]),r=(s?2:1)+(t<2?0:1),a=e[r],o,l;if(s&&(a.duration=e[1]),a.parent=i,t){for(o=a,l=i;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=qn(l.vars.inherit)&&l.parent;a.immediateRender=qn(o.immediateRender),t<2?a.runBackwards=1:a.startAt=e[r-1]}return new Xe(e[0],a,e[r+1])},Qr=function(t,e){return t||t===0?e(t):e},Gu=function(t,e,i){return i<t?t:i>e?e:i},vn=function(t,e){return!sn(t)||!(e=EL.exec(t))?"":e[1]},BL=function(t,e,i){return Qr(i,function(s){return Gu(t,e,s)})},iv=[].slice,kT=function(t,e){return t&&vs(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&vs(t[0]))&&!t.nodeType&&t!==gs},zL=function(t,e,i){return i===void 0&&(i=[]),t.forEach(function(s){var r;return sn(s)&&!e||kT(s,1)?(r=i).push.apply(r,Ii(s)):i.push(s)})||i},Ii=function(t,e,i){return Ae&&!e&&Ae.selector?Ae.selector(t):sn(t)&&!i&&($_||!Dl())?iv.call((e||fv).querySelectorAll(t),0):Cn(t)?zL(t,i):kT(t)?iv.call(t,0):t?[t]:[]},sv=function(t){return t=Ii(t)[0]||Fu("Invalid scope")||{},function(e){var i=t.current||t.nativeElement||t;return Ii(e,i.querySelectorAll?i:i===t?Fu("Invalid scope")||fv.createElement("div"):t)}},VT=function(t){return t.sort(function(){return .5-Math.random()})},GT=function(t){if(ke(t))return t;var e=vs(t)?t:{each:t},i=Ja(e.ease),s=e.from||0,r=parseFloat(e.base)||0,a={},o=s>0&&s<1,l=isNaN(s)||o,c=e.axis,u=s,d=s;return sn(s)?u=d={center:.5,edges:.5,end:1}[s]||0:!o&&l&&(u=s[0],d=s[1]),function(f,h,m){var _=(m||e).length,g=a[_],p,v,y,x,M,w,E,R,b;if(!g){if(b=e.grid==="auto"?0:(e.grid||[1,Pi])[1],!b){for(E=-Pi;E<(E=m[b++].getBoundingClientRect().left)&&b<_;);b<_&&b--}for(g=a[_]=[],p=l?Math.min(b,_)*u-.5:s%b,v=b===Pi?0:l?_*d/b-.5:s/b|0,E=0,R=Pi,w=0;w<_;w++)y=w%b-p,x=v-(w/b|0),g[w]=M=c?Math.abs(c==="y"?x:y):RT(y*y+x*x),M>E&&(E=M),M<R&&(R=M);s==="random"&&VT(g),g.max=E-R,g.min=R,g.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(b>_?_-1:c?c==="y"?_/b:b:Math.max(b,_/b))||0)*(s==="edges"?-1:1),g.b=_<0?r-_:r,g.u=vn(e.amount||e.each)||0,i=i&&_<0?JL(i):i}return _=(g[f]-g.min)/g.max||0,Le(g.b+(i?i(_):_)*g.v)+g.u}},rv=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(i){var s=Le(Math.round(parseFloat(i)/t)*t*e);return(s-s%1)/e+(tr(i)?0:vn(i))}},WT=function(t,e){var i=Cn(t),s,r;return!i&&vs(t)&&(s=i=t.radius||Pi,t.values?(t=Ii(t.values),(r=!tr(t[0]))&&(s*=s)):t=rv(t.increment)),Qr(e,i?ke(t)?function(a){return r=t(a),Math.abs(r-a)<=s?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=Pi,u=0,d=t.length,f,h;d--;)r?(f=t[d].x-o,h=t[d].y-l,f=f*f+h*h):f=Math.abs(t[d]-o),f<c&&(c=f,u=d);return u=!s||c<=s?t[u]:a,r||u===a||tr(a)?u:u+vn(a)}:rv(t))},XT=function(t,e,i,s){return Qr(Cn(t)?!e:i===!0?!!(i=0):!s,function(){return Cn(t)?t[~~(Math.random()*t.length)]:(i=i||1e-5)&&(s=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((t-i/2+Math.random()*(e-t+i*.99))/i)*i*s)/s})},FL=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return function(s){return e.reduce(function(r,a){return a(r)},s)}},HL=function(t,e){return function(i){return t(parseFloat(i))+(e||vn(i))}},kL=function(t,e,i){return YT(t,e,0,1,i)},qT=function(t,e,i){return Qr(i,function(s){return t[~~e(s)]})},VL=function n(t,e,i){var s=e-t;return Cn(t)?qT(t,n(0,t.length),e):Qr(i,function(r){return(s+(r-t)%s)%s+t})},GL=function n(t,e,i){var s=e-t,r=s*2;return Cn(t)?qT(t,n(0,t.length-1),e):Qr(i,function(a){return a=(r+(a-t)%r)%r||0,t+(a>s?r-a:a)})},Ul=function(t){return t.replace(bL,function(e){var i=e.indexOf("[")+1,s=e.substring(i||7,i?e.indexOf("]"):e.length-1).split(ML);return XT(i?s:+s[0],i?0:+s[1],+s[2]||1e-5)})},YT=function(t,e,i,s,r){var a=e-t,o=s-i;return Qr(r,function(l){return i+((l-t)/a*o||0)})},WL=function n(t,e,i,s){var r=isNaN(t+e)?0:function(h){return(1-h)*t+h*e};if(!r){var a=sn(t),o={},l,c,u,d,f;if(i===!0&&(s=1)&&(i=null),a)t={p:t},e={p:e};else if(Cn(t)&&!Cn(e)){for(u=[],d=t.length,f=d-2,c=1;c<d;c++)u.push(n(t[c-1],t[c]));d--,r=function(m){m*=d;var _=Math.min(f,~~m);return u[_](m-_)},i=e}else s||(t=wl(Cn(t)?[]:{},t));if(!u){for(l in e)xv.call(o,t,l,"get",e[l]);r=function(m){return Ev(m,o)||(a?t.p:t)}}}return Qr(i,r)},TT=function(t,e,i){var s=t.labels,r=Pi,a,o,l;for(a in s)o=s[a]-e,o<0==!!i&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},ui=function(t,e,i){var s=t.vars,r=s[e],a=Ae,o=t._ctx,l,c,u;if(r)return l=s[e+"Params"],c=s.callbackScope||t,i&&qr.length&&Rp(),o&&(Ae=o),u=l?r.apply(c,l):r.call(c),Ae=a,u},Nu=function(t){return Zr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!_n),t.progress()<1&&ui(t,"onInterrupt"),t},Al,ZT=[],QT=function(t){if(t)if(t=!t.name&&t.default||t,cv()||t.headless){var e=t.name,i=ke(t),s=e&&!i&&t.init?function(){this._props=[]}:t,r={init:Hu,render:Ev,add:xv,kill:oN,modifier:aN,rawVars:0},a={targetTest:0,get:0,getSetter:Bp,aliases:{},register:0};if(Dl(),t!==s){if(Wn[e])return;fi(s,fi(Cp(t,r),a)),wl(s.prototype,wl(r,Cp(t,a))),Wn[s.prop=e]=s,t.targetTest&&(Ep.push(s),dv[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}LT(e,s),t.register&&t.register(Dn,s,zn)}else ZT.push(t)},ge=255,Ou={aqua:[0,ge,ge],lime:[0,ge,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,ge],navy:[0,0,128],white:[ge,ge,ge],olive:[128,128,0],yellow:[ge,ge,0],orange:[ge,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[ge,0,0],pink:[ge,192,203],cyan:[0,ge,ge],transparent:[ge,ge,ge,0]},Y_=function(t,e,i){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(i-e)*t*6:t<.5?i:t*3<2?e+(i-e)*(2/3-t)*6:e)*ge+.5|0},KT=function(t,e,i){var s=t?tr(t)?[t>>16,t>>8&ge,t&ge]:0:Ou.black,r,a,o,l,c,u,d,f,h,m;if(!s){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ou[t])s=Ou[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),a=t.charAt(2),o=t.charAt(3),t="#"+r+r+a+a+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return s=parseInt(t.substr(1,6),16),[s>>16,s>>8&ge,s&ge,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),s=[t>>16,t>>8&ge,t&ge]}else if(t.substr(0,3)==="hsl"){if(s=m=t.match(yT),!e)l=+s[0]%360/360,c=+s[1]/100,u=+s[2]/100,a=u<=.5?u*(c+1):u+c-u*c,r=u*2-a,s.length>3&&(s[3]*=1),s[0]=Y_(l+1/3,r,a),s[1]=Y_(l,r,a),s[2]=Y_(l-1/3,r,a);else if(~t.indexOf("="))return s=t.match(uv),i&&s.length<4&&(s[3]=1),s}else s=t.match(yT)||Ou.transparent;s=s.map(Number)}return e&&!m&&(r=s[0]/ge,a=s[1]/ge,o=s[2]/ge,d=Math.max(r,a,o),f=Math.min(r,a,o),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===r?(a-o)/h+(a<o?6:0):d===a?(o-r)/h+2:(r-a)/h+4,l*=60),s[0]=~~(l+.5),s[1]=~~(c*100+.5),s[2]=~~(u*100+.5)),i&&s.length<4&&(s[3]=1),s},JT=function(t){var e=[],i=[],s=-1;return t.split($s).forEach(function(r){var a=r.match($a)||[];e.push.apply(e,a),i.push(s+=a.length+1)}),e.c=i,e},ET=function(t,e,i){var s="",r=(t+s).match($s),a=e?"hsla(":"rgba(",o=0,l,c,u,d;if(!r)return t;if(r=r.map(function(f){return(f=KT(f,e,1))&&a+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(u=JT(t),l=i.c,l.join(s)!==u.c.join(s)))for(c=t.replace($s,"1").split($a),d=c.length-1;o<d;o++)s+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(u.length?u:r.length?r:i).shift());if(!c)for(c=t.split($s),d=c.length-1;o<d;o++)s+=c[o]+r[o];return s+c[d]},$s=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ou)n+="|"+t+"\\b";return new RegExp(n+")","gi")})(),XL=/hsl[a]?\(/,vv=function(t){var e=t.join(" "),i;if($s.lastIndex=0,$s.test(e))return i=XL.test(e),t[1]=ET(t[1],i),t[0]=ET(t[0],i,JT(t[1])),!0},ku,Xn=(function(){var n=Date.now,t=500,e=33,i=n(),s=i,r=1e3/240,a=r,o=[],l,c,u,d,f,h,m=function _(g){var p=n()-s,v=g===!0,y,x,M,w;if((p>t||p<0)&&(i+=p-e),s+=p,M=s-i,y=M-a,(y>0||v)&&(w=++d.frame,f=M-d.time*1e3,d.time=M=M/1e3,a+=y+(y>=r?4:r-y),x=1),v||(l=c(_)),x)for(h=0;h<o.length;h++)o[h](M,f,w,g)};return d={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(g){return f/(1e3/(g||60))},wake:function(){DT&&(!$_&&cv()&&(gs=$_=window,fv=gs.document||{},hi.gsap=Dn,(gs.gsapVersions||(gs.gsapVersions=[])).push(Dn.version),UT(wp||gs.GreenSockGlobals||!gs.gsap&&gs||{}),ZT.forEach(QT)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(g){return setTimeout(g,a-d.time*1e3+1|0)},ku=1,m(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),ku=0,c=Hu},lagSmoothing:function(g,p){t=g||1/0,e=Math.min(p||33,t)},fps:function(g){r=1e3/(g||240),a=d.time*1e3+r},add:function(g,p,v){var y=p?function(x,M,w,E){g(x,M,w,E),d.remove(y)}:g;return d.remove(g),o[v?"unshift":"push"](y),Dl(),y},remove:function(g,p){~(p=o.indexOf(g))&&o.splice(p,1)&&h>=p&&h--},_listeners:o},d})(),Dl=function(){return!ku&&Xn.wake()},Kt={},qL=/^[\d.\-M][\d.\-,\s]/,YL=/["']/g,ZL=function(t){for(var e={},i=t.substr(1,t.length-3).split(":"),s=i[0],r=1,a=i.length,o,l,c;r<a;r++)l=i[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),e[s]=isNaN(c)?c.replace(YL,"").trim():+c,s=l.substr(o+1).trim();return e},QL=function(t){var e=t.indexOf("(")+1,i=t.indexOf(")"),s=t.indexOf("(",e);return t.substring(e,~s&&s<i?t.indexOf(")",i+1):i)},KL=function(t){var e=(t+"").split("("),i=Kt[e[0]];return i&&e.length>1&&i.config?i.config.apply(null,~t.indexOf("{")?[ZL(e[1])]:QL(t).split(",").map(PT)):Kt._CE&&qL.test(t)?Kt._CE("",t):i},JL=function(t){return function(e){return 1-t(1-e)}},Ja=function(t,e){return t&&(ke(t)?t:Kt[t]||KL(t))||e},eo=function(t,e,i,s){i===void 0&&(i=function(l){return 1-e(1-l)}),s===void 0&&(s=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:i,easeInOut:s},a;return Bn(t,function(o){Kt[o]=hi[o]=r,Kt[a=o.toLowerCase()]=i;for(var l in r)Kt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Kt[o+"."+l]=r[l]}),r},jT=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Z_=function n(t,e,i){var s=e>=1?e:1,r=(i||(t?.3:.45))/(e<1?e:1),a=r/j_*(Math.asin(1/s)||0),o=function(u){return u===1?1:s*Math.pow(2,-10*u)*SL((u-a)*r)+1},l=t==="out"?o:t==="in"?function(c){return 1-o(1-c)}:jT(o);return r=j_/r,l.config=function(c,u){return n(t,c,u)},l},Q_=function n(t,e){e===void 0&&(e=1.70158);var i=function(a){return a?--a*a*((e+1)*a+e)+1:0},s=t==="out"?i:t==="in"?function(r){return 1-i(1-r)}:jT(i);return s.config=function(r){return n(t,r)},s};Bn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,t){var e=t<5?t+1:t;eo(n+",Power"+(e-1),t?function(i){return Math.pow(i,e)}:function(i){return i},function(i){return 1-Math.pow(1-i,e)},function(i){return i<.5?Math.pow(i*2,e)/2:1-Math.pow((1-i)*2,e)/2})});Kt.Linear.easeNone=Kt.none=Kt.Linear.easeIn;eo("Elastic",Z_("in"),Z_("out"),Z_());(function(n,t){var e=1/t,i=2*e,s=2.5*e,r=function(o){return o<e?n*o*o:o<i?n*Math.pow(o-1.5/t,2)+.75:o<s?n*(o-=2.25/t)*o+.9375:n*Math.pow(o-2.625/t,2)+.984375};eo("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);eo("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});eo("Circ",function(n){return-(RT(1-n*n)-1)});eo("Sine",function(n){return n===1?1:-xL(n*vL)+1});eo("Back",Q_("in"),Q_("out"),Q_());Kt.SteppedEase=Kt.steps=hi.SteppedEase={config:function(t,e){t===void 0&&(t=1);var i=1/t,s=t+(e?0:1),r=e?1:0,a=1-_e;return function(o){return((s*Gu(0,a,o)|0)+r)*i}}};zu.ease=Kt["quad.out"];Bn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return pv+=n+","+n+"Params,"});var yv=function(t,e){this.id=yL++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:gv,this.set=e?e.getSetter:Bp},Vu=(function(){function n(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Cl(this,+e.duration,1,1),this.data=e.data,Ae&&(this._ctx=Ae,Ae.data.push(this)),ku||Xn.wake()}var t=n.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,Cl(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,s){if(Dl(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ip(this,i),!r._dp||r.parent||zT(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&_s(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===_e||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),OT(this,i,s)),this},t.time=function(i,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+bT(this))%(this._dur+this._rDelay)||(i?this._dur:0),s):this._time},t.totalProgress=function(i,s){return arguments.length?this.totalTime(this.totalDuration()*i,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(i,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+bT(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(i,s){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,s):this._repeat?Rl(this._tTime,r)+1:1},t.timeScale=function(i,s){if(!arguments.length)return this._rts===-_e?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?Dp(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-_e?0:this._rts,this.totalTime(Gu(-Math.abs(this._delay),this.totalDuration(),r),s!==!1),Pp(this),UL(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Dl(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==_e&&(this._tTime-=_e)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=Le(i);var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&_s(s,this,this._start-this._delay),this}return this._start},t.endTime=function(i){return this._start+(qn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var s=this.parent||this._dp;return s?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Dp(s.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=wL);var s=_n;return _n=i,_v(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),_n=s,this},t.globalTime=function(i){for(var s=this,r=arguments.length?i:s.rawTime();s;)r=s._start+r/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,MT(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var s=this._time;return this._rDelay=i,MT(this),s?this.time(s):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,s){return this.totalTime(Oi(this,i),qn(s))},t.restart=function(i,s){return this.play().totalTime(i?-this._delay:0,qn(s)),this._dur||(this._zTime=-_e),this},t.play=function(i,s){return i!=null&&this.seek(i,s),this.reversed(!1).paused(!1)},t.reverse=function(i,s){return i!=null&&this.seek(i||this.totalDuration(),s),this.reversed(!0).paused(!1)},t.pause=function(i,s){return i!=null&&this.seek(i,s),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-_e:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-_e,this},t.isActive=function(){var i=this.parent||this._dp,s=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=s&&r<this.endTime(!0)-_e)},t.eventCallback=function(i,s,r){var a=this.vars;return arguments.length>1?(s?(a[i]=s,r&&(a[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=s)):delete a[i],this):a[i]},t.then=function(i){var s=this,r=s._prom;return new Promise(function(a){var o=ke(i)?i:IT,l=function(){var u=s.then;s.then=null,r&&r(),ke(o)&&(o=o(s))&&(o.then||o===s)&&(s.then=u),a(o),s.then=u};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?l():s._prom=l})},t.kill=function(){Nu(this)},n})();fi(Vu.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-_e,_prom:0,_ps:!1,_rts:1});var Rn=(function(n){wT(t,n);function t(i,s){var r;return i===void 0&&(i={}),r=n.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=qn(i.sortChildren),Ne&&_s(i.parent||Ne,js(r),s),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&FT(js(r),i.scrollTrigger),r}var e=t.prototype;return e.to=function(s,r,a){return Iu(0,arguments,this),this},e.from=function(s,r,a){return Iu(1,arguments,this),this},e.fromTo=function(s,r,a,o){return Iu(2,arguments,this),this},e.set=function(s,r,a){return r.duration=0,r.parent=this,Pu(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Xe(s,r,Oi(this,a),1),this},e.call=function(s,r,a){return _s(this,Xe.delayedCall(0,s,r),a)},e.staggerTo=function(s,r,a,o,l,c,u){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new Xe(s,a,Oi(this,l)),this},e.staggerFrom=function(s,r,a,o,l,c,u){return a.runBackwards=1,Pu(a).immediateRender=qn(a.immediateRender),this.staggerTo(s,r,a,o,l,c,u)},e.staggerFromTo=function(s,r,a,o,l,c,u,d){return o.startAt=a,Pu(o).immediateRender=qn(o.immediateRender),this.staggerTo(s,r,o,l,c,u,d)},e.render=function(s,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=s<=0?0:Le(s),d=this._zTime<0!=s<0&&(this._initted||!c),f,h,m,_,g,p,v,y,x,M,w,E;if(this!==Ne&&u>l&&s>=0&&(u=l),u!==this._tTime||a||d){if(o!==this._time&&c&&(u+=this._time-o,s+=this._time-o),f=u,x=this._start,y=this._ts,p=!y,d&&(c||(o=this._zTime),(s||!r)&&(this._zTime=s)),this._repeat){if(w=this._yoyo,g=c+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(g*100+s,r,a);if(f=Le(u%g),u===l?(_=this._repeat,f=c):(M=Le(u/g),_=~~M,_&&_===M&&(f=c,_--),f>c&&(f=c)),M=Rl(this._tTime,g),!o&&this._tTime&&M!==_&&this._tTime-M*g-this._dur<=0&&(M=_),w&&_&1&&(f=c-f,E=1),_!==M&&!this._lock){var R=w&&M&1,b=R===(w&&_&1);if(_<M&&(R=!R),o=R?0:u%c?c:u,this._lock=1,this.render(o||(E?0:Le(_*g)),r,!c)._lock=0,this._tTime=u,!r&&this.parent&&ui(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,M=_),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,b&&(this._lock=2,o=R?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=PL(this,Le(o),Le(f)),v&&(u-=f-(f=v._start))),this._tTime=u,this._time=f,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,o=0),!o&&u&&c&&!r&&!M&&(ui(this,"onStart"),this._tTime!==u))return this;if(f>=o&&s>=0)for(h=this._first;h;){if(m=h._next,(h._act||f>=h._start)&&h._ts&&v!==h){if(h.parent!==this)return this.render(s,r,a);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,r,a),f!==this._time||!this._ts&&!p){v=0,m&&(u+=this._zTime=-_e);break}}h=m}else{h=this._last;for(var S=s<0?s:f;h;){if(m=h._prev,(h._act||S<=h._end)&&h._ts&&v!==h){if(h.parent!==this)return this.render(s,r,a);if(h.render(h._ts>0?(S-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(S-h._start)*h._ts,r,a||_n&&_v(h)),f!==this._time||!this._ts&&!p){v=0,m&&(u+=this._zTime=S?-_e:_e);break}}h=m}}if(v&&!r&&(this.pause(),v.render(f>=o?0:-_e)._zTime=f>=o?1:-1,this._ts))return this._start=x,Pp(this),this.render(s,r,a);this._onUpdate&&!r&&ui(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(x===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((s||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Zr(this,1),!r&&!(s<0&&!o)&&(u||o||!l)&&(ui(this,u===l&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(s,r){var a=this;if(tr(r)||(r=Oi(this,r,s)),!(s instanceof Vu)){if(Cn(s))return s.forEach(function(o){return a.add(o,r)}),this;if(sn(s))return this.addLabel(s,r);if(ke(s))s=Xe.delayedCall(0,s);else return this}return this!==s?_s(this,s,r):this},e.getChildren=function(s,r,a,o){s===void 0&&(s=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-Pi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Xe?r&&l.push(c):(a&&l.push(c),s&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},e.getById=function(s){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===s)return r[a]},e.remove=function(s){return sn(s)?this.removeLabel(s):ke(s)?this.killTweensOf(s):(s.parent===this&&Op(this,s),s===this._recent&&(this._recent=this._last),Ka(this))},e.totalTime=function(s,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Le(Xn.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),n.prototype.totalTime.call(this,s,r),this._forcing=0,this):this._tTime},e.addLabel=function(s,r){return this.labels[s]=Oi(this,r),this},e.removeLabel=function(s){return delete this.labels[s],this},e.addPause=function(s,r,a){var o=Xe.delayedCall(0,r||Hu,a);return o.data="isPause",this._hasPause=1,_s(this,o,Oi(this,s))},e.removePause=function(s){var r=this._first;for(s=Oi(this,s);r;)r._start===s&&r.data==="isPause"&&Zr(r),r=r._next},e.killTweensOf=function(s,r,a){for(var o=this.getTweensOf(s,a),l=o.length;l--;)Xr!==o[l]&&o[l].kill(s,r);return this},e.getTweensOf=function(s,r){for(var a=[],o=Ii(s),l=this._first,c=tr(r),u;l;)l instanceof Xe?RL(l._targets,o)&&(c?(!Xr||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(u=l.getTweensOf(o,r)).length&&a.push.apply(a,u),l=l._next;return a},e.tweenTo=function(s,r){r=r||{};var a=this,o=Oi(a,s),l=r,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,m=Xe.to(a,fi({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||_e,onStart:function(){if(a.pause(),!h){var g=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==g&&Cl(m,g,0,1).render(m._time,!0,!0),h=1}u&&u.apply(m,d||[])}},r));return f?m.render(0):m},e.tweenFromTo=function(s,r,a){return this.tweenTo(r,fi({startAt:{time:Oi(this,s)}},a))},e.recent=function(){return this._recent},e.nextLabel=function(s){return s===void 0&&(s=this._time),TT(this,Oi(this,s))},e.previousLabel=function(s){return s===void 0&&(s=this._time),TT(this,Oi(this,s),1)},e.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+_e)},e.shiftChildren=function(s,r,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(s=Le(s);o;)o._start>=a&&(o._start+=s,o._end+=s),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=s);return Ka(this)},e.invalidate=function(s){var r=this._first;for(this._lock=0;r;)r.invalidate(s),r=r._next;return n.prototype.invalidate.call(this,s)},e.clear=function(s){s===void 0&&(s=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),Ka(this)},e.totalDuration=function(s){var r=0,a=this,o=a._last,l=Pi,c,u,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-s:s));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,_s(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(r-=u,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Le(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;Cl(a,a===Ne&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},t.updateRoot=function(s){if(Ne._ts&&(OT(Ne,Dp(s,Ne)),NT=Xn.frame),Xn.frame>=xT){xT+=Yn.autoSleep||120;var r=Ne._first;if((!r||!r._ts)&&Yn.autoSleep&&Xn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Xn.sleep()}}},t})(Vu);fi(Rn.prototype,{_lock:0,_hasPause:0,_forcing:0});var jL=function(t,e,i,s,r,a,o){var l=new zn(this._pt,t,e,0,1,Tv,null,r),c=0,u=0,d,f,h,m,_,g,p,v;for(l.b=i,l.e=s,i+="",s+="",(p=~s.indexOf("random("))&&(s=Ul(s)),a&&(v=[i,s],a(v,t,e),i=v[0],s=v[1]),f=i.match(X_)||[];d=X_.exec(s);)m=d[0],_=s.substring(c,d.index),h?h=(h+1)%5:_.substr(-5)==="rgba("&&(h=1),m!==f[u++]&&(g=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:g,c:m.charAt(1)==="="?to(g,m)-g:parseFloat(m)-g,m:h&&h<4?Math.round:0},c=X_.lastIndex);return l.c=c<s.length?s.substring(c,s.length):"",l.fp=o,(hv.test(s)||p)&&(l.e=0),this._pt=l,l},xv=function(t,e,i,s,r,a,o,l,c,u){ke(s)&&(s=s(r||0,t,a));var d=t[e],f=i!=="get"?i:ke(d)?c?t[e.indexOf("set")||!ke(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,h=ke(d)?c?iN:eE:Mv,m;if(sn(s)&&(~s.indexOf("random(")&&(s=Ul(s)),s.charAt(1)==="="&&(m=to(f,s)+(vn(f)||0),(m||m===0)&&(s=m))),!u||f!==s||av)return!isNaN(f*s)&&s!==""?(m=new zn(this._pt,t,e,+f||0,s-(f||0),typeof d=="boolean"?rN:nE,0,h),c&&(m.fp=c),o&&m.modifier(o,this,t),this._pt=m):(!d&&!(e in t)&&Np(e,s),jL.call(this,t,e,f,s,h,l||Yn.stringFilter,c))},$L=function(t,e,i,s,r){if(ke(t)&&(t=Bu(t,r,e,i,s)),!vs(t)||t.style&&t.nodeType||Cn(t)||CT(t))return sn(t)?Bu(t,r,e,i,s):t;var a={},o;for(o in t)a[o]=Bu(t[o],r,e,i,s);return a},Sv=function(t,e,i,s,r,a){var o,l,c,u;if(Wn[t]&&(o=new Wn[t]).init(r,o.rawVars?e[t]:$L(e[t],s,r,a,i),i,s,a)!==!1&&(i._pt=l=new zn(i._pt,r,t,0,1,o.render,o,0,o.priority),i!==Al))for(c=i._ptLookup[i._targets.indexOf(r)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Xr,av,bv=function n(t,e,i){var s=t.vars,r=s.ease,a=s.startAt,o=s.immediateRender,l=s.lazy,c=s.onUpdate,u=s.runBackwards,d=s.yoyoEase,f=s.keyframes,h=s.autoRevert,m=t._dur,_=t._startAt,g=t._targets,p=t.parent,v=p&&p.data==="nested"?p.vars.targets:g,y=t._overwrite==="auto"&&!lv,x=t.timeline,M=s.easeReverse||d,w,E,R,b,S,D,k,B,X,V,F,G,O;if(x&&(!f||!r)&&(r="none"),t._ease=Ja(r,zu.ease),t._rEase=M&&(Ja(M)||t._ease),t._from=!x&&!!s.runBackwards,t._from&&(t.ratio=1),!x||f&&!s.stagger){if(B=g[0]?Yr(g[0]).harness:0,G=B&&s[B.prop],w=Cp(s,dv),_&&(_._zTime<0&&_.progress(1),e<0&&u&&o&&!h?_.render(-1,!0):_.revert(u&&m?Tp:AL),_._lazy=0),a){if(Zr(t._startAt=Xe.set(g,fi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&qn(l),startAt:null,delay:0,onUpdate:c&&function(){return ui(t,"onUpdate")},stagger:0},a))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n||!o&&!h)&&t._startAt.revert(Tp),o&&m&&e<=0&&i<=0){e&&(t._zTime=e);return}}else if(u&&m&&!_){if(e&&(o=!1),R=fi({overwrite:!1,data:"isFromStart",lazy:o&&!_&&qn(l),immediateRender:o,stagger:0,parent:p},w),G&&(R[B.prop]=G),Zr(t._startAt=Xe.set(g,R)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n?t._startAt.revert(Tp):t._startAt.render(-1,!0)),t._zTime=e,!o)n(t._startAt,_e,_e);else if(!e)return}for(t._pt=t._ptCache=0,l=m&&qn(l)||l&&!m,E=0;E<g.length;E++){if(S=g[E],k=S._gsap||mv(g)[E]._gsap,t._ptLookup[E]=V={},tv[k.id]&&qr.length&&Rp(),F=v===g?E:v.indexOf(S),B&&(X=new B).init(S,G||w,t,F,v)!==!1&&(t._pt=b=new zn(t._pt,S,X.name,0,1,X.render,X,0,X.priority),X._props.forEach(function(K){V[K]=b}),X.priority&&(D=1)),!B||G)for(R in w)Wn[R]&&(X=Sv(R,w,t,F,S,v))?X.priority&&(D=1):V[R]=b=xv.call(t,S,R,"get",w[R],F,v,0,s.stringFilter);t._op&&t._op[E]&&t.kill(S,t._op[E]),y&&t._pt&&(Xr=t,Ne.killTweensOf(S,V,t.globalTime(e)),O=!t.parent,Xr=0),t._pt&&l&&(tv[k.id]=1)}D&&Av(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!O,f&&e<=0&&x.render(Pi,!0,!0)},tN=function(t,e,i,s,r,a,o,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,d,f,h;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,h=t._targets.length;h--;){if(u=f[h][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return av=1,t.vars[e]="+=0",bv(t,o),av=0,l?Fu(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(s||s===0)&&!r?s:u.s+(s||0)+a*u.c,u.c=i-u.s,d.e&&(d.e=Ve(i)+vn(d.e)),d.b&&(d.b=u.s+vn(d.b))},eN=function(t,e){var i=t[0]?Yr(t[0]).harness:0,s=i&&i.aliases,r,a,o,l;if(!s)return e;r=wl({},e);for(a in s)if(a in r)for(l=s[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},nN=function(t,e,i,s){var r=e.ease||s||"power1.inOut",a,o;if(Cn(e))o=i[t]||(i[t]=[]),e.forEach(function(l,c){return o.push({t:c/(e.length-1)*100,v:l,e:r})});else for(a in e)o=i[a]||(i[a]=[]),a==="ease"||o.push({t:parseFloat(t),v:e[a],e:r})},Bu=function(t,e,i,s,r){return ke(t)?t.call(e,i,s,r):sn(t)&&~t.indexOf("random(")?Ul(t):t},$T=pv+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",tE={};Bn($T+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return tE[n]=1});var Xe=(function(n){wT(t,n);function t(i,s,r,a){var o;typeof s=="number"&&(r.duration=s,s=r,r=null),o=n.call(this,a?s:Pu(s))||this;var l=o.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,m=l.keyframes,_=l.defaults,g=l.scrollTrigger,p=s.parent||Ne,v=(Cn(i)||CT(i)?tr(i[0]):"length"in s)?[i]:Ii(i),y,x,M,w,E,R,b,S;if(o._targets=v.length?mv(v):Fu("GSAP target "+i+" not found. https://gsap.com",!Yn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=h,m||f||Mp(c)||Mp(u)){s=o.vars;var D=s.easeReverse||s.yoyoEase;if(y=o.timeline=new Rn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:v}),y.kill(),y.parent=y._dp=js(o),y._start=0,f||Mp(c)||Mp(u)){if(w=v.length,b=f&&GT(f),vs(f))for(E in f)~$T.indexOf(E)&&(S||(S={}),S[E]=f[E]);for(x=0;x<w;x++)M=Cp(s,tE),M.stagger=0,D&&(M.easeReverse=D),S&&wl(M,S),R=v[x],M.duration=+Bu(c,js(o),x,R,v),M.delay=(+Bu(u,js(o),x,R,v)||0)-o._delay,!f&&w===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),y.to(R,M,b?b(x,R,v):0),y._ease=Kt.none;y.duration()?c=u=0:o.timeline=0}else if(m){Pu(fi(y.vars.defaults,{ease:"none"})),y._ease=Ja(m.ease||s.ease||"none");var k=0,B,X,V;if(Cn(m))m.forEach(function(F){return y.to(v,F,">")}),y.duration();else{M={};for(E in m)E==="ease"||E==="easeEach"||nN(E,m[E],M,m.easeEach);for(E in M)for(B=M[E].sort(function(F,G){return F.t-G.t}),k=0,x=0;x<B.length;x++)X=B[x],V={ease:X.e,duration:(X.t-(x?B[x-1].t:0))/100*c},V[E]=X.v,y.to(v,V,k),k+=V.duration;y.duration()<c&&y.to({},{duration:c-y.duration()})}}c||o.duration(c=y.duration())}else o.timeline=0;return h===!0&&!lv&&(Xr=js(o),Ne.killTweensOf(v),Xr=0),_s(p,js(o),r),s.reversed&&o.reverse(),s.paused&&o.paused(!0),(d||!c&&!m&&o._start===Le(p._time)&&qn(d)&&LL(js(o))&&p.data!=="nested")&&(o._tTime=-_e,o.render(Math.max(0,-u)||0)),g&&FT(js(o),g),o}var e=t.prototype;return e.render=function(s,r,a){var o=this._time,l=this._tDur,c=this._dur,u=s<0,d=s>l-_e&&!u?l:s<_e?0:s,f,h,m,_,g,p,v,y;if(!c)OL(this,s,r,a);else if(d!==this._tTime||!s||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,y=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+s,r,a);if(f=Le(d%_),d===l?(m=this._repeat,f=c):(g=Le(d/_),m=~~g,m&&m===g?(f=c,m--):f>c&&(f=c)),p=this._yoyo&&m&1,p&&(f=c-f),g=Rl(this._tTime,_),f===o&&!a&&this._initted&&m===g)return this._tTime=d,this;m!==g&&this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(Le(_*m),!0).invalidate()._lock=0)}if(!this._initted){if(HT(this,u?s:f,a,r,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&m!==g))return this;if(c!==this._dur)return this.render(s,r,a)}if(this._rEase){var x=f<o;if(x!==this._inv){var M=x?o:c-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(x?-1:1)/M:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(f/c);if(this._from&&(this.ratio=v=1-v),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!r&&!g&&(ui(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(v,h.d),h=h._next;y&&y.render(s<0?s:y._dur*y._ease(f/this._dur),r,a)||this._startAt&&(this._zTime=s),this._onUpdate&&!r&&(u&&ev(this,s,r,a),ui(this,"onUpdate")),this._repeat&&m!==g&&this.vars.onRepeat&&!r&&this.parent&&ui(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&ev(this,s,!0,!0),(s||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Zr(this,1),!r&&!(u&&!o)&&(d||o||p)&&(ui(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),n.prototype.invalidate.call(this,s)},e.resetTo=function(s,r,a,o,l){ku||Xn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||bv(this,c),u=this._ease(c/this._dur),tN(this,s,r,a,o,u,c,l)?this.resetTo(s,r,a,o,1):(Ip(this,0),this.parent||BT(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(s,r){if(r===void 0&&(r="all"),!s&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Nu(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(s,r,Xr&&Xr.vars.overwrite!==!0)._first||Nu(this),this.parent&&a!==this.timeline.totalDuration()&&Cl(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=s?Ii(s):o,c=this._ptLookup,u=this._pt,d,f,h,m,_,g,p;if((!r||r==="all")&&DL(o,l))return r==="all"&&(this._pt=0),Nu(this);for(d=this._op=this._op||[],r!=="all"&&(sn(r)&&(_={},Bn(r,function(v){return _[v]=1}),r=_),r=eN(o,r)),p=o.length;p--;)if(~l.indexOf(o[p])){f=c[p],r==="all"?(d[p]=r,m=f,h={}):(h=d[p]=d[p]||{},m=r);for(_ in m)g=f&&f[_],g&&((!("kill"in g.d)||g.d.kill(_)===!0)&&Op(this,g,"_pt"),delete f[_]),h!=="all"&&(h[_]=1)}return this._initted&&!this._pt&&u&&Nu(this),this},t.to=function(s,r){return new t(s,r,arguments[2])},t.from=function(s,r){return Iu(1,arguments)},t.delayedCall=function(s,r,a,o){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},t.fromTo=function(s,r,a){return Iu(2,arguments)},t.set=function(s,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(s,r)},t.killTweensOf=function(s,r,a){return Ne.killTweensOf(s,r,a)},t})(Vu);fi(Xe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Bn("staggerTo,staggerFrom,staggerFromTo",function(n){Xe[n]=function(){var t=new Rn,e=iv.call(arguments,0);return e.splice(n==="staggerFromTo"?5:4,0,0),t[n].apply(t,e)}});var Mv=function(t,e,i){return t[e]=i},eE=function(t,e,i){return t[e](i)},iN=function(t,e,i,s){return t[e](s.fp,i)},sN=function(t,e,i){return t.setAttribute(e,i)},Bp=function(t,e){return ke(t[e])?eE:Lp(t[e])&&t.setAttribute?sN:Mv},nE=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},rN=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Tv=function(t,e){var i=e._pt,s="";if(!t&&e.b)s=e.b;else if(t===1&&e.e)s=e.e;else{for(;i;)s=i.p+(i.m?i.m(i.s+i.c*t):Math.round((i.s+i.c*t)*1e4)/1e4)+s,i=i._next;s+=e.c}e.set(e.t,e.p,s,e)},Ev=function(t,e){for(var i=e._pt;i;)i.r(t,i.d),i=i._next},aN=function(t,e,i,s){for(var r=this._pt,a;r;)a=r._next,r.p===s&&r.modifier(t,e,i),r=a},oN=function(t){for(var e=this._pt,i,s;e;)s=e._next,e.p===t&&!e.op||e.op===t?Op(this,e,"_pt"):e.dep||(i=1),e=s;return!i},lN=function(t,e,i,s){s.mSet(t,e,s.m.call(s.tween,i,s.mt),s)},Av=function(t){for(var e=t._pt,i,s,r,a;e;){for(i=e._next,s=r;s&&s.pr>e.pr;)s=s._next;(e._prev=s?s._prev:a)?e._prev._next=e:r=e,(e._next=s)?s._prev=e:a=e,e=i}t._pt=r},zn=(function(){function n(e,i,s,r,a,o,l,c,u){this.t=i,this.s=r,this.c=a,this.p=s,this.r=o||nE,this.d=l||this,this.set=c||Mv,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=n.prototype;return t.modifier=function(i,s,r){this.mSet=this.mSet||this.set,this.set=lN,this.m=i,this.mt=r,this.tween=s},n})();Bn(pv+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(n){return dv[n]=1});hi.TweenMax=hi.TweenLite=Xe;hi.TimelineLite=hi.TimelineMax=Rn;Ne=new Rn({sortChildren:!1,defaults:zu,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Yn.stringFilter=vv;var ja=[],Ap={},cN=[],AT=0,uN=0,K_=function(t){return(Ap[t]||cN).map(function(e){return e()})},ov=function(){var t=Date.now(),e=[];t-AT>2&&(K_("matchMediaInit"),ja.forEach(function(i){var s=i.queries,r=i.conditions,a,o,l,c;for(o in s)a=gs.matchMedia(s[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(i.revert(),l&&e.push(i))}),K_("matchMediaRevert"),e.forEach(function(i){return i.onMatch(i,function(s){return i.add(null,s)})}),AT=t,K_("matchMedia"))},iE=(function(){function n(e,i){this.selector=i&&sv(i),this.data=[],this._r=[],this.isReverted=!1,this.id=uN++,e&&this.add(e)}var t=n.prototype;return t.add=function(i,s,r){ke(i)&&(r=s,s=i,i=ke);var a=this,o=function(){var c=Ae,u=a.selector,d;return c&&c!==a&&c.data.push(a),r&&(a.selector=sv(r)),Ae=a,d=s.apply(a,arguments),ke(d)&&a._r.push(d),Ae=c,a.selector=u,a.isReverted=!1,d};return a.last=o,i===ke?o(a,function(l){return a.add(null,l)}):i?a[i]=o:o},t.ignore=function(i){var s=Ae;Ae=null,i(this),Ae=s},t.getTweens=function(){var i=[];return this.data.forEach(function(s){return s instanceof n?i.push.apply(i,s.getTweens()):s instanceof Xe&&!(s.parent&&s.parent.data==="nested")&&i.push(s)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,s){var r=this;if(i?(function(){for(var o=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=r.data.length;l--;)c=r.data[l],c instanceof Rn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Xe)&&c.revert&&c.revert(i);r._r.forEach(function(u){return u(i,r)}),r.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),s)for(var a=ja.length;a--;)ja[a].id===this.id&&ja.splice(a,1)},t.revert=function(i){this.kill(i||{})},n})(),hN=(function(){function n(e){this.contexts=[],this.scope=e,Ae&&Ae.data.push(this)}var t=n.prototype;return t.add=function(i,s,r){vs(i)||(i={matches:i});var a=new iE(0,r||this.scope),o=a.conditions={},l,c,u;Ae&&!a.selector&&(a.selector=Ae.selector),this.contexts.push(a),s=a.add("onMatch",s),a.queries=i;for(c in i)c==="all"?u=1:(l=gs.matchMedia(i[c]),l&&(ja.indexOf(a)<0&&ja.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(ov):l.addEventListener("change",ov)));return u&&s(a,function(d){return a.add(null,d)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(s){return s.kill(i,!0)})},n})(),Up={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e.forEach(function(s){return QT(s)})},timeline:function(t){return new Rn(t)},getTweensOf:function(t,e){return Ne.getTweensOf(t,e)},getProperty:function(t,e,i,s){sn(t)&&(t=Ii(t)[0]);var r=Yr(t||{}).get,a=i?IT:PT;return i==="native"&&(i=""),t&&(e?a((Wn[e]&&Wn[e].get||r)(t,e,i,s)):function(o,l,c){return a((Wn[o]&&Wn[o].get||r)(t,o,l,c))})},quickSetter:function(t,e,i){if(t=Ii(t),t.length>1){var s=t.map(function(u){return Dn.quickSetter(u,e,i)}),r=s.length;return function(u){for(var d=r;d--;)s[d](u)}}t=t[0]||{};var a=Wn[e],o=Yr(t),l=o.harness&&(o.harness.aliases||{})[e]||e,c=a?function(u){var d=new a;Al._pt=0,d.init(t,i?u+i:u,Al,0,[t]),d.render(1,d),Al._pt&&Ev(1,Al)}:o.set(t,l);return a?c:function(u){return c(t,l,i?u+i:u,o,1)}},quickTo:function(t,e,i){var s,r=Dn.to(t,fi((s={},s[e]="+=0.1",s.paused=!0,s.stagger=0,s),i||{})),a=function(l,c,u){return r.resetTo(e,l,c,u)};return a.tween=r,a},isTweening:function(t){return Ne.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ja(t.ease,zu.ease)),ST(zu,t||{})},config:function(t){return ST(Yn,t||{})},registerEffect:function(t){var e=t.name,i=t.effect,s=t.plugins,r=t.defaults,a=t.extendTimeline;(s||"").split(",").forEach(function(o){return o&&!Wn[o]&&!hi[o]&&Fu(e+" effect requires "+o+" plugin.")}),q_[e]=function(o,l,c){return i(Ii(o),fi(l||{},r),c)},a&&(Rn.prototype[e]=function(o,l,c){return this.add(q_[e](o,vs(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){Kt[t]=Ja(e)},parseEase:function(t,e){return arguments.length?Ja(t,e):Kt},getById:function(t){return Ne.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var i=new Rn(t),s,r;for(i.smoothChildTiming=qn(t.smoothChildTiming),Ne.remove(i),i._dp=0,i._time=i._tTime=Ne._time,s=Ne._first;s;)r=s._next,(e||!(!s._dur&&s instanceof Xe&&s.vars.onComplete===s._targets[0]))&&_s(i,s,s._start-s._delay),s=r;return _s(Ne,i,0),i},context:function(t,e){return t?new iE(t,e):Ae},matchMedia:function(t){return new hN(t)},matchMediaRefresh:function(){return ja.forEach(function(t){var e=t.conditions,i,s;for(s in e)e[s]&&(e[s]=!1,i=1);i&&t.revert()})||ov()},addEventListener:function(t,e){var i=Ap[t]||(Ap[t]=[]);~i.indexOf(e)||i.push(e)},removeEventListener:function(t,e){var i=Ap[t],s=i&&i.indexOf(e);s>=0&&i.splice(s,1)},utils:{wrap:VL,wrapYoyo:GL,distribute:GT,random:XT,snap:WT,normalize:kL,getUnit:vn,clamp:BL,splitColor:KT,toArray:Ii,selector:sv,mapRange:YT,pipe:FL,unitize:HL,interpolate:WL,shuffle:VT},install:UT,effects:q_,ticker:Xn,updateRoot:Rn.updateRoot,plugins:Wn,globalTimeline:Ne,core:{PropTween:zn,globals:LT,Tween:Xe,Timeline:Rn,Animation:Vu,getCache:Yr,_removeLinkedListItem:Op,reverting:function(){return _n},context:function(t){return t&&Ae&&(Ae.data.push(t),t._ctx=Ae),Ae},suppressOverwrites:function(t){return lv=t}}};Bn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Up[n]=Xe[n]});Xn.add(Rn.updateRoot);Al=Up.to({},{duration:0});var fN=function(t,e){for(var i=t._pt;i&&i.p!==e&&i.op!==e&&i.fp!==e;)i=i._next;return i},dN=function(t,e){var i=t._targets,s,r,a;for(s in e)for(r=i.length;r--;)a=t._ptLookup[r][s],a&&(a=a.d)&&(a._pt&&(a=fN(a,s)),a&&a.modifier&&a.modifier(e[s],t,i[r],s))},J_=function(t,e){return{name:t,headless:1,rawVars:1,init:function(s,r,a){a._onInit=function(o){var l,c;if(sn(r)&&(l={},Bn(r,function(u){return l[u]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}dN(o,r)}}}},Dn=Up.registerPlugin({name:"attr",init:function(t,e,i,s,r){var a,o,l;this.tween=i;for(a in e)l=t.getAttribute(a)||"",o=this.add(t,"setAttribute",(l||0)+"",e[a],s,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(t,e){for(var i=e._pt;i;)_n?i.set(i.t,i.p,i.b,i):i.r(t,i.d),i=i._next}},{name:"endArray",headless:1,init:function(t,e){for(var i=e.length;i--;)this.add(t,i,t[i]||0,e[i],0,0,0,0,0,1)}},J_("roundProps",rv),J_("modifiers"),J_("snap",WT))||Up;Xe.version=Rn.version=Dn.version="3.15.0";DT=1;cv()&&Dl();var pN=Kt.Power0,mN=Kt.Power1,gN=Kt.Power2,_N=Kt.Power3,vN=Kt.Power4,yN=Kt.Linear,xN=Kt.Quad,SN=Kt.Cubic,bN=Kt.Quart,MN=Kt.Quint,TN=Kt.Strong,EN=Kt.Elastic,AN=Kt.Back,wN=Kt.SteppedEase,RN=Kt.Bounce,CN=Kt.Sine,DN=Kt.Expo,UN=Kt.Circ;var sE,Kr,Nl,Lv,ro,LN,rE,Nv,NN=function(){return typeof window<"u"},nr={},so=180/Math.PI,Ol=Math.PI/180,Ll=Math.atan2,aE=1e8,Ov=/([A-Z])/g,ON=/(left|right|width|margin|padding|x)/i,PN=/[\s,\(]\S/,ys={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Rv=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},IN=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},BN=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},zN=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},FN=function(t,e){var i=e.s+e.c*t;e.set(e.t,e.p,~~(i+(i<0?-.5:.5))+e.u,e)},pE=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},mE=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},HN=function(t,e,i){return t.style[e]=i},kN=function(t,e,i){return t.style.setProperty(e,i)},VN=function(t,e,i){return t._gsap[e]=i},GN=function(t,e,i){return t._gsap.scaleX=t._gsap.scaleY=i},WN=function(t,e,i,s,r){var a=t._gsap;a.scaleX=a.scaleY=i,a.renderTransform(r,a)},XN=function(t,e,i,s,r){var a=t._gsap;a[e]=i,a.renderTransform(r,a)},Oe="transform",Zn=Oe+"Origin",qN=function n(t,e){var i=this,s=this.target,r=s.style,a=s._gsap;if(t in nr&&r){if(this.tfm=this.tfm||{},t!=="transform")t=ys[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return i.tfm[o]=er(s,o)}):this.tfm[t]=a.x?a[t]:er(s,t),t===Zn&&(this.tfm.zOrigin=a.zOrigin);else return ys.transform.split(",").forEach(function(o){return n.call(i,o,e)});if(this.props.indexOf(Oe)>=0)return;a.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(Zn,e,"")),t=Oe}(r||e)&&this.props.push(t,e,r[t])},gE=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},YN=function(){var t=this.props,e=this.target,i=e.style,s=e._gsap,r,a;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?i[t[r]]=t[r+2]:i.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Ov,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)s[a]=this.tfm[a];s.svg&&(s.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Nv(),(!r||!r.isStart)&&!i[Oe]&&(gE(i),s.zOrigin&&i[Zn]&&(i[Zn]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},_E=function(t,e){var i={target:t,props:[],revert:YN,save:qN};return t._gsap||Dn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(s){return i.save(s)}),i},vE,Cv=function(t,e){var i=Kr.createElementNS?Kr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Kr.createElement(t);return i&&i.style?i:Kr.createElement(t)},di=function n(t,e,i){var s=getComputedStyle(t);return s[e]||s.getPropertyValue(e.replace(Ov,"-$1").toLowerCase())||s.getPropertyValue(e)||!i&&n(t,Pl(e)||e,1)||""},oE="O,Moz,ms,Ms,Webkit".split(","),Pl=function(t,e,i){var s=e||ro,r=s.style,a=5;if(t in r&&!i)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);a--&&!(oE[a]+t in r););return a<0?null:(a===3?"ms":a>=0?oE[a]:"")+t},Dv=function(){NN()&&window.document&&(sE=window,Kr=sE.document,Nl=Kr.documentElement,ro=Cv("div")||{style:{}},LN=Cv("div"),Oe=Pl(Oe),Zn=Oe+"Origin",ro.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",vE=!!Pl("perspective"),Nv=Dn.core.reverting,Lv=1)},lE=function(t){var e=t.ownerSVGElement,i=Cv("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=t.cloneNode(!0),r;s.style.display="block",i.appendChild(s),Nl.appendChild(i);try{r=s.getBBox()}catch{}return i.removeChild(s),Nl.removeChild(i),r},cE=function(t,e){for(var i=e.length;i--;)if(t.hasAttribute(e[i]))return t.getAttribute(e[i])},yE=function(t){var e,i;try{e=t.getBBox()}catch{e=lE(t),i=1}return e&&(e.width||e.height)||i||(e=lE(t)),e&&!e.width&&!e.x&&!e.y?{x:+cE(t,["x","cx","x1"])||0,y:+cE(t,["y","cy","y1"])||0,width:0,height:0}:e},xE=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&yE(t))},jr=function(t,e){if(e){var i=t.style,s;e in nr&&e!==Zn&&(e=Oe),i.removeProperty?(s=e.substr(0,2),(s==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),i.removeProperty(s==="--"?e:e.replace(Ov,"-$1").toLowerCase())):i.removeAttribute(e)}},Jr=function(t,e,i,s,r,a){var o=new zn(t._pt,e,i,0,1,a?mE:pE);return t._pt=o,o.b=s,o.e=r,t._props.push(i),o},uE={deg:1,rad:1,turn:1},ZN={grid:1,flex:1},$r=function n(t,e,i,s){var r=parseFloat(i)||0,a=(i+"").trim().substr((r+"").length)||"px",o=ro.style,l=ON.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=s==="px",h=s==="%",m,_,g,p;if(s===a||!r||uE[s]||uE[a])return r;if(a!=="px"&&!f&&(r=n(t,e,i,"px")),p=t.getCTM&&xE(t),(h||a==="%")&&(nr[e]||~e.indexOf("adius")))return m=p?t.getBBox()[l?"width":"height"]:t[u],Ve(h?r/m*d:r/100*m);if(o[l?"width":"height"]=d+(f?a:s),_=s!=="rem"&&~e.indexOf("adius")||s==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Kr||!_.appendChild)&&(_=Kr.body),g=_._gsap,g&&h&&g.width&&l&&g.time===Xn.time&&!g.uncache)return Ve(r/g.width*d);if(h&&(e==="height"||e==="width")){var v=t.style[e];t.style[e]=d+s,m=t[u],v?t.style[e]=v:jr(t,e)}else(h||a==="%")&&!ZN[di(_,"display")]&&(o.position=di(t,"position")),_===t&&(o.position="static"),_.appendChild(ro),m=ro[u],_.removeChild(ro),o.position="absolute";return l&&h&&(g=Yr(_),g.time=Xn.time,g.width=_[u]),Ve(f?m*r/d:m&&r?d/m*r:0)},er=function(t,e,i,s){var r;return Lv||Dv(),e in ys&&e!=="transform"&&(e=ys[e],~e.indexOf(",")&&(e=e.split(",")[0])),nr[e]&&e!=="transform"?(r=qu(t,s),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Fp(di(t,Zn))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||s||~(r+"").indexOf("calc("))&&(r=zp[e]&&zp[e](t,e,i)||di(t,e)||gv(t,e)||(e==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?$r(t,e,r,i)+i:r},QN=function(t,e,i,s){if(!i||i==="none"){var r=Pl(e,t,1),a=r&&di(t,r,1);a&&a!==i?(e=r,i=a):e==="borderColor"&&(i=di(t,"borderTopColor"))}var o=new zn(this._pt,t.style,e,0,1,Tv),l=0,c=0,u,d,f,h,m,_,g,p,v,y,x,M;if(o.b=i,o.e=s,i+="",s+="",s.substring(0,6)==="var(--"&&(s=di(t,s.substring(4,s.indexOf(")")))),s==="auto"&&(_=t.style[e],t.style[e]=s,s=di(t,e)||s,_?t.style[e]=_:jr(t,e)),u=[i,s],vv(u),i=u[0],s=u[1],f=i.match($a)||[],M=s.match($a)||[],M.length){for(;d=$a.exec(s);)g=d[0],v=s.substring(l,d.index),m?m=(m+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(m=1),g!==(_=f[c++]||"")&&(h=parseFloat(_)||0,x=_.substr((h+"").length),g.charAt(1)==="="&&(g=to(h,g)+x),p=parseFloat(g),y=g.substr((p+"").length),l=$a.lastIndex-y.length,y||(y=y||Yn.units[e]||x,l===s.length&&(s+=y,o.e+=y)),x!==y&&(h=$r(t,e,_,y)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:h,c:p-h,m:m&&m<4||e==="zIndex"?Math.round:0});o.c=l<s.length?s.substring(l,s.length):""}else o.r=e==="display"&&s==="none"?mE:pE;return hv.test(s)&&(o.e=0),this._pt=o,o},hE={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},KN=function(t){var e=t.split(" "),i=e[0],s=e[1]||"50%";return(i==="top"||i==="bottom"||s==="left"||s==="right")&&(t=i,i=s,s=t),e[0]=hE[i]||i,e[1]=hE[s]||s,e.join(" ")},JN=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var i=e.t,s=i.style,r=e.u,a=i._gsap,o,l,c;if(r==="all"||r===!0)s.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],nr[o]&&(l=1,o=o==="transformOrigin"?Zn:Oe),jr(i,o);l&&(jr(i,Oe),a&&(a.svg&&i.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",qu(i,1),a.uncache=1,gE(s)))}},zp={clearProps:function(t,e,i,s,r){if(r.data!=="isFromStart"){var a=t._pt=new zn(t._pt,e,i,0,0,JN);return a.u=s,a.pr=-10,a.tween=r,t._props.push(i),1}}},Xu=[1,0,0,1,0,0],SE={},bE=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},fE=function(t){var e=di(t,Oe);return bE(e)?Xu:e.substr(7).match(uv).map(Ve)},Pv=function(t,e){var i=t._gsap||Yr(t),s=t.style,r=fE(t),a,o,l,c;return i.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Xu:r):(r===Xu&&!t.offsetParent&&t!==Nl&&!i.svg&&(l=s.display,s.display="block",a=t.parentNode,(!a||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,o=t.nextElementSibling,Nl.appendChild(t)),r=fE(t),l?s.display=l:jr(t,"display"),c&&(o?a.insertBefore(t,o):a?a.appendChild(t):Nl.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Uv=function(t,e,i,s,r,a){var o=t._gsap,l=r||Pv(t,!0),c=o.xOrigin||0,u=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,h=l[0],m=l[1],_=l[2],g=l[3],p=l[4],v=l[5],y=e.split(" "),x=parseFloat(y[0])||0,M=parseFloat(y[1])||0,w,E,R,b;i?l!==Xu&&(E=h*g-m*_)&&(R=x*(g/E)+M*(-_/E)+(_*v-g*p)/E,b=x*(-m/E)+M*(h/E)-(h*v-m*p)/E,x=R,M=b):(w=yE(t),x=w.x+(~y[0].indexOf("%")?x/100*w.width:x),M=w.y+(~(y[1]||y[0]).indexOf("%")?M/100*w.height:M)),s||s!==!1&&o.smooth?(p=x-c,v=M-u,o.xOffset=d+(p*h+v*_)-p,o.yOffset=f+(p*m+v*g)-v):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=M,o.smooth=!!s,o.origin=e,o.originIsAbsolute=!!i,t.style[Zn]="0px 0px",a&&(Jr(a,o,"xOrigin",c,x),Jr(a,o,"yOrigin",u,M),Jr(a,o,"xOffset",d,o.xOffset),Jr(a,o,"yOffset",f,o.yOffset)),t.setAttribute("data-svg-origin",x+" "+M)},qu=function(t,e){var i=t._gsap||new yv(t);if("x"in i&&!e&&!i.uncache)return i;var s=t.style,r=i.scaleX<0,a="px",o="deg",l=getComputedStyle(t),c=di(t,Zn)||"0",u,d,f,h,m,_,g,p,v,y,x,M,w,E,R,b,S,D,k,B,X,V,F,G,O,K,et,nt,lt,Rt,z,J;return u=d=f=_=g=p=v=y=x=0,h=m=1,i.svg=!!(t.getCTM&&xE(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(s[Oe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Oe]!=="none"?l[Oe]:"")),s.scale=s.rotate=s.translate="none"),E=Pv(t,i.svg),i.svg&&(i.uncache?(O=t.getBBox(),c=i.xOrigin-O.x+"px "+(i.yOrigin-O.y)+"px",G=""):G=!e&&t.getAttribute("data-svg-origin"),Uv(t,G||c,!!G||i.originIsAbsolute,i.smooth!==!1,E)),M=i.xOrigin||0,w=i.yOrigin||0,E!==Xu&&(D=E[0],k=E[1],B=E[2],X=E[3],u=V=E[4],d=F=E[5],E.length===6?(h=Math.sqrt(D*D+k*k),m=Math.sqrt(X*X+B*B),_=D||k?Ll(k,D)*so:0,v=B||X?Ll(B,X)*so+_:0,v&&(m*=Math.abs(Math.cos(v*Ol))),i.svg&&(u-=M-(M*D+w*B),d-=w-(M*k+w*X))):(J=E[6],Rt=E[7],et=E[8],nt=E[9],lt=E[10],z=E[11],u=E[12],d=E[13],f=E[14],R=Ll(J,lt),g=R*so,R&&(b=Math.cos(-R),S=Math.sin(-R),G=V*b+et*S,O=F*b+nt*S,K=J*b+lt*S,et=V*-S+et*b,nt=F*-S+nt*b,lt=J*-S+lt*b,z=Rt*-S+z*b,V=G,F=O,J=K),R=Ll(-B,lt),p=R*so,R&&(b=Math.cos(-R),S=Math.sin(-R),G=D*b-et*S,O=k*b-nt*S,K=B*b-lt*S,z=X*S+z*b,D=G,k=O,B=K),R=Ll(k,D),_=R*so,R&&(b=Math.cos(R),S=Math.sin(R),G=D*b+k*S,O=V*b+F*S,k=k*b-D*S,F=F*b-V*S,D=G,V=O),g&&Math.abs(g)+Math.abs(_)>359.9&&(g=_=0,p=180-p),h=Ve(Math.sqrt(D*D+k*k+B*B)),m=Ve(Math.sqrt(F*F+J*J)),R=Ll(V,F),v=Math.abs(R)>2e-4?R*so:0,x=z?1/(z<0?-z:z):0),i.svg&&(G=t.getAttribute("transform"),i.forceCSS=t.setAttribute("transform","")||!bE(di(t,Oe)),G&&t.setAttribute("transform",G))),Math.abs(v)>90&&Math.abs(v)<270&&(r?(h*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(m*=-1,v+=v<=0?180:-180)),e=e||i.uncache,i.x=u-((i.xPercent=u&&(!e&&i.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*i.xPercent/100:0)+a,i.y=d-((i.yPercent=d&&(!e&&i.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*i.yPercent/100:0)+a,i.z=f+a,i.scaleX=Ve(h),i.scaleY=Ve(m),i.rotation=Ve(_)+o,i.rotationX=Ve(g)+o,i.rotationY=Ve(p)+o,i.skewX=v+o,i.skewY=y+o,i.transformPerspective=x+a,(i.zOrigin=parseFloat(c.split(" ")[2])||!e&&i.zOrigin||0)&&(s[Zn]=Fp(c)),i.xOffset=i.yOffset=0,i.force3D=Yn.force3D,i.renderTransform=i.svg?$N:vE?ME:jN,i.uncache=0,i},Fp=function(t){return(t=t.split(" "))[0]+" "+t[1]},wv=function(t,e,i){var s=vn(e);return Ve(parseFloat(e)+parseFloat($r(t,"x",i+"px",s)))+s},jN=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,ME(t,e)},no="0deg",Wu="0px",io=") ",ME=function(t,e){var i=e||this,s=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.z,c=i.rotation,u=i.rotationY,d=i.rotationX,f=i.skewX,h=i.skewY,m=i.scaleX,_=i.scaleY,g=i.transformPerspective,p=i.force3D,v=i.target,y=i.zOrigin,x="",M=p==="auto"&&t&&t!==1||p===!0;if(y&&(d!==no||u!==no)){var w=parseFloat(u)*Ol,E=Math.sin(w),R=Math.cos(w),b;w=parseFloat(d)*Ol,b=Math.cos(w),a=wv(v,a,E*b*-y),o=wv(v,o,-Math.sin(w)*-y),l=wv(v,l,R*b*-y+y)}g!==Wu&&(x+="perspective("+g+io),(s||r)&&(x+="translate("+s+"%, "+r+"%) "),(M||a!==Wu||o!==Wu||l!==Wu)&&(x+=l!==Wu||M?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+io),c!==no&&(x+="rotate("+c+io),u!==no&&(x+="rotateY("+u+io),d!==no&&(x+="rotateX("+d+io),(f!==no||h!==no)&&(x+="skew("+f+", "+h+io),(m!==1||_!==1)&&(x+="scale("+m+", "+_+io),v.style[Oe]=x||"translate(0, 0)"},$N=function(t,e){var i=e||this,s=i.xPercent,r=i.yPercent,a=i.x,o=i.y,l=i.rotation,c=i.skewX,u=i.skewY,d=i.scaleX,f=i.scaleY,h=i.target,m=i.xOrigin,_=i.yOrigin,g=i.xOffset,p=i.yOffset,v=i.forceCSS,y=parseFloat(a),x=parseFloat(o),M,w,E,R,b;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ol,c*=Ol,M=Math.cos(l)*d,w=Math.sin(l)*d,E=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(u*=Ol,b=Math.tan(c-u),b=Math.sqrt(1+b*b),E*=b,R*=b,u&&(b=Math.tan(u),b=Math.sqrt(1+b*b),M*=b,w*=b)),M=Ve(M),w=Ve(w),E=Ve(E),R=Ve(R)):(M=d,R=f,w=E=0),(y&&!~(a+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(y=$r(h,"x",a,"px"),x=$r(h,"y",o,"px")),(m||_||g||p)&&(y=Ve(y+m-(m*M+_*E)+g),x=Ve(x+_-(m*w+_*R)+p)),(s||r)&&(b=h.getBBox(),y=Ve(y+s/100*b.width),x=Ve(x+r/100*b.height)),b="matrix("+M+","+w+","+E+","+R+","+y+","+x+")",h.setAttribute("transform",b),v&&(h.style[Oe]=b)},tO=function(t,e,i,s,r){var a=360,o=sn(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?so:1),c=l-s,u=s+c+"deg",d,f;return o&&(d=r.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*aE)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*aE)%a-~~(c/a)*a)),t._pt=f=new zn(t._pt,e,i,s,c,IN),f.e=u,f.u="deg",t._props.push(i),f},dE=function(t,e){for(var i in e)t[i]=e[i];return t},eO=function(t,e,i){var s=dE({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=i.style,o,l,c,u,d,f,h,m;s.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),a[Oe]=e,o=qu(i,1),jr(i,Oe),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Oe],a[Oe]=e,o=qu(i,1),a[Oe]=c);for(l in nr)c=s[l],u=o[l],c!==u&&r.indexOf(l)<0&&(h=vn(c),m=vn(u),d=h!==m?$r(i,l,c,m):parseFloat(c),f=parseFloat(u),t._pt=new zn(t._pt,o,l,d,f-d,Rv),t._pt.u=m||0,t._props.push(l));dE(o,s)};Bn("padding,margin,Width,Radius",function(n,t){var e="Top",i="Right",s="Bottom",r="Left",a=(t<3?[e,i,s,r]:[e+r,e+i,s+i,s+r]).map(function(o){return t<2?n+o:"border"+o+n});zp[t>1?"border"+n:n]=function(o,l,c,u,d){var f,h;if(arguments.length<4)return f=a.map(function(m){return er(o,m,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},a.forEach(function(m,_){return h[m]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(l,h,d)}});var Iv={name:"css",register:Dv,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,i,s,r){var a=this._props,o=t.style,l=i.vars.startAt,c,u,d,f,h,m,_,g,p,v,y,x,M,w,E,R,b;Lv||Dv(),this.styles=this.styles||_E(t),R=this.styles.props,this.tween=i;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(Wn[_]&&Sv(_,e,i,s,t,r)))){if(h=typeof u,m=zp[_],h==="function"&&(u=u.call(i,s,t,r),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Ul(u)),m)m(this,t,_,u,i)&&(E=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",$s.lastIndex=0,$s.test(c)||(g=vn(c),p=vn(u),p?g!==p&&(c=$r(t,_,c,p)+p):g&&(u+=g)),this.add(o,"setProperty",c,u,s,r,0,0,_),a.push(_),R.push(_,0,o[_]);else if(h!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(i,s,t,r):l[_],sn(c)&&~c.indexOf("random(")&&(c=Ul(c)),vn(c+"")||c==="auto"||(c+=Yn.units[_]||vn(er(t,_))||""),(c+"").charAt(1)==="="&&(c=er(t,_))):c=er(t,_),f=parseFloat(c),v=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),v&&(u=u.substr(2)),d=parseFloat(u),_ in ys&&(_==="autoAlpha"&&(f===1&&er(t,"visibility")==="hidden"&&d&&(f=0),R.push("visibility",0,o.visibility),Jr(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=ys[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in nr,y){if(this.styles.save(_),b=u,h==="string"&&u.substring(0,6)==="var(--"){if(u=di(t,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var S=t.style.perspective;t.style.perspective=u,u=di(t,"perspective"),S?t.style.perspective=S:jr(t,"perspective")}d=parseFloat(u)}if(x||(M=t._gsap,M.renderTransform&&!e.parseTransform||qu(t,e.parseTransform),w=e.smoothOrigin!==!1&&M.smooth,x=this._pt=new zn(this._pt,o,Oe,0,1,M.renderTransform,M,0,-1),x.dep=1),_==="scale")this._pt=new zn(this._pt,M,"scaleY",M.scaleY,(v?to(M.scaleY,v+d):d)-M.scaleY||0,Rv),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Zn,0,o[Zn]),u=KN(u),M.svg?Uv(t,u,0,w,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Jr(this,M,"zOrigin",M.zOrigin,p),Jr(this,o,_,Fp(c),Fp(u)));continue}else if(_==="svgOrigin"){Uv(t,u,1,w,0,this);continue}else if(_ in SE){tO(this,M,_,f,v?to(f,v+u):u);continue}else if(_==="smoothOrigin"){Jr(this,M,"smooth",M.smooth,u);continue}else if(_==="force3D"){M[_]=u;continue}else if(_==="transform"){eO(this,u,t);continue}}else _ in o||(_=Pl(_)||_);if(y||(d||d===0)&&(f||f===0)&&!PN.test(u)&&_ in o)g=(c+"").substr((f+"").length),d||(d=0),p=vn(u)||(_ in Yn.units?Yn.units[_]:g),g!==p&&(f=$r(t,_,c,p)),this._pt=new zn(this._pt,y?M:o,_,f,(v?to(f,v+d):d)-f,!y&&(p==="px"||_==="zIndex")&&e.autoRound!==!1?FN:Rv),this._pt.u=p||0,y&&b!==u?(this._pt.b=c,this._pt.e=b,this._pt.r=zN):g!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=BN);else if(_ in o)QN.call(this,t,_,c,v?v+u:u);else if(_ in t)this.add(t,_,c||t[_],v?v+u:u,s,r);else if(_!=="parseTransform"){Np(_,u);continue}y||(_ in o?R.push(_,0,o[_]):typeof t[_]=="function"?R.push(_,2,t[_]()):R.push(_,1,c||t[_])),a.push(_)}}E&&Av(this)},render:function(t,e){if(e.tween._time||!Nv())for(var i=e._pt;i;)i.r(t,i.d),i=i._next;else e.styles.revert()},get:er,aliases:ys,getSetter:function(t,e,i){var s=ys[e];return s&&s.indexOf(",")<0&&(e=s),e in nr&&e!==Zn&&(t._gsap.x||er(t,"x"))?i&&rE===i?e==="scale"?GN:VN:(rE=i||{})&&(e==="scale"?WN:XN):t.style&&!Lp(t.style[e])?HN:~e.indexOf("-")?kN:Bp(t,e)},core:{_removeProperty:jr,_getMatrix:Pv}};Dn.utils.checkPrefix=Pl;Dn.core.getStyleSaver=_E;(function(n,t,e,i){var s=Bn(n+","+t+","+e,function(r){nr[r]=1});Bn(t,function(r){Yn.units[r]="deg",SE[r]=1}),ys[s[13]]=n+","+t,Bn(i,function(r){var a=r.split(":");ys[a[1]]=s[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Bn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Yn.units[n]="px"});Dn.registerPlugin(Iv);var Yu=Dn.registerPlugin(Iv)||Dn,KB=Yu.core.Tween;var Hp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Qi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},nO=new yl(-1,1,1,-1,0,1),Bv=class extends In{constructor(){super(),this.setAttribute("position",new tn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new tn([0,2,0,0,2,0],2))}},iO=new Bv,Il=class{constructor(t){this._mesh=new un(iO,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,nO)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var kp=class extends Qi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Xa.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Il(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Zu=class extends Qi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Vp=class extends Qi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Gp=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new mt);this._width=i.width,this._height=i.height,e=new An(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Li}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new kp(Hp),this.copyPass.material.blending=Zi,this.clock=new Tu}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Zu!==void 0&&(a instanceof Zu?i=!0:a instanceof Vp&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new mt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Wp=class extends Qi{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new zt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var TE={name:"LuminosityHighPassShader",shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new zt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var Bl=class n extends Qi{constructor(t,e,i,s){super(),this.strength=e!==void 0?e:1,this.radius=i,this.threshold=s,this.resolution=t!==void 0?new mt(t.x,t.y):new mt(256,256),this.clearColor=new zt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new An(r,a,{type:Li}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){let f=new An(r,a,{type:Li});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);let h=new An(r,a,{type:Li});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),a=Math.round(a/2)}let o=TE;this.highPassUniforms=Xa.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeparableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new mt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;let u=Hp;this.copyUniforms=Xa.clone(u.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Qs,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new zt,this.oldClearAlpha=1,this.basic=new Zs,this.fsQuad=new Il(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(i,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(i,s),this.renderTargetsVertical[r].setSize(i,s),this.separableBlurMaterials[r].uniforms.invSize.value=new mt(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2)}render(t,e,i,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=i.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=n.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(i),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeparableBlurMaterial(t){let e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new mt(.5,.5)},direction:{value:new mt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}};Bl.BlurDirectionX=new mt(1,0);Bl.BlurDirectionY=new mt(0,1);var re=$i(ao(),1);function RE({lang:n}){let t=(0,Ki.useRef)(null),e=(0,Ki.useRef)(null),i=(0,Ki.useRef)(null),s=(0,Ki.useRef)({scene:null,camera:null,renderer:null,composer:null,stars:[],mountains:[],nebula:null}),[r,a]=(0,Ki.useState)(0),[o,l]=(0,Ki.useState)(!0),c=n==="ar";(0,Ki.useEffect)(()=>{let f=innerWidth<700,h=matchMedia("(prefers-reduced-motion: reduce)").matches,m=s.current,_;try{_=new Sp({canvas:e.current,antialias:!f,alpha:!0,powerPreference:"low-power"})}catch{l(!1);return}m.renderer=_,_.setPixelRatio(Math.min(devicePixelRatio,f?1.25:1.5)),_.setSize(innerWidth,innerHeight),_.toneMapping=Od,_.toneMappingExposure=.5,m.scene=new cu,m.scene.fog=new lu(0,25e-5),m.camera=new En(75,innerWidth/innerHeight,.1,2200),m.camera.position.set(0,30,300),m.composer=new Gp(_),m.composer.addPass(new Wp(m.scene,m.camera)),f||m.composer.addPass(new Bl(new mt(innerWidth,innerHeight),.8,.4,.85));let g=()=>{let{current:V}=s,F=f?1e3:2400;for(let G=0;G<3;G++){let O=new In,K=new Float32Array(F*3),et=new Float32Array(F*3),nt=new Float32Array(F);for(let z=0;z<F;z++){let J=200+Math.random()*800,ct=Math.random()*Math.PI*2,rt=Math.acos(Math.random()*2-1);K[z*3]=J*Math.sin(rt)*Math.cos(ct),K[z*3+1]=J*Math.sin(rt)*Math.sin(ct),K[z*3+2]=J*Math.cos(rt);let ht=new zt,Ot=Math.random();Ot<.7?ht.setHSL(0,0,.8+Math.random()*.2):Ot<.9?ht.setHSL(.08,.5,.8):ht.setHSL(.6,.5,.8),et[z*3]=ht.r,et[z*3+1]=ht.g,et[z*3+2]=ht.b,nt[z]=Math.random()*2+.5}O.setAttribute("position",new mn(K,3)),O.setAttribute("color",new mn(et,3)),O.setAttribute("size",new mn(nt,1));let lt=new Ue({uniforms:{time:{value:0},depth:{value:G}},vertexShader:`
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,fragmentShader:`
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,transparent:!0,blending:Qs,depthWrite:!1}),Rt=new hu(O,lt);V.scene.add(Rt),V.stars.push(Rt)}},p=()=>{let{current:V}=s,F=new Fa(8e3,4e3,100,100),G=new Ue({uniforms:{time:{value:0},color1:{value:new zt(4025343)},color2:{value:new zt(16723285)},opacity:{value:.3}},vertexShader:`
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,transparent:!0,blending:Qs,side:ci,depthWrite:!1}),O=new un(F,G);O.position.z=-1050,O.rotation.x=0,V.scene.add(O),V.nebula=O},v=()=>{let{current:V}=s;[{distance:-50,height:60,color:1710638,opacity:1},{distance:-100,height:80,color:1450302,opacity:.8},{distance:-150,height:100,color:996448,opacity:.6},{distance:-200,height:120,color:673384,opacity:.4}].forEach((G,O)=>{let K=[];for(let J=0;J<=50;J++){let ct=(J/50-.5)*1e3,rt=Math.sin(J*.1)*G.height+Math.sin(J*.05)*G.height*.5+Math.random()*G.height*.2-100;K.push(new mt(ct,rt))}K.push(new mt(5e3,-300)),K.push(new mt(-5e3,-300));let nt=new vl(K),lt=new Su(nt),Rt=new Zs({color:G.color,transparent:!0,opacity:G.opacity,side:ci}),z=new un(lt,Rt);z.position.z=G.distance,z.position.y=G.distance,z.userData={baseZ:G.distance,index:O},V.scene.add(z),V.mountains.push(z)})},y=()=>{let{current:V}=s,F=new bu(600,32,32),G=new Ue({uniforms:{time:{value:0}},vertexShader:`
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity * 0.12;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.015);
          }
        `,side:gn,blending:Qs,transparent:!0}),O=new un(F,G);V.scene.add(O)};g(),p(),v(),y();let x=0,M=!0,w=0,E=0,R=0,b=()=>{let V=i.current.clientWidth,F=i.current.clientHeight;m.camera.aspect=V/F,m.camera.updateProjectionMatrix(),_.setSize(V,F),m.composer.setSize(V,F),h&&D(0)},S=()=>{let V=t.current.getBoundingClientRect();E=Math.max(0,Math.min(1,-V.top/Math.max(1,V.height-i.current.clientHeight))),a(E),h&&D(0)};function D(V){let F=h?0:V*.001;R+=(E-R)*.055,m.stars.forEach(G=>G.material.uniforms.time.value=F),m.nebula.material.uniforms.time.value=F*.15,m.camera.position.set(Math.sin(F*.1)*2,30+R*20,300-R*930),m.camera.lookAt(0,10,m.camera.position.z-600),m.mountains.forEach((G,O)=>{G.visible=R<.72,G.position.x=Math.sin(F*.1)*(O+1)}),m.composer.render()}function k(V){x=0,!(!M||document.hidden||h)&&(V-w>32&&(D(V),w=V),x=requestAnimationFrame(k))}let B=new IntersectionObserver(V=>{M=V[0].isIntersecting,M&&!x&&!h&&(x=requestAnimationFrame(k)),!M&&x&&(cancelAnimationFrame(x),x=0)},{threshold:0});B.observe(t.current);let X=()=>{document.hidden&&x?(cancelAnimationFrame(x),x=0):M&&!x&&!h&&(x=requestAnimationFrame(k))};return addEventListener("resize",b),addEventListener("scroll",S,{passive:!0}),document.addEventListener("visibilitychange",X),b(),S(),D(0),()=>{cancelAnimationFrame(x),B.disconnect(),removeEventListener("resize",b),removeEventListener("scroll",S),document.removeEventListener("visibilitychange",X),m.scene.traverse(V=>{V.geometry?.dispose(),V.material&&(Array.isArray(V.material)?V.material:[V.material]).forEach(G=>G.dispose())}),m.composer.passes.forEach(V=>V.dispose?.()),m.composer.dispose(),_.dispose(),m.stars=[],m.mountains=[]}},[]),(0,Ki.useEffect)(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;let f=Yu.context(()=>{Yu.fromTo(".horizon-title",{y:65,opacity:0,filter:"blur(15px)"},{y:0,opacity:1,filter:"blur(0px)",duration:1.4,ease:"power4.out"}),Yu.fromTo(".horizon-subtitle",{y:25,opacity:0},{y:0,opacity:1,duration:1,delay:.35,ease:"power3.out"})},t);return()=>f.revert()},[n]);let u=c?[{k:"\u0623\u062D\u0645\u062F \u0623\u0645\u064A\u0646 \u2014 \u0645\u0635\u0645\u0645 \u062C\u0631\u0627\u0641\u064A\u0643 \u0623\u0648\u0644",title:"\u0623\u062D\u0645\u062F \u0623\u0645\u064A\u0646",sub:"\u0647\u0648\u064A\u0629 \u0644\u064A\u0647\u0627 \u0634\u062E\u0635\u064A\u0629. \u0648\u062A\u0635\u0645\u064A\u0645 \u064A\u0643\u0645\u0651\u0644 \u062D\u0643\u0627\u064A\u062A\u0647\u0627."},{k:"BRAND IDENTITY / SOCIAL MEDIA",title:"\u0641\u0643\u0631\u0629. \u0648\u0647\u0648\u064A\u0629. \u0648\u0623\u062B\u0631.",sub:"\u0645\u0646 \u0623\u0648\u0644 \u0627\u0644\u0628\u0631\u064A\u0641 \u0644\u0622\u062E\u0631 \u062A\u0641\u0635\u064A\u0644\u0629 \u0641\u064A \u0627\u0644\u062A\u0646\u0641\u064A\u0630."},{k:"OPEN FOR FREELANCE PROJECTS",title:"\u0646\u0635\u0645\u0651\u0645 \u0627\u0644\u0644\u064A \u062C\u0627\u064A\u061F",sub:"\u062E\u0644\u0651\u064A\u0646\u0627 \u0646\u0628\u0646\u064A \u062D\u0636\u0648\u0631 \u064A\u0639\u0628\u0651\u0631 \u0639\u0646 \u0628\u0631\u0627\u0646\u062F\u0643."}]:[{k:"AHMAD AMEEN \u2014 SENIOR GRAPHIC DESIGNER",title:"AHMAD AMEEN",sub:"Identity with character. Design that tells your story."},{k:"BRAND IDENTITY / SOCIAL MEDIA",title:"IDEA. IDENTITY. IMPACT.",sub:"From the first brief to the last detail in production."},{k:"OPEN FOR FREELANCE PROJECTS",title:"WHAT\u2019S NEXT?",sub:"Let\u2019s build a presence that feels like your brand."}],d=Math.min(2,Math.round(r*2));return(0,re.jsx)("section",{className:"horizon-scroll",id:"top",ref:t,"data-webgl":o,children:(0,re.jsxs)("div",{className:"horizon-stage",ref:i,children:[(0,re.jsx)("div",{className:"horizon-fallback","aria-hidden":"true"}),(0,re.jsx)("canvas",{ref:e,className:"horizon-canvas","aria-hidden":"true"}),(0,re.jsxs)("div",{className:"horizon-topline",children:[(0,re.jsxs)("span",{children:[(0,re.jsx)("i",{}),c?"\u0645\u062A\u0627\u062D \u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0641\u0631\u064A\u0644\u0627\u0646\u0633":"AVAILABLE FOR FREELANCE"]}),(0,re.jsx)("span",{children:"CAIRO, EGYPT / WORLDWIDE"})]}),(0,re.jsx)("div",{className:"horizon-side","aria-hidden":"true",children:"DESIGN BEYOND THE ORDINARY"}),u.map((f,h)=>{let m=Math.abs(r*2-h),_=Math.max(0,1-m*1.7);return(0,re.jsxs)("div",{className:"horizon-slide"+(h===d?" is-active":""),style:{opacity:_,transform:`translateY(${(r*2-h)*-65}px)`,pointerEvents:h===d?"auto":"none"},"aria-hidden":h!==d,inert:h!==d,children:[(0,re.jsx)("p",{className:"horizon-kicker",children:f.k}),h===0?(0,re.jsxs)("h1",{className:"horizon-title",children:[f.title,(0,re.jsx)("span",{children:"."})]}):(0,re.jsxs)("h2",{className:"horizon-title",children:[f.title,(0,re.jsx)("span",{children:"."})]}),(0,re.jsx)("p",{className:"horizon-subtitle",children:f.sub}),(0,re.jsxs)("div",{className:"horizon-actions",children:[(0,re.jsxs)("a",{className:"pill",href:"#work",children:[c?"\u0627\u0641\u062A\u062D \u0641\u0648\u0644\u062F\u0631\u0627\u062A \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639":"OPEN PROJECT FOLDERS",(0,re.jsx)("b",{children:"\u2197"})]}),(0,re.jsxs)("a",{href:"#contact",children:[c?"\u0627\u062D\u0643\u064A\u0644\u064A \u0639\u0646 \u0645\u0634\u0631\u0648\u0639\u0643":"LET\u2019S TALK"," ",(0,re.jsx)("span",{children:"\u2197"})]})]})]},h)}),(0,re.jsxs)("div",{className:"horizon-bottom",children:[(0,re.jsxs)("a",{href:"#work",children:[c?"\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0623\u0639\u0645\u0627\u0644":"EXPLORE THE WORK"," ",(0,re.jsx)("span",{children:"\u2193"})]}),(0,re.jsxs)("div",{className:"horizon-progress",children:[(0,re.jsx)("div",{children:(0,re.jsx)("span",{style:{transform:`scaleX(${r})`}})}),(0,re.jsxs)("span",{children:["0",d+1," / 03"]})]}),(0,re.jsx)("span",{children:"BRANDING / SOCIAL / PRINT"})]})]})})}var qp={covers:{MARBEX:"https://mir-s3-cdn-cf.behance.net/projects/404/d2dc0c246130111.Y3JvcCwxMzA5LDEwMjQsMjIzLDA.png","VAR M Logofolio":"https://mir-s3-cdn-cf.behance.net/projects/404/81d9e9217367637.Y3JvcCwxNjE2LDEyNjQsMCww.png","Logotypes & Marks":"https://mir-s3-cdn-cf.behance.net/projects/404/01f66f202103457.Y3JvcCwxMDI0LDgwMCwwLDExMQ.jpg","It\u2019s King Media":"https://mir-s3-cdn-cf.behance.net/projects/404/347521192390365.Y3JvcCwxODUzLDE0NDksNzMsMzg1.png","Social Media 2025":"https://mir-s3-cdn-cf.behance.net/projects/404/123ee0223537143.Y3JvcCwxNjE2LDEyNjQsMCww.png",ALARABI:"https://mir-s3-cdn-cf.behance.net/projects/404/ace4c4165632913.Y3JvcCwxMzU3LDEwNjEsMCwxOTg.png"},zhalwa:[]};var de=$i(ho(),1),Et=$i(ao(),1),oO={aurora:{style:"streak",colors:["#f4efe9","#e9c2b8","#c2433f","#2a1e2a","#22395e","#6f97c2","#e5edf4"],scale:.7,warp:1.4,angle:-.62,gloss:.18,veins:0},ember:{style:"marble",colors:["#07090c","#16252c","#3d5f68","#1a1416","#a3201a","#ef4a2b","#ff8a5c"],scale:.62,warp:3.2,angle:-.5,gloss:.55,veins:.6},dusk:{style:"marble",colors:["#120c18","#3e2850","#8f6c9c","#2b1a24","#b3502f","#eab08a","#fbe7d2"],scale:.75,warp:3.6,angle:.8,gloss:.5,veins:.5},glacier:{style:"streak",colors:["#f7f8fa","#d9e2ea","#9fb4c7","#e8edf2","#bccbd8","#ffffff"],scale:.7,warp:1.6,angle:.35,gloss:.25,veins:0},verdant:{style:"marble",colors:["#070b08","#173024","#4f7a5a","#141812","#a7843a","#e9cf87","#fbf3d6"],scale:.7,warp:3.4,angle:2.1,gloss:.5,veins:.5}};function lO(n){let t=n.trim().replace(/^#/,"");t.length===3&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);let e=/^[0-9a-f]{6}$/i.test(t)?parseInt(t,16):8421504;return[e>>16&255,e>>8&255,e&255]}function Fv(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function CE(n){let t=2166136261;for(let e=0;e<n.length;e++)t=Math.imul(t^n.charCodeAt(e),16777619);return t>>>0}function cO(n){let t=Fv(n),e=new Uint8Array(512),i=new Float32Array(512),s=[];for(let a=0;a<256;a++)s.push(a);for(let a=255;a>0;a--){let o=Math.floor(t()*(a+1)),l=s[a];s[a]=s[o],s[o]=l}for(let a=0;a<512;a++)e[a]=s[a&255];for(let a=0;a<256;a++){let o=t()*Math.PI*2;i[a*2]=Math.cos(o),i[a*2+1]=Math.sin(o)}let r=(a,o)=>{let l=Math.floor(a),c=Math.floor(o),u=a-l,d=o-c,f=l&255,h=c&255,m=e[f+e[h]]*2,_=e[f+1+e[h]]*2,g=e[f+e[h+1]]*2,p=e[f+1+e[h+1]]*2,v=i[m]*u+i[m+1]*d,y=i[_]*(u-1)+i[_+1]*d,x=i[g]*u+i[g+1]*(d-1),M=i[p]*(u-1)+i[p+1]*(d-1),w=u*u*u*(u*(u*6-15)+10),E=d*d*d*(d*(d*6-15)+10);return v+w*(y-v)+E*(x-v+w*(M-x-y+v))};return(a,o,l)=>{let c=0,u=.5;for(let d=0;d<l;d++){c+=u*r(a,o);let f=1.6*a+1.2*o+7.1;o=-1.2*a+1.6*o+3.3,a=f,u*=.5}return c}}function uO(n,t,e,i){let s=Math.max(1,Math.round(n)),r=Math.max(1,Math.round(t)),a=e.colors.length>=2?e.colors:["#111111","#eeeeee"],o=a.map((G,O)=>({t:O/(a.length-1),c:lO(G)})),l=e.scale??.7,c=e.warp??3,u=e.gloss??.4,d=e.veins??0,f=e.style==="streak",h=cO(i*977+13),m=Fv(i+1),_=m()*50,g=m()*50,p=(e.angle??0)+(m()-.5)*.5,v=Math.cos(p),y=Math.sin(p),x=Math.min(s,r),M=Math.ceil(s/2)+3,w=Math.ceil(r/2)+3,E=new Float32Array(M*w),R=new Float32Array(M*w),b=new Float32Array(s*r),S=new Float32Array(s*r),D=new Uint8ClampedArray(s*r*4),k=0,B=G=>{for(let O=0;O<M;O++){let K=((O-1)*2-s/2)/x,et=((G-1)*2-r/2)/x,nt=(K*v-et*y)*l,lt=(K*y+et*v)*l;f&&(nt*=.14,lt*=2.2),nt+=_,lt+=g;let Rt=h(nt,lt,3),z=h(nt+5.2,lt+1.3,3),J=h(nt+c*Rt+1.7,lt+c*z+9.2,3),ct=h(nt+c*Rt+8.3,lt+c*z+2.8,3);E[G*M+O]=h(nt+c*J,lt+c*ct,4),R[G*M+O]=Math.sqrt(Rt*Rt+z*z)}},X=()=>{let G=(K,et,nt,lt)=>(-K+9*et+9*nt-lt)/16,O=new Float32Array(s*w);for(let K=0;K<w;K++){let et=K*M;for(let nt=0;nt<s;nt++){let lt=(nt>>1)+1;O[K*s+nt]=nt&1?G(E[et+lt-1],E[et+lt],E[et+lt+1],E[et+lt+2]):E[et+lt]}}for(let K=0;K<r;K++){let et=(K>>1)+1;for(let nt=0;nt<s;nt++){b[K*s+nt]=K&1?G(O[(et-1)*s+nt],O[et*s+nt],O[(et+1)*s+nt],O[(et+2)*s+nt]):O[et*s+nt];let lt=(nt>>1)+1,Rt=R[et*M+lt],z=nt&1?(Rt+R[et*M+lt+1])/2:Rt,J=K&1?nt&1?(R[(et+1)*M+lt]+R[(et+1)*M+lt+1])/2:R[(et+1)*M+lt]:z;S[K*s+nt]=(z+J)/2}}},V=()=>{let G=[],O=Math.max(1,Math.floor(b.length/4096));for(let ct=0;ct<b.length;ct+=O)G.push(b[ct]);G.sort((ct,rt)=>ct-rt);let K=G[Math.floor(G.length*.02)],nt=1/(G[Math.floor(G.length*.98)]-K||1),lt=-.55,Rt=-.65,z=.52,J=nt*x*.012;for(let ct=0;ct<r;ct++)for(let rt=0;rt<s;rt++){let ht=ct*s+rt,Ot=(b[ht]-K)*nt;Ot=Ot<0?0:Ot>1?1:Ot;let At=1;for(;At<o.length-1&&o[At].t<Ot;)At++;let ne=o[At-1],ae=o[At],Ct=(Ot-ne.t)/(ae.t-ne.t||1);Ct=Ct<0?0:Ct>1?1:Ct,Ct=Ct*Ct*(3-2*Ct);let U=(b[rt<s-1?ht+1:ht]-b[rt>0?ht-1:ht])*J,Ge=(b[ct<r-1?ht+s:ht]-b[ct>0?ht-s:ht])*J,kt=(-U*lt-Ge*Rt+z)/Math.sqrt(U*U+Ge*Ge+1),it=Math.pow(kt>0?kt:0,24)*u*255,at=1+.035*Math.sin(Ot*150+S[ht]*24),Ut=d*Math.max(0,1-Math.abs(S[ht]-.42)*14)*.6,ut=(.82+.28*kt)*at*(1-Ut);D[ht*4]=(ne.c[0]+(ae.c[0]-ne.c[0])*Ct)*ut+it,D[ht*4+1]=(ne.c[1]+(ae.c[1]-ne.c[1])*Ct)*ut+it,D[ht*4+2]=(ne.c[2]+(ae.c[2]-ne.c[2])*Ct)*ut+it,D[ht*4+3]=255}};return{width:s,height:r,pixels:D,step:G=>{if(k>=w)return!0;let O=Math.min(w,k+Math.max(1,G));for(;k<O;)B(k++);return k<w?!1:(X(),V(),!0)}}}function hO(n,t){return t<=1?0:n/(t-1)*2-1}var fO=n=>typeof n=="string"?oO[n]:n,DE=new Map,oo=[],zv=!1;function dO(){if(zv)return;zv=!0;let n=()=>{let t=performance.now()+7;for(;oo.length&&performance.now()<t;){let e=oo[0];if(e.job.step(4)){oo.shift();let i=document.createElement("canvas");i.width=e.job.width,i.height=e.job.height,i.getContext("2d")?.putImageData(new ImageData(e.job.pixels,i.width,i.height),0,0),e.done(i)}}oo.length?requestAnimationFrame(n):zv=!1};requestAnimationFrame(n)}function pO(n,t,e,i,s){let r=JSON.stringify([n,t,e,i]),a=DE.get(r);return a||(a=new Promise(o=>{let l=oo.length;for(;l>1&&oo[l-1].priority>s;)l--;oo.splice(l,0,{job:uO(e,i,n,t),priority:s,done:o}),dO()}),DE.set(r,a)),a}function UE({art:n,seed:t,w:e,h:i,density:s,priority:r,className:a}){let o=de.useRef(null),[l,c]=de.useState(!1),u=fO(n),d=JSON.stringify(u),f=Math.round(e*s),h=Math.round(i*s);return de.useEffect(()=>{let m=!0;return c(!1),pO(JSON.parse(d),t,f,h,r).then(_=>{let g=o.current;!m||!g||(g.width=_.width,g.height=_.height,g.getContext("2d")?.drawImage(_,0,0),c(!0))}),()=>{m=!1}},[d,t,f,h,r]),(0,Et.jsx)("canvas",{ref:o,"aria-hidden":"true",className:a,"data-ready":l||void 0,style:{width:e,height:i,maxWidth:"none"}})}var Qu=340,Ku=272,LE=54,mO=74,Ju=Ku-mO,NE=272,OE=184,PE="M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z",IE="M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 "+(Ju-22)+"A22 22 0 0 1 318 "+Ju+"L22 "+Ju+"A22 22 0 0 1 0 "+(Ju-22)+"Z",gO=4,_O=[{name:"Cover \u2014 final",meta:"PNG \xB7 4.8 MB",art:"ember"},{name:"Moodboard",meta:"24 images",art:"dusk"},{name:"Brief.pdf",meta:"PDF \xB7 1.2 MB"}];function Hv({coverImage:n,label:t="My Files",meta:e,tone:i="light",art:s="aurora",seed:r=3,image:a,files:o=_O,action:l="add",onAdd:c,onFilesChange:u,menu:d=[],labelPlacement:f="bottom-left",open:h,defaultOpen:m=!1,onOpenChange:_,onFileSelect:g,width:p=340,appear:v=!0,appearDelay:y=0,className:x,style:M}){let w=de.useId().replace(/:/g,""),E=de.useRef(null),R=de.useRef(null),b=de.useRef(null),S=de.useRef(null),D=de.useRef(null),[k,B]=de.useState(o),X=de.useRef(o.map((it,at)=>at)),V=de.useRef(o.length),[F,G]=de.useState(null),[O,K]=de.useState(0),[et,nt]=de.useState(m),lt=h??et,Rt=de.useCallback(it=>{h===void 0&&nt(it),_?.(it)},[h,_]),[z,J]=de.useState(!1),[ct,rt]=de.useState(!v),ht=p/Qu,Ot=Math.min(1.5,Math.max(1,typeof window>"u"?1:window.devicePixelRatio||1))*ht;de.useEffect(()=>{if(!v)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){rt(!0);return}let it=E.current;if(!it||typeof IntersectionObserver>"u"){rt(!0);return}let at=0,Ut=new IntersectionObserver(ut=>{ut.some(C=>C.isIntersecting)&&(Ut.disconnect(),at=window.setTimeout(()=>rt(!0),y))},{threshold:.25});return Ut.observe(it),()=>{Ut.disconnect(),window.clearTimeout(at)}},[v,y]),de.useEffect(()=>{let it=E.current;if(!it)return;let at=0,Ut=0,ut=0,C=()=>{at=0,it.style.setProperty("--gf-px",Ut.toFixed(3)),it.style.setProperty("--gf-py",ut.toFixed(3))},T=Z=>{if(Z.pointerType==="touch")return;let tt=it.getBoundingClientRect();Ut=(Z.clientX-tt.left)/tt.width*2-1,ut=(Z.clientY-tt.top)/tt.height*2-1,at||(at=requestAnimationFrame(C))},H=()=>{Ut=0,ut=0,at||(at=requestAnimationFrame(C))};return it.addEventListener("pointermove",T),it.addEventListener("pointerleave",H),()=>{it.removeEventListener("pointermove",T),it.removeEventListener("pointerleave",H),cancelAnimationFrame(at)}},[]),de.useEffect(()=>{R.current?.toggleAttribute("inert",!lt)},[lt]),de.useEffect(()=>{if(!lt&&!z)return;let it=Ut=>{Ut.key==="Escape"&&(z?(J(!1),S.current?.focus()):(Rt(!1),b.current?.focus()))},at=Ut=>{let ut=Ut.target;z&&!D.current?.contains(ut)&&!S.current?.contains(ut)&&J(!1),lt&&!z&&!E.current?.contains(ut)&&Rt(!1)};return document.addEventListener("keydown",it),document.addEventListener("pointerdown",at),()=>{document.removeEventListener("keydown",it),document.removeEventListener("pointerdown",at)}},[lt,z,Rt]),de.useEffect(()=>{z&&D.current?.querySelector("[role=menuitem]")?.focus()},[z]);let At=()=>{let at=c?.(k)||{name:"Untitled "+(k.length+1),meta:"Just now"},Ut=[...k,at],ut=V.current++;X.current=[...X.current,ut],B(Ut),G(ut),K(C=>C+1),u?.(Ut)},ne=[{label:lt?"Close folder":"Open folder",onSelect:()=>Rt(!lt)},...d],ae=it=>{let at=Array.from(D.current?.querySelectorAll("[role=menuitem]")??[]),Ut=at.indexOf(document.activeElement),ut=C=>{it.preventDefault(),at[(C+at.length)%at.length]?.focus()};it.key==="ArrowDown"?ut(Ut+1):it.key==="ArrowUp"?ut(Ut-1):it.key==="Home"?ut(0):it.key==="End"?ut(at.length-1):it.key==="Tab"&&J(!1)},Ct=Math.max(0,k.length-gO),U=k.slice(Ct),Ge=k.length,kt=e??Ge+(Ge===1?" item":" items");return(0,Et.jsxs)("div",{ref:E,className:"gf-root"+(x?" "+x:""),"data-tone":i,"data-open":lt||void 0,"data-entered":ct||void 0,"data-place":f,style:{width:p,height:(Ku+LE)*ht,...M},children:[(0,Et.jsx)("style",{children:vO}),(0,Et.jsx)("div",{className:"gf-stage",style:{transform:"translateY("+LE*ht+"px) scale("+ht+")"},children:(0,Et.jsxs)("div",{className:"gf-tilt",children:[(0,Et.jsx)("div",{className:"gf-shadow","aria-hidden":"true"}),(0,Et.jsxs)("div",{className:"gf-back",style:{clipPath:"path('"+PE+"')"},"aria-hidden":"true",children:[a?(0,Et.jsx)("img",{className:"gf-art",src:a,alt:"",width:Qu+24,height:Ku+24,draggable:!1,onError:it=>{it.currentTarget.hidden=!0}}):s!=="none"?(0,Et.jsx)(UE,{className:"gf-art",art:s,seed:r,w:Qu+24,h:Ku+24,density:Ot,priority:0}):null,(0,Et.jsx)("div",{className:"gf-back-sheen"})]}),(0,Et.jsx)("svg",{className:"gf-rim gf-back-rim",viewBox:"0 0 "+Qu+" "+Ku,"aria-hidden":"true",children:(0,Et.jsx)("path",{d:PE})}),(0,Et.jsxs)("div",{className:"gf-front"+(O?" gf-front--bump":""),style:{clipPath:"path('"+IE+"')"},children:[n?(0,Et.jsx)("img",{className:"gf-project-cover",src:n,alt:"",draggable:!1,onError:it=>{it.currentTarget.hidden=!0}}):null,(0,Et.jsx)("div",{className:"gf-tint","aria-hidden":"true"}),(0,Et.jsx)("div",{className:"gf-spec","aria-hidden":"true"}),(0,Et.jsxs)("svg",{className:"gf-rim gf-front-rim",viewBox:"0 0 "+Qu+" "+Ju,"aria-hidden":"true",children:[(0,Et.jsx)("defs",{children:(0,Et.jsxs)("linearGradient",{id:"gf-rim-"+w,x1:"0",y1:"0",x2:"0",y2:"1",children:[(0,Et.jsx)("stop",{offset:"0",stopColor:"#fff",stopOpacity:"0.95"}),(0,Et.jsx)("stop",{offset:"0.35",stopColor:"#fff",stopOpacity:"0.35"}),(0,Et.jsx)("stop",{offset:"1",stopColor:"#fff",stopOpacity:"0.12"})]})}),(0,Et.jsx)("path",{d:IE,stroke:"url(#gf-rim-"+w+")"})]}),(0,Et.jsx)("button",{ref:b,type:"button",className:"gf-hit","aria-expanded":lt,"aria-label":(lt?"Close ":"Open ")+t+", "+Ge+(Ge===1?" item":" items"),onClick:()=>{J(!1),Rt(!lt)}}),(0,Et.jsxs)("div",{className:"gf-label",children:[(0,Et.jsx)("span",{className:"gf-title",children:t}),(0,Et.jsx)("span",{className:"gf-meta",children:kt},kt)]})]},O),(0,Et.jsx)("div",{ref:R,className:"gf-files",role:"list","aria-label":t+" contents",children:U.map((it,at)=>{let Ut=X.current[Ct+at],ut=hO(at,U.length),C=Fv(CE(it.name)+Ut),T=!!(it.art||it.image),H=(0,Et.jsxs)(Et.Fragment,{children:[T?it.image?(0,Et.jsx)("img",{className:"gf-sheet-art",src:it.image,alt:"",width:NE,height:OE,draggable:!1,onError:tt=>{tt.currentTarget.hidden=!0}}):(0,Et.jsx)(UE,{className:"gf-sheet-art",art:it.art,seed:CE(it.name)%997,w:NE,h:OE,density:Math.min(Ot,1.25),priority:1}):(0,Et.jsxs)("span",{className:"gf-lines","aria-hidden":"true",children:[(0,Et.jsx)("i",{style:{width:"86%"}}),(0,Et.jsx)("i",{style:{width:"92%"}}),(0,Et.jsx)("i",{style:{width:"64%"}}),(0,Et.jsx)("i",{style:{width:"88%"}}),(0,Et.jsx)("i",{style:{width:"42%"}})]}),(0,Et.jsxs)("span",{className:"gf-sheet-head",children:[(0,Et.jsx)("span",{className:"gf-sheet-name",children:it.name}),it.meta?(0,Et.jsx)("span",{className:"gf-sheet-meta",children:it.meta}):null]})]}),Z={className:"gf-sheet"+(T?" gf-sheet--art":"")+(Ut===F?" gf-sheet--drop":""),style:{"--gf-slot":ut,"--gf-depth":U.length-1-at,"--gf-jx":((C()-.5)*10).toFixed(2)+"px","--gf-jr":((C()-.5)*3.2).toFixed(2)+"deg",zIndex:at+1},onAnimationEnd:Ut===F?()=>G(null):void 0};return(0,Et.jsx)("div",{role:"listitem",className:"gf-sheet-slot",children:it.href?(0,Et.jsx)("a",{...Z,href:it.href,onClick:()=>g?.(it,Ct+at),children:H}):(0,Et.jsx)("button",{...Z,type:"button",onClick:()=>g?.(it,Ct+at),children:H})},Ut)})}),l!=="none"?(0,Et.jsx)("button",{ref:S,type:"button",className:"gf-key gf-key--"+l,"aria-label":l==="add"?"Add a file to "+t:"More options for "+t,"aria-haspopup":l==="more"?"menu":void 0,"aria-expanded":l==="more"?z:void 0,"aria-controls":l==="more"?"gf-menu-"+w:void 0,onClick:()=>l==="add"?At():J(it=>!it),children:l==="add"?(0,Et.jsx)("svg",{className:"gf-glyph gf-glyph--plus",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,Et.jsx)("path",{d:"M12 4.5v15M4.5 12h15"})},O):(0,Et.jsxs)("svg",{className:"gf-glyph gf-glyph--more",viewBox:"0 0 30 12","aria-hidden":"true",children:[(0,Et.jsx)("rect",{x:"1",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,Et.jsx)("rect",{x:"11",y:"1.5",width:"8",height:"9",rx:"3.4"}),(0,Et.jsx)("rect",{x:"21",y:"1.5",width:"8",height:"9",rx:"3.4"})]})}):null,l==="more"?(0,Et.jsx)("div",{ref:D,id:"gf-menu-"+w,role:"menu","aria-label":t+" options",className:"gf-menu","data-open":z||void 0,onKeyDown:ae,children:ne.map((it,at)=>(0,Et.jsx)("button",{type:"button",role:"menuitem",tabIndex:z?-1:void 0,disabled:!z,className:"gf-menu-item"+(it.danger?" gf-menu-item--danger":""),onClick:()=>{J(!1),S.current?.focus(),it.onSelect?.()},children:it.label},it.label+at))}):null]})})]})}var vO=`
.gf-root {
  --gf-px: 0;
  --gf-py: 0;
  --gf-ease: cubic-bezier(.2, .8, .2, 1);
  --gf-spring: cubic-bezier(.34, 1.36, .5, 1);
  --gf-hinge: 0deg;
  --gf-lift: 42px;
  --gf-spread: 0px;
  --gf-fan: 0deg;
  --gf-stack: 15px;
  --gf-ink: #141416;
  --gf-ink-soft: rgba(20, 20, 22, .55);
  position: relative;
  display: inline-block;
  flex: none;
  vertical-align: top;
  font-family: ui-sans-serif, system-ui, -apple-system, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}
.gf-root[data-tone="dark"] { --gf-ink: #f5f5f7; --gf-ink-soft: rgba(245, 245, 247, .58); }
.gf-root:hover, .gf-root:focus-within { --gf-hinge: -11deg; --gf-lift: -34px; --gf-spread: 8px; --gf-fan: 1.4deg; --gf-stack: 10px; }
.gf-root[data-open] { --gf-hinge: -24deg; --gf-lift: -96px; --gf-spread: 40px; --gf-fan: 5deg; --gf-stack: 30px; }

.gf-stage {
  position: absolute;
  left: 0;
  top: 0;
  width: 340px;
  height: 272px;
  transform-origin: 0 0;
}
.gf-tilt {
  position: absolute;
  inset: 0;
  transform: perspective(1400px) rotateX(calc(var(--gf-py) * -3deg)) rotateY(calc(var(--gf-px) * 4deg));
  transition: transform .9s var(--gf-ease);
}

.gf-shadow {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: -6px;
  height: 60px;
  border-radius: 40px;
  background: rgba(16, 18, 24, .34);
  filter: blur(22px);
  transform: translateX(calc(var(--gf-px) * -8px));
  transition: transform .9s var(--gf-ease), opacity .9s var(--gf-ease);
}
.gf-root[data-tone="dark"] .gf-shadow { background: rgba(0, 0, 0, .62); }

.gf-back {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: linear-gradient(180deg, #f3f3f4 0%, #e3e3e6 100%);
}
.gf-root[data-tone="dark"] .gf-back { background: linear-gradient(180deg, #2a2a2e 0%, #121214 100%); }
.gf-art {
  position: absolute;
  left: -12px;
  top: -12px;
  max-width: none;
  object-fit: cover;
  transform: translate(calc(var(--gf-px) * -7px), calc(var(--gf-py) * -6px)) scale(1.02);
  transition: transform 1.1s var(--gf-ease), opacity 1.2s var(--gf-ease), filter 1.2s var(--gf-ease);
}
canvas.gf-art { opacity: 0; filter: blur(14px) saturate(.6); }
canvas.gf-art[data-ready] { opacity: 1; filter: none; }
.gf-back-sheen {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .22) 0%, rgba(255, 255, 255, 0) 22%),
    radial-gradient(120% 80% at 80% 0%, rgba(255, 255, 255, .16), rgba(255, 255, 255, 0) 60%);
  pointer-events: none;
}

.gf-rim {
  position: absolute;
  left: 0;
  top: 0;
  max-width: none;
  overflow: visible;
  pointer-events: none;
  fill: none;
}
.gf-back-rim { width: 340px; height: 272px; }
.gf-back-rim path { stroke: rgba(255, 255, 255, .45); stroke-width: 1; }
.gf-root[data-tone="dark"] .gf-back-rim path { stroke: rgba(255, 255, 255, .16); }

/* ---- files ---------------------------------------------------------------- */
.gf-files {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  /* nothing hangs out of the bottom of the pocket, however tall the stack */
  clip-path: inset(-400px -400px 10px -400px);
}
.gf-sheet-slot { display: contents; }
.gf-sheet {
  all: unset;
  box-sizing: border-box;
  position: absolute;
  left: 34px;
  top: 96px;
  width: 272px;
  height: 184px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  pointer-events: auto;
  background: linear-gradient(180deg, #ffffff 0%, #f2f2f0 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .9),
    0 0 0 .5px rgba(0, 0, 0, .1),
    0 10px 26px -8px rgba(10, 12, 20, .28);
  transform-origin: 50% 100%;
  transform:
    translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)), calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1))
    rotate(calc(var(--gf-jr) + var(--gf-slot) * var(--gf-fan)));
  transition:
    transform .75s var(--gf-spring) calc(var(--gf-depth) * 40ms),
    box-shadow .4s var(--gf-ease),
    translate .9s var(--gf-ease),
    opacity .9s var(--gf-ease);
}
.gf-root[data-tone="dark"] .gf-sheet { background: linear-gradient(180deg, #2c2c30 0%, #1c1c1f 100%); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 0 0 .5px rgba(255, 255, 255, .08), 0 12px 28px -8px rgba(0, 0, 0, .7); }
.gf-sheet--art { background: #1a1a1d; }
.gf-root[data-open] .gf-sheet:hover,
.gf-root[data-open] .gf-sheet:focus-visible {
  transform:
    translate(calc(var(--gf-jx) + var(--gf-slot) * var(--gf-spread)), calc(var(--gf-lift) + var(--gf-depth) * var(--gf-stack) * -1 - 18px))
    rotate(calc(var(--gf-slot) * var(--gf-fan) * .6));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9), 0 0 0 .5px rgba(0, 0, 0, .1), 0 22px 40px -12px rgba(10, 12, 20, .42);
  transition-delay: 0s;
}
.gf-sheet:focus-visible { outline: 2px solid #4c8dff; outline-offset: 2px; }
.gf-sheet-art {
  position: absolute;
  left: 0;
  top: 0;
  width: 272px;
  height: 184px;
  max-width: none;
  object-fit: cover;
  transition: opacity .9s var(--gf-ease), filter .9s var(--gf-ease);
}
canvas.gf-sheet-art { opacity: 0; filter: blur(10px); }
canvas.gf-sheet-art[data-ready] { opacity: 1; filter: none; }
.gf-sheet--art::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(0, 0, 0, .42) 0%, rgba(0, 0, 0, 0) 34%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .2);
  pointer-events: none;
}
.gf-sheet-head {
  position: absolute;
  left: 14px;
  right: 14px;
  top: 11px;
  z-index: 1;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  white-space: nowrap;
}
.gf-sheet-name {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12.5px;
  font-weight: 560;
  letter-spacing: -.005em;
  color: #18181b;
}
.gf-sheet-meta {
  flex: none;
  font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 10px;
  letter-spacing: .02em;
  color: rgba(24, 24, 27, .5);
}
.gf-root[data-tone="dark"] .gf-sheet-name, .gf-sheet--art .gf-sheet-name { color: #fafafa; }
.gf-root[data-tone="dark"] .gf-sheet-meta, .gf-sheet--art .gf-sheet-meta { color: rgba(250, 250, 250, .66); }
.gf-lines {
  position: absolute;
  left: 14px;
  right: 14px;
  top: 40px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.gf-lines i {
  display: block;
  height: 5px;
  border-radius: 3px;
  background: rgba(24, 24, 27, .08);
}
.gf-lines i:first-child { height: 9px; margin-bottom: 4px; background: rgba(24, 24, 27, .14); }
.gf-root[data-tone="dark"] .gf-lines i { background: rgba(255, 255, 255, .08); }
.gf-root[data-tone="dark"] .gf-lines i:first-child { background: rgba(255, 255, 255, .16); }

.gf-sheet--drop { animation: gf-drop .85s var(--gf-ease) both; }
@keyframes gf-drop {
  0% { translate: 0 -190px; rotate: -9deg; opacity: 0; }
  35% { opacity: 1; }
  72% { translate: 0 10px; rotate: 1deg; }
  100% { translate: 0 0; rotate: 0deg; opacity: 1; }
}

/* ---- front glass ----------------------------------------------------------- */
.gf-front {
  position: absolute;
  left: 0;
  top: 74px;
  width: 340px;
  height: 198px;
  z-index: 10;
  -webkit-backdrop-filter: blur(22px) saturate(1.5);
  backdrop-filter: blur(22px) saturate(1.5);
  transform-origin: 50% 100%;
  transform: perspective(760px) rotateX(var(--gf-hinge));
  transition: transform .8s var(--gf-spring), translate 1s var(--gf-ease), opacity 1s var(--gf-ease);
}
.gf-front--bump { animation: gf-bump .7s var(--gf-ease) .38s both; }
@keyframes gf-bump {
  0% { scale: 1; }
  35% { scale: 1.018 .975; }
  70% { scale: .996 1.006; }
  100% { scale: 1; }
}
.gf-tint {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, .16) 0%, rgba(255, 255, 255, .5) 42%, rgba(252, 252, 252, .93) 100%);
}
.gf-root[data-tone="dark"] .gf-tint {
  background: linear-gradient(180deg, rgba(18, 18, 20, .18) 0%, rgba(14, 14, 16, .62) 46%, rgba(8, 8, 10, .94) 100%);
}
.gf-spec {
  position: absolute;
  inset: 0;
  background: radial-gradient(260px 200px at calc(50% + var(--gf-px) * 46%) calc(30% + var(--gf-py) * 40%), rgba(255, 255, 255, .5), rgba(255, 255, 255, 0) 70%);
  mix-blend-mode: soft-light;
  opacity: .9;
  transition: background-position .6s var(--gf-ease);
  pointer-events: none;
}
.gf-root[data-tone="dark"] .gf-spec { mix-blend-mode: screen; opacity: .16; }
.gf-front-rim { width: 340px; height: 198px; }
.gf-front-rim path { stroke-width: 2.4; transition: stroke-width .3s var(--gf-ease); }
.gf-root[data-tone="dark"] .gf-front-rim { opacity: .55; }

.gf-hit {
  all: unset;
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
}
.gf-hit:focus-visible ~ .gf-label .gf-title { text-decoration: underline; text-decoration-thickness: 1.5px; text-underline-offset: 4px; }
.gf-front:has(.gf-hit:focus-visible) .gf-front-rim path { stroke-width: 5; }

.gf-label {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 200px;
  pointer-events: none;
  color: var(--gf-ink);
}
.gf-root[data-place="bottom-left"] .gf-label { left: 28px; bottom: 32px; }
.gf-root[data-place="top-left"] .gf-label { left: 28px; top: 34px; }
.gf-root[data-place="top-right"] .gf-label { right: 32px; top: 52px; align-items: flex-start; }
.gf-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -.012em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gf-meta {
  font-family: ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: .03em;
  color: var(--gf-ink-soft);
  white-space: nowrap;
  animation: gf-roll .5s var(--gf-ease) both;
}
@keyframes gf-roll {
  from { opacity: 0; translate: 0 7px; filter: blur(3px); }
  to { opacity: 1; translate: 0 0; filter: blur(0); }
}

/* ---- the key: + or \xB7\xB7\xB7 ------------------------------------------------------ */
.gf-key {
  all: unset;
  box-sizing: border-box;
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 12;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform .35s var(--gf-spring), box-shadow .35s var(--gf-ease), background .35s var(--gf-ease);
}
.gf-key:hover { transform: translateY(-2px); }
.gf-key:active { transform: translateY(0) scale(.93); transition-duration: .12s; }
.gf-key:focus-visible { outline: 2px solid #4c8dff; outline-offset: 3px; }
.gf-key--add {
  color: #fff;
  background: radial-gradient(120% 90% at 50% 0%, #3a3a3f 0%, #121214 55%, #050506 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, .22),
    inset 0 -3px 8px rgba(0, 0, 0, .7),
    0 0 0 1px rgba(0, 0, 0, .75),
    0 14px 22px -8px rgba(0, 0, 0, .55),
    0 3px 6px -2px rgba(0, 0, 0, .35);
}
.gf-root[data-tone="dark"] .gf-key--add {
  color: #111113;
  background: radial-gradient(120% 90% at 50% 0%, #ffffff 0%, #ececee 55%, #d2d2d6 100%);
  box-shadow: inset 0 1px 0 #fff, inset 0 -3px 8px rgba(0, 0, 0, .14), 0 0 0 1px rgba(0, 0, 0, .4), 0 14px 22px -8px rgba(0, 0, 0, .7);
}
.gf-key--more {
  color: #111113;
  background: linear-gradient(180deg, rgba(255, 255, 255, .92) 0%, rgba(226, 226, 230, .82) 100%);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow:
    inset 0 1px 0 #fff,
    inset 0 -2px 4px rgba(0, 0, 0, .06),
    0 0 0 1px rgba(0, 0, 0, .16),
    0 10px 18px -8px rgba(0, 0, 0, .3);
}
.gf-root[data-tone="dark"] .gf-key--more {
  color: #f5f5f7;
  background: linear-gradient(180deg, rgba(255, 255, 255, .16) 0%, rgba(255, 255, 255, .06) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 0 0 1px rgba(255, 255, 255, .1), 0 10px 18px -8px rgba(0, 0, 0, .6);
}
.gf-key--more[aria-expanded="true"] { transform: scale(.96); }
.gf-glyph { display: block; max-width: none; fill: none; stroke: currentColor; stroke-linecap: round; }
.gf-glyph--plus { width: 26px; height: 26px; stroke-width: 1.6; animation: gf-turn .6s var(--gf-spring); }
.gf-glyph--more { width: 30px; height: 12px; stroke-width: 1.7; }
@keyframes gf-turn { from { rotate: -90deg; } to { rotate: 0deg; } }

/* ---- menu ------------------------------------------------------------------- */
.gf-menu {
  position: absolute;
  right: 22px;
  bottom: 90px;
  z-index: 20;
  min-width: 176px;
  padding: 6px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  background: rgba(252, 252, 253, .72);
  -webkit-backdrop-filter: blur(24px) saturate(1.6);
  backdrop-filter: blur(24px) saturate(1.6);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .9), 0 0 0 .5px rgba(0, 0, 0, .14), 0 24px 48px -16px rgba(10, 12, 20, .4);
  transform-origin: 100% 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px) scale(.94);
  transition: opacity .2s var(--gf-ease), transform .32s var(--gf-spring), visibility 0s .32s;
}
.gf-menu[data-open] { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
.gf-root[data-tone="dark"] .gf-menu { background: rgba(30, 30, 34, .72); box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 0 0 .5px rgba(255, 255, 255, .1), 0 24px 48px -16px rgba(0, 0, 0, .8); }
.gf-menu-item {
  all: unset;
  box-sizing: border-box;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 450;
  color: #18181b;
  cursor: pointer;
}
.gf-root[data-tone="dark"] .gf-menu-item { color: #f4f4f5; }
.gf-menu-item:hover, .gf-menu-item:focus-visible { background: rgba(24, 24, 27, .07); }
.gf-root[data-tone="dark"] .gf-menu-item:hover, .gf-root[data-tone="dark"] .gf-menu-item:focus-visible { background: rgba(255, 255, 255, .09); }
.gf-menu-item--danger { color: #d92d20; }
.gf-root[data-tone="dark"] .gf-menu-item--danger { color: #ff6b5e; }

/* ---- entrance: the folder assembles itself ---------------------------------- */
.gf-root:not([data-entered]) .gf-back,
.gf-root:not([data-entered]) .gf-back-rim { translate: 0 22px; opacity: 0; }
.gf-root:not([data-entered]) .gf-sheet { translate: 0 -120px; opacity: 0; }
.gf-root:not([data-entered]) .gf-front { translate: 0 46px; opacity: 0; }
.gf-root:not([data-entered]) .gf-key { opacity: 0; scale: .6; }
.gf-root:not([data-entered]) .gf-shadow { opacity: 0; }
.gf-back, .gf-back-rim { transition: translate 1s var(--gf-ease), opacity .9s var(--gf-ease); }
.gf-root[data-entered] .gf-sheet { transition-delay: calc(var(--gf-depth) * 40ms), 0s, calc(.18s + var(--gf-depth) * 90ms), calc(.18s + var(--gf-depth) * 90ms); }
.gf-root[data-entered] .gf-front { transition-delay: 0s, .42s, .42s; }
.gf-key { transition: transform .35s var(--gf-spring), box-shadow .35s var(--gf-ease), opacity .6s var(--gf-ease) .7s, scale .7s var(--gf-spring) .7s; }

@media (prefers-reduced-motion: reduce) {
  .gf-root *, .gf-root *::before, .gf-root *::after {
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    animation: none !important;
  }
  .gf-tilt { transform: none; }
}
`;var Lt=$i(ao(),1),Yp=[{name:"\u0644\u0642\u064A\u0645\u0629",en:"Luqaimah",category:"brand",local:"luqaimah",color:"#ad672d"},{name:"\u0638\u0644\u0648\u0629",en:"Zhalwa",category:"brand",local:"zhalwa",color:"#214ee6"},{name:"ZAHMA",en:"ZAHMA",category:"brand",slug:"254397281/ZAHMA-Brand-identity-(-fashion-)",color:"#ff2d55"},{name:"MARBEX",en:"MARBEX",category:"brand",slug:"246130111/MARBEX-BRAND-BOOK",color:"#b98a5b"},{name:"Social Media 2025",en:"Social Media 2025",category:"social",slug:"223537143/social-media-designs-2025",color:"#7d62d9"},{name:"It\u2019s King Media",en:"It\u2019s King Media",category:"brand",slug:"192390365/Its-king-media-brand-strategy",color:"#dd972c"},{name:"\u0627\u0644\u0646\u062E\u0628\u0629",en:"Alnokhba",category:"social",slug:"223536195/Alnokhba-Office-Social-Media-Designs",color:"#00a99c"},{name:"ALARABI",en:"ALARABI",category:"brand",slug:"165632913/ALARABI-sport-club-rebranding",color:"#d63549"},{name:"VAR M Logofolio",en:"VAR M Logofolio",category:"logo",slug:"217367637/logofolio-Var-M-2024",color:"#3d6bff"},{name:"Creatives Hub",en:"Creatives Hub",category:"logo",slug:"110020799/LOGOFOLIO-VOL-1-CREATIVES-HUB",color:"#c46891"},{name:"Logotypes & Marks",en:"Logotypes & Marks",category:"logo",slug:"202103457/Logotypes-Marks-Collection-2024",color:"#9b71dd"},{name:"Vet Clinic",en:"Vet Clinic",category:"social",slug:"223227001/Veterinary-Clinic-Social-Media-Designs",color:"#2fbf71"},{name:"Coffee",en:"Coffee",category:"social",slug:"217755799/Coffee-Social-Media-Designs",color:"#b7794f"},{name:"Speech Program",en:"Speech Program",category:"social",slug:"223230675/speech-program-Social-Media-Designs",color:"#f0527d"}];function BE(){let[n,t]=(0,Ji.useState)({lang:document.documentElement.lang,theme:document.documentElement.dataset.theme});return(0,Ji.useEffect)(()=>{let e=new MutationObserver(()=>t({lang:document.documentElement.lang,theme:document.documentElement.dataset.theme}));return e.observe(document.documentElement,{attributes:!0,attributeFilter:["lang","data-theme"]}),()=>e.disconnect()},[]),n}function yO(){let{lang:n}=BE();return(0,Lt.jsx)(RE,{lang:n})}function xO(n){let t=(0,Ji.useRef)(null),[e,i]=(0,Ji.useState)(120);return(0,Ji.useEffect)(()=>{let s=t.current;if(!s)return;let r=()=>i(Math.max(96,Math.min(340,Math.floor(s.getBoundingClientRect().width))));r();let a=new ResizeObserver(r);return a.observe(s),()=>a.disconnect()},[]),(0,Lt.jsx)("div",{className:"folder-object",ref:t,children:(0,Lt.jsx)(Hv,{...n,width:e})})}function SO(){let{lang:n,theme:t}=BE(),e=n==="ar",[i,s]=(0,Ji.useState)("all"),r=(0,Ji.useRef)(null),a=qp.covers,o=h=>h.local==="luqaimah"?"assets/luqaimah-05.webp":h.local==="zhalwa"?qp.zhalwa[0]:a[h.en],[l,c]=(0,Ji.useState)({}),u={brand:e?"\u0647\u0648\u064A\u0629 \u0628\u0635\u0631\u064A\u0629":"Brand identity",social:e?"\u0633\u0648\u0634\u064A\u0627\u0644 \u0645\u064A\u062F\u064A\u0627":"Social media",logo:e?"\u0644\u0648\u062C\u0648\u0647\u0627\u062A":"Logo collection"},d=h=>{h.local==="luqaimah"?dispatchEvent(new Event("portfolio:luqaimah")):h.local==="zhalwa"&&(r.current?.showModal(),document.body.classList.add("dialog-active"))};function f(h){if(h.local==="luqaimah")return[{name:e?"\u0627\u0644\u0647\u0648\u064A\u0629 \u0648\u0627\u0644\u062A\u063A\u0644\u064A\u0641":"Identity & packaging",image:"assets/luqaimah-05.webp"},{name:e?"\u0645\u062C\u0645\u0648\u0639\u0629 \u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A":"Brand applications",image:"assets/luqaimah-14.webp"},{name:e?"\u0627\u0644\u062E\u0627\u0645\u0627\u062A \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644":"Materials & details",image:"assets/luqaimah-07.webp"},{name:e?"\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0639\u0631\u0636 \u0627\u0644\u0643\u0627\u0645\u0644":"Open full gallery",image:"assets/luqaimah-13.webp",meta:e?"\u0661\u0668 \u0635\u0648\u0631\u0629":"18 images"}];if(h.local==="zhalwa")return[{name:e?"\u0638\u0644\u0648\u0629 \u2014 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0628\u0635\u0631\u064A\u0629":"Zhalwa \u2014 visual identity",meta:e?"\u0642\u0647\u0648\u0629 \u0648\u0645\u062E\u0628\u0648\u0632\u0627\u062A":"Coffee & bakery",art:{style:"streak",colors:["#1348dc","#f25b36","#f5ecd6","#d7df62"],gloss:.3}},{name:e?"\u0627\u0633\u062A\u0643\u0634\u0641 \u0641\u0643\u0631\u0629 \u0627\u0644\u0647\u0648\u064A\u0629":"Explore the identity",meta:u.brand,art:{style:"marble",colors:["#153fe0","#203fc1","#f5ecd6","#f75c33"],scale:.9,warp:1.5}}];let m="https://www.behance.net/gallery/"+h.slug;return[{name:h.en,meta:u[h.category],image:o(h),art:{style:"streak",colors:["#090c18",h.color,"#e9e4e0",h.color],scale:.75,warp:1.7},href:m},{name:e?"\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0639\u0644\u0649 Behance":"View project on Behance",meta:"BEHANCE \u2197",art:{style:"marble",colors:[h.color,"#111321","#f8f3e8"],scale:1.1,warp:2},href:m}]}return(0,Lt.jsxs)(Lt.Fragment,{children:[(0,Lt.jsxs)("div",{className:"folder-controls",children:[(0,Lt.jsx)("div",{className:"folder-filters",role:"group","aria-label":e?"\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639":"Filter projects",children:[["all",e?"\u0643\u0644 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639":"All projects"],["brand",u.brand],["social",u.social],["logo",u.logo]].map(([h,m])=>(0,Lt.jsxs)("button",{"aria-pressed":i===h,onClick:()=>s(h),children:[m,(0,Lt.jsx)("span",{children:h==="all"?Yp.length:Yp.filter(_=>_.category===h).length})]},h))}),(0,Lt.jsx)("p",{className:"folder-instructions",children:e?"\u0627\u0641\u062A\u062D \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0645\u0628\u0627\u0634\u0631\u0629\u060C \u0623\u0648 \u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u0641\u0648\u0644\u062F\u0631":"Open a project directly, or explore the cards inside its folder"})]}),(0,Lt.jsx)("div",{className:"folder-grid",children:Yp.filter(h=>i==="all"||h.category===i).map((h,m)=>(0,Lt.jsxs)("article",{className:"folder-project",style:{"--project-color":h.color},children:[(0,Lt.jsxs)("div",{className:"folder-project-number",children:[(0,Lt.jsxs)("span",{children:[String(Yp.indexOf(h)+1).padStart(2,"0")," /"]}),(0,Lt.jsx)("span",{children:h.local?e?"\u0645\u0634\u0631\u0648\u0639 \u0645\u062E\u062A\u0627\u0631":"SELECTED PROJECT":"BEHANCE PROJECT"})]}),(0,Lt.jsx)(xO,{label:e?h.name:h.en,meta:u[h.category],tone:t==="light"?"light":"dark",image:o(h),coverImage:o(h),art:{style:"streak",colors:h.local==="zhalwa"?["#183dd4","#365aff","#f25b36","#ece3cc"]:["#14121e",h.color,"#f0d7ce",h.color],scale:.85,warp:1.3,gloss:.35},files:f(h),action:"none",open:!!l[h.en],onOpenChange:_=>c(g=>({...g,[h.en]:_})),onFileSelect:()=>d(h),appearDelay:Math.min(m%3*110,220)},`${h.en}-${n}`),(0,Lt.jsx)("div",{className:"folder-caption",children:(0,Lt.jsxs)("div",{children:[(0,Lt.jsx)("h3",{children:e?h.name:h.en}),(0,Lt.jsx)("p",{children:u[h.category]})]})}),h.local?(0,Lt.jsxs)("button",{className:"project-direct-open",onClick:()=>d(h),children:[(0,Lt.jsx)("span",{children:e?"\u0627\u0641\u062A\u062D \u0645\u0634\u0631\u0648\u0639 "+h.name:"View "+h.en+" project"}),(0,Lt.jsx)("span",{"aria-hidden":"true",children:"\u2197"})]}):(0,Lt.jsxs)("a",{className:"project-direct-open",href:"https://www.behance.net/gallery/"+h.slug,target:"_blank",rel:"noopener",children:[(0,Lt.jsx)("span",{children:e?"\u0627\u0641\u062A\u062D \u0645\u0634\u0631\u0648\u0639 "+h.name:"View "+h.en+" project"}),(0,Lt.jsx)("span",{"aria-hidden":"true",children:"\u2197"})]})]},h.en))}),(0,Lt.jsxs)("dialog",{ref:r,className:"zhalwa-dialog",onClose:()=>document.body.classList.remove("dialog-active"),children:[(0,Lt.jsxs)("div",{className:"dialog-bar",children:[(0,Lt.jsx)("span",{children:"SELECTED PROJECT / BRAND IDENTITY"}),(0,Lt.jsx)("button",{onClick:()=>r.current?.close(),"aria-label":"Close",children:"\u2715"})]}),(0,Lt.jsxs)("div",{className:"zhalwa-intro",children:[(0,Lt.jsx)("span",{children:"COFFEE & BAKERY"}),(0,Lt.jsx)("h2",{children:e?"\u0638\u0644\u0648\u0629":"ZHALWA"}),(0,Lt.jsx)("p",{children:e?"\u0647\u0648\u064A\u0629 \u0639\u0631\u0628\u064A\u0629 \u0644\u0644\u0642\u0647\u0648\u0629 \u0648\u0644\u062D\u0638\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062D\u0629. \u0623\u0632\u0631\u0642 \u0648\u0627\u0636\u062D\u060C \u0628\u0631\u062A\u0642\u0627\u0644\u064A \u062F\u0627\u0641\u0626 \u0648\u0643\u0631\u064A\u0645\u064A\u060C \u0645\u0639 \u0644\u0645\u0633\u0629 \u0644\u064A\u0645\u0648\u0646\u064A\u0629 \u0648\u0646\u0638\u0627\u0645 \u0628\u0635\u0631\u064A \u0645\u0645\u062A\u062F \u0639\u0628\u0631 \u0627\u0644\u0623\u0643\u0648\u0627\u0628 \u0648\u0627\u0644\u062A\u063A\u0644\u064A\u0641 \u0648\u0627\u0644\u0632\u064A.":"An Arabic identity for coffee and moments of pause. Cobalt blue, warm orange and cream, a lime accent, and a visual language carried across cups, packaging and uniforms."}),(0,Lt.jsx)("div",{className:"zhalwa-palette","aria-label":"Zhalwa color palette",children:["#214ee6","#f25b36","#f5ecd6","#d7df62"].map(h=>(0,Lt.jsx)("span",{style:{background:h}},h))}),[{ar:"\u0627\u0644\u0634\u0639\u0627\u0631 \u0648\u0627\u0644\u0647\u0648\u064A\u0629",en:"The mark & identity",descAr:"\u062D\u0636\u0648\u0631 \u0627\u0644\u0634\u0639\u0627\u0631 \u0648\u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0641\u064A \u0646\u0642\u0627\u0637 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629.",descEn:"The mark and palette across key touchpoints.",items:[3,2]},{ar:"\u0627\u0644\u062A\u063A\u0644\u064A\u0641 \u0648\u0627\u0644\u0623\u0643\u0648\u0627\u0628",en:"Packaging & cups",descAr:"\u0646\u0638\u0627\u0645 \u0648\u0627\u062D\u062F \u064A\u0631\u0628\u0637 \u0627\u0644\u0623\u0643\u0648\u0627\u0628 \u0648\u0627\u0644\u0623\u0643\u064A\u0627\u0633 \u0648\u0627\u0644\u0628\u0648\u0643\u0633\u0627\u062A.",descEn:"One visual system connecting cups, bags and boxes.",items:[4,6,1,5]},{ar:"\u0627\u0644\u0632\u064A \u0648\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",en:"Uniforms & details",descAr:"\u0627\u0644\u0647\u0648\u064A\u0629 \u0641\u064A \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0644\u0628\u0633 \u0648\u0627\u0644\u062A\u0637\u0628\u064A\u0642\u0627\u062A \u0627\u0644\u0635\u063A\u064A\u0631\u0629.",descEn:"The identity carried into uniforms and smaller details.",items:[7,8,9]},{ar:"\u0627\u0644\u0628\u0631\u0627\u0646\u062F \u0641\u064A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645",en:"The brand in use",descAr:"\u0645\u0646 \u0627\u0644\u0645\u0646\u062A\u062C \u0644\u0644\u062D\u0638\u0629 \u0627\u0644\u0644\u064A \u064A\u0648\u0635\u0644 \u0641\u064A\u0647\u0627 \u0644\u0644\u0639\u0645\u064A\u0644.",descEn:"From the product to a moment in the customer\u2019s hands.",items:[0,10,11,12]}].map((h,m)=>{let _=h.items.map(g=>qp.zhalwa[g]).filter(Boolean);return(0,Lt.jsxs)("section",{className:"case-chapter zhalwa-chapter",children:[(0,Lt.jsxs)("div",{className:"chapter-heading",children:[(0,Lt.jsxs)("span",{children:[String(m+1).padStart(2,"0")," / ZHALWA"]}),(0,Lt.jsx)("h3",{children:e?h.ar:h.en}),(0,Lt.jsx)("p",{children:e?h.descAr:h.descEn})]}),_.length>0?(0,Lt.jsx)("div",{className:"case-mosaic mosaic-"+_.length,children:_.map((g,p)=>(0,Lt.jsx)("figure",{children:(0,Lt.jsx)("img",{src:g,alt:"Zhalwa \u2014 "+h.en+" "+(p+1),loading:"lazy"})},g))}):null]},h.en)})]})]})]})}(0,kv.createRoot)(document.getElementById("hero-root")).render((0,Lt.jsx)(yO,{}));(0,kv.createRoot)(document.getElementById("folders-root")).render((0,Lt.jsx)(SO,{}));})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.0
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.0
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)
*/
