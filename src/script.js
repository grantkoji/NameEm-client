let baseballNameArray = []
let baseballMatches = []
let realEstatePropertyCount = 0
let realEstateScore = 0
let realEstateTotalPrice = 0
let realEstateRange = 0
let recipeHash = {}
let ingredientTotal = 0
let ingredientScore = 0
let songHash = {}
let songScore = 0
let counter = 301
let gameLevel = "nothing"
let realEstateGameType = "nothing"
const recipesURL = 'http://localhost:3001/api/v1/recipes'
const usersURL = 'http://localhost:3001/api/v1/users'
const scoresheetsURL = 'http://localhost:3001/api/v1/scoresheets'
const gamesURL = 'http://localhost:3001/api/v1/games'
const songsURL = 'http://localhost:3001/api/v1/songs'
const ingredientsURL = 'http://localhost:3001/api/v1/ingredients'
const realEstateSalesURL = 'http://localhost:3001/api/v1/real_estate_sales'
const realEstateRentalsURL = 'http://localhost:3001/api/v1/real_estate_rentals'
let baseballGameId
let recipeGameId
let realEstateGameId
let musicGameId
const baseballValueHash = {
                    Angels: "108-Angels",
                    Astros: "117-Astros",
                    Athletics: "133-Athletics",
                    "Blue-Jays": "141-Blue-Jays",
                    Braves: "144-Braves",
                    Brewers: "158-Brewers",
                    Cardinals: "138-Cardinals",
                    Cubs: "112-Cubs",
                    Diamondsbacks: "109-Diamondbacks",
                    Dodgers: "119-Dodgers",
                    Giants: "137-Giants",
                    Indians: "114-Indians",
                    Mariners: "136-Mariners",
                    Marlins: "146-Marlins",
                    Mets: "121-Mets",
                    Nationals: "120-Nationals",
                    Orioles: "110-Orioles",
                    Padres: "135-Padres",
                    Phillies: "143-Phillies",
                    Pirates: "134-Pirates",
                    Rangers: "140-Rangers",
                    Rays: "139-Rays",
                    Reds: "113-Reds",
                    "Red-Sox": "111-Red-Sox",
                    Rockies: "115-Rockies",
                    Royals: "118-Royals",
                    Tigers: "116-Tigers",
                    Twins: "142-Twins",
                    "White-Sox": "145-White-Sox",
                    Yankees: "147-Yankees"
}

document.addEventListener('DOMContentLoaded', function() {
    logInForm()
    documentClickListener()
    submitHandlerForApis()
    submitHandlerForGames()
    submitHandleForUserData() 
    hideDivsExceptNavandUsername()
    fetchGameIds()
    document.getElementById("navigation-bar").style.display = "none"
})

fetchGameIds = () => {
    fetch(gamesURL)
    .then(r=>r.json())
    .then(data=>setGameIds(data))
}

function setGameIds(data) {
    baseballGameId = data[0]["baseball"][0]["game_id"]
    recipeGameId = data[3]['recipes'][0]['game_id']
    realEstateGameId = data[1]['real_estate'][0]['game_id']
    musicGameId = data[2]['billboard'][0]['game_id']
}

function logInForm() {
    const loginForm = document.getElementById('username-form')
    loginForm.addEventListener('submit', function(e){
        e.preventDefault()
        const form = e.target
        if (form.id === "username-form") {
            if (form.username.value === "") {
                alert("You must enter a username.")
            } else {
                 fetchUserInfo(form.username.value)
                loginForm.reset()
            }
        }
    })
}

function fetchUserInfo(username){
    fetch(usersURL)
    .then(resp => resp.json())
    .then(userData => checkUserInfo(userData, username))
}

function checkUserInfo(userData, username) {
    let userExists = false
    for (let i=0; i<userData.length; i++) {
        if (userData[i]['username'] === username) {
            userExists = true
            const userId = userData[i]['id']
            const userActualName = userData[i]['name']
            const userTeam = userData[i]['team']
            const userState = userData[i]["state"]
            const userDietary = userData[i]['dietary']
            renderUserInfo(userData[i]['username'], userId , userActualName, userState, userTeam, userDietary)   
        }
    }
    if (userExists === false) {
         fetchCreateUser(username)
       
    }
}
 


function fetchCreateUser(username) {
    fetch(usersURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'username': `${username}`
        })
    })
    .then(resp => resp.json())
    .then(userData => {  
        renderUserInfo(userData['username'], userData['id'], 'No Name Entered', 'No State Selected', 'No Team Selected', 'No Dietary Restrictions')
    })
       
    .catch(error => alert(error))
}

function renderUserInfo(userName, userId, userActualName, userState, userTeam, userDietary) {
    
    const loginForm = document.getElementById('username-form')
    loginForm.style.display = "none"
    const navBar = document.getElementById('navigation-bar')
    navBar.style.display = "block"
    const editButton = document.getElementById('edit-user-info')
    editButton.textContent = `${userName} Profile`
    const nameSplit = userName.split(' ')
    editButton.dataset.username = nameSplit.join('-')
    editButton.dataset.userid = userId
    const actualNameToArray = userActualName.split(' ')
    const stateToArray = userState.split(' ')
    const teamToArray = userTeam.split(' ')
    const dietaryToArray = userDietary.split(' ')
    editButton.dataset.useractualname = actualNameToArray.join('-')
    editButton.dataset.userteam = teamToArray.join('-')
    editButton.dataset.userstate = stateToArray.join('-')
    editButton.dataset.userdietary = dietaryToArray.join('-')
    const userArchiveButton = document.getElementById('user-archive-button')
    userArchiveButton.dataset.username = nameSplit.join('-')
    userArchiveButton.dataset.userid = userId
    // if (userAttribute === nilnothingnada923) {
    //     editButton.dataset.userattribute = ""
    // } else {
    //     editButton.dataset.userattribute = userAttribute 
    // }
    const welcome = document.getElementById('just-signed-in')
    welcome.style.display = "block"
    welcome.dataset.username = nameSplit.join('-')
    welcome.querySelector('h2').textContent = `Hey ${userName}, Warm Welcome To Name 'Em!`  
}



//click listener for all events on page
function documentClickListener() {    
    document.addEventListener('click', function(e){
        const welcome = document.getElementById('just-signed-in')
        if (e.target.id === "category-return-from-cooking") {
            const cookingRules = document.getElementById("cooking-game-description")
            const cookingSelectDiv = document.getElementById("select-cooking-game")
            cookingRules.style.display = "none"
            cookingSelectDiv.style.display = "none"
            welcome.style.display = "block"
        } else if (e.target.id === "category-return-from-baseball") {
            const baseballRules = document.getElementById("baseball-game-rules")
            const baseballSelectDiv = document.getElementById("select-baseball-game")
            baseballRules.style.display = "none"
            baseballSelectDiv.style.display = "none"
            welcome.style.display = "block"
        } else if (e.target.id === "category-return-from-real-estate") {
            const realEstateRules = document.getElementById("real-estate-game-description")
            const realEstateSelectDiv = document.getElementById("select-real-estate-game")
            realEstateRules.style.display = "none"
            realEstateSelectDiv.style.display = "none"
            welcome.style.display = "block"
        }  else  if (e.target.id === "category-return-from-music") {
            const musicRules = document.getElementById("music-game-description")
            const musicSelectDiv = document.getElementById("select-music-game")
            musicRules.style.display = "none"
            musicSelectDiv.style.display = "none"
            welcome.style.display = "block"
        }
        else if (e.target.id === 'baseball-quit-button') {
            startTimer(1, '', 'quitGame')
            endBaseballGame()
        } else if (e.target.className === 'pick-another-game-button' || e.target.id === 'pick-game-button') {
            const divWelcome = document.getElementById('just-signed-in')
            hideDivsExceptNavandUsername()
            divWelcome.style.display = 'block'
        } else if (e.target.id === "baseball-category-set-up") {
            welcome.style.display = "none"
            const baseballRules = document.getElementById("baseball-game-rules")
            const baseballSelectDiv = document.getElementById("select-baseball-game")
            const editUserLink = document.getElementById("edit-user-info")
            const teamSelect = baseballSelectDiv.querySelector('select')
            if (editUserLink.dataset.userteam != 'No-Team-Selected') {    
                for (let i=0; i<teamSelect.options.length; i++) {
                    if (teamSelect.options[i].value === baseballValueHash[`${editUserLink.dataset.userteam}`]) {
                        teamSelect.options[i].selected = true
                        break;
                    }
                }
            } 
            else {
                teamSelect.options[0].selected = true
            }
            baseballRules.style.display = "block"
            baseballSelectDiv.style.display = "block"
        } else if (e.target.id === 'cooking-category-set-up') {
            welcome.style.display = "none"
            const cookingRules = document.getElementById("cooking-game-description")
            const cookingSelectDiv = document.getElementById("select-cooking-game")
            const editUserLink = document.getElementById("edit-user-info")
            const userDietaryArray = editUserLink.dataset.userdietary.split('-')
            const lowerCaseArray = userDietaryArray.map(string => string.toLowerCase())
            const dietaryValue = lowerCaseArray.join('+')
            if (editUserLink.dataset.userdietary != 'No-Dietary-Restrictions') {
                const dietarySelect = cookingSelectDiv.querySelectorAll('select')[1]
                for (let i=0; i<dietarySelect.options.length; i++) {
                    if (dietarySelect.options[i].value === dietaryValue) {
                        dietarySelect.options[i].selected = true
                        break;
                    }
                }
            }
            cookingRules.style.display = "block"
            cookingSelectDiv.style.display = "block"
        } else if (e.target.id === 'real-estate-category-set-up') {
            welcome.style.display = "none"
            const realEstateRules = document.getElementById("real-estate-game-description")
            const realEstateSelectDiv = document.getElementById("select-real-estate-game")
            const editUserLink = document.getElementById("edit-user-info")
            if (editUserLink.dataset.userstate != 'No-State-Selected') {
                const stateSelect = realEstateSelectDiv.querySelectorAll('select')[1]
                for (let i=0; i<stateSelect.options.length; i++) {
                    if (stateSelect.options[i].value === editUserLink.dataset.userstate) {
                        stateSelect.options[i].selected = true
                        break;
                    }
                }
            }
            realEstateRules.style.display = "block"
            realEstateSelectDiv.style.display = "block"
        } else if (e.target.className === 'properties-searched-for-re') {
            renderProperty(e.target)
        } else if (e.target.id === 'real-estate-quit-button') {
            startTimer(1, '', 'quitGame')
            realEstateEndGame()
        } else if (e.target.id === 'recipe-quit-button') {
            startTimer(1, '', 'quitGame')
            recipeEndGame()
        } else if (e.target.id === "logout-button") {
            hideDivsExceptNavandUsername()
            const navBar = document.getElementById('navigation-bar')
            navBar.style.display = "none"
            const enterUsername = document.getElementById('username-form')
            enterUsername.style.display = 'block'
        } else if (e.target.id === "user-archive-button") {
            hideDivsExceptNavandUsername()
            fetchUserScores()
        } else if (e.target.id === "leaderboard-button") {
            hideDivsExceptNavandUsername()
            fetchLeaderBoards()
        } else if (e.target.id === "edit-user-info") {
            hideDivsExceptNavandUsername()
            renderUserPage(e.target.dataset.username, e.target.dataset.userid, e.target.dataset.useractualname, e.target.dataset.userstate, e.target.dataset.userteam, e.target.dataset.userdietary)
        } else if (e.target.id === 'music-quit-button') {
            startTimer(1, '', 'quitGame')
            musicEndGame()
        } else if (e.target.className === 'listed-songs-for-game') {
            renderSong(e.target)
        } else if (e.target.id === 'logout-button') {
            hideDivsExceptNavandUsername()
            document.getElementById('navigation-bar').style.display = 'none'
            document.getElementsById('username-form').style.display = 'block'
            //log out user right here!!!
        } else if (e.target.id === "change-attribute-button") {
            addAttributesForm()
        } else if (e.target.id === "music-category-set-up") {
            welcome.style.display = "none"
            document.getElementById('music-game-description').style.display = 'block'
            document.getElementById("select-music-game").style.display = 'block'
        } else if (e.target.id === "delete-button-for-scoresheet") {
            const scoresheetId = e.target.dataset.scoresheetid 
            const scoreDiv = e.target.parentNode
            scoreDiv.remove()
            fetchDeleteScoresheet(scoresheetId)
        }
    })
}

