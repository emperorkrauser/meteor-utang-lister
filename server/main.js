// need to import meteor and collections for a server
import {Meteor} from "meteor/meteor";
import _ from "lodash";
import {image, helpers} from "faker";
import {Debtors} from "../imports/collections/debtors";

Meteor.startup( () => {

	// for patients
	Meteor.publish('debtors', function(){
		return Debtors.find({owner: this.userId});
	});


});