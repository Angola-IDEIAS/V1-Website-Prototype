

Template.Home.helpers({
  ideas: function () {
    var ideaNames = []
    var ideas = Ideas.find();
    ideas.forEach(function(idea) {
      console.log(idea);
      ideaNames.push({
        name: idea.idea_name,
        objective: idea.objective,
        industry: idea.industry,
      });
    });
    
    return ideaNames;
  }
});