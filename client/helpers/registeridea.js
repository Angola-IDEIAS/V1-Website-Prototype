
Template.registerIdeaForm.helpers({
    is_business_project: function() {
        var objective = AutoForm.getFieldValue("objective", "registerIdeaForm");
        if (objective == "Projeto de negócio") {
            return true;
        };
        return false;
    }
});