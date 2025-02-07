import { useEffect, type FC } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

// Model the application store
class Timer {
	secondsPassed = 0
	constructor() {
		makeAutoObservable(this) // 自动的为这个实例增加监听
	}
	increase() {
		this.secondsPassed++
	}
	reset() {
		this.secondsPassed = 0
	}
}

const myTimer = new Timer()

type PropsType = {
	timer: Timer
}

const TimerView = observer((props: PropsType) => {
	const { timer } = props
	return <button onClick={() => timer.reset()}> Seconds passed: {timer.secondsPassed}</button>
})

const BasicDemo: FC = () => {
	useEffect(() => {
		const interval = setInterval(() => {
			myTimer.increase()
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div>
			<p>BasicDemo</p>
			<TimerView timer={myTimer}></TimerView>
		</div>
	)
}

export default BasicDemo
