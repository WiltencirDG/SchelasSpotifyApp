const SpotifyWebApi = require("spotify-web-api-node");
let cacheProvider = require('../SchelasCache');

async function robot() {
  const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
  const spotify = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });

  await spotify.setAccessToken(access_token);
  await spotify.setRefreshToken(refresh_token);

  const genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

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
