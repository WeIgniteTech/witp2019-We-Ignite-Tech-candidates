import React,{ useState, useEffect } from 'react'
import './Frontpage.css'
import DisplayDate from '../DisplayDate/DisplayDate'
import axios from 'axios'

const Frontpage2 = (props) => {
  const [candidates, setCandidate] = useState([])
  const [newCandidate, setNewCandidate] = useState('')

  const addCandidate = (event) => {
    event.preventDefault()
    const candidateObject = {
      content: newCandidate,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      // id: notes.length + 1,
    }
    // const url = 'http://localhost:3000/api/candidates';
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   },
    //   body: JSON.stringify({
    //     a: 10,
    //     b: 20
    //   })
    // };
    //
    // fetch(url, options)
    //   .then(response => {
    //     console.log(response.status);
    //   });
    const rep = localStorage.getItem('rep')
    const token = localStorage.getItem('token')
    const config = {
     mode: 'no-cors',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
       // 'x-access-token': token,
       // 'Access-Control-Allow-Credentials':true,
       // 'Access-Control-Allow-Origin': "*",
       // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

     },
     withCredentials: true,
     credentials: 'same-origin',
    }
    axios
    .post('http://localhost:3000/api/candidates',JSON.stringify(candidateObject),config)
    .then(response => {
      console.log(response)
      setCandidate(response.data)
      setNewCandidate('')
    })
    .catch(function (error) {
    console.log(error);
    })
  }
  const handleCandidateChange = (event) => {
    console.log(event.target.value)
    setNewCandidate(event.target.value)
  }

  return (
    <div className="Frontpage">
      <header className="Frontpage-header">
        <img src={props.logo} className="Frontpage-logo" alt="logo" />
        <p>
          We Ignite Tech application 2
          </p>

        <form onSubmit={addCandidate}>
          <label>
            Hva heter du?c <a href='http://localhost:3000/pepe'>aca</a>
            <br />
            <input className="new-name" type="text" name="name" autoFocus
            onChange={handleCandidateChange} />

          </label>
          <br />
          <button type="submit">SEND</button>
        </form>
        <DisplayDate/>
      </header>
    </div>
  );
};

export default Frontpage2;
