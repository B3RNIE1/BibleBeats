// OFFICIAL AUDIO DATABASE & METADATA ACCENTS
const trackDatabase = [
    {
        id: 0,
        title: "I'll Love",
        artist: "KB",
        album: "His Glory Alone II",
        genre: "CHH Trap / Melodic",
        duration: "3:18",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Verse 1 - KB]",
            "If I lose it all, if the kingdom falls",
            "You remain steady when my back's against the wall",
            "Through the fire, through the valley low",
            "I will love You for who You are, not just what You bestow"
        ],
        tour: [
            { date: "Oct 14", loc: "The Ledge Amp (MN)" },
            { date: "Oct 16", loc: "House of Blues (OH)" }
        ]
    },
    {
        id: 1,
        title: "TR!BE ON THE MOVE",
        artist: "indie tribe.",
        album: "INDIE500",
        genre: "CHH Underground / Trap",
        duration: "2:54",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Verse 1 - nobigdyl.]",
            "Would the Lord forgive me if I killed the beat?",
            "Would it be a sin if I had did it for the trinity?",
            "Jesus said that we should have affection for our enemies",
            "Then He flipped the tables, think I'm picking up the recipe"
        ],
        tour: [
            { date: "Nov 02", loc: "Holy Smoke Fest (GA)" },
            { date: "Nov 05", loc: "The Fillmore (NC)" }
        ]
    },
    {
        id: 2,
        title: "Sticks and Stones",
        artist: "Kijan Boone",
        album: "Single Release",
        genre: "CHH Trap-Soul",
        duration: "3:02",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Chorus]",
            "Sticks and stones they may break my bones",
            "But the word of the Lord it can save my soul",
            "The words they say will never hurt me",
            "That's why I'mma take my mind and give it to the Lord"
        ],
        tour: [
            { date: "Sep 22", loc: "The Underground (TX)" },
            { date: "Sep 25", loc: "Warehouse Live (TX)" }
        ]
    },
    {
        id: 3,
        title: "Ja Morant",
        artist: "Kijan Boone",
        album: "Kingdom Heat",
        genre: "Gospel Drill / Trap",
        duration: "2:45",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Verse 1]",
            "Bouncing back up like I'm Ja Morant",
            "They thought that I couldn't, God said that I can!",
            "On the fast break with the blueprint and plan",
            "Elevated higher, built to withstand."
        ],
        tour: [
            { date: "Sep 22", loc: "The Underground (TX)" },
            { date: "Oct 01", loc: "Apollo Theater (NY)" }
        ]
    },
    {
        id: 4,
        title: "Petco",
        artist: "1K Phew",
        album: "As I Am",
        genre: "Gospel Rap / Atl Trap",
        duration: "3:08",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Verse 1 - 1K Phew]",
            "Keep a circle tight, counting up the blessings right",
            "I am not a pet, but I got the pack in sight",
            "Phew! Eastside flying out to Westside tracks",
            "Glory to the Father, we ain't never looking back!"
        ],
        tour: [
            { date: "Dec 12", loc: "Tabernacle (GA)" },
            { date: "Dec 15", loc: "The Ritz (NC)" }
        ]
    },
    {
        id: 5,
        title: "Supernatural",
        artist: "Trip Lee",
        album: "The Epilogue",
        genre: "CHH Lyricism / Boom-Bap",
        duration: "3:40",
        spotifyEmbedUrl: "https://spotify.com",
        lyrics: [
            "[Verse 1 - Trip Lee]",
            "This isn't organic, this isn't my power",
            "Sustaining my soul through the midnight hour",
            "Supernatural presence breaking up the chains",
            "He took all the weight and washed out the stains."
        ],
        tour: [
            { date: "Nov 19", loc: "The Howard (DC)" },
            { date: "Nov 22", loc: "Rebel (ON)" }
        ]
    }
];

let likedTracks = new Set();
let currentTrackIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
    buildTrackLibrary();
    generate64NodeVisualizer();
    loadTrack(0);
});

