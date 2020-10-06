import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Notes from "./components/note/Notes";
import Tags from "./components/tags/Tags";
import CreateUpdate from "./components/note/createUpdate/CreateUpdate";

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar notes-header ">
                    <Link to={"/"} className="navbar-brand ml-5"><h2>Personal Notes</h2></Link>
                    <Link to={"/manage-tags"} className="btn btn-outline-light float-right">Manage Tags</Link>
                </nav>
                <div className='floatingBtn'>
                    <Link to={"/create-note"}><Fab className="center-block">
                        <AddIcon className="icon"/>
                    </Fab></Link>
                </div>
                <Switch>
                    <Route exact path="/" component={Notes}/>
                    <Route path="/manage-tags" component={Tags}/>
                    <Route path="/create-note" component={CreateUpdate}/>
                    <Route path={"/edit-note/:id?"} component={CreateUpdate}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
