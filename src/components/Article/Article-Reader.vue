<!DOCTYPE html>
<template>
<div id="reader">
	<!-- 取用路径里面的:id的方法如此处示例 -->
    <div class="alert alert-info" role="alert">
	 完全没动过的Reader页面，文章id为{{ $route.params.articleId }}
	</div>
</div>
</template>
<script>
export default {
name: 'reader'
}
</script>
<style>
#reader {
    margin: auto;
    width: 80%;
    height: 580px;
}
</style>