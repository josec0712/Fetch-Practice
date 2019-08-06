const categorySelect = (function (window) {

const JSON_URL = "./js/Movies.json";
let $DOM = {};
function _getCategories (){
    fetch(JSON_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        _fillSelect(data);
        $DOM.elementCategory.addEventListener('change',function(e){
            _cleanList();
            _fillMoviesTable(data);
        });
    })
    .catch(err => {
        console.log(err);    
    })
}

function _fillSelect(Movies){
    var option;
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
      }
    var categories = Movies.map(car => {
        return car.Category;
    })
    categories = categories.filter(unique);
    categories.forEach(category => {
        var option = document.createElement('option');
        option.classList.add("dropdown-item");
        option.text = category;
        $DOM.elementCategory.appendChild(option);
    });
}

function _fillMoviesTable(Movies){
    var filteredArray = Movies.filter(movie => {
        return movie.Category == $DOM.elementCategory.options[$DOM.elementCategory.selectedIndex].text;
    });

    filteredArray.forEach(movie => {
        var Item = document.createElement('li');
        Item.classList.add("list-group-item");
        Item.classList.add("list-group-item-action");
        Item.innerHTML = movie.Name;
        Item.addEventListener('click', function(e){
            buildDescriptionBox(movie.Name, filteredArray);
        });
        $DOM.tableMovies.appendChild(Item);
    });
}
function buildDescriptionBox(name, movies){
    var descriptionBox = $DOM.descriptionBox;
    var tittle = document.getElementById("Movie-name");
    var Sinopsis = document.getElementById("text-sinopsis");
    //tittle.innerHTML = "";
    //Sinopsis.innerHTML = "";
    descriptionBox.classList.remove("descriptionBox__inactive");
    var MovieFound = _FindDescription(name, movies)
    tittle.innerHTML = MovieFound.Name;
    Sinopsis.innerHTML = MovieFound.Description;
}

function _FindDescription(name, movies){
   return movies.find(movie => {
        return movie.Name == name;
   });
}

function _cleanList(){
    $DOM.tableMovies.innerHTML = "";
}

// cache $DOM elements
function cacheDom() {
    $DOM = {
        elementCategory: document.getElementById("selectCategories"),
        tableMovies: document.getElementById("MoviesList"),
        descriptionBox: document.getElementById("descriptionBox")
    };
}

// Component Init
function init() {
    cacheDom();
    _getCategories();
}

return {
    init: init
};
})(window);

(function () {
    categorySelect.init();
})();