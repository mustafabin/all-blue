let apiUrl: string;

let productionURL = "http://192.168.1.175:3000";
let developmentURL = "http://127.0.0.1:3000";

//when running is development go to the development api
window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost" ? (apiUrl = developmentURL) : (apiUrl = productionURL);

export const login = async (form: any) => {
	let response = await fetch(`${apiUrl}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(form),
	});
	return await response.json();
};

export const discordLogin = async (token: string, type: string) => {
	let response = await fetch(`${apiUrl}/auth/discord`, {
		headers: {
			"Content-Type": "application/json",
			authorization: `${token} ${type}`,
		},
	});
	return await response.json();
};

export const signUp = async (form: any) => {
	let response = await fetch(`${apiUrl}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(form),
	});
	return await response.json();
};

export const profile = async (token: string) => {
	let response = await fetch(`${apiUrl}/profile`, {
		headers: {
			"Content-Type": "application/json",
			SuperToken: token,
		},
	});
	return await response.json();
};
