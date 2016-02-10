

UserInfo = new Mongo.Collection("userinfo");
UserInfo.attachSchema(new SimpleSchema({
  first_name: {
    type: String,
    label: "First name",
    max: 200
  },

  last_name: {
    type: String,
    label: "Last name",
    max: 200
  },

  sex: {
    type: String,
    allowedValues: ['female', 'male']
  },

  province: {
    type: String
  }

}));