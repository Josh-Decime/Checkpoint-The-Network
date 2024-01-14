<template>
    <div>
        <div class=" mt-5">
            <a :href="`https://www.${sponsorProp.linkURL}`">
                <img :src="sponsorProp.tall" :alt="`Sponsored content by ${sponsorProp.title}`"
                    :title="`Sponsored content by ${sponsorProp.title}`" class="sponsor-img">
            </a>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Sponsor } from '../models/Sponsor.js';
export default {
    props: {
        sponsorProp: { type: Sponsor, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.sponsor-img {
    height: 40vh;
}
</style>