import React from 'react';
import '../styles/UserCard.css';

interface DataCardProps {
  data: Record<string, string>;  // Represents a dynamic object with string keys and values
}


const UserCard: React.FC<DataCardProps> = ({ data }) => {
  return (
    <div className="user-card">
      {Object.entries(data).map(([key, value]) => (
          <div className="data-card-item" key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </div>
      ))}
    </div>
  );
};

export default UserCard;

