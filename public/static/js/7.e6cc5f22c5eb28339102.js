webpackJsonp([7],{"4PJS":function(t,i){},"8p87":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("f+26"),n={data:function(){return{user:{name:"",gradeId:0},clientWidth:0,clientHeight:0,articleTatol:0,articleIndex:0,articleList:[],offsetTop:0,articleTitle:"",article:"",questionList:[],questionTabIndex:0,questionStr:"",optionsList:[],answerList:["A","B","C","D","E","F"],clickNum:0,tabItem:40,optionItem:20,titleMargin:10,vTouchHeight:292,checkWidth:30}},beforeMount:function(){},mounted:function(){this.clientWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.clientHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,this.user=this.sessionGetObj("userInfo"),this.getReviewsPaper(),window.addEventListener("scroll",this.handleScroll),this.clientHeight<650&&(this.tabItem=34,this.optionItem=22,this.vTouchHeight=280,this.checkWidth=24),this.clientHeight<600&&(this.tabItem=30,this.optionItem=20,this.titleMargin=8,this.vTouchHeight=250,this.checkWidth=22),this.clientHeight<550&&(this.tabItem=28,this.checkWidth=20),this.clientHeight<500&&(this.tabItem=26,this.optionItem=18,this.titleMargin=6,this.vTouchHeight=225,this.checkWidth=18)},destroyed:function(){this.goAnswerSheet()},methods:{handleScroll:function(){this.offsetTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop},getReviewsPaper:function(){var t=this,i={openid:this.user.openid,grade:this.user.gradeId,baseUrl:"http://mp.weixin.lemonread.com/"};s.a.getPaper(i).then(function(i){var e=i,s=t.$route.params;s.articleIndex||0===s.articleIndex?(t.articleIndex=s.articleIndex,t.questionTabIndex=s.questionTabIndex,t.articleList=t.sessionGetObj("articleList")):(t.articleIndex=0,t.questionTabIndex=0,t.articleList=e.articles),t.articleTatol=e.articles.length,t.getArticle(t.articleIndex),t.sessionSetObj("paperId",e.paperId)}).catch(function(i){t.isMessage=!1,t.notice=i.data.errmsg+",请重试或联系客服人员..."})},redioChange:function(t){var i=this;this.clickNum>0||(this.clickNum++,this.optionsList.forEach(function(t){t.isCheck=!1}),this.answerList.forEach(function(e,s){s==t&&(i.articleList[i.articleIndex].Questions[i.questionTabIndex].answer=e)}),this.optionsList[t].isCheck=!0,setTimeout(function(){i.onQuestionSwipeLeft(),i.clickNum=0},500))},getArticle:function(t){this.articleIndex=t,this.article=this.articleList[t].content,this.articleTitle=this.articleList[t].title,-1!=this.article.indexOf("<img")&&(this.article=this.article.replace("<img",'<img style="width:100%"')),this.getQuestion(this.articleIndex,this.questionTabIndex)},getQuestion:function(t,i){var e=this;this.questionTabIndex=i,this.optionsList=[],this.questionList=this.articleList[t].Questions,this.questionStr=i+1+"、"+this.questionList[i].question,this.questionList[i].options.forEach(function(t,i){var s={option:t.replace(/:/,"、"),isCheck:!1};e.optionsList.push(s)}),this.articleList[this.articleIndex].Questions[i].answer&&this.answerList.forEach(function(t,s){t==e.articleList[e.articleIndex].Questions[i].answer&&(e.optionsList[s].isCheck=!0)})},getCurrentQuestion:function(t){this.getQuestion(this.articleIndex,t)},onQuestionSwipeLeft:function(){this.questionTabIndex+2>this.questionList.length?this.onSwipeLeft():(this.questionTabIndex++,this.getQuestion(this.articleIndex,this.questionTabIndex))},onQuestionSwipeRight:function(){if(this.questionTabIndex<=0)return this.articleIndex>0&&(this.questionTabIndex=this.articleList[this.articleIndex-1].Questions.length-1),void this.onSwipeRight();this.questionTabIndex--,this.getQuestion(this.articleIndex,this.questionTabIndex)},onSwipeLeft:function(){this.articleIndex+2>this.articleTatol?this.$router.push({path:"answerSheet"}):(this.questionTabIndex=0,this.articleIndex++,this.getArticle(this.articleIndex))},onSwipeRight:function(){this.articleIndex<=0?this.$router.push({path:"answerSheet"}):(this.questionTabIndex=this.articleList[this.articleIndex-1].Questions.length-1,this.articleIndex--,this.getArticle(this.articleIndex))},goAnswerSheet:function(){this.sessionSetObj("articleList",this.articleList)}}},o={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"background-box"},[e("div",{staticClass:"top-box"},[e("router-link",{staticClass:"back-icon",attrs:{to:"/reviewsPage"}},[e("img",{attrs:{src:"static/readReviews/goBack.png",alt:""}})]),t._v(" "),e("transition",{attrs:{name:"fade"}},[t.offsetTop>40?e("div",{staticClass:"article-title"},[t._v(t._s(t.articleTitle))]):t._e()]),t._v(" "),e("div",{staticClass:"step-box"},[e("span",[t._v(t._s(t.articleIndex+1))]),t._v("/"+t._s(t.articleTatol))])],1),t._v(" "),e("v-touch",{style:{height:t.clientHeight+"px",width:t.clientWidth+"px"},attrs:{"swipe-options":{direction:"horizontal"}},on:{swipeleft:t.onSwipeLeft,swiperight:t.onSwipeRight}},[e("div",{staticClass:"article-box",domProps:{innerHTML:t._s(t.article)}}),t._v(" "),e("div",{staticClass:"questions-scroll",style:{maxHeight:t.vTouchHeight+"px"}},[t.questionList.length>1?e("ul",{staticClass:"questions-box"},[t._l(t.questionList,function(i,s){return e("li",{key:s,staticClass:"tab-item",class:t.questionTabIndex==s?"currentQuestion":"",style:{width:100/t.questionList.length+"%",height:t.tabItem+"px",lineHeight:t.tabItem+"px"}},[t._v("\n          "+t._s(s+1)+"\n          "),i.answer?e("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(i.answer))]):e("span",{staticStyle:{opacity:"0","margin-left":"5px"}},[t._v("A")])])}),t._v(" "),e("div",{staticClass:"clearfix"})],2):t._e(),t._v(" "),e("div",{staticClass:"options-title",style:{lineHeight:t.optionItem+"px",margin:t.titleMargin+"px 0"}},[t._v(t._s(t.questionStr))]),t._v(" "),e("ul",{staticClass:"options-box"},t._l(t.optionsList,function(i,s){return e("li",{key:s,staticClass:"options-item",class:i.isCheck?"optionIsChecked":"",style:{lineHeight:t.optionItem+"px",margin:t.titleMargin+"px 0"}},[e("label",[t._v(t._s(i.option))]),t._v(" "),i.isCheck?e("img",{staticClass:"options-img",style:{width:t.checkWidth+"px"},attrs:{src:"static/readReviews/check.png",alt:""}}):t._e()])}))])]),t._v(" "),e("v-touch",{staticClass:"questions-fixed",style:{maxHeight:t.vTouchHeight+"px"},attrs:{"swipe-options":{direction:"horizontal"}},on:{swipeleft:t.onQuestionSwipeLeft,swiperight:t.onQuestionSwipeRight}},[t.questionList.length>1?e("ul",{staticClass:"questions-box"},[t._l(t.questionList,function(i,s){return e("li",{key:s,staticClass:"tab-item",class:t.questionTabIndex==s?"currentQuestion":"",style:{width:100/t.questionList.length+"%",height:t.tabItem+"px",lineHeight:t.tabItem+"px"},on:{click:function(i){t.getCurrentQuestion(s)}}},[t._v("\n        "+t._s(s+1)+"\n        "),i.answer?e("span",{staticStyle:{"margin-left":"5px"}},[t._v(t._s(i.answer))]):e("span",{staticStyle:{opacity:"0","margin-left":"5px"}},[t._v("A")])])}),t._v(" "),e("div",{staticClass:"clearfix"})],2):t._e(),t._v(" "),e("div",{staticClass:"options-title",style:{lineHeight:t.optionItem+"px",margin:t.titleMargin+"px 0"}},[t._v(t._s(t.questionStr))]),t._v(" "),e("ul",{staticClass:"options-box"},t._l(t.optionsList,function(i,s){return e("li",{key:s,staticClass:"options-item",class:i.isCheck?"optionIsChecked":"",style:{lineHeight:t.optionItem+"px",margin:t.titleMargin+"px 0"},on:{click:function(i){t.redioChange(s)}}},[e("label",[t._v(t._s(i.option))]),t._v(" "),i.isCheck?e("img",{staticClass:"options-img",style:{width:t.checkWidth+"px"},attrs:{src:"static/readReviews/check.png",alt:""}}):t._e()])}))])],1)},staticRenderFns:[]};var a=e("VU/8")(n,o,!1,function(t){e("4PJS")},"data-v-9e2a3f72",null);i.default=a.exports}});