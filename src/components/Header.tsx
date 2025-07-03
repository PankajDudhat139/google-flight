import React from 'react';
import { Plane } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Flights</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;