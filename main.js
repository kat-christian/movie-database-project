fetch("https://perpetual-pear-bearberry.glitch.me/movies")
    .then(response => response.json())
    .then(movies => {
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
            $(".card-deck").append(`
                <div class="card" style="width: 18rem">
                    <img class="card-img-top" src="${img}" alt="movie poster">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${plot}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Dir: ${director}, ${year}</li>
                        <li class="list-group-item">${actors}</li>
                        <li class="list-group-item">Rating: ${rating}</li>
                    </ul>
                    <div class="card-footer">${genre}</div>
                </div>
            `)
        })
    })