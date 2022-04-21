<script lang="ts">
  import { fade } from 'svelte/transition'
  import AddTodoForm from './components/AddTodoForm.svelte'
  import TodosList from './components/TodosList.svelte'

  let headerOpen

  const toggleHeader = () => {
    headerOpen = !headerOpen
  }
</script>

<main class="{headerOpen ? 'header-open' : null}">
  <header>
    <h1>Todo</h1>
    <button on:click={toggleHeader}></button>
  </header>
  {#if headerOpen}
    <AddTodoForm />
    <input in:fade out:fade="{{duration: 40 }}" type="text" name="todo">
  {/if}
</main>
<TodosList />

<style>
  @import url('./global.css');
  main {
    background-color: var(--main-bg);
    padding: 1rem;
    margin-inline: auto;

    height: 80px;
    width: 90vw;
    max-width: var(--max-width);

    border-radius: 0 0 16px 16px;
    box-shadow: 0 0 20px 2px rgb(0 0 0 / 10%);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: height 200ms ease-in-out;

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  main.header-open {
    height: 130px;
    box-shadow: 0 0 20px 16px rgb(0 0 0 / 10%);
  }
  main header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  main header button {
    background: url('/plus.svg');
    background-size: cover;
    border: none;
    width: 25px; height: 26px;
    cursor: pointer;
  }
</style>
