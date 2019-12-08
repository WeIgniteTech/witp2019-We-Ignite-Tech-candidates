import React, { useState, useEffect } from 'react'
import './Frontpage.css'
import DisplayDate from '../DisplayDate/DisplayDate'
import axios from 'axios'

const Thankyou = (props) => {

  if (props.candidate !== null) {
    return (
      <h1>
        Thanks for registration
      </h1>
    );
  } else {
    return null
  }

};

const Frontpage2 = (props) => {
  const [candidate, setCandidate] = useState('')
  const [newCandidate, setNewCandidate] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [newExperience, setNewExperience] = useState(0)
  const [newDecipher, setNewDecipher] = useState('')
  let creation_message = ''

  const addCandidate = (event) => {
    event.preventDefault()
    const candidateObject = [
      {
        "fields": { "name": newCandidate, "age": Number(newAge), "experience": Number(newExperience),"decipher": newDecipher }
      }
    ]

    const config = {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': false,
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

      },
      withCredentials: true,
      credentials: 'same-origin',
    }

    axios
      .post('http://localhost:3000/api/candidates', JSON.stringify(candidateObject), config)
      .then(response => {
        console.log(response)
        setCandidate(response.data)
        console.log("response:", response.data)
        setNewCandidate('')
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const resetForm = () => {
    setCandidate('')
  }

  const handleCandidateChange = (event) => {
    setNewCandidate(event.target.value)
  }

  const handleAgeChange = (event) => {
    setNewAge(event.target.value)
  }

  const handleExperienceChange = (event) => {
    setNewExperience(event.target.value)
  }

  const handleDecipherChange = (event) => {
    setNewDecipher(event.target.value)
  }

  if (candidate != '') {
    return (
      <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
          <h3>
            We Ignite Tech Application
        </h3>

          <h1>
            Thanks for registration
        </h1>
          <button type="submit" onClick={resetForm}>HOME</button>
        </header>
      </div>
    );
  } else {
    return (
      <div className="Frontpage">
        <header className="Frontpage-header">
          <img src={props.logo} className="Frontpage-logo" alt="logo" />
          <h3>
            We Ignite Tech Application
        </h3>

          <form onSubmit={addCandidate}>
            <label>
              <h3>Hva heter du?</h3>
              <input className="new-name" type="text" name="name" autoFocus onChange={handleCandidateChange} />
            </label>
            <br />
            <label>
              <h3>Hvor gammel er du?</h3>
              <input className="new-age" type="number" name="age" onChange={handleAgeChange} />
            </label>
            <br />
            <label>
              <h3>Hvor mange år erfaring du har?</h3>
              <input className="new-experience" type="number" name="experience" onChange={handleExperienceChange} />
            </label>
            <br />
            <label>
              <h3>Can you decipher this secret message : SSBsaWtlIHRvIGNvZGUgaXQgY29kZSBpdA==</h3>
              <input className="new-decipher" type="text" name="decipher" onChange={handleDecipherChange} />
            </label>
            <br /><br />
            <button type="submit">SEND</button>

          </form>
          <DisplayDate />
        </header>
      </div>
    );
  }

};

export default Frontpage2;
