<template>
    <section class="">
        <section class="card m-4">
            <div class="m-3">
                <router-link :to="{ name: 'Profile', params: { profileId: postProp.creatorId } }">
                    <img :src="postProp.creator.picture" alt="" class="creator-img col-3">
                </router-link>
                <span class="fs-5 fw-bold mx-3">{{ postProp.creator.name }}</span>
            </div>

            <p class="mx-3">{{ postProp.body }}</p>
            <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="Post image">

            <div class="d-flex justify-content-between align-items-center">
                <p class="mx-3">{{ postProp.longDate }}</p>
                <div class="mx-3 my-2">
                    <span class="mdi mdi-heart-outline fs-3 mx-1"></span>
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
export default {
    props: {
        postProp: { type: Post, required: true }
    },
    setup() {

        // function displayTime(postProp.createdAt){
        //     time = postProp.createdAt
        // }


        return {



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