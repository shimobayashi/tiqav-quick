$( function() {
    chrome.extension.onRequest.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                        "from a content script:" + sender.tab.url :
                        "from the extension");
            copyTextToClipboard(request.text);
            sendResponse({text: "Copied!"});
        }
    );

    // テキストをクリップボードにコピーする関数
    // from http://tande.jp/lab/2012/09/1889
    var copyTextToClipboard = function(txt){
        var copyArea = $("<textarea/>");
        copyArea.text(txt);
        $("body").append(copyArea);
        copyArea.select();
        document.execCommand("copy");
        copyArea.remove();
    }
});
