var alarmName = 'alarm-user'

function createAlarm(){
    chrome.alarms.create(alarmName, {
        delayInMinutes: 0.1, periodInMinutes: 0.1});
}

function cancelAlarm(){
    chrome.alarms.clear(alarmName);
}

var alarmToggleButton = document.getElementById('alarm-test');

alarmToggleButton.addEventListener("change", function(event){
    var checkbox = event.target;
    if(checkbox.checked){
        this.createAlarm();
    }else{
        this.cancelAlarm();
    }
}.bind(this));
