<template>
  <VCard class="PostsItem">
    <VCardTitle>{{ post.title }}</VCardTitle>
    <VCardText>{{ post.body }}</VCardText>
  </VCard>
</template>

<script>
export default {
  props: {
    post: {type: Object, required: true},
  },
}
</script>

<style lang="scss" scoped>
.PostsItem {
  user-select: none;
  cursor: pointer;
}
</style>
