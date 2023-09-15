import React, { useState } from 'react';
import UserCard from './UserCard';
import api from '../api/api';
import '../styles/UserSearch.css';

type User = {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
};

type FetchData = {
  users: User[];
  totalPages: number;
};

const UserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Added state for total pages
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = (search: string, page = 1) => {
    setUsers([]);
    // const fetchResults = async () => {
    //   if (search.trim() !== '') {
    //     try {
    //       const response = await api.get(`/api/users?q=${search}&page=${page}`);
    //       console.log('response', response)
    //       setUsers(response.data.users);  // Extract user data from the returned object
    //       setTotalPages(response.data.totalPages);  // Set total pages from the returned data
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   } else {
    //     setUsers([]);
    //   }
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/users?q=${search}&page=${page}`);
        setUsers(response.data.users);  // Extract user data from the returned object
        setTotalPages(response.data.totalPages);  // Set total pages from the returned data
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

    fetchResults();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    fetchData(term, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData(searchTerm, newPage);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {/* Basic Pagination Controls */}
        <button disabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
      <div className="data-cards-container">
        {users?.length>0 && users.map(user => (
          <UserCard key={user.name} data={user} />
        ))}
      </div>
      {loading && <span>Loading...</span>}
    </div>
  );
};

export default UserSearch;
