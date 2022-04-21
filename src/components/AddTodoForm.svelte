<script lang="ts">
  let todo = {
    title: '',
    done: false
  }
</script>

<form>
  <input type="text" bind:value={todo.title} />
</form>

<pre>
  {JSON.stringify(todo, null, 2)}
</pre>