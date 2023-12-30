import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { handleCopy, notify } from "../../helpers/global"
import { useAddUser, useCreateUser, useDeactiveUser } from "../../services/apis/user";
import Loader from '../globals/Loader';
import { useGetApps, useGenearetPasswordResetLink } from "../../services/apis/app"
import http from "../../lib/http";
import { FaRegCopy } from "react-icons/fa";
import Modal from '../globals/Modal';
import { LoaderIndicator } from '../globals/LoaderIndicator';
import FilePreview from '../FilePreview';

export default function ViewDetail({ open, setClose, title, request }) {
    // const { mutateAsync: createNewUser, isLoading: isLoading1 } = useCreateUser();
    // const { data: apps, isLoading: loading_app, isError: app_error } = useGetReceipts();
    const [receipts, setReceipt] = useState([]);
    const [filteredReceipts, setFilteredReceipt] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFilter, setIsFilter] = useState(false);
    const [filterOptions] = useState([
        { id: 'all', title: 'All' },
        { id: '0', title: 'Pending' },
        { id: '1', title: 'Approve' },
        { id: '-1', title: 'Reject' }
    ]);

    useEffect(() => {
        if (request.id) {
            setLoading(true);
            setIsFilter(false);
            http.get(`/receipts?id=${request.id}`)
                .then(({ data: { status, response } }) => {
                    if (status) {
                        setReceipt(handleSorting(response));
                    } else {
                        notify({ type: 'error', message: 'unable to fetch receipt' });
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false);
                    notify({ type: 'error', message: 'unable to fetch receipt' });

                });
        }
    }, [request.id]);

    const { getterValue: items } = useMemo(() => ({
        get getterValue() {
            if (isFilter) return filteredReceipts;
            else return receipts
        }
    }), [receipts, filteredReceipts, request.id]);

    const handleFilterChange = (event) => {
        setIsFilter(true);
        let matchResult;
        const filter_value = event.target.value;
        if (filter_value !== 'all') {
            matchResult = receipts.filter(r => +r.status === +filter_value);
        } else {
            matchResult = receipts
        }
        setFilteredReceipt(matchResult);
    }
    const handleReceiptUpdate = ({ id, status, comment }) => {
        if (comment) {
            const newUpdate = receipts.map(r => r.id === id ? { ...r, status, reject_comment: comment } : r);
            setReceipt(newUpdate)
        } else {
            const newUpdate = receipts.map(r => r.id === id ? { ...r, status } : r);
            setReceipt(newUpdate)
        }
    }

    const handleSorting = (data) => {
        return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // const onSubmit = async (form) => {
    //     try {
    //         await createNewUser(form)
    //         notify({ type: 'success', message: 'successfully created' })
    //         reset()
    //     } catch (error) {
    //         console.log(error)
    //         notify({ type: 'error', message: error.response.data.message || 'operation failed' })
    //     }
    // }

    // const handleAppIdChange = (event) => {
    //     if (apps.data.data.length) {
    //         const id = event.target.value;
    //         const app = apps.data.data.find(app => +app.id === +id)
    //         setRole(app.roles);
    //     }
    // };

    // const handleAddApp = async (form) => {
    //     const payload = { app_id: +form.app_id, role_id: +form.role, user_id: +detail.id }
    //     try {
    //         await addUser(payload)
    //         notify({ type: 'success', message: 'successfully created' })
    //         reset2()
    //     } catch (error) {
    //         console.log(error)
    //         notify({ type: 'error', message: error.response.data.message || 'operation failed' })
    //     }
    // }

    // const handleDeactivate = async ({ status, app_id, index }) => {
    //     setDeactivatingIndex(index)
    //     const payload = { status, user_id: +detail.id, app_id }
    //     try {
    //         await handleUserActiveness(payload)
    //         setActionDone(actionStart ? false : true)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const handleResetLink = async (app_id, i) => {
    //     try {
    //         setActiveIndex(i)
    //         const payload = { app_id, email: detail.email }
    //         const { data } = await genearetPasswordResetLink(payload)
    //         setPasswordResetLink(data.link)
    //         notify({ type: 'success', message: 'password reset link has been sent to your email' })
    //     } catch (error) {
    //         notify({ type: 'error', message: error.response.data.message || 'unable to generate password reset link' })
    //     }
    // }

    // const handleCopyLink = async (textToCopy) => {
    //     try {
    //         const { status } = await handleCopy({ text: textToCopy, message: 'link copied' })
    //         consol.log(status)
    //     } catch (error) {
    //         consol.log(error)
    //     }
    // }

    // <header class="text-xl text-blue-900 mt-8 mb-2">Uploaded Document</header>
    //         <div class="w-full h-full flex flex-col space-y-3 border border-slate-300 shadow-sm rounded-md mb-6"
    //             v-for="({ file, comment, created_at }, index) in sortReport(reports)" :key="index">
    //             <div class="flex flex-col space-y-">
    //                 <FilePreview :fileUrl="file" :desc="comment" :date="created_at" />
    //             </div>
    //         </div>

    return (
        <>
            <Modal open={open} setClose={setClose} title={title} width='max-w-3xl'>
                {
                    loading ? <LoaderIndicator counts={[1, 2, 3]} /> : (
                        <div className='w-full'>
                            {
                                !loading && !receipts.length
                                    ? <div className='w-full flex justify-center items-center my-[280px] sm:my-[320px] font-medium text-slate-400 text-2xl'>No receipt yet</div>
                                    :
                                    <div className='flex flex-col w-full'>
                                        <div className='flex justify-between items-center mt-4 w-full'>
                                            <header className="text-xl text-blue-900 font-medium">Receipts</header>
                                            <select onChange={handleFilterChange} className='placeholder:text-slate-300 placeholder:text-sm border border-slate-300 px-2 py-1 outline-none rounded-md'>
                                                {filterOptions.map(({ id, title }) => (
                                                    <option key={id} value={id}>{title}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            {(isFilter && !items.length) && <div className='w-full flex justify-center items-center my-[270px] sm:my-[320px] font-medium text-slate-400 text-2xl'>No record found</div>}
                                            <div className='w-full flex flex-col space-y-6 pt-3'>
                                                {items?.map((receipt, i) => (
                                                    <FilePreview key={i} receipt={receipt} updateReceipt={handleReceiptUpdate} />
                                                ))
                                                }
                                            </div>

                                        </div>

                                    </div>
                            }
                        </div>

                    )
                }

            </Modal>
        </>
    )
}