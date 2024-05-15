import React from 'react'
import { useState } from 'react'
import './App.css'
import Header from './Header'
import Genre from './Genre'
import Test from './Test'
import "react-h5-audio-player/lib/styles.css";


function App() {
  const [toggle, setToggle] = React.useState(true);


  function trueFalseHandler() {
    setToggle(prevvalue=>!prevvalue);
  }



  return (
    <div className="all-container">
      <Header
        trueFalseHandler={trueFalseHandler}
        trueFalse={toggle}
      />
      <Genre
        trueFalseHandler={trueFalseHandler}
        trueFalse={toggle}
      />
      <Test
        trueFalseHandler={trueFalseHandler}
        trueFalse={toggle}
      />
    </div>
  );
}

export default App
