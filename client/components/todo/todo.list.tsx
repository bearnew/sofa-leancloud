import * as React from 'react'
import { observer, inject } from 'mobx-react'

import { Todo } from 'store/todo.store'
import { TodoListItem } from './todo.list.item'

interface TodoListProps {
  todoList?: Todo[]
}

// export const TodoList = inject('todoStore')(
//   observer(({ todoStore: { todoList } }: TodoListProps) =>
//     todoList.map((todo, idx) => <TodoListItem key={idx} todo={todo} />),
//   ),
// )

@observer
export class TodoList extends React.Component<TodoListProps> {
	render() {
		console.log('render list', this.props)
		return (
			<div>
				{
					this.props.todoList.map((todo, idx) => {
						console.log(idx)
						return <TodoListItem key={idx} todo={todo} />
					}
					)

				}
			</div>
		);
	}
}
