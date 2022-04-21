<script lang="ts">
  import { addTodo } from '../lib/todoService'

  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let todo = {
    title: '',
    completed: false,
  }

  async function handleForm() {
    await addTodo(todo)
    dispatch('submit')
  }
</script>

<form on:submit|preventDefault={handleForm} in:fade out:fade={{ duration: 40 }}>
  <input type="text" bind:value={todo.title} />
  <!-- <input type="button" value="Add" /> -->
  <button>Add</button>
</form>

<style>
  form {
    display: flex;
    gap: 0.5rem;
  }
  input,
  button {
    border: 1px solid #eee;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    font-size: 1rem;
    width: 100%;
  }
  button {
    width: fit-content;
    max-width: 120px;
    cursor: pointer;
    background: var(--main-bg);
  }
  button:hover {
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
  }
</style>
