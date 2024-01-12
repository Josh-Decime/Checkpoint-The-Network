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
        logger.log('posts in AppState', AppState.posts)
    }



}

export const postService = new PostService()