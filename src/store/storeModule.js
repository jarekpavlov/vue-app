import axios from "axios";

export const storeModule = {
    state: () => ({
        amountOfPosts: 10,
        postsWereLoaded: false
    }),
    mutations: {
        setAmountOfPosts(state, amountOfPosts) {
            state.amountOfPosts = amountOfPosts
        },
        setPostsWereLoaded(state, postsWereLoaded) {
            state.postsWereLoaded = postsWereLoaded
        }
    },
    getters: {
        doubleAmountOfPosts(state) {
            return state.amountOfPosts*2;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                const posts = response.data;
                commit('setAmountOfPosts', response.data.length);
                commit('setPostsWereLoaded', true);
            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}