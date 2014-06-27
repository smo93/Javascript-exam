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

    function startTimer(event) {
        var startTime, finishTime,
            message = event.data.message;
        clearInterval(intervalId);

        userTime = [parseInt($('#minutes').val()), parseInt($('#seconds').val())];
        if(isNaN(userTime[0])) { userTime[0] = 0; }
        if(isNaN(userTime[1])) { userTime[1] = 0; }

        if(event.data.startTime === "user input")
            { startTime = userTime.slice(0); finishTime = event.data.finishTime.slice(0); }
        if(event.data.finishTime === "user input")
            { startTime = event.data.startTime.slice(0); finishTime = userTime.slice(0); }

        time = startTime;

        updateTime();

        intervalId = setInterval(function() {
            event.data.timeHandler();
            updateTime();

            if(time[0] === finishTime[0] && time[1] === finishTime[1]) {
                alert(message);
                clearInterval(intervalId);
            }
        }, 1000);

    }

    $('#count-up').on('click',
        {
            timeHandler: increaseTime,
            startTime: [0, 0],
            finishTime: "user input",
            message: "Time reached!" 
        },
        startTimer);

    $('#count-down').on('click',
        {
            timeHandler: decreaseTime,
            startTime: "user input",
            finishTime: [0, 0],
            message: "Time's up!"
        },
        startTimer);

    $('#stop').on('click', function() {
        clearInterval(intervalId);

        time = [0, 0];
        updateTime();
    });
});
