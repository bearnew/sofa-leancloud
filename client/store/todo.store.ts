import {
    observable,
    action,
    reaction,
    computed
} from 'mobx';

export interface Todo {
    task: string,
    isComplete: boolean
}

export class TodoStore {
    @observable
    todoList: Todo[] = [{
        task: 'chinese',
        isComplete: true
    }, {
        task: 'math',
        isComplete: false
    }]

    constructor() {
        reaction(
            () => this.todoList.filter(todo => !todo.isComplete),
            incompletedTasks => {
                if (incompletedTasks.length > 5) {
                    console.log(`Shaun. You've got too much your plate.`)
                }
            }
        )
    }

    @computed
    get completedTasks(): number {
        return this.todoList.filter(todo => todo.isComplete).length;
    }

    @action
    addTodo(task: string) {
        console.log('add', task)
        this.todoList.push({ task, isComplete: false })
        console.log('list', this.todoList)
    }

    @action
    completeTodo(completeTodo: Todo) {
        this.todoList.find(todo => todo === completeTodo).isComplete = true
    }
}

export const todoStore = new TodoStore();
