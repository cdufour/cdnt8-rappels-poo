// IIFE : Immediately Invoked Function Expression

(function() {

    var app = document.getElementById('app');
    var btn = document.getElementById('btn');
    const API = 'https://jsonplaceholder.typicode.com/posts';
    var posts = null;

    function loadData() {
        fetch(API)
            .then(res => res.json())
            .then(posts => {
                buildDom(posts);
            })
    }

    function buildDom(posts) {
        var output = '';
        posts.forEach((post, i) => {
            if (i < 5)
                output += '<div id="' + post.id + '" class="post">' + (i+1) + ') ' + post.title + '</div>';
        })
        app.innerHTML += output;
        addEvent();
    }

    function addEvent() {

        btn.addEventListener('click', () => {
            loadData();
        })

        var posts = document.querySelectorAll('.post');
        //var posts = app.children;
      
        // boucle des éléments du DOM
        posts.forEach(post => {
            post.addEventListener('click', () => {
                console.log('post.id', post.id)
            })
        })
    }

    loadData();

})()




