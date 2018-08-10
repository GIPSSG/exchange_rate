function API() {
  var url = 'http://data.fixer.io/api/latest';
  var api = null;

  var init = function() {
    return {
      request: function(access_key, params = {}) {
        var serializedParams = serialize(Object.assign(params, { access_key }));
        return fetch(`${url}?${serializedParams}`)
          .then((res) => res.json())
          .catch(err => err);
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