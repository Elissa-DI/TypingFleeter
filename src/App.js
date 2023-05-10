import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import randomWords from 'random-words';

const nWords = 100;
const  SECONDS = 60;

function App() {
  const [ words, setWords ] = useState([]);
  const [ countDown, setCountDown ] = useState(SECONDS);
  const [currInput, setCurrInput ] = useState('');

   useEffect(()=> {
     setWords(generateWords());
   }, []);

   function generateWords() {
   return new Array(nWords).fill(null).map(()=> randomWords())
   }
   function start(){
    let interval = setInterval(()=> {
      setCountDown((prevCountdown) => {
        if(prevCountdown === 0){
          clearInterval(interval)
        } else {
          return prevCountdown - 1
        }
      })
    }, 1000);
    console.log('Clicked');
   }

   function onKeyDown(event) {
     console.log(event.key);
   }
  return (
    <div className="App m-3">
      <div className="container fs-4 text-primary d-flex justify-content-center">
        <h2>{countDown}</h2>
      </div>
      <div className="container-fluid mb-5">
        <input type="text" className="form-control" onKeyDown={onKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}/>
      </div>
      <div className="container">
        <button className="btn btn-info w-100 mb-4" onClick={start}>Start</button>
      </div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {words.map((word, i) => (
                <span key={i}>
                  <span>
                    {word.split('').map((char, idx) => (
                       <span key={idx}>{char}</span>
                    ))}
                  </span>
                  <span> </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default App;
