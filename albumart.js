var numCols;
var numRows;
var first = true;

var generateGrid = function() {
	
	numCols = document.getElementById("numCols").value;
	numRows = document.getElementById("numRows").value;
	var par = document.getElementById("test");
	
	if (first == false) {
		var trash = par.firstChild;
		par.removeChild(trash);
	}
	
	tab = document.createElement("TABLE");
	first = false;
	
	par.appendChild(tab);
	
	for (i = 0; i < numRows; i++) {
		var row = tab.insertRow(i);
		for (j = 0; j < numCols; j++) {
			var cell = row.insertCell(j);
			var img = document.createElement("IMG");
			img.id = i.toString() + "," + j.toString();
			
			img.setAttribute("onclick", "getIMG(" + i + "," + j + ")");
			cell.appendChild(img);
		}
	}

}

var getIMG = function(i,j) {
	alert("HI")
	var music = require('musicmatch')();
	music.artistSearch({q: "gojira", page_size:1})
	.then(function(artistFound) {
		var artID = artistFound.message.body.artist_list[0].artist.artist_id;
		
		music.artistAlbums({artist_id: artID})
		.then(function(albumsFound) {
			var selectedImg = i.toString() + "," + j.toString();
			document.getElementById(selectedImg).src = albumsFound.message.body.album_list[0].album.album_coverart_100x100;
		});
		
		
	});
	
};