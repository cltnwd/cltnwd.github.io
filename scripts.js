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

            var titleid = "title" + (i + 1);
            var thumbid = "thumb" + (i + 1);
            if (title != null)
                document.getElementById(titleid).innerHTML = title;
            if (thumb != null)
                document.getElementById(thumbid).src = thumb;

            document.getElementById(titleid).href = exturl;

        }
    })



}


$(document).ready(function () {
    $('.subredditarea').keydown(function (event) {
        if (event.keyCode == 13) {
            var sub = $('#subreddit').val();
            loadReddit(sub);
            return false;
        }
    });
});