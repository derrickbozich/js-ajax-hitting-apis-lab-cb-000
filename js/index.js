// fetches repositories from github
function getRepositories(){
  const username = document.getElementById('username').value;

  const req = new XMLHttpRequest();
  debugger
  req.addEventListener('load', showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);

}
