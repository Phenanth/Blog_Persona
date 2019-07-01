<!DOCTYPE html>
<template>
<div id="editTag" class="col-12">
  <div id="editTag-right" class="">
    <div>
      <input id="articleBtnGoRead" class="btn btn-outline-info col-xl-1 col-md-2 col-3" type="button" value="Back" @click="goTo($route.path.split('/',3).join('/')+'/read')">
      <transition name="fade"> 
        <div id="articleAlertMsg" class="alert alert-info" v-if="alertSuccess">{{ successMsg }}</div>
        <div id="articleAlertMsg" class="alert alert-danger" v-if="alertWarning">{{ wanrningMsg }}</div>
      </transition><br><br>
      <h2 id="Articletitle">{{articleTitle}}</h2>
      <div id="tagMsg">所属标签：
        <ul v-if="tempDatas != undefined">
          <li v-for="data in tempDatas" id="tag">{{ data.tag_name}}</li>
        </ul>
          <div v-else style="display: inline;">无</div>
      </div><hr style="height: 5px">
      <!-- 按钮 -->
      <div id="btn-tag-opt" class="btn-group offset-md-6 offset-6 col-md-6 col-6" role="group" aria-label="Basic">
        <input id="BtnDelete" class="btn btn-outline-warning" type="button" value="Delete" v-if="chooseDelete" @click="DeleteTag">
        <input id="BtnSaveTag" class="btn btn-outline-warning" type="button" value="Save" v-if="chooseAdd" @click="Save">
        <input id="BtnAddTag" class="btn btn-outline-warning" type="button" value="Add Tag" @click="chooseAddTag" v-if="isLogin">
        <input id="BtnDeleteTag" class="btn btn-outline-warning" type="button" value="Delete Tag" v-if="isLogin && tempDatas != undefined" @click="chooseDeleteTag">
        
      </div>
      <!--显示可添加的现有标签-->
      <div id="tags-list">
      <ul>
          <li v-if="chooseAdd" v-for="(data,index) in Taglist" id="tag" :class="{'active': activeName==data.tag_name}" @click="Choose(data,index)">{{ data.tag_name}}</li><br v-if="chooseAdd">
          <li v-if="chooseAdd" id="tag" :class="{'active': activeName=='ZDY'}" @click="customize">+自定义标签</li>
          <input v-if="activeName=='ZDY'" type="text" name="" id="inputTagName" input placeholder=" Tag name" v-model='str'>
          <li v-if="chooseDelete" v-for="(data,index) in tempDatas" id="tag" :class="{'active': activeName==data.tag_name}" @click="Choose(data,index)">{{data.tag_name}}</li>
        </ul>
    </div>
    </div>
  </div>
  
