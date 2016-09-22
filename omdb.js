$(document).ready(function(){

  $("#search_form").submit(function(event){
    event.preventDefault();
    // Clear the Search results
    $("#movies").html("");
    // Search for the submitted term
    omdbSearch( $("#search").val() );

    console.log( $("#search").val() );
    // $(...).val() gets us 
    // element.value
  });

}); // $(document).ready

function omdbSearch( term ) {
  $.getJSON("http://www.omdbapi.com/?",
    {
      s: term
    }, function(data){
      // filter out any movies not made
      // in 2014 or later
      var results = data.Search.filter(function(movie){
        // parseInt(movie.Year) >= 2000
        return movie.Poster !== "N/A";
      }); // data.Search.filter

      results.forEach(function(movie){
        var html = '<div class="movie">'+
        '<h2>' + movie.Title + '</h2>' + 
        '<img src="' + movie.Poster + '" height="500px" /></div>';
        $("#movies").append(html);
      });

      console.log(results);
    });
}