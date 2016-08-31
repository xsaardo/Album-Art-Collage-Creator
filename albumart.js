// Global Vars
var initialFlag = 1;
var modal = document.getElementById('myModal');
var albumArtURL;
var placeholderImg = "http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png"

// Execute upon page load
$(window).on('load', function(){generateGrid();}); 

/*****Main Functionality*****/

// Generate grid of img objects
window.generateGrid = function() {
	
	// Save current images if not initial site load
	if (!initialFlag) {
		var prevNumRows = document.getElementById("numRows").value;
		var prevNumCols = document.getElementById("numCols").value;
		var imageMatrix = new Array();
		var imageRow = new Array();
		var saveImage;
		for (var i = 0; i < prevNumRows; i++) {
			for (var j = 0; j < prevNumCols; j++) {
				saveImage = i.toString() + ',' + j.toString();
				try {
					imageRow.push(document.getElementById(saveImage).src);
					console.log(document.getElementById(saveImage).src);
				}
				catch(err) {
					imageRow.push(placeholderImg);
				}
			}
			imageMatrix.push(imageRow);
			imageRow = [];
		}
	}
	
	// Background color
	var backcolor = document.getElementById("backcolor").value;
	backcolor = backcolor.toLowerCase();
	if (backcolor.charAt(0) != '#') { 
		backcolor = "#" + backcolor;
	}
	backcolor = backcolor.toString();
	if (backcolor.length != 7) {
		alert("Invalid Hex Value for Background Color");
	}
	$('#albums').css('background-color', backcolor);
	$('#header').css('background-color', backcolor);
	
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
	for (i = 0; i < numRows; i++) {
		albumHTML = albumHTML + '<div class="row"><div align="center" class="col-lg-12">' + '\n';
		for (j = 0; j < numCols; j++) {	
			id = i.toString() + "," + j.toString();
			albumHTML = albumHTML + '<a id="a" data-target="#myModal" data-toggle="modal" onclick="setCurID(event)"><img ondragover="allowDrop(event)" draggable="true" ondragstart="drag(event)" ondrop="drop(event)" class="albumarts" width=' + imgSize + ' height=' + imgSize + '  src="http://larics.rasip.fer.hr/wp-content/uploads/2016/04/default-placeholder.png" id="' + id + '" alt="test"></a>';
		}
		albumHTML = albumHTML + "</div></div>" + '\n';
	}
	
	$("#albums").html(albumHTML); // Insert HTML
	
	// Image Margins (wait til document is ready)
	var marginSize = document.getElementById("marginSize").value;
	$(document).ready(function () {
		$('img').css('margin', marginSize + 'px');
	});
	
	// Reinsert previous images
	if (!initialFlag) {
		for (i = 0; i < numRows; i++) {
			imageRow = imageMatrix[i];
			for (j = 0; j < numCols; j++) {
				selectedImg = i.toString() + ',' + j.toString();
				try {
				document.getElementById(selectedImg).src = imageRow[j];
				}
				catch(err) {}
			}
		}
	}
	else {
		defaultAlbums();
	}
	
	initialFlag = 0;
};

$('#myModal').on('shown.bs.modal', function(event){
	$('#searchTerm').focus();
	//console.log(event.target.id);
});

$('#searchTerm').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
	albumsearch();
    return false;
  }
});

var albumsearch = function() {
	var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
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
					albumArtURL = placeholderImg;
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

var setCurID = function(event) {
	curID = event.target.id;
}

var chooseIMG = function(url) {
	document.getElementById(curID).src = url.id;
	$('#myModal').modal('hide');
	document.getElementById("searchTerm").value = "";
};

/*****Additional Features*****/

// Shuffle images around
var shuffle = function() {
	var img1, img2;
	var selectedImg1, selectedImg2;
	var i,j,ii,jj;
	var numCols = document.getElementById("numCols").value;
	var numRows = document.getElementById("numRows").value;
	
	for (var k = 0; k < 60; k++) {
		j = Math.round(Math.random()*(numCols-1));
		i = Math.round(Math.random()*(numRows-1));
		jj = Math.round(Math.random()*(numCols-1));
		ii = Math.round(Math.random()*(numRows-1));
		selectedImg1 = i.toString() + "," + j.toString();
		selectedImg2 = ii.toString() + "," + jj.toString();
		img1 = document.getElementById(selectedImg1).src;
		img2 = document.getElementById(selectedImg2).src;
		document.getElementById(selectedImg1).src = img2;
		document.getElementById(selectedImg2).src = img1;
	
	}
};

// Drag and Drop Functionality
var drag = function(ev) {
	ev.dataTransfer.setData("text",ev.target.id);
}

var allowDrop = function(event) {
	event.preventDefault();
}

var drop = function(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	var initialImg = document.getElementById(data).src;
	document.getElementById(data).src = ev.target.src;
	ev.target.src = initialImg;
}

var defaultAlbums = function() {
	var lastfm_apikey = "dc639df7a8d4027a6f8d66ba3f9eb0a2";
	var numCols = document.getElementById("numCols").value;
	var numRows = document.getElementById("numRows").value;
	var selectedImg;
	var k = 0;
	var randLetter = Math.floor(Math.random()*26) + 97;
	var searchterm = String.fromCharCode(randLetter);
	var i;
	var j;
	var artSouce;
	$.getJSON("http://ws.audioscrobbler.com/2.0?method=album.search&album=" + searchterm + "&api_key=" + lastfm_apikey + "&format=json&callback=?", function(json){
		for (i = 0; i < numRows; i++) {
			for (j = 0; j < numCols; j++) {				
				selectedImg = i.toString() + "," + j.toString();
				artSource = json.results.albummatches.album[k].image[2]['#text'];
				if (artSource === "") {
					artSource = placeholderImg;
				}
				document.getElementById(selectedImg).src = artSource;
				k++
			}
		}
	});
}
