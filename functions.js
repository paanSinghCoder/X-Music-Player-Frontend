var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volumeSlider');
var nextSongTitle = document.getElementById('nextSongTitle');
var file = document.getElementById('file');
var audioPlayer = document.getElementById('audioPlayer');
var playlist = document.getElementById('playlist');
var visual = document.getElementById('visual');
var playPause = document.getElementById('playPause');
var equaliser =  document.getElementById('equaliser');
var defaultOpen = document.getElementById("defaultOpen");
var album_art = document.getElementById("album_art");
var fetchPlaylistTitleHead = document.getElementById('titleDiv');
var fetchPlaylistAlbumHead = document.getElementById('albumDiv');
var fetchPlaylistArtistHead = document.getElementById('artistDiv');
var input1 = document.getElementById('searchInput');
var search1 = document.getElementById('searchByAlbumButton');
var search2 = document.getElementById('searchByArtistButton');
var goBackButton =document.getElementById('go-back-button');

var listSongs; //This will contain the id of the ul which will be loaded from "Input type file". function in which this is initialised is playlistFetch()
var songs = new Array();//Stores songs from server
var albums = new Array();//Stores albums from server
var artists = new Array();//Stores artists from server
var art = new Array();//Stores album art from server
var years = new Array();//Stores years from server json response
var albumSearchTitle = new Array();//Stores search result by album json response
var artistSearchTitle = new Array();//stores title result by artist json response
var artistSearchAlbum = new Array();//stores album result by artist json response
var searchFileCount;
var song = new Audio();//New Audio object

var currentSong = 0;//variable to track the current song
var fileCount = 0; //this keeps number of file received in json response


//window.onload = uploadMusic();//loadsong custom method is to be called in order to play the song on loading
//window.onload = playlistFetch();
window.onload = defaultOpen.click();//Selects the first tab "Tracks" by default on window load.
window.onload = hideElements();//This hides selected elements which are to be made visible when needed.

function uploadMusic(evt) {
	/**fileCount = file.files.length;
	for (var i = 0; i<fileCount; i++) 
	{
		songs[i] = file.files.item(i).name;
	}
	//console.log(songs);
	loadSong(); 
	playPause.src="buttons/pause.png" ;**/

	var ourRequest = new XMLHttpRequest();//Ajax 
	ourRequest.open('GET', 'http://localhost:8080/xmusic/rest/allmusic/playlist');
	ourRequest.onload = function(){
	var data = JSON.parse(ourRequest.responseText);
	//console.log(data);
	if(data=="")
		{
			alert("Oops! No song found on server. Upload some music files before loading into the player.");
		}else{
			for (var i = 0; i < data.length; i++) {//fetch data from json response and store in individual array
	 		songs[i] = data[i].Title;
	 		albums[i] = data[i].Album;
	 		artists[i] = data[i].Artist;
	 		art[i] = data[i].Image;
	 		years[i] = data[i].Year;
	 	}
	 	fileCount = data.length;
		loadSong();
		}	
	};
		ourRequest.send();
		playPause.src="buttons/pause.png" ;
	}

	
function loadSong(){
	//console.log("inside loadSong");
	song.src = "songs/" + songs[currentSong];
	album_art.src = "songs/" + art[currentSong];
	//console.log("****Song title: "+ songs[currentSong]);
	//console.log("****Album Art: "+art[currentSong])
	songTitle.textContent = songs[currentSong]; //(currentSong + 1) + ". " + songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
	song.playbackrate = 1; //Iss line ko htana hai end me.
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
	//console.log("Calling playlistFetch and albumfetch");
	playlistFetch();
	albumFetch();
	artistFetch();
	equaliser.src="buttons/eq.gif";
	
	//document.body.style.zoom = 0.90;  //Force zoom to 90%(Not working)
}

function loadSongNextPrev(){
	//console.log("inside loadSong");
	song.src = "songs/" + songs[currentSong];
	album_art.src = "songs/" + art[currentSong];
	songTitle.textContent = songs[currentSong]; //(currentSong + 1) + ". " + songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length];
	song.playbackrate = 1; //Iss line ko htana hai end me.
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
	equaliser.src="buttons/eq.gif";
	
	//document.body.style.zoom = 0.90;  //Force zoom to 90%(Not working)
}

