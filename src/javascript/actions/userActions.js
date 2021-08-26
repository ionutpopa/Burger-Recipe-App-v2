import axios from "axios";
import Cookies from "js-cookie";
import { calls } from "../utils/calls.js";
import { USERS, LOGIN, SIGNUP } from "../utils/config.js";

const token = Cookies.get("token");

export const signup = (data) => {
	return new Promise((resolve, reject) => {
		return axios(calls.signup(SIGNUP, data))
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});
};

export const login = (data) => {
	return new Promise((resolve, reject) => {
		return axios(calls.login(LOGIN, data))
			.then((res) => {
				if (res.data.token) {
					Cookies.set("token", res.data.token, {
						sameSite: "strict",
						secure: true,
						expires: 9999,
					});
					resolve(res.data)
				}
			})
			.catch((err) => resolve(err));
	});
};

export const getUser = (userId) => {
	return new Promise((resolve, reject) => {
		return axios(calls.getUser(USERS, token, userId))
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};
