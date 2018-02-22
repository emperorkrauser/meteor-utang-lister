import React, {Component} from "react";
import {Debtors} from "../../imports/collections/debtors";

class Modal extends Component{
	constructor(props){
		super(props);

		// console.log(props);
		this.state = {
			error: "",
			first_name: "",
			last_name:"",
			age:"",
			address:"",
			property: "",
			debt: "",
			phone:"",
			payment:"",
			first_nameError:"",
			last_nameError:"",
			age_Error:"",
			address_Error:"",
			debt_Error:"",
			phone_Error:""
		}
	}

	handleClose(e){
		const first_name = this.refs.first_name.defaultValue.trim();
		const last_name = this.refs.last_name.defaultValue.trim();
		const age = this.refs.age.defaultValue.trim();
		const address = this.refs.address.defaultValue.trim();
		const phone = this.refs.phone.defaultValue.trim();
		const debt = this.refs.debt.defaultValue.trim();
		this.setState({
			first_name: first_name,
			last_name: last_name,
			age: age,
			address: address,
			phone: phone,
			debt: debt
		})
	}

	handleChange(propertyName,e){
		// console.log(propertyName);
		const property = this.state.property;
		property[propertyName] = event.target.value;
		this.setState({
			property: property		
		});
	}

	handleSubmit(e){
		e.preventDefault();
		const first_name = this.refs.first_name.value.trim();
		const last_name = this.refs.last_name.value.trim();
		const age = this.refs.age.value.trim();
		const address = this.refs.address.value.trim();
		const id = this.props.debtor._id;
		const sharedEmails = ["krauserchristian@gmail.com", "test@example.com"];
		const currentDebt = this.refs.debt.value.trim();
		const phone = this.refs.phone.value.trim();
		const payment = this.refs.payment.value.trim();

		// console.log(payment);
		const inputs = {
			first_name,
			last_name,
			age,
			address,
			id,
			currentDebt,
			phone,
			payment
		};

		const debt = currentDebt - payment;

		const keys = Object.keys(inputs);
		
		// error handling for the fields
		for(let properties in inputs){
			if(inputs[properties] == ""){
				if(properties == "first_name"){
					this.setState({
						first_nameError: "Enter a correct first name"
					})
				}

				if(properties == "last_name"){
					this.setState({
						last_nameError: "Enter a correct last name"
					})
				}

				if(properties == "age"){
					this.setState({
						age_Error: "Enter age"
					})
				}

				if(properties == "address"){
					this.setState({
						address_Error: "Enter address"
					})
				}
			}
		}

		if(first_name && last_name && age && address){
			// same name on the collections insert
			this.setState({
				error: "",
				first_nameError: "",
				last_nameError: ""
			});

			// call the update method on the debtors collection
			Meteor.call("debtors.update", {
				id,
				first_name,
				last_name,
				age,
				address,
				modifiedAt: new Date(),
				sharedWith: sharedEmails,
				debt,
				phone,
				payment
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

				$("#exampleModal").modal("hide");
			});
		}

		this.refs.payment.value="";
	}

	render(){
		const debtor=this.props.debtor;

		return(
			<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content debtor-modal-content">
						<div className="modal-header debtor-modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
							</button>
							<h4 className="text-left">Edit Debtor</h4>
						</div>
						<div className="modal-body">
							<form action="" onSubmit={this.handleSubmit.bind(this)}>
								<div className="form-group">
									<div className="input-area">
										<label>First Name</label>
										{/*// put key on an input so that you can use the default value from the props*/} 
										<input ref="first_name" type="text" onChange={this.handleChange.bind(this, 'first_name')} className="form-control create-input" id="" 
										defaultValue={debtor.first_name}
										key={debtor.first_name ? debtor.first_name : this.state.first_name}
										/>
										<div className="text-danger">
											{this.state.first_nameError}
										</div>
									</div>
								</div>
								<div className="form-group">
									<label>Last Name</label>
									<input ref="last_name" type="text" onChange={this.handleChange.bind(this, 'last_name')} className="form-control create-input" id="" 
									defaultValue={debtor.last_name}
									key={debtor.last_name ? debtor.last_name : ""}/>
									<div className="text-danger">
										{this.state.last_nameError}
									</div>
								</div>
								<div className="form-group">
									<label>Age</label>
									<input ref="age" type="number" onChange={this.handleChange.bind(this, 'age')} className="form-control create-input" id="" 
									defaultValue={debtor.age ? debtor.age : ""}
									key={debtor.age ? debtor.age : ""}/>
									<div className="text-danger">
										{this.state.age_Error}
									</div>
								</div>
								<div className="form-group">
									<label>Address</label>
									<input ref="address" type="text" onChange={this.handleChange.bind(this, 'address')} className="form-control create-input" id="" 
									defaultValue={debtor.address ? debtor.address: ""}
									key={debtor.address ? debtor.address : ""} />
									<div className="text-danger">
										{this.state.address_Error}
									</div>
								</div>
								<div className="form-group">
									<label>Phone</label>
									<input ref="phone" type="text" onChange={this.handleChange.bind(this, 'phone')} className="form-control create-input" id="" 
									defaultValue={debtor.phone ? debtor.phone: ""}
									key={debtor.phone ? debtor.phone : ""} />
									<div className="text-danger">
										{this.state.phone_Error}
									</div>
								</div>
								<div className="form-group">
									<label>Debt</label>
									<input ref="debt" type="text" onChange={this.handleChange.bind(this, 'debt')} className="form-control create-input" id="" 
									defaultValue={debtor.debt}
									key={debtor.debt ? debtor.debt : ""} />
									<div className="text-danger">
										{this.state.debt_Error}
									</div>
								</div>
								<div className="form-group">
									<label>Payment</label>
									<input ref="payment" type="text" onChange={this.handleChange.bind(this, 'payment')} className="form-control create-input" id="" 
									defaultValue=""
									key={debtor.payment ? debtor.payment : ""} />
									<div className="text-danger">
										{this.state.debt_Error}
									</div>
								</div>

								<button type="button" className="btn btn-secondary" data-dismiss="modal"
								onClick={this.handleClose.bind(this)}>Close</button>
								<button type="submit" className="btn btn-primary">Save changes</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Modal;