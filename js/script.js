function searchMovie() {
  $('#card-list').html('');
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '414e4b3c',
      's': $('#search-input').val()
    },
    success: function(result) {
      if(result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function(i, data) {
          $('#card-list').append(`
            <div class="col-md-3">
              <div class="card">
                <div class="card-body">
                  <img class="card-img img-fluid" src="`+data.Poster+`" alt="" />
                  <p class="card-text card-year">`+data.Year+`</p>
                  <h5 class="card-title card-title">`+data.Title.toUpperCase()+`</h5>
                  <p class="card-text card-imdbid">imdbID: `+data.imdbID+`</p>
                  <a class="btn card-btn detail-btn" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" data-id="`+data.imdbID+`">See Details</a>
                </div>
              </div>
            </div>
          `);
        });
        $('#search-input').val('');
      } else {
        $('#card-list').html('<h1 class="text-center">'+result.Error+'</h1>')
      }
    }
  });
}

$('#search-btn').on('click', function() {
  searchMovie();
});

$('#search-input').on('keyup', function(e) {
  if(e.keyCode === 13) {
    searchMovie();
  }
});

$('#card-list').on('click', '.detail-btn', function() {
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      'apikey': '414e4b3c',
      'i': $(this).data('id')
    },
    success: function(movie) {
      console.log(movie);
      if(movie.Response === "True") {
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+movie.Poster+`" class="img-fluid movie-img">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><h3 class="movie-title">`+movie.Title+`</h3></li>
                  <li class="list-group-item"><p class="movie-style">Country: `+movie.Country+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Released: `+movie.Released+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Runtime: `+movie.Runtime+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Genre: `+movie.Genre+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Director: `+movie.Director+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Actors: `+movie.Actors+`</p></li>
                  <li class="list-group-item"><p class="movie-style">Plot: `+movie.Plot+`</p></li>
                </ul>
              </div>
            </div>
          </div>
        `);
      }
    }
  });

});