var today = Date.create();
var contents;

$(document).ready(function() {
    // Set background image
    setBackgroundImage();
    // Set date
    setToday();

    // Initialize summernote
    $('#summernote').summernote({
    });

    // Get journal
    getTodaysJournal();

    // Set editor's size
    setElementHeight(".note-editing-area", getHeightByWindow());

    // Add custom background div
    $(".frosted-glass").appendTo(".note-editing-area");

    // Move editor above background div
    $(".note-editable").appendTo(".note-editing-area");

    // Remove the manual resize option
    $(".note-statusbar").remove();

    // Autosave
    var timeoutId;
    $(".note-editable").on("input", function(){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            saveToDB();
        }, 500);
    });
});

$(window).resize(function(){
    // Set editor's size again on resize
    setElementHeight(".note-editing-area", getHeightByWindow());
});

function getHeightByWindow() {
    return $(document).height() - 273;
}

function setBackgroundImage() {
    $.get("/getBackgrounds", function(data){
        var urls = JSON.parse(data).backgrounds;
        var url = urls[Math.floor(Math.random()*urls.length+1)];
        $("html").css({'background': 'url(' + url + ') no-repeat center center fixed', 
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'background-size': 'cover'
        });
    });
}

function setToday() {
    $("#today").text(today.format('{Month} {d}, {yyyy}'));
}

function setElementHeight(element, size) {
    $(element).height(size);
}

function getTodaysJournal(){
    getJournal({ user_id: 1, entry_date: today.format('{yyyy}-{MM}-{dd}'), create_if_null: 'yes' });
}

function getJournal(params){
    $.post("/getJournal", params, function(data){
        $(".note-editable").contents().replaceWith(data);
    });
    // TODO: Add a getJournal function for any date (but don't allow editing past dates)
}

function saveToDB(){
    newHtml = $(".note-editable").html();
    $.put("/writeJournal", { 'user_id': 1, 'entry_date': today.format('{yyyy}-{MM}-{dd}'), 'entry': newHtml }, function(data){
        console.log("Saving...");
    });
}

// Make a put
$.put = function(url, data, callback, type){
  if ( $.isFunction(data) ){
    type = type || callback,
    callback = data,
    data = {}
  }
  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data,
    contentType: type
  });
}
