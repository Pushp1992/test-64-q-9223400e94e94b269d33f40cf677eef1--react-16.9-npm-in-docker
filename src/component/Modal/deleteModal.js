import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
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
        padding: theme.spacing(8),
        backgroundColor: 'ghostwhite',
    },
}))(MuiDialogContent);

export default function DeleteLeadComm(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteLead = async (event) => {
        event.preventDefault();
        let response = await LeadService.deleteLadsData(props.id);
        try {
            if (!response) CustomToastr.error('unable to fetch Leads Data');
            PageRefresh();
            CustomToastr.success("Lead Successfully removed");
        } catch (error) {
            CustomToastr.error('Something went wrong in deleting Current Lead' || error)
        }
    };

    return (
        <React.Fragment>
            <Button className="delete_lead_modal_btn" variant="contained" color="primary" size="small" name="update" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} TransitionComponent={Transition}
                fullWidth={true} disableBackdropClick={true} disableEscapeKeyDown={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Do You Wish To Delete This Lead ?
                </DialogTitle>
                <form name="deleteForm" className="delete_lead_form">
                    <DialogContent dividers>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Button className="delete_lead_btn" variant="contained" color="secondary" name="delete"
                                    onClick={e => deleteLead(e)} startIcon={<DeleteIcon />}>Delete</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button autoFocus onClick={handleClose} variant="contained">Cancel</Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </form>
            </Dialog>
        </React.Fragment>
    );
}