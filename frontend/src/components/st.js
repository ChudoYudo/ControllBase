import React from 'react';
import axios from 'axios'
import TableRow from "./tableR";
import {Table} from "reactstrap";
let soldiers;
class Stable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kind: '',
            data: []
        };
        this.del = this.del.bind(this);
    }
    componentDidMount(){
        axios
            .get('http://127.0.0.1:7001/soldier/all')
            .then(({ data })=> {
                this.setState({
                    data: data
                });
            })
            .catch((err)=> {})
    }

    del (soldier){
        let map = this.state.data;
        let id= map.indexOf(soldier);
        map.splice(id,1);
        this.setState({data: map});
    }

    render() {
        return (
            <Table bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Third Name</th>
                    <th>Mill U</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.data.map ( (soldier)=>  {
                         return <TableRow del={this.del} soldier={soldier} id={this.state.data.indexOf(soldier)} ></TableRow>
                    })
                }
                </tbody>
            </Table>
        );
    }
}

export default Stable;