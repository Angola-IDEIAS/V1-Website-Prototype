
Template.Nav.helpers({
  registeredUser: function() {
    // update for client access
    if (Meteor.user() && Meteor.users.findOne(Meteor.user()).finished_registration == true) {
      return true;
    };
    return false;
  }
});