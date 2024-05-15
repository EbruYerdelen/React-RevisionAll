import React from 'react';



export default function Header(props) {



  return (
    <div className={props.trueFalse ? "header-container-light": "header-container-dark"}>
      <div className='title-container'>
        <img
          className="head-img"
          src="/black-music-note-icon-6.png"
          alt="note-icon"
        />
        <h1>SongQuiz</h1>
      </div>
      <img className="toggle-icon" src={props.trueFalse ? "lightbutton.png" : "darkbutton.png"} alt="toggle-icon" onClick={()=> props.trueFalseHandler()} />
    </div>
  );
}