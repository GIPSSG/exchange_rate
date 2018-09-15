var result = 0;

var data = window.localStorage.getItem('exchange_data');
if(data) data = JSON.parse(data);

var expiresAt = window.localStorage.getItem('exchange_data_expires_at');
if(expiresAt) expiresAt = moment(new Date(expiresAt).toISOString());

var api = API();
var accessKey = 'dcd0e7da78f908987b3208b9379cf85f';

var defaultDateFormat = 'YYYY-MM-DD';

var fromCcy = document.getElementById('from');
var fromAmt = document.getElementById('fromAmount');
var toCcy = document.getElementById('to');
var toAmount = document.getElementById('toAmount');

var fromValue, toValue, isOver, amount;

fromAmt.addEventListener("keyup", function(){
  convert();
});

fromCcy.addEventListener("change", function(){
  var fromLabel = document.getElementById('fromLabel');
  fromLabel.src = fromCcy.value + '.png';
  convert();
});

toCcy.addEventListener("change", function(){
  var toLabel = document.getElementById('toLabel');
  toLabel.src = toCcy.value + '.png';
  convert();
});

function request() {
  console.log('call api');
  var current = moment().format(defaultDateFormat);
  var before = function(day = 5) {
    if(day < 5 && day > 10) return alert('error');

    return moment().subtract(day, 'days').format(defaultDateFormat);
  };

  api.get()
    .request(accessKey, { start_date: before(10), end_date: current })
    .then(function(_data) {
      window.localStorage.setItem('exchange_data', JSON.stringify(_data));
      window.localStorage.setItem('exchange_data_expires_at', new Date());
      data = _data;
    }) 
}

function init() {
  request();
  setInterval(request, 1000 * 60 * 60);
  getAlarmIfExists();
}

function convert() {
  var targetValue = Math.round((fromAmt.value / data.rates[fromCcy.value] * data.rates[toCcy.value])*100)/100; 
  toAmount.value = Number(targetValue).toLocaleString('en');
  alarmAmount.value = targetValue;
  if(parseFloat(alarmAmount.value) > 0){
    alarmConfirmButton.classList.remove('disabled');
  }else{
    alarmConfirmButton.classList.add('disabled');
  }
}

function addNewAlarmItem(fromValue, toValue, isOver, amount){
  var item = document.createElement('div');
  item.classList.add('item');

  var domInnerValue = 
    '<div class="right floated content">' +
      '<div id="cancel-alarm" class="ui red icon button">' + 
        '<i class="cancel icon"></i>' + 
      '</div>' + 
    '</div>' + 
    '<img class="ui avatar image" src="'+fromValue+'.png">' + 
    '<div class="list-icon">' + 
      '<i class="arrow circle right icon"></i>' + 
    '</div>' + 
    '<img class="ui avatar image" src="'+toValue+'.png">' + 
    '<div class="content">' + 
    (parseInt(isOver) > 0 ? '> ' : '< ') + 
    amount + 
    '</div>';

    item.innerHTML = domInnerValue;

  var listWrapper = document.getElementById('alarm-list');
  if(listWrapper.lastChild){
    listWrapper.removeChild(listWrapper.lastChild);
  }
  listWrapper.appendChild(item);

  var cancelButton =  document.getElementById('cancel-alarm');
  cancelButton.addEventListener("click", alarmCancelFunction);
}

function getAlarmIfExists(){
  var myStorage = window.localStorage;
  var savedJsonString = myStorage.getItem(alarmStorageKey);

  if(savedJsonString !== undefined){
    savedJson = JSON.parse(savedJsonString);
    fromValue = savedJson['fromValue'];
    toValue = savedJson['toValue'];
    isOver = savedJson['isOver'];
    amount = savedJson['amount'];

    addNewAlarmItem(fromValue, toValue, isOver, amount);
  }
}

init();