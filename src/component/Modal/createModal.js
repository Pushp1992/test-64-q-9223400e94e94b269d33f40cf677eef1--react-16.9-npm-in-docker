import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import LeadService from '../../service/leadService';
import CustomToastr from '../../utils/toastr';
import { LocationList } from '../../utils/utils';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginRight: theme.spacing(2),
        minWidth: 220,
        marginBottom: 25,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    inputLabel: {
        fontSize: 'smaller !important',
        marginTop: '-9px'
    },
    selectOption: {
        fontSize: '15px !important',
    },
    selectBox: {
        height: '40px',
        fontSize: '15px !important'
    }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function CreateLeadComm() {
    const classes = useStyles();

    const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        location_type: '',
        location_string: ''
    };

    const [enableSubmit, setEnableSubmit] = useState(false);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (Object.values(state).includes('')) {
            setEnableSubmit(false)
        } else {
            setEnableSubmit(true);
        }
    }, [state]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setState({ ...initialState });
        setOpen(false);
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState(prevState => {
            return { ...prevState, [name]: value }
        });
    };

    const createLead = async (event) => {
        event.preventDefault();
        try {
            let response = await LeadService.createLadsData(state);
            if (response) {
                CustomToastr.success("Leads Created Successfully");
                setOpen(false);
            }
        } catch (err) {
            CustomToastr.error("Unable to Create Leads, please try again" || err);
        }
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" size="small" name="update" onClick={handleClickOpen}>
                Add Lead
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}
                fullWidth={true} disableBackdropClick={true} disableEscapeKeyDown={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Lead
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField type="text" name="first_name" value={state.first_name} onChange={e => handleChange(e)}
                                label="First Name" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField type="text" name="last_name" value={state.last_name} onChange={e => handleChange(e)}
                                label="Last Name" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField type="email" name="email" value={state.email} onChange={e => handleChange(e)}
                                label="Email Address" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField type="number" name="mobile" value={state.mobile} onChange={e => handleChange(e)}
                                label="Mobile Number" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel className={classes.inputLabel} id="locType">Location Type</InputLabel>
                            <Select label="Location Type" name="location_type" value={state.location_type} onChange={e => handleChange(e)} className={classes.selectBox}>
                                {
                                    LocationList.length !== 0 ?
                                        LocationList.map((type, index) => {
                                            return <MenuItem className={classes.selectOption} key={index} value={type.name}>{type.name}</MenuItem>
                                        }) : <MenuItem className={classes.selectOption} value="">Unable to get Type</MenuItem>
                                }
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <TextField type="text" name="location_string" value={state.location_string} onChange={e => handleChange(e)}
                                label="Location String" variant="outlined" size="small" InputLabelProps={{ shrink: true }} />
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secomdary" variant="outlined">Close</Button>
                    <Button autoFocus onClick={e => createLead(e)} color="primary" variant="contained" disabled={!enableSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}