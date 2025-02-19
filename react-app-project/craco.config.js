module.exports = {
	devServer: {
		// proxy: {
		// 	'/api': {
		// 		target: 'http://localhost:3001',
		// 		changeOrigin: true,
		// 		pathRewrite: {
		// 			'^/api': '/'
		// 		}
		// 	}
		// }
		port: 8080, // B 端，前端 端口
		proxy: {
			'/api': {
				target: 'http://localhost:3001', // Mock 服务
				changeOrigin: true
			}
		}
	}
}
