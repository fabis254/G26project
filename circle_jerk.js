


function rotateAnnotationCropper(offsetSelector, xCoordinate, yCoordinate, cropper){
        cropper.css({"transition" : "none"})
        var d = new Date();
        
            var x = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;            
            var y = -1*(yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
            var theta = Math.atan2(y,x)*(180/Math.PI);        

            var cssDegs = convertThetaToCssDegs(theta);
            var rotate = 'rotate(' +cssDegs + 'deg)';
            cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate});
            
            $('body').mouseup(function(event){
                $('body').unbind('mousemove');
                $('body').unbind('mouseup');
            });
    }
    
    function convertThetaToCssDegs(theta){
        var cssDegs = 90 - theta;
        return cssDegs;
    }

function getAngle(e_init){
    var el = document.getElementById(e_init);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "FAIL";
    var values = tr.split('(')[1].split(')')[0].split(',');
    var a = values[0];
    var b = values[1];    

    var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    console.log("Rotation: " + angle + "deg");
    return angle
}


function adjustToIncrement(angle, cropper){
    // Ease into set positions
    var increments = [0, 90, 180, -90, -180];
    var len = increments.length
    var dif = 99999;
    var selected = 0;
    for (var i = 0; i < len; i++) {
        var comp = Math.abs(angle - increments[i])
        if (comp < dif) {
            dif = comp;
            selected = increments[i]
        }
    }

    var rotate = 'rotate(' + selected + 'deg)';
    console.log("Doing rotation of " + dif +" defgrees to meet " + selected + "point")    

    // This code works:
    cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate,
        "transition": "1s ease-out"});

    // Had an idea of adding classes
    //cropper.addClass("_90");

}

    $(document).ready(function(){               
        
        $('#marker').on('mousedown', function(event){
            active = $(this).attr("id");
            //alert($('#innerCircle').parent().offset().left);
            $('body').on('mousemove', function(event){
                rotateAnnotationCropper($('#innerCircle').parent(), event.pageX,event.pageY, $('#marker'));    
            });

            $('body').mouseup(function(event){
                $('body').unbind('mousemove');
                $('body').unbind('mouseup');
                
                var ang = getAngle(active);
                
                var b = adjustToIncrement(ang, $('#marker'));
                
            });
                                
        });                   
    }); 