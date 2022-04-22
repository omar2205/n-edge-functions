<script lang="ts">
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'
  import { getAllTodos } from '../lib/todoService'
  import Todo from './Todo.svelte'

  let todos = writable(['loading'])

  onMount(async () => {
    $todos = [...(await getAllTodos())]
    if($todos.length === 0) $todos[0] = 'no-todos'
  })

  const toggle = ({ detail: { todo } }) => {
    const idx = $todos.indexOf(todo)
    $todos[idx].completed = !$todos[idx].completed
  }
</script>

<div class="todos">
  {#if $todos[0] === 'no-todos'}
    <p style:text-align="center">Nothing todo. Add a new one.</p>
  {:else}
    {#each $todos as todo}
      <Todo {todo} on:toggle={toggle} />
    {:else}
      <p style:text-align="center">Loading...</p>
    {/each}
  {/if}
</div>

<style>
  .todos {
    max-width: var(--max-width);
    background-color: var(--todos-bg);
    color: var(--todos-text-color);
    margin-block: 6rem 1rem;
    margin-inline: auto;
    padding: 1rem 0;
    border-radius: 16px;
  }
</style>
