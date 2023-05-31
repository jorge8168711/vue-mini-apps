<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['submit', 'completeAll'],
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', this.newTodo)
      this.newTodo = ''
    }
  }
})
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <button @click="$emit('completeAll')" type="button">*</button>
    <input class="input" v-model="newTodo" type="text" placeholder="What needs to be done?" />
  </form>
</template>

<style scoped>
.form {
  display: flex;
  margin-bottom: 1rem;
}
.input {
  width: 100%;
}
</style>
