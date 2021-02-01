// IIFE : Immediately Invoked Function Expression

(function() {

    var app = document.getElementById('app');
    var btn = document.getElementById('btn');
    const API = 'https://jsonplaceholder.typicode.com/posts';

    function loadData() {
        fetch(API)
            .then(res => res.json())
            .then(posts => {
                buildDom(posts);
            })
    }

    function buildDom(posts) {
      
        posts.forEach((post, i) => {
            if (i < 5) {
                var div = document.createElement("div");
                div.innerText = post.title;
                div.classList.add('post');

                div.addEventListener('click', () => {
                    // affiche l'id du post
                    console.log('post', post);
                })

                app.appendChild(div);

            }
                
        })

    }

    function addEvent() {
        btn.addEventListener('click', () => {
            loadData();
        })
    }

    loadData();
    addEvent();

})()




