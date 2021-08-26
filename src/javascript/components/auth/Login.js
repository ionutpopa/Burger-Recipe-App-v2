import { Component } from "react";
import { Formik, Field, Form } from "formik";
import { withRouter } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from "@material-ui/core";
import * as Yup from "yup";
import Nav from "../nav/Nav";
import { login } from "../../actions/userActions";
import { connect } from "react-redux";
import { AppContext } from "../../AppContext";
import "./Auth.css";
import Cookies from "js-cookie";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Valid email is required!"),
	password: Yup.string()
		.required("No password provided")
		.min(8, "Password is too short - should be 8 chars minimum.")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}
	routingFunction = () => {
		const { history } = this.props;

		history.push({
			pathname: `/`,
			state: {
				refresh: true
			}
		});
	};
	componentDidMount = () => {
		const { location } = this.props;
		if (location.state && location.state.email && location.state.password) {
			login({
				email: location.state.email,
				password: location.state.password,
			}).then((res) => {
				const response = res.toString();
				if (response.includes("401")) {
					this.setState({
						open: true,
					});
				} else {
					Cookies.set("user_id", res.user_id, {
						sameSite: "strict",
						secure: true,
						expires: 9999,
					});
					this.routingFunction();
				}
			});
		}
	};
	render() {
		const { open } = this.state;
		return (
			<div>
				<Nav />
				<Formik
					initialValues={{
						password: "",
						email: "",
					}}
					validationSchema={LoginSchema}
					onSubmit={(values) => {
						login({
							email: values.email,
							password: values.password,
						})
							.then((res) => {
								const response = res.toString();
								if (response.includes("401")) {
									this.setState({
										open: true,
									});
								} else {
									Cookies.set("user_id", res.user_id, {
										sameSite: "strict",
										secure: true,
										expires: 9999,
									});
									this.routingFunction();
								}
							})
							.catch((error) => console.log(error));
					}}
				>
					{({ errors, touched }) => (
						<Form className="auth-container">
							<label htmlFor="email">Email</label>
							<Field id="email" name="email" placeholder="john@doe.com" type="email" />
							{touched.email && errors.email && <span className="errors">{errors.email}</span>}
							<label htmlFor="password">Password</label>
							<Field type="password" id="password" placeholder="********" name="password" />
							{touched.password && errors.password && <span className="errors">{errors.password}</span>}
							<br />
							<Button variant="contained" color="primary" type="submit">
								Login
							</Button>
						</Form>
					)}
				</Formik>
				<Dialog
					open={open}
					onClose={() => this.setState({ open: false })}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							You entered the wrong Email or Password
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.setState({ open: false })} color="primary" autoFocus>
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

Login.contextType = AppContext;

const mapStateToProps = (store) => ({
	user: store.user,
});

export default connect(mapStateToProps)(withRouter(Login));
