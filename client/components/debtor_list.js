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
		// console.log(list);
		// console.log(this.props.params.id);
		const debtors = this.props.debtors.map( (obj) => {
			return(
				<li className="inner-list" key={obj._id}>
					<ul className="list-group">
						<li className="list-group-item">{obj.first_name}</li>
						<li className="list-group-item">{obj.last_name}</li>
						<li className="list-group-item">{obj.age}</li>
						<li className="list-group-item">{obj.address}</li>
						<li className="list-group-item">{obj.debt}</li>
						<li className="list-group-item"><Link to={{pathname: `/debtor/${obj._id}`}}>more</Link></li>
					</ul>
					<button onClick={ (e) => {
						// pass the event and id as parameters for the deletePatient method
						this.deleteDebtor(e, obj._id)
					}} className="btn btn-danger">Delete</button>
					<button id="edit" data-toggle="modal" data-target="#exampleModal" onClick={ (e) => {
						this.editDebtor(e, obj)
					}} className="btn btn-primary">Edit</button>
				</li>
			)
		});

		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div>Debtors</div>
						<ul className="patient-list">
							{debtors}
						</ul>
						<Modal debtor={list} />
					</div>
				</div>
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