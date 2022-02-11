const apiList = "https://perpetual-pear-bearberry.glitch.me/movies"

getMovies()

let moviesArr = [];

function getMovies() {
    $(".container").html('<div class="loader m-auto"></div>')
    setTimeout(() => { // emulates a loading screen to show off the loading animation
        fetch(apiList)
            .then(response => response.json())
            .then(movies => {
                $(".loader").hide();
                $(".container").html('<div class="card-deck d-flex justify-content-between flex-wrap"></div>')
                movies.forEach(movie => {
                    console.log(movie);
                    moviesArr.push(movie)
                    let title = movie.title
                    let img = movie.poster
                    let director = movie.director
                    let actors = movie.actors
                    let genre = movie.genre
                    let year = movie.year
                    let plot = movie.plot
                    let rating = movie.rating
                    let id = movie.id
                    $(".card-deck").append(`
                    <div class="card mb-5" style="width: 18rem">
                        <img class="moviePoster card-img-top" src="${img}" alt="movie poster">
                        <div class="card-body">
                            <h5 class="movieTitle card-title">${title}</h5>
                            <p class="moviePlot card-text">${plot}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="movieDirector list-group-item">${director}</li>
                            <li class="movieYear list-group-item">${year}</li>
                            <li class="movieActors list-group-item">${actors}</li>
                            <li class="movieRating list-group-item">${rating}</li>
                            <li class="movieGenre list-group-item">${genre}</li>
                        </ul>
                        <div class="card-footer text-end">
                            <button type="button" data-id="${id}" class="editMovieButton btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#editMovieModal">Edit</button>
                            <button type="button" data-id="${id}" class="deleteMovieButton btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                    </div>
                `)
                })
            })
            .then(function editButton () {
                $(".editMovieButton").click(function () {
                    let movieId = parseInt($(this).attr("data-id"))
                    let movieObj = moviesArr.filter(function (movie) {
                        if (movie.id === movieId) {
                            return movie;
                        }
                    })
                    console.log(movieObj);
                    $("#editMovieTitle").val(movieObj[0].title)
                    $("#editMovieRating").val(movieObj[0].rating)
                })
            })
            .then(function deleteButton () {
                $(".deleteMovieButton").click(function () {
                    console.log("delete button clicked")
                })
            })
            .catch(error => console.log(error));
    }, 1500)
}

function addMovies(movieObj) {
    console.log(movieObj)
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieObj)
    };
    return fetch(apiList, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getMovies();
        })
        .catch(error => console.log(error))
}

function editMovies(movieObj) {
    console.log(movieObj)
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieObj)
    };
    return fetch(apiList, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getMovies();
        })
        .catch(error => console.log(error))
}

$("#addMovieButton").click(function (e) {
    e.preventDefault();
    let movieTitle = $("#addMovieTitle").val();
    let movieRating = $("#addMovieRating").val();
    moviesArr.length = 0;
    addMovies({
        "title": movieTitle,
        "rating": movieRating
    }).then(r => console.log(r.json()))
})

$('#editMovieButton').click(function (e) {
    e.preventDefault()
    let movieTitle = $("#editMovieTitle").val();
    let movieRating = $("#editMovieRating").val();
    moviesArr.length = 0;
    editMovies({
        "title": movieTitle,
        "rating": movieRating
    }).then(r => console.log(r.json()))
})

// create new object, fill with variables, use that for push and delete requests