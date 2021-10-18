var taskArr = [];

var today= moment().format('dddd, MMMM Do');
$("#currentDay").text(today);

function auditTask(taskEl) {
    var hour = $(taskEl).attr("id");
    hour = parseInt(hour);
    var time = moment().set({'hour': hour-1, minute: 59});
    var pastTime = moment().set({'hour': hour+1, minute: 0});
    if (moment().isAfter(pastTime)) {
        taskEl.removeClass("bg-success bg-danger");
        taskEl.addClass("alert-dark");
    } else if (moment().isAfter(time)) {
        taskEl.removeClass("bg-success");
        taskEl.addClass("bg-danger");
    }
}

function checkTasks() {
    for (i=9; i<=17; i++) {
        var currentTaskString = '#'+i;
        var currentTask = $(currentTaskString)
        auditTask(currentTask);
    }
}

$(".hour").on("click","button", function() {
    console.log(this);
    var task = $(this).parent().find("textarea").val();
    var time = $(this).parent().find(".col-10").attr("id");
    taskArr.push({
        task: task,
        time: time
    });
    saveTasks();
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function loadTasks() {
    taskArr = JSON.parse(localStorage.getItem("tasks"));
    for(i=0; i<taskArr.length; i++) {
        var time = "#" + taskArr[i].time;
        var task = taskArr[i].task;
        console.log(time,task);
        $(time).val(task);
    }
}

setInterval(function(){
    checkTasks();
}, 60000);

loadTasks();


