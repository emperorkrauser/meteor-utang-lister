import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Template} from "meteor/templating";
import {Blaze} from "meteor/blaze";

class Accounts extends Component{
	componentDidMount(){
		// render blaze accounts form
		this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
	}

	componentWillUnmount(){
		// find the forms created then destroy
		Blaze.remove(this.view);
	}

	render(){
		return(
			<div ref="container"></div>
		)
	}
}

export default Accounts;