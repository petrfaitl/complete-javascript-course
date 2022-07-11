import { TIMEOUT_SEC } from './config.js';

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function(url) {
  try {

    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (status: ${response.status})`);
    return data;
  } catch (err) {
    throw err;

  }
};

export const sendJSON = async function(url, uploadData) {
  try {
    const fetchPost = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uploadData)
    });

    const response = await Promise.race([fetchPost, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message} (status: ${response.status})`);
    return data;
  } catch (e) {
    throw e;
  }
};