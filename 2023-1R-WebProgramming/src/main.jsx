import React from 'react'
import ReactDOM from 'react-dom/client'
import Worldcup from './Worldcup.jsx'
import './index.css'
//react dom.create 어쩌구저쩌구 그대로 실행
//아이디가 루트인 엘리먼트를 찾아서 그 루트 안에다가 이 내용을 집어넣어라.
ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode>
    <Worldcup />
  </React.StrictMode>,
)
