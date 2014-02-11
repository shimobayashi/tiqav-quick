window.addEventListener( 'load', function () {
  chrome.runtime.getBackgroundPage(function (backgroundWindow) {
    var format = document.getElementById('format');
    format.value = backgroundWindow.format();
    format.addEventListener('change', function () {
      localStorage['format'] = format.value;
    }, false);
  });
}, false);
