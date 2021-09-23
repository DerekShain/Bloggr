<template>
  <form @submit.prevent="createBlog()">
    <div class="form-group">
      <label for="title">Title</label>
      <input type="text"
             class="form-control bg-light"
             name="title"
             placeholder=""
             v-model="editable.title"
             required
      >
    </div>
    <div class="form-group">
      <label for="title">Post a pic!</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Make sure it's a URL!"
             v-model="editable.imgUrl"
             required
      >
    </div>
    <div class="form-group">
      <label for="body" class="">Body</label>
      <textarea v-model="editable.body"
                type="text"
                class="form-control"
                name="body"
                id="body"
                rows="5"
      ></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Add your blog!
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { blogsService } from '../services/BlogsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({ photos: [] })
    return {
      editable,
      addPhoto() {
        editable.value.photos.push({ title: 'Title', imgUrl: '//placehold.it/300x300' })
      },
      async createBlog() {
        try {
          await blogsService.createBlog(editable.value)
          editable.value = { photos: [] }
          Pop.toast('Added', 'success')
          const modal = Modal.getInstance(document.getElementById('blog-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
