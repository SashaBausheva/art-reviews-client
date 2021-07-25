# Picture It - Full-Stack Project by Sasha Bausheva

## Links
- Link to deployed site: https://sashabausheva.github.io/picture-it-client
- Link to the API repository: https://github.com/SashaBausheva/picture-it-api
- Link to the deployed API: https://morning-reaches-38888.herokuapp.com

## Application Description
Picture It is a single-page application which allows users to search images and add them to their collection along with comments/notes. Once signed up and authenticated, users can view their collection of images and create new image entries from search results. Users can search images using queries or choose to get a random image from the database. All images come from a third-party API belonging to [Unsplash](https://unsplash.com).The backend was built using Express.js and MongoDB. The front-end was built using React.js and Axios for http requests (the requests communicate with the back end and third-party API).

## Technologies Used
- React
- JavaScript
- Axios
- HTML5
- CSS3 / SCSS
- Material UI
- API
- Git & GitHub

## Setup and Installation
1. Fork and clone this repository.
2. Install dependencies using `npm install`.
3. Git add and git commit your initial changes.
4. View changes by running local server `npm run start`.

## Planning, Process, and Problem-solving Strategy
My initial idea for this project involved a different third-party API. Users were supposed to be able to search for their favorite DeviantArt artists by their usernames and add them to a personal collection with comments and ratings, after which they would be able to view samples or these artists' works sorted by the users' preferences (rating). However, halfway into the project, I realized the API provided by DeviantArt didn't meet my needs, so I had to reconsider my options and eventually decided to create Picture It which would allow users to create collections of images taken by professional photographers instead. Once this idea was finalized, I set up an Express.js/MongoDB back-end foundation with two resources, users and images, connected to each other via a one-to-many relationship. I also ensured that each user is able to view and edit only images they own by adding an "editable" parameter to images and filtering the images on the front end based on whether editable is true or false. The front end includes respective components for the main page, header with navigation, image search, edit/create forms, and pages allowing to view collections/individual image entries.

## Unsolved Problems / Future Iterations
Though the UI is fully functional, it is currently still lacking in attractiveness. I am planning to further work on styling my components (such as, for example, implementing a React carousel) and ensuring that they are rendered smoothly. Users also can currently view only their own collections, so I'm considering implementing a feature allowing them to view other users' collections as well. Finally, I would like to implement categories/tags for images to allow for simpler navigation within collections.

## Wireframes and User Stories

#### Wireframes
- [Link to Wireframes](https://imgur.com/ZQozhjG)

#### User Stories
* As an unregistered user, I would like to sign up with my email and password.
* As a registered user, I would like to sign in with my email and password.
* As an authenticated user, I would like to be able to change password.
* As an authenticated user, I would like to be able to sign out.
* As an authenticated user, I would like to be able to search for images.
* As an authenticated user, I would like to add search results to my image collection.
* As an authenticated user, I would like to be able to edit edit/delete entries in my collection.

![Screenshot of Picture It](https://i.imgur.com/b8YycrS.png)
