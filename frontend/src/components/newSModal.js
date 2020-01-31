import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SoldierForm from "./form";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import NewSoldierForm from "./newSoldierForm";
import {Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

class NewSoldierModal extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen : false
        };
        this.toggle = this.toggle.bind(this);

    }
    componentDidMount() {
        this.setState({isOpen:false})
    }

    toggle(){
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div>
                <Fab color={"primary"} onClick={(e) => this.toggle(e)} ><AddIcon/></Fab>
                <Modal isOpen={this.state.isOpen}>
                    <ModalHeader >Modal title</ModalHeader>
                    <ModalBody>
                        <NewSoldierForm goend={this.props.goend} update={this.props.update} toggle={this.toggle}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"onClick={(e) => this.toggle(e)}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={(e) => this.toggle(e)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default NewSoldierModal;