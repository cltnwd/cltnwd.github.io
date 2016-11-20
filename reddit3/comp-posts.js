// reddit data eventually
var Posts = [];

//<ul className={"commentsList " + this.state.commentsHidden}>
//              	{this.state.comments.map(function(listValue){
//        			return <li>{listValue.body}</li>;
//    			})}
//        </ul>

// individual Post
var Comment = React.createClass({

    getInitialState: function() {
        return { comments: [] };
    },

    componentDidMount: function() {
        this.loadComments();
    },

    loadComments: function() {
        var Comments = [];

        // console.log(this.props.comment.kind);

        if (this.props.comment.data.hasOwnProperty("replies")) {
            if (this.props.comment.data.replies.hasOwnProperty("data")) {
                if (this.props.comment.data.replies.data.hasOwnProperty("children")) {

                    var listing = this.props.comment.data.replies.data.children;

                    for (var i = 0; i < listing.length; i++) {
                        if (listing[i].kind == "t1") {
                            Comments[i] = listing[i];
                        }
                    }

                    this.setState({ comments: Comments });
                }
            }
        }

    },


    render: function() {

        var bodytext = this.props.comment.data.body;

        // var splitterStyle = {
        //     marginLeft: this.props.level * 4
        // };

        var num = (this.props.level-1)%4;
        var x = "";
        switch(num) {
        	case 0: x="one"; break;
        	case 1: x="two"; break;
        	case 2: x="three"; break;
        	case 3: x="four"; break;
        	default: x="one"; break;
        }

        if (this.state.comments.length == 0) {
        	return (
            <div>
            	<div className={"comment " + x}>
                	{bodytext}
            	</div>
        	</div>
        );
        }

        // return card for comment
        return (
            <div>
            	<div className={"comment " + x}>
                	{bodytext}
            	</div>
            	<CommentsList data={this.state.comments} level={this.props.level+1} />
        	</div>
        );

    }
});

// holds individual Posts
var CommentsList = React.createClass({

    render: function() {

        var comments = this.props.data;

        if (this.props.data) {

            // return Comment for each comment value
            var CommentNodes = comments.map(function(thiscomment) {

                return (
                    <Comment comment={thiscomment} level={this.props.level} />
                );
            }, this);
        }

        var num = (this.props.level-1)%4;
        var x = "";
        switch(num) {
        	case 0: x="one"; break;
        	case 1: x="two"; break;
        	case 2: x="three"; break;
        	case 3: x="four"; break;
        	default: x="one"; break;
        }

        // render all comments (PostNodes)
        return (
            <div className={"commentsholder " + x}>
                {CommentNodes}
            </div>

        );
    }
});

var CommentsHolder = React.createClass({

    loadComments: function() {

        // re-do enter animation on each load
        var Comments = [];
        this.setState({ comments: Comments });

        // use props 
        var commentsurl = this.props.commentsurl + ".json";

        // gets data from reddit, stores in Comments
        $.getJSON(commentsurl, function(json) {

            // put results in an array
            var listing = json[1].data.children;

            for (var i = 0; i < listing.length; i++) {
                if (listing[i].kind == "t1") {
                    Comments[i] = listing[i];
                }
            }

            // this.setState({ comments: Comments });
            this.setState({ comments: json[1].data.children });


        }.bind(this));

    },

    getInitialState: function() {
        return { comments: [] };
    },

    componentDidMount: function() {
        this.loadComments();
    },

    render: function() {
        var level = 1;
        return (
        	
            <CommentsList data={this.state.comments} level={level} />
            
        );
    }
});

// individual Post
var Post = React.createClass({

    getInitialState: function() {
        return ({ hidden: "hidden card", commentsContainerState: "hidden", comments: [] });
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

    onCommentsClick: function() {
        if (this.state.commentsContainerState == "hidden") {
        	this.setState({ commentsContainerState: "" });
        }
        else {
        	this.setState({ commentsContainerState: "hidden" });	
        }
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
                <button className="postButton" onClick={this.onSubClick}>/r/{subreddit}</button>
                <button className="postButton" onClick={this.onCommentsClick} >{num_comments} comments</button>
                <div className={"commentscontainer " + this.state.commentsContainerState}>
                	<CommentsHolder commentsurl={comments_link} />
                </div>
                
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

var PostHolder = React.createClass({

    

    componentDidMount: function() {
        //this.loadPostsFromReddit();
        //setInterval(this.loadPostsFromReddit, 2000);
    },

    render: function() {

        return (
            <PostList data={this.props.posts} loadPosts={this.props.loadPosts} />
        );
    }
});

var Toolbar = React.createClass({

    render: function() {

        return (
            <div id="toolbar">
                <img onClick={this.props.clicky} id="toolbar-icon" src="icon.png" />
                <div id="rrr">frontpage</div>
            </div>

        );
    }
});

var Container = React.createClass({

	loadPostsFromReddit: function(subreddit) {

        var url = "";

        // re-do enter animation on each load
        Posts = [];
        this.setState({ posts: Posts });

        // use props if nothing is passed
        if (!subreddit) {
            url = this.state.url;
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

    componentDidMount: function() {
        this.loadPostsFromReddit();
        //setInterval(this.loadPostsFromReddit, 2000);
    },

	getInitialState: function() {
        return { url: "http://www.reddit.com/.json", posts: [] };
    },

    resetToFront: function() {
    	console.log("clicky");
    	this.setState({ url: "http://www.reddit.com/.json" });
    	this.loadPostsFromReddit();
    },

    render: function() {

        return (
            <div>
                <Toolbar clicky={this.resetToFront} />
                <div id="posts-container">
                    <PostHolder loadPosts={this.loadPostsFromReddit} posts={this.state.posts} />
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
