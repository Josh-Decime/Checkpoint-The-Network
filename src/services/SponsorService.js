import { AppState } from "../AppState.js";
import { Sponsor } from "../models/Sponsor.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class SponsorService {

    async getSponsors() {
        const response = await api.get('/api/ads')
        logger.log('Sponsor api response', response.data)
        const newSponsors = response.data.map(sponsor => new Sponsor(sponsor))
        AppState.sponsors = newSponsors
        logger.log('sponsors in AppState:', AppState.sponsors)
    }


}

export const sponsorService = new SponsorService()