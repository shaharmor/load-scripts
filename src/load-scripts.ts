export async function loadScripts(scriptUrls: string[]): Promise<void> {
  const root = document.head || document.body;
  const promises = scriptUrls.map((src) => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const scriptTag = document.createElement('script');
      scriptTag.src = src;
      scriptTag.onload = resolve;
      scriptTag.onerror = (err) => {
        try {
          root.removeChild(scriptTag);
        } catch (e) {
          // removeChild might throw when trying to remove a non-child element
        }
        reject(err);
      };
      root.appendChild(scriptTag);
    });
  });
  await Promise.all(promises);
}
