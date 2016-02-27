

Template.createProblemForm.events({
  'change #problemSelectedProvince': function() {
    Session.set('problemSelectedProvince', $('select#problemSelectedProvince').val());
  }
});

Template.createProblemForm.helpers({
  communeOptions: function() {
    
    // do not provide options until user has selected sex
    if (!Session.get('problemSelectedProvince')) {
      return null;
    };

    // retrieve options
    var unlabeledOptions = province_to_commune[Session.get('problemSelectedProvince')];
    
    // format options correctly for autoform
    var labeledOptions = unlabeledOptions.map(function(p) {
      return {label: p, value: p};
    });
    return labeledOptions;
  }
})