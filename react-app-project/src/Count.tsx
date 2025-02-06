import type { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrease } from './store/count'
import type { StateType } from './store/index'

export const Count: FC = () => {
	const count = useSelector<StateType>((state) => state.count)
	const dispatch = useDispatch()

	return (
		<div>
			<span>
				<>count: {count}</>
			</span>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(decrease())}>-</button>
		</div>
	)
}

export default Count
