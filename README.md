# jargonauts
A semi-satirical guide-as-API through the seas of business jargon, hosted on Heroku. Node.js + Express. Back end only.

**Live:** https://jargonauts-api.herokuapp.com/api/jargon

## How it's made

**Tech used:** JavaScript - Node.js and Express framework. 

No-frills use of Node.js and Express during development. Automatic deployment to Heroku from GitHub. I used Postman to test the API at different points. 

## Optimizations
- Expand usage of query parameters and update documentation accordingly.
- Connect to MongoDB and enable semi-restricted option for users to suggest new entries.
- Build a simple front-end page (in progress).
- Build out documentation page with examples and use cases.

Lessons learned
- Install the CORS module to ensure accessibility
- Heroku uses its own port - update any hardcoded port to include environment variable conditionally
- Check for minor errors with big impact, especially inconsistencies ('res' or 'response')
- Considerations: Pros/cons of automatic deployment to Heroku

Related projects
Coming soon: Jargonauts web guide.
