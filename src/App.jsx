import React ,{Suspense,lazy,useState } from 'react'
import {Link , Routes , Route} from 'react-router-dom'
import {Button , Radio,ConfigProvider} from 'antd'

const Home = lazy(()=> import(/*webpackChunkName:"home"*/"./page/Home"))
const User = lazy(()=> import(/*webpackChunkName:"user"*/"./page/User"))
export default function App(){
    const [size , setSize] = useState("large")
    return <>
        <ConfigProvider theme={{
            components:{
                // 设置全局的button默认主题颜色为红色
                Button:{
                    colorPrimary:"red"
                }
            }
        }}>
            <h1>按钮大小选择器</h1>
            <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
            <h3>按钮展示效果</h3>
            <div>
            <Button size={size} type='primary'>Default</Button>
            </div>
            <h1>React App</h1>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/user">User</Link>
                </li>
            </ul>
            <Suspense>
                <Routes>
                    <Route path='/home' Component={Home}></Route>
                    <Route path='/user' Component={User}></Route>
                </Routes>
            </Suspense>
        </ConfigProvider>
    </>
}
