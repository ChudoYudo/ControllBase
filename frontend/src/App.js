import React from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import ExampleNav from "./components/nav";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Stable from "./components/st";

import ReportTable from "./components/tables/firstReportTable";

import MaterialTable from "./components/tables/MaterialTable";
require('dotenv').config();



let users=[];
function buildFakeUser(i) {
    return {
        name:i,
        avatar:'2',
        email:'3',
        color:'4'
    };
}

for(var i = 0; i < 25; i++) {
    users.push(buildFakeUser(i))
}


function App() {
  return (
      <div>
          <BrowserRouter>
              <div>
                  <Switch>
                      <Route path="/" component={MaterialTable} exact/>
                      <Route path="/s" component={Stable}/>
                      <Route path="/report" component={ReportTable}/>
                      <Route component={Error}/>
                  </Switch>
              </div>
          </BrowserRouter>
        <ExampleNav/>
      </div>
  );
}

export default App;
