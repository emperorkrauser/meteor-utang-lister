import React, {Component} from "react";
import Home from "../../client/components/home";
import Header from "../../client/components/header";

class App extends Component{

	render(){
		return(
			<div>
				<header>
					<div className="container">
						<div className="row">
							<Header />
						</div>
					</div>
				</header>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{this.props.children}
						</div>			
					</div>
				</div>
				
			</div>
		)
	}
}

export default App;