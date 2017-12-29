$(document).ready(function() {
	console.log("funkar")


$( ".page" ).on( "mode:toggle", function( event ) {
	// alert("hej");
    var page = $( this );
    if ( page.is( ".spinner" ) ) {
        page.removeClass("on").addClass("s_off")
        $(".details").removeClass("d_off").addClass("on");
    } else {
        $(".spinner").removeClass("s_off").addClass("on");
        page.removeClass("on").addClass("d_off")
    }
});
 
$(".wing, .escape_button").click(function() {
	console.log("Fattar att den klickat")
    var page = $( this ).closest( ".page" );
    page.trigger( "mode:toggle" );
});




});
