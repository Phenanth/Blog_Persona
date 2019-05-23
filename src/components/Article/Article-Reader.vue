<!DOCTYPE html>
<template>
<div id="reader">
	<!-- 在这里取用路径里面的:id -->
    <h1>Reader {{ $route.params.articleId }}</h1>	
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