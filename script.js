const recordForm = document.getElementById('record-form');
const FnameInput = document.getElementById('Fname');
const LnameInput = document.getElementById('Lname');
const DobInput = document.getElementById('Dob');
const PnameInput = document.getElementById('Pname');
const AddressInput = document.getElementById('Address');
const CityInput = document.getElementById('City');
const PhoneInput = document.getElementById('Phone');
const StudentIdInput = document.getElementById('StudentId');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];

// Function to check for duplicate student IDs
function isDuplicateStudentId(studentId) {
  return records.some((record) => record.StudentId === studentId);
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="10" style="text-align:center;color:red;">No Records Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.Fname}</td>
                    <td>${record.Lname}</td>
                    <td>${record.Dob}</td>
                    <td>${record.Pname}</td>
                    <td>${record.Address}</td>
                    <td>${record.City}</td>
                    <td>${record.Phone}</td>
                    <td>${record.StudentId}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const Fname = FnameInput.value;
  const Lname = LnameInput.value;
  const Dob = DobInput.value;
  const Pname = PnameInput.value;
  const Address = AddressInput.value;
  const City = CityInput.value;
  const Phone = PhoneInput.value;
  const StudentId = StudentIdInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (Fname && Lname && Dob && Pname && Address && City && Phone && StudentId) {
    if (isDuplicateStudentId(StudentId) && editIndex === -1) {
      alert('Student with the same ID already exists.');
      return;
    }

    if (editIndex === -1) {
      // Add a new record
      records.push({ Fname, Lname, Dob, Pname, Address, City, Phone, StudentId });
    } else {
      // Update an existing record
      records[editIndex] = { Fname, Lname, Dob, Pname, Address, City, Phone, StudentId };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    FnameInput.value = '';
    LnameInput.value = '';
    DobInput.value = '';
    PnameInput.value = '';
    AddressInput.value = '';
    CityInput.value = '';
    PhoneInput.value = '';
    StudentIdInput.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  FnameInput.value = recordToEdit.Fname;
  LnameInput.value = recordToEdit.Lname;
  DobInput.value = recordToEdit.Dob;
  PnameInput.value = recordToEdit.Pname;
  AddressInput.value = recordToEdit.Address;
  CityInput.value = recordToEdit.City;
  PhoneInput.value = recordToEdit.Phone;
  StudentIdInput.value = recordToEdit.StudentId;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

// Initial display
displayRecords();