setInterval(updateSongSlider, 1000);


function playlistFetch(){
	//console.log("inside playlistfetch");
        var ul = document.createElement('ul');
        ul.setAttribute('id','listSongs');
        //console.log("This is playlistfetch");
        var t;
        var tt;

        document.getElementById('song-list').appendChild(ul);
        songs.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            t = document.createTextNode(element);

            li.innerHTML=li.innerHTML + element;
        }
}

function albumFetch(){//Fetches all albums list from json array
	//console.log("inside albumfetch");
        var ul = document.createElement('ul');
        ul.setAttribute('id','listAlbums');
        //console.log("This is albumfetch");
        var t;
        var tt;

        document.getElementById('album-list').appendChild(ul);
        albums.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            t = document.createTextNode(element);

            li.innerHTML=li.innerHTML + element;
        }
}

function artistFetch(){//Fetches all artists list from json array
	//console.log("inside artistfetch");
        var ul = document.createElement('ul');
        ul.setAttribute('id','listArtists');
        //console.log("This is artistfetch");
        var t;
        var tt;

        document.getElementById('artist-list').appendChild(ul);
        artists.forEach(renderProductList);

        function renderProductList(element, index, arr) {
            var li = document.createElement('li');
            li.setAttribute('class','item');

            ul.appendChild(li);

            t = document.createTextNode(element);

            li.innerHTML=li.innerHTML + element;
        }
}


function updateSongSlider(){
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c); 
	if(song.ended){
		next();
	}
}

function convertTime(secs){
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10)?"0" + min : min;
	sec = (sec < 10)?"0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration(){
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}

function playOrPauseSong(img){
	song.plabackrate = 1;//Iss line ko hta End me
	if(song.paused){
		song.play();
		//img.src = "buttons/pause.png";
		playPause.src="buttons/pause.png";
		if(fileCount << 1){ //If no song list is loaded the equaliser will not start on play button click
		equaliser.src="buttons/eq.gif";
	}
	}else{
		song.pause();
		//img.src = "buttons/play.png";
		playPause.src="buttons/play.png";
		equaliser.src="buttons/eq_paused.PNG";
	}
}

function next(){
	if(currentSong>=fileCount - 1)
	{
		currentSong=0;
		loadSongNextPrev();
	}else{
		currentSong = currentSong + 1 % songs.length;
		loadSongNextPrev();
		playPause.src="buttons/pause.png";
	}
}

function previous(){
	currentSong = currentSong - 1;
	//or currentSong--;
	currentSong = (currentSong<0)?songs.length - 1:currentSong;
	loadSongNextPrev();
	playPause.src="buttons/pause.png";
}

function stop() {
	song.pause();
	song.currentTime = 0;
	playPause.src="buttons/play.png";
}

function muteSound(){
	if(song.muted==false){
		song.muted = true;
		document.getElementById('muteButton').src="buttons/mute.png";
	}
	else{
		song.muted= false;
		document.getElementById('muteButton').src="buttons/volume.png";
	}
}

