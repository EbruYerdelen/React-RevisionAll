import React from "react"
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function Genre(props) {
  const [storeTrack, setStoreTrack] = React.useState([]);
  const [trackName, setTrackName] = React.useState("");
  const [randomSong, setRandomSong] = React.useState("");
  const [shazam, setShazam] = React.useState("");
  const [inputText1, setInputText1] = React.useState("");
  const [inputText2, setInputText2] = React.useState("");
  const [arrayOfInput1, setArrayOfInput1] = React.useState([]);
  const [arrayOfInput2, setArrayOfInput2] = React.useState([]);
  const [arrayOfName, setArrayOfName] = React.useState(["."]);
  const [arrayOfGenres, setArrayOfGenres] = React.useState(["."]);
  const [isActive1, setIsActive1] = React.useState("not_visited");
  const [isActive2, setIsActive2] = React.useState("not_visited");
  const [optionss, setOptionss] = React.useState({
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "22c0cd51a0mshb0e18d93331bf32p1e417ajsncd149f83766f",
      "X-RapidAPI-Host": "shazam-song-recognition-api.p.rapidapi.com",
    },
  });

  

  const url =
    "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "22c0cd51a0mshb0e18d93331bf32p1e417ajsncd149f83766f",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };



  React.useEffect(() => {
    fetch(url, options)
      .then((resolve) => resolve.json())
      .then((datas) => setStoreTrack(datas.tracks));
  }, []);
  console.log(storeTrack); //you will use storeTrack[x].preview_url as below


  
  async function randomUrl() {
    var x = Math.floor(Math.random() * 20);
    var randomTrackName = storeTrack[x].name;
    var randomTrack = storeTrack[x].preview_url ? storeTrack[x].preview_url : "error,try again";
    setRandomSong(randomTrack);
    setTrackName(randomTrackName);

    const apiUrl =
      "https://shazam-song-recognition-api.p.rapidapi.com/recognize/url?url=" +
      `${randomTrack}` +
      ".mp3";
    
    try {
      await fetch(apiUrl, optionss)
        .then((response) => response.json())
        .then((datass) => setShazam(datass.track.genres.primary));
      return shazam;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }

    
  }




  
const stringToArray = (string) => {
  if (string && typeof string === "string") {
    return string.split("");
  } else {
    return []; 
  }
};

  React.useEffect(() => {
    console.log("randomSong:", randomSong);
    console.log("storeTrack:", storeTrack);
    console.log("storeTrackName:", trackName);//note urself that no issue occured
    if (randomSong && storeTrack && trackName) {
      const arrayOfLetters = stringToArray(trackName);
      const arrayOfGenre = stringToArray(shazam)
      setArrayOfName(arrayOfLetters);
      setArrayOfGenres(arrayOfGenre);
      console.log(arrayOfLetters);
      console.log(arrayOfGenre);
    } else {
      console.log("invalid name");
      console.log(arrayOfName);
    }
  },[randomSong,storeTrack,shazam])
  
  

