


function rotateAnnotationCropper(offsetSelector, xCoordinate, yCoordinate, cropper, orientation){
        cropper.css({"transition" : "none"})
        var d = new Date();
        
            var x = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;            
            var y = -1*(yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
            var theta = Math.atan2(y,x)*(180/Math.PI);        

            var cssDegs = convertThetaToCssDegs(theta);
            
            var angle = getAngle();
            console.log("ANGLE: " + angle)
            console.log("ORIENTATION: " + orientation)

            // ---------------
            // Special conditions for stupid angles, im sure there is a way to find
            // the pattern, but this works and that is the most important thing
            if (orientation == -90 && angle<0 && angle>-90) {
                 orientation += 360;
            }

            if (orientation == 90 && angle<-90) {
                 orientation -= 360;
            }

            if (orientation == 180 && (angle > 90 || angle < -90)) {
                 orientation -= 360;
            }
            //----------------

            // Adjust the rotation according to what wing is grabbed
            cssDegs = cssDegs - orientation;

            // Do the rotation
            adjustedSpeed = cssDegs*0.8;
            var rotate = 'rotate(' +cssDegs + 'deg)';
            cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate});
            // Unbind events
            $('body').mouseup(function(event){
                $('body').unbind('mousemove');
                $('body').unbind('mouseup');
            });
    }
    
    function convertThetaToCssDegs(theta){
        var cssDegs = 90 - theta;
        return cssDegs;
    }

function getAngle(){
    //Calculate the angle of Marker
    var el = document.getElementById("marker");
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
    // console.log("Rotation: " + angle + "deg");
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

    // Adjust for stupid angles
    if (selected < 0 && angle < -90) {
        selected += 360;
    }

    // Smooth animation to put elements in place
    // This code works:
    var rotate = 'rotate(' + selected + 'deg)';
    cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate,
        "transition": "1s ease-out"});
}

    $(document).ready(function(){               
 
        $(".wing").on("mousedown", function(event) {
            // console.log("PAGEX ON WING: " + event.pageX)
        });

        $('.wing').on('mousedown', function(event){
            // get the orientation of the path (i.e. 0, 90, 180, -90)
            str_ori = $(this).attr("id");
            var ori = parseInt(str_ori, 10);
            console.log("ORIENTATION: " + ori);
            
            // Get the id of the active attribute (will always be #marker)
            active = $("#marker").attr("id");
            // Do the rotation following the pointer
            $('body').on('mousemove', function(event){
                rotateAnnotationCropper($('#innerCircle'), event.pageX,event.pageY, $('#marker'), ori);    
            });

            $('body').mouseup(function(event){
                $('body').unbind('mousemove');
                $('body').unbind('mouseup');
                
                var ang = getAngle(active);
                var b = adjustToIncrement(ang, $('#marker'));
                
            });
                                
        });                   
    }); 