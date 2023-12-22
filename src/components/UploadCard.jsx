export default function UploadCard() {
    return (
        <div className='flex flex-col sm:flex-row space-y-3 space-x-0 sm:space-x-5 bg-white w-full p-5 card'>
            <img src="https://img.freepik.com/free-vector/realistic-receipt-template_23-2147938550.jpg?w=2000" className='w-full h-[150px] sm:w-[100px] sm:h-[100px] object-cover rounded-md sm:rounded-lg' alt="" />
            <div className='flex flex-col space-y-3 justify-center w-full'>
                <p className='max-w-xl text-sm'>An electronic receipt for payment is a digital document that serves as proof of a financial transaction</p>
                <div className='flex justify-between items-center text-sm'>
                    <span className='text-[#9BA3AF] flex items-center'> <span className="hidden sm:block mr-1">By:</span>Babatunde Joseph</span>
                    <span className='text-[#9BA3AF]'>Feb 18, 1995.</span>
                </div>
            </div>
        </div>
    )
}