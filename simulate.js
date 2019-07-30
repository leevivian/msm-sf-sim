var min = 1, max = 30;
startSelect = document.getElementById('startStars');
endSelect = document.getElementById('endStars');

// Starting Star Force can be 0 if the equipment has no stars on it
var startOption = document.createElement('option');
startOption.value = 0;
startOption.innerHTML = "0";
startSelect.appendChild(startOption);

for (var i = min; i <= max; i++) {
    var startOption = document.createElement('option');
    startOption.value = i;
    startOption.innerHTML = i;
    startSelect.appendChild(startOption);
    var endOption = startOption.cloneNode(true);
    endSelect.appendChild(endOption);
}

checkValidStarInput();

var enhancementTable = new Map([
    [1, new Map([["success", 100], ["cost", 10000]])],
    [2, new Map([["success", 95], ["maintain", 5], ["degraded", 0], ["destroyed", 0], ["cost", 15000]])],
    [3, new Map([["success", 90], ["maintain", 10], ["degraded", 0], ["destroyed", 0], ["cost", 20000]])],
    [4, new Map([["success", 85], ["maintain", 15], ["degraded", 0], ["destroyed", 0], ["cost", 55000]])],
    [5, new Map([["success", 80], ["maintain", 20], ["degraded", 0], ["destroyed", 0], ["cost", 100000]])],
    [6, new Map([["success", 75], ["maintain", 25], ["degraded", 0], ["destroyed", 0], ["cost", 200000]])],
    [7, new Map([["success", 70], ["maintain", 30], ["degraded", 0], ["destroyed", 0], ["cost", 300000]])],
    [8, new Map([["success", 65], ["maintain", 35], ["degraded", 0], ["destroyed", 0], ["cost", 400000]])],
    [9, new Map([["success", 60], ["maintain", 40], ["degraded", 0], ["destroyed", 0], ["cost", 600000]])],
    [10, new Map([["success", 55], ["maintain", 45], ["degraded", 0], ["destroyed", 0], ["cost", 800000]])],
]);

var luckyEnhancementTable = new Map([
    [1, new Map([["success", 100], ["cost", 10000]])],
    [2, new Map([["success", 100], ["maintain", 0], ["degraded", 0], ["destroyed", 0], ["cost", 15000]])],
    [3, new Map([["success", 95], ["maintain", 5], ["degraded", 0], ["destroyed", 0], ["cost", 20000]])],
    [4, new Map([["success", 90], ["maintain", 10], ["degraded", 0], ["destroyed", 0], ["cost", 55000]])],
    [5, new Map([["success", 85], ["maintain", 15], ["degraded", 0], ["destroyed", 0], ["cost", 100000]])],
    [6, new Map([["success", 80], ["maintain", 20], ["degraded", 0], ["destroyed", 0], ["cost", 200000]])],
    [7, new Map([["success", 75], ["maintain", 25], ["degraded", 0], ["destroyed", 0], ["cost", 300000]])],
    [8, new Map([["success", 70], ["maintain", 30], ["degraded", 0], ["destroyed", 0], ["cost", 400000]])],
    [9, new Map([["success", 65], ["maintain", 35], ["degraded", 0], ["destroyed", 0], ["cost", 600000]])],
    [10, new Map([["success", 60], ["maintain", 40], ["degraded", 0], ["destroyed", 0], ["cost", 800000]])],
]);

function getStarInputs() {
    var startStars = document.getElementById('startStars') || Map();
    var startStarsValue = parseInt(startStars.options[startStars.selectedIndex].value, 10) || 0;

    var endStars = document.getElementById('endStars') || Map();
    var endStarsValue = parseInt(endStars.options[endStars.selectedIndex].value, 10) || 0;

    return new Map([['start', startStarsValue], ['end', endStarsValue]]);
}

/**
 * Function for enabling/disabling the button that starts the simulation.
 * Ensure the UI shows that the simulation can only be run if the start and end
 * input values are valid.
 */
function checkValidStarInput () {
    var starValues = getStarInputs();
    if (starValues.get('end') <= starValues.get('start')) {
        document.getElementById('startSimulation').disabled = true;
    } else {
        document.getElementById('startSimulation').disabled = false;
    }
}

/**
 * Function to simulate the probabilities of star force enhancement,
 * given the start and end star force values from the user.
 */
function simulateEnhancement () {
    var outputLog = document.getElementById('output');
    outputLog.innerHTML = "";
    var starValues = getStarInputs();
    console.log(starValues);
    var currentMesos = 0;
    var attempts = 1;
    var currentSf = starValues.get('start');
    while (currentSf < starValues.get('end')) {
        var nextEnhancement = enhancementTable.get(currentSf + 1);
        var randomNum = Math.floor(Math.random() * 100) + 1;
        var output1 = document.createElement('p');
        output1.innerHTML = "<b>Attempt " + attempts + "</b><br />";
        currentMesos += nextEnhancement.get("cost");
        if (randomNum < nextEnhancement.get("success")) {
            output1.innerHTML += "<span style='color:green'>Success!</span> SF" + currentSf + " => SF" + (currentSf + 1);
            currentSf++;
        } else {
            output1.innerHTML += "Maintained! SF" + currentSf + " => SF" + currentSf;
        }

        output1.innerHTML += "<br />" + "Total Mesos: " + currentMesos.toLocaleString() + "<br />";
        outputLog.appendChild(output1);
        attempts++;
    }

    var end = document.createElement('p');
    end.innerHTML = "<b>----- End of Simulation -----</b>";
    end.style.textAlign = 'center';
    outputLog.appendChild(end);
}

/**
 * Function to clear the logs outputted from the simulation.
 */
function clearOutput () {
    var outputLog = document.getElementById('output');
    outputLog.innerHTML = "";
}
