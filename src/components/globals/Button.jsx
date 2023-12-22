import { useButton } from 'react-aria';
import { useRef } from 'react';

export default function Button(props) {
    let ref = useRef();
    let { buttonProps } = useButton(props, ref);
    let { children, handler, size = 'default' } = props;

    return (
        <button className={`bg-[#0084C7] text-white px-3  outline-none rounded-md capitalize font-semibold hover:bg-[#0f70a1] w-full
        ${size === 'md' ? 'py-2' : 'py-1'}`}
            {...buttonProps} ref={ref} onClick={handler}>
            {children}
        </button>
    );
}

