# [Start Bootstrap - Heroic Features](https://startbootstrap.com/templates/heroic-features/)

[Heroic Features](https://startbootstrap.com/templates/heroic-features/) is a multipurpose HTML template for [Bootstrap](https://getbootstrap.com/) created by [Start Bootstrap](https://startbootstrap.com/).

## Preview

[![Heroic Features Preview](https://startbootstrap.com/assets/img/screenshots/templates/heroic-features.png)](https://startbootstrap.github.io/startbootstrap-heroic-features/)

**[View Live Preview](https://startbootstrap.github.io/startbootstrap-heroic-features/)**

## Status

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/StartBootstrap/startbootstrap-heroic-features/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/startbootstrap-heroic-features.svg)](https://www.npmjs.com/package/startbootstrap-heroic-features)
[![Build Status](https://travis-ci.org/StartBootstrap/startbootstrap-heroic-features.svg?branch=master)](https://travis-ci.org/StartBootstrap/startbootstrap-heroic-features)
[![dependencies Status](https://david-dm.org/StartBootstrap/startbootstrap-heroic-features/status.svg)](https://david-dm.org/StartBootstrap/startbootstrap-heroic-features)
[![devDependencies Status](https://david-dm.org/StartBootstrap/startbootstrap-heroic-features/dev-status.svg)](https://david-dm.org/StartBootstrap/startbootstrap-heroic-features?type=dev)

## Download and Installation

To begin using this template, choose one of the following options to get started:

* [Download the latest release on Start Bootstrap](https://startbootstrap.com/templates/heroic-features/)
* Install via npm: `npm i startbootstrap-heroic-features`
* Clone the repo: `git clone https://github.com/StartBootstrap/startbootstrap-heroic-features.git`
* [Fork, Clone, or Download on GitHub](https://github.com/StartBootstrap/startbootstrap-heroic-features)

## Usage

### Basic Usage

After downloading, simply edit the HTML and CSS files included with the template in your favorite text editor to make changes. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

After installation, run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `gulpfile.js` to see which tasks are included with the dev environment.

You must have npm and Gulp installed globally on your machine in order to use these features.

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/StartBootstrap/startbootstrap-heroic-features/issues) here on GitHub or leave a comment on the [template overview page at Start Bootstrap](https://startbootstrap.com/templates/heroic-features/).

## About

Start Bootstrap is an open source library of free Bootstrap templates and themes. All of the free templates and themes on Start Bootstrap are released under the MIT license, which means you can use them for any purpose, even for commercial projects.

* <https://startbootstrap.com>
* <https://twitter.com/SBootstrap>

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**.

* <http://davidmiller.io>
* <https://twitter.com/davidmillerskt>
* <https://github.com/davidtmiller>

Start Bootstrap is based on the [Bootstrap](https://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2020 Start Bootstrap LLC. Code released under the [MIT](https://github.com/StartBootstrap/startbootstrap-heroic-features/blob/gh-pages/LICENSE) license.



#Need to include link to back end website.

# ScriptBase
---
ScriptBase is a react application that assists users in navigating certain aspects of the health insurance landscape. You'll find resources that do the following: 

1. Explanation of terminology commonly found in insurance policies
2. Prescription drug library that also includes generic options (if they exists) as well as alternative treatment options (if they exists)
3. Health Insurance News
4. Covid19 Global & Country specific data 
5. External resources that will take you to:
  1. Covid19 Data Tracker
  2. Healthcare blog run by a close friend
  3. Healthcare blog meant to bring humor into the equation, because healthcare is laughably confusing


## To Start
---
Please follow the steps below to ensure the API's are on the proper ports. 


First, start the rails API:
(Link to Backend Repo: https://github.com/steveneross94/ScriptBaseBackend)
1. `cd ScriptBaseBackend`
2. `bundle`
3. `rails db:migrate`
4. `rails db:seed`
5. `rails s`

Next, follow these steps before running npm start
1. `cd ScriptBase/script-base` 
2. `json-server -w db.json -p 3002`
  - The Covid Data was pulling from an API originally, but the source proved to be finicky and in order to circument that issue,I elected to spin up a db.json to prevent SSL errors or server timeouts. 
3. `npm start`
  - you will be asked if you want to start on a different port, select yes

### External Resources for Access
---
You'll need to sign up for news api key (https://newsapi.org/). You will also have to run a gem install for figaro (https://github.com/laserlemon/figaro) and follow the steps to place the API key in the proper .env file