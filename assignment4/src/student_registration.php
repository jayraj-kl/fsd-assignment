<?php
// Database connection
$con = new mysqli('mysql_db', 'root', 'root', 'student_db');

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Insert operation
if (isset($_POST['insert'])) {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $roll_no = $_POST['roll_no'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];
    $contact_number = $_POST['contact_number'];

    // Form validation
    if (empty($first_name) || empty($last_name) || empty($roll_no) || empty($password) || empty($confirm_password) || empty($contact_number)) {
        echo "All fields are required!";
    } elseif ($password != $confirm_password) {
        echo "Passwords do not match!";
    } elseif (!is_numeric($contact_number)) {
        echo "Contact number must be numeric!";
    } else {
        // Check if the roll_no already exists
        $check_roll_no = $con->prepare("SELECT roll_no FROM students WHERE roll_no = ?");
        $check_roll_no->bind_param("s", $roll_no);
        $check_roll_no->execute();
        $check_roll_no->store_result();

        if ($check_roll_no->num_rows > 0) {
            echo "Roll number already exists. Please use a different Roll No.";
        } else {
            // Hash the password
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Insert query
            $stmt = $con->prepare("INSERT INTO students (first_name, last_name, roll_no, password, contact_number) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $first_name, $last_name, $roll_no, $hashed_password, $contact_number);
            if ($stmt->execute()) {
                echo "Student record inserted successfully.";
            } else {
                echo "Error: " . $stmt->error;
            }
            $stmt->close();
        }

        $check_roll_no->close();
    }
}

// Update operation
if (isset($_POST['update'])) {
    $roll_no = $_POST['roll_no'];
    $contact_number = $_POST['contact_number'];

    if (empty($roll_no) || empty($contact_number)) {
        echo "Roll No and Contact Number are required!";
    } elseif (!is_numeric($contact_number)) {
        echo "Contact number must be numeric!";
    } else {
        // Update query
        $stmt = $con->prepare("UPDATE students SET contact_number=? WHERE roll_no=?");
        $stmt->bind_param("ss", $contact_number, $roll_no);
        if ($stmt->execute()) {
            echo "Student record updated successfully.";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}

// Delete operation
if (isset($_POST['delete'])) {
    $roll_no = $_POST['roll_no'];

    if (empty($roll_no)) {
        echo "Roll No is required to delete a record!";
    } else {
        // Delete query
        $stmt = $con->prepare("DELETE FROM students WHERE roll_no=?");
        $stmt->bind_param("s", $roll_no);
        if ($stmt->execute()) {
            echo "Student record deleted successfully.";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}

// Search and display records
if (isset($_POST['view'])) {
    $result = $con->query("SELECT * FROM students");
    if ($result->num_rows > 0) {
        echo "<table border='1'><tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Roll No</th><th>Contact Number</th></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id"] . "</td><td>" . $row["first_name"] . "</td><td>" . $row["last_name"] . "</td><td>" . $row["roll_no"] . "</td><td>" . $row["contact_number"] . "</td></tr>";
        }
        echo "</table>";
    } else {
        echo "No records found.";
    }
}

// Close connection
$con->close();
?>
