import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search flex items-center border p-2 rounded">
      <Search className="mr-2" />
      <input type="text" placeholder="Search images..." className="flex-1 outline-none" />
    </div>
  );
};

export default SearchBar;
