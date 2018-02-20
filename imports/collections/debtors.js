import {Mongo} from "meteor/mongo";

Meteor.methods({
	'debtors.insert': function(debtors){
		Debtors.insert({
			first_name: debtors.first_name,
			last_name: debtors.last_name,
			age: debtors.age,
			address: debtors.address,
			profile_pic: debtors.profile_pic,
			createdAt: debtors.date,
			sharedWith: [],
			owner: debtors.owner,
			username: debtors.username,
			debt: debtors.debt
		});
	},
	'debtors.remove': function(id){
		// console.log(id);
		Debtors.remove(id);
	},
	'debtors.update': function(debtors){
		Debtors.update({_id: debtors.id}, {$set:
			{
				first_name: debtors.first_name,
				last_name: debtors.last_name,
				age: debtors.age,
				address: debtors.address,
				modifiedAt: debtors.modifiedAt,
				sharedWith: debtors.sharedWith,
				debt: debtors.debt
			}
		});
	}
});

export const Debtors = new Mongo.Collection("debtors");