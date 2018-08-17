
var api = {
  root: "https://api.themoviedb.org/3",
  token: "8e888fa39ec243e662e1fb738c42ae99" // TODO 0 put your api key here
}

var flicklistView = new Vue({
	el: '#mount-target',
	data: function() {
		return {
			// This is the data model.
			// Whenever it changes, Vue will automatically re-render
			// the html for us.
			loading: false,
			error: null,
			page: 1,
			watchlistItems: [],
			browseItems: []
		};
	},
	methods: {
		fetchMovies: function(page) {
			return fetch(`${api.root}/discover/movie?api_key=${api.token}&page=${page}`)
					.then(resp => resp.ok ? resp.json() : Promise.reject(resp));
		},
		discoverMovies: function () {
			/**
			 * Makes an AJAX request to themoviedb.org, asking for some movies
			 * if successful, updates the data.browseItems appropriately
			 */
			this.loading = true;
			this.fetchMovies(this.page)
				.then(response => {
						this.browseItems = [
							...this.browseItems,
							...response.results
						];
						this.page = response.page + 1;
				})
				.catch(err => {
					this.error = 'no more movies :(';
				})
				.finally(() => { this.loading = false; });
		},
		// TODO 5 (done)
		// make a method to use when a "Add to Watchlist" button is clicked
		// It should accept a movie as a parameter, and add that item to
		// the watchlistItems list,
		addToWatchlist: function(movie) {
			// I want to add a movie to the watchlistItems list.
			// to google: "How to add an item to a list in javascript"
			this.watchlistItems.push(movie);
			console.log('added', movie, 'to', this.watchlistItems);
		},
	},
	mounted: function() {
		// call discoverMovies when things start up
		this.discoverMovies();
	},
});
