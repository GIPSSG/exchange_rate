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
  if(!data || !expiresAt || moment(expiresAt).isBefore(moment(), 'day') ) request();
}

function convert() {
  toAmount.value = Number(Math.round((fromAmt.value / data.rates[fromCcy.value] * data.rates[toCcy.value])*100)/100).toLocaleString('en');
}

init();