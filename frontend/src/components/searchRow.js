import React from 'react';
import ModalExample from "./modal";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import {Button, Input} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow'
import axios from "axios";
import qs from 'qs';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton"
import InputGroup from "reactstrap/es/InputGroup";



class SearchRow extends React.Component{

    constructor(props) {
        super(props);
        this.props ={
          fname: 0
        };
        this.state = {
            kind: '',
            first_name:'',
            last_name:'',
            data: []
        };
        this.change_fname=this.change_fname.bind(this);
        this.change_lname=this.change_lname.bind(this);
        this.search=this.search.bind(this);
        this.clearFname=this.clearFname.bind(this);
        this.clearLname=this.clearLname.bind(this);
        this.reset=this.reset.bind(this);
    }
    componentDidMount() {
        // this.setState({last_name:this.props.soldier.last_name});
        // this.setState({third_name:this.props.soldier.third_name});
    }
    search(){
        let dt= {};
        dt['first_name']=this.state.first_name;
        dt['last_name']=this.state.last_name;
        this.props.setSearchParams(dt);
    }
    reset(){
        this.setState({
            first_name: "",
            last_name: ""
        },function () {
            let dt= null;
            this.props.setSearchParams(dt);
            console.log(this.state.first_name);
        });

    }
    clearFname(){
        this.setState({
            first_name: "",
        },()=> {
           this.search();
        });
    }
    clearLname(){
        this.setState({
            last_name: "",
        }, () => {
            this.search();
        });
    }
    change_fname (event){
        this.setState({first_name:event.target.value});
    }
    change_lname (event){
        this.setState({last_name:event.target.value});
    }
    render() {
        return (
            <TableRow  key={-1}>
                <TableCell align={"center"}>
                    <Input></Input>
                </TableCell>

                <TableCell align={"center"}>
                    <Input value={this.state.last_name} onChange={this.change_lname} ></Input>
                    <IconButton onClick={this.clearLname}><ClearIcon /></IconButton>
                </TableCell>

                <TableCell align={"center"}>
                    <Input value={this.state.first_name} onChange={this.change_fname}></Input><IconButton onClick={this.clearFname}><ClearIcon /></IconButton>
                </TableCell>

                <TableCell align={"center"}>
                    <Input></Input>
                </TableCell>

                <TableCell align={"center"}>
                    <Input></Input>
                </TableCell>

                <TableCell align={"center"}>
                    <ButtonGroup >
                        <Fab style={{marginRight: 8 + 'px'}} size="medium"  onClick={this.search} color="primary" aria-label="search"><SearchIcon /></Fab>
                        <Fab size="medium" onClick={this.reset} color="secondary" aria-label="search"><ClearIcon /></Fab>
                    </ButtonGroup>
                </TableCell>

            </TableRow>
        )
    }
}
export default SearchRow;