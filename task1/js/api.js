// export const sendRequest = async (url) => {
//     try {
//         const response = await fetch(url);
//         const result = await response.json();
//         return result;
//     } catch (err) {
//         console.error(err);
//     }
// };

export const sendRequest =  (url) => {
    try {
      return fetch(url)
        .then((response) => response.json())
    } catch (err) {
      console.error(err);
    }
  };
  