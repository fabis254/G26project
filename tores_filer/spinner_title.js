
//###### Main-funktionen uppflyttad hit #######
$(document).ready(function(){

    // Some variables
    var mouse_down = false;
    var selected_wing = $("#0");

    // Set pointer position  
    let p_top = $("body").height()/2 - 300;
    console.log("p_top", p_top);
    $(".pointer").css("top", p_top);

    // automatic rotation
    window.setInterval(function() {
        if (!mouse_down) {
            rotateQuarter();
        }
    }, 5000);
    // Update selected wing
    updateSelect()


    $('.wing').on('mousedown', function(event){
        mouse_down = true;
        // Get mouse angle (theta) from center
        var theta = getPositiveTheta($("#innerCircle"), event.pageX,event.pageY)
        // Get current orientation
        var rotation = getAngle();
        $('body').on('mousemove', function(event){
            // Update theta and add difference to rotation
            var prev_theta = theta
            theta = getPositiveTheta($("#innerCircle"), event.pageX,event.pageY)
            rotation += (theta - prev_theta);
            // Adjust if rotation exceeds limits
            if (Math.abs(rotation) > 180) {
                rotation = adjustRotation(rotation);
            }
            // Rotate
            var rotate = 'rotate(' + rotation + 'deg)';
            $("#marker").css({"transition": "none", "transform": rotate })    
            updateSelect()
        });
                      
        $('body').mouseup(function(event){
            $('body').unbind('mousemove');
            $('body').unbind('mouseup');

            var ang = getAngle();
            var b = adjustToIncrement(ang, $('#marker'));
            // Execute when transition has ended:
            $("#marker").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
                updateSelect();
                mouse_down = false;

            });
            
        });
    });                   
}); 

function rotateQuarter() {
    //console.log("rotate 90")
    let ang = getAngle()
    let rot = ang + 90;
    //console.log("ang:", ang, "rot", rot)
    let rotate = 'rotate(' + rot + 'deg)';
    $("#marker").css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate,
        "transition": "1s ease-out"});
    $(".wing").css("stroke", "black");
    
    $("#marker").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function(event) {
             if (rot==270) {
                rot = -90;
                rotate = 'rotate(' + rot + 'deg)';
                $("#marker").css({'transform': rotate, "transition": "none"});
                }
                updateSelect();
        });
    }

function updateSelect() {
    $(".wing").css({"stroke": "black"});
    let ang = getAngle();
    if (ang==0) {
        selected_wing = $("#0");
    }
    else if (ang==-90) {
        selected_wing = $("#1");
    }
    else if (ang==180||ang==-180) {
        selected_wing = $("#2");
    } 
    else if (ang==90) {
        selected_wing = $("#3");
    }
    selected_wing.css("stroke", "white");
    
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

    // Smooth animation to put elements in place
    // This code works:
    var rotate = 'rotate(' + selected + 'deg)';
    cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate,
        "transition": "1s ease-out"});
}

function getPositiveTheta(offsetSelector, xCoordinate, yCoordinate) {
    var x = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;            
    var y = (yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
    var theta = Math.atan2(y,x)*(180/Math.PI);        
    // add 360 to ensure positive numbers
    return theta + 360;
}

function adjustRotation(rotation) {
    if (rotation > 180) {
        return rotation -= 360;
    }
    else if (rotation <-180) {
        return rotation += 360;
    }
    else {
        return rotation;
    }
}



/*
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
*/
