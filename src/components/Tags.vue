<!DOCTYPE html>
<template>
<div id="tags" class="col-md-6 col-12">
  <div id="tags-content" class="">
    <!--标签列表-->
    <div id="tags-list">
      <h2>Tags</h2><hr>
      <h4>共计{{taglength}}个标签</h4>
      <ul class="list-group col-12 col-md-10 offset-md-1">
          <li class=" list-group-item list-group-item-action d-flex justify-content-between align-items-center" v-for="data in tempDatas" id="tag" :num="data.num" :ArticleListRoutes="data.ArticleListRoutes" :key="data.tag_id" @click="goTo(data.tag_path)">
            <span class="col-md-3 col-6">{{ data.tag_name }}</span>
            <!-- 本标签下的文章数 -->
            <div v-if="isLogin" class=" offset-md-1 offset-md-5">
              <a class="badge badge-light" @click.stop="goTo(data.tag_modify_path)">E</a>
            </div>
            <div v-if="isLogin" class="">
              <a class="badge badge-light" @click.stop="removeTag(data.tag_id)">X</a>
            </div>
            <div class="">
              <span class="badge badge-warning badge-pill">{{ data.num }}</span>
            </div>
          </li>
        </ul>
    </div><br>
  </div>
</div>
</template>
<script>
import api from '../api.js'
import store from '../store'
import router from '../router'
export default {
name: 'tags',
data: function () {
  return {
    tempDatas: [],
    num: [],
    taglength: 0,
    tag_id: 0,
    tag_name: '',
    articlenum: 0
  }
},
methods: {
  goTo: function (routes) {
      this.$router.push(routes)
  },
  showArticle: function(id, name, num){
    this.ArticleListVisible = true;
    this.tag_id = id;
    this.tag_name = name;
    this.articlenum = num;
    if (num !=0){
      api.getTagArticlelist().then(({
      data
    }) => {
      if (data.success) {
        for (let i = 0; i < data.data.length; i++) {
          num.push(data.data[i].num)
          this.num=num
        }
      } 
    })
    }
  },
  removeTag: function (tagId) {
    let opt = {
      tagId: tagId
    }
    let rsp = confirm('Are you sure to remove the tag and its relations with the articles?')
    if (rsp) {
      api.removeTag(opt).then((
        data
      ) => {
        router.go(0)
      })
    }
  },
  isLogin: function () {
    let isLoginState = JSON.parse(store.getters.getEditorText)
    return isLoginState

  },
  sortRule: function (a, b) {
    let timeA = a["num"]
      let timeB = b["num"]
      if (timeA < timeB) {
        return 1
      } else if (timeA > timeB) {
        return -1
      } else {
        return 0
      }
  },
},
mounted: function () {
  let num = []
  let ids = []
  api.getArticleNumOfTag().then(({
    data
  }) => {
    if (data.success) {
      if (data.data) 
        for (let i = 0; i < data.data.length; i++) {
          num.push(data.data[i].num)
          ids.push(data.data[i].tag_id)
          this.num = num
        }
    }
  })
  api.getTags().then(({
    data
  }) => {
    if (data.success) {
      let obj = []
      for (let i = 0; i < data.data.length; i++) {
        data.data[i]["num"] = num[i]
        data.data[i]["tag_path"] = '/tag/' + ids[i].toString() + '/classes'
        data.data[i]["tag_modify_path"] = '/tag/' + ids[i].toString() + '/modify'
        obj.push(data.data[i])
      }
      //console.log(obj)
      obj = obj.sort(this.sortRule)
      this.tempDatas = obj
      this.taglength = data.data.length;
    }
  })
}
}
</script>
<style>
.activeTag {
  background-color: #EEE;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

#tags-content {
  background-color: white;
  height: 100%;
}

#tags h2{
  margin: auto;
  padding:30px 0px 15px 0px;
  width: 80%;
  color: #17A2B8;
}
#tags hr{
  color: lightgray;
  height: 1px;
  width: 85%;
}

#tags-list > ul {
  margin-top: 30px;
}

#tags #tags-list ul{
  text-align:left;
  padding-left: 80px;
  padding-right: 50px;
}

#tags #tag div{
  display: inline-block;
  font-size: 18px;
  line-height: inherit;
  width: 50px;
}
#tags #msg {
  width: 800px;
  height: 210px;
  margin: auto;
  margin-top: 20px;
  line-height: 210px;
  font-size: 22px;
}
</style>