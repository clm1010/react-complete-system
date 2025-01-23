import type { FC } from 'react'
// import { useParams } from 'react-router'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'

const Edit: FC = () => {
	useTitle('编辑问卷')
	// const { id = '' } = useParams()
	const { loading, data } = useLoadQuestionData()

	return (
		<div>
			<p>Edit page</p>
			{loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
		</div>
	)
}

export default Edit