function seekSong(){
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume() {

	song.volume = volumeSlider.value;
}

function increaseSpeed() {
	//song.playbackrate +=0.5;
	song.currentTime = song.currentTime + 10;
}

function decreaseSpeed(){
	//song.playbackrate -=0.5;
	song.currentTime = song.currentTime - 10;
}


function showInfo(){

	window.alert("Title: " + songs[currentSong] + "\n\n Album: " + albums[currentSong] + "\n\n Artist(s): " + 
		artists[currentSong] + "\n\n Year: " + years[currentSong]);

}

function hideShowThemePanel(){
	var x = document.getElementById('visual');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function aboutPopup(){

	window.alert("X Music Player");
}


function deleteAllData(){

		var r = confirm("Are you sure you want to delete all uploaded files and wipe X Music database?");
		if (r == true) {
		    var p = confirm("This will delete all song files present in ~\\X Music Player\\songs folder. Are you sure?");
		    if(p== true){
		    	var ourRequest = new XMLHttpRequest();
				ourRequest.open('GET', 'http://localhost:8080/xmusic/rest/master/deleteAll');
				ourRequest.onload = function(){
				var data = ourRequest.responseText;
				
				if(data == "done"){
					window.alert("All files on the server deleted and database wiped successfuly!");
					window.location.reload();
				}else{
				window.alert("Something went wrong while deleting songs!");
				}
			};
			ourRequest.send();
		    }
		} else {
		    txt = "Cancel!";
		}
}

function hideElements()//called window.onload()
{
			fetchPlaylistTitleHead.style.display = 'none';
			fetchPlaylistAlbumHead.style.display = 'none';
			fetchPlaylistArtistHead.style.display = 'none';
			goBackButton.style.display='none';


}

function searchByAlbum(){

	//Hiding the buttons and input text box
			
			input1.style.display = 'none';
			search1.style.display = 'none';
			search2.style.display = 'none';

			fetchPlaylistTitleHead.style.display = 'initial';
			//fetchPlaylistAlbumHead.style.display = 'visible';
			//fetchPlaylistArtistHead.style.display = 'visible';
			goBackButton.style.display='initial';

	var albumInput = document.getElementById("searchInput").value;
		var ourRequest = new XMLHttpRequest();
			ourRequest.open('GET', 'http://localhost:8080/xmusic/rest/search/' + albumInput);
			ourRequest.onload = function(){
				var data = JSON.parse(ourRequest.responseText);
			for (var i = 0; i < data.length; i++) {
		 		albumSearchTitle[i] = data[i].Title;
		 		
		 	}

		 		//Displays searchresponse in the div
		 		//var ul.length=0;
		 		
				var ul = document.createElement('ul');
		        ul.setAttribute('id','listSongs');
		        //console.log("This is artistfetch");
		        var t;
		        var tt;

		        document.getElementById('titleDiv').appendChild(ul);
		        albumSearchTitle.forEach(renderProductList);

		        function renderProductList(element, index, arr) {
		            var li = document.createElement('li');
		            li.setAttribute('class','item');

		            ul.appendChild(li);

		            t = document.createTextNode(element);

		            li.innerHTML=li.innerHTML + element;
		        }

		};
		ourRequest.send();
}


function searchByArtist(){

	//Hiding the buttons and input text box
			input1.style.display = 'none';
			search1.style.display = 'none';
			search2.style.display = 'none';

			fetchPlaylistTitleHead.style.display = 'initial';
			fetchPlaylistAlbumHead.style.display = 'initial';
			//fetchPlaylistArtistHead.style.display = 'visible';
			goBackButton.style.display='initial';


			//AJAX
	var artistInput = document.getElementById("searchInput").value;
		var ourRequest1 = new XMLHttpRequest();
			ourRequest1.open('GET', 'http://localhost:8080/xmusic/rest/search-artist/' + artistInput);//change
			ourRequest1.onload = function(){
				var data = JSON.parse(ourRequest1.responseText);
			for (var j = 0; j < data.length; j++) {
		 		artistSearchTitle[j] = data[j].Title;
		 		
		 	}

		 		//Displays searchresponse in the div
				var ul = document.createElement('ul');
		        ul.setAttribute('id','listSongs');
		        //console.log("This is artistfetch");
		        var t;
		        var tt;

		        document.getElementById('titleDiv').appendChild(ul);//search-list
		        artistSearchTitle.forEach(renderProductList);

		        function renderProductList(element, index, arr) {
		            var li = document.createElement('li');
		            li.setAttribute('class','item');

		            ul.appendChild(li);

		            t = document.createTextNode(element);

		            li.innerHTML=li.innerHTML + element;
		        }

		        searchByArtistFetch();
		};
		ourRequest1.send();
}


function searchByArtistFetch(){
	var artistInput = document.getElementById("searchInput").value;
		var ourRequest1 = new XMLHttpRequest();
			ourRequest1.open('GET', 'http://localhost:8080/xmusic/rest/search-artist/' + artistInput);//change
			ourRequest1.onload = function(){
				var data = JSON.parse(ourRequest1.responseText);
			for (var j = 0; j < data.length; j++) {
		 		artistSearchAlbum[j] = data[j].Album;
		 		
		 	}

		 		//Displays searchresponse in the div
				var ul = document.createElement('ul');
		        ul.setAttribute('id','listSongs');
		        //console.log("This is artistfetch");
		        var t;
		        var tt;

		        document.getElementById('albumDiv').appendChild(ul);//search-list
		        artistSearchAlbum.forEach(renderProductList);

		        function renderProductList(element, index, arr) {
		            var li = document.createElement('li');
		            li.setAttribute('class','item');

		            ul.appendChild(li);

		            t = document.createTextNode(element);

		            li.innerHTML=li.innerHTML + element;
		        }
		        
		};
		ourRequest1.send();
}





function goBackInSearch(){



			fetchPlaylistTitleHead.style.display = 'none';
			fetchPlaylistAlbumHead.style.display = 'none';
			goBackButton.style.display='none';

			input1.style.display = 'initial';
			search1.style.display = 'initial';
			search2.style.display = 'initial';

			

			//document.getElementById("search-list").appendChild(document.getElementById("searchInput"));
			//input1.style.marginTop = "-150px";//this line raises the inputfield to its original level
}


function updateSongSlider(){
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c); 
	if(song.ended){
		next();
	}
}

function tabController(evt, tName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tName).style.display = "block";
    evt.currentTarget.className += " active";
}


