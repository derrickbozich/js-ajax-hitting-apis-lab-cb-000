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
  const repoList = `<ul>${repos.map(r => '<li>' + '<a href=' + r.html_url + '>'  + r.name + '</a>' + ' - ' + '<a href="#" data-repo=' + r.name + ' ' + 'data-username=' + r.owner.login + ' onclick=getCommits(this)>Get Commits</a>' + '</li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(element){

  //creates a new XMLHttpRequest object
  const req = new XMLHttpRequest();
  const name = element.dataset.repo;
  const username = element.dataset.repo;
  debugger

  //callback that invokes showRepositories once the data loads
  req.addEventListener('load', displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits(){
  debugger
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList = `<ul>${commits.map(c => '<li>' + '<a href=' + c.html_url + '>'  + c.name + '</a>' + ' - ' + '<a href="#" data-repo=' + c.name + ' ' + 'onclick=getCommits(this)>Get Commits</a>' + '</li>').join('')}</ul>`;



}
