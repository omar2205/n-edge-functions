<script lang="ts">
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { getAllTodos } from '../lib/todoService'
  import Todo from './Todo.svelte'

  let todos = writable([])

  onMount(async () => {
    $todos = [...(await getAllTodos())]
  })

  const toggle = ({ detail: { todo } }) => {
    const idx = $todos.indexOf(todo)
    $todos[idx].completed = !$todos[idx].completed
  }
</script>

<div class="todos">
  {#each $todos as todo}
    <Todo {todo} on:toggle={toggle} />
  {:else}
    <p style:text-align="center">Loading...</p>
  {/each}
</div>

<style>
  .todos {
    max-width: var(--max-width);
    background-color: var(--todos-bg);
    color: var(--todos-text-color);
  }
</style>