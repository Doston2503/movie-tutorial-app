import React from 'react';
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Trending from "./pages/Trending";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import Navigation from "./components/Navigation";

function App(props) {
    return (
        <Router>
            <Header/>

            <div className="container">
            <Switch>
                <Route path="/" exact={true} component={Trending}/>
                <Route path="/movies" exact={true} component={Movies}/>
                <Route path="/series" exact={true} component={Series}/>
                <Route path="/search" exact={true} component={Search}/>
            </Switch>
        </div>
            <Navigation/>
        </Router>
    );
}

export default App;