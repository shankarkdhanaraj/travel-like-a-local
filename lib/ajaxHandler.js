var axios = require('axios');
const baseURL = '';

exports.getImageForSuggestionLinks = function(link, callback) {
  // console.log('in getImageForSuggestionLinks, link is...', link);
  let config = {
    url: baseURL + '/api/suggestion',
    params: {
      'link': link
    }
  };
  axios.get(config.url, config)
  .then(function(response){
    callback(response);
  })
  .catch( (err) => console.log('Error in getImageForSuggestionLinks...', err.message));
}

exports.handleGetLoggedUserID = function(username, callback) {
  axios.post(baseURL + '/api/users/'+ username)
  .then(function(response){
    callback(response);
  });
};

exports.handlePostDestination = function(destination, callback) {
  axios.post(baseURL+ '/api/destinations/'+ destination)
  .then(function(response){
    callback(response);
  });
};

exports.handleGetDestination = function(destination, callback) {
   axios.get(baseURL+ '/api/destinations/'+ destination)
  .then(function(response){
    callback(response);
  });
}

exports.getRemainingFriends = function(userName, callback){
  axios.get(baseURL+ '/api/remaining-friends/'+ userName)
  .then(function(response){
    callback(response);
  });
};

exports.getFriendList = function(userName, callback){
  axios.get(baseURL+ '/api/friendlist/'+ userName)
  .then(function(response){
    callback(response);
  }).catch(function(err){
    console.log(err);
  });
};

exports.handleAddFriend = function(username, friend, callback) {
  axios.post(baseURL+ '/api/addfriend', {username: username, friend:friend})
  .then(function(response){
    callback();
  });
}

exports.getPlacesFromGoogleMaps = function(location, callback) {
  axios.get(baseURL+ '/api/googlemaps/'+location)
  .then(function(response){
    // console.log('getPlacesFromGoogleMaps response...', response);
    // console.log('suggestions is....', response.data.suggestions.json.results);
    let locationSuggestions = {
      lattitude: response.data.lattitude,
      longitude: response.data.longitude,
      suggestions: response.data.suggestions.json.results
    };
    callback(locationSuggestions);
    // callback(response.data.json.results);
  })
  .catch( (err) => console.log('ERROR: in getting places from server...', err.message));
}

exports.getEventsFromGoogleMapsAndEventbrite = function(location, callback) {
  // console.log('inside the ajax handler for getEventsFromGoogleMapsAndEventbrite');
  axios.get(baseURL+ '/api/googlemaps/events/'+location)
  .then(function(response){
    callback(response.data.json.results);
  })
  .catch( (err) => console.log('ERROR: in getting events from server...', err.message));
}


exports.getEventsFromEventbrite = function(latLong, callback) {
  // console.log('inside the ajax handler for getEventsFromEventbrite');

  let config = {
    url: baseURL+ '/api/events',
    params: {
      'lattitude': latLong.lattitude,
      'longitude': latLong.longitude
    }
  };

  axios.get(config.url, config)
  .then(function(response){
    callback(response);
  })
  .catch( (err) => console.log('ERROR: in getting events from server...', err.message));
}


//get suggestions for the destination that was searched for from your friends
exports.getSuggestionsForLoggedUsers = function(userName, location, callback){
  axios.get(baseURL+ '/api/suggestions/'+ location +'/' + userName)
  .then(function(response){
    console.log('response in getSuggestionsForLoggedUsers',response);
    callback(response.data);
  });
};

exports.postNewSuggestion = function(username, destination, suggestionName, suggestionLink, callback) {
  axios.post(baseURL+ '/api/addsuggestion',
    {
      username: username,
      destination:destination,
      suggestionName:suggestionName,
      suggestionLink, suggestionLink
    })
  .then(function(response){
    callback(response);
  }).catch(function(err){
    console.log(err);
  });
};

exports.getDestinations = function(callback){
  axios.get(baseURL+ '/api/destinations')
  .then(function(response){
    callback(response.data);
  });
};

exports.deleteFriendship = function(userID, friendID, callback) {
  axios.delete(baseURL+ '/api/deletefriendship/'+userID+'/'+friendID)
  .then(function(response){
    callback();
  });
}

//get weather data
exports.getWeatherData = function (location, callback) {
  var loc = location;
  var searchtext = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + loc + "') and u='c'"
    axios.get("https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json")
    .then(function(response){
      callback(response);
  });
}