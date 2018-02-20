import React, {Component} from "react";
import {Link} from "react-router-dom";
import Accounts from "./accounts";

class Header extends Component{
	render(){
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<ul className="nav nav-pills">
							<li role="presentation"><Link to="/">Home</Link></li>
							<li role="presentation"><Link to="debtor">Debtors</Link></li>
							<li><a href="#"><Accounts/></a></li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Header;