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
		console.log("clicked");
	}

	handleSubmit(e){
		e.preventDefault();
		const first_name = this.refs.first_name.value.trim();
		const last_name = this.refs.last_name.value.trim();
		const age = this.refs.age.value.trim();
		const address = this.refs.address.value.trim();
		const phone = this.refs.phone.value.trim();
		const debt = this.refs.amount.value.trim();
		const profile_pic = this.fileInput.files[0];
		console.log(this.fileInput.files[0]);
		const date = new Date();

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
				debt,
				phone
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
				this.refs.phone.value = "";
			});
		}
	}

	render(){
		// console.log(this.props.currentUser);
		if(this.props.currentUser){
			return(
				<div>	
					<h1>Add a Debtor</h1>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className="col-md-6 nopadding">
							<div className="input-area">
								<p>First Name</p>
								<input ref="first_name" name="first_name" type="text" className="form-control create-input" placeholder=""/>
								<div ref="fname_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<div className="input-area">
								<p>Last Name</p>
								<input ref="last_name" name="last_name" type="text" className="form-control create-input" placeholder=""/>
								<div ref="lname_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<div className="input-area">
								<p>Age</p>
								<input ref="age" name="age" type="number" className="form-control create-input" placeholder=""/>
								<div ref="age_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<div className="input-area">
								<p>Address</p>
								<input ref="address" name="address" type="text" className="form-control create-input" placeholder=""/>
								<div ref="address_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<div className="input-area">
								<p>Phone</p>
								<input ref="phone" name="address" type="text" className="form-control create-input" placeholder=""/>
								<div ref="phone_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<div className="input-area">
								<p>Amount</p>
								<input ref="amount" name="address" type="text" className="form-control create-input" placeholder=""/>
								<div ref="amount_error" className="fname-error error text-danger">{this.state.error}</div>
							</div>
							<br/>
							<button className="btn btn-default create-button" type="submit">Create</button>
						</div>
						<div className="col-md-6">
								<div className="profile-pic-container">
									<img src="http://via.placeholder.com/150x150"alt=""/>
									<div className="profile-upload-button">
										<div className="text-center"><i className="fas fa-camera fa-3x"></i></div>
									</div>
								</div>
								<input style={{display: "none"}} ref={input => {this.fileInput = input}} type="file" id="image" />
						</div>
						<br/>
					</form>
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