// Execute upon page load
$(window).on('load', function(){generateGrid();}); 

var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";

// Generate grid of img objects
window.generateGrid = function() {
	// Background color
	var backcolor = document.getElementById("backcolor").value;
	backcolor = backcolor.toLowerCase();
	if (backcolor.charAt(0) != '#') { 
		backcolor = "#" + backcolor;
	}
	backcolor = backcolor.toString();
	if (backcolor.length != 7) {
		alert("Incorrect Hex Value for Background Color");
	}
	$('#albums').css('background-color', backcolor);
	
	// Grid row/cols
	var numCols = document.getElementById("numCols").value;
	var numRows = document.getElementById("numRows").value;
	numCols = document.getElementById("numCols").value;
	numRows = document.getElementById("numRows").value;
	
	// Image size
	var imgSize = document.getElementById("artsize").value;
	$('.albumarts').css('height',imgSize.toString() + 'px');
	$('.albumarts').css('width',imgSize.toString() + 'px');
	
	var id;
	document.getElementById("albums").innerHTML = ""; // Clear out existing albums
	
	var albumHTML = ""; // Init album html block
	
	// Generate HTML for album grid
	for (var i = 0; i < numRows; i++) {
		albumHTML = albumHTML + '<div class="row"><div align="center" class="col-lg-12">' + '\n';
		for (var j = 0; j < numCols; j++) {	
			id = i.toString() + "," + j.toString();
			albumHTML = albumHTML + '<a id="a" data-target="#myModal" data-toggle="modal" onclick="setCurID(event)"><img class="albumarts" width=' + imgSize + ' height=' + imgSize + '  src="http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png" id="' + id + '" alt="test"></a>';
		}
		albumHTML = albumHTML + "</div></div>" + '\n';
	}
	
	$("#albums").html(albumHTML); // Insert HTML
	
	// Image Margins (wait til document is ready)
	var marginSize = document.getElementById("marginSize").value;
	$(document).ready(function () {
		$('img').css('margin', marginSize + 'px');
	});
};

// Get album art from last.fm search
window.getIMG = function(i,j) {
	var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
	var searchterm = prompt("Search for an album!");
	var selectedImg = i.toString() + "," + j.toString();
	$.getJSON("http://ws.audioscrobbler.com/2.0?method=album.search&album="+ searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json){
		document.getElementById(selectedImg).src = json.results.albummatches.album[0].image[2]['#text'];
	});
};

/*
var defaultAlbums = function() {
	var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
	var numCols = document.getElementById("numCols").value;
	console.log(numCols);
	
	var numRows = document.getElementById("numRows").value;
	console.log(numRows);
	var selectedImg;
	var k = 0;
	var searchterm = 'a';
	var i;
	var j;
	
	for (i = 0; i < numRows-1; i++) {
		console.log(i);
		for (j = 0; j < numCols-1; j++) {
			console.log(j);
			$.getJSON("http://ws.audioscrobbler.com/2.0?method=album.search&album=" + searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json){
				
				selectedImg = i.toString() + "," + j.toString();
				console.log(selectedImg);
				document.getElementById(selectedImg).src = json.results.albummatches.album[0].image[2]['#text'];
				
			});
			setTimeout(function()
				{
					;

				}, 2000);
		}
	}
}*/

// Shuffle images around
var shuffle = function() {
	var img1, img2;
	var selectedImg1, selectedImg2;
	var i,j,ii,jj;
	var numCols = document.getElementById("numCols").value;
	var numRows = document.getElementById("numRows").value;
	
	for (var k = 0; k < 60; k++) {
		j = Math.round(Math.random()*(numCols-1));
		console.log(i);
		i = Math.round(Math.random()*(numRows-1));
		console.log(j);
		jj = Math.round(Math.random()*(numCols-1));
		console.log(ii);
		ii = Math.round(Math.random()*(numRows-1));
		console.log(jj);
		selectedImg1 = i.toString() + "," + j.toString();
		selectedImg2 = ii.toString() + "," + jj.toString();
		img1 = document.getElementById(selectedImg1).src;
		img2 = document.getElementById(selectedImg2).src;
		document.getElementById(selectedImg1).src = img2;
		document.getElementById(selectedImg2).src = img1;
	
	}
};

//curID = "1,1";

var modal = document.getElementById('myModal');

$('#myModal').on('shown.bs.modal', function(event){
	$('#searchTerm').focus();
	console.log(event.target.id);
});

$('#searchTerm').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
	albumsearch(1);
    return false;
  }
});

var setCurID = function(event) {
	curID = event.target.id;
}
var albumArtURL;

var albumsearch = function() {
	$('#searchTerm').focus();
	var albumModal = document.getElementById('myModal');
	var searchterm = document.getElementById('searchTerm').value;
	console.log(searchterm);
	var albumHTML = ""; // Init album html block
	var aid;
	var k = 0;
	
	
	$.getJSON("http://ws.audioscrobbler.com/2.0?method=album.search&album="+ searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json){
		// Generate HTML for album grid
		for (var i = 0; i < 2; i++) {
			albumHTML = albumHTML + '<div class="row"><div align="center" class="col-lg-12">' + '\n';
			for (var j = 0; j < 5; j++) {	
				albumArtURL = json.results.albummatches.album[k].image[2]['#text'];
				if (albumArtURL === "") {
					albumArtURL = "http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png";
				}
				aid = "modal " + i.toString() + "," + j.toString();
				albumHTML = albumHTML + '<img hspace=5 vspace=5 width=100 height=100 src="' + albumArtURL + '" id="' + albumArtURL + '" onclick="chooseIMG(this)">';
				k++;
			}
			albumHTML = albumHTML + "</div></div>" + '\n';
		}
		$("#albumsFound").html(albumHTML); // Insert HTML
		console.log(albumHTML);
	});
};


var chooseIMG = function(url) {
	document.getElementById(curID).src = url.id;
	$('#myModal').modal('hide');
	document.getElementById("searchTerm").value = "";
};
