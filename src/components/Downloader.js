import Downloader from '../components/Downloader'; // اطمینان حاصل کنید که مسیر درست است

import React, { useState } from 'react';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedFile, setDownloadedFile] = useState(null);

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const contentLength = response.headers.get('Content-Length');
      const total = parseInt(contentLength, 10);
      const reader = response.body.getReader();
      const chunks = [];
      let downloaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        downloaded += value.length;
        setDownloadProgress((downloaded / total) * 100);
      }

      const blob = new Blob(chunks);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = url.split('/').pop(); // Extract filename from URL
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadedFile(link.download);
      setIsDownloading(false);
      setDownloadProgress(100);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const handleDownload = () => {
    if (url) {
      downloadFile(url);
    } else {
      alert("Please enter a valid URL");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter file URL"
      />
      <button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? 'Downloading...' : 'Download'}
      </button>
      {isDownloading && (
        <div>
          <progress value={downloadProgress} max="100"></progress>
          <span>{downloadProgress.toFixed(2)}%</span>
        </div>
      )}
      {downloadedFile && <div>File downloaded: {downloadedFile}</div>}
    </div>
  );
};

export default Downloader;
