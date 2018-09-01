chrome.alarms.onAlarm.addListener(function( alarm ) {
    showNotification(calculateRate());
});


function showNotification(exchangeStandard) {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl: 'exchange.png',
        title: 'Check exchange rate now!',
        message: 'Exchange rate for SGD-KRW is now '+exchangeStandard+'!'
    }, function(notificationId) {});
}

function calculateRate(){
    var api = API();
    var current = moment().format('YYYY-MM-DD');
    api.get()
    .request({ date: current })
    .then(function(_data) {
      // success
      var rate = Number(Math.round((1 / _data.rates["SGD"] * _data.rates["KRW"])*100)/100);
      showNotification(rate); 
    })
    .catch(function(err) {
      // error
      alert(err.message);
    })
}