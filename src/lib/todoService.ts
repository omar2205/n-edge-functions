import type { Todo } from '../types.ts'

const API_URL = '/api'

export async function getAllTodos() {
  const todos = await fetch(`${API_URL}/todos`).then(async res => {
    const t = await res.json()
    t.forEach((_, idx, arr) => {
      arr[idx].completed = arr[idx].completed === 'true'
    })
    return t
  })
  return todos
}

export async function addTodo(todo: any) {
  const { code } = await fetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      title: todo.title,
      completed: todo.completed.toString(),
    }),
  }).then(r => r.json())

  if (code === 100) return true
  return false
}

export async function updateTodo(todo: Todo) {
  const { code } = await fetch(`${API_URL}/todo`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(todo),
  }).then(r => r.json())

  if (code === 100) return true
  return false
}

export async function deleteTodo(todo: Todo) {
  const { code } = await fetch(`${API_URL}/todo/${todo.id}`, {
    method: 'DELETE',
  }).then(r => r.json())

  if (code === 100) return true
  return false
}
