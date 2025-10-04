import React, { useState } from 'react';
import axios from 'axios';
import { Crop, Palette, Download } from 'lucide-react';
import { toast } from 'react-toastify';

const ImageEditor = ({ imageId, originalUrl }) => {
  const [transformedUrl, setTransformedUrl] = useState(originalUrl);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [cropParams, setCropParams] = useState({ x: 0, y: 0, width: 100, height: 100 });

  const handleRemoveBg = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/images/remove-bg/${imageId}`);
      setTransformedUrl(res.data.transformedUrl);
      toast.success('Background removed');
    } catch (err) {
      toast.error('Failed to remove background');
    }
  };

  const handleChangeBg = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/images/change-bg/${imageId}`, { color: bgColor });
      setTransformedUrl(res.data.transformedUrl);
      toast.success('Background color changed');
    } catch (err) {
      toast.error('Failed to change background');
    }
  };

  const handleTrim = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/images/trim/${imageId}`, cropParams);
      setTransformedUrl(res.data.transformedUrl);
      toast.success('Image trimmed');
    } catch (err) {
      toast.error('Failed to trim image');
    }
  };

  const handleDownload = async () => {
    window.location.href = `http://localhost:5000/api/images/download/${imageId}?removeBg=true&bgColor=${bgColor}`;  // Example
  };

  return (
    <div className="editor p-4 border rounded">
      <img src={transformedUrl} alt="Edited" className="max-w-full h-auto" />
      <div className="controls mt-4 flex space-x-2">
        <button onClick={handleRemoveBg} className="flex items-center"><Palette className="mr-1" /> Remove BG</button>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        <button onClick={handleChangeBg}>Change BG</button>
        {/* Crop inputs simplified */}
        <input type="number" placeholder="X" onChange={(e) => setCropParams({...cropParams, x: e.target.value})} />
        <input type="number" placeholder="Y" onChange={(e) => setCropParams({...cropParams, y: e.target.value})} />
        <input type="number" placeholder="Width" onChange={(e) => setCropParams({...cropParams, width: e.target.value})} />
        <input type="number" placeholder="Height" onChange={(e) => setCropParams({...cropParams, height: e.target.value})} />
        <button onClick={handleTrim}><Crop className="mr-1" /> Trim</button>
        <button onClick={handleDownload}><Download className="mr-1" /> Download</button>
      </div>
    </div>
  );
};

export default ImageEditor;
