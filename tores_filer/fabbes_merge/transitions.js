$('._2').click(function() {
		// $('._1').css({"transition": "2s ease-out", "top" : 0});
		$('._1').toggleClass("on")
		$('._1').toggleClass("off")
		
        $("._2").css({"opacity" : "0.0", "transition" : "2s ease-out"})


		$('#dynamic-container').toggleClass('hide')
		$('#dynamic-container').toggleClass('show')
		
		$('#dynamic-container').css({
			"bottom" : "-=100%",
			"transition" : "1s ease-out"
		})
	});