import React from 'react';

function Badge({ variant = 'default', value }) {
    let classes = 'w-5 h-5 text-xs rounded-full flex justify-center items-center whitespace-nowrap';

    if (variant === 'default') {
        classes += 'bg-gray-600 text-white';
    } else if (variant === 'red') {
        classes += 'bg-red-600 text-white';
    } else if (variant === 'green') {
        classes += 'bg-green-600 text-white';
    } else if (variant === 'yellow') {
        classes += 'bg-yellow-600 text-white';
    } else if (variant === 'blue') {
        classes += 'bg-blue-600 text-white';
    }

    return (
        <div className={classes}>
            {value}
        </div>
    );
}

export default Badge;
