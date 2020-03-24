import React from 'react';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import Navigation from './Navigation';
import Main from "./Main";
import LakeDetails from "./LakeDetails";
import "./App.css";
import Reservation from "./Reservation";

function App() {
    return (
        <HashRouter>
            <>
                <Navigation/>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/lake/:id' component={LakeDetails}/>
                    <Route exact path='/lake/:id/reservation' component={Reservation}/>
                </Switch>
            </>
        </HashRouter>
    );
}

export default App;
