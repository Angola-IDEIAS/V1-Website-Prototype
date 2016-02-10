
var provinces = {
  female: ['Bengo', 'Benguela'],
  male: ['Bié']
};

Template.updateUserInfoForm.events({
  'change #selectedSex': function() {
    Session.set('selectedSex', $('select#selectedSex').val());
  }
});

Template.updateUserInfoForm.helpers({
  provinceOptions: function() {
    
    // do not provide options until user has selected sex
    if (!Session.get('selectedSex')) {
      return null;
    };

    // retrieve options
    var unlabeledOptions = provinces[Session.get('selectedSex')];
    
    // format options correctly for autoform
    var labeledOptions = unlabeledOptions.map(function(p) {
      return {label: p, value: p};
    });
    return labeledOptions;
  }
})