function loadReddit(sub) {
    sub = sub.toLowerCase();

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

        // starts card list over
        while (cardholder.firstChild) {
            cardholder.removeChild(cardholder.firstChild);
        }

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

            // sub
            var sub = obj.subreddit;

            var thumb;
            // get thumb url
            try {
                thumb = obj.preview.images[0].source.url;
            } catch (e) {
                thumb = "";
            }

            linkselector[i].innerHTML = obj.title;
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
    $('#subreddit').keydown(function (event) {
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

    $("#search").width(
        $(window).width - $("#rrr").width
    );

    "use strict";


    $(".hamburger").click(function () {


        // activates hamburger menu
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active"): this.classList.add("is-active");


        // activates sub list
        var sublist = document.getElementById("sublist");


        (sublist.classList.contains("is-shown") === true) ? sublist.classList.remove("is-shown"): sublist.classList.add("is-shown");

    })

    // create list of default subs
    var defaultsubs = ['FRONTPAGE', 'ANNOUNCEMENTS', 'ART', 'ASKREDDIT', 'ASKSCIENCE', 'AWW', 'BLOG', 'BOOKS', 'CREEPY', 'DATAISBEAUTIFUL', 'DIY', 'DOCUMENTARIES', 'EARTHPORN', 'EXPLAINLIKEIMFIVE', 'FITNESS', 'FOOD', 'FUNNY', 'FUTUROLOGY', 'GADGETS', 'GAMING', 'GETMOTIVATED', 'GIFS', 'HISTORY', 'IAMA', 'INTERNETISBEAUTIFUL', 'JOKES', 'LIFEPROTIPS', 'LISTENTOTHIS', 'MILDLYINTERESTING', 'MOVIES', 'MUSIC', 'NEWS', 'NOSLEEP', 'NOTTHEONION', 'OLDSCHOOLCOOL', 'PERSONALFINANCE', 'PHILOSOPHY', 'PHOTOSHOPBATTLES', 'PICS', 'SCIENCE', 'SHOWERTHOUGHTS', 'SPACE', 'SPORTS', 'TELEVISION', 'TIFU', 'TODAYILEARNED', 'TWOXCHROMOSOMES', 'UPLIFTINGNEWS', 'VIDEOS', 'WORLDNEWS', 'WRITINGPROMPTS'];

    // get sublist
    var sublist = document.getElementById("listofsubs");
    for (var n = 0; n < defaultsubs.length; n++) {
        // create list item
        var newsub = document.createElement("li");
        newsub.classList.add("sublist_item");

        // create link
        var sublink = document.createElement("button");
        sublink.classList.add("sublist_link");
        sublink.setAttribute("id", "sublist_link");
        sublink.innerHTML = defaultsubs[n];

        newsub.appendChild(sublink);

        sublist.appendChild(newsub);

    }

    $('.sublist_link').click(function () {
        var sub = $(this).html();
        loadReddit(sub);

        var hamburger = document.getElementById("hamburger");
        var sublist = document.getElementById("sublist");

        if (hamburger.classList.contains("is-active") === true) {
            hamburger.classList.remove("is-active");
        }

        if (sublist.classList.contains("is-shown") === true) {
            sublist.classList.remove("is-shown");
        }


        $("html, body").animate({
            scrollTop: 0
        }, "slow");

    });

});