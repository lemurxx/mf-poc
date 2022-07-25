export const login = (userId, password) => {
  const loginUrl = 'https://choiceservicesqaf.avon.com/myavon/repScrty/v1/rest/JT/EN/logn';
  return fetch(loginUrl, {
    headers: {
      acctnr: userId.toString(),
      accept: "application/json, text/plain, */* ",
      "content-type": "application/json",
    },
    method: "put",
    body: JSON.stringify({ userId, password }),
  });
};
