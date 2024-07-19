import React, { useEffect, useState, useCallback } from 'react';
import studentDirectoryService from '../services/StudentDirectoryService';
import StudentDirectoryCss from '../css/StudentDirectoryCss.css';

const StudentDirectories = () => {
    const [directories, setDirectories] = useState([]);
    const [selectedDirectory, setSelectedDirectory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        academicYear: '',
        major: '',
        text: ''
    });
    const [page, setPage] = useState(0);
    const pageSize = 10;

    const fetchDirectories = useCallback(() => {
        setLoading(true);
        studentDirectoryService.getDirectoriesByPage(page, pageSize)
            .then(response => {
                setDirectories(response.data.content);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
        setSelectedDirectory(null);
    }, [page]);

    useEffect(() => {
        fetchDirectories();
    }, [fetchDirectories]);

    const handleDirectorySelect = (id) => {
        setLoading(true);
        studentDirectoryService.getDirectoryById(id)
            .then(response => {
                setSelectedDirectory(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleDirectoryDelete = (id) => {
        studentDirectoryService.deleteDirectory(id)
            .then(() => {
                setDirectories(directories.filter(d => d.id !== id));
            })
            .catch(error => setError(error));
        setSelectedDirectory(null);
        console.log(StudentDirectoryCss);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        studentDirectoryService.searchDirectories(searchParams)
            .then(response => {
                setDirectories(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (

        <div className='student-directory-container'>
            <h1>Student Directories</h1>
            <form onSubmit={handleSearch} className='search-form'>
                <input
                    type='date'
                    placeholder='Academic Year'
                    value={searchParams.academicYear}
                    onChange={(e) => setSearchParams({...searchParams, academicYear: e.target.value})}
                />
                <input
                    type='text'
                    placeholder='Major'
                    value={searchParams.major}
                    onChange={(e) => setSearchParams({...searchParams, major: e.target.value})}
                />
                <input
                    type='text'
                    placeholder='Search Text'
                    value={searchParams.text}
                    onChange={(e) => setSearchParams({...searchParams, text: e.target.value})}
                />
                <button type='submit'>Search</button>
            </form>
            <ul className='directory-list'>
                {directories.map(directory => (
                    <li key={directory.id} onClick={() => handleDirectorySelect(directory.id)}>
                        {directory.user.firstName} {directory.user.lastName}
                    </li>
                ))}
            </ul>
            {selectedDirectory && (
                <div className='directory-details'>
                    <h2>{selectedDirectory.user.firstName} {selectedDirectory.user.lastName}</h2>
                    <p>Contact Information: {selectedDirectory.contactInformation}</p>
                    <p>Academic Year: {selectedDirectory.academicYear}</p>
                    <p>Major: {selectedDirectory.major}</p>
                    <button onClick={() => handleDirectoryDelete(selectedDirectory.id)}>Delete</button>
                </div>
            )}
            <div className='pagination-controls'>
                <button onClick={() => setPage(page > 0 ? page - 1 : 0)}>Previous</button>
                <span>Page {page + 1}</span>
                <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>

    );
};

export default StudentDirectories;
