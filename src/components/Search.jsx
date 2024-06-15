import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const mockDrugData = [
        { id: 1, name: 'Paracetamol', symptoms: 'Fever, Pain' },
        { id: 2, name: 'Ibuprofen', symptoms: 'Fever, Inflammation' },
        { id: 3, name: 'Aspirin', symptoms: 'Pain, Inflammation' },
        { id: 4, name: 'Omeprazole', symptoms: 'Acid reflux, Indigestion' },
        { id: 5, name: 'Loratadine', symptoms: 'Allergy symptoms' },
        { id: 6, name: 'Simvastatin', symptoms: 'High cholesterol' },
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setShowEmptyMessage(false); // Reset empty message flag when user types

        // Filter suggestions based on input value
        const filteredSuggestions = mockDrugData.filter(drug =>
            drug.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);

        // Show suggestions if there are any
        setShowSuggestions(filteredSuggestions.length > 0);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setShowEmptyMessage(true);
            setSearchResults([]); 
        } else {
            const results = mockDrugData.filter(drug =>
                drug.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }

        setShowSuggestions(false);
    };

    const handleSuggestionClick = (drugName) => {
        setSearchTerm(drugName);
        setShowSuggestions(false);
    };

    return (
        <div className='w-11/12 mx-auto my-20'>
            <div className='w-full bg-white p-4 rounded-lg shadow-md text-center'>
                <div className='text-xl font-bold mb-4'>Search for drugs!</div>
                <div className='relative flex justify-center'>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        className='w-[40%] px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2'
                    />
                    <button onClick={handleSearch} className='px-4 py-2 border border-black rounded-md ml-2'>
                        Search
                    </button>
                    {showSuggestions && (
                        <div className='absolute top-10 mt-1 w-[40%] bg-white border border-gray-300 rounded-b-lg shadow-md'>
                            {suggestions.map((drug) => (
                                <div
                                    key={drug.id}
                                    className='px-4 py-2 cursor-pointer hover:bg-gray-100'
                                    onClick={() => handleSuggestionClick(drug.name)}
                                >
                                    {drug.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className='mt-4'>
                    {searchResults.length > 0 ? (
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='px-4 py-2'>ID</th>
                                    <th className='px-4 py-2'>Name</th>
                                    <th className='px-4 py-2'>Symptoms</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((drug) => (
                                    <tr key={drug.id}>
                                        <td className='border px-4 py-2'>{drug.id}</td>
                                        <td className='border px-4 py-2'>{drug.name}</td>
                                        <td className='border px-4 py-2'>{drug.symptoms}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        showEmptyMessage && <p className='text-gray-500'>Type something to search.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;