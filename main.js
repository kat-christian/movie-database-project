const apiList = "https://perpetual-pear-bearberry.glitch.me/movies"

getMovies()

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
                        <img class="card-img-top" src="${img}" alt="movie poster">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${plot}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Dir: ${director}, ${year}</li>
                            <li class="list-group-item">${actors}</li>
                            <li class="list-group-item">Rating: ${rating}</li>
                            <li class="list-group-item">${genre}</li>
                        </ul>
                        <div class="card-footer text-end">
                            <button type="button" data-id="${id}" class="editMovieButton btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#editMovieModal">Edit</button>
                            <button type="button" data-id="${id}" class="deleteMovieButton btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                    </div>
                `)
                })
            })
    }, 1500)
}

function addMovies(movieObj) {
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

$("#addMovieButton").click(function () {
    addMovies({
        "title": $("#addMovieTitle").val(),
        "rating": $("#addMovieRating").val()
    }).then(r => console.log(r.json()))
})


// $(".deleteMovieButton").click(function () {
//     console.log("something")
//     // $("#editMovieTitle").val("testing")
// })

document.querySelector(".deleteMovieButton").addEventListener("click" , event => {
    console.log("testing");
})