webpackJsonp([9],{ZexY:function(e,s){},plI9:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=t("f+26"),i={data:function(){return{showModal:!1,notice:"",gradeList:[{value:0,gradeName:"选择年级"},{value:1,gradeName:"一年级"},{value:2,gradeName:"二年级"},{value:3,gradeName:"三年级"},{value:4,gradeName:"四年级"},{value:5,gradeName:"五年级"},{value:6,gradeName:"六年级"},{value:7,gradeName:"七年级"},{value:8,gradeName:"八年级"},{value:9,gradeName:"九年级"}],userInfo:{openid:"",name:"",headimgurl:"",gradeId:0},isAccredit:!1}},beforeMount:function(){},mounted:function(){this.isweixin()?this.setInfo():(this.showModal=!0,this.notice='关注微信公众号"柠檬悦读",立即体验')},methods:{isweixin:function(){return"micromessenger"==window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)},setInfo:function(){if(this.sessionGetObj("userInfo").name)this.userInfo=this.sessionGetObj("userInfo");else{var e=this.$route.query;if(e.name)return;this.userInfo.openid=e.openid,this.userInfo.name=e.nickname,this.userInfo.headimgurl=e.headimgurl,this.isAccredit=!0}},discountsment:function(){return""==this.userInfo.name?(this.showModal=!0,void(this.notice="请输入测评人姓名")):0==this.userInfo.gradeId?(this.showModal=!0,void(this.notice="请选择年级")):(this.sessionSetObj("userInfo",this.userInfo),void this.getReviewsPaper())},closeModal:function(){this.showModal=!1},getReviewsPaper:function(){var e=this,s={openid:this.sessionGetObj("userInfo").openid,grade:this.sessionGetObj("userInfo").gradeId,baseUrl:"http://mp.weixin.lemonread.com/"};a.a.getPaper(s).then(function(s){s.articles?e.$router.push({path:"reviewsContent"}):(e.showModal=!0,e.notice="你已经做过评测试卷了哦")}).catch(function(s){e.showModal=!0,e.notice=s.data.errmsg})}}},n={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",[e.showModal?t("div",{staticClass:"modal"},[t("div",{staticClass:"mask",on:{click:e.closeModal}}),e._v(" "),t("div",{staticClass:"modal-content"},[t("p",[e._v(e._s(e.notice))])])]):e._e(),e._v(" "),t("div",{staticClass:"discounts-box"},[t("div",{staticClass:"form-box"},[t("img",{staticClass:"logo-box-img",attrs:{src:"static/readReviews/logo.png",alt:""}}),e._v(" "),e._m(0),e._v(" "),t("div",{staticClass:"user-box"},[e.userInfo.headimgurl?t("label",[t("img",{staticClass:"user-box-img",attrs:{src:e.userInfo.headimgurl,alt:""}})]):e._e(),e._v(" "),t("label",{staticClass:"label-box"},[e._v("\n          姓名\n          "),t("div",{staticClass:"input-box"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.name,expression:"userInfo.name"}],staticClass:"user-input",class:e.isAccredit?"isDisabled":"",attrs:{disabled:e.isAccredit,placeholder:"请输入测评姓名"},domProps:{value:e.userInfo.name},on:{input:function(s){s.target.composing||e.$set(e.userInfo,"name",s.target.value)}}})])]),e._v(" "),t("label",{staticClass:"label-box"},[e._v("\n          年级\n          "),t("div",{staticClass:"input-box"},[t("select",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.gradeId,expression:"userInfo.gradeId"}],staticClass:"user-input",on:{change:function(s){var t=Array.prototype.filter.call(s.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.userInfo,"gradeId",s.target.multiple?t:t[0])}}},e._l(e.gradeList,function(s){return t("option",{attrs:{name:"gradeId"},domProps:{value:s.value}},[e._v(e._s(s.gradeName))])})),e._v(" "),t("img",{staticClass:"triangle-img",attrs:{src:"static/readReviews/triangle.png",alt:""}})])])]),e._v(" "),t("div",{staticClass:"submit-btn",on:{click:e.discountsment}},[t("img",{staticClass:"apply-img",attrs:{src:"static/readReviews/gogo.png",alt:""}})])])])])},staticRenderFns:[function(){var e=this.$createElement,s=this._self._c||e;return s("p",{staticClass:"discounts-content"},[s("img",{staticClass:"title-box-img",attrs:{src:"static/readReviews/readTitle.png",alt:""}})])}]};var o=t("VU/8")(i,n,!1,function(e){t("ZexY")},"data-v-06debcde",null);s.default=o.exports}});