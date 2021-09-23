<template>
  <div class="container-fluid">
    <div class="user-header" v-if="user">
      <!-- <div class="row cover-img" :style="{backgroundImage: `url(${creator.subs.coverImg})`}">

    </div> -->
    </div>
    <div v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row" v-if="blogs.length > 0">
      <BlogCard v-for="b in blogs" :key="b.id" :blog="b" />
    </div>
    <div class="row p-5 m-5" v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { blogsService } from '../services/BlogsService'
import { usersService } from '../services/UsersService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    async function getBlogs() {
      try {
        await blogsService.getBlogs({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await usersService.getUserById(route.params.id)
        getBlogs()
      }
    })
    return {
      user: computed(() => AppState.user),
      blogs: computed(() => AppState.blogs)
    }
  }
}
</script>

<style lang="scss" scoped>
.cover-img{
  height: 30vh;
  background-position: center center;
}
</style>
