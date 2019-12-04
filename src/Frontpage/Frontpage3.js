import React, { useState, useEffect } from 'react'
import './Frontpage.css'
import DisplayDate from '../DisplayDate/DisplayDate'
import axios from 'axios'

const Frontpage3 = (props) => {
    const [candidates, setCandidate] = useState([])
    const [newCandidate, setNewCandidate] = useState('')

    const addCandidate = (event) => {

        event.preventDefault()

        const candidateObject = {
            "records": [
                {
                    "fields": { "name": 'aaaurytyrtyrtyryt', "age": 13 }
                }
            ]
        }

        const rep = localStorage.getItem('rep')
        const token = localStorage.getItem('token')
        const config = {
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer keyqfOisTbxT1PkQP',
                //'x-access-token': token,
                //'Access-Control-Allow-Credentials': true,
                //'Access-Control-Allow-Origin': "*",
                //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'

            },
            withCredentials: true,
            credentials: 'same-origin',
        }

        console.log(candidateObject)

        axios
            .post('http://api.airtable.com/v0/appUdJOf889CrTa8y/candidates', JSON.stringify(candidateObject), config)
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
                    We Ignite Tech application 3
          </p>


                <form onSubmit={addCandidate}>
                    <label>
                        Hva heter du?
            <br />
                        <input className="new-name" type="text" name="name" />

                    </label>
                    <br />
                    <button type="submit">SEND</button>
                </form>
                <DisplayDate />
            </header>
        </div>
    );
};

export default Frontpage3;