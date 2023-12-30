import { Fragment, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function ConfirmDialog({ open, handleClose, loading, onAgreeDisagree }) {

    const handleOption = (action) => {
        onAgreeDisagree(action);
    };
    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Approve Confirmation!</DialogTitle>
                <DialogContent className='bg-blu-900'>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to proceed with this action? Please note that it is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='mb-5 sm:mt-5 mr-5 flex flex-col-reverse sm:flex-row justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3'>
                    <button onClick={() => handleOption('disagree')} className='border border-slate-200 rounded-sm py-2 px-3 w-full sm:w-auto mt-4 font-medium sm:mt-0 hover:bg-slate-100 hover:cursor-pointer text-md'>No, cancel</button>
                    <button disabled={loading} onClick={() => handleOption('agree')} className='bg-green-500 text-white  rounded-sm w-full sm:w-auto py-2 px-3 font-medium text-md hover:bg-green-600 hover:cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'>
                        {loading && <i className="fa fa-circle-notch fa-spin mr-2"></i>}
                        Yes, approve
                    </button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

