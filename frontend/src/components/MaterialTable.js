import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination';
import CTableRow from "./tableR";


import axios from "axios";
import SearchRow from "./searchRow";
import qs from 'qs';
import {Button} from "@material-ui/core";
import {Label} from "@material-ui/icons";
import NewSoldierModal from "./newSModal";



class MaterialTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kind: '',
            data: [],
            filtred_data: [],
            search_params: null,
            page: 0,
            rowsPerPage:10
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.del = this.del.bind(this);
        this.setSearchParams = this.setSearchParams.bind(this);
        this.updateData=this.updateData.bind(this);
        this.gotoend=this.gotoend.bind(this);

    }

    componentDidMount(){
        this.updateData();
    }


    getOriginData(){
        axios
            .get('http://localhost:7001/soldier/all')
            .then(({ data })=> {
                this.setState({
                    data: data,
                    filtred_data: data
                }, function () {
                    this.applySearchFiltre();
                });
            })
            .catch((err)=> {});

    }

    applySearchFiltre(){
        let mass= this.state.data;
        if (this.state.search_params!=null) {
            mass = this.fname_filtre(mass, this.state.search_params.first_name);
            mass = this.lname_filtre(mass, this.state.search_params.last_name);
        }
        console.log(this.state.search_params);
        this.setState({filtred_data: mass});
    }
    updateData(){
        this.getOriginData();
    }

    del (soldier){
        let map = this.state.filtred_data;
        let id= map.indexOf(soldier);
        map.splice(id,1);
        this.setState({filtred_data: map},function () {
            this.updateData();
        });
    }

    handleChangePage = (event, newPage) => {
        console.log(newPage);
        this.setState({page:newPage});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: +event.target.value});
        this.setState({page:0});
    };

    fname_filtre(mass,fname){
        let ret=[];
        mass.map( (soldier)=>  {
           if ((soldier.first_name.toUpperCase().indexOf(fname.toUpperCase())> -1)){
               ret.push(soldier);
           }
        });
        return ret;
    }

    lname_filtre(mass,lname){
        let ret=[];
        mass.map( (soldier)=>  {
            if ((soldier.last_name.indexOf(lname)> -1)){
                ret.push(soldier);
            }
        });
        return ret;
    }


    setSearchParams(dt){
        this.setS(dt);
        this.applySearchFiltre();
    }
    setS(dt){
        this.setState({search_params: dt}, function () {
            this.applySearchFiltre();
        });

    }
    gotoend(){
        let page = parseInt((this.state.filtred_data.length+1)/this.state.rowsPerPage);
        this.handleChangePage(null,page);
    }

    render() {
        return (
            <div>


            <Paper >
                <TableContainer >
                    <Table stickyHeader={true} aria-label="sticky table">
                        <TableHead>
                            <tr>
                                <TableCell align={"center"}>№</TableCell>
                                <TableCell align={"center"}>Фамилия</TableCell>
                                <TableCell align={"center"}>Имя</TableCell>
                                <TableCell align={"center"}>Отчество</TableCell>
                                <TableCell align={"center"}>Номер Части</TableCell>
                                <TableCell align={"center"}>Действие</TableCell>
                            </tr>
                        </TableHead>
                        <TableBody>
                            <SearchRow setSearchParams={this.setSearchParams} />
                            {
                                this.state.filtred_data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map ( (soldier)=>  {
                                    return <CTableRow update={this.updateData} del={this.del} soldier={soldier} id={this.state.filtred_data.indexOf(soldier)}></CTableRow>
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableCell align={'right'} colSpan={5}><h2>Добавить нового:</h2></TableCell>
                            <TableCell align={"left"}>
                                <NewSoldierModal goend={this.gotoend} update={this.updateData} />
                            </TableCell>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    count={this.state.filtred_data.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>

            </div>
        )
    }
}
export default MaterialTable;