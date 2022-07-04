
<template>
  <div>
    <h1>Posts page</h1>
    <h3>amount of posts: {{doubleAmountOfPosts}}</h3>
    <h3>Posts were loaded: {{postsWereLoaded}}</h3>
    <my-button @click="fetchPostsV">Show amount of posts</my-button>
    <my-input
        v-focus
        placeholder="Search..."
        v-model="searchQuery"
    />
    <div class="app__btns">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPosts"/>
    </my-dialog>
    <post-list
        v-bind:posts = "SortedAndSearchedPosts"
        @delete="removePost"
        v-if="!isPostLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="{name: 'intersection string'}" class="observer"></div>
        <div class="page__wrapper">
          <div v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page"
               :class="{
                'current-page' : page === pageNumber
               }"
          @click = "changingCurPage(pageNumber)"
          >{{pageNumber}}</div>
        </div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList"
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios'
import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    MyButton,
    MyDialog,
    PostList, PostForm
  },
  data() {
    return {
      searchQuery: '',
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'by name'},
        {value: 'body', name: 'by content'}
      ],
      isPostLoading: false,
      dialogVisible: false,
      posts: [],
      page: 1,
      limit: 10,
      totalPages: 0
    }

  },
  methods: {
    ...mapMutations({

    }),
    ...mapActions({
      fetchPostsV: 'some/fetchPosts'
    }),
    createPosts(post, info) {
      this.posts.push(post)
      this.dialogVisible = false;
      console.log(info)
    },
    removePost(post) {
      this.posts = this.posts.filter(postItem => postItem.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.isPostLoading = false;
        this.posts = response.data
      } catch (e) {
        alert("Error")
      }
    },
    async LoadMorePosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts?", {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.isPostLoading = false;
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert("Error")
      }
    },
    changingCurPage(pageNumber) {
      this.page = pageNumber
    }
  },
  mounted() {
    this.fetchPosts();
  },

  computed: {
    ...mapState({
      postsWereLoaded: state => state.some.postsWereLoaded
    }),
    ...mapGetters({
      doubleAmountOfPosts: 'some/doubleAmountOfPosts'
    }),
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    SortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery))
    }
  },
  /**
   * watch is waiting for changes of selectedSort variable
   * computed is working similarly but only when variable inside is changed
   */
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts = this.posts.sort((post1, post2) => {
  //       return post1[newValue]?.localeCompare(post2[newValue])
  //     })
  //   }
  // }
  watch: {
    page() {
      this.fetchPosts()
    }
  }
}

</script>

<style>

.app__btns {
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}

</style>