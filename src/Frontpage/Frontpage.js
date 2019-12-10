import React, { useState, useEffect } from 'react'
import './Frontpage.css'
import axios from 'axios'

const Frontpage = (props) => {
  const [candidate, setCandidate] = useState('')
  const [newCandidate, setNewCandidate] = useState('')
  const [newAge, setNewAge] = useState(0)
  const [newExperience, setNewExperience] = useState(0)
  const [newDecipher, setNewDecipher] = useState('')
  const [newEmail, setNewEmail] = useState('')

  const addCandidate = (event) => {
    event.preventDefault()
    const candidateObject = [
      {
        "fields": {
          "name": newCandidate,
          "age": Number(newAge),
          "experience": Number(newExperience),
          "decipher": newDecipher,
          "email": newEmail
        }
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
  const handleEmailChange = (event) => {
    setNewEmail(event.target.value)
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
              <h4>Hva heter du?</h4>
              <input className="new-name" type="text" required name="name" autoFocus onChange={handleCandidateChange} placeholder="navn" />
            </label>
            <br />
            <label>
              <h4>Hvor gammel er du?</h4>
              <input className="new-age" type="number" required name="age" onChange={handleAgeChange}  placeholder="alder"/>
            </label>
            <br />
            <label>
              <h4>Hvor mange år erfaring har du?</h4>
              <input className="new-experience" type="number" required name="experience" onChange={handleExperienceChange}  placeholder="erfaring"/>
            </label>
            <br />
            <label>
              <h4>Kan du løse dette:: SSBsaWtlIHRvIGNvZGUgaXQgY29kZSBpdA==</h4>
              <input className="new-decipher" type="text" required name="decipher" onChange={handleDecipherChange}  placeholder="løsning"/>
            </label>
            <br />
            <label>
              <h4>Epost:</h4>
              <input className="new-email" type="email" required name="email" onChange={handleEmailChange} placeholder="epost"/>
            </label>
            <br /><br />
            <button type="submit">SEND</button>

          </form>

        </header>
      </div>
    );
  }

};

export default Frontpage;
