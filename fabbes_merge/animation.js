$(document).ready(function() {

$( ".page" ).on( "mode:toggle", function( event ) {
    var page = $( this );
    $(".w_left").addClass("w_presenting")
    if ( page.is( ".spinner" ) ) { 
        menuDisplay("on");
        setTimeout(function afterOneSecond() {
            page.removeClass("on").addClass("s_off")
            $(".details").removeClass("d_off").addClass("on");
        }, 1000)    
    
    } else {
        $(".spinner").removeClass("s_off").addClass("on");
        page.removeClass("on").addClass("d_off")
        setTimeout(function afterOneSecond() {
            menuDisplay("off");
        }, 10)
    }
});


$(".w").on( "presenting:toggle", function( event ) {
    var active_w = $(this) 
    var src = active_w.attr("data-title")
    
    var pic_src = "images/" + src + ".jpg";
    var image = $("#pic");
    image.fadeOut('fast', function () {
            image.attr("src", pic_src)
            image.fadeIn('fast');
        });

    var txt_src = "texts/" + src + ".txt";
    var text = $('.text_area'); 
    jQuery.get(txt_src, function(data) {
        text.fadeOut('fast', function () {
            text.html(data);
            text.fadeIn('fast');
        });
    });
    
    var title_src = "texts/" + src + "_title.txt";
    var title = $('.headline'); 
    jQuery.get(title_src, function(data) {
        title.fadeOut('fast', function () {
            title.html(data);
            title.fadeIn('fast');
        });
    });

    if (active_w.is(".w_left")) {
        active_w.addClass("w_presenting")
        $(".w_right").removeClass("w_presenting")
    }
    if (active_w.is(".w_right")) {
        active_w.addClass("w_presenting")
        $(".w_left").removeClass("w_presenting")
    }
});



function menuDisplay(state) {
    var change = true;
    var marker = $("#marker"); 
    var menu = $("#menu");
    var right = $("#w_right");
    var left = $("#w_left");
    var circle = $("#circle2");
    var down = $("#down")
    if (state === "on") {
        menu.removeClass("no-display").addClass("display");    
        left.show();
        right.show();
        right.removeClass("hide").addClass("show");
        left.removeClass("hide").addClass("show");
        marker.removeClass("show").addClass("hide");        
        down.removeClass("hide").addClass("show");

        var rotate = 'rotate(' + 27.0 + 'deg)';
        right.css({"transition": "1s", "transform": rotate })
        var rotate = 'rotate(' + -27.0 + 'deg)';
        left.css({"transition": "1s", "transform": rotate })

        $(".show").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
            if (change === true) {
                menu.css({"transition": "1s", "top" : "100%"});
                change = false;
                return true
            }
        });

    } if (state === "off") {
        menu.css({"transition": "0.7s", "top" : "0%"});

        var rotate = 'rotate(' + 0 + 'deg)';
        right.css({"transition": "1s", "transform": rotate })
        left.css({"transition": "1s", "transform": rotate })
        right.removeClass("show").addClass("hide");
        left.removeClass("show").addClass("hide");
        
        

        $(".hide").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
            if (change === true) {
                marker.removeClass("hide").addClass("show");
                left.hide();
                right.hide();
                down.removeClass("show").addClass("hide");
                setTimeout(function afterOneSecond() {
                    menu.removeClass("display").addClass("no-display");
                }, 400)       
                change = false;
                return true
            }
        });
    }
};


$(".wing").click(function() {
    var theme = $(this).attr("data-title");
    $(".details").addClass(theme);
    // Tänk över denna rad
    var bkg = "images/" + theme + "0.jpg"
    
    var left =  theme + "1";
    var right = theme + "2";
    $(".w_left").attr("data-title", left);
    $(".w_right").attr("data-title", right);
    
    var set_img = "images/" + left + ".jpg";
    $("#pic").attr("src", set_img);
    
    var title_src = "texts/" + left + "_title.txt";
    var title = $('.headline'); 
    jQuery.get(title_src, function(data) {
        title.html(data);
    });


    var set_txt = "texts/" + left + ".txt";
    jQuery.get(set_txt, function(data) {
        $('.text_area').html(data);
    });



    var page = $( this ).closest( ".page" );
    page.trigger( "mode:toggle" );
});


$(".w").click(function() {
    var wing = $(this);
    wing.trigger( "presenting:toggle" );
});

$("#down,  .escape_button").click(function(){
    $(".details").trigger("mode:toggle");
});



});
