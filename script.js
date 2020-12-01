var localState = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
var collegeVotes = [9 , 3 , 11 , 6 , 55 , 9 , 7 , 3 , 3 , 29 , 16 , 4 , 4 , 20 , 11 , 6 , 6 , 8 , 8 , 4 , 10 , 11 , 16 , 10 , 6 , 10 , 3 , 5 , 6 , 4 , 14 , 5 , 29 , 15 , 3 , 18 , 7 , 7 , 20 , 4 , 9 , 3 , 11 , 38 , 6 , 3 , 13 , 12 , 5 , 10 , 3];
var winner = null;

//var politician = {name: "", electionResult: null, totalVotes: 0};


var newPolitician = function(name, color, elecRes, totalVotes, collegeVotes) {
  var politician = {};
  politician.name = name;
  politician.electionResult = elecRes;
  politician.totalVotes = totalVotes;
  politician.collegeVotes = collegeVotes;
  politician.color = color;

  politician.rollCall = function()
  {
    console.log("Name: " + this.name);
  };

  politician.rollCall();
  return politician;
};

// Create two candidates with their party colors (blue, red)
var biden = newPolitician("Biden", [52, 128, 250]);
var trump = newPolitician("Trump", [252, 68, 96]);


// Raw total votes election results from 52 states. Retrieved from Google US Election Results ticker, November 18, 2020
biden.elecRes = [843724, 153178, 1672054, 423579, 10933242, 1803921, 1080492, 296268, 307265, 5297045, 2472098, 366122, 287031, 3416660, 1242253, 759061, 551144, 772285, 856034, 430023, 1917406, 2328054, 2796702, 1716207, 533842, 1242851, 244833, 374172, 703486, 423291, 2509922, 501460, 3932096, 2684302, 114902, 2667742, 503890, 1334173, 3447561, 306192, 1091541, 150471, 1139289, 5236610, 560221, 242820, 2412867, 2361607, 235847, 1630716, 73491]
trump.elecRes = [1434315, 189112, 1661677, 760451, 5871037, 1364202, 714613, 200603, 18172, 5668731, 2458121, 196861, 554128, 2424395, 1729537, 897672, 752903, 1326418, 1255776, 359502, 960681, 1151836, 2650695, 1483551, 753739, 1711848, 343643, 555521, 669890, 365373, 1818206, 401815, 2929142, 2758775, 235595, 3137555, 1020280, 952776, 3365099, 199830, 1385103, 261043, 1849467, 5874547, 865015, 112704, 1962304, 1577621, 545051, 1610151, 193559]


// Georgia recount results retrieved from Google Georgia Election Results ticker, November 19, 2020 6:45pm PST
biden.elecRes[10] = 2475141; 
trump.elecRes[10] = 2462857;

//Tally up total popular vote for each candidate 

//Biden total votes
biden.totalVotes = function()
{
  this.totalVotes = 0;
  for (var i = 0; i < this.elecRes.length; i++) {
    this.totalVotes = this.totalVotes + this.elecRes[i];
    console.log (this.totalVotes);
  }
};
biden.totalVotes();

//Trump total votes
trump.totalVotes = function()
{
  this.totalVotes = 0;
  for (var i = 0; i < this.elecRes.length; i++) {
    this.totalVotes = this.totalVotes + this.elecRes[i];
    console.log (this.totalVotes);
  }
};
trump.totalVotes();

// Set winner of each state for map.js function setStateResults (line 344)

var setStateResults = function(state) {
  theStates[state].winner = null;
    if (biden.elecRes[state] > trump.elecRes[state]) {
      theStates[state].winner = biden; 
  } else if (biden.elecRes[state] < trump.elecRes[state]) {
    theStates[state].winner = trump;
  }
  
  // Change state color on map
  var stateWinner = theStates[state].winner;
  if (stateWinner !== null) {
    theStates[state].rgbColor = stateWinner.color;
  } else {
    theStates[state].rgbColor = [11,32,57];
  }
  // Populate side table with state results
  var stateResultsTable = document.getElementById("stateResults");
  var theader = stateResultsTable.children[0];
  var tbody = stateResultsTable.children[1];
  var stateName = theader.children[0].children[0];
  var stateECVotes = theader.children[0].children[1];
  var cand1Name = tbody.children[0].children[0];
  var cand1Res = tbody.children[0].children[1];
  var cand2Name = tbody.children[1].children[0];
  var cand2Res = tbody.children[1].children[1];
  var stateWinner = tbody.children[2].children[1];
  
  stateName.innerText = theStates[state].nameFull + " (" + theStates[state].nameAbbrev + ")";
  stateECVotes.innerText = theStates[state].electoralCollegeVotes;
  cand1Name.innerText = biden.name;
  cand2Name.innerText = trump.name;
  cand1Res.innerText = biden.elecRes[state];
  cand2Res.innerText = trump.elecRes[state];
  stateWinner.innerText = theStates[state].winner.name;
};

  


// Assign electoral college votes based on state election results

tallyCollegeVotes = function()
{
  biden.collegeVotes = 0;
  trump.collegeVotes = 0; 
  for (var i = 0; i < collegeVotes.length; i++) {
    if (biden.elecRes[i] > trump.elecRes[i]) {
      biden.collegeVotes = biden.collegeVotes + collegeVotes[i];
    //  State.winner = biden;
      console.log("Biden wins " + localState[i] + ": +" + collegeVotes[i] + " Electoral College Votes");
    //  console.log(State.winner);
    } else { trump.collegeVotes = trump.collegeVotes + collegeVotes[i];
    //  State.winner = trump;
      console.log("Trump wins " + localState[i] + ": +" + collegeVotes[i] + " Electoral College Votes");
    //  console.log(State.winner);
    }
  }
};
tallyCollegeVotes();

// Declare the winner based on electoral college results
var win = function()
{
  if (biden.collegeVotes > trump.collegeVotes) {
    console.log ("Biden wins! Biden: " + biden.collegeVotes + " Electoral College Votes" + " vs. Trump: " + trump.collegeVotes + " Electoral College Votes");
    winner = biden.name;
  } else { console.log ("Trump wins! Total college votes: " + trump.collegeVotes);
    winner = trump.name;
  }
};
win();

// Populate top table name1 results1 name2 results 2 winner name
var countryResultsTable = document.getElementById("countryResults");
countryResultsTable.children[0].children[0].children[0].innerText = biden.name;
countryResultsTable.children[0].children[0].children[1].innerText = biden.collegeVotes;
countryResultsTable.children[0].children[0].children[2].innerText = trump.name;
countryResultsTable.children[0].children[0].children[3].innerText = trump.collegeVotes;
countryResultsTable.children[0].children[0].children[5].innerText = winner;


;
