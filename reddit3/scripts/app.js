var app = new Vue({
    el: '#app',
    data: {
        posts: []
    },
    methods: {
        
    	// get reddit data
        fetchData: function() {
            
            axios.get('https://www.reddit.com/.json')
                .then(function(results) {
                	console.log(results.data.data.children)

                    try {
                        app.posts = results.data.data.children
                        Vue.nextTick(function() {
                            $('.collapsible').collapsible()
                            $('.materialboxed').materialbox()
                        })
                    } catch (e) {
                        console.log(e)
                    }
                })
        },

        // format numbers above 1000
        k: function(num) {
        	if (num > 999) {
        		return (num / 1000).toFixed(1) + 'k'
        	}
            else return num
        },

        // get highest resolution preview for post
        getPreview: function(post) {
        	try {
        		return post.data.preview.images[0].resolutions.slice(-1)[0].url.replace(/&amp;/g,"&")
        	} catch(e) {
        		return 'https://lorempixel.com/100/190/nature/6'
        	}
        	return 'hi'
        }
    },
    created: function() {
        this.fetchData()
    }
})