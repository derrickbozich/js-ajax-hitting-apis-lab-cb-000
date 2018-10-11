// fetches repositories from github
function getRepositories(){
  const username = document.getElementById('username').value;

  //creates a new XMLHttpRequest object
  const req = new XMLHttpRequest();

  //callback that invokes showRepositories once the data loads
  req.addEventListener('load', showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories(){
  //parses response into JSON
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList =
    '<ul>' +
    repos
      .map(repo => {
        const dataUsername = 'data-username="' + repo.owner.login + '"';
        const dataRepoName = 'data-repository="' + repo.name + '"';
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element){

  //creates a new XMLHttpRequest object
  const req = new XMLHttpRequest();
  const name = element.dataset.repository;
  const username = element.dataset.username;

  //callback that invokes showRepositories once the data loads
  req.addEventListener('load', displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits(){

  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList =
    '<ul>' +
    commits
      .map(c => {`
          <li>
            github name: ${c.author.login} -
            full name: ${c.commit.author.name} -
            message: ${c.commit.message}
          </li>`;
      })
      .join('') +
    '</ul>';

  document.getElementById('details').innerHTML = commitList;



}
