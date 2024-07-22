document.addEventListener('DOMContentLoaded', function () {
    const addSongForm = document.getElementById('add-song-form');
    const createPlaylistForm = document.getElementById('create-playlist-form');
    const playlistsContainer = document.getElementById('playlists');

    let songs = JSON.parse(localStorage.getItem('songs')) || [];
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    function saveSongs() {
        localStorage.setItem('songs', JSON.stringify(songs));
    }

    function savePlaylists() {
        localStorage.setItem('playlists', JSON.stringify(playlists));
    }

    function renderPlaylists() {
        playlistsContainer.innerHTML = '';
        playlists.forEach((playlist, index) => {
            const playlistDiv = document.createElement('div');
            playlistDiv.className = 'playlist';
            playlistDiv.innerHTML = `<h3>${playlist.name}</h3><div>${playlist.songs.map(song => `${song.title} - ${song.artist}`).join('<br>')}</div><button onclick="addSongToPlaylist(${index})">Add Song to Playlist</button>`;
            playlistsContainer.appendChild(playlistDiv);
        });
    }

    window.addSongToPlaylist = function (playlistIndex) {
        const songTitle = prompt('Enter the song title:');
        const song = songs.find(song => song.title === songTitle);
        if (song) {
            playlists[playlistIndex].songs.push(song);
            savePlaylists();
            renderPlaylists();
        } else {
            alert('Song not found!');
        }
    }

    addSongForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('song-title').value;
        const artist = document.getElementById('song-artist').value;
        const album = document.getElementById('song-album').value;
        const duration = document.getElementById('song-duration').value;
        
        const newSong = { title, artist, album, duration };
        songs.push(newSong);
        saveSongs();
        
        addSongForm.reset();
    });

    createPlaylistForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('playlist-name').value;
        
        const newPlaylist = { name, songs: [] };
        playlists.push(newPlaylist);
        savePlaylists();
        
        createPlaylistForm.reset();
        renderPlaylists();
    });

    // Initial render
    renderPlaylists();
});
