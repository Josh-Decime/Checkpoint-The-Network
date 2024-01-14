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
    }

    async createPost(postData) {
        const response = await api.post('api/posts', postData)
        logger.log('Post made to the api:', response.data)
        AppState.posts.unshift(new Post(response.data))
    }
    async likePost(postId) {
        logger.log('post Id:', postId)
        const response = await api.post(`/api/posts/${postId}/like`)
    }
}





export const postService = new PostService()