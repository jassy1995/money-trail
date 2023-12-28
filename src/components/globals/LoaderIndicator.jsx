import LazyLoader from "./LazyLoader"

export const LoaderIndicator = ({ counts }) => {
    return (
        <div className='flex flex-col'>
            {
                counts.map((r, i) => (
                    <LazyLoader key={i} />
                ))
            }
        </div>
    )
}
