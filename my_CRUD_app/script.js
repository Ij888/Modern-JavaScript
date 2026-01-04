function openCreate() {
       document.getElementById('createModal').classList.add('active');
}

function openRead() {
       displayData();
       document.getElementById('readModal').classList.add('active');
}

function openUpdate() {
       prefillUpdate();
       document.getElementById('updateModal').classList.add('active');
}

function openDelete() {
       displayDeleteOptions();
       document.getElementById('deleteModal').classList.add('active');
}

function closeModal(id) {
       document.getElementById(id).classList.remove('active');
}

function createRecord(e) {
       e.preventDefault();
       var name = document.getElementById('createName').value;
       var email = document.getElementById('createEmail').value;
       var desc = document.getElementById('createDescription').value;

       localStorage.setItem('name', name);
       localStorage.setItem('email', email);
       localStorage.setItem('description', desc);

       document.getElementById('createName').value = '';
       document.getElementById('createEmail').value = '';
       document.getElementById('createDescription').value = '';

       closeModal('createModal');
}

function displayData() {
       var name = localStorage.getItem('name');
       var email = localStorage.getItem('email');
       var desc = localStorage.getItem('description');
       var display = document.getElementById('dataDisplay');

       if (!name && !email && !desc) {
              display.innerHTML = '<div class="empty-state">No data stored yet</div>';
              return;
       }

       var html = '';

       if (name) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Name</span><button class="delete-field-btn" onclick="deleteField(\'name\')">Delete</button></div><div class="data-item-value">' + name + '</div></div>';
       }

       if (email) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Email</span><button class="delete-field-btn" onclick="deleteField(\'email\')">Delete</button></div><div class="data-item-value">' + email + '</div></div>';
       }

       if (desc) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Description</span><button class="delete-field-btn" onclick="deleteField(\'description\')">Delete</button></div><div class="data-item-value">' + desc + '</div></div>';
       }

       display.innerHTML = html;
}

function prefillUpdate() {
       var name = localStorage.getItem('name');
       var email = localStorage.getItem('email');
       var desc = localStorage.getItem('description');

       document.getElementById('updateName').value = name || '';
       document.getElementById('updateEmail').value = email || '';
       document.getElementById('updateDescription').value = desc || '';
}

function updateRecord(e) {
       e.preventDefault();
       var name = document.getElementById('updateName').value;
       var email = document.getElementById('updateEmail').value;
       var desc = document.getElementById('updateDescription').value;

       localStorage.setItem('name', name);
       localStorage.setItem('email', email);
       localStorage.setItem('description', desc);

       closeModal('updateModal');
}

function displayDeleteOptions() {
       var name = localStorage.getItem('name');
       var email = localStorage.getItem('email');
       var desc = localStorage.getItem('description');
       var display = document.getElementById('deleteDisplay');

       if (!name && !email && !desc) {
              display.innerHTML = '<div class="empty-state">No data to delete</div>';
              return;
       }

       var html = '';

       if (name) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Name</span><button class="delete-field-btn" onclick="deleteField(\'name\')">Delete</button></div><div class="data-item-value">' + name + '</div></div>';
       }

       if (email) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Email</span><button class="delete-field-btn" onclick="deleteField(\'email\')">Delete</button></div><div class="data-item-value">' + email + '</div></div>';
       }

       if (desc) {
              html += '<div class="data-item"><div class="data-item-header"><span class="data-item-label">Description</span><button class="delete-field-btn" onclick="deleteField(\'description\')">Delete</button></div><div class="data-item-value">' + desc + '</div></div>';
       }

       html += '<button class="delete-all-btn" onclick="deleteAll()">Delete All</button>';

       display.innerHTML = html;
}

function deleteField(field) {
       localStorage.removeItem(field);
       displayDeleteOptions();
       displayData();
}

function deleteAll() {
       localStorage.removeItem('name');
       localStorage.removeItem('email');
       localStorage.removeItem('description');
       displayDeleteOptions();
}

window.onclick = function (e) {
       if (e.target.classList.contains('modal')) {
              e.target.classList.remove('active');
       }
}

document.addEventListener('DOMContentLoaded', function () {
       var createBtn = document.getElementById('create_id');
       var readBtn = document.getElementById('read_id');
       var updateBtn = document.getElementById('update_id');
       var deleteBtn = document.getElementById('delete_id');

       if (createBtn) createBtn.addEventListener('click', openCreate);
       if (readBtn) readBtn.addEventListener('click', openRead);
       if (updateBtn) updateBtn.addEventListener('click', openUpdate);
       if (deleteBtn) deleteBtn.addEventListener('click', openDelete);
});

