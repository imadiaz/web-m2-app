import {ConfigProvider} from 'antd'
import BaseLayout from './pages/layouts/BaseLayout'

function App() {


  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#e73773'
        }
      }}
    >
    <BaseLayout/>
    </ConfigProvider>
  )
}

export default App
