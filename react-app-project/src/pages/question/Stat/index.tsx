import type { FC } from 'react'
import { useTitle } from 'ahooks'

const Stat: FC = () => {
	useTitle('问卷统计')
	return (
		<div>
			<h1>Stat</h1>
		</div>
	)
}

export default Stat
