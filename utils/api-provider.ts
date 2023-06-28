import type {NuxtAxiosInstance} from '@nuxtjs/axios'

import {PostModel} from '~/utils/post-model'

type GetPostsJSON = PostModel[]

const importApiPostsFromResponse = (data: GetPostsJSON) => data

export class ApiProvider {
  async getPosts($axios: NuxtAxiosInstance, titleLike: string): Promise<PostModel[]> {
    const url = titleLike
      ? `posts?title_like=${encodeURIComponent(titleLike)}`
      : `posts`

    return $axios
      .$get(url)
      .then(importApiPostsFromResponse)
  }
}

export const apiProvider = new ApiProvider()
