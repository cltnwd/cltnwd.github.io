$(document).ready(function() {

    // for "typing" the text(s)
    var timertext;
    var timerlink;

    // type animation for regular text
    var typeText = function(target, message, index, interval) {

        // still need text to append
        if (index < message.length) {

            // adds newline <br>
            if (message[index] == '_') {
                $(target).append("<br><br>");
                index++;
                timertext = setTimeout(function() {
                    typeText(target, message, index, interval);
                }, interval);
            }

            // normal text
            else {
                $(target).append("<span class=\"string\">" + message[index++] + "</span>");
                timertext = setTimeout(function() {
                    typeText(target, message, index, interval);
                }, interval);
            }
        }
    }

    // NOT USED ! 
    // type animation for links (a href)
    var typeLink = function(target, message, index, interval) {

        if (index < message.length) {

            $(target).html($(target).html() + message[index++]);
            timerlink = setTimeout(function() {
                typeLink(target, message, index, interval);
            }, interval);
        }
    }

    // biography toggle
    $("#biolink").click(function() {

        // stops old animation
        clearTimeout(timertext);

        // reset the bio
        if ($("#biolink").hasClass("active")) {
            $("#bio").html("<span id=\"bio\" class=\"code\">bio = <span class=\"var code\">function</span><span class=\"code\">(</span><span class=\"code param\">me</span><span class=\"code\">);</span>");
            $("#biocontent").html("");
            $("#biocontent").toggle();
            $("#endbio").toggle();
        } else {

            // build bio function
            $("#bio").html("<span id=\"bio\" class=\"code\">bio = <span class=\"var code\">function</span><span class=\"code\">(</span><span class=\"code param\">me</span><span class=\"code\">) {</span>");
            $("#biocontent").toggle();
            $("#endbio").toggle();

            // underscore represents newline
            $("#biocontent").html("<span class=\"code\">me = </span>");
            typeText("#biocontent", "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non facilisis felis. In consectetur ex eget ante venenatis vehicula. Curabitur ut nisi tortor. Nulla posuere lectus leo, eget luctus erat dapibus vitae. Mauris sem enim, commodo eu erat eget, gravida porta velit. Quisque condimentum, ex a malesuada porttitor, nisi nibh mollis sapien, ut semper sem erat quis ex. Quisque a tempus mauris. Vestibulum venenatis cursus orci laoreet mattis. Maecenas fermentum magna quis risus blandit sagittis. Praesent vitae ligula placerat nisi efficitur sagittis. Cras facilisis enim sit amet accumsan eleifend._Donec id ullamcorper orci. Aenean imperdiet eros felis, id imperdiet enim tincidunt sed. Vestibulum dapibus porta arcu elementum laoreet. Quisque eu lectus vitae libero porttitor pretium a a nulla. Cras at nibh auctor, faucibus libero quis, rhoncus ex. Cras lobortis sapien quis est aliquet, id porttitor turpis pharetra. Vestibulum scelerisque erat a diam mollis mattis. Integer et tellus quam. Mauris quis nisl rutrum, facilisis nisi eu, hendrerit neque.\"", 0, 1);
        }

        // toggle active
        $("#biolink").toggleClass("active");

    });

});
