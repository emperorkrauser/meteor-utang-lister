import React, {Component} from "react";

class DebtorDetail extends Component{
	constructor(props){
		super(props);
	}

	render(){
		console.log(this.props.match.params.id);
		return(
			<div>Debtor Detail</div>
		)
	}
}

export default DebtorDetail;