import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, CardContent, Button, Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { postRecipe, getRecipes } from "./javascript/actions/recipeActions";
import "./App.css";
import { AppContext } from "./javascript/AppContext";
import { connect } from "react-redux";
import Nav from "./javascript/components/nav/Nav";

const RecipeSchema = Yup.object().shape({
	title: Yup.string().required("Title is required!"),
	description: Yup.string().required("Description is required!"),
});
class App extends Component {
	constructor(props) {
		super(props);

		this.token = Cookies.get("token");

		this.state = {
			noRecipeText: "",
			recipes: [],
			userId: "",
		};
	}

	componentDidMount = () => {
		const { location, history } = this.props;

		if (location.state?.refresh) {
			window.location.reload(false);
			history.push({
				state: {
					refresh: false
				}
			})
		}
		getRecipes()
			.then((recipes) =>
				this.setState({
					recipes: recipes,
					userId: Cookies.get("user_id"),
				})
			)
			.catch((err) => {
				console.log(err);
			});
	};

	CustomInputComponent = (props) => <textarea className="description-field" type="text" {...props} />;

	render() {
		const { userId, recipes } = this.state;
		return (
			<div className="App">
				<Nav />
				{this.token ? (
					<Formik
						initialValues={{
							title: "",
							description: "",
						}}
						validationSchema={RecipeSchema}
						onSubmit={(values, { resetForm }) => {
							postRecipe({
								title: values.title,
								description: values.description,
								UserUserId: userId,
							}).then(() => {
								getRecipes().then((recipes) => {
									this.setState({
										recipes: recipes,
									});
								});
								resetForm();
							});
						}}
					>
						{({ errors, touched }) => (
							<Form className="home-form">
								<label htmlFor="title">Title</label>
								<Field id="title" name="title" type="title" />
								{touched.title && errors.title && <span className="errors">{errors.title}</span>}
								<label htmlFor="description">Description</label>
								<Field
									as={this.CustomInputComponent}
									type="description"
									id="description"
									name="description"
								/>
								{touched.description && errors.description && (
									<span className="errors">{errors.description}</span>
								)}
								<br />
								<Button className="submit-button" variant="contained" color="primary" type="submit">
									Submit
								</Button>
							</Form>
						)}
					</Formik>
				) : null}
				<div className="no-recipes-text">
					<h1>{recipes?.length === 0 ? "There are no recipes added yet" : null}</h1>
				</div>
				<div className="recipes-container">
					{!recipes
						? null
						: recipes.map((recipe) => {
								return (
									<Link
										className="link"
										key={recipe.id}
										to={{
											pathname: `/recipes/${recipe.id}`,
											state: {
												id: recipe.id,
												createdBy: recipe.UserUserId,
											},
										}}
									>
										<Card raised={true} className="recipe">
											<CardContent>
												<Typography gutterBottom variant="h5" component="h2">
													{recipe?.title}
												</Typography>
												<Typography variant="body2" color="textSecondary" component="p">
													{recipe?.description}
												</Typography>
											</CardContent>
										</Card>
									</Link>
								);
						  })}
				</div>
			</div>
		);
	}
}

App.contextType = AppContext;

const mapStateToProps = (store) => ({
	user: store.user,
});

export default connect(mapStateToProps)(withRouter(App));
