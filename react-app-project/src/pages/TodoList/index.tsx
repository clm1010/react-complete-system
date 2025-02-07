import type { FC } from 'react'
import TodoList from './TodoList'
import store from '../../store/index'

const IndexDemo: FC = () => {
	return (
		<>
			<p>IndexDemo TodoList</p>
			<TodoList store={store} />
		</>
	)
}

export default IndexDemo
