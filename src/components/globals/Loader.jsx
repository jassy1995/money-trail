
export default function Loader() {
    return (
        <div className='flex justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                <circle cx="12" cy="12" r="10" stroke="#FFFFFF" fill="none" strokeWidth="3" />
                <animate attributeName="stroke-dasharray" attributeType="XML" from="0, 100" to="100, 0" dur="1.5s" repeatCount="indefinite" />
            </svg>
        </div>
    )
}
