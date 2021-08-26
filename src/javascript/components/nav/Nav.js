import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import "./Nav.css";

class Nav extends Component {
	constructor(props) {
		super(props);

		this.token = Cookies.get("token");
	}
	routingFunction = () => {
		const { history } = this.props;

		history.push({
			pathname: `/`,
		});
	};
	logout = () => {
		new Promise((resolve) => {
			resolve(
				Cookies.remove("token", {
					sameSite: "strict",
					secure: true,
					expires: 9999,
				}),
				Cookies.remove("user_id", {
					sameSite: "strict",
					secure: true,
					expires: 9999,
				})
			);
		}).then(() => {
			window.location.reload(false);
		});
	};
	render() {
		return (
			<header className="header">
				<h3 onClick={this.routingFunction}>Burgers Recipes</h3>

				<div className="buttons">
					{this.token ? (
						<Button onClick={this.logout} className="login" variant="contained" color="primary">
							Logout
						</Button>
					) : (
						<Link to="/signin">
							<Button className="login" variant="contained" color="primary">
								Login
							</Button>
						</Link>
					)}
					<Link to="/signup">
						<Button className="signup" variant="contained" color="primary">
							Signup
						</Button>
					</Link>
				</div>
			</header>
		);
	}
}

export default withRouter(Nav);
