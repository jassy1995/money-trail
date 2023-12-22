import { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Modal from '../globals/Modal';
import { notify } from "../../helpers/global";

export default function UploadForm({ open, setClose, title }) {
    const [file, setFile] = useState();
    const [requestId, setRequestId] = useState('');
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState();
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded);
        if (fileUploaded.type.includes("image")) {
            const reader = new FileReader();
            reader.readAsDataURL(fileUploaded);
            reader.onload = function () {
                setPreview(reader.result);
            };
        } else {
            setPreview(null);
        }
    };

    const submitForm = () => {
        try {
            setIsUploading(true);
            setTimeout(() => {
                setIsUploading(false);
                notify({ type: 'success', message: 'Uploaded successfully' })
                setFile(null);
                setPreview(null);
                setDescription('');

            }, 3000);
            console.log('Uploading', file)
            console.log('Description', description)
        } catch (error) {

        }
    }
    return (
        <Modal open={open} setClose={setClose} title={title} width='max-w-2xl'>
            <div className="flex flex-col justify-center items-center space-y-10 pb-10 bg-white">
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />

                {preview &&
                    <div className="bg-white flex flex-col space-y-5 justify-center">
                        <img src={preview} alt="Preview" className="border-2 border-dashed" />
                        <div className="w-full inline-flex justify-center">
                            <button onClick={handleClick} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600">Change selected file</button>
                        </div>
                    </div>
                }
                {!preview &&
                    <div onClick={handleClick} className="bg-white flex flex-col justify-center items-center space-y-5 border-2 border-dashed w-full py-8 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition duration-700">
                        <FaCloudUploadAlt className="w-16 h-16 text-slate-500" />
                        <button onClick={handleClick} className="text-slate-400">Browse file to upload</button>
                    </div>
                }
                <input type="number" value={requestId} name="requestId" onChange={(e) => setRequestId(e.target.value)} className="outline-none mt-10 w-full px-4 py-3 border rounded-lg shadow-sm" placeholder="enter request id" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder="description (optional)" className="outline-none mt-10 w-full h-32 p-4 border rounded-lg shadow-sm"></textarea>
                <div className="w-full">
                    <button disabled={isUploading} onClick={submitForm} className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-2 w-full sm:w-32 font-normal disabled:opacity-75 disabled:cursor-not-allowed">
                        {isUploading && <i className="fa fa-circle-notch fa-spin mr-2"></i>}
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    )
}
