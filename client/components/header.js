import React, {Component} from "react";
import {Link} from "react-router-dom";
import Accounts from "./accounts";

class Header extends Component{
	render(){
		return(
			
			<ul className="nav nav-pills nav-menu">
				<li role="presentation"><Link to="/">Home</Link></li>
				<li role="presentation"><Link to="debtor">Create Debtors</Link></li>
				<li role="presentation"><Link to="debtorlist">Debtors</Link></li>
				<li><a href="#"><Accounts/></a></li>
			</ul>
					
		)
	}
}

export default Header;