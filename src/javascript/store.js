import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createRootReducer } from "./rootReducer.js";
import thunk from "redux-thunk";

export default function generateNewStore() {
	return createStore(createRootReducer(), composeWithDevTools(applyMiddleware(thunk)));
}
