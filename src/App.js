import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useRef } from 'react';
import randomWords from 'random-words';

const nWords = 100;
const  SECONDS = 10;

function App() {
  const [ words, setWords ] = useState([]);
  const [ countDown, setCountDown ] = useState(SECONDS);
  const [currInput, setCurrInput ] = useState('');
  const [ currWordIndex, setCurrWordIndex ] = useState(0);
  const [ correct, setCorrect ] = useState(0)
  const [ incorrect, setIncorrect ] = useState(0)
  const [ status, setStatus ] = useState("waiting")
  const textInput = useRef(null)

   useEffect(()=> {
     setWords(generateWords());
   }, []);
   useEffect(()=> {
    if(status === "started"){
      textInput.current.focus()
    }
   }, [status])

   function generateWords() {
   return new Array(nWords).fill(null).map(()=> randomWords())
   }
   function start(){
    if(status === 'finished'){
      setWords(generateWords())
      setCurrWordIndex(0)
      setCorrect(0)
      setIncorrect(0)
    }

    
  return (
    <div className="App m-3">
      <div className="container fs-4 text-primary d-flex justify-content-center">
        <h2>{countDown}</h2>
      </div>
      <div className="container-fluid mb-5">
        <input ref={textInput} disabled={status !== "started"} type="text" className="form-control" onKeyDown={handleKeyDown} value={currInput} onChange={(e) => setCurrInput(e.target.value)}/>
      </div>
      <div className="container">
        <button className="btn btn-info w-100 mb-4" onClick={start}>Start</button>
      </div>
     
      )}
    </div> 
  );
}

export default App;
