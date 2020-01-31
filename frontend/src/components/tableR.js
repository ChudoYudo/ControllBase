import React from 'react';
import ModalExample from "./modal";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import {Button} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow'
import axios from "axios";
import qs from 'qs';



class CTableRow extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            kind: '',
            data: []
        };
        this.del=this.del.bind(this);
    }
    del (e,soldier){
        let dt = {
            'id':this.props.soldier.id,
        };
        let url ='http://127.0.0.1:7001/soldier/delete';
        let options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(dt),
            url,
        };
        axios(options) .catch((err)=> {});
        setTimeout(()=> this.props.del(soldier),150);

    }
    render() {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={this.props.id}>
                <TableCell style={{width:5 +'%'}} align={"center"}>
                    {this.props.id+1}
                </TableCell>

                <TableCell align={"center"}>
                    {this.props.soldier.last_name}
                </TableCell>

                <TableCell align={"center"}>
                    {this.props.soldier.first_name}
                </TableCell>

                <TableCell align={"center"}>
                    {this.props.soldier.third_name}
                </TableCell>
                <TableCell align={"center"}>
                    {this.props.soldier.milU}
                </TableCell>
                <TableCell align={"center"}>
                    <ButtonGroup >
                        <ModalExample update={this.props.update} buttonLabel={"edit"} soldier={this.props.soldier} soldierId={this.props.soldier.id}/>
                        <Button color={"secondary"} onClick={(e)=>{this.del(e,this.props.soldier)}}  aria-label="edit">
                            <DeleteForeverIcon/>
                        </Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        )
    }
}
export default CTableRow;