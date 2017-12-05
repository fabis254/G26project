


function rotateAnnotationCropper(offsetSelector, xCoordinate, yCoordinate, cropper){
            
        
            var x = xCoordinate - offsetSelector.offset().left - offsetSelector.width()/2;
            // alert(x);
            var y = -1*(yCoordinate - offsetSelector.offset().top - offsetSelector.height()/2);
            var theta = Math.atan2(y,x)*(180/Math.PI);        


            var cssDegs = convertThetaToCssDegs(theta);
            var rotate = 'rotate(' +cssDegs + 'deg)';
            cropper.css({'-moz-transform': rotate, 'transform' : rotate, '-webkit-transform': rotate, '-ms-transform': rotate});
            $('body').on('mouseup', function(event){ $('body').unbind('mousemove')});

    }
    
    function convertThetaToCssDegs(theta){
        var cssDegs = 90 - theta;
        return cssDegs;
    }
    
    $(document).ready(function(){               
        
        $('#marker').on('mousedown', function(){
            $('body').on('mousemove', function(event){
                rotateAnnotationCropper($('#innerCircle').parent(), event.pageX,event.pageY, $('#marker'));    
            });
                                
        });                    
    }); 