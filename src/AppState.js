import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /**@type {import('./models/Post.js').Post} */
  posts: [],

  /**@type {import('./models/Sponsor.js').Sponsor} */
  sponsors: [],

  /**@type {import('./models/Profile.js').Profile || null} */
  activeProfile: null,



  currentPage: 1,
  totalPages: 1,
  searchedTerm: '',
})
