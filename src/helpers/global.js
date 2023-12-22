
import { toast } from "react-toastify";

export const notify = ({ type, message = 'operation failed' }) => {
    if (!type) return;
    if (!['success', 'warning', 'error'].includes(type)) return;
    toast[type](message);
}
export const handleCopy = ({ text: textToCopy, message = 'copied' }) => {
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            notify({ type: 'success', message: message });
            return { status: true }
        })
        .catch((err) => {
            notify({ type: 'error', message: err.message || 'unable to copy' });
            return { status: false }
        });
};
export const findOne = (data, identifier) => {
    if (Array.isArray(data) && identifier) {
        return data.find(r => +r.REQUEST_ID === +identifier)
    }
    return null;
}
