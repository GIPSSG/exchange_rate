var rates = [1.3662, 1130.30, 827.23];

var USDSGD = rates[0];
var USDKRW = rates[1];
var SGDKRW = rates[2];

var result = 0;

var fromCcy = document.getElementById('from')
var fromAmt = document.getElementById('fromAmount')
var toCcy = document.getElementById('to')
var toAmount = document.getElementById('toAmount')

function convert(){
  if(fromCcy.value == 'USD' && toCcy.value == 'SGD') {
    result = fromAmt.value * USDSGD;
  } else if (fromCcy.value == 'SGD' && toCcy == 'USD'){
    result = fromAmt.value / USDSGD;
  } else if (fromCcy.value == 'USD' && toCcy.value == 'KRW'){
    result = fromAmt.value * USDKRW;
  } else if (fromCcy.value == 'KRW' && toCcy.value == 'USD'){
    result = fromAmt.value / USDKRW;
  } else if (fromCcy.value == 'SGD' && toCcy.value == 'KRW'){
    result = fromAmt.value * SGDKRW;
  } else if (fromCcy.value == 'KRW' && toCcy.value == 'SGD'){
    result = fromAmt.value / SGDKRW;
  } else {
    alert("Invalid input");
  }
  
  toAmount.value = result;
  return result
}