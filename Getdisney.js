var Themeparks = require('themeparks');
var disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();

function waitTimes(currentTime) {
    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass || i == 35) {
                console.log("wait;" + currentTime + ";" + ride.name + ";" + ride.waitTime);
            }
        }
    });
}

function fastTimes(currentTime) {
    var d = new Date();
    var timeString = new String();
    var minutes = d.getMinutes() - (d.getMinutes() % 5);
    if (minutes < '10') minutes = '0' + minutes;
    timeString = (d.getHours() + 2) + ":" + minutes;
    var returnString = new String();


    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass && ride.active) {
                if (ride.fastPassReturnTime.startTime <= timeString) {
                    console.log("fast;" + currentTime + ";" + ride.name + ";" + ride.fastPassReturnTime.startTime);
                }
                else {
                    console.log("fast;" + currentTime + ";" + ride.name + ";" + timeString);
                }
            }
            if (ride.fastPass && !ride.active) {
                console.log(currentTime + ";" + ride.name + ";" + "closed");
            }
        }
    });
}
var d = new Date();
var currentTime = d.getHours() + ":" + d.getMinutes();
if (d.getMinutes() < '10') currentTime = d.getHours() + ":0" + d.getMinutes();

fastTimes(currentTime);
waitTimes(currentTime);