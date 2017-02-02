$(document).ready(function() {

	var showText = function (target, message, index, interval) {   
 		if (index < message.length) {
 			if (message[index] == '_') {
 				$(target).append("<br>");
 				index++;
 			}
 			else 
    			$(target).append(message[index++]);
    		setTimeout(function () { showText(target, message, index, interval); }, interval);
  		}
	}

// 	showText("#var", "var ", 0, 500);
// 	showText("#varname", "bio;", 0, 500);

// 	console.log("hello, world");
	
	// experience toggle
	$("#biolink").click(function() {
		
		// reset
		if ($("#biolink").hasClass("active")) {
			$("#bio").html("bio;");
			$("#biocontent").html("");
			$("#biocontent").toggle();
			$("#endbio").toggle();			
		}
		else {

			$("#bio").html("bio = {");
			$("#biocontent").toggle();
			$("#endbio").toggle();
			showText("#biocontent", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 0, 3);
		}

		// toggle active
		$("#biolink").toggleClass("active");

	});
	
	// toggle resume iframe
	$("#reslink").click(function() {
		$("#resume").slideToggle();
	});
});