function getRecords() {
       var stored = localStorage.getItem('records');
       return stored ? JSON.parse(stored) : [];
}

function saveRecords(records) {
       localStorage.setItem('records', JSON.stringify(records));
}

function openCreate() {
       document.getElementById('createModal').classList.add('active');
}

function openRead() {
       displayData();
       document.getElementById('readModal').classList.add('active');
}

function openUpdate() {
       var records = getRecords();
       if (!records.length) {
              return;
       }
       prefillUpdate(records.length - 1);
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

       var records = getRecords();
       records.push({
              name: name,
              email: email,
              description: desc
       });
       saveRecords(records);

       document.getElementById('createName').value = '';
       document.getElementById('createEmail').value = '';
       document.getElementById('createDescription').value = '';

       closeModal('createModal');
}

function displayData() {
       var records = getRecords();
       var display = document.getElementById('dataDisplay');

       if (!records.length) {
              display.innerHTML = '<div class="empty-state">No data stored yet</div>';
              return;
       }

       var html = '';
       records.forEach(function (record, index) {
              html += '<div class="data-item">';
              html += '<div class="data-item-header">';
              html += '<span class="data-item-label">Record ' + (index + 1) + '</span>';
              html += '<div class="data-item-actions">';
              html += '<button class="delete-field-btn" onclick="openUpdateWithIndex(' + index + ')">Edit</button>';
              html += '<button class="delete-field-btn" onclick="deleteRecord(' + index + ')">Delete</button>';
              html += '</div>';
              html += '</div>';
              if (record.name) {
                     html += '<div class="data-item-row"><span class="data-item-label">Name</span><span class="data-item-value">' + record.name + '</span></div>';
              }
              if (record.email) {
                     html += '<div class="data-item-row"><span class="data-item-label">Email</span><span class="data-item-value">' + record.email + '</span></div>';
              }
              if (record.description) {
                     html += '<div class="data-item-row"><span class="data-item-label">Description</span><span class="data-item-value">' + record.description + '</span></div>';
              }
              html += '</div>';
       });

       display.innerHTML = html;
}

function prefillUpdate(index) {
       var records = getRecords();
       var record = records[index];
       if (!record) {
              return;
       }

       document.getElementById('updateIndex').value = index;
       document.getElementById('updateName').value = record.name || '';
       document.getElementById('updateEmail').value = record.email || '';
       document.getElementById('updateDescription').value = record.description || '';
}

function openUpdateWithIndex(index) {
       prefillUpdate(index);
       document.getElementById('updateModal').classList.add('active');
}

function updateRecord(e) {
       e.preventDefault();
       var index = parseInt(document.getElementById('updateIndex').value, 10);
       var name = document.getElementById('updateName').value;
       var email = document.getElementById('updateEmail').value;
       var desc = document.getElementById('updateDescription').value;

       var records = getRecords();
       if (!records[index]) {
              return;
       }
       records[index] = {
              name: name,
              email: email,
              description: desc
       };
       saveRecords(records);

       closeModal('updateModal');
       displayData();
}

function displayDeleteOptions() {
       var records = getRecords();
       var display = document.getElementById('deleteDisplay');

       if (!records.length) {
              display.innerHTML = '<div class="empty-state">No data to delete</div>';
              return;
       }

       var html = '';

       records.forEach(function (record, index) {
              html += '<div class="data-item">';
              html += '<div class="data-item-header">';
              html += '<span class="data-item-label">Record ' + (index + 1) + '</span>';
              html += '<button class="delete-field-btn" onclick="deleteRecord(' + index + ')">Delete</button>';
              html += '</div>';
              if (record.name) {
                     html += '<div class="data-item-row"><span class="data-item-label">Name</span><span class="data-item-value">' + record.name + '</span></div>';
              }
              if (record.email) {
                     html += '<div class="data-item-row"><span class="data-item-label">Email</span><span class="data-item-value">' + record.email + '</span></div>';
              }
              if (record.description) {
                     html += '<div class="data-item-row"><span class="data-item-label">Description</span><span class="data-item-value">' + record.description + '</span></div>';
              }
              html += '</div>';
       });

       html += '<button class="delete-all-btn" onclick="deleteAll()">Delete All</button>';

       display.innerHTML = html;
}

function deleteRecord(index) {
       var records = getRecords();
       if (!records[index]) {
              return;
       }
       records.splice(index, 1);
       saveRecords(records);
       displayDeleteOptions();
       displayData();
}

function deleteAll() {
       saveRecords([]);
       displayDeleteOptions();
       displayData();
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
