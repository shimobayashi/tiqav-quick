
$( function () {
    $('#query').keyup( function() {
        var val = $(this).val();
        if (val != '') {
            $('#preview-data').html('');
            var json_url = 'http://api.tiqav.com/search.json?q='+val
            var xhr = new XMLHttpRequest();
            xhr.open('GET', json_url,true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    json = xhr.responseText;
                    data = JSON.parse(json);
                    $.each(data, function(k,v){
                        url = 'http://tiqav.com/'+data[k].id+'.'+data[k].ext
                        img = $('<img />').attr('src', url);
                        $('#preview-data').append(img);
                    });
                }
            }
            xhr.send();
            $('#preview-data').show();
        } else {
            $('#preview-data').hide();
        }
    }).change();

    $(document).on('click', 'img',function(){
        $('img').removeClass('active');
        $(this).addClass('active');
        console.log($(this));
        console.log('clicked');
    });

    $('#query-form').submit( function() {
        var val = $('#query').val();
        if (val != '') {
            var text = $('.active').attr('src');
            chrome.extension.sendRequest({text: text}, function(response) {
                console.log(response.text);
                updateStatus('コピーしました');
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
