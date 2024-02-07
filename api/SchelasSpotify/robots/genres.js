// const SpotifyWebApi = require("spotify-web-api-node");
// let cacheProvider = require('../SchelasCache');

async function robot() {
  // const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
  // const spotify = new SpotifyWebApi({
  //   clientId: process.env.SPOTIFY_CLIENT_ID,
  //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  //   redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  // });

  // await spotify.setAccessToken(access_token);
  // await spotify.setRefreshToken(refresh_token);

  const genres = [
    {"label": "Pop", "value": "pop"},
    {"label": "Rock", "value": "rock"},
    {"label": "Hip-Hop", "value": "hip-hop"},
    {"label": "Country", "value": "country"},
    {"label": "Dance", "value": "dance"},
    {"label": "Electronic", "value": "electronic"},
    {"label": "R-n-B", "value": "r-n-b"},
    {"label": "Latin", "value": "latin"},
    {"label": "Jazz", "value": "jazz"},
    {"label": "Classical", "value": "classical"},
    {"label": "Reggae", "value": "reggae"},
    {"label": "Blues", "value": "blues"},
    {"label": "Heavy Metal", "value": "heavy-metal"},
    {"label": "Folk", "value": "folk"},
    {"label": "Punk", "value": "punk"},
    {"label": "Gospel", "value": "gospel"},
    {"label": "Disco", "value": "disco"},
    {"label": "Salsa", "value": "salsa"},
    {"label": "Soul", "value": "soul"},
    {"label": "Opera", "value": "opera"},
    {"label": "Acoustic", "value": "acoustic"},
    {"label": "Afrobeat", "value": "afrobeat"},
    {"label": "Alt-Rock", "value": "alt-rock"},
    {"label": "Alternative", "value": "alternative"},
    {"label": "Ambient", "value": "ambient"},
    {"label": "Anime", "value": "anime"},
    {"label": "Black-Metal", "value": "black-metal"},
    {"label": "Bluegrass", "value": "bluegrass"},
    {"label": "Bossa Nova", "value": "bossanova"},
    {"label": "Brazil", "value": "brazil"},
    {"label": "Breakbeat", "value": "breakbeat"},
    {"label": "British", "value": "british"},
    {"label": "Cantopop", "value": "cantopop"},
    {"label": "Chicago House", "value": "chicago-house"},
    {"label": "Children", "value": "children"},
    {"label": "Chill", "value": "chill"},
    {"label": "Club", "value": "club"},
    {"label": "Comedy", "value": "comedy"},
    {"label": "Dancehall", "value": "dancehall"},
    {"label": "Death-Metal", "value": "death-metal"},
    {"label": "Deep House", "value": "deep-house"},
    {"label": "Detroit Techno", "value": "detroit-techno"},
    {"label": "Disney", "value": "disney"},
    {"label": "Drum and Bass", "value": "drum-and-bass"},
    {"label": "Dub", "value": "dub"},
    {"label": "Dubstep", "value": "dubstep"},
    {"label": "EDM", "value": "edm"},
    {"label": "Electro", "value": "electro"},
    {"label": "Emo", "value": "emo"},
    {"label": "Forro", "value": "forro"},
    {"label": "French", "value": "french"},
    {"label": "Funk", "value": "funk"},
    {"label": "Garage", "value": "garage"},
    {"label": "German", "value": "german"},
    {"label": "Goth", "value": "goth"},
    {"label": "Grindcore", "value": "grindcore"},
    {"label": "Groove", "value": "groove"},
    {"label": "Grunge", "value": "grunge"},
    {"label": "Guitar", "value": "guitar"},
    {"label": "Happy", "value": "happy"},
    {"label": "Hard Rock", "value": "hard-rock"},
    {"label": "Hardcore", "value": "hardcore"},
    {"label": "Hardstyle", "value": "hardstyle"},
    {"label": "Holidays", "value": "holidays"},
    {"label": "Honky-Tonk", "value": "honky-tonk"},
    {"label": "House", "value": "house"},
    {"label": "IDM", "value": "idm"},
    {"label": "Indian", "value": "indian"},
    {"label": "Indie", "value": "indie"},
    {"label": "Indie Pop", "value": "indie-pop"},
    {"label": "Industrial", "value": "industrial"},
    {"label": "Iranian", "value": "iranian"},
    {"label": "J-Dance", "value": "j-dance"},
    {"label": "J-Idol", "value": "j-idol"},
    {"label": "J-Pop", "value": "j-pop"},
    {"label": "J-Rock", "value": "j-rock"},
    {"label": "K-Pop", "value": "k-pop"},
    {"label": "Kids", "value": "kids"},
    {"label": "Latino", "value": "latino"},
    {"label": "Malay", "value": "malay"},
    {"label": "Mandopop", "value": "mandopop"},
    {"label": "Metal", "value": "metal"},
    {"label": "Metal Misc", "value": "metal-misc"},
    {"label": "Metalcore", "value": "metalcore"},
    {"label": "Minimal Techno", "value": "minimal-techno"},
    {"label": "Movies", "value": "movies"},
    {"label": "MPB", "value": "mpb"},
    {"label": "New Age", "value": "new-age"},
    {"label": "New Release", "value": "new-release"},
    {"label": "Pagode", "value": "pagode"},
    {"label": "Party", "value": "party"},
    {"label": "Philippines OPM", "value": "philippines-opm"},
    {"label": "Piano", "value": "piano"},
    {"label": "Pop Film", "value": "pop-film"},
    {"label": "Post Dubstep", "value": "post-dubstep"},
    {"label": "Power Pop", "value": "power-pop"},
    {"label": "Progressive House", "value": "progressive-house"},
    {"label": "Psych Rock", "value": "psych-rock"},
    {"label": "Punk Rock", "value": "punk-rock"},
    {"label": "Rainy Day", "value": "rainy-day"},
    {"label": "Reggaeton", "value": "reggaeton"},
    {"label": "Road Trip", "value": "road-trip"},
    {"label": "Rock N Roll", "value": "rock-n-roll"},
    {"label": "Rockabilly", "value": "rockabilly"},
    {"label": "Romance", "value": "romance"},
    {"label": "Sad", "value": "sad"},
    {"label": "Samba", "value": "samba"},
    {"label": "Sertanejo", "value": "sertanejo"},
    {"label": "Show Tunes", "value": "show-tunes"},
    {"label": "Singer-Songwriter", "value": "singer-songwriter"},
    {"label": "Ska", "value": "ska"},
    {"label": "Sleep", "value": "sleep"},
    {"label": "Songwriter", "value": "songwriter"},
    {"label": "Soundtracks", "value": "soundtracks"},
    {"label": "Spanish", "value": "spanish"},
    {"label": "Study", "value": "study"},
    {"label": "Summer", "value": "summer"},
    {"label": "Swedish", "value": "swedish"},
    {"label": "Synth Pop", "value": "synth-pop"},
    {"label": "Tango", "value": "tango"},
    {"label": "Techno", "value": "techno"},
    {"label": "Trance", "value": "trance"},
    {"label": "Trip Hop", "value": "trip-hop"},
    {"label": "Turkish", "value": "turkish"},
    {"label": "Work Out", "value": "work-out"},
    {"label": "World Music", "value": "world-music"}
  ];
  

  // let genre = value;
  console.log(
    "> Getting all genres..."
  );
  // await spotify
  //   .getAvailableGenreSeeds()
  //   .then((data) => {
  //     genres.push(...data.body.genres)
  //     // data.body.tracks.forEach((track) => {
  //     //   newSongs.push({
  //     //     id: track.id,
  //     //     artist: track.artists[0].name,
  //     //     song: track.name,
  //     //     playlist: "discover",
  //     //   });
  //     // });
  //   })

  return genres



  // cacheProvider.instance().set("genres", newSongs);

}

module.exports = robot;
