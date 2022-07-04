<template>
  <div class = "navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click = "$router.push('/posts')">Posts</my-button>
    </div>
  </div>
</template>
<script>
import MyButton from "@/components/UI/MyButton";
export default {
    name: 'nav-bar',
  components: {MyButton}
}
</script>
<style>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns {
  margin-left: auto;
}
</style>