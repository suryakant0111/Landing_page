import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';

const ManufacturePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle', 'uploading', 'success', 'error'
  const fileInputRef = useRef(null);

  const supportedFormats = ['iges', 'stl', 'fbx', 'dxf', 'step', 'stp'];
  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const validateFile = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const isValidFormat = supportedFormats.includes(extension);
    const isValidSize = file.size <= maxFileSize;
    
    return {
      isValid: isValidFormat && isValidSize,
      error: !isValidFormat ? 'Unsupported file format' : !isValidSize ? 'File too large (max 50MB)' : null
    };
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.isValid) {
        validFiles.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.name.split('.').pop().toUpperCase(),
          status: 'ready'
        });
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }

    if (errors.length > 0) {
      setUploadStatus('error');
      console.error('Upload errors:', errors);
      setTimeout(() => setUploadStatus('idle'), 5000);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div id="manufacture" className="min-h-screen bg-gray-50 p-8">
      {/* Header with Animation */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-4">
          Manufacture
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-2">
          The Most Popular
        </h1>
        <h2 className="text-5xl font-bold text-gray-900 mb-2">
          <span
            className="font-serif italic bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(110deg, #909090 0%, #b0b0b0 15%, #909090 30%, #707070 45%, #909090 60%, #b0b0b0 75%, #909090 90%)',
              WebkitBackgroundClip: 'text',
              backgroundSize: '300% auto',
              backgroundPosition: '0% center',
              animation: 'metallicShine 10s linear infinite',
              display: 'inline-block',
              textShadow: '0 0 4px rgba(140,140,140,0.2)',
            }}
          >
            Details
          </span>{' '}
          We Produce
        </h2>
      </motion.div>

      {/* Main Content Grid with Staggered Animation */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {/* Spherical Joint Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Spherical Joint</h3>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="text-gray-900 font-medium">Steel, Stainless Steel</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Load Capacity:</span>
              <span className="text-gray-900 font-medium">Up to 10,000 N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Thread:</span>
              <span className="text-gray-900 font-medium">M8 to M30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bearing Type:</span>
              <span className="text-gray-900 font-medium">Ball or Plain</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full relative overflow-hidden">
                <div className="absolute inset-2 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Protective Cap Card */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-gray-900">Protective Cap</h3>
            <ArrowRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-600">Material:</span>
              <span className="text-gray-900 font-medium">Steel, Rubber</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fit Type:</span>
              <span className="text-gray-900 font-medium">Snap-on, Threaded</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Water Resistance:</span>
              <span className="text-gray-900 font-medium">IP54</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impact Resistance:</span>
              <span className="text-gray-900 font-medium">10 J</span>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg flex items-center justify-center">
              <div className="w-24 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full relative">
                <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-2 bg-blue-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Functional Upload Section */}
        <motion.div
          className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden"
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">Drag & Drop</h3>
                <h4 className="text-xl font-light">Your 3D Design</h4>
              </div>
              {uploadStatus === 'success' && (
                <CheckCircle className="w-6 h-6 text-green-300" />
              )}
              {uploadStatus === 'error' && (
                <AlertCircle className="w-6 h-6 text-red-300" />
              )}
            </div>

            {/* Upload Area */}
            <div
              className={`relative mb-6 border-2 border-dashed rounded-lg transition-all duration-300 cursor-pointer
                ${dragActive 
                  ? 'border-white bg-white bg-opacity-10 scale-105' 
                  : 'border-white border-opacity-60 hover:border-opacity-100'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={openFileSelector}
            >
              <div className="p-8 text-center">
                <Upload className={`w-12 h-12 mx-auto mb-4 transition-all duration-300 ${dragActive ? 'scale-110' : ''}`} />
                <p className="text-lg font-medium mb-2">
                  {dragActive ? 'Drop files here' : 'Click or drag files here'}
                </p>
                <p className="text-sm opacity-80">
                  Max file size: 50MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".iges,.stl,.fbx,.dxf,.step,.stp"
                onChange={handleChange}
                className="hidden"
              />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mb-6 space-y-2 max-h-32 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-32">{file.name}</p>
                        <p className="text-xs opacity-70">{formatFileSize(file.size)} • {file.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Supported Formats */}
            <div className="text-center">
              <p className="text-sm opacity-80 mb-2">SUPPORTED FORMATS</p>
              <p className="text-sm font-medium">IGES / STL / FBX / DXF / STEP</p>
            </div>

            {/* Status Messages */}
            {uploadStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-green-300">✓ Files uploaded successfully!</p>
              </motion.div>
            )}
            {uploadStatus === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-sm text-red-300">⚠ Some files couldn't be uploaded</p>
              </motion.div>
            )}
          </div>

          {/* Background geometric pattern */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="w-16 h-16 border border-white rounded-lg transform rotate-12"></div>
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <div className="w-12 h-12 border border-white rounded transform -rotate-12"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* File Processing Summary (appears when files are uploaded) */}
      {uploadedFiles.length > 0 && (
        <motion.div
          className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Uploaded Files Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{file.type}</span>
                </div>
                <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Ready for processing</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes metallicShine {
            0% { background-position: 0% center; }
            100% { background-position: 300% center; }
          }
        `
      }} />
    </div>
  );
};

export default ManufacturePage;