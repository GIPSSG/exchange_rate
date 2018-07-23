var result = 0;
var data = null;
var api = API();

function request() {
  var current = moment().format(default_date_format);
  var before = function(day = 5) {
    if(day < 5 && day > 10) return alert('error');

    return moment().subtract(day, 'days').format(default_date_format);
  };

  console.log(current);

  console.log(before(10));

  api.get()
    .request({ start_date: before(10), end_date: current })
    .then(function(_data) {
      // success
      data = _data;
      console.log(data);
    })
    .catch(function(err) {
      // error
      alert(err.message);
    })
}

function init() {
  request();
  setInterval(request, 1000 * 60 * 60);
}


init();


var default_date_format = 'YYYY-MM-DD';

var fromCcy = document.getElementById('from');
var fromAmt = document.getElementById('fromAmount');
var toCcy = document.getElementById('to');
var toAmount = document.getElementById('toAmount');

fromAmt.addEventListener("keyup", function(){
  convert();
});

fromCcy.addEventListener("change", function(){
  convert();
});

toCcy.addEventListener("change", function(){
  convert();
});

function convert() {
  toAmount.value = Number(Math.round((fromAmt.value / data.rates[fromCcy.value] * data.rates[toCcy.value])*100)/100).toLocaleString('en');
}