// routing specifications go here
// uses iron:router

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/about', function () {
  this.render('About');
});

Router.route('/registeridea', function () {
  this.render('RegisterIdea');
});

Router.route('/createproblem', function () {
  this.render('CreateProblem');
});

Router.route('/login', function () {
  this.render('Login');
});

Router.route('/logout', function () {
  Meteor.logout();
  this.render('Home');
});

Router.route('/userinfo', function () {
  this.render('UserInfo');
});
