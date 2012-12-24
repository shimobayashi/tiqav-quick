
$( function () {
    $('#query').keyup( function() {
        var val = $(this).val();
        if (val != '') {
            var url = 'http://' + val + '.tiqav.com/';
            $('#preview').attr('src', url);
            $('#preview').show();
        } else {
            $('#preview').hide();
        }
    }).change();

    $('#query-form').submit( function() {
        var val = $('#query').val();
        if (val != '') {
            var text = '![' + val + '](' + $('#preview').attr('src') + ')';
            chrome.extension.sendRequest({text: text}, function(response) {
                console.log(response.text);
                updateStatus('Markdown形式でコピーしました');
            });
        } else {
            updateStatus('クエリーを入力してください');
        }
        return false;
    });

    $('#tiqav').click( function() {
        var val = $('#query').val();
        if (val != '') {
            window.open('http://tiqav.com/search/' + val);
        } else {
            updateStatus('クエリーを入力してください');
        }
    });

    var updateStatus = function(txt) {
        $('#status').show();
        $('#status').text(txt);
        $('#status').hide(1500);
    }
});
