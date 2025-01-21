import type { FC } from 'react'
import { useParams } from 'react-router'
import { useTitle } from 'ahooks'

const Edit: FC = () => {
	useTitle('编辑问卷')
	const { id = '' } = useParams()

	return (
		<div>
			<h1>Edit {id}</h1>
		</div>
	)
}

export default Edit
