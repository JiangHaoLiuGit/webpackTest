import React from 'react';
import {Button} from 'antd'
import './index.less'

export default function Home(){
    return <>
        <div className='HomeDiv'>
            <Button type='primary'>Home</Button>
            <h1 className='HomeTitle'>Home Component~~</h1>
        </div>
    </>
}