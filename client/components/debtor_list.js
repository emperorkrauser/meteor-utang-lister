import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Debtors} from "../../imports/collections/debtors";
import DebtorDetail from "./debtor_detail";
import Modal from "./debtor_modal";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

class DebtorList extends Component{
	constructor(){
		super();

		this.state={
			showModal: false,
			list:{}
		}
	}

	editDebtor(e, id){
		e.preventDefault();
		this.setState({
			showModal: true,
			list: id
		});
		// Meteor.call("patients.update", id);
	}

	deleteDebtor(e, id){
		// call the meteor method patients.remove and pass the id as parameter
		e.preventDefault();
		console.log(id);
		Meteor.call("debtors.remove", id);
	}

	render(){
		const list = this.state.list;
		let paymentsArr = [];
		const debtors = this.props.debtors.map( (obj) => {
			let paidNow;

			// this is to view the paid now properties of each debtor
			for(key in obj.payment){
				if(obj.payment.hasOwnProperty(key)){
					paidNow = obj.payment[key].paidNow;
					paymentsArr.push(paidNow);
				}
			}

			return(
				<li className="inner-list" key={obj._id}>
					<ul className="list-group">
						<li className=""><img src="http://via.placeholder.com/150x150" alt=""/></li>
						<li className="">Name: {obj.first_name} {obj.last_name}</li>
						<li className="">Age: {obj.age}</li>
						<li className="">Address: {obj.address}</li>
						<li className="">Debt: {obj.debt}</li>
						<li className=""><Link to={{pathname: `/debtor/${obj._id}`}}>more</Link></li>
					</ul>
					<button onClick={ (e) => {
						// pass the event and id as parameters for the deletePatient method
						this.deleteDebtor(e, obj._id)
					}} className="btn btn-danger">Delete</button>
					<button id="edit" data-toggle="modal" data-target="#exampleModal" onClick={ (e) => {
						this.editDebtor(e, obj)
					}} className="btn btn-default">Edit</button>
				</li>
			)
		});

		return(
			<div>
				<div>
					<h1>Debtors</h1>
				</div>
				<ul className="debtor-list">
					{debtors}
				</ul>
				<Modal debtor={list} />
			</div>	
		)
	}

}

export default withTracker( () => {
	Meteor.subscribe("debtors");
	return {
		debtors: Debtors.find({}).fetch(),
	};
})(DebtorList);