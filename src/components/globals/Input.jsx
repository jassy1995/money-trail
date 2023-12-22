import { useRef } from 'react';
import { useTextField } from 'react-aria';

export default function Input(props) {
    let { label, placeholder } = props;
    let ref = useRef(null);
    let { labelProps, inputProps, descriptionProps, errorMessageProps } =
        useTextField(props, ref);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <label {...labelProps} className='capitalize text-slate-500'>{label}</label>
            <input {...inputProps} ref={ref} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder={placeholder} />
            {props.description && (
                <div {...descriptionProps} style={{ fontSize: 12 }}>
                    {props.description}
                </div>
            )}
            {props.errorMessage && (
                <span {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
                    {props.errorMessage}
                </span>
            )}
        </div>
    );
}

