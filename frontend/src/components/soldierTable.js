import React from 'react';
import { Table } from 'reactstrap';
import TableRow from "./tableR";

let users=[];

function buildFakeUser() {
    return {
        name:'1',
        avatar:'2',
        email:'3',
        color:'4'
    };
}

for(var i = 0; i < 25; i++) {
    users.push(buildFakeUser())
}
const SoldierTable = (props) => {
    return (
        <Table bordered>
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
            </tr>
            </thead>
            <tbody>
            {
                users.map(function (user) {
                    return <TableRow user={user}></TableRow>
                })
            }
            </tbody>
        </Table>
    );
}
export default SoldierTable;