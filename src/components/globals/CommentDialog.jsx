import { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CommentDialog({ open, handleClose, comment, onOkay }) {
    const handleOption = () => {
        onOkay();
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reason</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {comment}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='mb-5 mx-5 flex justify-center items-center text-center'>
                    <button onClick={handleOption} className='inline-flex justify-center items-center border border-slate-200 rounded-sm py-2 px-3 w-full mt-4 self-center font-medium sm:mt-0 hover:bg-slate-100 hover:cursor-pointer text-md'>Okay</button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
