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



import { useState } from 'react';

const useSearch = (items) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = (query) => {
        setSearchTerm(query);
        const filtered = items.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return { items: filteredItems, searchTerm, handleSearch };
};

export default useSearch;