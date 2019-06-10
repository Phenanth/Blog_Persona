<!DOCTYPE html>
<template>
<div id="reader" class="row">
  <div id="personaBar" class="col-md-2 offset-md-2 col-12">
    <!-- 网站信息卡片 -->
    <div class="card text-right text-white bg-info mb-3">
      <div class="card-body">
        <!-- 路径下还有一些别的图片可以供展示，还没写好根据日期自动换首页图片的功能...想想而已 -->
        <img src="../../assets/cardPic7.png" class="card-img-top" alt="Card Pic.">
        <h3 class="card-title">Persona</h3>
        <p class="card-text">基于md文档系统与Vue的文章管理系统</p>

      </div>
      <ul class="list-group list-group-flush">
          <li class="list-group-item" @click="goTo('/list')"><a class="card-link">List</a></li>
          <li class="list-group-item" @click="goTo('/tags')"><a class="card-link">Tag</a></li>
       </ul>
      <div class="card-body">
        <!-- 登录与不登录显示不同内容 -->
        <a v-if="isLogin" @click="doLogout()" class="badge badge-warning">Logout</a>
        <a v-else @click="goTo('/login')" class="badge badge-warning">Login</a>
        <a href="https://github.com/Phenanth/Blog_Persona" class="badge badge-light">Git</a>
      </div>
    </div>
  </div>
  <div id="read-head" class="col-md-6 col-12">
      <!--按钮-->
      <input id="articleBtnGoList" class="btn btn-info col-xl-1 col-md-2 col-3" type="button" value="Back" @click="goTo('/list')">
      <!--根据是否为第一篇文章显示不同内容-->
      <input type="button" v-if="articleId != num" class="btn btn-info" value="Next" id="BtnNextArticle" @click="next">
      <input type="button" v-else class="btn btn-info" value="Next" id="BtnNextArticle" @click="next" disabled>
      <!--根据是否为最后一篇文章显示不同内容-->
      <input  v-if="articleId != min" id="BtnLastArticle" class="btn btn-info" value="Last" type="button" @click="last">
      <input  v-else id="BtnLastArticle" class="btn btn-info" value="Last" type="button" @click="last" disabled>
      <!--编辑按钮-->
      <input id="BtnDeleteArticle" class="btn btn-warning" type="button" value="Delete" v-if="isLogin" @click="deleteArticle">
      <input id="BtnEditArticle" class="btn btn-warning" type="button" value="Edit" v-if="isLogin" @click="goTo($route.path.split('/',3).join('/')+'/edit')">
      <input id="BtnEditTag" class="btn btn-warning" type="button" v-if="isLogin" value="Edit Tags" @click="goTo($route.path.split('/',3).join('/')+'/editTag')"><br><br>
      
      <h2 id="Articletitle">{{articleTitle}}</h2>
      <div id="tagMsg">所属标签：
        <ul v-if="tempDatas != undefined">
          <li v-for="data in tempDatas" id="tag">{{ data.tag_name}}</li>
        </ul>
          <div v-else style="display: inline;">无</div>
      </div><hr style="height: 1px;">

      <transition name="fade"> 
        <div id="articleAlertMsg" class="alert alert-info" v-if="alertSuccess">{{ successMsg }}</div>
        <div id="articleAlertMsg" class="alert alert-danger" v-if="alertWarning">{{ wanrningMsg }}</div>
      </transition><br>
      <div v-html="html"  id="ArticleContent"></div>
      <input type="button" value="Top" @click="BackToTop" id="btnGoTop">
  </div>
  
