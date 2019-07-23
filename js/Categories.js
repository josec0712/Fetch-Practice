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
        Item.classList.add("listItem");
        Item.innerHTML = movie.Name;
        $DOM.tableMovies.appendChild(Item);
    });
}

function _cleanList(){
    $DOM.tableMovies.innerHTML = "";
}

// cache $DOM elements
function cacheDom() {
    $DOM = {
        elementCategory: document.getElementById("selectCategories"),
        tableMovies: document.getElementById("MoviesList")
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