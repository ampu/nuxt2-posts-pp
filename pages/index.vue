<template>
  <VContainer
    fluid
  >
    <VRow
      dense
      no-gutters
      justify="center"
    >
      <VCol class="mx-5">
        <h2 class="text-h2 mb-5">
          API posts
        </h2>

        <VTextField
          v-model="apiPostsFilter"
          label="Filter"
        />

        <VPagination
          v-model="apiPage"
          :length="apiPagesCount"
          class="mb-5"
          :style="{visibility: isApiPending || isApiEmpty ? `hidden` : `visible`}"
        />

        <div
          v-if="isApiPending"
          class="d-flex justify-center"
        >
          <VProgressCircular
            :size="64"
            indeterminate
          />
        </div>

        <p
          v-if="!isApiPending && isApiEmpty"
          class="text-h4"
        >
          No posts found...
        </p>

        <PostsList
          v-if="!isApiPending && !isApiEmpty"
          :posts="pageApiPosts"
        />
      </VCol>

      <VCol class="mx-5">
        <h2 class="text-h2 mb-5">
          User posts
        </h2>

        <VTextField
          :style="{visibility: `hidden`}"
        />

        <VPagination
          :style="{visibility: `hidden`}"
          class="mb-5"
        />

        <PostsList
          isUserPosts
          :posts="userPosts"
          @change="setUserPosts"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
import PostsList from '~/components/PostsList.vue'

import debounce from 'lodash/debounce'

const PER_PAGE = 10
const DEBOUNCE_TIME = 500

export default {
  components: {
    PostsList,
  },
  data() {
    return {
      isApiPending: false,
      apiPostsFilter: ``,
      apiPage: 1,
      debounceFetchApiPosts: debounce(this.fetchApiPosts, DEBOUNCE_TIME),
    }
  },
  computed: {
    isApiEmpty() {
      return this.apiPosts.length === 0
    },
    apiPosts() {
      return this.$store.getters[`posts/getApiPosts`]
    },
    pageApiPosts() {
      const offset = PER_PAGE * (this.apiPage - 1)
      return this.apiPosts.slice(offset, offset + PER_PAGE)
    },
    apiPagesCount() {
      return Math.ceil(this.apiPosts.length / PER_PAGE)
    },
    userPosts() {
      return this.$store.getters[`posts/getUserPosts`]
    },
  },
  watch: {
    apiPostsFilter() {
      this.debounceFetchApiPosts()
    },
  },
  created() {
    this.fetchApiPosts()
  },
  methods: {
    setUserPosts(posts) {
      this.$store.commit(`posts/setUserPosts`, posts)
    },
    async fetchApiPosts() {
      try {
        this.isApiPending = true
        this.apiPage = 1
        this.$store.commit(`posts/setApiPosts`, [])
        await this.$store.dispatch(`posts/fetchApiPosts`, this.apiPostsFilter)
      } finally {
        this.isApiPending = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 0 auto;
  text-align: center;
}
</style>
