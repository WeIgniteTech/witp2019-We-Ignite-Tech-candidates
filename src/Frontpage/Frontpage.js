import * as React from 'react';
import './Frontpage.css';
import DisplayDate from '../DisplayDate/DisplayDate'

const Frontpage = (props) => {
  return (
    <div className="Frontpage">
      <header className="Frontpage-header">
        <img src={props.logo} className="Frontpage-logo" alt="logo" />
        <h1>
          WE IGNITE TECH APPLICATION
        </h1>

      </header>
      <body>
        <form id="namedetails" method="post" action="http://localhost:3000/api/candidates">
          <p>
            Hva heter du?
        </p>
          
          <label>
            <input type="text" name="name" />
          </label>
         
          <p>
            Hvor gammel er du?
          </p>
         
          <label>
            <input type="text" name="age" />
          </label>
         
          <br></br>
          <br></br>
          <br></br>

          <input type="submit"
            value="SEND"
            onClick="document.getElementById('namedetails').submit();" />
        </form>
      </body>

    </div>
  );
};

export default Frontpage;
