<template>
  <div class=" container-fluid">
    <div class="row ">
      <BlogCard v-for="b in blogs" :key="b.id" :blog="b" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { blogsService } from '../services/BlogsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await blogsService.getBlogs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      blogs: computed(() => AppState.blogs)
    }
  }
}
</script>

<style scoped lang="scss">
.pt1{
  padding-top: 100px;
}
</style>
