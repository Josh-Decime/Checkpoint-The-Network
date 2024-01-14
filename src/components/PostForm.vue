<template>
    <div class="row">
        <form class="card m-3" @submit.prevent="createPost()">
            <p class="fs-3 fw-bold">Write a post!</p>
            <div class="col-12">
                <!-- <label for="post-body">What do you want to say?</label> -->
                <textarea v-model="postData.body" name="post-body" id="post-body" rows="8" required
                    placeholder="What do you want to say?.." minlength="3" maxlength="300" class="form-control"></textarea>
                <p v-if="postData.body" class="text-end mb-1 mt-0">{{ postData.body.length }}/300</p>
                <p v-else class="text-end mb-1 mt-0">0/300</p>
            </div>
            <div>
                <!-- <label for="post-imgUrl">Your Img Url</label> -->
                <input v-model="postData.imgUrl" type="url" minlength="1" maxlength="500" placeholder="Your img URL..."
                    class="form-control">
                <p v-if="postData.imgUrl" class="text-end mb-1 mt-0">{{ postData.imgUrl.length }}/500</p>
                <p v-else class="text-end mb-1 mt-0">0/500</p>

            </div>
            <button class="btn btn-primary mb-3">Post</button>
        </form>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { postService } from '../services/PostService.js';
export default {
    setup() {
        const postData = ref({})

        function resetForm() {
            postData.value = {}
        }

        // TODO would be nice to pop a notification if img url is to long... this does not work
        // watch(postData, () => {
        //     if (postData.imgUrl.length == 500)
        //         Pop.error('Your img URL is to long')
        // })


        return {
            postData,
            resetForm,


            async createPost() {
                try {
                    logger.log('creating post:', postData.value)
                    await postService.createPost(postData.value)
                    Pop.success('⭐ Post created!⭐')
                    resetForm()
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
};
</script>


<style lang="scss" scoped></style>