var Themeparks = require('themeparks');

var disneyland = new Themeparks.Parks.DisneylandResortMagicKingdom();
var rideList = [2,3,17,26,35,39,40,41];

function getThemFastPasses() {
    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass && ride.status == 'Operating' || i == 35) {
                console.log(ride.name + ": " + ride.waitTime + " minutes wait. Index: " + i);
            }
        }
    });
}

function fastTimes() {
    var d = new Date();
    var timeString = new String();
    var minutes = d.getMinutes() - (d.getMinutes() % 5);
    if (minutes == '0') minutes = '00';
    timeString = (d.getHours() + 2) + ":" + minutes;
    var returnString = new String();

    disneyland.GetWaitTimes().then(function (rides) {
        for (var i = 0, ride; ride = rides[i++];) {
            if (ride.fastPass && ride.active) {
                if (ride.fastPassReturnTime.startTime <= timeString) {
                    flash("If you get a fastpass at " + ride.name + ", you can get a new fastpass at: " + ride.fastPassReturnTime.startTime);
                }
                else {
                    flash("If you get a fastpass at " + ride.name + ", you can get a new fastpass at: " + timeString);
                }
            }
        }
    });
}
// 34 is Pirates
fastTimes();
flash("is this working?");