import cloneDeep from "lodash/cloneDeep";

export default function userReducer(state = cloneDeep(defaultState), action) {
	let newState = cloneDeep(state);
	switch (action.type) {
		case "SET_USER_ID": {
			newState.userId = action.payload;
			return newState;
		}
		default:
			return newState;
	}
}

const defaultState = {
	userId: null,
};
