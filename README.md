# Full Stack React Demo

## Server

The server uses Express, Mongo and Mongoose. 
In order to run, a local instance of MongoDB must be running.

Starts with:

```
npm run start
```

### Routes

- /signup
  - Sign up to the system (username, password)
- /login
  - Logs in an existing user with a password
- **/me**
  - Get the currently logged in user information
- **/me/update-password**
  - Update the current user's password
- /user/:id/
  - List username & number of likes of a user
- **/user/:id/like**
  - Like a user
- **/user/:id/unlike**
  - Unlike a user
- /most-liked
  - List users in a most liked to least liked

## Client

The client uses Create-React-App with Redux

Starts with:

```
npm run start
```
