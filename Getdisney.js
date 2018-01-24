var Themeparks = require('themeparks');

var disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();
var rideList = [2,3,17,20,26,35,39,41];

function waitTimes() {
    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass || i == 35) {
                console.log(ride.name + ";" + ride.waitTime);
            }
        }
    });
}

function fastTimes() {
    var d = new Date();
    var timeString = new String();
    var currentTime = d.getHours() + ":" + d.getMinutes();
    if (d.getMinutes() < '10') currentTime = d.getHours() + ":0" + d.getMinutes();
    var minutes = d.getMinutes() - (d.getMinutes() % 5);
    if (minutes < '10') minutes = '0' + minutes;
    timeString = (d.getHours() + 2) + ":" + minutes;
    var returnString = new String();


    disneyland.GetWaitTimes().then(function (rides,name) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass && ride.active) {
                if (ride.fastPassReturnTime.startTime <= timeString) {
                    console.log(currentTime + ";" + ride.name + ";" + ride.fastPassReturnTime.startTime);
                }
                else {
                    console.log(currentTime + ";" + ride.name + ";" + timeString);
                }
            }
            if (ride.fastPass && !ride.active) {
                console.log(currentTime + ";" + ride.name + ";" + "closed");
            }
        }
    });
}
fastTimes();
waitTimes();