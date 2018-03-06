import React, {Component} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Debtors} from "../../imports/collections/debtors";

class DebtorDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			payments: ""
		}
	}

	componentDidMount(){

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
				console.log(debtor.payment.length);
				if(debtor.payment.length == 1){
					if(debtor.payment[0].paidNow == ""){
						paidArr = "No payment yet";
					}
					return paidArr;
				}
				else{
					for(var x=1; x < debtor.payment.length; x++){
						paidArr += "<li> Amount:" + debtor.payment[x].paidNow + "- Date:"+ debtor.payment[x].paidDate + "</li>";
					}

					return paidArr;
				}
			}

			console.log(paidArr);

			document.querySelector(".payment-history").innerHTML = paidArr;

			return(
				<div>
					<ul>
						<li>Name: {debtor.first_name} {debtor.last_name}</li>
						<li>Age: {debtor.age}</li>
						<li>Address: {debtor.address}</li>
						<li>Debt: {debtor.debt}</li>
						<li>Payment History:
							<ul className="payment-history">
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