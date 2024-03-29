import { useState, useRef, memo } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Modal from '../globals/Modal';
import { notify } from "../../helpers/global";
import useGlobalStore from "../../stores/global";
import { getRequestById, uploadDocumentToServer, useCreatePaymentRecord } from "../../services/apis/payment";

function UploadForm({ open, setClose, title }) {
    const { mutateAsync: createPayemtRecord, isLoading } = useCreatePaymentRecord();
    const { auth_user } = useGlobalStore(state => state.data);
    const [file, setFile] = useState(null);
    const [requestId, setRequestId] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [bank, setBank] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState();
    const hiddenFileInput = useRef(null);
    const [banks] = useState([
        { value: 'wema', title: 'WEMA' },
        { value: 'providus-lenders', title: 'PROVIDUS LENDERS' },
        { value: 'providus-rent', title: 'PROVIDUS RENT' },
        { value: 'providus-bnpl', title: 'PROVIDUS BNPL' },
        { value: 'providus-m2m', title: 'providus M2M' },
        { value: 'rent-a', title: 'RENT A' },
        { value: 'merchant', title: 'MERCHANT' },
        { value: 'tnpl', title: 'TNPL' },
        { value: 'school-a', title: 'SCHOOL A' },
        { value: 'bnpl-a', title: 'BNPL A' },
        { value: 'illeyah-zenith', title: 'ILLEYAH ZENITH' },
        { value: '440-zenith', title: '440 ZENITH' }
    ]);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        if (event.target.files && event.target.files.length > 0) {
            const fileUploaded = event.target.files[0]
            setFile(fileUploaded);
            if (fileUploaded.type.includes("image")) {
                const reader = new FileReader();
                reader.readAsDataURL(fileUploaded);
                reader.onload = function () {
                    setPreview(reader.result);
                };
            } else {
                setPreview('../../../file-placeholder.png');
            };
        } else {
            notify({ type: 'error', message: 'No file selected!' });
        }
    }
    const sendFileToServer = async (request_id) => {
        let formData = new FormData();
        formData.append("file", file);
        formData.append('doctype_', 'report');
        formData.append('request_id', request_id);
        const { status, file_url } = await uploadDocumentToServer(formData);
        if (status) {
            return { status, file_url };
        } else {
            return { status: false, file_url: null };
        }
    }
    const submitForm = async () => {
        try {
            setIsUploading(true);
            const request = await getRequestById(requestId);
            if (!request) {
                setIsUploading(false);
                notify({ type: 'error', message: 'Request not found!' });
                return;
            } else {
                const { status, file_url } = await sendFileToServer(requestId);
                setIsUploading(false);
                if (!status) {
                    notify({ type: 'error', message: 'Receipt upload failed!' });
                    return;
                } else {
                    const payload = {
                        request_id: requestId,
                        uploader_name: `${auth_user.firstname} ${auth_user.lastname}`,
                        uploader_phone: auth_user.phone,
                        description,
                        file_url,
                        request: JSON.stringify(request),
                        receipt_amount: amount,
                        bank
                    }
                    const { data: { status } } = await createPayemtRecord(payload);
                    if (!status) {
                        setIsUploading(false);
                        notify({ type: 'error', message: 'Receipt upload failed!' });
                    } else {
                        setIsUploading(false);
                        notify({ type: 'success', message: 'Uploaded successfully' });
                        setRequestId('');
                        setAmount('');
                        setBank('');
                        setFile(null);
                        setPreview(null);
                        setDescription('');
                    }
                }
            }
        } catch (error) {
            setIsUploading(false);
            notify({ type: 'error', message: 'Receipt upload failed!' });
            console.log(error);
        }
    }
    return (
        <Modal open={open} setClose={setClose} title={title} width='max-w-2xl'>
            <div className="flex flex-col justify-center items-center space-y-3 pt-3 bg-white w-full">
                <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="requestId" className="text-slate-600 font-normal">Request ID</label>
                    <input type="number" value={requestId} name="requestId" onChange={(e) => setRequestId(e.target.value)} className="outline-none mt-8 w-full px-4 py-2 border rounded-lg shadow-sm placeholder:text-slate-200" placeholder="enter the request id" />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="requestId" className="text-slate-600 font-normal">Amount</label>
                    <input type="number" value={amount} name="requestId" onChange={(e) => setAmount(e.target.value)} className="outline-none mt-8 w-full px-4 py-2 border rounded-lg shadow-sm placeholder:text-slate-200" placeholder="enter the receipt amount" />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="requestId" className="text-slate-600 font-normal">Bank</label>
                    <select value={bank} onChange={(e) => setBank(e.target.value)} className='placeholder:text-slate-100 placeholder:text-sm  px-2 py-1 outline-none border rounded-lg shadow-sm h-[44px]'>
                        <option value="" disabled hidden>choose bank...</option>
                        {banks.map(({ value, title }) => (
                            <option key={value} value={value}>{title}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                />

                {preview &&
                    <div className="bg-white flex flex-col space-y-5 justify-center w-full">
                        <img src={preview} alt="Preview" className="border-2 border-dashed w-full h-[200px] object-contain" />
                        <div className="w-full inline-flex justify-center">
                            <button onClick={handleClick} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-600">Change selected file</button>
                        </div>
                    </div>
                }
                {!preview &&
                    <div onClick={handleClick} className="bg-white flex flex-col justify-center items-center space-y-5 border-2 border-dashed w-full h-[200px] py-8 rounded-lg shadow-sm hover:cursor-pointer hover:shadow-md transition duration-700">
                        <FaCloudUploadAlt className="w-16 h-16 text-slate-500" />
                        <button onClick={handleClick} className="text-slate-400">Browse file to upload</button>
                    </div>
                }

                <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder="description (optional)" className="outline-none mt-10 w-full h-20 p-4 border rounded-lg shadow-sm"></textarea>
                <div className="w-full">
                    <button disabled={isLoading || isUploading || !requestId || !file || !amount || !bank} onClick={submitForm} className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-2 w-full sm:w-32 font-normal disabled:opacity-75 disabled:cursor-not-allowed">
                        {(isUploading || isLoading) && <i className="fa fa-circle-notch fa-spin mr-2"></i>}
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default memo(UploadForm)