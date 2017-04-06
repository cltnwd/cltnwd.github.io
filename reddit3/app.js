"use strict";

var app = new Vue({
    el: '#app',
    data: {
    	panelClass: '',
    	squeeze: '',
    	menuClass: '',
        message: 'Hello world!',
        posts: []
    },
    methods: {
		togglePanel: function() {
	console.log('tog');
			this.panelClass = (this.panelClass == '') ? 'active' : '';
			this.squeeze = (this.squeeze == '') ? 'squeeze' : '';
			this.menuClass = (this.menuClass == '') ? 'active' : '';
        },
        getData: function(rURL) {
            $.getJSON(rURL, function(data) {
                if (data.data.children.length > 0) app.handleData(data);
                else alert('bad');
            });
        },

        handleData: function(data) {
            for (var i in data.data.children)
                if (data.data.children[i].kind == 't3') app.posts.push(data.data.children[i]);
            console.log(app.posts);
        }
    },
    created: function() {
        this.getData('https://www.reddit.com/.json');
    }
});
