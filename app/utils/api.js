const CLIENT_ID = 'CLIENT_ID';
const CLIENT_SECRET = 'CLIENT_SECRET';

const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;


function getErrorMessage(userName, errorMessage) {

    if ('not Found' === errorMessage) {
        return `${userName} does not exists`
    }

    return errorMessage;
}

function getProfile(userName) {
    return fetch(`https://api.github.com/users/${userName}${params}`)
        .then((res) => res.json())
        .then((profile) => {

            if (profile.message) {
                throw new Error(getErrorMessage(userName, profile.message));
            }
            return profile;
        })
}

function getRepos(userName) {
    return fetch(`https://api.github.com/users/${userName}/repos${params}&per_page=100`)
        .then((res) => res.json())
        .then((repos) => {

            if (repos.message) {
                throw new Error(getErrorMessage(userName, repos.message));
            }
            return repos;
        })
}

function getStarsCount(repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore(followers, repos) {
    return followers * 3 + getStarsCount(repos);
}

function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers(players) {
    return players.sort((a, b) => b.score - a.score)
}

export function war(players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => sortPlayers(results))
}

export function fetchPopulaRepos(language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message);
            }

            return data.items;
        });
}