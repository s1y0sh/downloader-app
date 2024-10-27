import React, { useState } from 'react';

function Home() {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState('720');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedFile, setDownloadedFile] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const totalBytes = +response.headers.get('Content-Length');
      if (!totalBytes) {
        throw new Error('Content-Length not available');
      }

      const reader = response.body.getReader();
      const chunks = [];
      let loadedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loadedBytes += value.length;
        setDownloadProgress(Math.round((loadedBytes / totalBytes) * 100));
      }

      const blob = new Blob(chunks);
      const objectUrl = URL.createObjectURL(blob);

      const fileType = response.headers.get('Content-Type') || 'application/octet-stream';
      let fileExtension = 'downloaded_file';

      if (fileType.includes('video')) {
        fileExtension = `downloaded_video_${quality}.mp4`;
      } else if (fileType.includes('audio')) {
        fileExtension = `downloaded_audio.mp3`;
      }

      const downloadLink = document.createElement('a');
      downloadLink.href = objectUrl;
      downloadLink.download = fileExtension;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setDownloadedFile({ url: objectUrl, type: fileType });
      setIsDownloading(false);
      setDownloadProgress(100);
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Download failed: ${error.message}`);
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Downloader App</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        style={styles.input}
      />
      <select value={quality} onChange={(e) => setQuality(e.target.value)} style={styles.select}>
        <option value="720">720p</option>
        <option value="1080">1080p</option>
        <option value="1440">1440p</option>
        <option value="2160">2160p (4K)</option>
      </select>
      <button onClick={handleDownload} disabled={isDownloading || !url} style={styles.button}>
        {isDownloading ? 'Downloading...' : 'Download'}
      </button>
      {isDownloading && <p>Download progress: {downloadProgress}%</p>}
      {downloadedFile && (
        <div>
          <h3>Downloaded File:</h3>
          {downloadedFile.type.includes("video") ? (
            <video controls src={downloadedFile.url} style={{ maxWidth: '100%' }} />
          ) : downloadedFile.type.includes("audio") ? (
            <audio controls src={downloadedFile.url} />
          ) : (
            <a href={downloadedFile.url} download>
              Download File
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// استایل برای مرکز کردن عناصر
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  title: {
    color: 'red',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1.2rem',
  },
  select: {
    width: '150px',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '1.2rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default Home;
