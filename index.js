'use strict';

//Globals - GitHub API endpoint
const searchURL = 'https://api.github.com/users/'

function displayResults(responseJson){
    //Look at repos: An array of objects. I want .name and html_url
    $('#js-error-message').empty();
    $('#results-list').empty();
    //loop through repos and make html list with links
    for (let i=0; i<responseJson.length; i++){
        console.log(`repo name: ${responseJson[i].html_url}`)
        $('#results-list').append(
        `<li><h3><a href="${responseJson[i].html_url}" target="blank">${responseJson[i].name}</a></h3>
        </li>`
        )};
    $('#results').removeClass('hidden');
}

function getRepos(userName){

    //Format GET request with url and username
    const queryString = `${searchURL}${userName}/repos`
    console.log(queryString)

    //fetch with error handling
    //check response
    fetch(queryString)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    //if okay, pass results to displayResults
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchID = $('#js-search-id').val();
        console.log(`You want to find repos for: ${searchID}`)
        getRepos(searchID);
    })
    console.log('watchForm ran')
}

$(watchForm);