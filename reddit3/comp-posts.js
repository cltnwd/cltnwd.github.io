// reddit data eventually
var Posts = [];

// individual Post
var Post = React.createClass({

    getInitialState: function() {
        return ({ hidden: "hidden card" });
    },

    componentWillMount: function() {
        var that = this;
        setTimeout(function() {
            that.show();
        }, that.props.wait);
    },

    show: function() {
        this.setState({ hidden: "show card" });
    },

    onSubClick: function() {
        this.props.onSubClick(this.props.post.subreddit);
    },

    render: function() {

        // works inside json function but not here
        var subreddit = this.props.post.subreddit;
        var score = this.props.post.score;
        var gilded = this.props.post.gilded;
        var score = this.props.post.score;
        var title = this.props.post.title;
        var url = this.props.post.url;
        var num_comments = this.props.post.num_comments;
        var comments_link = "http://www.reddit.com" + this.props.post.permalink;
        var selftext = this.props.post.selftext;
        var preview = this.props.post.preview;

        var source = "";
        var imageSourceUrl = "";
        var height = "";
        var highwidth = "";

        // check for preview images
        if (preview && preview.images) {

            source = preview.images[0].source;
            imageSourceUrl = source.url;
            height = source.height;
            highwidth = source.width;

        }

        // return card
        return (
            <div className={this.state.hidden}>
                <a className="postTitle" href={url} target="_blank">{title}</a>
                <button className="postSubreddit" onClick={this.onSubClick}>/r/{subreddit}</button>
                <a className="commentslink" href={comments_link} target="_blank">{num_comments} comments</a>
            </div>

        );
    }
});

// holds individual Posts
var PostList = React.createClass({

    render: function() {

        var posts = this.props.data;

        if (this.props.data) {

            var wait = 0;

            // return Post for each Posts value
            var PostNodes = posts.map(function(thispost) {

                // delay entry
                wait += 50;

                return (
                    // need to pass handleSubClick to child somehow ??
                    <Post wait={wait} onSubClick={this.handleSubClick.bind(this)} post={thispost} key={thispost.key} />
                );
            }, this);
        }

        // render all Posts (PostNodes)
        return (
            <div>
                {PostNodes}
            </div>

        );
    },

    handleSubClick: function(subreddit) {

        // PostHolder.changeSub("http://www.reddit.com/r/" + this.props.post.subreddit);
        //this.props.onSubClick();
        this.props.loadPosts(subreddit);

    }
});

// individual Post
var PostHolder = React.createClass({

    loadPostsFromReddit: function(subreddit) {

        var url = "";

        // re-do enter animation on each load
        Posts = [];
        this.setState({posts: Posts});

        // use props if nothing is passed
        if (!subreddit) {
            url = this.props.url;
            subreddit = "frontpage";
        } else {
            url = "http://www.reddit.com/r/" + subreddit + ".json";
        }
        console.log(">loading " + url);

        // gets data from reddit, stores in Posts
        $.getJSON(url, function(json) {

            // put results in an array
            var listing = json.data.children;

            // stores listing in Posts
            for (var i = 0; i < listing.length; i++) {
                Posts[i] = listing[i].data;
                Posts[i].key = i;
            }

            // sets state of posts to reddit data
            this.setState({ posts: Posts });

            document.getElementById("rrr").innerHTML = subreddit;


        }.bind(this));

    },

    getInitialState: function() {
        return { Posts: [] };
    },

    componentDidMount: function() {
        this.loadPostsFromReddit();
        //setInterval(this.loadPostsFromReddit, 2000);
    },

    render: function() {

        return (
            <PostList data={this.state.posts} loadPosts={this.loadPostsFromReddit} />
        );
    }
});

var Toolbar = React.createClass({

    render: function() {

        return (
            <div id="toolbar">
                <img id="toolbar-icon" src="icon.png" />
                <div id="rrr">frontpage</div>
            </div>

        );
    }
});

var Container = React.createClass({

    render: function() {

        return (
            <div>
                <Toolbar />
                <div id="posts-container">
                    <PostHolder url="http://www.reddit.com/.json" />
                </div>
                
            </div>

        );
    }
});

// render the PostList while passing in 'Posts'
ReactDOM.render(
    <Container />,
    document.getElementById('container')
);
// ReactDOM.render(
//     <PostHolder url="http://www.reddit.com/.json" />,
//     document.getElementById('posts-container')
// );
