function format() {
    return localStorage['format'] || '![{{txt}}]({{url}})';
}

$( function() {
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
            copyTextToClipboard(request.url, request.text);
            sendResponse({text: "Copied!"});
        }
    );

    // テキストをクリップボードにコピーする関数
    // from http://tande.jp/lab/2012/09/1889
    var copyTextToClipboard = function(url, txt){
        var copyArea = $("<textarea/>");
        copyArea.text(format().replace(/{{txt}}/g, txt).replace(/{{url}}/g, url));
        $("body").append(copyArea);
        copyArea.select();
        document.execCommand("copy");
        copyArea.remove();
    }
});
