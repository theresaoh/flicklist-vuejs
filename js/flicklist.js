
var api = {
  root: "https://api.themoviedb.org/3",
  token: "f6bd21e39046f6a08df40d82ad8cffd3"
}

var flicklistView = new Vue({
	el: '#mount-target',
	data: function() {
		return {
			// This is the data model.
			// Whenever it changes, Vue will automatically re-render
			// the html for us.
			watchlistItems: [],
      browseItems: [],
      // TODO 8B
      searchTerm: null,
		};
	},
	methods: {
		discoverMovies: function () {
			/**
			 * Makes an AJAX request to themoviedb.org, asking for some movies
			 * if successful, updates the data.browseItems appropriately
			 */

			fetch(`${api.root}/discover/movie?api_key=${api.token}`)
					.then(resp => resp.ok ? resp.json() : Promise.reject(resp))
					.then((response) => {
						console.log("We got a response from The Movie DB!");
						console.log(response);

						this.browseItems = response.results;

					});
    },
    searchMovies: function(searchTerm) {
      // Make an AJAX request to the /search/movie endpoint
      // of the API, using the query string that was passed in.
      //
      // if successful, update this.browseItems appropriately.
      // This update will automatically trigger a re-render.
      console.log(`searching for movies with "${searchTerm}" in their title...`);

      // TODO 9
      // implement this function as described in the comment above
      // you can use the body of discoverMovies as a jumping off point
      fetch(`${api.root}/search/movie?api_key=${api.token}&query=${searchTerm}`)
      .then(resp => resp.ok ? resp.json() : Promise.reject(resp))
      .then((response) => {
        console.log("We got a response from The Movie DB!");
        console.log(response);

        this.browseItems = response.results;

      });

    },
		addToWatchlist: function(movie) {
			this.watchlistItems.push(movie);
    },
    alreadyOnWatchlist: function(movie) {
      // returns true if movie is already in this.watchlistItems
      return this.watchlistItems.includes(movie);
    },
	},
	mounted: function () {
		this.discoverMovies();
	},
});
