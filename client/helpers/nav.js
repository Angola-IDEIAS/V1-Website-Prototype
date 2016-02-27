
Template.Nav.helpers({
  registeredUser: function() {
    
    // if user not logged in, always return false
    if (!Meteor.userId()) {
      return false;
    }

    Meteor.call('finishedRegistration', function(error, result){
      Session.set('finishedRegistration', result);
    });

    if (Session.get('finishedRegistration') == true) {
      return true
    }
    else {
      return false;
    }
  }
});
