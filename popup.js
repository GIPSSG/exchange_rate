var result = 0;
var data = null;
var api = API();
var accessKeys = [
  'dcd0e7da78f908987b3208b9379cf85f',
  '12e73ec8e8fb0c5766503ed173529c2d',
  '84f0be3f56fc76dcba882de039274659',
  '61c8d495c7ab52cee9697b6c05aeeb71',
  '71db088a2c4f1f2a736b74f76b39739b',
  '5c8de4342d771bd4e56e90000216435a',
  'c0b7710654ecb6c75a0506fb4c65e086',
  '80fdc423903e8ca79c9e7c6c3b9778a2',
  '238a3b1c9378503610f406dd0d16cd30'
];

var accessKeyFlags = [false, true, true, true, true, true, true, true, true];

var default_date_format = 'YYYY-MM-DD';

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
  var index = _.findIndex(accessKeyFlags, function(valid) {
    return valid;
  });

  console.log(index);
  if(index >= 0) {
    call(accessKeys[index]);
  }
}

function call(accessKey) {
  if(!accessKey) return;

  console.log(accessKey);
  var current = moment().format(default_date_format);
  var before = function(day = 5) {
    if(day < 5 && day > 10) return alert('error');

    return moment().subtract(day, 'days').format(default_date_format);
  };

  api.get()
    .request(accessKey, { start_date: before(10), end_date: current })
    .then(function(_data) {
      // success
      data = _data;
      console.log(data);
    })
    .catch(function(err) {
      // error
      var failedIndex = _.findIndex(accessKeys, function(key) {
        return key === accessKey;
      })

      accessKeyFlags[failedIndex] = false;

      var nextIndex = failedIndex + 1;
      if(accessKeys.length > nextIndex) {
        call(accessKeys[nextIndex])
      }
    })
}

function init() {
  request();
  setInterval(request, 1000 * 60 * 60);
}

function convert() {
  toAmount.value = Number(Math.round((fromAmt.value / data.rates[fromCcy.value] * data.rates[toCcy.value])*100)/100).toLocaleString('en');
}

init();