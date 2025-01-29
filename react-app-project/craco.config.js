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
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    port: 8080
  }
}
