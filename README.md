



#Need to include link to back end website.

# Name'Em
---
Name'Em is a react application that plays Sporcle like triva-based games.
Games include:
1. Pick a Major League Baseball Team and a Year from 2010-2019. Name as many baseball players as you can on the active roster for that year.
2. Pick a Year from 2010-2019. Name as many Billboard Top 20 Artists from that year, matching the Artist to their Song's title.
3. Enter Optional Dietary Restrictions and Meal Type. 6 Recipes will appear with photos. Name as many ingredients in each recipe.
4. Enter a city/town, state, and zip code. Pick whether you are looking at rental or for sale properties as well as the range within which your guesses must hit to be correct. Name as many prices of real estate properties in the location you entered.

Scoring:
Time Based:
1. Easy: 15 Minutes. Game score is the percentage you correctly enter out of the total available entries.
2. Medium: 6 Minutes. Game score is 1.4 times the percentage you correctly enter out of the total available entries.
3. Hard: 3 Minutes. Game score is 2 times the percentage you correctly enter out of the total available entries.
4. Impossible: 30 Seconds. Game score is 6 times the percentage you correctly enter out of the total available entries.

Real Estate Scoring:
Real Estate scores will be lowered if as the range of the margin of error represents a greater proportion of the average price of houses.
If the range is greater than the average price, the score will be 10% the original score.
If the range is greater than 2 times the average price, the score will be 1/3rd the original score.
If the range is greater than 3 times the average price, the score will be 50% the original score.
If the range is greater than 4 times the average price, the score will be 2/3rds the original score.
 
Leaderboard:
All scores will be saved in the Leaderboard for each individual game.
Users can also see their individual scores and possess the option to delete any scores from the database.


## To Start
---
Please follow the steps below to ensure the API's are on the proper ports. 


First, start the rails API:
(Link to Backend Repo: https://github.com/steveneross94/ScriptBaseBackend)
1. `cd `
2. `bundle`
3. `rails db:migrate`
4. `rails db:seed`
5. `rails s`

Next, follow these steps before running npm start
1. `cd ScriptBase/script-base` 
2. `npm start`
  - you will be asked if you want to start on a different port, select yes

### External Resources for Access
---
You'll need to sign up for news api key (https://newsapi.org/). You will also have to run a gem install for figaro (https://github.com/laserlemon/figaro) and follow the steps to place the API key in the proper .env file