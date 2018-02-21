import {Mongo} from "meteor/mongo";

Meteor.methods({
	'debtors.insert': function(debtors){
		Debtors.insert({
			first_name: debtors.first_name,
			last_name: debtors.last_name,
			age: debtors.age,
			address: debtors.address,
			profile_pic: debtors.profile_pic,
			phone: debtors.phone,
			createdAt: debtors.date,
			sharedWith: [],
			owner: debtors.owner,
			username: debtors.username,
			debt: debtors.debt,
			payment:debtors.payment,
			paid: debtors.status
		});
	},
	'debtors.remove': function(id){
		Debtors.remove(id);
	},
	'debtors.update': function(debtors){
		Debtors.update({_id: debtors.id}, {$set:
			{
				first_name: debtors.first_name,
				last_name: debtors.last_name,
				age: debtors.age,
				address: debtors.address,
				phone: debtors.phone,
				modifiedAt: debtors.modifiedAt,
				sharedWith: debtors.sharedWith,
				debt: debtors.debt,
				payment:debtors.payment,
				paid: debtors.status
			}
		});
	}
});

export const Debtors = new Mongo.Collection("debtors");