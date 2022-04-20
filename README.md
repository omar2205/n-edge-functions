## API

```
todo: {
  id: string
  title: string
  done: bool
  timestamp: date JSON
}
ex:
  {
    "id": "todo_UjUzlndwwg3AQqGI-MliD",
    "title": "create the frontend",
    "done": "false",
    "timestamp": "2022-04-20T08:30:01.990Z"
  }
```

#### GET `/api/todos`

Get all todos

Return: array of all todos

#### POST `/api/todo`

Add a todo

Request body: `{title: string, done: 'true|false'}`

Return:

1. `{ msg: 'added', code: 100 }` if successful
2. `{ msg: 'error|error msg', code: 500 }` if failed

#### PUT `/api/todo`

Update(replace) a todo

Request body: `{id: string, title: string, done: 'true|false'}`

Return:

1. `{ msg: 'updated', code: 100 }` if successful
2. `{ msg: 'error|error msg', code: 500 }` if failed

#### DELETE `/api/todo/:id`

Delete a todo

~~Request body: `{id: string, title: string, done: 'true|false'}`~~

Return:

1. `{ msg: 'deleted', code: 100 }` if successful
2. `{ msg: 'error|error msg', code: 500 }` if failed


### utils

```js
// get date 20 Apr 2022
new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
}).format(n)
// get time 10:16
new Intl.DateTimeFormat('en-GB', { minute: 'numeric', hour: 'numeric' }).format(
  n
)
```
