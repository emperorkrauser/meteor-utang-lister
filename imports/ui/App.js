import React, {Component} from "react";
import Home from "../../client/components/home";
import Header from "../../client/components/header";

class App extends Component{

	render(){
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Header />
							{this.props.children}
						</div>					
					</div>
				</div>
				
			</div>
		)
	}
}

export default App;