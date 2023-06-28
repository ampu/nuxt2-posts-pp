<template>
  <Draggable
    v-model="computedPosts"
    class="draggable"
    :group="{name: `posts`, pull: isUserPosts ? true : `clone`}"
    :sort="isUserPosts"
    :animation="300"
  >
    <TransitionGroup
      tag="div"
      class="group"
    >
      <PostsItem
        v-for="post in computedPosts"
        :key="post.id"
        :post="post"
      />
    </TransitionGroup>
  </Draggable>
</template>

<script>
import Draggable from 'vuedraggable'
import PostsItem from '~/components/PostsItem.vue'

export default {
  components: {
    Draggable,
    PostsItem,
  },
  props: {
    posts: {type: Array, required: true},
    isUserPosts: {type: Boolean, default: false},
  },
  computed: {
    computedPosts: {
      get() {
        return this.posts
      },
      set(value) {
        this.$emit(`change`, value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.draggable {
  height: 100%;
}

.group {
  display: flex;
  flex-flow: column;
  gap: 20px;
  height: 100%;
}
</style>
