$(document).ready(function() {
	var timertext;
	var timerlink;
	
	var typeText = function (target, message, index, interval) {   

 		if (index < message.length) {
 			if (message[index] == '_') {
 				$(target).append("<br><br>");
 				index++;
 				timertext = setTimeout(function () { 
    				typeText(target, message, index, interval); 
    			}, interval);
 			}
 			else { 
    			$(target).append(message[index++]);
    			timertext = setTimeout(function () { 
    				typeText(target, message, index, interval); 
    			}, interval);
  			}
  		}
	}

	var typeLink = function (target, message, index, interval) {   

 		if (index < message.length) {
 			 
			$(target).html($(target).html() + message[index++]);
			timerlink = setTimeout(function () { 
				typeLink(target, message, index, interval); 
			}, interval);
  			
  		}
	}

// 	typeText("#var", "var ", 0, 500);
// 	typeText("#varname", "bio;", 0, 500);

// 	console.log("hello, world");
	
	// biography toggle
	$("#biolink").click(function() {
		clearTimeout(timertext);
		// reset
		if ($("#biolink").hasClass("active")) {
			$("#bio").html("bio = function() {...};");
			$("#biocontent").html("");
			$("#biocontent").toggle();
			$("#endbio").toggle();			
		}
		else {

			$("#bio").html("bio = function() {");
			$("#biocontent").toggle();
			$("#endbio").toggle();
			typeText("#biocontent", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non facilisis felis. In consectetur ex eget ante venenatis vehicula. Curabitur ut nisi tortor. Nulla posuere lectus leo, eget luctus erat dapibus vitae. Mauris sem enim, commodo eu erat eget, gravida porta velit. Quisque condimentum, ex a malesuada porttitor, nisi nibh mollis sapien, ut semper sem erat quis ex. Quisque a tempus mauris. Vestibulum venenatis cursus orci laoreet mattis. Maecenas fermentum magna quis risus blandit sagittis. Praesent vitae ligula placerat nisi efficitur sagittis. Cras facilisis enim sit amet accumsan eleifend._Donec id ullamcorper orci. Aenean imperdiet eros felis, id imperdiet enim tincidunt sed. Vestibulum dapibus porta arcu elementum laoreet. Quisque eu lectus vitae libero porttitor pretium a a nulla. Cras at nibh auctor, faucibus libero quis, rhoncus ex. Cras lobortis sapien quis est aliquet, id porttitor turpis pharetra. Vestibulum scelerisque erat a diam mollis mattis. Integer et tellus quam. Mauris quis nisl rutrum, facilisis nisi eu, hendrerit neque.", 0, 1);
		}

		// toggle active
		$("#biolink").toggleClass("active");

	});
	
	// // toggle resume iframe
	// $("#reslink").click(function() {

	// 	// $("#resume").slideToggle();

	// 	// reset
	// 	if ($("#reslink").hasClass("active")) {
	// 		$("#res").html("resume;");
	// 		$("#rescontent").html("");
	// 		$("#rescontent").toggle();
	// 		$("#endres").toggle();			
	// 	}
	// 	else {
	// 		$("#res").html("resume = {");
	// 		$("#rescontent").toggle();
	// 		$("#rescontent").html("<a id='areslink' class='code' href='https://drive.google.com/open?id=0B1FXuplRfrlEb1ZoS1FoZVV6Z1k' target='_blank'></a>");
	// 		$("#endres").toggle();

	// 		typeLink("#areslink", "Click here to view resume.pdf", 0, 25);
	// 	}

	// 	// toggle active
	// 	$("#reslink").toggleClass("active");

	// });
});