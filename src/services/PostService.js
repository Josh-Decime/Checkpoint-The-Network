import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class PostService {
    async getPosts() {
        const response = await api.get('api/posts')
        logger.log('Posts in api:', response.data)
        const newPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = newPosts
        logger.log('Posts in AppState:', AppState.posts)
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('Post made to the api:', response.data)
        AppState.posts.unshift(new Post(response.data))
    }
    async likePost(postId) {
        logger.log('post Id:', postId)
        const response = await api.post(`/api/posts/${postId}/like`)
        logger.log('liked post:', response.data)
        const indexToUpdate = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(indexToUpdate, 1, new Post(response.data))
    }


    async deletePost(postId) {
        const response = await api.delete(`/api/posts/${postId}`)
        logger.log('deleting post response to api:', response.data)
        const indexToRemove = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(indexToRemove, 1)
    }

    async getPostsByProfileId(profileId) {
        const response = await api.get(`/api/posts?creatorId=${profileId}`)
        logger.log('posts got with profile ID:', response.data)
        const newPost = response.data.posts.map(post => new Post(post))
        AppState.profilePosts = newPost
    }
    clearAppState() {
        AppState.activeProfile = null
        AppState.profilePosts = []
    }

    async changePage(url) {
        const response = await api.get(url)
        logger.log('response data to change pages:', response.data)
        AppState.posts = response.data.posts.map(post => new Post(post))
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }



}


export const postService = new PostService()