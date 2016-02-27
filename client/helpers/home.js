

Template.Home.helpers({
  ideas: function () {
    var ideas = []
    Ideas.find().forEach(function(idea) {
      console.log(idea);
      ideas.push({
        name: idea.idea_name,
        objective: idea.objective,
        industry: idea.industry,
      });
    });
    
    return ideas;
  },

  problems: function () {
    var problems = []
    Problems.find().forEach(function(problem) {
      console.log(problem);
      problems.push({
        problem_name: problem.problem_name,
        impact_area: problem.impact_area,
        location: problem.problem_location
      });
    });
    
    return problems;
  },
});

