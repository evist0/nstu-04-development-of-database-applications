import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456As';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(ADMIN_USERNAME)) {
    Accounts.createUser({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }
});
