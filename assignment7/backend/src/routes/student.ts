import express from 'express';
import Student from '../models/db';

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, lastName, rollNo, password, contactNumber } = req.body;

  try {
    const newStudent = new Student({
      firstName,
      lastName,
      rollNo,
      password,
      contactNumber,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error });
  }
});

router.delete('/', async (req, res) => {
  const { rollNo } = req.body;
  try {

    const deletedStudent = await Student.findOneAndDelete({ rollNo });
    if (!deletedStudent) {
      res.status(404).json({
        message: `Student with rollNo ${rollNo} not found.`
      })
    }
    res.status(200).json({
      message: `Student with rollNo ${rollNo} deleted successfully.`
    })

  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error });
  }
});

router.patch('/:rollNo', async (req, res) => {
  const { rollNo } = req.params;
  const { firstName, lastName, password, contactNumber } = req.body;

  try {
    const updateStudent = await Student.findOne({ rollNo });

    if (!updateStudent) {
      console.error(`Student with rollNo ${rollNo} not found.`);
      res.status(404).json({ message: `Student with rollNo ${rollNo} not found.` });
    }

    if (firstName) {
      // @ts-ignore 
      updateStudent.firstName = firstName;
    }
    if (lastName) {
      // @ts-ignore 
      updateStudent.lastName = lastName;
    }
    if (password) {
      // @ts-ignore 
      updateStudent.password = password;
    }
    if (contactNumber) {
      // @ts-ignore 
      updateStudent.contactNumber = contactNumber;
    }
    // @ts-ignore 
    await updateStudent.save();
    console.log(`Student with rollNo ${rollNo} updated successfully`);

    res.status(200).json({ message: 'Student updated successfully', student: updateStudent });

  } catch (error) {
    console.error('Error while updating student:', error);
    res.status(400).json({ message: 'Error while updating student', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({ students });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching students', error });
  }
});

export default router;
