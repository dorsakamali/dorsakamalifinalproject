
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddForm from './component/AddForm';
import Movies from './component/Movies';
import EditForm from './component/EditForm';
import Movie from './component/Movie';
import './App.css';
import Header from './component/Header';

export default function App() {

  return (<div className='App'> 
    {/* if / -> go to page */}
    <Header />

    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Movies}></Route> */}
        <Route path="/addForm" exact component={AddForm}></Route>
        <Route path="/update" exact component={EditForm}></Route>
     <Route path="/movie/:id" exact component={Movie}></Route>
      </Switch>
    </BrowserRouter>

  </div>);

}