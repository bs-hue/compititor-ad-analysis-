// BloomX Ad Lens - Background Service Worker for Native Media Downloads
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download_media') {
        const { url, filename } = message;
        if (!url) {
            sendResponse({ success: false, error: 'No media URL provided' });
            return false;
        }

        try {
            chrome.downloads.download({
                url: url,
                filename: filename || 'ad_creative.mp4',
                saveAs: false,
                conflictAction: 'uniquify'
            }, (downloadId) => {
                if (chrome.runtime.lastError) {
                    console.warn('[BloomX Ad Lens] chrome.downloads error:', chrome.runtime.lastError.message);
                    sendResponse({ success: false, error: chrome.runtime.lastError.message });
                } else {
                    sendResponse({ success: true, downloadId });
                }
            });
            return true; // Keep message channel open for async response
        } catch (err) {
            console.error('[BloomX Ad Lens] Download invocation failed:', err);
            sendResponse({ success: false, error: err.message });
            return false;
        }
    }
    return false;
});
