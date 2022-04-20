<script lang="ts">
  import TodosList from './components/TodosList.svelte'
</script>

<main>
  <h1>Todo</h1>
  <TodosList />
</main>

<style>
  @import url('./global.css');
  main {
    background-color: var(--main-bg);
    padding: 1rem;
    margin-inline: auto;

    width: 90vw;
    max-width: 400px;
    border-radius: 16px;
  }
</style>
