/**
 * Module for handling <%= name %> requests.
 * Initializing the [<%= modelName %>Controller]{@link <%= name %>:controller~<%= modelName %>Controller}
 * and configuring the express router to handle the <%= name %> api
 * for /api/<%= name %>s routes. All Routes are registered after the
 * [request parameters]{@link <%= name %>:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the <%= name %> api routes
 * @module {express.Router} <%= name %>
 * @requires {@link module:middleware}
 * @requires {@link <%= name %>:controller~<%= modelName %>Controller}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var <%= modelName %>Controller = require('./<%= name %>.controller');<% if (features.auth) { %>
var auth = require('../../lib/auth/auth.service');
var contextService = require('../../lib/service/context.service');
<% } %>
// Export the configured express router for the <%= name %> api routes
module.exports = router;

/**
 * The <%= name %> api parameters to attach
 * @type {<%= name %>:parameters}
 */
var register<%= modelName %>Parameters = require('./<%= name %>.params');

/**
 * The api controller
 * @type {<%= name %>:controller~<%= modelName %>Controller}
 */
var controller = new <%= modelName %>Controller();

// register <%= name %> route parameters
register<%= modelName %>Parameters(router);<% if (secure) { %>

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the <%= role %> role
var isAuthenticated = auth.hasRole('<%= role %>');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);<% } %>

// register <%= name %> routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/:id')
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
