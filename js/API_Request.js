const categorySelect = (function (window) {
    let $DOM = {};
    const movieCardHTML = "<div class='trending-container__Item'><img src='{0}' class='trending-container__Item__img-poster'><div class='DescriptionContainer'><h1 class='trending-container__Item__movie-name'>{1}</h1></div></div>"

    function _getMovie (){
        var URLbuild = "https://api.themoviedb.org/3/trending/movie/week?api_key=8996d12cca8dc0321d75798c512a0451";
        fetch(URLbuild)
        .then(response => {
            return response.json();
        })
        .then(data => {
            _buildTrendingSection(data);
        })
        .catch(err => {
            console.log(err);    
        });
    }

    function _buildTrendingSection(movies){
        movies.results.forEach(movie => {
            _buildMovieCard(movie);
        });
    }

    function _buildMovieCard(movie){
        console.log(movie);
        var htmlCard;
        htmlCard = movieCardHTML.replace("{0}","https://image.tmdb.org/t/p/w500/"+movie.poster_path);
        htmlCard = htmlCard.replace("{1}",movie.original_title);
        $DOM.MovieContainer.innerHTML += htmlCard;
    }

    // function _fillSelect(Genres){
    //     console.log(Genres.genres);
    //     var option;
    //     Genres.genres.forEach(category => {
    //         var option = document.createElement('option');
    //         option.classList.add("dropdown-item");
    //         option.text = category.name;
    //         option.value = category.id;
    //         $DOM.elementCategory.appendChild(option);
    //     });
    // }

    // cache $DOM elements
    function cacheDom() {
        $DOM = {
             MovieContainer: document.getElementById("movie-container"),
        };
    }
    
    // Component Init
    function init() {
        cacheDom();
        _getMovie();
    }
    
    return {
        init: init
    };
    })(window);
    
    (function () {
        categorySelect.init();
    })();