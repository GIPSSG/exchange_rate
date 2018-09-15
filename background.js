var alarmStorageKey = 'alarmStorageKey';

chrome.alarms.onAlarm.addListener(function( alarm ) {
    showNotification();
});


function showNotification() {
    var myStorage = window.localStorage;
    var savedJsonString = myStorage.getItem(alarmStorageKey);
    var savedJson = JSON.parse(savedJsonString);

    var fromValue = savedJson['fromValue'];
    var toValue = savedJson['toValue'];
    var isOver = savedJson['isOver'];
    var amount = savedJson['amount'];

    var message = 'Exchange rate for '
        + fromValue+'-'+toValue+' is now ' + (parseInt(isOver) > 0 ? 'over ' : 'below ')
        + amount  + '!';

    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'exchange.png',
        title: 'Check exchange rate now!',
        message: message
    }, function(notificationId) {});
}
