# simple-micro-fe-poc

## Foreword

Please don't judge this repo by the quality of actual code. It is only a proof-of-concept
for how to build SPAs in larger organizations. Most of the code comes from generated Vite
templates which use code-styles I don't tend to follow (single-quotes over double, and no
semi-colons, to name a few of my style grievances). However, the code-style isn't relevant
to this repo. This repo is meant to represent an architecture which could be compared to
module-federation or [Single-SPA](https://single-spa.js.org/). Comparisons to both can be
found at the end of this doc.

## General

This application is a quickly spun up example for how to work between multiple teams
creating microfrontends and how they can all be combined in a simple and safe fashion.

There are four different sub-repos. The `application` repo is the _only_ application.
All other `@ethan/*` repos are packages that should be deployed to a local
[Verdaccio instance](https://verdaccio.org/). If you have Verdaccio is installed and
running, each of these repos can be published with `npm i && npm run build:publish`.

The purpose of this repo is to imagine that the sub-repos are all owned by different variable
groups, and would most likely in reality be their own separate Git repositories. The
`application` repo represents the actual application that is being built up by all teams.
The `@ethan/team-one` package represents the page that a single team is working on. Similarly,
`@ethan/team-two` represents a _couple pages_ that are owned by a different team. Slightly
differently, `@ethan/header` could either be theoretically owned by a team working on custom
global components, or like the `application` repo, it could be co-authored by anyone who needs 
to modify/extend its features.

## Repo overview - application

This is the repo that represents the overall application. This would be the repo that
is actually deployed to environments. It is a repo that represents the work of the
individual teams working on specific pages or groups of pages. Generally, this repo
imports the `@ethan/header` package and then displays routes by declaring a `BrowserRouter`
from `react-router-dom`.

## Repo overview - @ethan/header

The header component is displayed on every page. It's dirt simple and exposes a dummy
"authentication" state that persists in localStorage. All pages need the header so it's
exposed via this package. Individual pages can import it and display it from their
development perspective, but it should not be exported from any other package except the
application package. Also, because the context of this repo is small and specific,
the development runtime has been changed to Storybook rather than Vite dev-server
like the rest of the repos. This package also proves the idea of cross-package reactivity
by exposing the mock "authentication" state and updating dependents in real time.

## Repo overview - @ethan/team-one

This is a mock example of a repo which a single team would be working on. The idea being
that each team is working on one or more pages. This team has a copy of `@ethan/header`
which they use at development time, but is speficially excluded at build time. The main build
output of this repo is the `TeamOneRoutes` function which returns an array of
`{ Route } from "react-router-dom"` instances. For development time, this team would apply this
function's output to their own `{ BrowserRouter } from "react-router-dom"`.  For integration
into the `application` repo, this team publishes the build to an NPM registry (or Verdaccio
in this case) and then adds `TeamOneRoutes()` onto the `AppRoutes` component in _that_ repo.

## Repo overview - @ethan/team-two

Mostly just a copy & paste of the `@ethan/team-one` repo, except team two exports two routes
from their `TeamTwoRoutes` function just to extend the proof-of-concept.

## Benefits over module-federation

When a core dependency, like `@ethan/header`, must change, there are risks.

With module-federation, the build of the component can be deployed to a static server, rather than
a package repository. All clients are automatically updated because they're importing via a URL and
not a package install. However, if this is a breaking change in any way, then there is no set path
for figuring out which dependents broke and how to repair them because the types are lost in
module-federation.

In this model, where packages are "federated" by a single application, we have a chance to see
any build time errors before they affect a runtime instance.

## Benefits over single-spa

Single SPA is built with the purpose of being framework agnostic. This means that tools like `redux`
entirely lose their purpose and general application-wide reactivity becomes much harder. To stay
outside of the bounds of framework requirements is to, somewhat, break them. For instance, Single
SPA's solution for keeping data synchronized across the different micro-frontends is to be always
listening to relevant [custom events coming from window](https://single-spa.js.org/docs/api/#custom-events).
This means that rather than passively having access to a CQRS store/library/API, every micro-frontend
must be connecting to and listening to this data separately without a reliable method for sharing this logic.