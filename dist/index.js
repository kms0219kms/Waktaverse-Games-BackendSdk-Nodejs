'use strict';

var q = require('openapi-fetch');
var crypto$1 = require('crypto');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var q__default = /*#__PURE__*/_interopDefault(q);

var c="https://waktaverse.games";function T(e){return q__default.default({baseUrl:e})}var g=T;var p="abcdefghijklmnopqrstuvwxyz123456789",i,n;function k(e){return !i||i.length<e?(i=Buffer.allocUnsafe(e*128),crypto.getRandomValues(i),n=0):n+e>i.length&&(crypto.getRandomValues(i),n=0),n+=e,i.subarray(n-e,n)}function u(e=16){let t=(2<<31-Math.clz32(p.length-1|1))-1,r=Math.ceil(1.6*t*e/p.length),o="";for(;;){let a=k(r),s=r;for(;s--;)if(o+=p[a[s]&t]||"",o.length===e)return o}}function l(e){return crypto$1.createHash("sha256").update(Buffer.from(e,"utf8")).digest().toString("base64").replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}var m=(e,t,r,o)=>({getAuthorizeUrl:()=>{let a=u(16),s=u(128),h=l(s),d={responseType:"code",clientId:r,callbackUri:o,state:a,challengeMethod:"S256",challenge:h};return {csrfState:a,codeVerifier:s,codeChallenge:h,url:`${t}/oauth/authorize?${new URLSearchParams(d).toString()}`}},token:a=>e.POST("/api/oauth/token",{params:{query:a}}),refresh:a=>e.GET("/api/oauth/refresh",{headers:{Authorization:`Bearer ${a}`}})});var y=e=>({getProfile:t=>e.GET("/api/game-link/user/profile",{headers:{Authorization:`Bearer ${t}`}}),getAchieves:t=>e.GET("/api/game-link/achieve",{headers:{Authorization:`Bearer ${t}`}}),postAchieve:(t,r)=>e.POST("/api/game-link/achieve",{params:{query:t},headers:{Authorization:`Bearer ${r}`}}),getStat:(t,r)=>e.GET("/api/game-link/stat",{params:{query:t},headers:{Authorization:`Bearer ${r}`}}),putStat:(t,r)=>e.PUT("/api/game-link/stat",{body:t,headers:{Authorization:`Bearer ${r}`}}),getStatBoard:(t,r)=>e.GET("/api/game-link/stat-board",{params:{query:t},headers:{Authorization:`Bearer ${r}`}})});var f=class{constructor(t){this.host=t.host||c,this.clientId=t.clientId,this.redirectUrl=t.redirectUrl,this._request=g(this.host),this._init();}_init(){this.oauth=m(this._request,this.host,this.clientId,this.redirectUrl),this.gameLink=y(this._request);}};

exports.WakGames = f;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map