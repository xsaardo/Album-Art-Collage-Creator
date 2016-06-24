window.generateGrid = function() {
	
	var numCols = document.getElementById("numCols").value;
	var numRows = document.getElementById("numRows").value;
	
	imgSize = document.getElementById("artsize").value;

	document.getElementById("info").innerHTML = "";
	
	var par = document.getElementById("albums");
	
	tab = document.createElement("TABLE");
	
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

window.getIMG = function(i,j) {
	var searchterm = prompt("Search for an album!");
	var selectedImg = i.toString() + "," + j.toString();
	var LastfmAPI = require('lastfmapi');
	var lfm = new LastfmAPI({'api_key': '0cdd0fae9092776cc67729ebf4d9d8a3',
							 'secret': 'deeca99c13c0060a5255762b5d18af35'});
	lfm.album.search({
		'album' : searchterm,
		'limit' : 5,
		'page' : 1
	}, function (err,album) {
		if (err) {throw err;}
		document.getElementById(selectedImg).src = 	album.albummatches.album[0].image[2]['#text']
	});
};