// import { useState, useEffect } from 'react';

// const useSearch = (initialItems) => {
//     const [items, setItems] = useState(initialItems);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const filteredItems = initialItems.filter(item =>
//             item.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         setItems(filteredItems);
//     }, [searchTerm, initialItems]);

//     const handleSearch = (term) => {
//         setSearchTerm(term);
//     };

//     return {
//         items,
//         searchTerm,
//         handleSearch
//     };
// };

// export default useSearch;



// import { useState } from 'react';

// const useSearch = (items) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredItems, setFilteredItems] = useState(items);

//     const handleSearch = (query) => {
//         setSearchTerm(query);
//         const filtered = items.filter((item) =>
//             item.toLowerCase().includes(query.toLowerCase())
//         );
//         setFilteredItems(filtered);
//     };

//     return { items: filteredItems, searchTerm, handleSearch };
// };

// export default useSearch;

import { useEffect, useRef } from 'react';

const useDebouncedSearch = (callback, delay) => {
    const inputRef = useRef(null);
    const timeout = useRef(null);

    useEffect(() => {
        const handleInput = () => {
            if (!inputRef.current) return;

            clearTimeout(timeout.current);
            timeout.current = setTimeout(() => {
                const query = inputRef.current.value;
                callback(query);
            }, delay);
        };

        if (inputRef.current) {
            inputRef.current.addEventListener('input', handleInput);
        }

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('input', handleInput);
            }
        };
    }, [callback, delay]);

    return inputRef;
};

export default useDebouncedSearch;
