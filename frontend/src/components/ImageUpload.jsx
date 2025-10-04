import React, { useState } from 'react';
import axios from 'axios';
import { UploadCloud, X } from 'lucide-react';
import { toast } from 'react-toastify';

const ImageUpload = ({ isOpen, onClose, onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
        } else {
            toast.error('Please select a valid image file');
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Please select an image first');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Image uploaded successfully!');
            setSelectedFile(null);
            setDescription('');
            onUploadSuccess?.(response.data.image);
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.error || 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Upload Image</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {selectedFile ? (
                        <div>
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="Preview"
                                className="max-w-full h-32 object-contain mx-auto mb-2"
                            />
                            <p className="text-sm text-gray-600">{selectedFile.name}</p>
                            <button
                                onClick={() => setSelectedFile(null)}
                                className="mt-2 text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div>
                            <UploadCloud className="mx-auto mb-2" size={48} />
                            <p className="mb-2">Drag and drop an image here, or</p>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileSelect(e.target.files[0])}
                                className="hidden"
                                id="file-input"
                            />
                            <label
                                htmlFor="file-input"
                                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                            >
                                Choose File
                            </label>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                        Description (optional)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add a description for your image..."
                        className="w-full border rounded px-3 py-2 resize-none"
                        rows={3}
                    />
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                        className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
