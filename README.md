# Jargonauts 
A semi-satirical guide through the seas of business jargon, formerly used ejs and hosted on Heroku. 


Current deployment:
- Front end/live page on Netlify (linked below).
- API on Render.
Branches `frontOnly` and `apiRender`.

Older notes below. The migration above showed me how inaccessible (although well-labeled!) my code used to be.
Since this is no longer on heroku, it may be possible to have a better cors config.

## [Live](https://jargonauts.netlify.app/) 

![guide intro screen](https://i.postimg.cc/d0Yk0mS4/jargon-anim.gif)
![guide demo screen](https://i.postimg.cc/wBmVCVR2/jargon-desktop-2.jpg)

## How it's made
**Tech used:** Front end: HTML, CSS, JavaScript; back end: Node.js and Express framework, MongoDB as database. Some EJS for limited server-side rendering.
Began with just the API built using Node.js and Express during development, with automatic deployment to Heroku from GitHub. I used Postman to test the API at different points. 

Front end was rebuilt separately on top of an older version of this project.
The current version uses MongoDB and allows submissions from users with the passcode (on request) through the app.
Partial server-side rendering is enabled with EJS for "Tip of the Day" (top of web app).
The latter part of the app (phrase recommendation, dictionary) is set up to reduce calls to the server. 

User contributions are locked with a passcode that is validated server side.

## Optimizations
- Create a successful submission indicator (for new document/resource contribution).
- Refactor so that dotenv can safely be listed solely as a devdependency without confusing Heroku into throwing another error. Initial code in server.js aimed to do this but error continued to come up until dotenv was changed into a general dependency.
- (Firefox browser)  "NetworkError when attempting to fetch resource." This doesn't seem to stop things from working in localhost but may want to debug.

## Lessons learned (many)
- Install the CORS module to ensure API is accessible
- Heroku uses its own port - update any hardcoded port to include environment variable conditionally. And check for simple mistakes when referencing process.env object.
- Rewriting front-end code for server-side rendering using a template engine - not fully transitioned there but also questioning whether some client-side rendering might not perform better.
- Modularizing the css to components helped immensely when expanding input options /refactoring to use MongoDB
- VS Code editor seems to auto-generate necessary lines of code when you add certain parameters? (such as for dotenv.config())
- Gatekeeping user contributions appear to need setup on server side.
- Excluding certain fields from submission into the object, since different "resource types" for the API have different relevant keys. 
  - I ended up removing the name attribute from the irrelevant fields after trying to handle with other properties (CSS - display:none). It seems to be better to put the conditional in client-side code (make the req body smaller for send, versus sending to server to decide which parts to insert).
  - Writing in a line of code to also clear previous fields of any values if the user selected a different resource type for their new submission after typing into a field.
- Interesting to note that clicking through links from the ejs file pre-compiling fails, but express knows to serve them from public file when you start the app.
- Client-side JS is a bit spaghetti-like and could use a more OOP-aligned rewrite to reduce scope pollution.

### Troubleshot
- "SyntaxError: JSON.parse: unexpected character at line 1 column 1" - this relates to not returning a valid json object to be parsed from server side to client
- Procfile failures: Although it appears procfile may not be necessary (soon?), one possible error stems from the procfile format. By default (created from CLI) it is utf 16 but needs to be utf 8. Solution: Fix in Notepad or similar app, and remove previous file extension.
- The dreaded H10 error resolved with the following remedies:
  - "MongoDB connection string not found"-type error: Set an additional variable on Heroku and add conditional in server-side code so that dotenv doesn't look for an .env file that isn't there on deployment, and uses the env variables on Heroku.
  - Deploying with heroku CLI worked, while something went wrong with autodeploy from connected GitHub repo. I will need to check what happened with the autodeployment setup.

### Considerations
  - pros/cons of automatic deployment to Heroku (see above)
  - main: index.js v server.js - does the naming convention have any current significance?
  - general note deploying to Heroku (free tier): white listing all IP addresses obviously isn't the best practice but it's what is required currently. Security is based on MongoDB Atlas authentication measures.
