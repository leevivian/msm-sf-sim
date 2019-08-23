
var min = 1, max = 30;
let startSelect = document.getElementById('start-stars');
let endSelect = document.getElementById('end-stars');

// Starting Star Force can be 0 if the equipment has no stars on it
var startOption = document.createElement('option');
startOption.value = "0";
startOption.innerHTML = "0";
startSelect.appendChild(startOption);

for (var i = min; i <= max; i++) {
    var startOption = document.createElement('option');
    startOption.value = i.toString(10);
    startOption.innerHTML = i.toString(10);
    startSelect.appendChild(startOption);
    var endOption = startOption.cloneNode(true);
    endSelect.appendChild(endOption);
}

startSelect.removeChild(startSelect.lastChild);

checkValidStarInput();

class EnhancementTable {
    constructor() {
        this.et = new Map()
    }

    /**
     * @param {number} enhancementNumber 
     * @param {number} successRate
     * @param {number} maintainRate
     * @param {number} degradeRate
     * @param {number} destroyRate
     * @param {number} cost
     */
    addEntry(enhancementNumber, successRate, maintainRate, degradeRate, destroyRate, cost) {
        this.et.set(enhancementNumber, new Map([
            ["success", successRate],
            ["maintain", maintainRate],
            ["degraded", degradeRate],
            ["destroyed", destroyRate],
            ["cost", cost]
        ]))
    }
    
    getEnhancementNumber(n) {
        return this.et.get(n)
    }

    showTable() {
        console.log(this.et)
    }
}

var enhancementTable = new EnhancementTable();
enhancementTable.addEntry(1, 100, 0, 0, 0, 10000)
enhancementTable.addEntry(2, 95, 100, 0, 0, 15000)
enhancementTable.addEntry(3, 90, 100, 0, 0, 20000)
enhancementTable.addEntry(4, 85, 100, 0, 0, 55000)
enhancementTable.addEntry(5, 80, 100, 0, 0, 100000)
enhancementTable.addEntry(6, 75, 100, 0, 0, 200000)
enhancementTable.addEntry(7, 70, 100, 0, 0, 300000)
enhancementTable.addEntry(8, 65, 100, 0, 0, 400000)
enhancementTable.addEntry(9, 60, 100, 0, 0, 600000)
enhancementTable.addEntry(10, 55, 100, 0, 0,   800000)
enhancementTable.addEntry(11, 50, 85, 95, 100, 1000000)
enhancementTable.addEntry(12, 45, 85, 95, 100, 1400000)
enhancementTable.addEntry(13, 40, 80, 95, 100, 1800000)
enhancementTable.addEntry(14, 35, 80, 95, 100, 2200000)
enhancementTable.addEntry(15, 30, 75, 95, 100, 2600000)
enhancementTable.addEntry(16, 25, 75, 95, 100, 3000000)
enhancementTable.addEntry(17, 20, 70, 95, 100, 3500000)
enhancementTable.addEntry(18, 15, 70, 95, 100, 4000000)
enhancementTable.addEntry(19, 10, 65, 95, 100, 4500000)
enhancementTable.addEntry(20, 5, 65, 95, 100, 5000000)
enhancementTable.addEntry(21, 1, 50, 90, 100, 6000000)
enhancementTable.addEntry(22, 1, 50, 90, 100, 7000000)
enhancementTable.addEntry(23, 1, 50, 90, 100, 8000000)
enhancementTable.addEntry(24, 1, 50, 90, 100, 9000000)
enhancementTable.addEntry(25, 1, 50, 90, 100, 10000000)
enhancementTable.addEntry(26, 1, 40, 85, 100, 11800000)
enhancementTable.addEntry(27, 1, 40, 85, 100, 14900000)
enhancementTable.addEntry(28, 1, 40, 85, 100, 18000000)
enhancementTable.addEntry(29, 1, 40, 85, 100, 21100000)
enhancementTable.addEntry(30, 1, 40, 85, 100, 24200000)

