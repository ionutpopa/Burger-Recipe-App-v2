import { Component } from "react";
import { Formik, Field, Form } from "formik";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import Nav from "../nav/Nav";
import { signup } from "../../actions/userActions";

const SignupSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Valid email is required!"),
	password: Yup.string()
		.required("No password provided")
		.min(8, "Password is too short - should be 8 chars minimum.")
		.matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

class Signup extends Component {
	routingFunction = (params) => {
		const { history } = this.props;

		history.push({
			pathname: `/signin`,
			state: params,
		});
	};
	render() {
		return (
			<div>
				<Nav />
				<Formik
					initialValues={{
						password: "",
						email: "",
					}}
					validationSchema={SignupSchema}
					onSubmit={(values) => {
						signup({
							email: values.email,
							password: values.password,
						})
							.then(() => {
								this.routingFunction({
									email: values.email,
									password: values.password,
								});
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
								Signup
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		);
	}
}

export default withRouter(Signup);