</div>
</template>
<script>
import api from '../../api.js'
import showdown from 'showdown'
import store from '../../store'
export default {
  name: 'reader',
  data: function(){
    return{
      tempDatas: [],
      articleTitle: '',
      articleId: 0,
      successMsg: '',
      wanrningMsg: '',
      html: '',
      num: 0,
      min: 0
    }
  },
  components: {
      showdown
    },
  computed: {
    alertSuccess: function () {
      if (this.successMsg != '' ) {
        return true
      } else {
        return false
      }
    },
    alertWarning: function () {
      if (this.wanrningMsg != '') {
        return true
      } else {
        return false
      }
    },
    isLogin: function () {
      let isLoginState = JSON.parse(store.getters.getEditorText)
      return isLoginState
    }
  },
  methods:{
    BackToTop: function(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    next: function () {
      let NextId = 0
      let opt = {
        articleId: this.articleId
      }
      //计算下一篇文章的ID（删除后ID可能不连续）
      api.nextArticle(opt).then(({
        data
      }) => {
        if (data.success) {
          NextId = data.data.article_id
          this.$router.push(this.$route.path.split('/',2).join('/')+'/'+NextId+'/read')
          this.$router.go(0)
        }
      })
      //console.log(this.$route.path.split('/',2)+'/'+NextId+'/read')
      },
    last: function () {
      let LastId = 0
      let opt = {
        articleId: this.articleId
      }
      //计算上一篇文章的ID（删除后ID可能不连续）
      api.lastArticle(opt).then(({
        data
      }) => {
        if (data.success) {
          console.log(data)
          LastId = data.data.article_id
          this.$router.push(this.$route.path.split('/',2).join('/')+'/'+LastId+'/read')
          this.$router.go(0)
        }
      })
      },
    //删除文章
    deleteArticle: function(){
        //提示用户确认删除操作
        if(window.confirm("Please confirm again whether to delete this article.")){
          this.articleId = parseInt(this.$route.path.split('/')[2])
          let opt = {
            articleId: this.articleId,
            articleTitle:this.articleTitle
          }
          api.deleteArticle(opt).then(({
            data
          }) => {
            if (data.success) {
              alert('Deleted.')
              this.$router.push('/list')
            }
            else{
              this.setWarningMsg(data.message)
            }
          })
      }
    },
    // 登出函数
    doLogout: function () {
      store.dispatch('removeEditorText')
      this.$router.go(0)
    },
    setSuccessMsg: function ( msg ){
      this.successMsg = msg
      setTimeout(function() {this.successMsg = ''}.bind(this), 3000)
    },
    setWarningMsg: function ( msg ) {
      this.wanrningMsg = msg
      setTimeout(function() {this.wanrningMsg = ''}.bind(this), 3000)
    },
    goTo: function (routes) {
      this.$router.push(routes)
    }
   },
  mounted: function(){
      this.articleId = parseInt(this.$route.path.split('/')[2])
      let opt = {
        articleId: this.articleId
      }
      //获取当前文章的最大序号，方便Next按钮的显示内容转换
      api.getArticleNumber().then(({
        data
      }) => {
        if (data.success) {
          this.num = data.data
        }
      })
      //获取当前文章的最小序号，方便Last按钮的显示内容转换
      api.getArticleMinNumber().then(({
        data
      }) => {
        if (data.success) {
          this.min = data.data
        }
      })
      //获取文章的内容
      api.getArticleContent(opt).then(({
        data
      }) => {
        if (data.success) {
          this.articleTitle = data.title
          let converter = new showdown.Converter()
          let text = data.data.toString()
          this.html = converter.makeHtml(text)
        }
      })
      //获取当前文章所有的标签
      api.showTagofArticle(opt).then(({
        data
      }) => {
          this.tempDatas = data.data
      })
    }
}

</script>
<style>
li {
  list-style: none;
}

html, body , .article-index{
  margin: 0px;
    background-color: #EEE;
    width: 100%;
    height: 100%;
}

div, li, .btn, .btn-hover {
  transition: color .1s;
  -moz-transition: color .1s; /* Firefox 4 */
  -webkit-transition: color .1s;  /* Safari 和 Chrome */
  -o-transition: color .1s; /* Opera */
}

.list-group > li {
  color: black;
}

.list-group > li:hover {
  color: orange;
}

#personaBar {
  position: relative;
  margin-right: 10px;
  margin-bottom: 10px;
}

.badge {
  width: 40px;
  height: 20px;
}

.btn-warning {
  color: white;
}

.btn-warning:hover {
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#reader {
    width: 100%;
    text-align: left;
    margin: 0px 0px 0px 0px;
    background-color: #EEE;
}

#reader #title{
    background-color: white;
    border:0px;
}

#reader #ArticleContent{
  padding:2% 7% 2% 7%;
}

#read-head {
  display: inline-block;
  height: 100%;
  padding: 20px;
  background-color: white;
}

#tagMsg ul, #tagMsg li{
  display: inline-block;
  padding-left: 0px;
}

#tagMsg li{
  padding-right: 5px;
}

#BtnLastArticle, #BtnNextArticle{
  display: inline;
  float: right;
}

#BtnLastArticle{
  margin-right: 5px; 
}

#BtnDeleteArticle, #BtnEditArticle, #BtnEditTag {
  display: inline;
  float: right;
  margin-right: 5px;
}

blockquote {
  border-left: #eee solid 5px;
  padding-left: 15px;
  color: #8e8e8e;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
ul li {
  line-height: 25px;
}
pre code {
  background: #F6F6F6;
}
p code {
  color: #D34B62;
  background: #F6F6F6;
  margin: 0 2px;
}

@keyframes squeezeBody {
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 300px);
  }
}

@-webkit-keyframes squeezeBody {
  from {
    width: 100%;
  }
  to {
    width: calc(100% - 300px);
  }
}

@keyframes stretchBody {
  from {
    width: calc(100% - 300px);
  }
  to {
    width: 100%;
  }
}

@-webkit-keyframes stretchBody {
  from {
    width: calc(100% - 300px);
  }
  to {
    width: 100%;
  }
}

h1,h2,h3,h4,h5,h6 {
  font-weight: bold;
}

h1 {
  border-bottom: 1px solid #ddd;
}

pre {
  white-space: pre-wrap;
  /* css-3 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
  background-color: #f8f8f8;
  border: 1px solid #dfdfdf;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
  padding: 0.125rem 0.3125rem 0.0625rem;
}

pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

#btnGoTop {
  width: 60px;
  height: 55px;
  background-color: #17a2b8; 
  color: white;
  font-size:22px;
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>