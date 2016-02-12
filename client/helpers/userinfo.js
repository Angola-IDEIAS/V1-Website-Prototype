
var provinces = {
  female: ['Bengo', 'Benguela'],
  male: ['Bié']
};

Template.updateUserInfoForm.events({
  'change #selectedProvince': function() {
    Session.set('selectedProvince', $('select#selectedProvince').val());
  }
});

Template.updateUserInfoForm.helpers({
  communeOptions: function() {
    
    // do not provide options until user has selected sex
    if (!Session.get('selectedProvince')) {
      return null;
    };

    // retrieve options
    var unlabeledOptions = province_to_commune[Session.get('selectedProvince')];
    
    // format options correctly for autoform
    var labeledOptions = unlabeledOptions.map(function(p) {
      return {label: p, value: p};
    });
    return labeledOptions;
  }
})