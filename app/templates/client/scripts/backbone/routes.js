/**
*   Main Router
*/
<% if (jsOption === 'requirejs') { %>
define(function(require) {
    'use strict';

    var MainView = require('./views/main');

    var MainRouter = Backbone.Router.extend({
        // Defined routes
        routes: {
            '': 'main'
        },

        main: function() {
            // Initialize the main view
            new MainView();
        }
    });

    return MainRouter;
});<% } else if (jsOption === 'browserify') { %>
'use strict';
<% if (jsFramework === 'react') { %>
var React = require('react');<% if (useJsx) { %>
var MainComponent = React.createFactory(require('./components/main.jsx'));<% } else { %>
var MainComponent = require('./components/main.js');<% } %>
<% } else if (jsFramework === 'backbone') { %>
var MainView = require('./views/main');<% } %>

var MainRouter = Backbone.Router.extend({
    // Defined routes
    routes: {
        '': 'main'
    },

    main: function() {<% if (jsFramework === 'react') { %>
        React.render(new MainComponent(), document.getElementById('app-wrapper'));<% } else if (jsFramework === 'backbone') { %>
        // Initialize the main view
        new MainView();<% } %>
    }
});

module.exports = MainRouter;
<% } %><% if (jsOption === 'none') { %>
'use strict';

var <%= _.camelize(projectName) %> = <%= _.camelize(projectName) %> || {};

(function () {

    // Main Router
    <%= _.camelize(projectName) %>.MainRouter = Backbone.Router.extend({
        // Defined routes
        routes: {
            '': 'main'
        },

        main: function() {
            // Initialize the main view
            new <%= _.camelize(projectName) %>.MainView();
        }
    });

    // Instantiate Main Router
    new <%= _.camelize(projectName) %>.MainRouter();

    // Enable pushState for compatible browsers
    var enablePushState = true;

    // Disable for older browsers (IE8, IE9 etc)
    var pushState = !!(enablePushState && window.history && window.history.pushState);

    // Start route handling
    Backbone.history.start({ pushState : pushState, root : '/' });

    // Handle pushState for incompatibl browsers
    if (!pushState && window.location.pathname !== '/') {
        window.location.replace('/#' + window.location.pathname);
    }

})();
<% } %>
