import { fifaData } from "./fifa.js";
console.log(fifaData);

// ⚽️ M  V P ⚽️ //

//  Task 1: Investigate the data above. Practice accessing data by console.log-ing the
// following pieces of data

// (a) Home Team name for 2014 world cup final

let daBest = fifaData.filter(
  (match) => match.Year === 2014 && match.Stage === "Final"
);

console.log(daBest[0]["Home Team Name"]);

// (b) Away Team name for 2014 world cup final

console.log(daBest[0]["Away Team Name"]);

// (c) Home Team goals for 2014 world cup final

console.log(daBest[0]["Home Team Goals"]);

// (d) Away Team goals for 2014 world cup final

console.log(daBest[0]["Away Team Goals"]);

// (e) Winner of 2014 world cup final

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an 
array of objects with only finals data */

function getFinals(data) {
  let daOtherBest = data.filter((match) => match.Stage === "Final");
  return daOtherBest;
}

console.log(getFinals(fifaData));
/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, 
and returns an array called `years` containing all of the years in the dataset */

function getYears(callMeBaby) {
  const finals = callMeBaby(fifaData);

  let finalYear = finals.map((years) => years["Year"]);

  return finalYear;
}

console.log(getYears(getFinals));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()`
 and determine the winner (home or away) of each `finals` game. Return the name of all winning countries 
 in an array called `winners` */

function getWinners(finalYears) {
  const finals = finalYears(fifaData);

  let winningScore = finals.map((wTeam) => {
    if (wTeam["Home Team Goals"] < wTeam["Away Team Goals"]) {
      return wTeam["Home Team Name"];
    } else {
      return wTeam["Away Team Name"];
    }
  });

  return winningScore;
}

console.log(getWinners(getFinals));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters 
and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(gTW, gTY) {
  const winners = gTW(getFinals);
  const years = gTY(getFinals);
  const answer = [];
  for (let i = 0; i < winners.length; i++) {
    answer.push(`In ${years[i]}, ${winners[i]} won the world cup!`);
  }
  return answer;
}
console.log(getWinnersByYear(getWinners, getYears));

/* Task 7: Create a function called `getCountryWins` that takes the parameters
`data` and `team initials` and returns the number of world cup wins that 
country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
  const winnersInitials = [];
  getFinals(data).forEach((match) => {
    if (match["Home Team Goals"] > match["Away Team Goals"])
      winnersInitials.push(match["Home Team Initials"]);
    else if (match["Home Team Goals"] < match["Away Team Goals"])
      winnersInitials.push(match["Away Team Initials"]);
    else {
      const winner = match["Win conditions"].split(" ")[0];
      const initials =
        match["Home Team Name"] === winner
          ? match["Home Team Initials"]
          : match["Away Team Initials"];
      winnersInitials.push(initials);
    }
  });
  console.log(winnersInitials);
  return winnersInitials.reduce((total, winnerInitial) => {
    return winnerInitial === teamInitials ? total + 1 : total;
  }, 0);
}

console.log(getCountryWins(fifaData, "BRA"));

/* Task 8: Write a function called `getAverageGoals` that accepts a 
parameter `data` and returns the the average number of home team goals 
and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */
function getAverageGoals(data) {
  const totalGoals = data.reduce((total, currentMatch) => {
    return (
      total + currentMatch["Away Team Goals"] + currentMatch["Home Team Goals"]
    );
  }, 0);
  return totalGoals / data.length;
}

console.log(getAverageGoals(fifaData).toFixed(1));

/// STRETCH 🥅 //

/* STRETCH 1: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
  /* code here */
}

getGoals();

/* STRETCH 2: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {
  /* code here */
}

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