// Getting "lucky" assumes an extra 5% is added to the probability of success, taken away from the
// probability of maintain.
function applyLuckMinigame() {}

function applyLuckyScroll() {}

function applyShieldScroll() {}

function applyShieldingScroll() {}

function getStarInputs() {
    var startStars = document.getElementById('start-stars') || Map();
    var startStarsValue = parseInt(startStars.options[startStars.selectedIndex].value, 10) || 0;

    var endStars = document.getElementById('end-stars') || Map();
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
        document.getElementById('start-simulation').disabled = true;
    } else {
        document.getElementById('start-simulation').disabled = false;
    }
}

function successfulAttempt(currentSf, totalAttempts) {
    return `
    <p>
    <b>Attempt ${totalAttempts}</b><br/>
    <span style='color:green'>Success!</span> SF ${currentSf} => SF ${currentSf + 1}
    </p>
    `
}

function maintainedAttempt(currentSf, totalAttempts) {
    return `
    <p>
    <b>Attempt ${totalAttempts} </b><br/>
    <span style='color:black'>Maintained!</span> SF ${currentSf} => SF ${currentSf}
    </p>
    `
}

function degradedAttempt(currentSf, totalAttempts) {
    return `
    <p>
    <b>Attempt ${totalAttempts} </b><br/>
    <span style='color:blue'>Degraded!</span> SF ${currentSf} => SF ${currentSf - 1}
    </p>
    `
}

function destroyedAttempt(currentSf, totalAttempts) {
    return `
    <p>
    <b>Attempt ${totalAttempts} </b><br/>
    <span style='color:red'>Destroyed!</span> SF ${currentSf}
    </p>
    `
}

function computeAttemptResult(n, nextEnhancement) {
    if (n < nextEnhancement.get("success")) {
        return "success"
    } else if (n < nextEnhancement.get("maintain")) {
        return "maintain"
    } else if (n < nextEnhancement.get("degraded")) {
        return "degraded"
    } else if (n < nextEnhancement.get("destroyed")) {
        return "destroyed"
    }
}

/**
 * Function to simulate the probabilities of star force enhancement,
 * given the start and end star force values from the user.
 */
function simulateEnhancement() {
    var simulationDisplay = document.getElementById('simulation-output');
    var starValues = getStarInputs();
    var currentMesos = 0;
    var totalAttempts = 1;
    var currentSf = starValues.get('start');
    var destroyed = false;

    simulationDisplay.innerHTML = "";
    
    while (currentSf < starValues.get('end') && !destroyed) {
        var nextEnhancement = enhancementTable.getEnhancementNumber(currentSf + 1);
        var randomNum = Math.floor(Math.random() * 100); // 0 - 99
        var attemptOutput = document.createElement('p');
        var attemptResult = computeAttemptResult(randomNum, nextEnhancement)
        currentMesos += nextEnhancement.get("cost");

        switch (attemptResult) {
        case "success":
            attemptOutput.innerHTML += successfulAttempt(currentSf, totalAttempts);
            currentSf++;
            break;
        case "maintain":
            attemptOutput.innerHTML += maintainedAttempt(currentSf, totalAttempts);
            break;
        case "degraded":
            attemptOutput.innerHTML += degradedAttempt(currentSf, totalAttempts);
            currentSf--;
            break;
        case "destroyed":
            attemptOutput.innerHTML += destroyedAttempt(currentSf, totalAttempts);
            destroyed = true;
            break
        }

        attemptOutput.innerHTML += "<br />" + "Total Mesos: " + currentMesos.toLocaleString() + "<br />";
        simulationDisplay.appendChild(attemptOutput);
        totalAttempts++;
    }

    document.getElementById('simulation-end').innerHTML =  "<b>----- End of Simulation -----</b>";
}

/**
 * Function to clear the logs outputted from the simulation.
 */
function clearOutput() {
    var simulationDisplay = document.getElementById('output');
    simulationDisplay.innerHTML = "";
}
