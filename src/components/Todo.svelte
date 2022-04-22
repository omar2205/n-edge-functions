<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import type { Todo } from '../types'
  export let todo: Todo

  const dispatch = createEventDispatcher()

  function toggle() {
    dispatch('toggle', { todo })
  }
</script>

<div
  class="todo"
  role="checkbox"
  aria-checked={todo.completed}
  tabindex="0"
  on:click={toggle}
>
  <h3 class:done={todo.completed}>
    {todo.title}
  </h3>
</div>

<style>
  .todo {
    padding: 1rem 0;
    display: flex;
    cursor: pointer;
  }

  .todo:not(:last-child) {
    border-bottom: 1px solid #eee;
  }

  .todo h3 {
  }
  .todo h3.done {
    text-decoration: line-through;
    color: #888;
  }
</style>
