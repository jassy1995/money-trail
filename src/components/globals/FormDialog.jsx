import { Fragment, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ open, handleClose, loading, onSubmitCancel }) {
    const [description, setDescription] = useState('');
    const handleOption = (action) => {
        onSubmitCancel({ action, payload: description });
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reject</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To reject this receipt, please provide a specific reason for the rejection.
                    </DialogContentText>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder="Reason here..." className="placeholder:text-slate-300 font-normal outline-none mt-4 w-full h-20 px-3 py-2 border rounded-lg shadow-sm"></textarea>
                </DialogContent>
                <DialogActions className='mb-5 sm:mt-5 mx-5 flex flex-col-reverse sm:flex-row justify-center space-y-2 sm:space-y-0 space-x-0 sm:space-x-3'>
                    <button onClick={() => handleOption('cancel')} className='border border-slate-200 rounded-sm py-2 px-3 w-full sm:w-auto mt-4 font-medium sm:mt-0 hover:bg-slate-100 hover:cursor-pointer text-md'>Cancel</button>
                    <button disabled={loading || !description} onClick={() => handleOption('submit')} className='bg-green-500 text-white  rounded-sm w-full sm:w-auto py-2 px-3 font-medium text-md hover:bg-green-600 hover:cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed'>
                        {loading && <i className="fa fa-circle-notch fa-spin mr-2"></i>}
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
