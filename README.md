## EXPRESS
* change const to let if neccessary *

## JEST TEST EXPRESS
- npm run test:watch to start jest test.
- await & async.
- look at `https://jestjs.io/docs/en/expect` to find more function to expect.
- use 'send' when do the when need to put in some data, for example, POST and PUT.

## MIDDLEWARE
- put in the error message
- next and error

## START MONGO DB IN ITERM IN A NEW TAB
If you have installed mongodb through homebrew then you can simply start mongodb through
- brew services start mongodb

Then access the shell by
- mongo

-------- extra info ---------
You can shut down your db by
- brew services stop mongodb

You can restart your db by
- brew services restart mongodb

For more options
- brew info mongodb

-------- extra info ---------

## CREATE SCHEMA, MODELS TO STORE DATA IN MONGO DB
- const and require mongoose
- mongoose connect with my local mongod folder. check out this: http://mongoosejs.com/docs/index.html . Add those in my app.js. 
- change the directory which i wanna store my data, for example: `const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost/artworks";` in app.js ONLY
- change the post in my artworks router in order to add data thru Insomnia.
- reload the data after POST the data in insomnia 1 by 1.

## MONGO DB TEST 
- now change the test cos no longer use the seedData.json. const Fake data to store inside the mongodb memory server. 
- in order to use mongodb memory server. i need to `npm install --save-dev mongodb-memory-server`.
- remove require seedData.js to make sure it is not reading it.
- start changing from test then adjust router to fix error 1 by 1.
- add in `{ useNewUrlParser: true }` and `localhost:27017` in the app.js.

- remember to put the req.body in the PUT (routers)
- remember to put in the status if you wanna test the status.
    http error
 - POST ==> 201
 - PUT ==> 204
 - DELETE ==> 204

 ## TO PUT SEED DATA INTO THE MONGO db
 - refer to the file: seederDataArtworks.js
 - change the
    - localhost detail
    - the model files
    - the export "XXX" in the model file
    - the copy in the data 
- can refer to the gitBook: `https://github.com/seanemmer/mongoose-seed`

## IS TIME FOR AUTHENTICATION
- refer to the gitBook: `https://thoughtworks-jumpstart.gitbook.io/jumpstart/back-end-web-development/token-based-authentication` for step by step.
- put in the ` ` as middleware for those field i want to protect. 

## ERROR MIDDLEWARE

## TEST THE AUTHENTICATION

## IF NEED TO ADD IN OTHER ROUTER

## SWAGGER - DOCUMATATION





