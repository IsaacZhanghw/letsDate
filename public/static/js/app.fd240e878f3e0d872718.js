webpackJsonp([9],{0:function(e,t,n){n("j1ja"),e.exports=n("NHnr")},IKeu:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var i=n("VU/8")({name:"app"},o,!1,function(e){n("IKeu")},null,null).exports,a=n("/ocq");r.a.use(a.a);var l=new a.a({routes:[{path:"/",component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("ozZN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/lemonPay",name:"lemonPay",component:function(e){return Promise.all([n.e(0),n.e(1)]).then(function(){var t=[n("ozZN")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/summerDiscounts",name:"summerDiscounts",component:function(e){return Promise.all([n.e(0),n.e(6)]).then(function(){var t=[n("yXNK")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsPage",name:"reviewsPage",component:function(e){return Promise.all([n.e(0),n.e(7)]).then(function(){var t=[n("plI9")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsContent",name:"reviewsContent",component:function(e){return Promise.all([n.e(0),n.e(5)]).then(function(){var t=[n("8p87")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/answerSheet",name:"answerSheet",component:function(e){return Promise.all([n.e(0),n.e(3)]).then(function(){var t=[n("h22S")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/reviewsResulte/:shareId",name:"reviewsResulte",component:function(e){return Promise.all([n.e(0),n.e(2)]).then(function(){var t=[n("fzed")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/resumePage",name:"resumePage",component:function(e){return Promise.all([n.e(0),n.e(4)]).then(function(){var t=[n("whBN")];e.apply(null,t)}.bind(this)).catch(n.oe)}}]}),u=n("NYxO");r.a.use(u.a);var s=new u.a.Store({state:{count:0},mutations:{increment:function(e){console.log(this),e.count++},decrement:function(e){return e.count--}}}),c=n("mvHQ"),h=n.n(c);function p(e,t){if(!t){window.sessionStorage.setItem(e,h()({}))}window.sessionStorage.setItem(e,h()(t))}function g(e){var t=window.sessionStorage.getItem(e);return t?""===t?{}:JSON.parse(t||"{}"):{}}function f(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function m(e){var t=e%3600/60;return Math.ceil(t)}function d(e){return parseInt(e/3600)}function v(e){var t=(e/3600).toFixed(2);return 0==t.substr(t.length-1,1)&&(t=t.slice(0,t.length-1)),t}function y(e){return e-60*(e/60)}function w(e){return parseInt(e/60)}var S={install:function(e,t){e.prototype.sessionSetObj=p,e.prototype.sessionGetObj=g,e.prototype.getRandom=f,e.prototype.readingNumToMinStr=m,e.prototype.readingNumToHourStr=d,e.prototype.readingNumToSecondStr=y,e.prototype.readingTotalNumToMinStr=w,e.prototype.toHourDecimalStr=v}},b=n("pFYg"),P=n.n(b),I={set:function(e,t){console.log("set",e,t),void 0!==t&&null!==t?"string"==typeof t||"number"==typeof t||"boolean"==typeof t?localStorage.setItem(e,h()({_type:void 0===t?"undefined":P()(t),value:t})):localStorage.setItem(e,h()(t)):localStorage.setItem(e,null)},get:function(e,t){var n=localStorage.getItem(e);if(null===n)return t||null;var r=JSON.parse(n);return!r||"object"!==(void 0===r?"undefined":P()(r))||"string"!==r._type&&"number"!==r._type&&"boolean"!==r._type?r:r.value},setItem:function(e,t){return this.set(e,t),this},getItem:function(e){return this.get(e)}},N={highlighter:null},T=["hl-red","hl-orange","hl-yellow","hl-green","hl-blue","hl-purple","line-red","line-orange","line-yellow","line-green","line-blue","line-purple"],j=[];N.init=function(){rangy.init(),T.forEach(function(e){var t=rangy.createClassApplier(e,{ignoreWhiteSpace:!0,elementTagName:"span"});j.push(t)})},N.create=function(e){N.highlighter=rangy.createHighlighter(e),j.forEach(function(e){N.highlighter.addClassApplier(e)})},N.save=function(e,t,n,r,o){var i=I.get("highlight",{});i[t]=i[t]||[];var a=new function(e,t){this.chapterPos=e,this.highlight=t}(e.renderer.currentChapter.spinePos,N.highlighter.serialize(),n);a.id=""+(new Date).getTime(),a.createTime=(new Date).getTime(),a.cfi=r,a.color=o,a.note="",a.selectedText=n,i[t].unshift(a),I.set("highlight",i)},N.load=function(e,t){var n=I.get("highlight",{})[t];if(n){var r=e.renderer.currentChapter.spinePos,o=null;n.forEach(function(e){e.chapterPos===r&&(o=e)}),o&&N.highlighter.deserialize(o.highlight)}},N.clear=function(e){var t=I.get("highlight",{});t[e]&&(delete t[e],I.set("highlight",t))},window.QiuPen=N;var _=n("5K15"),M=n.n(_),C=(n("j1ja"),n("I0MY")),H=n.n(C);r.a.config.productionTip=!1,r.a.use(S),r.a.prototype.$storage=I,r.a.use(H.a,{name:"v-touch"}),r.a.use(M.a),new r.a({el:"#app",router:l,store:s,template:"<App/>",components:{App:i}})}},[0]);