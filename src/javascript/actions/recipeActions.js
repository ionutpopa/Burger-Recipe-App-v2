import axios from "axios";
import Cookies from "js-cookie";
import { calls } from "../utils/calls.js";
import { HOME } from "../utils/config.js";

const token = Cookies.get("token");

export const postRecipe = (data) => {
	return new Promise((resolve, reject) => {
		return axios(calls.postRecipe(HOME, token, data))
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};

export const updateRecipe = (data, userId) => {
	return new Promise((resolve, reject) => {
		return axios(calls.updateRecipe(HOME, token, data, userId))
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};

export const deleteRecipe = (userId) => {
	return new Promise((resolve, reject) => {
		return axios(calls.deleteRecipe(HOME, token, userId))
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};

export const getRecipes = () => {
	return new Promise((resolve, reject) => {
		return axios(calls.getRecipes(HOME))
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};

export const getRecipe = (id) => {
	return new Promise((resolve, reject) => {
		return axios(calls.getRecipe(HOME, id))
			.then((res) => resolve(res.data))
			.catch((err) => reject(err));
	});
};
