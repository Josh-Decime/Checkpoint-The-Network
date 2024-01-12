<template>
    <section class="col-3">
        <section class="card">
            <img v-if="postProp.imgUrl" :src="postProp.imgUrl" alt="Post image">
            <p>{{ postProp.body }}</p>
            <img :src="postProp.creator.picture" alt="">
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



        return {



        }
    }
};
</script>


<style lang="scss" scoped>
.creator-img {
    height: 7vh;

}
</style>