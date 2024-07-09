# Jargonauts guide
A simple front end for a guide to jargon using the jargonauts API. 

**Demo:** https://h-yung.github.io/jargonauts-guide/

![guide intro screen](https://i.postimg.cc/d0Yk0mS4/jargon-anim.gif)
![guide demo screen](https://i.postimg.cc/wBmVCVR2/jargon-desktop-2.jpg)

## How it's made

**Tech used:** HTML, CSS, JavaScript. 

A lightweight responsive front end for the jargonauts API. 

## Optimizations
- Add typeahead functionality (although the current suggestion approach may also be worth keeping)
- Clean up CSS and reduce general specificity (limit use of ids, etc.)
- Relaunch as a single full-stack app
- Connect to MongoDB and build out more robust functionality allowing for direct user suggestions?

Lessons learned
- Building on top of my own, older code does not always save time. Rebuilding might have been faster in some cases than refactoring older CSS and HTML.
- Plan out a more modularized approach to building different parts of the app - so that it's easier to see repetition/consistent styling patterns vs. isolate unique areas.
- Not yet following OOP principles in the client-side JS. I anticipate building typeahead functionality following more OOP best practices.

## Related projects

**Jargonauts API:** https://github.com/h-yung/jargonauts-api/