function fetchDeleteScoresheet(scoresheetId) {
    fetch(`${scoresheetsURL}/${scoresheetId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
    .catch(error => alert("There was a server error. Your scoresheet may still remain in our archives."))
}



function fetchUserScores() {
    fetch(scoresheetsURL)
    .then(resp => resp.json())
    .then(scoresheetData => checkUserData(scoresheetData))
}

function checkUserData(scoresheetData) {
    const userDiv = document.getElementById('user-game-archives')
    if (!!userDiv.children) {
        removeChildren(userDiv)
    }
    userDiv.style.display = 'block'
    const header = document.createElement('h2')
    const editButton = document.getElementById("edit-user-info")
    const userNameArray = editButton.dataset.username.split('-')
    const thisUsername = userNameArray.join(' ')
    header.textContent = `Archive of ${thisUsername}'s Saved Games:`
    const userUl = document.createElement('ul')
    userDiv.appendChild(header)
    userDiv.appendChild(userUl)

    scoresheetData.forEach(scoresheet => showUserGameScores(scoresheet))
}

function showUserGameScores(scoresheet) {
    const userDiv = document.getElementById('user-game-archives')
    const userUl = userDiv.querySelector('ul')
    const editButton = document.getElementById("edit-user-info")
    const userId = editButton.dataset.userid
    if (parseInt(userId) === parseInt(scoresheet["user_id"])) {
        const userDiv = document.createElement('div')
        const userLi = document.createElement('li')
        const deleteButton = document.createElement('button')
        deleteButton.textContent = `Remove Score: ${scoresheet["score"]} From Archives`
        deleteButton.id = "delete-button-for-scoresheet"
        deleteButton.dataset.scoresheetid = scoresheet['id']
        userDiv.appendChild(userLi)
        userDiv.appendChild(deleteButton)
        userUl.appendChild(userDiv)
        if (scoresheet["game_name"] === "Billboard") {
            userLi.textContent = `Score: ${scoresheet["score"]} - Game: Name'Em Artists From the Billboard Top 25.`
        } else if (scoresheet["game_name"] === "Baseball") {
            userLi.textContent = `Score: ${scoresheet["score"]} - Game: Name'Em Players on a Baseball Team's Active Roster.`       
        } else if (scoresheet["game_name"] === "Recipes") {
            userLi.textContent = `Score: ${scoresheet["score"]} - Game: Name'Em Ingredients from Random Recipes.`
        } else if (scoresheet["game_name"] === "Real Estate") {
            userLi.textContent = `Score: ${scoresheet["score"]} - Game: Name'Em Real Estate Property Prices.`
        }
    }
}

function fetchLeaderBoards() {
    fetch(gamesURL)
    .then(resp => resp.json()
    .then(gameData => parseLeaderData(gameData)))
    .catch(error => alert(error))
}



function parseLeaderData(gameData) {
    const leaderboardDiv = document.getElementById('complete-leader-board')
    if (!!leaderboardDiv.children) {
        removeChildren(leaderboardDiv)
    }
    leaderboardDiv.style.display = 'block'
    const header = document.createElement('h1')
    header.textContent = `Leaderboard by Individual Game Score`
    leaderboardDiv.appendChild(header)
    createGameLeaderboard(gameData[0]['baseball'], `Players on a Baseball Team's Active Roster:`)
    createGameLeaderboard(gameData[1]['real_estate'], 'Real Estate Property Prices:')
    createGameLeaderboard(gameData[2]["billboard"], `Artists from the Billboard Top 25:`)
    createGameLeaderboard(gameData[3]["recipes"], `Ingredients from Random Recipes:`)
}

function createGameLeaderboard(categoryArray, tagLine) {
    const leaderboards = document.getElementById('complete-leader-board')
    const styleDiv = document.createElement('div')
    styleDiv.className = 'leaderboard-separator'
    const categoryHeader = document.createElement('h3')
    categoryHeader.textContent = `Top Ten Name'Em ${tagLine}`
    leaderboards.appendChild(styleDiv)
    styleDiv.appendChild(categoryHeader)
    const listUl = document.createElement('ul')
    styleDiv.appendChild(listUl)

    for (let i=0; i < categoryArray.length; i++) {
        const scoreLi = document.createElement('li')
        scoreLi.textContent = `${i+1}) Score: ${categoryArray[i]["score"]} - User: ${categoryArray[i]["username"]}`
        listUl.appendChild(scoreLi)
        if (i === 9) {
            break;
        }
    }

}


function addAttributesForm() {
    const userDiv = document.getElementById('user-info-show')
    const editNavBar = document.getElementById('edit-user-info')
    const actualNameWDash = editNavBar.dataset.useractualname
    const actualNameArray = actualNameWDash.split('-')
    const actualNameString = actualNameArray.join(' ')
    const stateWDash = editNavBar.dataset.userstate
    const stateArray = stateWDash.split('-')
    const stateString = stateArray.join(' ')
    const teamWDash = editNavBar.dataset.userteam
    const teamArray = teamWDash.split('-')
    const teamString = teamArray.join(' ')
    const dietaryWDash = editNavBar.dataset.userdietary
    const dietaryArray = dietaryWDash.split('-')
    const dietaryString = dietaryArray.join(' ')
    const userNameArray = editNavBar.dataset.username.split('-')
    const userNameString = userNameArray.join(' ')

    userDiv.innerHTML = `
                        <h1>User Profile Page</h1>
                         <h2>Username: ${userNameString}</h2>
                         <form id="change-user-info" data-userid="${editNavBar.dataset.userid}" data-username="${editNavBar.dataset.username}">
                            <label for="useractualname">Optional - Enter Name:</label>
                            <input type="text" name="useractualname" value="${actualNameString}"><br>
                            <label for="userstate">Optional - Enter State:</label>
                            <select name="userstate">
                                <option value="No-State-Selected">No State Selected</value>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DC">District of Columbia</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MI">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select><br>
                            <label for="userteam">Optional - Favorite Baseball Team:</label>
                            <select name="userteam">
                                <option value='No-Team-Selected'>No Team Selected</option>
                                <option value="Angels">Angels</option>
                                <option value="Astros">Astros</option>
                                <option value="Athletics">Athletics</option>
                                <option value="Blue-Jays">Blue Jays</option>
                                <option value="Braves">Braves</option>
                                <option value="Brewers">Brewers</option>
                                <option value="Cardinals">Cardinals</option>
                                <option value="Cubs">Cubs</option>
                                <option value="Diamondbacks">Diamondbacks</option>
                                <option value="Dodgers">Dodgers</option>
                                <option value="Giants">Giants</option>
                                <option value="Indians">Indians</option>
                                <option value="Mariners">Mariners</option>
                                <option value="Marlins">Marlins</option>
                                <option value="Mets">Mets</option>
                                <option value="Nationals">Nationals</option>
                                <option value="Orioles">Orioles</option>
                                <option value="Padres">Padres</option>
                                <option value="Phillies">Phillies</option>
                                <option value="Pirates">Pirates</option>
                                <option value="Rangers">Rangers</option>
                                <option value="Rays">Rays</option>
                                <option value="Reds">Reds</option>
                                <option value="Red-Sox">Red Sox</option>
                                <option value="Rockies">Rockies</option>
                                <option value="Royals">Royals</option>
                                <option value="Tigers">Tigers</option>
                                <option value="Twins">Twins</option>
                                <option value="White-Sox">White Sox</option>
                                <option value="Yankees">Yankees</option>
                            </select><br>
                            <label for="userdietary">Optional - Choose Dietary Restriction:</label>
                            <select name="userdietary">
                                <option value="No-Dietary-Restrictions">No Dietary Restrictions</option>
                                <option value="Vegetarian">Vegetarian</option>
                                <option value="Vegan">Vegan</option>
                                <option value="Lacto-Ovo-Vegetarian">Lacto Ovo Vegetarian</option>
                                <option value="Dairy-Free">Dairy Free</option>
                                <option value="Gluten-Free">Gluten Free</option>
                                <option value="Pescatarian">Pescatarian</option>
                                <option value="Paleolithic">Paleolithic</option>
                                <option value="Primal">Primal</option>
                            </select><br>
                            <button type="submit" value="Submit">Submit</button>
                        </form>
                        `
    if (stateString != 'No State Selected') {
        const stateSelect = userDiv.querySelector('select')
        for (let i=0; i<stateSelect.options.length; i++) {
            if (stateSelect.options[i].value === stateString) {
                stateSelect.options[i].selected = true
                break;
            }
        }
    }
    if (teamString != 'No Team Selected') {
        const teamSelect = userDiv.querySelectorAll('select')[1]
        for (let i=0; i<teamSelect.options.length; i++) {
            if (teamSelect.options[i].value === editNavBar.dataset.userteam) {
                teamSelect.options[i].selected = true
                break;
            }
        }
    }
    if (dietaryString != 'No Dietary Restrictions') {
        const dietarySelect = userDiv.querySelectorAll('select')[2]
        for (let i=0; i<dietarySelect.options.length; i++) {
            if (dietarySelect.options[i].value === editNavBar.dataset.userdietary) {
                dietarySelect.options[i].selected = true
                break;
            }
        }
    }
}


function submitHandleForUserData() {
    const divUserContainer = document.getElementById("user-and-leader-data")
    divUserContainer.addEventListener('submit', function(e){
        e.preventDefault()
        const form = e.target
        if (form.id === 'change-user-info') {
            const userActualName = form[0].value
            const userState = form[1].value
            const userTeam = form[2].value
            const userDietary = form[3].value
            const id = form.dataset.userid
            userPatchFetch(id, userActualName, userState, userTeam, userDietary, form.dataset.username)
            form.reset()
        }
    })
}

function userPatchFetch(id, userActualName, userState, userTeam, userDietary, datasetUserName) {
    fetch(`${usersURL}/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            'name': `${userActualName}`,
            'state': `${userState}`,
            'team': `${userTeam}`,
            'dietary': `${userDietary}`,
        })
    })
    .then(resp => resp.json())
    .then(userData => {
        const actualNameArray = userData['name'].split(' ')
        const stateArray = userData['state'].split(' ')
        const teamArray = userData['team'].split(' ')
        const dietaryArray = userData['dietary'].split(' ')
    
        const editUserLink = document.getElementById("edit-user-info")
        editUserLink.dataset.useractualname = actualNameArray.join('-')
        editUserLink.dataset.userstate = stateArray.join('-')
        editUserLink.dataset.userteam = teamArray.join('-')
        editUserLink.dataset.userdietary = dietaryArray.join('-')
        renderUserPage(datasetUserName, id, editUserLink.dataset.useractualname, editUserLink.dataset.userstate, editUserLink.dataset.userteam, editUserLink.dataset.userdietary)})
}



function renderUserPage(datasetUserName, userid, datasetActualName, datasetState, datasetTeam, datasetDietary) {
    const userWelcome = document.getElementById("just-signed-in")
    userWelcome.style.display = 'none'   
    const actualNameArray = datasetActualName.split('-')
    const actualNameString = actualNameArray.join(' ')
    const stateArray = datasetState.split('-')
    const stateString = stateArray.join(' ')
    const teamArray = datasetTeam.split('-')
    const teamString = teamArray.join(' ')
    const dietaryArray = datasetDietary.split('-')
    const dietaryString = dietaryArray.join(' ')
    const userNameArray = datasetUserName.split('-')
    const userNameString = userNameArray.join(' ')

    const userDiv = document.getElementById('user-info-show')
    if (!!userDiv.children) {
        removeChildren(userDiv)
    }
    userDiv.style.display = 'block'
    userDiv.innerHTML = `
                        <h1>User Profile Page</h1>
                        <h2>Username: ${userNameString}</h2>
                        <h3>Name: ${actualNameString}</h3>
                        <h3>State: ${stateString}</h3>
                        <h3>Favorite Baseball Team: ${teamString}</h3>
                        <h3>Dietary Restriction: ${dietaryString}</h3>
                        <button id="change-attribute-button">Edit User Info</button>
                         `
}




function endBaseballGame() {
    const form = document.getElementById('baseball-guesses')
    form.remove()
    document.getElementById("game-timer-div").style.display = 'none'
    const baseballDiv = document.getElementById('baseball-game-container')
    const baseballH = document.createElement('h3')
    baseballH.textContent = "Other Team Members:"
    baseballDiv.appendChild(baseballH)
    const missedEntriesUl = document.createElement('ul')
    missedEntriesUl.id = 'missed-baseball-ul'
    const newGameButton = document.createElement('button')
    newGameButton.className = 'pick-another-game-button'
    newGameButton.textContent = "Play Another Game"
    baseballDiv.appendChild(newGameButton)
    baseballDiv.appendChild(missedEntriesUl)
    baseballNameArray.forEach(name => renderMissedPlayer(name))
    const quittingButton = document.getElementById('baseball-quit-button')
    quittingButton.remove()
    const baseballScoreCount = document.getElementById('baseball-score-tracker')
    let rawScore = (parseFloat(baseballScoreCount.dataset.correctentries) * 100) / parseFloat(baseballScoreCount.dataset.rostersize)
    
    const editButton = document.getElementById("edit-user-info")
    const userNameArray = editButton.dataset.username.split('-')
    const userName = userNameArray.join(' ')
    const userId = parseInt(editButton.dataset.userid)
    if (rawScore === 0) {
        rawScore = 1
    }

    if (gameLevel === "Easy") {
        const finalScore = Math.round(rawScore)
        fetchCreateGame(userId, baseballGameId, finalScore, userName, "Baseball")
        
    } else if (gameLevel === "Medium") {
        const finalScore = Math.round(rawScore * 1.4)
        fetchCreateGame(userId, baseballGameId, finalScore, userName, "Baseball")

    } else if (gameLevel === "Hard") {
        const finalScore = Math.round(rawScore * 2)
        fetchCreateGame(userId, baseballGameId, finalScore, userName, "Baseball")
    } else if (gameLevel === "Impossible") {
        const finalScore = Math.round(rawScore * 6)
        fetchCreateGame(userId, baseballGameId, finalScore, userName, "Baseball")
    }
}

//submit handler for API's
function submitHandlerForApis() {
    const submitGameContainer = document.getElementById('submit-game-container')
    submitGameContainer.addEventListener("submit", function(e){
        e.preventDefault()
        const form = e.target
        if (form.id === "recipe-api-setup") {
            const mealType = form[0].value
            const mealDietaryRes1 = form[1].value
            const mealDietaryRes2 = form[2].value
            const difficulty = form[3].value
            let mealArray = []
            if (mealType != 'no+meal+type') {
                mealArray.push(mealType)
            }
            if (mealDietaryRes1 != 'no+dietary+restrictions') {
                mealArray.push(mealDietaryRes1)
            }
            if (mealDietaryRes2 != 'no+dietary+restrictions') {
                mealArray.push(mealDietaryRes2)
            }
            if (mealArray.length === 0) {
                fetchRecipesWithoutTags(difficulty)
            } else if (mealArray.length === 1) {
                const word = mealArray.join()
                fetchRecipes(`${word}`, difficulty)
            } else {
                const string = mealArray.join(',')
                fetchRecipes(`${string}`, difficulty)
            }
        } else if (form.id === "baseball-api-setup") {
            const teamInfoArray = form[0].value.split("-")
            const teamId = teamInfoArray[0]
            let teamName = ''
            if (teamInfoArray.length === 3) {
                teamName = `${teamInfoArray[1]} ${teamInfoArray[2]}`
            } else {
                teamName = teamInfoArray[1]
            }
            const year = form[1].value 
            const baseballDiv = document.getElementById('baseball-game-container')
            if (!!baseballDiv.children) {
                removeChildren(baseballDiv)
            }
            const baseballHeader = document.createElement('h2')
            baseballHeader.textContent = `Team: ${teamName} - Year: ${year}`
            const baseballScoreCount = document.createElement('h3')
            baseballScoreCount.id = 'baseball-score-tracker'
            baseballScoreCount.dataset.correctentries = 0
            const submitGuesses = document.createElement('form')
            submitGuesses.className = "user-guesses"
            submitGuesses.id = 'baseball-guesses'
            submitGuesses.innerHTML = `
                                    <label for="guesses">Player Name:</label>
                                    <input type='text' name="guesses" placeholder="Enter Name Here" value="">
                                    <button type="submit" value="Submit">Submit Name</button>
                                        `
            const baseballUl = document.createElement('ul')
            baseballUl.id = "baseball-team-roster-ul"
            const quitButton = document.createElement('button')
            quitButton.textContent = 'Quit This Game'
            quitButton.id = 'baseball-quit-button'
            baseballDiv.appendChild(baseballHeader)
            baseballDiv.appendChild(baseballScoreCount)
            baseballDiv.appendChild(submitGuesses)
            baseballDiv.appendChild(baseballUl)
            baseballDiv.appendChild(quitButton)
            const difficulty = form[2].value

            fetchBaseball(teamId, year, difficulty)   

        } else if (form.id === "real-estate-api-setup") {
            const gameTypeArray = form[0].value.split('-')
            const saleOrRent = gameTypeArray[1]
            const answerRange = gameTypeArray[2]
            const city = form[1].value
            let location = form[1].value
            const locationArray = form[1].value.split(' ')
            const difficulty = form[4].value
            if (locationArray.length > 1) {
                location = locationArray.join('%20')
            }
            const state = form[2].value
            const zipCode = form[3].value
            if (location === "" || zipCode.toString().length != 5) {
                alert("You must enter a location and the zip code must be 5 digits.")
            } else {
              addToRealEstateContainerDiv(saleOrRent, city, state, zipCode, answerRange)
              fetchRealEstate(saleOrRent, location, state, zipCode, answerRange, difficulty)
            }
        } else if (form.id === "music-api-setup") {
            const year = form[0].value
            const musicDiv = document.getElementById('music-game-container')
            if (!!musicDiv.children) {
                removeChildren(musicDiv)
            }
            musicDiv.style.display = "block"
            const musicHeader = document.createElement('h2')
            musicHeader.textContent = `Billboard Top 25 for ${year}`
            const musicScoreCount = document.createElement('h3')
            musicScoreCount.id = 'music-score-tracker'
            musicScoreCount.dataset.correctmusicentries = 0
            musicScoreCount.textContent = `Total Songs: 25 - Total Correct Entries: 0`
            const songUl = document.createElement('ul')
            songUl.id = "songs-list-ul"
            const quitButton = document.createElement('button')
            quitButton.textContent = 'Quit This Game'
            quitButton.id = 'music-quit-button'
            musicDiv.appendChild(musicHeader)
            musicDiv.appendChild(musicScoreCount)
            musicDiv.appendChild(quitButton)
            musicDiv.appendChild(songUl)

            const difficulty = form[1].value
            fetchSongs(year, difficulty)   

        }
    })
}

function fetchSongs(year, difficulty) {
    fetch(songsURL)
    .then(resp => resp.json())
    .then(songData => parseSongInfo(songData, year, difficulty))
    .catch(error => alert(error))
}

function parseSongInfo(songData, year, difficulty) {
    document.getElementById("select-music-game").style.display = 'none'
    songHash = {}
    songScore = 0
    songData.forEach(songInfo => pullSong(songInfo, year))

    if (difficulty === 'Easy') {
        gameLevel = "Easy"
        startTimer(901, 'music', 'playGame')
    }
    else if (difficulty === 'Medium') {
        gameLevel = "Medium"
        startTimer(361, 'music', 'playGame')
    } else if (difficulty === 'Hard') {
        gameLevel = "Hard"
        startTimer(181, 'music', 'playGame')
    } else if (difficulty === 'Impossible') {
        gameLevel = "Impossible"
        startTimer(31, 'music', 'playGame')
    }
}

//Taking API data, rendering information for an individual song if the year matches
function pullSong(songInfo, year) {
    if (parseInt(year) === parseInt(songInfo["year"])) {
        const songTitle = songInfo["title"]
        const songArtist = songInfo["artist"]
        const songLi = document.createElement('li')
        songHash[`${songTitle}`] = `${songArtist}`
        songLi.dataset.songtitle = `${songTitle}`
        songLi.dataset.songstatus = 'incorrect'
        songLi.dataset.billboardrank = `${songInfo['billboard_rank']}`
        songLi.className = 'listed-songs-for-game'
        songLi.textContent = `Billboard Rank: ${songInfo['billboard_rank']} - Title: ${songTitle}`
        const songsUl = document.getElementById('songs-list-ul')
        songsUl.appendChild(songLi)
    }
}
//render a song that is clicked onto the song game show div
function renderSong(songLi) {
    const showDiv = document.getElementById('song-game-show')
    showDiv.style.display = "block"
    const songTitle = `${songLi.dataset.songtitle}`
    const songArtist = `${songHash[songTitle]}`
    if (!!showDiv.children) {
        removeChildren(showDiv)
    }
    showDiv.innerHTML = `<h2>Title: ${songTitle}<h2>`
    if (songLi.dataset.songstatus === "correct") {
        showDiv.innerHTML += `<h3>Artist Entered: ${songArtist}<h3>`
    } else {
        showDiv.innerHTML += `<form id='artist-user-guesses' data-title='${songTitle}'>
                            <label for="guesses">Artist Name:</label>
                            <input type='text' name="guesses" placeholder="Enter Artist Here" value="">
                            <button type="submit" value="Submit">Submit</button>`    
    } 
}

//After listening for a submit event of a form, checking if the user's entry matches an artist in the song
function checkSongArtistGuess(guess, title) {
    const songTitle = `${title}`
    const songArtist = `${songHash[songTitle]}`
    const artistNameArray = songArtist.split(' ')
    if (guess.toLowerCase() === songArtist.toLowerCase()) {
        renderArtistCorrect(songArtist, songTitle)
    } else {
        for (let i=0; i < artistNameArray.length; i++) {
            if (guess.toLowerCase() === artistNameArray[i].toLowerCase()) {
                renderArtistCorrect(songArtist, songTitle)
            } else if (!!artistNameArray[i+1] === true && guess.toLowerCase() === `${artistNameArray[i].toLowerCase()} ${artistNameArray[i+1].toLowerCase()}`) { 
                renderArtistCorrect(songArtist, songTitle)
            } else if (!!artistNameArray[i+2] === true && guess.toLowerCase() === `${artistNameArray[i].toLowerCase()} ${artistNameArray[i+1].toLowerCase()} ${artistNameArray[i+2].toLowerCase()}`) {
                renderArtistCorrect(songArtist, songTitle)
            } else if (!!artistNameArray[i+3] === true && guess.toLowerCase() === `${artistNameArray[i].toLowerCase()} ${artistNameArray[i+1].toLowerCase()} ${artistNameArray[i+2].toLowerCase()} ${artistNameArray[i+3].toLowerCase()}`) {
                renderArtistCorrect(songArtist, songTitle)
            } else if (!!artistNameArray[i+4] === true && guess.toLowerCase() === `${artistNameArray[i].toLowerCase()} ${artistNameArray[i+1].toLowerCase()} ${artistNameArray[i+2].toLowerCase()} ${artistNameArray[i+3].toLowerCase()} ${artistNameArray[i+4].toLowerCase()}`) {
                renderArtistCorrect(songArtist, songTitle)
            } 
        }
    }
}

//if the guess matches an artist name, render the DOM. 
function renderArtistCorrect(songArtist, songTitle) {
    const musicGameDiv = document.getElementById('music-game-container')
    const musicShowDiv = document.getElementById('song-game-show')
    const answerLi = musicGameDiv.querySelector(`li[data-songtitle="${songTitle}"]`)
    answerLi.dataset.songstatus = 'correct'
    answerLi.textContent += ` - Correct Entry! Artist Name: ${songArtist}`
    const songForm = musicShowDiv.querySelector('form')
    songForm.remove()
    musicShowDiv.innerHTML += `<h3>Artist Entered: ${songArtist}<h3>`
    songScore = songScore + 1
    const musicScoreCount = document.getElementById('music-score-tracker')
    musicScoreCount.dataset.correctmusicentries = `${songScore}`
    musicScoreCount.textContent = `Total Songs: 25 - Total Correct Entries: ${songScore}`
}

//when the game is over, manipulate the DOM and show the results
function musicEndGame() {
    const musicDesc = document.getElementById('music-game-description')
    musicDesc.style.display = 'none'
    document.getElementById("game-timer-div").style.display = 'none'
    const quitButton = document.getElementById('music-quit-button')
    quitButton.remove()
    const songShowDiv = document.getElementById('song-game-show')
    if (!!songShowDiv.children) {
        removeChildren(songShowDiv)
    }
    const musicGameDiv = document.getElementById('music-game-container')
    const EndGameLine1 = document.createElement('h2')
    EndGameLine1.textContent = `The Game is Over. Out of 25 Songs, you correctly entered ${songScore} Artists.`
    const newGameButton = document.createElement('button')
    newGameButton.className = 'pick-another-game-button'
    newGameButton.textContent = "Play Another Game"
    const spacingP = document.createElement('p')
    const spacingP2 = document.createElement('p')
    musicGameDiv.prepend(spacingP)
    musicGameDiv.prepend(newGameButton)
    musicGameDiv.prepend(spacingP2)
    musicGameDiv.prepend(EndGameLine1)
    const gameUl = musicGameDiv.querySelector('ul')
    const gameUlChildrenArray = Array.from(gameUl.children)
    gameUlChildrenArray.forEach(child => {
        if (child.dataset.songstatus === "incorrect") {
            const title = child.dataset.songtitle 
            const artist = songHash[`${title}`]
            child.textContent += ` - Artist Name: ${artist}`
        }
    })

    let rawScore = parseFloat(songScore) * 4
    const editButton = document.getElementById("edit-user-info")
    const userNameArray = editButton.dataset.username.split('-')
    const userName = userNameArray.join(' ')
    const userId = parseInt(editButton.dataset.userid)
    if (rawScore === 0) {
        rawScore = 1
    }

    if (gameLevel === "Easy") {
        const finalScore = Math.round(rawScore)
        fetchCreateGame(userId, musicGameId, finalScore, userName, "Billboard")
        
    } else if (gameLevel === "Medium") {
        const finalScore = Math.round(rawScore * 1.4)
        fetchCreateGame(userId, musicGameId, finalScore, userName, "Billboard")

    } else if (gameLevel === "Hard") {
        const finalScore = Math.round(rawScore * 2)
        fetchCreateGame(userId, musicGameId, finalScore, userName, "Billboard")
    } else if (gameLevel === "Impossible") {
        const finalScore = Math.round(rawScore * 6)
        fetchCreateGame(userId, musicGameId, finalScore, userName, "Billboard")
    }
}



//event listener for submit events as the games are being played. 
function submitHandlerForGames() {
    const divGameContainer = document.getElementById('submit-game-container')
    divGameContainer.addEventListener('submit', function(e){
        e.preventDefault()
        const form = e.target
        if (form.id === 'baseball-guesses') {
            const guess = form.guesses.value
            renderBaseballMatches(guess, baseballNameArray)
            form.reset()
        } else if (form.id === 'real-estate-user-guesses') {
            console.log('guess')
            const guess = form.guesses.value
            const price = form.dataset.price
            const address = form.dataset.address
            checkRealEstateGuess(guess, price, address)
            form.reset()
        } else if (form.className === 'cooking-user-guesses') {
            const guess = form.guesses.value
            renderIngredientMatches(guess, form.parentNode)
            form.reset()
        } else if (form.id === 'artist-user-guesses') {
            const guess = form.guesses.value
            const title = form.dataset.title 
            checkSongArtistGuess(guess, title)
            form.reset()
        }
    })
}


//fetch functions
//fetch for recipes if the user gives categories
function fetchRecipes(string, difficulty) {
    fetch(`${recipesURL}/${string}`)
    .then(resp => resp.json())
    .then(recipeData => gatherRecipeInfo(recipeData, difficulty))
    .catch(error => alert(error))
}
//fetch for recipes without the user giving any categories
function fetchRecipesWithoutTags(difficulty) {
    fetch(recipesURL)
    .then(resp => resp.json())
    .then(recipeData => gatherRecipeInfo(recipeData, difficulty))
    .catch(error => alert(error))
}

//taking the fetch information and creating the main div header information
function gatherRecipeInfo(recipeData, difficulty) {
    recipeHash = {}
    ingredientTotal = 0
    ingredientScore = 0
    const recipeGameDiv = document.getElementById('cooking-game-container')
    if (!!recipeGameDiv.children) {
        removeChildren(recipeGameDiv)
    }
    const quitButton = document.createElement('button')
    quitButton.textContent = 'Quit This Game'
    quitButton.id = 'recipe-quit-button'
    recipeGameDiv.appendChild(quitButton)
    const pSpace = document.createElement('p')
    recipeGameDiv.appendChild(pSpace)
    recipeGameDiv.style.display = 'block'
    const searchRecipeDiv = document.getElementById('select-cooking-game')
    searchRecipeDiv.style.display = 'none'
    recipeData['recipes'].forEach(recipe => singleRecipe(recipe))
    if (difficulty === 'Easy') {
        gameLevel = "Easy"
        startTimer(901, 'cooking', 'playGame')
    }
    else if (difficulty === 'Medium') {
        gameLevel = "Medium"
        startTimer(361, 'cooking', 'playGame')
    } else if (difficulty === 'Hard') {
        gameLevel = "Hard"
        startTimer(181, 'cooking', 'playGame')
    } else if (difficulty === 'Impossible') {
        gameLevel = "Impossible"
        startTimer(31, 'cooking', 'playGame')
    }
}
//taking individual recipe informaiton and adding it to DOM
function singleRecipe(recipeData) {
    const recipeGameDiv = document.getElementById('cooking-game-container')
    const singleRecipeDiv = document.createElement('div')
    singleRecipeDiv.className='div-for-single-recipe'
    singleRecipeDiv.dataset.name = recipeData["title"]
    singleRecipeDiv.dataset.websiteid = recipeData["id"]
    singleRecipeDiv.dataset.sourceurl = recipeData["sourceUrl"]
    singleRecipeDiv.dataset.correctingredients = "0"
    singleRecipeDiv.dataset.totalingredients = "0"
    singleRecipeDiv.innerHTML = `
                                <img src='${recipeData["image"]}'>
                                <h3>Recipe Name: ${recipeData["title"]}</h3>
                                <h4>Number of Ingredients in Recipe: 0</h4>
                                <h4>Number of Correct Ingredients Entered: 0</h4>
                                <form class='cooking-user-guesses'>
                                <label for="guesses">Ingredient:</label>
                                <input type='text' name="guesses" placeholder="Enter Ingredient Here" value="">
                                <button type="submit" value="Submit">Submit</button><br>
                                <ul class='correct-ingredients-ul'><ul>
                                `
    recipeGameDiv.appendChild(singleRecipeDiv)
    fetchRecipeIngredients(recipeData['id'])
}

//A second fetch for each recipe (using recipe website id) to get a clean list of recipe ingredients
function fetchRecipeIngredients(websiteId) {
    fetch(`${ingredientsURL}/${websiteId}`)
    .then(resp => resp.json())
    .then(ingredientData => gatherIngredients(ingredientData, websiteId))
    .catch(error => alert(error))
}
//take the array of ingredients so we can run individual elements in the next function
function gatherIngredients(ingredientData, websiteId) {
    ingredientData["ingredients"].forEach(ingredient => addIngredient(ingredient, websiteId))
}
//add ingredients to the hash after we do our second fetch
function addIngredient(ingredient, websiteId) {
    if (!!recipeHash[websiteId]) {
        recipeHash[websiteId].push(ingredient["name"])
    } else {
        recipeHash[websiteId] = [`${ingredient['name']}`]
    }
    ingredientTotal = ingredientTotal + 1 
    const recipeDiv = document.querySelector(`div[data-websiteid="${websiteId}"]`)
    recipeDiv.dataset.totalingredients = parseInt(recipeDiv.dataset.totalingredients) + 1
    const totalIngredientH = recipeDiv.querySelector('h4')
    totalIngredientH.textContent = `Number of Ingredients in Recipe: ${recipeDiv.dataset.totalingredients}`
    
} 

//After listening for a submit event of a form, checking if the user's entry matches an ingredient in the recipe
function renderIngredientMatches(guess, recipeDiv) {
    const webId = recipeDiv.dataset.websiteid
    for (let i=0; i < recipeHash[webId].length; i++) {
        if (guess.toLowerCase() === recipeHash[webId][i].toLowerCase()) {
            renderIngredientMatch(recipeDiv, webId, i)
            i = i - 1
        } else {
            const recipeBrokenUp = recipeHash[webId][i].split(' ')
            for (let count=0; count<recipeBrokenUp.length; count++) {
                if (guess.toLowerCase() === recipeBrokenUp[count].toLowerCase()) {
                    renderIngredientMatch(recipeDiv, webId, i)
                    i = i - 1
                } else if (!!recipeBrokenUp[count+1] === true && guess.toLowerCase() === `${recipeBrokenUp[count].toLowerCase()} ${recipeBrokenUp[count+1].toLowerCase()}`) { 
                    renderIngredientMatch(recipeDiv, webId, i)
                    i = i - 1
                } else if (!!recipeBrokenUp[count+2] === true && guess.toLowerCase() === `${recipeBrokenUp[count].toLowerCase()} ${recipeBrokenUp[count+1].toLowerCase()} ${recipeBrokenUp[count+2].toLowerCase()}`) {
                    renderIngredientMatch(recipeDiv, webId, i)
                    i = i - 1
                }
            }
        }
    
    }
}

function renderIngredientMatch(recipeDiv, webId, i) {
    recipeDiv.dataset.correctingredients = parseInt(recipeDiv.dataset.correctingredients) + 1
    const totalIngredH = recipeDiv.querySelector('h4')
    const correctGuessesH = totalIngredH.nextElementSibling
    correctGuessesH.textContent = `Number of Correct Ingredients Entered: ${recipeDiv.dataset.correctingredients}`
    const answersUl = recipeDiv.querySelector('ul')
    const answerLi = document.createElement('li')
    answerLi.textContent = `Correct Ingredient Entry: ${recipeHash[webId][i]}`
    answersUl.appendChild(answerLi)
    recipeHash[webId].splice(i, 1)
    ingredientScore = ingredientScore + 1
}
//end the Recipe Game. Manipulate the DOM with summary information. Add links for each recipe. 
function recipeEndGame() {
    const cookingDesc = document.getElementById('cooking-game-description')
    cookingDesc.style.display = "none"
    document.getElementById("game-timer-div").style.display = 'none'
    const quitButton = document.getElementById('recipe-quit-button')
    quitButton.remove()
    const cookingGameDiv = document.getElementById('cooking-game-container')
    const EndGameLine1 = document.createElement('h2')
    EndGameLine1.textContent = `The Game is Over. Out of ${ingredientTotal} Total Ingredients, you correctly entered ${ingredientScore}.`
    const EndGameLine2 = document.createElement('h3')
    EndGameLine2.textContent = `If you would like more information about a specific recipe, click the link below its photo.`
    const EndGameLine3 = document.createElement('p')
    EndGameLine3.textContent = "Note that recipe information will not be saved on Name'Em."
    const newGameButton = document.createElement('button')
    newGameButton.className = 'pick-another-game-button'
    newGameButton.textContent = "Play Another Game"
    const spacingP = document.createElement('p')
    cookingGameDiv.prepend(spacingP)
    cookingGameDiv.prepend(newGameButton)
    cookingGameDiv.prepend(EndGameLine3)
    cookingGameDiv.prepend(EndGameLine2)
    cookingGameDiv.prepend(EndGameLine1)
    const recipeDivs= document.getElementsByClassName('div-for-single-recipe')
    for (let i=0; i<recipeDivs.length; i++) {
        const id = recipeDivs[i].dataset.websiteid
        const button = recipeDivs[i].querySelector('button')
        button.disabled = true
        const linkToWebsite = document.createElement('a')
        linkToWebsite.href = `${recipeDivs[i].dataset.sourceurl}`
        linkToWebsite.textContent = `Click Here for More Information on ${recipeDivs[i].dataset.name}`
        const nameHeader = recipeDivs[i].querySelector('h3')
        const pSpace = document.createElement('p')
        nameHeader.append(pSpace)
        nameHeader.append(linkToWebsite)
        const ulIncorrect = document.createElement('ul')
        recipeDivs[i].append(ulIncorrect)
        for (let count=0; count<recipeHash[id].length; count++) {
            const missedLi = document.createElement('li')
            missedLi.textContent = `Other Ingredient: ${recipeHash[id][count]}`
            ulIncorrect.appendChild(missedLi)
        }
    }
    let rawScore = parseFloat(ingredientScore) * 100 / parseFloat(ingredientTotal)
    const editButton = document.getElementById("edit-user-info")
    const userNameArray = editButton.dataset.username.split('-')
    const userName = userNameArray.join(' ')
    const userId = parseInt(editButton.dataset.userid)
    if (rawScore === 0) {
        rawScore = 1
    }

    if (gameLevel === "Easy") {
        const finalScore = Math.round(rawScore)
        fetchCreateGame(userId, recipeGameId, finalScore, userName, "Recipes")
        
    } else if (gameLevel === "Medium") {
        const finalScore = Math.round(rawScore * 1.4)
        fetchCreateGame(userId, recipeGameId, finalScore, userName, "Recipes")

    } else if (gameLevel === "Hard") {
        const finalScore = Math.round(rawScore * 2)
        fetchCreateGame(userId, recipeGameId, finalScore, userName, "Recipes")
    } else if (gameLevel === "Impossible") {
        const finalScore = Math.round(rawScore * 6)
        fetchCreateGame(userId, recipeGameId, finalScore, userName, "Recipes")
    }
}


//Add Real Estate Main information to the div
function addToRealEstateContainerDiv(saleOrRent, city, state, zipCode, answerRange) {
    const realEstateDiv = document.getElementById('real-estate-game-container')
    if (!!realEstateDiv.children) {
     removeChildren(realEstateDiv)
    }
    const realEstateH = document.createElement('h2')
    realEstateH.textContent = `Properties for ${saleOrRent} in ${city}, ${state} ${zipCode}:`
    const rEScoreCount = document.createElement('h3')
    rEScoreCount.id = 'real-estate-score-tracker'
    rEScoreCount.dataset.correctentries = 0
    rEScoreCount.dataset.saleorrent = `${saleOrRent}`
    const realEstateUl = document.createElement('ul')
    realEstateUl.id = "real-estate-game-ul"
    const quitButton = document.createElement('button')
    quitButton.textContent = 'Quit This Game'
    quitButton.id = 'real-estate-quit-button'
    const thisGameRange = document.createElement('h3')
    thisGameRange.textContent = `See how many properties you can estimate within a range of $${answerRange}.`
    const instructions= document.createElement('h3')
    instructions.textContent = 'Click on an address to see its photo and submit your estimates.'
    realEstateDiv.appendChild(quitButton)
    realEstateDiv.appendChild(realEstateH)
    realEstateDiv.appendChild(instructions)
    realEstateDiv.appendChild(thisGameRange)
    realEstateDiv.appendChild(rEScoreCount)
    realEstateDiv.appendChild(realEstateUl)
}

//real estate fetch depends on looking at properties for sale or for rent
function fetchRealEstate(saleOrRent, location, state, zipCode, answerRange, difficulty) {
    if (saleOrRent === 'sale') {
        fetch(realEstateSalesURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                zip_code: zipCode,
                location: location,
                state: state
            })
        })
        .then(response => response.json())
        .then(data => handleListingData(data, answerRange, difficulty))
        .catch(err => {
            alert(err);
        });

    } else {
        fetch(realEstateRentalsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                zip_code: zipCode,
                location: location,
                state: state
            })
        })
        .then(response => response.json())
        .then(data => handleRentalData(data, answerRange, difficulty))
        .catch(err => {
            alert(err);
        });
    }
}

//take care of rental data. Reset variables to track the scores
function handleRentalData(data, answerRange, difficulty) {
    realEstatePropertyCount = 0
    realEstateScore = 0
    realEstateTotalPrice = 0
    realEstateGameType = "Rental"
    realEstateRange = answerRange
    const realEstateDiv = document.getElementById('real-estate-game-container')
    realEstateDiv.style.display = 'block'
    const gameSetUpDiv = document.getElementById("select-real-estate-game")
    gameSetUpDiv.style.display = 'none'

    for (let i=0; i < data['properties'].length; i++) {
        if (realEstatePropertyCount === 20) {
            break;
        }
        if (!!data['properties'][i]["price"]===true && !!data['properties'][i]['photos'][4]===true) {
        
            const line1 = data['properties'][i]["address"]["line"] 
            const city = data['properties'][i]["address"]["city"]
            const state = data['properties'][i]["address"]["state"]
            const zipcode = data['properties'][i]["address"]["postal_code"]
            const address = `${line1}, ${city}, ${state} ${zipcode}`
            let bedsAndBaths = 'No listed Beds and Baths'
            if (!!data['properties'][i]['beds']) {
                bedsAndBaths = `Beds: ${data['properties'][i]['beds']}`
            }
            if (!!data['properties'][i]['beds'] === true && !!data['properties'][i]['baths'] == true) {
                bedsAndBaths = `Beds: ${data['properties'][i]['beds']} - Baths: ${data['properties'][i]['baths']}`
            } 

            const realEstateUl = document.getElementById("real-estate-game-ul")
            const realEstateLi = document.createElement('li')
            realEstateLi.className = 'properties-searched-for-re'
            realEstateLi.dataset.price = data['properties'][i]["price"]
            realEstateLi.dataset.weburl = data['properties'][i]['rdc_web_url']
            realEstateLi.dataset.image = data['properties'][i]['photos'][0]['href']
            realEstateLi.dataset.imagetwo = data['properties'][i]['photos'][1]['href']
            realEstateLi.dataset.imagethree = data['properties'][i]['photos'][2]['href']
            realEstateLi.dataset.imagefour = data['properties'][i]['photos'][3]['href']
            realEstateLi.dataset.imagefive = data['properties'][i]['photos'][4]['href']
            realEstateLi.dataset.rental = 'yes'
            realEstateLi.dataset.address = address
            realEstateLi.dataset.status = "incorrect"
            realEstateLi.dataset.bedsandbaths = bedsAndBaths
            realEstateLi.textContent = address
            realEstateUl.appendChild(realEstateLi)
            realEstateTotalPrice = realEstateTotalPrice + parseInt(data['properties'][i]["price"])
            realEstatePropertyCount = realEstatePropertyCount + 1
        }
    }
    const rEScoreCount = document.getElementById('real-estate-score-tracker')
    rEScoreCount.textContent = `Total Properties: ${realEstatePropertyCount} - Total Correct Entries: 0`
    if (difficulty === 'Easy') {
        gameLevel = "Easy"
        startTimer(901, 'realestate', 'playGame')
    }
    else if (difficulty === 'Medium') {
        gameLevel = "Medium"
        startTimer(361, 'realestate', 'playGame')
    } else if (difficulty === 'Hard') {
        gameLevel = "Hard"
        startTimer(181, 'realestate', 'playGame')
    } else if (difficulty === 'Impossible') {
        gameLevel = "Impossible"
        startTimer(31, 'realestate', 'playGame')
    }
}


//take care of for sale data. Reset variables that will track scores
function handleListingData(data, answerRange, difficulty) {
    realEstatePropertyCount = 0
    realEstateScore = 0
    realEstateTotalPrice = 0
    realEstateGameType = "Sale"
    realEstateRange = answerRange
    const realEstateDiv = document.getElementById('real-estate-game-container')
    realEstateDiv.style.display = 'block'
    const gameSetUpDiv = document.getElementById("select-real-estate-game")
    gameSetUpDiv.style.display = 'none'

    for (let i=0; i < data['properties'].length; i++) {
        if (realEstatePropertyCount === 20) {
            break;
        }
        if (!!data['properties'][i]["price"]===true && !!data['properties'][i]['thumbnail']===true) {
        
            const line1 = data['properties'][i]["address"]["line"] 
            const city = data['properties'][i]["address"]["city"]
            const state = data['properties'][i]["address"]["state"]
            const zipcode = data['properties'][i]["address"]["postal_code"]
            const address = `${line1}, ${city}, ${state} ${zipcode}`
            let bedsAndBaths = 'No listed Beds and Baths'
            if (!!data['properties'][i]['beds']) {
                bedsAndBaths = `Beds: ${data['properties'][i]['beds']}`
            }
            if (!!data['properties'][i]['beds'] === true && !!data['properties'][i]['baths'] == true) {
                bedsAndBaths = `Beds: ${data['properties'][i]['beds']} - Baths: ${data['properties'][i]['baths']}`
            } 

            const realEstateUl = document.getElementById("real-estate-game-ul")
            const realEstateLi = document.createElement('li')
            realEstateLi.className = 'properties-searched-for-re'
            realEstateLi.dataset.price = data['properties'][i]["price"]
            realEstateLi.dataset.weburl = data['properties'][i]['rdc_web_url']
            realEstateLi.dataset.image = data['properties'][i]['thumbnail']
            realEstateLi.dataset.address = address
            realEstateLi.dataset.status = "incorrect"
            realEstateLi.dataset.bedsandbaths = bedsAndBaths
            realEstateLi.textContent = address
            realEstateUl.appendChild(realEstateLi)
            realEstateTotalPrice = realEstateTotalPrice + parseInt(data['properties'][i]["price"])
            realEstatePropertyCount = realEstatePropertyCount + 1
        }
    }
    const rEScoreCount = document.getElementById('real-estate-score-tracker')
    rEScoreCount.textContent = `Total Properties: ${realEstatePropertyCount} - Total Correct Entries: 0`
    if (difficulty === 'Easy') {
        gameLevel = "Easy"
        startTimer(901, 'realestate', 'playGame')
    }
    else if (difficulty === 'Medium') {
        gameLevel = "Medium"
        startTimer(361, 'realestate', 'playGame')
    } else if (difficulty === 'Hard') {
        gameLevel = "Hard"
        startTimer(181, 'realestate', 'playGame')
    } else if (difficulty === 'Impossible') {
        gameLevel = "Impossible"
        startTimer(31, 'realestate', 'playGame')
    }
}
//for rent or for sale, the property is added to the DOM on the Show Div if it is clicked
function renderProperty(realEstateLi) {
    const mainDiv = document.getElementById('real-estate-show')
    mainDiv.style.display = "block"

    if(!!mainDiv.children) {
        removeChildren(mainDiv)
    }
    const showDiv = document.createElement('div')
    showDiv.className = 'container-fluid text-right'
    mainDiv.appendChild(showDiv)
    if (realEstateLi.dataset.rental === "yes") {
        showDiv.innerHTML = `
                            <img src='${realEstateLi.dataset.image}'>
                            <img src='${realEstateLi.dataset.imagetwo}'>
                            <img src='${realEstateLi.dataset.imagethree}'>
                            <img src='${realEstateLi.dataset.imagefour}'>
                            <img src='${realEstateLi.dataset.imagefive}'>
                            <h3 class='text-center'>${realEstateLi.dataset.address}</h3>
                            <h4 class='text-center'>${realEstateLi.dataset.bedsandbaths}</h4>
                            `
    } else {
        showDiv.innerHTML = `
                            <img src='${realEstateLi.dataset.image}'>
                            <h3 class='text-center'>${realEstateLi.dataset.address}</h3>
                            <h4 class='text-center'>${realEstateLi.dataset.bedsandbaths}</h4>
                            `
    }
    if (realEstateLi.dataset.status === "correct") {
        showDiv.innerHTML += `<h4 class='text-center'>Correctly Estimated! Actual Listed Price: ${realEstateLi.dataset.price}</h4><br><br><br><br>`
    } else if (realEstateLi.dataset.status === "gameoverincorrect") {
        showDiv.innerHTML += `
                            <h4 class='text-center'>Actual Listed Price: ${realEstateLi.dataset.price}</h4>
                            <a href="${realEstateLi.dataset.weburl}">Click here to see this Property's Website</a>
                            <br><br><br><br>`
    } else if (realEstateLi.dataset.status === "gameovercorrect") {
        showDiv.innerHTML += `
                            <h4 class='text-center'>Correctly Estimated! Actual Listed Price: ${realEstateLi.dataset.price}</h4>
                            <a href="${realEstateLi.dataset.weburl}">Click here to see this Property's Website</a>
                            <br><br><br><br>
                            `
    } else if (realEstateGameType === "Sale"){
        showDiv.innerHTML += `<form class='text-center' id='real-estate-user-guesses' data-address='${realEstateLi.dataset.address}' data-price='${realEstateLi.dataset.price}'>
                                <label>Enter Estimate in thousands (Entering '1' will calculate a price of $1,000)</label><br><br>
                                <label for="guesses">Listing Price:</label>
                                <input type='number' name="guesses" placeholder="Enter Number Here" value="">
                                <label for=guesses>,000</label>
                                <button type="submit" value="Submit">Submit Estimate</button>`
    } else if (realEstateGameType === "Rental") {
        showDiv.innerHTML += `<form class='text-center' id='real-estate-user-guesses' data-address='${realEstateLi.dataset.address}' data-price='${realEstateLi.dataset.price}'>
                            <label for="guesses">Rental Price:</label>
                            <input type='number' name="guesses" placeholder="Enter Number Here" value="">
                            <button type="submit" value="Submit">Submit Estimate</button>`
    }
   
}

//after looking at the submit event of a form, checking if the guess matches the price range
function checkRealEstateGuess(guess, price, address) {
    if (realEstateGameType === "Sale") {
        guess = guess * 1000
    }
    const maxrange = parseInt(price) + parseInt(realEstateRange)
    const minrange = parseInt(price) - parseInt(realEstateRange)
    if (guess >= minrange && guess <= maxrange) {
        renderCorrectREGuess(address)
    }
}
//if the price is a match, render the answer to the DOM
function renderCorrectREGuess(address) {
    realEstateScore = realEstateScore + 1
    const rEScoreCount = document.getElementById('real-estate-score-tracker')
    rEScoreCount.textContent = `Total Properties: ${realEstatePropertyCount} - Total Correct Entries: ${realEstateScore}`
    const gameContainer = document.getElementById('real-estate-game-container')
    const guessLi = gameContainer.querySelector(`li[data-address="${address}"]`)
    guessLi.dataset.status = "correct"
    guessLi.textContent += `  - Price Correctly Estimated! - Actual Listed Price: $${guessLi.dataset.price}`
    const showContainer = document.getElementById('real-estate-show')
    const submitForm = showContainer.querySelector('form')
    submitForm.remove()
    showContainer.innerHTML += `<h4>Correctly Estimated! - Actual Listed Price: $${guessLi.dataset.price}</h4><br><br><br><br>`
}


//end game function for Real Estate Game
function realEstateEndGame() {
    document.getElementById("game-timer-div").style.display = 'none'
    const showDiv = document.getElementById('real-estate-show')
    const form = showDiv.querySelector('form')
    if (!!form) {
        form.remove()
    }
    const realEstateDesc = document.getElementById('real-estate-game-description')
    realEstateDesc.style.display = "none"
    const quitButton = document.getElementById('real-estate-quit-button')
    quitButton.remove()
    const realEstateDiv = document.getElementById('real-estate-game-container')
    const gameUl = realEstateDiv.querySelector('ul')
    const gameUlChildrenArray = Array.from(gameUl.children)
    gameUlChildrenArray.forEach(child => {
        if (child.dataset.status === "incorrect") {
            child.dataset.status = "gameoverincorrect"
            child.textContent += ` - Listed Price: $${child.dataset.price}`
        } else {
            child.dataset.status = "gameovercorrect"
        }
    })

    const instructions = realEstateDiv.querySelector('h3')
    const thisGameResults = instructions.nextElementSibling
    const thisGameScoreCounter = thisGameResults.nextElementSibling

    instructions.textContent = `The Game is Over. Out of ${realEstatePropertyCount} properties, you correctly estimated ${realEstateScore} listed prices.`
    thisGameResults.textContent = `If you would like more information about a specific property, click its address.`
    thisGameScoreCounter.textContent = `You will find a link to the property's website below its photo.`
    const warning = document.createElement('p')
    warning.textContent = "Note that property information will not be saved on Name'Em."
    thisGameScoreCounter.append(warning)
    const newGameButton = document.createElement('button')
    newGameButton.className = 'pick-another-game-button'
    newGameButton.textContent = "Play Another Game"
    const newP = document.createElement('p')
    newP.append(newGameButton)
    warning.append(newP)   

    if (realEstatePropertyCount === 0) {

    } else {
        let rawScore = parseFloat(realEstateScore) * 100 / parseFloat(realEstatePropertyCount)
        let priceAverage = parseFloat(realEstateTotalPrice) / parseFloat(realEstatePropertyCount)
        if (rawScore === 0) {
            rawScore = 1
        }
        if (realEstateRange > priceAverage) {
            rawScore = rawScore / 10 
        } else if ((realEstateRange * 2) > priceAverage) {
            rawScore = rawScore / 3
        } else if ((realEstateRange * 3) > priceAverage) {
            rawScore = rawScore / 2
        } else if ((realEstateRange * 4) > priceAverage) {
            rawScore = rawScore * 2 / 3
        }
        const editButton = document.getElementById("edit-user-info")
        const userNameArray = editButton.dataset.username.split('-')
        const userName = userNameArray.join(' ')
        const userId = parseInt(editButton.dataset.userid)
    
        if (gameLevel === "Easy") {
            const finalScore = Math.round(rawScore)
            fetchCreateGame(userId, realEstateGameId, finalScore, userName, "Real Estate")
            
        } else if (gameLevel === "Medium") {
            const finalScore = Math.round(rawScore * 1.4)
            fetchCreateGame(userId, realEstateGameId, finalScore, userName, "Real Estate")

        } else if (gameLevel === "Hard") {
            const finalScore = Math.round(rawScore * 2)
            fetchCreateGame(userId, realEstateGameId, finalScore, userName, "Real Estate")
        } else if (gameLevel === "Impossible") {
            const finalScore = Math.round(rawScore * 6)
            fetchCreateGame(userId, realEstateGameId, finalScore, userName, "Real Estate")
        }
    }
}
   

//fetch of baseball players
function fetchBaseball(teamId, year, difficulty) {
    fetch(`http://lookup-service-prod.mlb.com/json/named.roster_team_alltime.bam?start_season=${year}&end_season=${year}&team_id=${teamId}`)
    .then(resp => resp.json())
    .then(baseballData => parseBaseballData(baseballData, difficulty))
    .catch(error => alert(error))
}

//looking through the baseball data. Putting general information in DOM. Resetting global variables.
function parseBaseballData(data, difficulty) {
    baseballNameArray = []
    baseballMatches = []
    const baseballDiv = document.getElementById('baseball-game-container')
    baseballDiv.style.display = 'block'
    const gameSetUpDiv = document.getElementById("select-baseball-game")
    gameSetUpDiv.style.display = 'none'
    const baseballScoreCount = document.getElementById('baseball-score-tracker')
    baseballScoreCount.textContent = `Total Players: ${data["roster_team_alltime"]["queryResults"]["row"].length} - Total Correct Entries: 0`
    baseballScoreCount.dataset.rostersize = data["roster_team_alltime"]["queryResults"]["row"].length

    data["roster_team_alltime"]["queryResults"]["row"].forEach(player => {
        addPlayerName(player)
    })
    if (difficulty === 'Easy') {
        gameLevel = "Easy"
        startTimer(901, 'baseball', 'playGame')
    }
    else if (difficulty === 'Medium') {
        gameLevel = "Medium"
        startTimer(361, 'baseball', 'playGame')
    } else if (difficulty === 'Hard') {
        gameLevel = "Hard"
        startTimer(181, 'baseball', 'playGame')
    } else if (difficulty === 'Impossible') {
        gameLevel = "Impossible"
        startTimer(31, 'baseball', 'playGame')
    }
}

//add player name to the player array
function addPlayerName(player) {
    const playerName = player["name_first_last"]
    baseballNameArray.push(playerName)
}

//Check if the submitted name by the user matches the player array
function renderBaseballMatches(guess, nameArray) {
    for (let i=0; i<nameArray.length; i++) {
        const nameBrokenUp = nameArray[i].split(' ')
        if (nameBrokenUp.length === 2) {
            if (guess.toLowerCase() === nameArray[i].toLowerCase() || guess.toLowerCase() === nameBrokenUp[1].toLowerCase()) {
                baseballMatches.push(nameArray[i])
                renderPlayerLi(nameArray[i])
                baseballNameArray.splice(i, 1)
            } 
        } else if (nameBrokenUp.length === 3) {
            if (guess.toLowerCase() === nameArray[i].toLowerCase() || guess.toLowerCase() === nameBrokenUp[2].toLowerCase() || guess.toLowerCase() === nameBrokenUp[1].toLowerCase() || guess.toLowerCase() === `${nameBrokenUp[1].toLowerCase()} ${nameBrokenUp[2].toLowerCase()}`) {
                baseballMatches.push(nameArray[i])
                renderPlayerLi(nameArray[i])
                baseballNameArray.splice(i, 1)
            }
        } else {
            if (guess.toLowerCase() === nameArray[i].toLowerCase()) {
                baseballMatches.push(nameArray[i])
                renderPlayerLi(nameArray[i])
                baseballNameArray.splice(i, 1)
            } else {
                for (let count=0; count<nameBrokenUp.length; count++) {
                    if (guess.toLowerCase() === nameBrokenUp[count].toLowerCase()) {
                        baseballMatches.push(nameArray[i])
                        renderPlayerLi(nameArray[i])
                        baseballNameArray.splice(i, 1)
                    }
                }
            }
        }
    }
}

//if there is a match between the user entry and the player name, render the name to the DOM
function renderPlayerLi(name) {
    const playerNameLi = document.createElement('li')
    playerNameLi.textContent = `${name}`
    playerNameLi.dataset.status = 'guessed'
    const baseballUl = document.getElementById('baseball-team-roster-ul')
    baseballUl.appendChild(playerNameLi)
    const baseballScoreCount = document.getElementById('baseball-score-tracker')
    baseballScoreCount.dataset.correctentries = parseInt(baseballScoreCount.dataset.correctentries) + 1
    baseballScoreCount.textContent = `Total Players: ${baseballScoreCount.dataset.rostersize} - Total Correct Entries: ${baseballScoreCount.dataset.correctentries}`
}

//When the game is over, render all non-entered players onto the DOM
function renderMissedPlayer(name) {
    const playerNameLi = document.createElement('li')
    playerNameLi.textContent = `${name}`
    const baseballUl = document.getElementById('missed-baseball-ul')
    baseballUl.appendChild(playerNameLi)
}

//often used function to clear out a Div's children before adding elements
function removeChildren(div) {
    const divChildArray = Array.from(div.children)
    divChildArray.forEach(child => child.remove())
}

//Make all the divs Hide when starting a new search for a new game
function makeDivsHide() {
    document.getElementById('cooking-game-description').style.display = 'none'
    document.getElementById('select-cooking-game').style.display = 'none'
    document.getElementById('baseball-game-rules').style.display = 'none'
    document.getElementById('select-baseball-game').style.display = 'none'
    document.getElementById('real-estate-game-description').style.display = 'none'
    document.getElementById('select-real-estate-game').style.display = 'none'
    document.getElementById('baseball-game-container').style.display = 'none'
    document.getElementById('real-estate-game-container').style.display = 'none'
    document.getElementById('real-estate-show').style.display = 'none'
    document.getElementById('cooking-game-container').style.display = 'none'
    document.getElementById('complete-leader-board').style.display = 'none'
    document.getElementById('user-game-archives').style.display = 'none'
    document.getElementById("music-game-container").style.display = 'none'
    document.getElementById("game-timer-div").style.display = 'none'
}

function hideDivsExceptNavandUsername() {
    document.getElementById('cooking-game-description').style.display = 'none'
    document.getElementById('select-cooking-game').style.display = 'none'
    document.getElementById('baseball-game-rules').style.display = 'none'
    document.getElementById('select-baseball-game').style.display = 'none'
    document.getElementById('real-estate-game-description').style.display = 'none'
    document.getElementById('select-real-estate-game').style.display = 'none'
    document.getElementById('baseball-game-container').style.display = 'none'
    document.getElementById('real-estate-game-container').style.display = 'none'
    document.getElementById('real-estate-show').style.display = 'none'
    document.getElementById('cooking-game-container').style.display = 'none'
    document.getElementById('complete-leader-board').style.display = 'none'
    document.getElementById('user-game-archives').style.display = 'none'
    document.getElementById("music-game-container").style.display = 'none'
    document.getElementById("game-timer-div").style.display = 'none'
    document.getElementById('user-info-show').style.display = 'none'
    document.getElementById('music-game-description').style.display= 'none'
    document.getElementById('select-music-game').style.display= 'none'
    document.getElementById('song-game-show').style.display = 'none'
    document.getElementById('just-signed-in').style.display = 'none'
}

function startTimer(countStart, gameCategory, quitGame) {
    document.getElementById("game-timer-div").style.display = 'block'
    counter = countStart
    let timer = setInterval(function(){
        decrementCounter()
    }, 1000)
    const counterDiv = document.getElementById('game-timer-div')
    const counterHeader = counterDiv.querySelector('h1')
    counterHeader.dataset.game = `${gameCategory}`
    
    function decrementCounter(){
        const counterDiv = document.getElementById('game-timer-div')
        const counterHeader = counterDiv.querySelector('h1')
        counter = counter - 1 
        let minutes = Math.floor(counter / 60)
        let seconds = counter % 60
        let formattedSeconds = ("0" + seconds.toString()).slice(-2);
        counterHeader.textContent = `${minutes}:${formattedSeconds}`
        if (counter === 0) {
            clearInterval(timer)
            counterHeader.textContent = "0:00"
            if (counterHeader.dataset.game === 'baseball') {
                endBaseballGame()
            } else if (counterHeader.dataset.game === 'realestate') {
                realEstateEndGame()
            } else if (counterHeader.dataset.game === 'music') {
                musicEndGame()
            } else if (counterHeader.dataset.game === 'cooking') {
                recipeEndGame()
            }
        }
        // if (n === 5 && counter <= 5) { 
        //     clearInterval(timer)
        //     counterHeader.textContent = "0:00"
        //     if (counterHeader.dataset.game === 'baseball') {
        //         endBaseballGame()
        //     } else if (counterHeader.dataset.game === 'realestate') {
        //         realEstateEndGame()
        //     } else if (counterHeader.dataset.game === 'music') {
        //         musicEndGame()
        //     } else if (counterHeader.dataset.game === 'cooking') {
        //         recipeEndGame()
        //     }
        // }
    }
    if (quitGame === "quitGame") {
        clearInterval(timer)
    } 
}




function fetchCreateGame(userId, gameId, finalScore, userName, gameName) {
    fetch(scoresheetsURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(
            {
                "user_id": userId,
                "game_id": gameId,
                "score": finalScore,
                "username": `${userName}`,
                "game_name": `${gameName}`
            }
        )
    })
    .then(resp => resp.json())
    .then(data => data)
    .catch(error => alert(error))
}


