
Meteor.methods({
  updateUserInfo: function(doc) {
    console.log('in meteor updateUserInfo method');
    console.log(doc);

    Meteor.users.update(this.userId, {
      $set: {
        first_name: doc.first_name,
        last_name: doc.last_name,
        sex: doc.sex,
        dob: doc.dob,
        ethnic_group: doc.ethnic_group,
        province: doc.province,
        commune: doc.commune,
        current_occupation: doc.current_occupation,
        finished_registration: true
      }
    });
  },

  finishedRegistration: function() {
    return Meteor.users.findOne(Meteor.userId()).finished_registration;
  }

});


Accounts.onCreateUser(function(options, user) {
  user.finished_registration = false;
  return user;
});