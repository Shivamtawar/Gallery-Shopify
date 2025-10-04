import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageEditor from '../components/ImageEditor';
import { Code, Share2, Info } from 'lucide-react';
import { toast } from 'react-toastify';

const ImageDetail = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/images/${id}`);
        setImage(res.data.image);
      } catch (err) {
        toast.error('Failed to load image details');
      }
    };
    fetchImage();
  }, [id]);

  if (!image) return <div>Loading...</div>;

  const embedCode = `<img src="${image.url}" alt="${image.originalName}" />`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{image.originalName}</h1>
      <ImageEditor imageId={id} originalUrl={image.url} />
      <div className="metadata mt-4">
        <h2 className="text-xl flex items-center"><Info className="mr-1" /> Metadata</h2>
        <pre>{JSON.stringify(image.metadata, null, 2)}</pre>
      </div>
      <div className="actions flex space-x-4 mt-4">
        <button onClick={() => navigator.clipboard.writeText(embedCode).then(() => toast.success('Embed code copied'))}>
          <Code className="mr-1" /> Get Embed Code
        </button>
        <button><Share2 className="mr-1" /> Share</button>
      </div>
      <div>Views: {image.views} | Downloads: {image.downloads}</div>
    </div>
  );
};

export default ImageDetail;
