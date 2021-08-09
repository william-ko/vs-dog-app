import './App.css';
import { FunctionComponent } from 'react';
import { DogList } from './components/DogList';
import { Upload } from './components/Upload';
import { Navigation } from './components/Navigation';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { DogProfile } from './components/DogProfile';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
          <Switch>
            <Route exact path="/" component={DogList} />
            <Route path="/breed-profile/:id" component={DogProfile} />
            <Route path="/upload" component={Upload} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
