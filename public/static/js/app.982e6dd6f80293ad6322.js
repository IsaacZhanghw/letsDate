webpackJsonp([10],{0:function(e,t,n){n("j1ja"),e.exports=n("NHnr")},IKeu:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("7+uW"),r={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"app"},r,!1,function(e){n("IKeu")},null,null).exports,a=n("/ocq");o.a.use(a.a);var l=new a.a({routes:[{path:"/",component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("ozZN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/lemonPay",name:"lemonPay",component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("ozZN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/summerDiscounts",name:"summerDiscounts",component:function(e){return Promise.all([n.e(0),n.e(7)]).then(function(){var t=[n("yXNK")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsPage",name:"reviewsPage",component:function(e){return Promise.all([n.e(0),n.e(6)]).then(function(){var t=[n("plI9")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsContent",name:"reviewsContent",component:function(e){return Promise.all([n.e(0),n.e(8)]).then(function(){var t=[n("8p87")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/answerSheet",name:"answerSheet",component:function(e){return Promise.all([n.e(0),n.e(3)]).then(function(){var t=[n("h22S")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsResulte/:shareId",name:"reviewsResulte",component:function(e){return Promise.all([n.e(0),n.e(2)]).then(function(){var t=[n("fzed")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/resumePage",name:"resumePage",component:function(e){return Promise.all([n.e(0),n.e(4)]).then(function(){var t=[n("whBN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/boyueResumePage",name:"boyueResumePage",component:function(e){return Promise.all([n.e(0),n.e(5)]).then(function(){var t=[n("BFpI")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}),u=n("NYxO");o.a.use(u.a);var s=new u.a.Store({state:{count:0},mutations:{increment:function(e){console.log(this),e.count++},decrement:function(e){return e.count--}}}),c=n("mvHQ"),h=n.n(c);function p(e,t){if(!t){window.sessionStorage.setItem(e,h()({}))}window.sessionStorage.setItem(e,h()(t))}function g(e){var t=window.sessionStorage.getItem(e);return t?""===t?{}:JSON.parse(t||"{}"):{}}function m(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function f(e){var t=e%3600/60;return Math.ceil(t)}function d(e){return parseInt(e/3600)}function v(e){var t=(e/3600).toFixed(2);return 0==t.substr(t.length-1,1)&&(t=t.slice(0,t.length-1)),t}function y(e){return e-60*(e/60)}function w(e){return parseInt(e/60)}var b={install:function(e,t){e.prototype.sessionSetObj=p,e.prototype.sessionGetObj=g,e.prototype.getRandom=m,e.prototype.readingNumToMinStr=f,e.prototype.readingNumToHourStr=d,e.prototype.readingNumToSecondStr=y,e.prototype.readingTotalNumToMinStr=w,e.prototype.toHourDecimalStr=v}},P=n("pFYg"),S=n.n(P),I={set:function(e,t){console.log("set",e,t),void 0!==t&&null!==t?"string"==typeof t||"number"==typeof t||"boolean"==typeof t?localStorage.setItem(e,h()({_type:void 0===t?"undefined":S()(t),value:t})):localStorage.setItem(e,h()(t)):localStorage.setItem(e,null)},get:function(e,t){var n=localStorage.getItem(e);if(null===n)return t||null;var o=JSON.parse(n);return!o||"object"!==(void 0===o?"undefined":S()(o))||"string"!==o._type&&"number"!==o._type&&"boolean"!==o._type?o:o.value},setItem:function(e,t){return this.set(e,t),this},getItem:function(e){return this.get(e)}},N={highlighter:null},T=["hl-red","hl-orange","hl-yellow","hl-green","hl-blue","hl-purple","line-red","line-orange","line-yellow","line-green","line-blue","line-purple"],j=[];N.init=function(){rangy.init(),T.forEach(function(e){var t=rangy.createClassApplier(e,{ignoreWhiteSpace:!0,elementTagName:"span"});j.push(t)})},N.create=function(e){N.highlighter=rangy.createHighlighter(e),j.forEach(function(e){N.highlighter.addClassApplier(e)})},N.save=function(e,t,n,o,r){var i=I.get("highlight",{});i[t]=i[t]||[];var a=new function(e,t){this.chapterPos=e,this.highlight=t}(e.renderer.currentChapter.spinePos,N.highlighter.serialize(),n);a.id=""+(new Date).getTime(),a.createTime=(new Date).getTime(),a.cfi=o,a.color=r,a.note="",a.selectedText=n,i[t].unshift(a),I.set("highlight",i)},N.load=function(e,t){var n=I.get("highlight",{})[t];if(n){var o=e.renderer.currentChapter.spinePos,r=null;n.forEach(function(e){e.chapterPos===o&&(r=e)}),r&&N.highlighter.deserialize(r.highlight)}},N.clear=function(e){var t=I.get("highlight",{});t[e]&&(delete t[e],I.set("highlight",t))},window.QiuPen=N;var _=n("5K15"),M=n.n(_),C=(n("j1ja"),n("I0MY")),H=n.n(C);o.a.config.productionTip=!1,o.a.use(b),o.a.prototype.$storage=I,o.a.use(H.a,{name:"v-touch"}),o.a.use(M.a),new o.a({el:"#app",router:l,store:s,template:"<App/>",components:{App:i}})}},[0]);