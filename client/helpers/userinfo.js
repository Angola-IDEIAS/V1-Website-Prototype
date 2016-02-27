
var provinces = {
  female: ['Bengo', 'Benguela'],
  male: ['Bié']
};

Template.updateUserInfoForm.events({
  'change #userSelectedProvince': function() {
    Session.set('userSelectedProvince', $('select#userSelectedProvince').val());
  }
});

Template.updateUserInfoForm.helpers({
  communeOptions: function() {
    
    // do not provide options until user has selected sex
    if (!Session.get('userSelectedProvince')) {
      return null;
    };

    // retrieve options
    var unlabeledOptions = province_to_commune[Session.get('userSelectedProvince')];
    
    // format options correctly for autoform
    var labeledOptions = unlabeledOptions.map(function(p) {
      return {label: p, value: p};
    });
    return labeledOptions;
  }
})