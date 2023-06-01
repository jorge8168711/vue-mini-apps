<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onClear'],
  props: {
    remaining: { type: Number, required: false, default: 0 },
    todosCount: { type: Number, required: false, default: 0 },
    visibility: { type: String, required: false, default: 'all' }
  }
})
</script>

<template>
  <footer class="footer">
    <p>{{ remaining }} item{{ remaining > 1 ? 's' : '' }} left</p>

    <ul class="filters">
      <li>
        <a class="filter-item" href="#/all" :class="{ selected: visibility === 'all' }">All</a>
      </li>
      <li>
        <a class="filter-item" href="#/active" :class="{ selected: visibility === 'active' }"
          >Active</a
        >
      </li>
      <li>
        <a class="filter-item" href="#/completed" :class="{ selected: visibility === 'completed' }"
          >Completed</a
        >
      </li>

      <li v-show="todosCount > remaining">
        <button @click="$emit('onClear')" type="button" class="filter-item">Clear Completed</button>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
.filters,
.footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filters {
  list-style: none;
  padding: 0 0 0 2rem;
  margin: 0;
  justify-content: flex-end;
  flex: 1;
}

button.filter-item {
  margin-left: 1.5rem;
}
.filter-item {
  text-decoration: none;
  color: inherit;
  padding: 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  opacity: 0.5;
  transition: all 0.1s linear;
  margin: 0;
}

.filter-item.selected {
  background-color: var(--selection);
  opacity: 1;
}
</style>
