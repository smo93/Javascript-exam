$(document).ready(function() {
    var intervalId = 0,
        time = [0, 0],
        userTime = [0, 0];

    function increaseTime() {
        time[1] += 1;
        if(time[1] >= 60) {
            time[1] = 0;
            time[0] += 1;
        }
    }

    function decreaseTime() {
        time[1] -= 1;
        if(time[1] < 0) {
            time[1] = 59;
            time[0] -= 1;
        }
    }

    function updateTime() {
        $('#minute-first-digit').text(Math.floor(time[0] / 10).toString());
        $('#minute-second-digit').text((time[0] % 10).toString());

        $('#second-first-digit').text(Math.floor(time[1] / 10).toString());
        $('#second-second-digit').text((time[1] % 10).toString());
    }

    $('#count-up').on('click', { timeHandler: increaseTime, startTime: [0, 0], finishTime: "user input", message: "Time reached!" }, startTimer);

    $('#count-down').on('click', { timeHandler: decreaseTime, startTime: "user input", finishTime: [0, 0], message: "Time's up!" }, startTimer);

    function startTimer(event) {
        clearInterval(intervalId);

        userTime = [parseInt($('#minutes').val()), parseInt($('#seconds').val())];
        if(isNaN(userTime[0])) { userTime[0] = 0; }
        if(isNaN(userTime[1])) { userTime[1] = 0; }

        if(event.data.startTime === "user input") { event.data.startTime = userTime; }
        if(event.data.finishTime === "user input") { event.data.finishTime = userTime; }

        time = event.data.startTime;

        updateTime();

        intervalId = setInterval(function() {
            event.data.timeHandler();
            updateTime();

            if(time[0] === event.data.finishTime[0] && time[1] === event.data.finishTime[1]) {
                alert(event.data.message);
                clearInterval(intervalId);
            }
        }, 1000);

    }

    $('#stop').on('click', function() {
        clearInterval(intervalId);

        time = [0, 0];
        updateTime();
    });
});
