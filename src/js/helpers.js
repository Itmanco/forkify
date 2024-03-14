import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      const err = new Error(`${data.message} (${res.status})`);
      err.status = res.status;
      throw err;
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) {
//       const err = new Error(`${data.message} (${res.status})`);
//       err.status = res.status;
//       throw err;
//     }

//     return data;
//   } catch (error) {
//     // console.log(error);
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   // console.log('->', url, uploadData);
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();
//     console.log('sendJSON->', data);

//     if (!res.ok) {
//       const err = new Error(`${data.message} (${res.status})`);
//       err.status = res.status;
//       throw err;
//     }

//     return data;
//   } catch (error) {
//     // console.log(error);
//     throw error;
//   }
// };
