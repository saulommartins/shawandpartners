import React from 'react';
import CsvUploader from './CsvUploader';
import UserSearch from './UserSearch';
import '../styles/App.css';

const App: React.FC = () => {

  return (
    <div className="app-container">
      <h1>CSV User Search</h1>
      <CsvUploader />
      <UserSearch />
    </div>
  );
};

export default App;

