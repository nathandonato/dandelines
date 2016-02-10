$(document).ready(function() {
    $('#summernote').summernote({
    });

    setElementHeight(".note-editing-area", getHeightByWindow());
    $(".frosted-glass").appendTo(".note-editing-area");
    $(".note-editable").appendTo(".note-editing-area");

    $(".note-statusbar").on("click", function(){
    	$(".panel-body").css({position: relative});
    });
});

$(window).resize(function(){
	console.log("resize");
    setElementHeight(".note-editing-area", getHeightByWindow());
})

function setElementHeight(element, size) {
	$(element).height(size);
}

function getHeightByWindow() {
  	return $(document).height() - 273;// - $(".panel-heading").height();
}
