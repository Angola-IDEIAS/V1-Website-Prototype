
Template.RegisterIdea.helpers({
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


Template.RegisterIdea.events({
    'click #finish-user-registration-btn': function() {
        window.location.href = '/userinfo';
    },

    'click #go-to-login-btn': function() {
        window.location.href = '/login';
    }
});

Template.registerIdeaForm.helpers({
    is_business_project: function() {
        var objective = AutoForm.getFieldValue("objective", "registerIdeaForm");
        if (objective == "Projeto de negócio") {
            return true;
        };
        return false;
    }
});