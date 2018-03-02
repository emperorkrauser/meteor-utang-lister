import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Debtors} from "../../imports/collections/debtors";

class DebtorDetail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props.debtors);
		if(!this.props.debtors){
			return(
				<div>Loading...</div>
			)
		}
		else{
			const debtor = this.props.debtors;

			let paidArr="";
			const paidHistory = function(){
				for(var x=0; x < debtor.payment.length; x++){
					paidArr += "<li>" + debtor.payment[x].paidNow + "-" + debtor.payment[x].paidDate + "</li>";
				}

				return paidArr;
			}
			paidHistory();

			console.log(paidArr);

			return(
				<div>
					<ul>
						<li>Name: {debtor.first_name} {debtor.last_name}</li>
						<li>Age: {debtor.age}</li>
						<li>Address: {debtor.address}</li>
						<li>Debt: {debtor.debt}</li>
						<li>Payment History:
							<ul className="payment-history">
								{paidArr}
							</ul>
						</li>
					</ul>
				</div>
			)
		}

		return(
			<div>
				<h4>Debtor Detail</h4>
				<ul>
					{profile}
				</ul>
			</div>
		)
	}
}

export default withTracker( (props) => {
	const {debtorid} = props.match.params;
	Meteor.subscribe('debtors');

	return {
		debtors: Debtors.findOne(debtorid),
	};

})(DebtorDetail);