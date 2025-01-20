import { RouterProvider } from 'react-router'
import routerConfig from './router'
import 'antd/dist/reset.css'

function App() {
	return <RouterProvider router={routerConfig}></RouterProvider>
}
export default App
