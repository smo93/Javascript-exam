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

    $('#count-up').on('click', function() {
        clearInterval(intervalId);

        time = [0, 0];
        userTime = [parseInt($('#minutes').val()), parseInt($('#seconds').val())];
        if(isNaN(userTime[0])) { userTime[0] = 0; }
        if(isNaN(userTime[1])) { userTime[1] = 0; }

        updateTime();

        intervalId = setInterval(function() {
            increaseTime();
            updateTime();

            if(time[0] === userTime[0] && time[1] === userTime[1]) {
                alert('Hooray!');
                clearInterval(intervalId);
            }
        }, 1000);
    });

    $('#count-down').on('click', function() {
        clearInterval(intervalId);

        userTime = [parseInt($('#minutes').val()), parseInt($('#seconds').val())];
        if(isNaN(userTime[0])) { userTime[0] = 0; }
        if(isNaN(userTime[1])) { userTime[1] = 0; }
        time = userTime;

        updateTime();

        intervalId = setInterval(function() {
            decreaseTime();
            updateTime();

            if(time[0] === 0 && time[1] === 0) {
                alert('Ieiii! ^_^');
                clearInterval(intervalId);
            }
        }, 1000);
    });

    $('#stop').on('click', function() {
        clearInterval(intervalId);

        time = [0, 0];
        updateTime();
    });
});
