<!DOCTYPE html>
<template>
<div id="article-index" class="row">
    <router-view></router-view>
</div>
</template>
<script>
export default {
name: 'article-index'
}
</script>
<style>
html, body {
    background-color: #EEE;
    width: 100%;
    height: 100%;
}
#article-index {
    margin: 0px 20px 0px 20px;
    background-color: #EEE;
}
</style>