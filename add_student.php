<?php
$Fname = $_POST['Fname'];
$Lname = $_POST['Lname'];
$Dob = $_POST['Dob'];
$Pname = $_POST['Pname'];
$Address = $_POST['Address'];
$City = $_POST['City'];
$Phone = $_POST['Phone'];
$StudentId = $_POST['StudentId'];

// Create a connection to the MySQL database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "studentrecord";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create the SQL query to insert the data into the "student" table
$sql = "INSERT INTO student (Fname, Lname, Dob, Pname, Address, City, Phone, StudentId) VALUES ('$Fname', '$Lname', '$Dob', '$Pname', '$Address', '$City', '$Phone', '$StudentId')";

// Execute the query and check for success
if ($conn->query($sql) === TRUE) {
    echo "Student added successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>
