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

        <form>
          <label>
            Hva heter du?
            <br />
            <input type="text" name="name" />
          </label>
          <br />
          <input type="submit" value="SEND" onClick="#"/>
        </form>
      </header>
    </div>
  );
};

export default Frontpage;
