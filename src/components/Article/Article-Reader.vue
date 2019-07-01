<!DOCTYPE html>
<template>
<div id="reader" class="col-12">
  <div id="read-head" class="col-12">
      <!--按钮-->
      <input id="articleBtnGoList" class="btn btn-outline-info col-xl-1 col-md-2 col-3" type="button" value="Back" @click="goTo('/list')">
      <input id="BtnDeleteArticle" class="btn btn-outline-danger" type="button" value="Delete" v-if="isLogin" @click="deleteArticle">
      <input id="BtnEditArticle" class="btn btn-outline-warning" type="button" value="Edit" v-if="isLogin" @click="goTo($route.path.split('/',3).join('/')+'/edit')">
      <input id="BtnEditTag" class="btn btn-outline-warning" type="button" v-if="isLogin" value="Edit Tags" @click="goTo($route.path.split('/',3).join('/')+'/editTag')"><br><br>

      <h2 id="Articletitle">{{articleTitle}}</h2>

      <!-- Spinner -->
      <div v-if="!isLoaded" id="reader-spinner" class="spinner-border text-warning offset-md-5" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <div id="tagMsg">所属标签：
        <ul v-if="tempDatas != undefined">
          <li v-for="data in tempDatas" id="tag">{{ data.tag_name}}</li>
        </ul>
          <div v-else style="display: inline;">无</div>
      </div>

      <div class="dropdown-divider"></div>

      <transition name="fade"> 
        <div id="articleAlertMsg" class="alert alert-info" v-if="alertSuccess">{{ successMsg }}</div>
        <div id="articleAlertMsg" class="alert alert-danger" v-if="alertWarning">{{ wanrningMsg }}</div>
      </transition><br>
      <div v-html="html" id="ArticleContent"></div>

      <div class="dropdown-divider"></div>

      <!-- 文章底部翻页 -->
      <div id="page-btns" class="btn-group col-4 offset-4" role="group" aria-label="Basic">
        <button type="button" v-if="articleId != min" class="btn btn-outline-info" @click="last">Prev</button>
        <button type="button" v-else class="btn btn-outline-info" disabled>Prev</button>
        <button type="button" v-if="articleId != num" class="btn btn-outline-info" @click="next" >Next</button>
        <button type="button" v-else class="btn btn-outline-info" disabled="">Next</button>
      </div>

      <img value="" src="../../../static/svg/arrowup.svg" @click="BackToTop" id="btnGoTop">
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
      tempDatas: [{'tag_id': 0, 'tag_name': '无标题'}],
      articleTitle: '文章标题',
      articleId: 0,
      successMsg: '',
      wanrningMsg: '',
      html: '<h1>文章标题</h1><blockquote>文章内容</blockquote>',
      num: 0,
      min: 0,
      isLoaded: false
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
          this.isLoaded = true
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#reader {
    text-align: left;
}

#reader #title{
    background-color: white;
    border:0px;
}

#reader #ArticleContent{
  padding:2% 7% 2% 7%;
}

#reader-spinner {
  position: fixed;
}

#ArticleContent > h1 {
  font-size: 30px;
}

#ArticleContent > h2 {
  font-size: 24px;
}

#ArticleContent > h3 {
  font-size: 22px;
}

#ArticleContent > h4 {
  font-size: 20px;
}

#ArticleContent > h5 {
  font-size: 18px;
}

#page-btns {
  margin-top: 80px;
  margin-bottom: 80px;
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

#btnGoTop {
  background-color: lightgray;
  width:30px;
  height:30px;
  position: fixed;
  bottom: 30px;
  right: 30px;
}

#btnGoTop:hover {
  background-color: gray;
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
</style>