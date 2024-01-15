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
                <div v-if="profile" class="card m-3">
                    <img :src="profile.coverImg" alt="" class="img-fluid cover-img">
                    <img :src="profile.picture" :alt="`${profile.name}'s profile picture'`" class="creator-img">
                    <h1>{{ profile.name }}</h1>
                    <p>{{ profile.bio }}</p>
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
    position: relative;
    top: -80px;
    margin-left: 30px;
}

.cover-img {
    border-radius: 15px, 15px, 0, 0;
    overflow: hidden;
}
</style>