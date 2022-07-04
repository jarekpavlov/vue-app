<template>
  <div class="post">
    <div>
      <div><strong>id:</strong> {{post.id}} </div>
      <div><strong>Name:</strong> {{post.title}} </div>
      <div><strong>Description:</strong> {{post.body}} </div>
    </div>
    <div class="post__btns">
      <my-button
      @click="enterPost(post.id)"
      >Open</my-button>
    </div>
    <div class="post__btns">
      <my-button
          @click="deletePost"
      >Delete</my-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    methods: {
      deletePost() {
        this.$emit('delete', this.post)
      },
      enterPost(id) {
        this.$router.push('/posts/'+id)
      }
    }
  }
</script>
<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .post__btns {
    display: flex;
  }
</style>