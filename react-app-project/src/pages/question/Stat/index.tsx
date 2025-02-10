import type { FC } from 'react'
import { useTitle } from 'ahooks'
// import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Stat: FC = () => {
	useTitle('问卷统计')

	// const { loading, data } = useLoadQuestionData()
	return (
		<div>
			<p>Stat</p>
			{/* {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>} */}
		</div>
	)
}

export default Stat
