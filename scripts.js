function loadReddit(sub) {

    // json from this url
    var apiurl;
    if (sub == "frontpage" || sub == "") {
        sub = "frontpage";
        document.getElementById('subreddit').value = sub;
        apiurl = "http://www.reddit.com/.json";
    } else
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
            card.innerHTML = document.getElementById('cardtmp').innerHTML;

            // append card to cardholder
            cardholder.appendChild(card);
        }

        // get all cards
        var linkselector = document.getElementsByClassName('link');
        var imgselector = document.getElementsByClassName('thumb');
        var cardselector = document.getElementsByClassName('card');
        var scoreselector = document.getElementsByClassName('score');
        var commentselector = document.getElementsByClassName('comments');

        // pull data for each card
        for (var i = 0; i < listing.length; i++) {

            // store some data
            var obj = listing[i].data;

            // store the score
            var votes = obj.score;

            // store the link
            var exturl = obj.url;

            // gilded?
            var gilded = obj.gilded;

            var thumb;
            // get thumb url
            try {
                thumb = obj.preview.images[0].source.url;
            } catch (e) {
                thumb = "";
            }

            linkselector[i].innerHTML = obj.title;

            //            // create img if it needs on and add it to card
            //            if (thumb != "") {
            //
            //                if (cardselector[i].innerHTML.indexOf("img") == -1) {
            //                    var img = document.createElement('img');
            //                    img.className = "thumb";
            //                    img.id = "thumb";
            //                    img.src = thumb;
            //                    img.style.cssText = "width:100%; height: auto;";
            //                }
            //
            //
            //                cardselector[i].appendChild(img);
            //
            //
            //            }

            linkselector[i].href = exturl;
            scoreselector[i].innerHTML = votes;
            commentselector[i].href = "http://www.reddit.com/" + obj.permalink;
            commentselector[i].innerHTML = obj.num_comments + " comments";

            if (gilded > 0) {
                cardselector[i].style.backgroundColor = "#FFF9C4";
            }

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

    $("#rrr").click(function () {

        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
});