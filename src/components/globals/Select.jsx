import { useField } from 'react-aria';

export default function Select(props) {
    let { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField(props);
    let { placeholder = 'select', optionsData = [] } = props;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}
        >
            <label {...labelProps} className='capitalize text-slate-500'>{props.label}</label>
            <select {...fieldProps} className='form-control'>
                <option className='text-sm text-red-600 first:italic'>{placeholder}</option>
                {optionsData.map((option) => (
                    <option key={option.value} value={option.value}>{option.title}</option>
                ))}
            </select>
            {props.description &&
                (
                    <div {...descriptionProps} style={{ fontSize: 12 }}>
                        {props.description}
                    </div>
                )}
            {props.errorMessage &&
                (
                    <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
                        {props.errorMessage}
                    </div>
                )}
        </div>
    );
}