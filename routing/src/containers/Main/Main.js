import React, { Component } from 'react';
import  { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Courses from '../Courses/Courses';
import Users from '../Users/Users';
import './Main.css';

class Main extends Component {

    render() {
        return (            
            <div className="Main">   
              
              <header>
                <nav>
                  <ul>
                    <li><NavLink to="/users" exact>Users</NavLink></li>
                    <li><NavLink to="/courses" exact>Courses</NavLink></li>
                  </ul>            
                </nav>
              </header>
      
              <Switch>                              
                <Route path="/users" component={Users} />
                <Route path="/courses" component={Courses}/>
                <Redirect from="/all-courses" to="/courses" />
                <Route render={() => <h1>Not found</h1>}/>                
              </Switch>
      
            </div>            
          );
    }
}

export default Main;
