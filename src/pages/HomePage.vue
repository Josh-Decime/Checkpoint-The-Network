<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-8">
        <div v-for="post in posts" class="">
          <PostCard :postProp="post" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';

export default {
  setup() {
    async function getPosts() {
      try {
        await postService.getPosts()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => getPosts())




    return {
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
