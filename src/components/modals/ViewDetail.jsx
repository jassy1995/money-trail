import { useState, useEffect, useMemo, memo } from 'react';
import { notify } from "../../helpers/global"
import http from "../../lib/http";
import Modal from '../globals/Modal';
import { LoaderIndicator } from '../globals/LoaderIndicator';
import FilePreview from '../FilePreview';
import NoRecordFound from '../globals/NoRecordFound';

function ViewDetail({ open, setClose, title, request }) {
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
            http.get(`/receipts-by-id?id=${request.id}`)
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
                                            {(isFilter && !items.length) && <NoRecordFound />}
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

export default memo(ViewDetail)