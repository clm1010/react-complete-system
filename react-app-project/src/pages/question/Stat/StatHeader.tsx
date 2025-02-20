import type { FC } from 'react'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { Button, Space, Typography, Input, Tooltip, message, Popover } from 'antd'
import type { InputRef } from 'antd'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import styles from './StatHeader.module.scss'

const { Title } = Typography

/**
 * @description 问卷统计头部
 */
const StatHeader: FC = () => {
	const nav = useNavigate()
	const { id } = useParams()
	const { title, isPublished } = useGetPageInfo()

	// 拷贝链接
	const urlInput = useRef<InputRef>(null) // 使用 useRef 操作dom，获取 input 元素
	const handleCopyLink = () => {
		// 拷贝到剪贴板
		const elem = urlInput.current
		if (elem == null || elem.input == null) return
		elem.select() // 选中 input 文本内容
		document.execCommand('copy') // 执行浏览器复制命令，拷贝选中的文本内容, 可以使用，后面很可能会废弃
		// navigator.clipboard.writeText(elem.input.value) // 使用 navigator.clipboard 拷贝
		message.success('链接已拷贝到剪贴板')
	}

	// 生成链接和二维码
	const genLinkAndQRCodeElem = () => {
		// 判断问卷是否发布
		if (typeof isPublished === 'boolean' && !isPublished) return null

		// 拼接 url, 需要参考 C 端的规则
		const url = `http://localhost:3001/question/${id}`

		// 生成二维码
		const QRCodeElem = (
			<div className={styles['qrcode-wrapper']}>
				<QRCodeSVG value={url} size={150} />
			</div>
		)
		return (
			<Space>
				<Input ref={urlInput} value={url} style={{ width: '360px' }} />
				<Tooltip title="拷贝链接">
					<Button type="default" icon={<CopyOutlined />} onClick={handleCopyLink} />
				</Tooltip>
				<Popover content={QRCodeElem} trigger="click">
					<Button type="default" icon={<QrcodeOutlined />} />
				</Popover>
			</Space>
		)
	}

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<Title level={5} style={{ margin: 0 }}>
							{title}
						</Title>
					</Space>
				</div>
				<div className={styles.main}>{genLinkAndQRCodeElem()}</div>
				<div className={styles.right}>
					<Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
						编辑问卷
					</Button>
				</div>
			</div>
		</div>
	)
}

export default StatHeader
