import React from 'react';

const Downloader = () => {
    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <h1 style={{ color: 'red' }}>Downloader</h1>
            <input type="text" placeholder="Enter link to download" />
            <button>Download</button>
        </div>
    );
};

export default Downloader;
