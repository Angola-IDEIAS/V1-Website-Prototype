

Template.Home.helpers({
  ideas: function () {
    var ideas = Ideas.find({}, {sort: {createdAt: -1}}).fetch();
    var ideaNames = []

    for (idea in ideas) {
      console.log(idea);
      ideaNames.push({
        name: idea.idea_name
      });
    };
    console.log(ideaNames);
    return ideaNames;
  }
});