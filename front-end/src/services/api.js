let apiUrl;

let productionURL = "http://10.129.3.3:3000";
let developmentURL = "http://127.0.0.1:3000";

//when running is development go to the development api
window.location.hostname === "127.0.0.1" ||
window.location.hostname === "localhost"
  ? (apiUrl = developmentURL)
  : (apiUrl = productionURL);

export const login = async (form) => {
  let response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await response.json();
};
export const signUp = async (form) => {
  let response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  return await response.json();
};

export const profile = async (token) => {
  let response = await fetch(`${apiUrl}/profile`, {
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
  });
  return await response.json();
};
