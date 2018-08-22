
var api = {
  root: "https://api.themoviedb.org/3",
  token: "" // TODO 0 add your api key
}

var flicklistView = new Vue({
	el: '#mount-target',
	data: function() {
		return {
			watchlistItems: [],
      browseItems: [],
      searchTerm: null,
      // TODO 3.1, 3.2
      // Add a property for the current active movie index, and a property
      // for a list of image urls (which you'll remove in a later step)
		};
	},
	methods: {
		discoverMovies: function (keywords) {

			fetch(`${api.root}/discover/movie?api_key=${api.token}&with_keywords=${keywords}`)
					.then(resp => resp.ok ? resp.json() : Promise.reject(resp))
					.then((response) => {
						console.log("We got a response from The Movie DB!");
						console.log(response);

						this.browseItems = response.results;

					});
    },
    searchMovies: function(searchTerm) {
      console.log(`searching for movies with "${searchTerm}" in their title...`);

      fetch(`${api.root}/search/keyword?api_key=${api.token}&query=${searchTerm}`)
      .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
      .then((response) => {
        console.log("We got a response from The Movie DB!");
        console.log(response);
        var keywordIDs = response.results.map(r => r.id);
        var keywordsString = keywordIDs.join('|');

        this.discoverMovies(keywordsString);
      });

    },
    posterUrl: function(movie) {
      var baseImageUrl = "http://image.tmdb.org/t/p/w300/";
      return baseImageUrl + movie.poster_path;
      },
		addToWatchlist: function(movie) {
			this.watchlistItems.push(movie);
    },
    removeFromWatchlist: function(movie) {
      this.watchlistItems = this.watchlistItems.filter(m => m !== movie);
    },
	},
	mounted: function () {
		this.discoverMovies();
	},
});
