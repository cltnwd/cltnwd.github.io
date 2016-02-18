function loadReddit(sub) {

    // json from this url
    var apiurl;
    if (sub == "frontpage")
        apiurl = "http://www.reddit.com/.json";
    else
        apiurl = "http://www.reddit.com/r/" + sub + ".json";

    $.getJSON(apiurl, function (json) {

        // put results in an array
        var listing = json.data.children;

        // get the card container
        var cardholder = document.getElementById("cardholder");

        // add n cards to container
        for (var i = 0; i < listing.length; i++) {

            // creates a card
            var card = document.createElement("div");
            card.className = "row";
            card.innerHTML = "<div id='card' class='col-xs-12 card'><h5 class='cardtitle'><a class='link' id='title' href='' target='_blank' style='font-family: helvetica'></a></h5>";

            // append card to cardholder
            cardholder.appendChild(card);
        }

        // get all cards
        var linkselector = document.getElementsByClassName('link');
        var imgselector = document.getElementsByClassName('thumb');
        var cardselector = document.getElementsByClassName('card');

        // pull data for each card
        for (var i = 0; i < listing.length; i++) {

            // store some data
            var obj = listing[i].data;

            // store the score
            var votes = obj.score;

            // store the link
            var exturl = obj.url;

            // store title
            var title = obj.title;

            var thumb;
            // get thumb url
            try {
                thumb = obj.preview.images[0].source.url;
            } catch (e) {
                thumb = "";
            }

            linkselector[i].innerHTML = title;

            // create img if it needs on and add it to card
            if (thumb != "") {

                if (cardselector[i].innerHTML.indexOf("img") == -1) {
                    var img = document.createElement('img');
                    img.className = "thumb";
                    img.id = "thumb";
                    img.style.cssText = "width:50%; height:auto";
                    img.src = "http://www.thisiscolossal.com/wp-content/uploads/2015/03/florian-1.gif";
                }

                img.src = thumb; //exturl.replace(".gifv", ".gif");

                cardselector[i].appendChild(img);


            }

            //imgselector[i].src = thumb;
            linkselector[i].href = exturl;

        }
    })



}


$(document).ready(function () {
    $('.subredditarea').keydown(function (event) {
        if (event.keyCode == 13) {
            var sub = $('#subreddit').val();
            document.getElementById("cardholder").innerHTML = "";
            loadReddit(sub);
            return false;
        }
    });
    
    $('.card').hover(function () {
        $('.thumb').fadeOut( 100 );
        $('.thumb').fadeIn( 500 );
    });
});
