import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../../../App";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import Recipe from "../recipe/Recipe";
import { Provider } from "react-redux";
import generateNewStore from "../../store";
import { AppContext } from "../../AppContext";
import client from "../../utils/EventEmitter";

export let store = generateNewStore();

export let appContext = {
	client: client,
};

class RootRouter extends Component {
	render() {
		return (
			<Provider store={store}>
				<AppContext.Provider value={appContext}>
					<div className="App">
						<Router>
							<Switch>
								<Route exact path="/" component={App} />
								<Route exact path="/signin" component={Login} />
								<Route exact path="/signup" component={Signup} />
								<Route exact path="/recipes/:_id" component={Recipe} />
							</Switch>
						</Router>
					</div>
				</AppContext.Provider>
			</Provider>
		);
	}
}

export default RootRouter;
