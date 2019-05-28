import * as React from 'react'
import { Todo } from 'store/todo.store'

interface TodoListItemProps {
  todo: Todo
}

export const TodoListItem = ({ todo }: TodoListItemProps) => {
  console.log('item item', todo)
  return <div>{todo.task}</div>
}