import React ,{Suspense,lazy } from 'react'
import {Link , Routes , Route} from 'react-router-dom'

const Home = lazy(()=> import(/*webpackChunkName:"home"*/"./page/Home"))
const User = lazy(()=> import(/*webpackChunkName:"user"*/"./page/User"))
export default function App(){
    return <>
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
    </>
}
