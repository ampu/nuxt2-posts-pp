import {ActionTree} from 'vuex'

import {reactiveLocalState} from '~/utils/local-state'
import {apiProvider} from '~/utils/api-provider'
import {PostModel} from '~/utils/post-model'

type State = {
  apiPosts: PostModel[],
  userPosts: { value: PostModel[] },
}

export const state: State = {
  apiPosts: [],
  userPosts: reactiveLocalState(`akimutin-nuxt2-posts-pp-posts`, sessionStorage, {value: []}),
}

export const getters = {
  getApiPosts: (state: State) => state.apiPosts,
  getUserPosts: (state: State) => state.userPosts.value,
}

export const mutations = {
  setApiPosts: (state: State, posts: PostModel[]) => {
    state.apiPosts = posts
  },
  setUserPosts: (state: State, posts: PostModel[]) => {
    state.userPosts.value = posts.filter((item, index, array) => {
      return array.findIndex((otherItem) => item.id === otherItem.id) === index
    })
  },
}

export const actions: ActionTree<State, State> = {
  async fetchApiPosts({commit}, titleLike: string) {
    const posts = await apiProvider.getPosts(this.$axios, titleLike)
    commit(`setApiPosts`, posts)
  },
}
