import React from 'react';
import logo from './logo.svg';
import Frontpage3 from './Frontpage/Frontpage3';
import ApiDateResourceProvider from './ApiDateResourceProvider/ApiDateResourceProvider';

function App() {
  return (
    <div>
        <ApiDateResourceProvider>
          <Frontpage3 logo={logo}/>
        </ApiDateResourceProvider>
    </div>
  );
}

export default App;
