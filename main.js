const movieList = "https://perpetual-pear-bearberry.glitch.me/movies";

getMovies();

let moviesArr = [];
let myMovieObj = {};

function getMovies() {
    $(".container").html('<div class="loader m-auto"></div>')
    setTimeout(() => { // emulates a loading screen to show off the loading animation
        fetch(movieList)
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
                            <li class="movieDirector list-group-item">Dir: ${director}, ${year}</li>
                            <li class="movieActors list-group-item">${actors}</li>
                            <li class="movieRating list-group-item">Rating: ${rating}/10</li>
                            <li class="movieGenre list-group-item">${genre}</li>
                        </ul>
                        <div class="card-footer text-end">
                            <button type="button" data-id="${id}" class="editMovieButton btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#editMovieModal">Edit</button>
                            <button type="button" data-id="${id}" class="deleteMovieButton btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteMovieModal">Delete</button>
                        </div>
                    </div>
                `)
                })
            })
            .then(function editButton () {
                $(".editMovieButton").click(function () {
                    let movieId = parseInt($(this).attr("data-id"))
                    let movieArr = moviesArr.filter(function (movie) {
                        if (movie.id === movieId) {
                            return movie;
                        }
                    })
                    myMovieObj = movieArr[0];
                    $("#editMovieTitle").val(myMovieObj.title)
                    $("#editMovieDirector").val(myMovieObj.director)
                    $("#editMovieYear").val(myMovieObj.year)
                    $("#editMoviePlot").val(myMovieObj.plot)
                    $("#editMovieActors").val(myMovieObj.actors)
                    $("#editMovieGenre").val(myMovieObj.genre)
                    $("#editMoviePoster").val(myMovieObj.poster)
                    $("#editMovieRating").val(myMovieObj.rating)
                })
            })
            .then(function deleteButton () {
                $(".deleteMovieButton").click(function () {
                    console.log("delete button clicked")
                    let movieId = parseInt($(this).attr("data-id"))
                    let movieArr = moviesArr.filter(function (movie) {
                        if (movie.id === movieId) {
                            return movie;
                        }
                    })
                    myMovieObj = movieArr[0];
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
    return fetch(movieList, options)
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
    return fetch(`${movieList}/${myMovieObj.id}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getMovies();
        })
        .catch(error => console.log(error))
}

function deleteMovies(movieObj) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movieObj)
    };
    return fetch(`${movieList}/${myMovieObj.id}`, options)
        .then(response => response.json)
        .then(data => {
            console.log(data)
            getMovies();
        })
        .catch(error => console.log(error));
}


$("#addMovieButton").click(function (e) {
    e.preventDefault();
    let title = $("#addMovieTitle").val();
    let director = $("#addMovieDirector").val();
    let year = $("#addMovieYear").val();
    let plot = $("#addMoviePlot").val();
    let actors = $("#addMovieActors").val();
    let genre = $("#addMovieGenre").val();
    let poster = $("#addMoviePoster").val();
    let rating = $("#addMovieRating").val();
    moviesArr.length = 0;
    addMovies({
        "title": title,
        "director": director,
        "year": year,
        "plot": plot,
        "actors": actors,
        "genre": genre,
        "poster": poster,
        "rating": rating
    }).then(r => console.log(r.json()))
})

$("#editMovieButton").click(function (e) {
    e.preventDefault()
    let title = $("#editMovieTitle").val();
    let director = $("#editMovieDirector").val();
    let year = $("#editMovieYear").val();
    let plot = $("#editMoviePlot").val();
    let actors = $("#editMovieActors").val();
    let genre = $("#editMovieGenre").val();
    let poster = $("#editMoviePoster").val();
    let rating = $("#editMovieRating").val();
    moviesArr.length = 0;
    editMovies({
        "title": title,
        "director": director,
        "year": year,
        "plot": plot,
        "actors": actors,
        "genre": genre,
        "poster": poster,
        "rating": rating
    }).then(r => console.log(r.json()))
})

$("#deleteMovieButton").click(function (e) {
    e.preventDefault()
    moviesArr.length = 0;
    deleteMovies(myMovieObj)
        .then(response => response.json());
})