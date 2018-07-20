## My-artwork-api
is the api which provided the size, medium, description, price, etc of artist artworks.

## Getting start
1. npm install
2. start dev npx nodemon server.js 
3. visit `https://blooming-cliffs-86757.herokuapp.com/api-docs/` to see the docs in Swagger UI

## Create schema, models to store data in mongoDB
- npm install mongodb
- create a "db" directory. This is where the Mongo data files will live. 
- after installed mongodb through homebrew, simply start mongodb through `brew services start mongodb`
- then access the shell by mongo
- @ app.js, change the directory to store the data, for example: `const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost/urFolderName";`

## To put seed data into the mongoDB
- npm install --save-dev mongoose-seed
- refer to the file: seederDataArtworks.js
    - change the
    - localhost detail
    - the model files
    - the export model
    - then paste in the data 

## MongoDB test 
- npm run test:watch to start jest test.
- `npm install --save-dev mongodb-memory-server`, to use mongodb memory server for testing.
- use dummyData to test.

## Error middleware
- copy the `./middleware/error_handlers.js` into my project.
- @ app.js, import `const { handle404, handle500 } = require('./middleware/error_handlers.js')` and add `app.use(handle404, handle500)` below.

## Authentication
- npm install passport, passport-jwt, jsonwebtoken, mongoose-unique-validator
- create directory config/passport.js
- refer to the gitBook: `https://thoughtworks-jumpstart.gitbook.io/jumpstart/back-end-web-development/token-based-authentication` for step by step.
- put in the `passport.authenticate("jwt", { session: false })` as middleware for those field i want to protect. 
- @ router, to protect the whole router by doing in below, 

const unprotectedRoutes = express.Router();
const protectedRoutes = express.Router();

// EXAMPLE

unprotectedRoutes.get('/', ......)

protectedRoutes.put('/', .......)
protectedRoutes.delete('/', .......)

....

module.exports = app => {
    app.use(express.json());
    app.use("/artwork", unprotectedRoutes);
    app.use("/artwork", passport.authenticate("jwt", { session: false }), protectedRoutes);
};

## Test the authentication 
- @ router.test.js, create the dummyData for signIn & signUp
- adminBearerjwtToken = "bearer " + signInResponse.body.token;
- then insert `.set("Authorization", adminBearerjwtToken)` to the test which need the authorization.

## Swagger - documentation
- npm install --save-dev swagger-ui-express
- create the documentation in swagger editor
- after that download to json format, copy the content into a new created swaggerDocumentation.json file in VS and then import this file to app.js

## Deploy to Heroku
- setup the CirckCI and deploy in Heroku by refering to the gitbook: `https://thoughtworks-jumpstart.gitbook.io/jumpstart/devops/deployment/circleci`
- @ iterm, `heroku logs --tail` to see the progress while deploying to heroku, in order to spot the error and fix it. 
- to deploy to heroku, change PORT to `process.env.PORT || 3000` cos Heroku is using its own PORT.
- @ package.json, add "seed": "node seederDataArtworks.js" under "script".
- @ iterm, run `heroku run npm run seed` so my local data will go to heroku database.

## After deploying
- you may
    - artworks/
    - artworks?artist=<artistname>
    - artworks/id

- POST (with Authorization)

- PUT (with Authorization)

- DELETE (with Authorization)






