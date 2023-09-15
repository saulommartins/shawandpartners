import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';

describe('UserCard', () => {
    const mockData: Record<string, string> = {
        name: "John",
        email: "john@example.com",
        role: "Developer"
    };

    it('renders without crashing', () => {
        render(<UserCard data={mockData} />);
    });

    it('displays the correct data', () => {
        render(<UserCard data={mockData} />);
        
        expect(screen.getByText('Name:')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();

        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();

        expect(screen.getByText('Role:')).toBeInTheDocument();
        expect(screen.getByText('Developer')).toBeInTheDocument();
    });

    it('handles empty data', () => {
        render(<UserCard data={{}} />);
        
        // Expecting the component to not crash and not have any of the test data
        expect(screen.queryByText('Name:')).not.toBeInTheDocument();
        expect(screen.queryByText('John')).not.toBeInTheDocument();
    });
});
