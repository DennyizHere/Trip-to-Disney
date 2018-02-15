var Themeparks = require('themeparks');
var disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();

function waitTimes(currentTime, date) {
    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if ((ride.fastPass || i == 35) && ride.active) {
                console.log("wait;" + date + ";" + currentTime + ";" + ride.name + ";" + ride.waitTime);
            }
            else if ((ride.fastPass || i == 35) && !ride.active) {
                console.log("wait;" + date + ";" + currentTime + ";" + ride.name + ";" + "closed");
            }
        }
    });
}

function fastTimes(currentTime, date) {
    var d = new Date();
    var timeString = new String();
    var minutes = d.getMinutes() - (d.getMinutes() % 5);
    if (minutes < '10') minutes = '0' + minutes;
    timeString = (d.getHours() + 2) + ":" + minutes;
    var returnString = new String();


    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass && ride.active) {
                if (ride.fastPassReturnTime == null) {
                    console.log("fast;" + date + ";" + currentTime + ";" + ride.name + ";" + "fastpasses ran out");
                    continue;
                }
                if (ride.fastPassReturnTime.startTime <= timeString) {
                    console.log("fast;" + date + ";" + currentTime + ";" + ride.name + ";" + ride.fastPassReturnTime.startTime);
                }
                else {
                    console.log("fast;" + date + ";" + currentTime + ";" + ride.name + ";" + timeString);
                }
            }
            if (ride.fastPass && !ride.active) {
                console.log("fast;" + date + ";" + currentTime + ";" + ride.name + ";" + "closed");
            }
        }
    });
}

//Compare the current time to the opening time of the park and return true or false, based on if the park is open.
function getOpeningTime (currentTime, date) {
    var open;

    var state = disneyland.GetOpeningTimes().then(function (times, state) {
        for (var i = 0, time; time = times[i++];) {
            if (time.type == "Operating" && time.date == date) {
                open = time.openingTime;
                open = open.substring(11,16);
                console.log(open);
                if (currentTime >= open) {
                    state = true;
                }
                else {
                    state = false;
                }
                if (open == null) {
                    state = false;
                }
            }
        }
    });
    return state;
}

//Compare the current time to the closing time of the park and return true or false, based on if the park is closed.
function getClosingTime (currentTime, date) {
    var close;

    var state = disneyland.GetOpeningTimes().then(function (times, state) {
        for (var i = 0, time; time = times[i++];) {
            if (time.type == "Operating" && time.date == date) {
                close = time.closingTime;
                close = close.substring(11,16);
                if (currentTime <= close) {
                    state = true;
                }
                else {
                    state = false;
                }
            }
        }
    });
    return state;
}

var d = new Date();
var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
if ((d.getMonth() + 1) < 10) date = d.getFullYear() + "-" + "0" + (d.getMonth() + 1) + "-" + d.getDate();
var currentTime = d.getHours() + ":" + d.getMinutes();
if (d.getMinutes() < '10') currentTime = d.getHours() + ":0" + d.getMinutes();

//Calls the functions to get information for rides
console.log(date + ";" + currentTime);
if (getOpeningTime(currentTime, date) && getClosingTime(currentTime, date)) {
    fastTimes(currentTime, date);
    waitTimes(currentTime, date);
}
else {
    console.log("no");
}
