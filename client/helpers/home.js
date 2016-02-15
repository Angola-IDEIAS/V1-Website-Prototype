

Template.Home.helpers({
  ideas: function () {
    var ideas = Ideas.find({}, {sort: {createdAt: -1}}).fetch();
    var ideasNames = []

    for (idea in ideas) {
      console.log(idea);
      ideasNames.push({
        name: idea.idea_name
      });
    }
    return ideasNames;
  }
});