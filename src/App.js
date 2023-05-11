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

    if(status !== 'started'){
      setStatus('started')
      let interval = setInterval(()=> {
        setCountDown((prevCountdown) => {
          if(prevCountdown === 0){
            clearInterval(interval)
            setStatus('finished')
            setCurrInput("")
            return SECONDS
          } else {
            return prevCountdown - 1
          }
        })
      }, 1000);
      console.log('Clicked');
    }
   }

   function handleKeyDown({keyCode}) {
      if (keyCode === 32) {
        checkMatch()
        setCurrInput("")
        setCurrWordIndex(currWordIndex + 1)
      }
   }
   function checkMatch() {
     const wordToCompare = words[currWordIndex]
     const doesItMatch = wordToCompare === currInput.trim()
       if(doesItMatch) {
        setCorrect(correct + 1)
       } else {
        setIncorrect(incorrect + 1)
       }
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
      {status === 'started' && (
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
      )}
      {status === 'finished' && (
        <div className="row mt-3">
          <div className="col d-flex justify-content-center flex-column">
            <p className="fs-4">
            Words per minute: 
            </p>
            <p className="text-primary fs-3">
              {correct}
            </p>
          </div>
          <div className="col d-flex justify-content-center flex-column">
            <p className="fs-4">
              Accuracy:
            </p>
            <p className="text-info fs-3">
             {Math.round(correct / (correct + incorrect)) * 100} %
            </p>
          </div>
        </div>
      )}
    </div> 
  );
}

export default App;
