import React from 'react';

const DashboardHeader: React.FC = () => {
    return (
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
                Your Impact Dashboard
            </h1>
            <p className="text-lg text-gray-600">
                Track your contributions and see the difference you're making in the world
            </p>
        </div>
    );
};

export default DashboardHeader;