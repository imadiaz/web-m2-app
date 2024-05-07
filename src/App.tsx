import { Button, ConfigProvider, DatePicker, Space } from 'antd'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ConfigProvider
      theme={{
        token:{
          colorPrimary: '#e73773'
        }
      }}
    >
      <div>
      <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
      </Space>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ConfigProvider>
  )
}

export default App
