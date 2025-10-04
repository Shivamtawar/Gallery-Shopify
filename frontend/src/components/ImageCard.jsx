import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download } from 'lucide-react';

const ImageCard = ({ image, isCarousel = false }) => {
  return (
    <div className={`relative ${isCarousel ? 'h-96' : 'h-64'} overflow-hidden rounded-lg`}>
      <img src={image.url} alt={image.originalName} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex justify-between">
        <span>Views: {image.views}</span>
        <span>Downloads: {image.downloads}</span>
      </div>
      <Link to={`/image/${image._id}`} className="absolute top-2 right-2 bg-white p-1 rounded">
        <Eye size={20} />
      </Link>
    </div>
  );
};

export default ImageCard;