</div>
</template>
<script>
import api from '../../api.js'
import store from '../../store'
export default {
  name: 'editTag',
  data: function(){
    return{
      tempDatas: [],
      Taglist: [],
      articleTitle: '',
      articleId: 0,
      successMsg: '',
      wanrningMsg: '',
      activeName:'', //当前选中标签
      activeId:0,
      chooseAdd: 0, //是否选择添加标签
      chooseDelete: 0,//是否选择删除标签
      str: ''
    }
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
    }
  },
  methods:{
    //选择自定义标签
    customize: function () {
        this.activeName = 'ZDY'
    },
    //记录当前活跃的标签
    Choose: function (data,index) {
        this.activeName = data.tag_name
        this.activeId = data.tag_id
        //console.log(this.activeId)
    },
    //选择添加标签
    chooseAddTag: function () {
        this.chooseAdd = 1
        this.chooseDelete = 0
        this.activeName = ''
      },
    //选择删除标签
    chooseDeleteTag: function () {
        this.chooseAdd = 0
        this.chooseDelete = 1
        this.activeName = ''
      },
      //确定添加标签
    Save: function () {
      //选择已有标签进行添加
      if(this.activeId!=0 && this.activeName != 'ZDY'){
        //console.log(this.articleId,this.activeId)
        let opt = {
              articleId: this.articleId,
              tagId: this.activeId
            }
          api.getTagReExistenceState(opt).then(({
              data
            }) => {
              if (!data.data) {
                api.addTag(opt).then(({
                  data
                }) => {
                  if (data.data) {
                    alert('Saved.')
                    this.$router.go(0)
                  }
                  else{
                    this.setWarningMsg('Faild')
                  }
                })
              }
              else{
                this.setWarningMsg('Already Exist.')
              }
            })
        }
        //选择自定义标签方式添加标签
        else if(this.activeName == 'ZDY'){
            //判断输入的标签名长度是否大于八
            if(this.str.length > 8)
              this.setWarningMsg('The length of the tag name must less than four.')
            //判断输入的标签名是否为空
            else if(this.str.length == 0) 
              this.setWarningMsg('Please input the tag name！')
            else {
              let opt = {
                tag_name: this.str,
              }
              //判断标签名是否已经存在存在
              api.getTagExistenceState(opt).then(({
                  data
              }) => {
                  if (data.data) {
                      this.setWarningMsg('The tag name already exists.')
                  }
                  else{
                       //将标签加到tags表中
                       api.addTagByName(opt).then(({
                          data
                      }) => {
                          if (data.data) {
                              //获取标签对应id
                              api.getTagIDByName(opt).then(({
                                data
                              }) => {
                                  if (data.success) {
                                      //console.log(data.data.tag_id)
                                      let opt = {
                                        articleId: this.articleId,
                                        tagId: data.data.tag_id
                                      }
                                      api.addTag(opt).then(({
                                        data
                                      }) => {
                                        if (data.data) {
                                          alert('Saved.')
                                          this.$router.go(0)
                                        }
                                        else{
                                          this.setWarningMsg('Faild')
                                        }
                                      })
                                  }
                                  else{
                                      this.setWarningMsg('Faild')
                                  }
                              })
                          }
                          else{
                              this.setWarningMsg('Faild')
                          }
                      })
                  }
              })
            }
        }
        //未选择标签任何标签
        else this.setWarningMsg('Unselected')
      },
    DeleteTag: function (){
      if(this.activeId!=0){
        //console.log(this.articleId,this.activeId)
        if(window.confirm("Please confirm again whether to delete this Tag.")){
          let opt = {
                articleId: this.articleId,
                tagId: this.activeId
              }
          api.deleteTag(opt).then(({
              data
          }) => {
              if (data.data) {
                  alert('Deleted.')
                  this.$router.go(0)
                    }
              else{
                  this.setWarningMsg('Faild')
              }
          })
        }
      }
      else this.setWarningMsg('Unselected')
    },
    goTo: function (routes) {
        this.$router.push(routes)
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
    }
   },
  mounted: function(){
      this.articleId = parseInt(this.$route.path.split('/')[2])
      let opt = {
        articleId: this.articleId
      }
      api.showTagofArticle(opt).then(({
        data
      }) => {
        if (data.success) {
          //console.log(data.data)
          this.tempDatas = data.data
        }
      })
      //获取文章的标题
      api.getArticleContent(opt).then(({
        data
      }) => {
        if (data.success) {
          this.articleTitle = data.title
        }
      })
      api.getTags().then(({
        data
      }) => {
        if (data.success) {
          let obj = []
          for (let i = 0; i < data.data.length; i++) {
            obj.push(data.data[i])
          }
          //console.log(obj)
          this.Taglist = obj
        }
      })
    }
}

</script>
<style>
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

#editTag {
    /*width: 100%;*/
    text-align: left;
    margin: 0px 0px 0px 0px;
    background-color: white;
}

#editTag #title{
    background-color: white;
    border:0px;
}


#editTag-right {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 20px;
    background-color: white;
}

#tagMsg ul, #tagMsg li{
  display: inline-block;
  margin-bottom: 0px;
  padding-left: 0px;
}

#tagMsg li{
  padding-right: 5px;
}

#editTag #tags-list ul{
  text-align:left;
/*  padding-left: 80px;
  padding-right: 50px;*/
  margin-top: 40px;
}
.active {
  background-color: #17a2b8!important;
  color: white;
}

#editTag #tags-list #tag{
  margin-top: 10px;
  background-color: #d1ecf1;
  margin-left: 10px;
  line-height: 35px;
  text-align: center;
  display: inline-block;
  list-style: none;
  font-size: 20px;
  font-weight: 450;
  padding: 6px 25px 6px 25px;
  border-radius: 5px;
}

#editTag #inputTagName{
  height: 40px;
  margin-left: 10px;
}

#editTag #tags-list #tag:hover{
  cursor: pointer;
}

#editTag #BtnSaveTag, #editTag #BtnDelete{
  float: right;
}

#editTag #articleAlertMsg {
  display: inline-block;
  position: absolute;
  margin-left: 22%;
}

#btn-tag-opt {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

#btn-tag-opt > input {
  max-width: 100px;
}

</style>