function buildTrackLibrary() {
    const container = document.getElementById('sidebarTracks');
    container.innerHTML = '';

    trackDatabase.forEach((track) => {
        const isLiked = likedTracks.has(track.id) ? 'fa-solid liked' : 'fa-regular';
        const node = document.createElement('div');
        node.className = `track-node ${track.id === currentTrackIndex ? 'active' : ''}`;
        node.setAttribute('onclick', `handleTrackNodeClick(event, ${track.id})`);
        node.setAttribute('data-search', `${track.title.toLowerCase()} ${track.artist.toLowerCase()} ${track.genre.toLowerCase()}`);

        node.innerHTML = `
            <div class="track-info-mini">
                <span class="track-title-mini">${track.title}</span>
                <span class="track-artist-mini">${track.artist} • ${track.genre}</span>
            </div>
            <i class="${isLiked} fa-heart heart-btn" onclick="toggleTrackLike(event, ${track.id})"></i>
        `;
        container.appendChild(node);
    });
}

function loadTrack(index) {
    currentTrackIndex = index;
    const track = trackDatabase[index];

    const nodes = document.querySelectorAll('.track-node');
    nodes.forEach((n, idx) => {
        n.classList.toggle('active', idx === index);
    });

    document.getElementById('spotifyContainer').innerHTML = `
        <iframe src="${track.spotifyEmbedUrl}" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `;

    document.getElementById('heroTrackName').innerText = track.title;
    document.getElementById('heroArtistAlbum').innerText = `${track.artist} — Album: ${track.album}`;
    document.getElementById('profileArtistName').innerText = track.artist;
    
    const lyricsBox = document.getElementById('lyricsBox');
    lyricsBox.innerHTML = '';
    track.lyrics.forEach((line, lIdx) => {
        const p = document.createElement('p');
        p.className = `lyric-line ${lIdx === 1 ? 'highlight' : ''}`;
        p.innerText = line;
        lyricsBox.appendChild(p);
    });

    const tourBox = document.getElementById('tourBox');
    tourBox.innerHTML = '';
    track.tour.forEach(t => {
        const div = document.createElement('div');
        div.className = 'tour-row';
        div.innerHTML = `<span class="tour-date">${t.date}</span><span class="tour-loc">${t.loc}</span>`;
        tourBox.appendChild(div);
    });

    document.getElementById('footerTitle').innerText = track.title;
    document.getElementById('footerArtist').innerText = track.artist;
    document.getElementById('footerDuration').innerText = track.duration;
    
    const footerHeart = document.getElementById('footerHeart');
    footerHeart.className = likedTracks.has(track.id) ? "fa-solid fa-heart heart-btn liked" : "fa-regular fa-heart heart-btn";
}

function handleTrackNodeClick(event, id) {
    if(event.target.classList.contains('heart-btn')) return;
    loadTrack(id);
}

function toggleTrackLike(event, id) {
    if(event) event.stopPropagation();
    if(likedTracks.has(id)) {
        likedTracks.delete(id);
    } else {
        likedTracks.add(id);
    }
    buildTrackLibrary();
    if(currentTrackIndex === id) {
        loadTrack(currentTrackIndex);
    }
}

function toggleFooterLike() {
    toggleTrackLike(window.event, currentTrackIndex);
}

function nextTrack() {
    let nextIdx = currentTrackIndex + 1;
    if(nextIdx >= trackDatabase.length) nextIdx = 0;
    loadTrack(nextIdx);
}

function prevTrack() {
    let prevIdx = currentTrackIndex - 1;
    if(prevIdx < 0) prevIdx = trackDatabase.length - 1;
    loadTrack(prevIdx);
}

function filterLibrary() {
    const query = document.getElementById('librarySearch').value.toLowerCase();
    const nodes = document.querySelectorAll('.track-node');
    
    nodes.forEach(node => {
        const searchString = node.getAttribute('data-search');
        node.style.display = searchString.includes(query) ? 'flex' : 'none';
    });
}

function generate64NodeVisualizer() {
    const container = document.getElementById('nodesContainer');
    container.innerHTML = '';
    for(let i = 0; i < 32; i++) { 
        const node = document.createElement('div');
        node.className = 'v-node';
        node.style.animationDelay = `${(Math.random() * 0.8).toFixed(2)}s`;
        node.style.animationDuration = `${(Math.random() * 0.6 + 0.6).toFixed(2)}s`;
        container.appendChild(node);
    }
}
