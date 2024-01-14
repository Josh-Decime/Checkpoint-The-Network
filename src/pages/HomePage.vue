<template>
  <section class="container-fluid">
    <section class="row">
      <div class="col-4">
        <div class="sticky-top" v-if="account.id">
          <PostForm />
        </div>
        <div v-else>
          <h1 class="m-3">Log in to create posts!</h1>
        </div>
      </div>

      <div class="col-6">
        <div v-for="post in posts" class="">
          <PostCard :postProp="post" />
        </div>
      </div>

      <div class="col-2">
        <div class="sticky-top">
          <div v-for="sponsor in sponsors">
            <SponsorCard :sponsorProp="sponsor" />
          </div>
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
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';
import { sponsorService } from '../services/SponsorService.js';

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

    async function getSponsors() {
      try {
        await sponsorService.getSponsors()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => getSponsors())




    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      sponsors: computed(() => AppState.sponsors),
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
