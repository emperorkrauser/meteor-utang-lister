import {Mongo} from "meteor/mongo";

const imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
 stores: [imageStore]
});

console.log(Images);