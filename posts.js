// reddit data eventually
var Posts = [];

// individual Post
var Post = React.createClass({

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

        // if gilded
        var cardClass = "card";
        if (gilded == 1) cardClass = "gold card";

        // return card
        return (
            <div className={cardClass}>
            	<a className="postTitle" href={url} target="_blank">{title}</a>
            	<p className="postSubreddit" onClick={this.onSubClick}>/r/{subreddit}</p>
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
            // return Post for each Posts value
            var PostNodes = posts.map(function(thispost) {
                return (
                	// need to pass handleSubClick to child somehow ??
                    <Post onSubClick={this.handleSubClick.bind(this)} post={thispost} key={thispost.key} />
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
        this.props.loadPosts("http://www.reddit.com/r/" + subreddit + "/.json");

    }
});

// individual Post
var PostHolder = React.createClass({

    loadPostsFromReddit: function(url) {

        // use props if nothing is passed
        if (!url) {
            url = this.props.url;
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

            console.log(">retrieved " + Posts.length + " posts");

            // sets state of posts to reddit data
            this.setState({ posts: Posts });

        }.bind(this));

    },

    getInitialState: function() {
        return { Posts: [] };
    },

    componentDidMount: function() {
        this.loadPostsFromReddit(this.props.url);
        //setInterval(this.loadPostsFromReddit, 2000);
    },

    render: function() {

        return (
            <PostList data={this.state.posts} loadPosts={this.loadPostsFromReddit} />
        );
    }
});

// render the PostList while passing in 'Posts'
ReactDOM.render(
    <PostHolder url="http://www.reddit.com/.json" />,
    document.getElementById('posts-container')
);
