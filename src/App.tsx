import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [sessionId, setSessionId] = useState("");
  const [input, setInput] = useState("");
  const [inputsArray, setInputsArray] = useState<string[]>([]);

  const addInput = (newInput: string) => {
    setInputsArray([...inputsArray, newInput]);
  }

  const onSubmit = () => {
    addInput(input);
    setInput("");
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await axios.get("http://localhost:8000/new-conversation");
        setSessionId(result.data);
        console.log(sessionId);
      } catch (error) {
        console.log(error);
        alert("There was an error starting session");
      }
    };

    fetchSession()
    
  },[])

  return (
    <>
      <div className="input-container">
        input:
        <input 
          type="text"
          placeholder="Your input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button className="submit-button" onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
}

export default App;
