<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light fixed-bottom text-center p-4">
      <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
        About
      </router-link>
      Made by JOSH N DEREK
    </div>
    <div class="bg-dark text-light text-center p-4">
      <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
        About
      </router-link>
      Made by JOSH N DEREK
    </div>
  </footer>
  <Modal id="blog-form">
    <template #modal-title>
      <h4>Add a Blog!</h4>
    </template>
    <template #modal-body>
      <BlogForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
