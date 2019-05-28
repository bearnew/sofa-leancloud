import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'mobx-react';
import { TodoStore, todoStore } from 'store/todo.store';
import { TodoAdd } from './todo.add';
import { TodoList } from './todo.list'

export class App extends Component {
  private todoStore: TodoStore

  render() {
    console.log('11111');
    return (
      <Provider todoStore={this.todoStore}>
        <div>
          <TodoAdd todoStore={todoStore} />
          <TodoList todoList={todoStore.todoList} />
        </div>
      </Provider>
    )
  }
}
