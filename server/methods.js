
Meteor.methods({
    updateUserInfo: function(doc) {
        console.log('in meteor updateUserInfo method');
        console.log(doc);

        Meteor.users.update(this.userId, {
          $set: {
            first_name: doc.first_name,
            last_name: doc.last_name
          }
        });
        console.log(Meteor.users.findOne(this.userId));
    }
})