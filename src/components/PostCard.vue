<template>
    <section class="">
        <section class="card m-4">
            <div class="d-flex justify-content-between align-items-center">
                <div class="m-3 ">
                    <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                        <img :src="postProp.creator.picture" alt="" class="creator-img col-3">
                    </router-link>
                    <span class="fs-5 fw-bold mx-3">{{ postProp.creator.name }}</span>
                </div>

                <div v-if="postProp.creator.id == account.id">
                    <button @click="deletePost(postProp.id)"
                        class="btn btn-outline mx-3 mdi fs-2  mdi-delete-circle-outline"></button>
                </div>
            </div>

            <p class="mx-3">{{ postProp.body }}</p>
            <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="Post image">

            <div class="d-flex justify-content-between align-items-center">
                <p class="mx-3">{{ postProp.longDate }}</p>
                <div class="mx-3 my-2">
                    <!-- TODO if i can figure out how to v-if="you liked that post" then i can change the icon to show if you liked it or not -->
                    <span v-if="account.id" class="mdi mdi-heart-outline fs-3 mx-1" @click="likePost(postProp.id)"
                        title="Like post">
                    </span>
                    <span v-else class="mdi mdi-heart fs-3 mx-1" @click="loginToLike()"></span>
                    <span class="fs-4">{{ postProp.likes.length }}</span>
                </div>


            </div>


        </section>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Post } from '../models/Post.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';
export default {
    props: {
        postProp: { type: Post, required: true }
    },
    setup() {

        // function displayTime(postProp.createdAt){
        //     time = postProp.createdAt
        // }

        return {
            account: computed(() => AppState.account),

            async likePost(postId) {
                try {
                    await postService.likePost(postId)
                    await postService.getPosts()
                    Pop.success('Post liked')
                } catch (error) {
                    Pop.error(error)
                }
            },
            loginToLike() {
                Pop.error('Log in to like posts')
            },


            async deletePost(postId) {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this post?', 'It will be deleted forever!')) {
                        await postService.deletePost(postId)
                        Pop.success('Post deleted')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            },


        }
    }
};
</script>


<style lang="scss" scoped>
.creator-img {
    height: 7vh;
    width: 7vh;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
}
</style>