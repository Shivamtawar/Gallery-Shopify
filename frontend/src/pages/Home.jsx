import React from 'react';
import Carousel from '../components/Carousel';
import ImageGrid from '../components/ImageGrid';
import SearchBar from '../components/SearchBar';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <h1 className="text-3xl font-bold my-4">Featured Images</h1>
      <Carousel />
      <h2 className="text-2xl font-bold my-4">All Images</h2>
      <ImageGrid />
    </div>
  );
};

export default Home;
