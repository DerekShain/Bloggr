<template>
  <div class="col-md-3 p-4 d-flex justify-content-center">
    <div class="card m-2" :style="{ 'backgroundImage': 'url(' + blog.imgUrl + ')' }">
      <div class="info">
        <h1 class="title">
          {{ blog.title }}
        </h1>
        <div class="on-hover position-absolute" style="right: 1rem; top: 1rem" v-if="account.id == blog.creatorId">
          <i class="mdi mdi-close text-danger f-20 selectable" @click="deleteBlog()"></i>
        </div>
        <p class="description">
          Check out my profile below!
        </p>
        <p class="description">
          <router-link :to="{name: 'User', params: {id: blog.creatorId}}" class="selectable">
            <img :src="blog.creator.picture" class="" width="64">
            {{ blog.creator.name }}
          </router-link>
        </p>
        <h3 class="description selectable" :data-bs-target="'#blog-modal-' +blog.id" data-bs-toggle="modal">
          Read more!
        </h3>
      </div>
    </div>
  </div>

  <Modal :id="'blog-modal-' + blog.id">
    <template #modal-title>
      {{ blog.title }}
    </template>
    <template #modal-body>
      <div class="row text-center">
        {{ blog.body }}
      </div>
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { blogsService } from '../services/BlogsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteBlog() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await blogsService.deleteBlog(props.blog.id)
          Pop.toast('Deleted!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

main {
  padding: 0 64px 64px;
}
header{
  border-radius: 16px;
}
.card {
  border-radius: 16px;
  margin: 0 auto;
  width: 350px;
  max-width: 100%;
  min-height: 350px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  background-image: url(https://source.unsplash.com/collection/905011/1000x1000);
  background-size: cover;
}

.info {
  position: relative;
  width: 100%;
  height: 350px;
  background-color: rgba(255, 255, 255, 0.459);
  transform: translateY(100%)
    translateY(-88px)
    translateZ(0);
  transition: transform 0.5s ease-out;
}

.info:before {
  z-index: -1;
  display: block;
  position: absolute;
  content: ' ';
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url(https://source.unsplash.com/collection/905011/1000x1000);
  filter: blur(10px);
  background-size: cover;
  opacity: 0.25;
  transform: translateY(-100%)
    translateY(88px)
    translateZ(0);
  transition: transform 0.5s ease-out;
}

.card:hover .info,
.card:hover .info:before {
  transform: translateY(0) translateZ(0);
}

.title {
  margin: 0;
  padding: 24px;
  font-size: 40px;
  line-height: 1;
  color: rgba(0, 0, 0, 0.87);
}

.description {
  margin: 0;
  padding: 0 24px 24px;
  font-size: 18px;
  line-height: 1.5;
}

/* General layout and typography stuff */
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400");

* {
  box-sizing: border-box;
  position: relative;
  transition: all .3s ease
}

html {
  font-size: 16px
}

body {
  font-family: Open Sans, Verdana, sans-serif;
  color: rgba(0, 0, 0, .87);
  font-weight: 400;
  line-height: 1.45
}

body,
header {
  background: #fafafa
}

header {
  padding: 40px;
  min-height: 200px;
  text-align: center;
  color: rgba(0, 0, 0, .87)
}

header > * {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto
}

header>:last-child {
  margin-bottom: 0
}

h1 {
  margin-bottom: 0.5em;
  font-weight: inherit;
  line-height: 1.2;
  color: #1c5b72;
  font-size: 2.618em
}

@media (min-width:800px) {
  h1 {
    font-size: 4.236em;
    font-weight: 300
  }
}

p {
  margin-bottom: 1.3em;
  line-height: 1.618
}

@media (min-width:800px) {
  p {
    font-size: 1.3em
  }
}

a {
  color: #e03616;
  text-decoration: none
}

</style>
