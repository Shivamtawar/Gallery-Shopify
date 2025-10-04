import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, UploadCloud } from 'lucide-react';
import ImageUpload from './ImageUpload';

const Header = () => {
  const [showUpload, setShowUpload] = useState(false);

  const handleUploadSuccess = () => {
    // Refresh the page or update the image list
    window.location.reload();
  };

  return (
    <>
      <header className="bg-blue-600 text-white p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Image Gallery</Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className="flex items-center hover:text-blue-200"><Home className="mr-1" /> Home</Link></li>
            <li><Link to="/about" className="flex items-center hover:text-blue-200"><Info className="mr-1" /> About</Link></li>
            <li>
              <button
                onClick={() => setShowUpload(true)}
                className="flex items-center hover:text-blue-200"
              >
                <UploadCloud className="mr-1" /> Upload
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <ImageUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default Header;
