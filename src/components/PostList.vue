<template>
  <div>
    <div v-show="posts.length > 0">
      <h3>Available posts</h3>
      <transition-group name="post-list">
        <post-item  v-for="post in posts"
                    v-bind:post = "post"
                    :key = "post.id"
                    @delete="$emit('delete', post)"
        />
      </transition-group>
    </div>
    <h2 v-show="posts.length ===0" style="color: red">
      The list of posts is empty
    </h2>

  </div>

</template>

<script>
  import PostItem from "@/components/PostItem";
  export default {
    components: {PostItem},
    props: {
      posts: {
        type: Array,
        required: true
      }
    }
  }


</script>

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px)
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
