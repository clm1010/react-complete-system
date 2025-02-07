import { nanoid } from 'nanoid'
import { makeObservable, observable, action, computed } from 'mobx'

/**
 * @description Todo class
 */
export class ObservableTodoStore {
	id = ''
	task = ''
	completed = false

	constructor(task: string) {
		// 手动增加监听，一旦有变化，就会重新渲染
		makeObservable(this, {
			id: observable,
			task: observable,
			completed: observable,
			rename: action,
			toggleCompleted: action
		})

		this.id = nanoid(5)
		this.task = task
	}

	rename(newName: string) {
		this.task = newName
	}

	toggleCompleted() {
		this.completed = !this.completed
	}
}

/**
 * @description TodoList class
 */
export class ObservableTodoListStore {
	todos: ObservableTodoStore[] = []

	constructor() {
		makeObservable(this, {
			todos: observable,
			completedTodos: computed, // 计算属性
			addTodo: action, // 修改造作
			removeTodo: action // 修改造作
		})
	}

	// get（用于计算，不用于修改） 获取已经完成的 todo 数量
	get completedTodos() {
		return this.todos.filter((todo) => todo.completed).length
	}

	addTodo(task: string) {
		const newTodo = new ObservableTodoStore(task)
		this.todos.push(newTodo) // 声明式，像 Vue
	}

	removeTodo(id: string) {
		const index = this.todos.findIndex((todo) => todo.id === id)
		this.todos.splice(index, 1)
	}
}

const store = new ObservableTodoListStore()
export default store
