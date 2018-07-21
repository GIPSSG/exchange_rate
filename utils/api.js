function API() {
  var url = 'http://data.fixer.io/api/latest';
  var access_key = 'dcd0e7da78f908987b3208b9379cf85f';
  var api = null;

  var init = function() {
    return {
      get: function(params = {}) {
        var serializedParams = serialize(Object.assign(params, { access_key }));
        fetch(`${url}?${serializedParams}`)
          .then(response => response.json())
          .then(err => err);
      }
    }
  }

  var get = function() {
    if(api != null) return api;
    api = init();
    return api;
  }

  return { get };
}

function serialize(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  }
  return str.join("&");
}

module.exports = API;