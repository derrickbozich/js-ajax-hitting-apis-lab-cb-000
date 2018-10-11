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

  // const repoList = `<ul>${repos.map(r => '<li>' + '<a href=' + r.html_url + '>'  + r.name + '</a>' + ' ' + '<a href="#" data-repo=' + r.name + ' ' + 'onclick=getCommits()>Get Commits</a>' + '</li>').join('')}</ul>`;
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(){
  debugger
  const username = document.getElementById('username').value;

  //creates a new XMLHttpRequest object
  const req = new XMLHttpRequest();

  //callback that invokes showRepositories once the data loads
  req.addEventListener('load', showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos/:owner/:repo/commits`);
  req.send();
}
