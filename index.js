// jQuery and Underscore.js are dependencies
//
var pageWidth, pageHeight;
var basePage = {
  width: 826,
  height: 1066,
  scale: 1,
  scaleX: 1,
  scaleY: 1,
};
$(function () {
  var $page = $(".google-doc");
  getPageSize();
  scalePages($page, pageWidth, pageHeight);
  //using underscore to delay resize method till finished resizing window
  $(window).resize(
    _.debounce(function () {
      getPageSize();
      scalePages($page, pageWidth, pageHeight);
    }, 150)
  );
  function getPageSize() {
    pageHeight = $("#google-doc-container").height();
    pageWidth = $("#google-doc-container").width();
  }
  function scalePages(page, maxWidth, maxHeight) {
    var scaleX = 1,
      scaleY = 1;
    scaleX = maxWidth / basePage.width;
    scaleY = maxHeight / basePage.height;
    basePage.scaleX = scaleX;
    basePage.scaleY = scaleY;
    basePage.scale = scaleX > scaleY ? scaleY : scaleX;
    var newLeftPos = Math.abs(
      Math.floor((basePage.width * basePage.scale - maxWidth) / 2)
    );
    var newTopPos = Math.abs(
      Math.floor((basePage.height * basePage.scale - maxHeight) / 2)
    );
    page.attr(
      "style",
      "-webkit-transform:scale(" +
        basePage.scale +
        ");left:" +
        newLeftPos +
        "px;top:" +
        newTopPos +
        "px;"
    );
  }
});
