import React from 'react';
import { SettingsBar } from './components/SettingsBar';
import { Toolbar } from './components/Toolbar';
import  Canvas  from './components/Canvas';
import './styles/app.scss';

function App() {

  return (
    <div className="App">
     <Toolbar />
     <SettingsBar />
     <Canvas />
    </div>
  );
}

export default App;
