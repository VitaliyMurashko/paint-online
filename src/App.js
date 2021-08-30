import React from 'react';
import { SettingsBar } from './components/SettingsBar';
import { Toolbar } from './components/Toolbar';
import { LoginModal } from './components/LoginModal'
import  Canvas  from './components/Canvas';
import './styles/app.scss';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/:id'>
            <LoginModal/>
            <Toolbar />
            <SettingsBar />
            <Canvas />
          </Route>
          <Redirect to={`f${(+new Date).toString(16)}`}/>
        </Switch>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
