export default function(options, data) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
      try {
        let jsonContent = JSON.parse(request.responseText);
        options.success && options.success(jsonContent)
      } catch (err) {
        options.error && options.error(request._bodyText);
      }
    } else {
      options.error && options.error(request._bodyText);
    }
  };

  request.open('GET', options.url);
  request.send();

  return {
    abort: function(reason) {
      return request.abort(reason);
    }
  };
}
