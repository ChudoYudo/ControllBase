import React from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.css';

import ExampleNav from "./components/nav";

import SoldierTable from "./components/soldierTable";

import Stable from "./components/st";



import MaterialTable from "./components/MaterialTable";
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
        {/*<Stable/>*/}
        {/*<ExampleNav/>*/}
        {/*<SoldierTable/>*/}
        <MaterialTable/>
      </div>
  );
}

export default App;
