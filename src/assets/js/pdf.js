$(function() {
    //pdfURLが空の場合クラス.pdfを削除する
    const pdfClass = ".pdf";
    const pdfUrl = $(pdfClass).attr("href");

    if (pdfUrl.length == 0) {
        $(pdfClass).remove();
    };

});