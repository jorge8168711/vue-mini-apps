<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onSubmit', 'onToggle'],
  props: {
    allCompleted: { type: Boolean, required: false, default: false },
    onToggle: { type: Function, required: false, default: () => {} }
  },
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', this.newTodo)
      this.newTodo = ''
    }
  }
})
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <button :class="{ disabled: !allCompleted }" @click="$emit('onToggle')" type="button">*</button>
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
button.disabled {
  opacity: 0.35;
}
</style>
