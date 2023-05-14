import { useEffect, useState } from "react";
import overwatch from './assets/images/다운로드.png';
import dead from './assets/images/데바데.jpg';
import raft from './assets/images/래프트.jpg';
import rusty from './assets/images/러스티레이크.jpg';
import craft from './assets/images/마인크래프트.jpg';
import lol from './assets/images/롤.jpg';
import maple from './assets/images/메이플.jpg';
import animal from './assets/images/모동숲.jpg';
import ballo from './assets/images/발로란트.jpg';
import battle from './assets/images/배그.jpg';
import unrailed from './assets/images/언레일드.jpg';
import apex from './assets/images/에이펙스.jpg';
import cooked from './assets/images/오버쿡드.jpg';
import call from './assets/images/콜옵듀.jpg';
import teraria from './assets/images/테라리아.jpg';
import tetris from './assets/images/테트리스.png';
import versus_icon from './assets/images/versus_icon.png';
import './assets/worldcup.css'


function Worldcup(){
  const candidates = [
    {name: '오버워치', src: overwatch},
    {name: '데드바이데이라이트', src: dead},
    {name: '래프트', src: raft},
    {name: '러스티레이크', src: rusty},
    {name: '마인크래프트', src: craft},
    {name: '롤', src: lol},
    {name: '메이플 스토리', src: maple},
    {name: '모여봐요 동물의 숲', src: animal},
    {name: '발로란트', src: ballo},
    {name: '배틀 그라운드', src: battle},
    {name: '언레일드', src: unrailed},
    {name: '에이펙스 레전드', src: apex},
    {name: '오버쿡드', src: cooked},
    {name: '콜 오브 듀티', src: call},
    {name: '테라리아', src: teraria},
    {name: '테트리스', src: tetris},
  ];

  const [game, setGame] = useState([]); //강에 따른 배열
  const [round, setRound] = useState(0); //round
  const [nextGame, setNextGame] = useState([]); //다음 강으로 넘어가기 위한 선택된 애들 저장되는 배열
  const [showImg, setShowImg] = useState(false); 

  useEffect(() => { //사진 랜덤으로
    setGame(candidates.map((c) => {
      return {name: c.name, src:c.src, order: Math.random()}
    }).sort((l, r) => {
      return l.order - r.order;
    }));
  },[]);

  useEffect(() => { //다음 강으로 넘어가기
    if(game.length>1 && round + 1 > game.length / 2) {
      setGame(nextGame);
      setNextGame([]);
      setRound(0);
    }
  },[round]);

 useEffect(() => {
    if(showImg) {
      setTimeout(() => { //3초 뒤에 사라지게
        setShowImg(false);
      }, 3000);
    }
  },[showImg]);

  if(game.length === 1) {
    return <div className="whole">
      <p className="worldcup-title">이상형 월드컵 우승</p>
      <img src={game[0].src} /><p className="choice-name">최종 우승자는 {game[0].name}입니다</p>
    </div>
  }
  if(game.length === 0 || round + 1 > game.length / 2) return <p>로딩중입니다</p>;
  return (
    <>
    <div className="whole">
        <p className="worldcup-title">게임 이상형 월드컵 {round + 1} / {game.length / 2} <b>{game.length === 2 ? "결승" : game.length + "강"}</b></p>
        <div className="img-container">
          <img className="versus" src={versus_icon} alt="versus" />
          <div style={{position: "relative"}}>
            <img className="choice" src={game[round*2].src} alt={game[round*2].name} onClick={() => {
              setNextGame((prev) => prev.concat(game[round*2]));
              setRound(r => r+1);
              setShowImg(!showImg);
            }}/>
            <p className="choice-name">{game[round*2].name}</p>
          </div>
          <div style={{position:"relative"}}>
          <img className="choice" src={game[round*2+1].src} alt={game[round*2+1].name} onClick={() => {
            setNextGame((prev) => prev.concat(game[round*2+1]));
            setRound(r => r+1);
            setShowImg(!showImg);
          }}/>
          <p className="choice-name">{game[round*2+1].name}</p>
         
          </div>
          
        </div>
        {showImg && (
            <img className="selected-img" src={nextGame[round-1].src} alt={nextGame[round-1].name}/>
          )}
      </div>
    </>
  )
}

export default Worldcup