//앱이라고 하는 이름의 함수 생성. html 코드를 그대로 반환하는 함수 -> jsx문법
//리액트는 App함수를 매번 실행시킨다. one-way-date-binding. 리액트한테 html 결과를 리턴. 
//리액트는 그 결과를 화면에 뿌려줌(App()함수를 실행하는 걸로 역할을 다 함)
//우리는 리액트가 어떻게 언제 몇 번 실행될 지 예상하기 어려움. 그렇기 때문에 App()는 항상 pure function이여야 함
//프로그램 함수의 결과가 매개변수를 통해서만 바뀌는 것.

import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {
  // const [count, setCount] = useState(0) //훅
  const [row, setRow] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('mount or update');
    return () => console.log('unmount(update ready)');
    
  });

  useEffect(() => {
    console.log('mount only');
      if(row.length == 0){
      const res = fetch("http://openapi.seoul.go.kr:8088/71747673467a657235396c54657648/json/RealtimeCityAir/1/25/").then(
        function(res2){
          res2.json().then( function(res3){
            setRow(res3.RealtimeCityAir.row);
          });
        });
    }
  }, []);

  useEffect(() => {
    console.log('row only');
  },[row]);
//모든 컴포넌트의 업데이트를 두 번씩 실행해줌 
  
useEffect(() => {
  document.title = `You clicked ${count} times`;
  console.log({count})
  return () => {
    document.title = "vite + React";
  };
}, [count]);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button style={buttonStyle} onClick={() => setIsLoad(!isLoad)}>테이블 생성</button>
      {isLoad && (
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>구이름</th>
            <th style={thStyle}>PM10</th>
            <th style={thStyle}>O3</th>
            <th style={thStyle}>상태</th>
          </tr>
          </thead>
          <tbody>
            {row.map((obj, index) => {
              return (
                <tr key={index}>
                  <td style={tdStyle}>{obj.MSRSTE_NM}</td>
                  <td style={tdStyle}>{obj.PM10}</td>
                  <td style={tdStyle}>{obj.O3}</td>
                  <td style={tdStyle}>{obj.IDEX_NM}</td>
                </tr>
              )
            })}
         
          </tbody>
        
      </table>
      )}
       <div className="card">
        <button style={buttonStyle} onClick={() => setCount((count) => count + 1)}>
          Count 증가
        </button>
      </div>
       {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

//앱이라고 하는 함수를 바깥으로 보내주는 역할. 내가 허락한 것들만 사용할 수 있음(자바 스크립트의 기본 문법)
export default App

const tableStyle = {
  border: "1px solid black",
  borderCollapse: "collapse",
  textAlign: "center",
  margin: "auto",
  width: "400px"
};

const buttonStyle = {
  border: "1px solid green",
  width: "150px",
  height: "50px",
  marginBottom: "50px",
  backgroundColor: "#C8E6C9"
}

const tdStyle = {
  border: "1px solid gray",
  width: "100px",
}

const thStyle = {
  backgroundColor: "#C8E6C9",
  border: "1px solid gray"
}