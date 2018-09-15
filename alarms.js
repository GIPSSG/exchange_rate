var alarmName = 'alarm-user'

function createAlarm(){
    chrome.alarms.create(alarmName, {when :  Date.now()});
}

function cancelAlarm(){
    chrome.alarms.clear(alarmName);
}

var alarmConfirmButton = document.getElementById('save-alarm-button');

var alarmOverBelow = document.getElementById('over-below');
var alarmAmount = document.getElementById('alarm-amount');

var alarmStorageKey = 'alarmStorageKey';

var alarmCancelFunction = function(event){
    var listWrapper = document.getElementById('alarm-list');
    listWrapper.removeChild(listWrapper.lastChild);

    var myStorage = window.localStorage;
    myStorage.removeItem(alarmStorageKey);

    /* if(checkbox.checked){
        this.createAlarm();
    }else{
        this.cancelAlarm();
    } */
}.bind(this); 

alarmAmount.addEventListener('keyup', function(event){
    if(parseFloat(alarmAmount.value) > 0){
        alarmConfirmButton.classList.remove('disabled');
    }else{
        alarmConfirmButton.classList.add('disabled');
    }
});

alarmConfirmButton.addEventListener("click", function(event){
    var amount = alarmAmount.value;
    if(parseFloat(fromAmt.value) > 0 ){
        if(toAmount.value.replace(',', '') === amount){
            var amountNum = parseFloat(toAmount.value.replace(',', '')) / fromAmt.value;
            amount = Number.parseFloat(amountNum).toPrecision();
        }else{
            var amountNum = parseFloat(amount) / fromAmt.value;
            amount = Number.parseFloat(amountNum).toPrecision();
        }
        
    }

    var saveJson = {
        'fromValue' : fromCcy.value,
        'toValue' : toCcy.value,
        'isOver' : alarmOverBelow.value, 
        'amount' : amount
    }
    
    var myStorage = window.localStorage;
    myStorage.setItem(alarmStorageKey, JSON.stringify(saveJson));

    checkIfAlarm(fromCcy.value, toCcy.value, alarmOverBelow.value, amount);
    addNewAlarmItem(fromCcy.value, toCcy.value, alarmOverBelow.value, amount);
}.bind(this));

function checkIfAlarm(fromVal, toVal, isOver, amount){
    var rateNum = data.rates[toVal] / data.rates[fromVal] ;
    var rate = Number.parseFloat(rateNum).toPrecision();
    if(parseInt(isOver) > 0){
        if(rateNum > amount){
            this.createAlarm();
        }
    }else{
        if(rateNum < amount){
            this.createAlarm();
        }
    }
}



