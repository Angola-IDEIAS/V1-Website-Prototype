Meteor.methods({
  'createUserAutoform' : function(doc) {
    console.log('in method');
    check(doc, Schema.createUserFormSchema);
    // `doc` will contains the field who are in the `Schema.createUserFormSchema`
    var newUser = Accounts.createUser(/* standard args */);
    console.log('created new method');
    Meteor.users.update(newUser, /* set the extra information, like status */);
  }
});