/*function playlistClick(){
	// This function is called onLoad
	listSongs = document.getElementById("listSongs");
        listSongs.addEventListener('click', function(e){
        	if (e.target.tagName === 'LI'){
      			alert("hilo");
   		 }
        });
}*/


//Theme settings below
function setTheme0(){

	audioPlayer.style.backgroundImage="url(buttons/blur.jpg)";
	playlist.style.backgroundImage="url(buttons/blur.jpg)";
	visual.style.backgroundImage="url(buttons/blur.jpg)";

	//this is not working to change the shadow color!!
	//document.getElementById("audio-player").style.boxShadow = "10px 20px 30px blue"; 
}

function setTheme1(){

	audioPlayer.style.backgroundImage="url(buttons/blur1.jpg)";
	playlist.style.backgroundImage="url(buttons/blur1.jpg)";
	visual.style.backgroundImage="url(buttons/blur1.jpg)";
	
}

function setTheme2(){
	audioPlayer.style.backgroundImage="url(buttons/blur2.jpg)";
	playlist.style.backgroundImage="url(buttons/blur2.jpg)";
	visual.style.backgroundImage="url(buttons/blur2.jpg)";
	
}

function setTheme3(){
	audioPlayer.style.backgroundImage="url(buttons/blur3.jpg)";
	playlist.style.backgroundImage="url(buttons/blur3.jpg)";
	visual.style.backgroundImage="url(buttons/blur3.jpg)";
	
}

function setTheme4(){
	audioPlayer.style.backgroundImage="url(buttons/blur4.jpg)";
	playlist.style.backgroundImage="url(buttons/blur4.jpg)";
	visual.style.backgroundImage="url(buttons/blur4.jpg)";
	
}

function setTheme5(){
	audioPlayer.style.backgroundImage="url(buttons/blur5.jpg)";
	playlist.style.backgroundImage="url(buttons/blur5.jpg)";
	visual.style.backgroundImage="url(buttons/blur5.jpg)";
	
}

function setTheme6(){
	audioPlayer.style.backgroundImage="url(buttons/blur6.jpg)";
	playlist.style.backgroundImage="url(buttons/blur6.jpg)";
	visual.style.backgroundImage="url(buttons/blur6.jpg)";
	
}

function setTheme7(){
	audioPlayer.style.backgroundImage="url(buttons/blur7.jpg)";
	playlist.style.backgroundImage="url(buttons/blur7.jpg)";
	visual.style.backgroundImage="url(buttons/blur7.jpg)";
	
}

function setTheme8(){
	audioPlayer.style.backgroundImage="url(buttons/blur8.jpg)";
	playlist.style.backgroundImage="url(buttons/blur8.jpg)";
	visual.style.backgroundImage="url(buttons/blur8.jpg)";
	
}




