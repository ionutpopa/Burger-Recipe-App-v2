import { Component } from "react";
import Cookies from "js-cookie";
import { deleteRecipe, getRecipe, updateRecipe } from "../../actions/recipeActions";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, Typography } from "@material-ui/core";
import Nav from "../nav/Nav";
import { AppContext } from "../../AppContext";
import { connect } from "react-redux";
import "./Recipe.css";

const RecipeSchema = Yup.object().shape({
	title: Yup.string().required("Title is required!"),
	description: Yup.string().required("Description is required!"),
});

class Recipe extends Component {
	constructor(props) {
		super(props);

		const { location } = this.props;

		this.state = {
			recipe: {},
			userId: parseInt(Cookies.get("user_id")),
			update: false,
			token: Cookies.get("token"),
			id: location.state.id,
			createdBy: location.state.createdBy
		};
	}
	componentDidMount = () => {
		const {id} = this.state;
		getRecipe(id).then((res) => {
			this.setState({
				recipe: res[0],
			});
		});
	};
	routingFunction = () => {
		const { history } = this.props;

		history.push({
			pathname: `/`,
		});
	};
	updateR = () => {
		this.setState({
			update: true,
		});
	};

	deleteR = () => {
		const { id } = this.state;
		deleteRecipe(id).then(() => {
			this.routingFunction();
		});
	};

	CustomInputComponent = (props) => <textarea className="description-field" type="text" {...props} />;

	render() {
		const { recipe, id, userId, update, createdBy } = this.state;
		return (
			<>
				<Nav />
				<Container maxWidth="sm" className="reciepe">
					<br />
					<Typography gutterBottom variant="h5" component="h2">
						{recipe?.title}
					</Typography>
					<Typography align="left" display="block">
						{recipe?.description}
					</Typography>
					{userId === createdBy ? (
						<div>
							<div className="ud-buttons">
								<Button variant="contained" color="secondary" onClick={this.deleteR}>
									Delete Recipe
								</Button>
								<Button variant="contained" color="primary" onClick={this.updateR}>
									Update Recipe
								</Button>
							</div>
							{update ? (
								<Formik
									initialValues={{
										title: recipe.title,
										description: recipe.description,
									}}
									validationSchema={RecipeSchema}
									onSubmit={(values) => {
										updateRecipe(
											{
												title: values.title,
												description: values.description,
											},
											id
										).then(() => {
											getRecipe(id).then((res) => {
												this.setState({
													recipe: res[0],
													update: false
												})
											});
										});
									}}
								>
									{({ errors, touched }) => (
										<Form className="form">
											<label htmlFor="title">New Title</label>
											<Field id="title" name="title" type="title" />
											{touched.title && errors.title && (
												<span className="errors">{errors.title}</span>
											)}
											<label htmlFor="description">New Description</label>
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
											<Button variant="contained" color="primary" type="submit">
												Update
											</Button>
										</Form>
									)}
								</Formik>
							) : null}
						</div>
					) : null}
				</Container>
			</>
		);
	}
}

Recipe.contextType = AppContext

const mapStateToProps = (store) => ({
	user: store.user,
});

export default connect(mapStateToProps)(Recipe);
