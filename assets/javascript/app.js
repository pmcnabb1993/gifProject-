$(document).ready(function(){

// Initial array of reactions
var reactions = ["Happy", "Angry", "Excited", "Confused", "Shocked"];
console.log(reactions);


//Function to render new buttons//
function renderButtons() {
    $("#buttons-view").empty();
    for (i = 0; i < reactions.length; i++){
        var a = $("<button>");
        a.addClass("gButton");
        a.addClass("btn btn-info");
        a.attr("data-name", reactions[i]);
        a.text(reactions[i]);
        $("#buttons-view").append(a);
    }
}

//Click function to push a new input into the array//
$("#add-reaction").on("click", function(event){
    event.preventDefault();
    var gifInput = $(".input").val().trim();
    reactions.push(gifInput);
    renderButtons();
});

//Function to display to grab the gif from Giphy API//
$("body").on("click", ".gButton", function(){
    $(".gifs-appear-here").empty();
    console.log("Hello");
    event.preventDefault();
    var gButton = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gButton + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    //After data comes back from API then store data and display it//
      .done(function(response) {
          console.log(response)
        var results = response.data;
        for (var i = 0; i < results.length; i++){
        var gifDiv = $("<div>");
        gifDiv.addClass("gifDiv");
        var rating = results[i].rating;
        var p = $("<p>").text(gButton + ": Rating-" + rating);
        var gif = $("<img>");
        gif.attr("src", results[i].images.fixed_height_still.url);

        $("#gifs-appear-here").prepend(gifDiv);
        gif.addClass("gif");
        gif.attr("data-state", "still");
        gif.attr("data-animate", results[i].images.fixed_height.url);
        gif.attr("data-still", results[i].images.fixed_height_still.url);
        gifDiv.prepend(p);
        gifDiv.prepend(gif);
        }
    });
});

$("body").on("click", ".gif", function(){
    var state = $(this).attr("data-state");

    if (state === "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
});


renderButtons();



//End Document.ready//
});



