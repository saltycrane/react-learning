# Comments w/ Redux, Router, Bootstrap, DevTools, Parse API

 - Add Redux to the React Comments tutorial. (Add stuff from 3.2 into 2.1)
 - Integrate with Parse API instead of using local Node API server
 - Add SCSS, dev/prod config, and Redux DevTools from 9.1.
 - Add Bootstrap
 - Add React Router, detail view, delete, edit functionality
 - Add geolocation data and map
 - Add image upload

### Demo

http://saltycrane.github.io/react-learning/9.2-my-comments

### Usage (dev)

    $ npm install
    $ npm start
    $ # go to http://localhost:3000/

### Usage (prod)

    $ npm install
    $ npm run build
    $ # serve the contents of the dist directory

### Links

 - https://facebook.github.io/react/docs/tutorial.html
 - https://github.com/rackt/redux/blob/master/docs/advanced/README.md
 - https://parse.com/
 - Production webpack config: http://survivejs.com/webpack_react/building_kanban/
 - Redux DevTools: https://github.com/gaearon/redux-devtools

### To Do

 - add filtering, tags
 - animation for add and delete
 - add backend rendering support for each route
 - fix warning about setState on CommentForm
   (this is due to geo callback running after navigating away from the view)
   put the geolocation in Redux instead of the component state
 - rethink data model
 - allow adding images from initial "Add a comment" form (currently need to edit existing comment)
 - edit from list view goes to detail view in edit mode (need combine routing and redux state)
   (redux-simple-router)
 - authentication (https)
