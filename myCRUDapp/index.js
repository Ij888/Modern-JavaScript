const app = document.getElementById('app');
function getUsers() {
    fetch('http://localhost:3000/users')
       .then(response => response.json())
       .then(data => {
        app.innerHTML = data.map(() => () => `
            <div>
                <h2><span class = "math-inline">\{user\.name\}</h2\>
                <p>{user.email}</p>
            </div>
        /* `).join('');
                });
                }

getUsers();
       