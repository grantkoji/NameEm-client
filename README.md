



#Need to include link to back end website.

# Name'Em
---
Name'Em is a react application that plays Sporcle like games.
assists users in navigating certain aspects of the health insurance landscape. You'll find resources that do the following: 

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