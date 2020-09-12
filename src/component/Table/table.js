import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import CreateLead from '../Modal/createModal';
import UpdateLead from '../Modal/updateModal';
import CustomToastr from '../../utils/toastr';
import LeadService from '../../service/leadService';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


export default function CustomizedTables() {
    const classes = useStyles();
    const [DOMrender, setDOMrender] = useState(false);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getAllLeadsData();
    }, [DOMrender]);

    const getAllLeadsData = async () => {
        let response = await LeadService.getLadsData();

        try {
            if (!response) CustomToastr.error('unable to fetch Leads Data');
            setRows(response);

        } catch (error) {
            CustomToastr.error('SOmething went wrong' || error)
        }
    };

    const performAction = (event, id) => {
        event.preventDefault();
        let name = event.currentTarget.name;

        if (name === 'create') {
            createLead();
        };
        if (name === 'update') {
            updateCommunication();
        };
        if (name === 'delete') {
            deleteLead(id);
        };
    };

    const createLead = async () => {
        //
    };
    const updateCommunication = () => {
        //
    };
    const deleteLead = async (id) => {
        let response = await LeadService.deleteLadsData(id);
        try {
            if (!response) CustomToastr.error('unable to fetch Leads Data');
            setDOMrender(DOMrender => !DOMrender);
            CustomToastr.success("Lead Successfully removed");
        } catch (error) {
            CustomToastr.error('Something went wrong in deleting Current Lead' || error)
        }
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                {/* <Button variant="contained" color="primary" size="small" name="create" onClick={e => performAction(e)}>Add Lead</Button> */}
                <CreateLead />
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">Mobile</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Location Type</StyledTableCell>
                            <StyledTableCell align="right">Location String</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rows || []).reverse().map(row => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">{row.first_name}</StyledTableCell>
                                <StyledTableCell align="right">{row.last_name}</StyledTableCell>
                                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.location_type}</StyledTableCell>
                                <StyledTableCell align="right">{row.location_string}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {/* <Button variant="contained" color="primary" size="small" name="update" onClick={e => performAction(e, row.id)}>Mark Update</Button> {' '} */}
                                    <UpdateLead id={row.id} comm={row.communication} /> {''}
                                    <Button variant="contained" color="primary" size="small" name="delete" onClick={e => performAction(e, row.id)}>Delete</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}