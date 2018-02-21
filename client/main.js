import React from "react";
import ReactDOM from "react-dom";
import App from "../imports/ui/App";
import NotFound from "../imports/ui/NotFound";
import {BrowserRouter as Router, Route, Switch, IndexRoute} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import Home from "./components/home";
import Debtor from "./components/debtor";
import DebtorList from "./components/debtor_list";
import DebtorDetail from "./components/debtor_detail";
import Header from "./components/header";
const browserHistory = createBrowserHistory();

Meteor.startup( () => {

	ReactDOM.render(
		<Router>
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/debtorlist" render={(props) => <DebtorList {...props} />} />
					<Route path="/debtor/:id" render={ (props) => <DebtorDetail {...props} />} />
					<Route path="/debtor" render={(props) => <Debtor {...props} />} />
					<Route component={NotFound}/>
				</Switch>
			</App>
		</Router>
		,document.getElementById("render"));
});