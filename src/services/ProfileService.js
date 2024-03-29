import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class ProfileService {
    async getProfileById(profileId) {
        const response = await api.get(`api/profiles/${profileId}`)
        logger.log('selected profile:', response.data)
        const newProfile = new Profile(response.data)
        AppState.activeProfile = newProfile
    }


}

export const profileService = new ProfileService()