const areArraysEqual = (array1, array2) => {
  if (array1.length !== array2.length) {
    return "false";
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].toLowerCase() !== array2[i].toLowerCase()) {
      return "false";
    }
  }

  return "true";
};




  const handleChange1 = (event) => {
    const value = event.target.value;
    setInputText1(value);

    if (value) {
      const arrayOfInput = stringToArray(value); //use the value directly instead of inputText1 because setInputText1 is an asynchronous function. When you call setInputText1(event.target.value), the state update doesn't happen immediately. Therefore, when you immediately try to access inputText1 after setting it, you're still getting the old value.
      setArrayOfInput1(arrayOfInput);
    } else {
      console.log("invalid entry");
    }
  }

  const handleSubmit1 = () => {
    const equality1 = areArraysEqual(arrayOfInput1, arrayOfName);
    console.log(`letter equality: ${equality1}`);
    setIsActive1(equality1);


  };

  const handleChange2 = (event) => {
    const valuee = event.target.value;
    setInputText2(valuee);

    if (valuee) {
      const arrayOfInputGen = stringToArray(valuee); //use the value directly instead of inputText1 because setInputText1 is an asynchronous function. When you call setInputText1(event.target.value), the state update doesn't happen immediately. Therefore, when you immediately try to access inputText1 after setting it, you're still getting the old value.
      setArrayOfInput2(arrayOfInputGen);
    } else {
      console.log("invalid entry");
    }
  };

  const handleSubmit2 = () => {
    const equality2 = areArraysEqual(arrayOfInput2, arrayOfGenres);
    console.log(`letter equality: ${equality2}`);
    setIsActive2(equality2);
  };




  /*note: now create a function which returns true if inputText1 letters match all
  the array elements arrayOfLetters.Then go to nameGuess className and write down template literal as
  if function ? classname1 : classname 2*/
  //same for genreGuess


  const handleClear = () => {
    setInputText1("");
    setInputText2("");
    setIsActive1("not_visited");
    setIsActive2("not_visited");
  };
  

  return (
    <div
      className={
        props.trueFalse ? "songshift-container" : "songshift-container-dark"
      }
    >
      <div className="form">
        <div
          className={
            isActive1 === "true"
              ? "quizTrue"
              : isActive1 === "not_visited"
              ? "nameGuess"
              : "quizFalse"
          }
        >
          <label htmlFor="songName">Guess the name!</label>
          <input
            type="text"
            id="songName"
            name="songName"
            onChange={handleChange1}
            value={inputText1}
            placeholder="Enter the name of this song"
          />
          <button
            disabled={randomSong ? false : true}
            className="submit1"
            type="button"
            onClick={() => handleSubmit1()}
          >
            Go
          </button>
        </div>
        <div
          className={
            isActive2 === "true"
              ? "quizTrue"
              : isActive2 === "not_visited"
              ? "albumGuess"
              : "quizFalse"
          }
        >
          <label htmlFor="album">Guess the genre!</label>
          <input
            type="text"
            id="album"
            name="album"
            onChange={handleChange2}
            value={inputText2}
            placeholder="Country,Dance,Alternative, Pop etc."
          />
          <button
            disabled={randomSong ? false : true}
            className="submit2"
            type="button"
            onClick={() => handleSubmit2()}
          >
            Go
          </button>
        </div>
      </div>

      <div className="btn">
        <button onClick={randomUrl} type="button">
          New Song
        </button>
        <button onClick={handleClear} type="button">
          Clear
        </button>
        <audio
          className="audio"
          controls
          src={randomSong}
          type="audio/mp3"
        ></audio>
      </div>
    </div>
  );
}

//next do the dark-light mode for all cont bg and audio.nd start on genre quiz,className={isActive1 ? "quizTrue" : "nameGuess"}


//isActive1==="true" ? "quizTrue" : isActive1 === "not_visited" || arrayOfName[0]==="." ? "nameGuess" : "quizFalse"

/*
<AudioPlayer
    autoPlay
    src="http://example.com/audio.mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />

<audio
          className="audio"
          controls
          src={randomSong}
          type="audio/mp3"
        ></audio>

*/




/*curl--request GET \
  --url https://api.spotify.com/v1/users/21loyfp7msbcn7rp24hn34b7a/playlists \
  --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z' */


/* 3 tane genre butonu oluştur bunlar pop rock ve rap olsun.Üçü için de ayrı ayrı state oluştur.
Bu üç genre butonuna her tıkladığında ilgili statelerde false inital değeri true'ya dönsün.Dolayısıyla bu genreların ilgili
stateleri güncellendiğinden o stateleri dependency array kabul eden useEffect ler(3 tane) işlesin ve o 3 genreyla
ilgili apiler çağrılsın


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
  method: "get",
  headers: myHeaders,
  redirect: "follow",
};




fetch(
    "https://v1.nocodeapi.com/roach/spotify/BZpQuCBbcAecpUOW/tracks?ids=7MW3s6XnZua7CNQAfmdGe8,1f7TtPm9WBppybO4kOTDf6,18lZDzgg3HetL1FmmcED1j,4gdrrJso0rBpLMdtc9dwnc,336ZYcU6poBWi3s8yzRcAD,6XIfvdcUqZSzTwtiotQIWy,4baao621cLQls5ng4vowV8,5huVQpB0KNryce4u1lxCyn,32bJv8V2Xgi5mtxdPcsi8B,5rpRzNcJZqKQXk9PIjreB6,7hxZF4jETnE5Q75rKQnMjE,4yEvfGgJ9tYfyfXXMLza1V,3Jq9rsqmRtqcVKtzP9dnxZ,62nQ8UZVqR2RMvkJHkcO2o,58HvfVOeJY7lUuCqF0m3ly",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));



    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        const data = setStoreTrack(result)
        console.log(data);
      } catch (error) {
        console.error(error);
      }



*/
