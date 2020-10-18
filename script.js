var winner = {};
var newCandidate = function(candidateName, partyColor)
  {
    var candidate = {};
    candidate.name = candidateName;
    candidate.electionResults = null;
    candidate.votes = 0;
    candidate.partyColor = partyColor;

    candidate.announceCandidate = function()
    {
      console.log (this.name + " has entered the race!");
    };

    candidate.announceCandidate();

    return candidate;
  }

var candidate1 = newCandidate("Jane Doesitall",[132, 17, 11]);
var candidate2 = newCandidate("Betsy Rocks",[245, 141, 136]);

console.log (candidate1.name + "'s party color is " + candidate1.partyColor);
console.log (candidate2.name + "'s party color is " + candidate2.partyColor);

candidate1.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];
candidate2.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

candidate1.electionResults[9]=1;
candidate2.electionResults[9]=28;
candidate1.electionResults[4]=17;
candidate2.electionResults[4]=38;
candidate1.electionResults[43]=11;
candidate2.electionResults[43]=27;

console.log (candidate1.electionResults);
console.log (candidate2.electionResults);

var setStateResults = function(state){

  theStates[state].winner = null;

    if (candidate1.electionResults[state] > candidate2.electionResults[state]){
    theStates[state].winner = candidate1;
    }

    else if (candidate2.electionResults[state] > candidate1.electionResults[state]){
    theStates[state].winner = candidate2;
    }

  var stateWinner = theStates[state].winner;

  if (stateWinner !== null){
    theStates[state].rgbColor = stateWinner.partyColor;
    }

  else {
    theStates[state].rgbColor = [11,32,57]
  }

var stateInfoTable = document.getElementById('stateResults');
var header = stateInfoTable.children[0];
var body = stateInfoTable.children[1];
var stateName = header.children[0].children[0];
var abbrev = header.children[0].children[1];
var candidate1Name = body.children[0].children[0];
var candidate2Name = body.children[1].children[0];
var candidate1Results = body.children[0].children[1];
var candidate2Results = body.children[1].children[1];
var winnersName = body.children[2].children[1];

  stateName.innerText = theStates[state].nameFull;

  abbrev.innerText = theStates[state].nameAbbrev;

  candidate1Name.innerText = candidate1.name;
  candidate2Name.innerText = candidate2.name;


  candidate1Results.innerText = candidate1.electionResults[state];
  candidate2Results.innerText = candidate2.electionResults[state];

  if (candidate1.electionResults[state] > candidate2.electionResults[state]){
    winnersName.innerText = candidate1.name;
   }

  else if (candidate2.electionResults[state] > candidate1.electionResults[state]){
    winnersName.innerText = candidate2.name;}

  else {winnersName.innerText = "Tied result";}
}


candidate1.votes = function()
  {
    this.votes = 0;
      for (var i = 0; i < this.electionResults.length; i++)
        {
          this.votes = this.votes + this.electionResults[i];
          console.log (this.votes);
        }
}


candidate2.votes = function()
  {
    this.votes = 0;
      for (var i = 0; i < this.electionResults.length; i++)
        {
          this.votes = this.votes + this.electionResults[i];
          console.log (this.votes);
        }
}

candidate1.votes()

candidate2.votes()

if (candidate1.votes > candidate2.votes){
  winner = candidate1.name;
}

else if (candidate2.votes == candidate1.votes){
  winner = "It's a draw!";
}

else {winner = candidate2.name;}

console.log (winner);

var countryTable = document.getElementById ('countryResults');
  var row = countryTable.children[0].children[0];
  row.children[0].innerText = candidate1.name;
  row.children[1].innerText = candidate1.votes;
  row.children[2].innerText = candidate2.name;
  row.children[3].innerText = candidate2.votes;
  row.children[5].innerText = winner;