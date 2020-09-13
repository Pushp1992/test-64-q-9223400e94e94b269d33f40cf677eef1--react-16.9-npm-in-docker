import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import PageRefresh from '../../utils/refresh';
import LeadService from '../../service/leadService';
import CustomToastr from '../../utils/toastr';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
        backgroundColor: 'black',
        color: 'white'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

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

export default function UpdateLeadComm(props) {
    const [open, setOpen] = useState(false);
    const [communication, setCommunication] = useState(props.comm);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setCommunication(props.comm);
        setOpen(false);
    };
    const saveLeadComm = async (event) => {
        event.preventDefault();
        try {
            let comm = { communication: communication };
            let response = await LeadService.updateLadsComm(props.id, comm);
            if (response.status === "Contacted") {
                CustomToastr.success("Communication updated Successfully");
                setOpen(false);
                PageRefresh();
            }
        } catch (err) {
            CustomToastr.error("Unable to save Communication details" || err)
        }
    };

    return (
        <React.Fragment>
            <Button variant="contained" color="primary" size="small" name="update" onClick={handleClickOpen}>
                Mark Update
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}
                fullWidth={true} disableBackdropClick={true} disableEscapeKeyDown={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Mark Communication
                </DialogTitle>
                <DialogContent dividers>
                    <TextField autoFocus={true} margin="dense" id="name" label="Communication" type="text" value={communication}
                        variant="outlined" rows={8} multiline fullWidth onChange={e => setCommunication(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secomdary" variant="outlined">Close</Button>
                    <Button autoFocus onClick={e => saveLeadComm(e)} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}