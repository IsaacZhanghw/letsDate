webpackJsonp([8],{"3sI1":function(o,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("f+26"),i={components:{reviewsBackgroud:e("vUDa").a},data:function(){return{reader:null,title:"epub 阅读器",books:[],page:{menu:[{type:"icon",icon:"add",click:this.add,title:"添加本地书籍"},{type:"icon",icon:"cloud_download",click:this.addLink,title:"添加云端书籍"}]}}},mounted:function(){this.init()},destroyed:function(){},methods:{add:function(){document.getElementById("file").click()},init:function(){var o=this;n.a.getBookList({bookName:"",currentPage:1,pageSize:10,token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjEyMzQ1Njc4OTAxIiwidXNlcklkIjoxLCJyb2xlSWQiOjQsImlhdCI6MTUzMzYzNDE4NCwiZXhwIjoxNTM0MjM4OTg0fQ.Q6QXQzaO2CFONUyWijSV1XNx3Z8SSB2ZxS8jkUg1_5k",status:1,baseUrl:"http://api.lemonread.com:80"}).then(function(t){var e=t;console.log("resData",e),e.rows.forEach(function(o){o.content=o.bookUrl}),o.books=e.rows}).catch(function(o){console.log("err",o)})},addBookFromUrl:function(o){this.book=ePub(o.bookUrl,{width:400,height:600,spreads:!1,restore:!0}),this.book.getMetadata().then(function(t){console.log("getMetadata"),console.log("meta",t),bookDb.init(function(){bookDb.addBook({type:"link",id:o.bookId,name:t.bookTitle,author:t.creator,content:o.bookUrl},function(){bookDb.getBooks(function(o){console.log("获取所有书籍"),console.log(o)})})})})},goBookDetail:function(o){this.sessionSetObj("bookInfo",o),this.$router.push({path:"book"})}}},c={render:function(){var o=this,t=o.$createElement,e=o._self._c||t;return e("div",{staticClass:"page-home"},[e("ul",{staticClass:"book-list"},o._l(o.books,function(t){return e("li",{staticClass:"item",on:{click:function(e){o.goBookDetail(t)}}},[e("div",{staticClass:"link"},[t.coverUrl?e("img",{staticClass:"cover",attrs:{src:t.coverUrl}}):o._e(),o._v(" "),t.coverUrl?o._e():e("div",{staticClass:"cover-text"},[o._v("没有封面")])]),o._v(" "),e("div",{staticClass:"name"},[o._v(o._s(t.bookName))])])})),o._v(" "),e("reviews-backgroud")],1)},staticRenderFns:[]};var s=e("VU/8")(i,c,!1,function(o){e("c/d4")},"data-v-3a5c589c",null);t.default=s.exports},"c/d4":function(o,t){}});