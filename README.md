# Jargonauts

A rudimentary business jargon API and side project of graphics/visual design.
HTML, CSS, baseline JavaScript was written a long time ago. 

Rewrote the API to be serverless (and keep the API Key secure) as over the years, Heroku and then Render became unreliable free hosting. 

Uses the Mongo Data API.

### [Visit here](https://jargonauts.netlify.app)
![image](https://github.com/h-yung/jargonauts/assets/102257735/c2c3ce16-0cbc-4982-aa3c-0d49bce1fc70)


This project predated my use of TypeScript and the data structures are poorly defined (and poorly designed), but simple to figure out.
Essentially, pre-React days, I wanted to cache a dictionary and allow retrieval of some tonal-based queries. 

## How to run 
From root directory,

- npm install
- Create a local env document (make sure in .gitignore) with the variables MONGO_APIKEY, DB_URL, DATASOURCE for your Mongo database collection.

To deploy, 
- Create a Netlify account if you don't have one and allow sign-on from your integrated terminal.
- Connect this to a website/project. (You will also be prompted the first time deployiing.)
- Add the environment variables to the linked site.
- npx ntl deploy --prod

## Optimizations
Fix the add/update/delete functions.

### Reference
- https://www.mongodb.com/docs/atlas/app-services/data-api/generated-endpoints/

## Marketing materials

![03_banners_bizletterApp](https://github.com/h-yung/jargonauts/assets/102257735/b25aa79f-3363-4da9-81ac-7768042db8be)



