import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CreateLead from '../Modal/createModal';
import UpdateLead from '../Modal/updateModal';
import DeleteLead from '../Modal/deleteModal';
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

const useStyles = makeStyles(theme => ({
    leads_table: {
        minWidth: 700,
    },
    formControl: {
        marginRight: theme.spacing(2),
        minWidth: 220,
        marginBottom: 25,
    },
    btn: {
        marginRight: 20
    }
}));

// const SearchComponent = () => {
//     const classes = useStyles();

//     const handleSearch = async () => {
//         console.log('search');
//     };
//     const handleReset = async () => {
//         console.log('reset');
//     };
//     return (
//         <React.Fragment>
//             <FormControl variant="outlined" className={classes.formControl}>
//                 <TextField placeholder="search location string" variant="outlined" size="small" onChange={e => } />
//             </FormControl>
//             <FormControl variant="outlined" className={classes.btn}>
//                 <Button autoFocus onClick={handleSearch} size="sm" color="primary" variant="outlined">Search</Button>
//             </FormControl>
//             <FormControl variant="outlined">
//                 <Button autoFocus onClick={handleReset} size="sm" color="secomdary" variant="outlined">Reset</Button>
//             </FormControl>
//         </React.Fragment>
//     )
// };

export default function CustomizedTables() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [locationString, setLocationString] = useState('');

    useEffect(() => {
        getAllLeadsData();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            let input = locationString;
            let response = await LeadService.searchByLocationString(input);
            setRows(response);
        } catch (err) {
            CustomToastr.error('Unable to get result' || err);
        }
    };
    const handleReset = async () => {
        setLocationString('');
        await getAllLeadsData();
    };
    const getAllLeadsData = async () => {
        let response = await LeadService.getLadsData();
        try {
            if (!response) CustomToastr.error('unable to fetch Leads Data');
            setRows(response);
        } catch (error) {
            CustomToastr.error('SOmething went wrong' || error)
        }
    };

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><CreateLead /></Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <SearchComponent /> */}
                        <React.Fragment>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <TextField placeholder="search location string" variant="outlined" size="small" onChange={e => setLocationString(e.target.value)} />
                            </FormControl>
                            <FormControl variant="outlined" className={classes.btn}>
                                <Button onClick={handleSearch} size="sm" color="primary" variant="outlined">Search</Button>
                            </FormControl>
                            <FormControl variant="outlined">
                                <Button onClick={handleReset} size="sm" color="secomdary" variant="outlined">Reset</Button>
                            </FormControl>
                        </React.Fragment>
                    </Grid>
                </Grid>
                {/* <CreateLead /> */}
                <Table className={classes.leads_table} aria-label="customized table">
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
                                    <UpdateLead id={row.id} comm={row.communication} /> {''}
                                    <DeleteLead id={row.id} />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}