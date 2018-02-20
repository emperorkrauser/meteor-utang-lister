import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";

class PatientCreate extends Component{
	constructor(){
		super();

		this.state = {
			error: "",
			first_nameError:"",
			last_nameError:"",
			age_Error:"",
			address_Error:""
		}
	}

	handleUpload(e){

	}

	handleSubmit(e){
		e.preventDefault();
		const first_name = this.refs.first_name.value.trim();
		const last_name = this.refs.last_name.value.trim();
		const age = this.refs.age.value.trim();
		const address = this.refs.address.value.trim();
		const debt = this.refs.amount.value.trim();
		const profile_pic = this.fileInput.files[0];
		console.log(this.fileInput.files[0]);
		const date = new Date();

		// console.log(Meteor.user());

		if(!first_name){
			console.log("error");

			this.setState({
				error: "Enter a correct value"
			});
		}
		else{
			// same name on the collections insert
			this.setState({
				error: ""
			});

			Meteor.call("debtors.insert", {
				first_name,
				last_name,
				age,
				address,
				profile_pic,
				date,
				owner: Meteor.userId(),
				username: Meteor.user().username,
				debt
			}, (error) => {
				// callback if there is an error
				if(error){
					console.log("Please enter a valid input!");
					this.setState({
						error:"Please enter a valid input"
					});
				}
				else{
					this.setState({
						error: ""
					})
				}

				this.refs.first_name.value = "";
				this.refs.last_name.value = "";
				this.refs.age.value = "";
				this.refs.address.value = "";
				this.refs.amount.value = "";
			});
		}
	}

	render(){
		// console.log(this.props.currentUser);
		if(this.props.currentUser){
			return(
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h1>Add a Debtor</h1>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<div className="col-md-6">
									<p>First Name</p>
									<input ref="first_name" name="first_name" type="text" className="form-control" placeholder=""/>
									<div ref="fname_error" className="fname-error error text-danger">{this.state.error}</div>
									<p>Last Name</p>
									<input ref="last_name" name="last_name" type="text" className="form-control" placeholder=""/>
									<div ref="lname_error" className="fname-error error text-danger">{this.state.error}</div>
									<p>Age</p>
									<input ref="age" name="age" type="number" className="form-control" placeholder=""/>
									<div ref="age_error" className="fname-error error text-danger">{this.state.error}</div>
									<p>Address</p>
									<input ref="address" name="address" type="text" className="form-control" placeholder=""/>
									<div ref="address_error" className="fname-error error text-danger">{this.state.error}</div>
									<p>Amount</p>
									<input ref="amount" name="address" type="text" className="form-control" placeholder=""/>
									<div ref="amount_error" className="fname-error error text-danger">{this.state.error}</div>
								</div>
								<div className="col-md-6">
									<p className="text-left">
										<img src="http://via.placeholder.com/150x150" onClick={this.handleUpload.bind(this)} alt=""/>
										<input style={{display: "none"}} ref={input => {this.fileInput = input}} type="file" id="image" />
									</p>
								</div>
								<br/>
								<div className="col-md-12">
									<br/>
									<button className="btn btn-default" type="submit">Create</button>
								</div>
							</form>
							<hr/>
						</div>
					</div>
				</div>
			)
		}
		else{
			return(
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div>
								<h1>Please log in</h1>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default withTracker( () => {
	Meteor.subscribe("debtors");
	return{
		currentUser: Meteor.user()
	}
})(PatientCreate);