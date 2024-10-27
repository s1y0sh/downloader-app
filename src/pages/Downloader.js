import React, { useState } from 'react';

function Downloader() {
  const [link, setLink] = useState('');
  const [quality, setQuality] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const qualities = ['Low', 'Medium', 'High']; // کیفیت‌های قابل انتخاب

  const handleDownload = () => {
    // اگر لینک وارد نشده باشد، پیام خطا نمایش داده شود
    if (!link) {
      alert('لطفاً یک لینک وارد کنید.');
      return;
    }
    
    // نمایش گزینه‌های کیفیت
    setDownloading(true);
  };

  const handleQualitySelect = (selectedQuality) => {
    setQuality(selectedQuality);
    // شبیه‌سازی فرآیند دانلود
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      // در اینجا می‌توانید عملیات دانلود واقعی را اضافه کنید
      console.log(`Downloading ${link} at ${selectedQuality} quality...`);
    }, 2000); // شبیه‌سازی مدت زمان دانلود
  };

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2>Downloader</h2>
      <input
        type="text"
        placeholder="لینک فایل را وارد کنید"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <button onClick={handleDownload} style={{ marginTop: '20px' }}>
        دانلود
      </button>

      {downloading && (
        <div>
          <h3>لطفاً کیفیت دانلود را انتخاب کنید:</h3>
          {qualities.map((q) => (
            <button
              key={q}
              onClick={() => handleQualitySelect(q)}
              style={{ margin: '5px' }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {downloaded && (
        <div>
          <h3>فایل در حال دانلود است...</h3>
          <p>لطفاً منتظر بمانید.</p>
        </div>
      )}
    </div>
  );
}

export default Downloader;
