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
                <div v-if="profile" class="card m-3 ">
                    <img :src="profile.coverImg" alt="" class="img-fluid cover-img position-parent">
                    <img :src="profile.picture" :alt="`${profile.name}'s profile picture'`" class="creator-img">
                    <h1 class="profile-name">{{ profile.name }}</h1>
                    <p class="profile-bio">{{ profile.bio }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p v-if="profile.graduated" class="mx-4">{{ profile.name }} has graduated! 🎓</p>
                            <p v-else class="mx-4">{{ profile.name }} has not graduated </p>
                        </div>
                        <div>
                            <a v-if="profile.github" :href="`${profile.github}`"
                                :title="`${profile.name}'s github takes you to ${profile.github}'`">
                                <span class="mdi mdi-github me-3 fs-1"></span>
                            </a>
                            <a v-if="profile.linkedin" :href="`${profile.linkedin}`"
                                :title="`${profile.name}'s linkedin takes you to ${profile.linkedin}'`">
                                <span class="mdi mdi-linkedin me-5 fs-1"></span>
                            </a>
                        </div>
                    </div>
                    <p v-if="profile.class" class="mx-4 mt-0">Attended: {{ profile.class }}</p>
                </div>
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
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watch } from 'vue';
import Pop from '../utils/Pop.js';
import { profileService } from '../services/ProfileService.js';
import { logger } from '../utils/Logger.js';
import { sponsorService } from '../services/SponsorService.js';
import { postService } from '../services/PostService.js';
export default {
    setup() {

        const route = useRoute()

        const watchableProfileId = computed(() => route.params.profileId)

        async function getProfileById() {
            try {
                const profileId = route.params.profileId
                await profileService.getProfileById(profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getPostsByProfileId() {
            try {
                const profileId = route.params.profileId
                await postService.getPostsByProfileId(profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        onMounted(() => getPostsByProfileId())


        watch(watchableProfileId, () => {
            logger.log('Route:', route)
            getProfileById()
        },
            { immediate: true }
        )


        async function getSponsors() {
            try {
                await sponsorService.getSponsors()
            } catch (error) {
                Pop.error(error)
            }
        }
        onMounted(() => getSponsors())

        return {
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            sponsors: computed(() => AppState.sponsors),
        }
    }
};
</script>


<style lang="scss" scoped>
.creator-img {
    height: 15vh;
    width: 15vh;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    // position: absolute;
    // top: 10px;
    // margin-left: -30px;
    position: relative;
    top: -60px;
    margin-left: 30px;

}

.cover-img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    max-height: 250px;
    object-fit: cover;
}

.position-parent {
    position: relative;
}

.profile-name {
    position: relative;
    top: -40px;
    margin-left: 30px;
    margin-right: 30px;
}

.profile-bio {
    position: relative;
    top: -20px;
    margin-left: 30px;
    margin-right: 30px;
}

.socials {
    position: relative;
    top: -80px;
}
</style>