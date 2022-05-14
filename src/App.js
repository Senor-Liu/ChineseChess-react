import './App.css';
import routes from './routers';
import { renderRoutes } from 'react-router-config';
import { Switch, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from='/' to='/login' />
        {renderRoutes(routes)}
      </Switch>
    </div>
  );
}

export default App;
