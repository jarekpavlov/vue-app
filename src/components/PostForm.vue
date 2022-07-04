<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input v-focus v-model="post.title"
           placeholder="Name"/>
    <my-input @input="setBody"
           v-bind:value="post.body"
           placeholder="Description"/>
    <my-button
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost">Create</my-button>
  </form>
</template>

<script>
  import MyInput from "@/components/UI/MyInput";
  export default {
    components: {MyInput},
    data() {
      return {
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      setBody(event) {
        this.post.body = event.target.value
      },
      createPost() {
        this.post.id = Date.now();
        this.$emit('create',this.post, "the post was sent")
        this.post = {
          title: '',
          body: ''
        }
      }
    },
    watch: {
      post: {
        handler(newVal) {
          console.log(newVal)
        },
        deep:true
      }
    }
  }
</script>

<style scoped>

</style>