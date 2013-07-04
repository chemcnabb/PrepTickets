#= require BWL
#= require angular
#= require ui-bootstrap

#= require_self

@prepTickets = angular.module('prepTickets', [])

@prepTickets.config ["$routeProvider", ($routeProvider) ->
  $routeProvider.when "/",
      templateUrl: "templates/home/home.html"
  .when "/admin",
      templateUrl: "templates/admin/landing.html"
  .otherwise redirectTo: "/"
]