Schema = {}

Schema.createUserFormSchema = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    email: {
        type: String,
    },
    password: {
        type: String
        // create a regex here to restrict password to a format
    },
    passwordConfirmation: {
        type: String,
        // this is a custom validation to ensure the password match
        custom: function () {
            if (this.value !== this.field('password').value) {
                return ("passwordMismatch");
            }
        }
    }
    // status: {
    //     type: String,
    //     optional: false
    // }
});

/*
 * custom errors message for autoform
 * we use it for the error 'passwordMismatch', since it is a
 * custom validation and autoform have no predefined messages for it
 */

Schema.createUserFormSchema.messages({
    "passwordMismatch": "Passwords do not match",
});