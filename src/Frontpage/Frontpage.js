import * as React from 'react';
import './Frontpage.css';
import DisplayDate from '../DisplayDate/DisplayDate'

const Frontpage = (props) => {
  return (
    <div className="Frontpage">
      <header className="Frontpage-header">
        <img src={props.logo} className="Frontpage-logo" alt="logo" />
        <p>
          We Ignite Tech application
        </p>

        <form id="namedetails" method="post" action="http://localhost:3000/api/candidates">
          <label>
            Hva heter du?
            <br />
            <input type="text" name="name" />
          </label>
          <br />
          <label>
            Hvor gammel er du?
            <br />
            <input type="text" name="age" />
          </label>
          <br />
          
          <input type="submit" 
                value="SEND" 
                onClick="document.getElementById('namedetails').submit();"/>
        </form>
        <DisplayDate/>
      </header>
    </div>
  );
};

export default Frontpage;
