// reddit data eventually
var Posts = [];

// individual Post
var Post = React.createClass({

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

        if (preview && preview.images) {
            
            source = preview.images[0].source;
            imageSourceUrl = source.url;
            height = source.height;
            highwidth = source.width; 

        }

        console.log(imageSourceUrl);

        // prints Post scores
        if (gilded == 1) {
            return (
                <div className="gold card">
                	<a className="postTitle" href={url} target="_blank">{title}</a>
                	<p className="postSubreddit">/r/{subreddit}</p>
                    <a className="commentslink" href={comments_link} target="_blank">{num_comments} comments</a>
                </div>

            );
        } 
        else {
            return (
                <div className="card">
                	<a className="postTitle" href={url} target="_blank">{title}</a>
                	<p className="postSubreddit">/r/{subreddit}</p>
                    <a className="commentslink" href={comments_link} target="_blank">{num_comments} comments</a>
                </div>

            );
        }
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
                    <Post post={thispost} key={thispost.key} />
                );
            });
        }

        // render all Posts (PostNodes)
        return (
            <div>
                {PostNodes}
            </div>

        );
    }
});

// individual Post
var PostHolder = React.createClass({

    loadCommentsFromReddit: function() {

        console.log("loading...");

        // gets data from reddit, stores in Posts
        $.getJSON(this.props.url, function(json) {

            // put results in an array
            var listing = json.data.children;

            // stores listing in Posts
            for (var i = 0; i < listing.length; i++) {
                Posts[i] = listing[i].data;
                Posts[i].key = i;
            }

            // sets state of posts to reddit data
            this.setState({ posts: Posts });

        }.bind(this));
    },

    getInitialState: function() {
        return { Posts: [] };
    },

    componentDidMount: function() {
        this.loadCommentsFromReddit();
        //setInterval(this.loadCommentsFromReddit, 2000);
    },

    render: function() {

        return (
            <PostList data={this.state.posts} />
        );
    }
});

// render the PostList while passing in 'Posts'
ReactDOM.render(
    <PostHolder url="http://www.reddit.com/.json" />,
    document.getElementById('container')
);
