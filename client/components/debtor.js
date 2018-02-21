import React, {Component} from "react";
import DebtorCreate from "./debtor_create";
import DebtorList from "./debtor_list";

class Debtor extends Component{
	render(){
		return(
			<div>
				<DebtorCreate />
			</div>
		)
	}
}

export default Debtor;