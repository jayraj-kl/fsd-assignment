import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
  firstName: string;
  lastName: string;
  rollNo: number;
  password: string;
  contactNumber: number;
}

// Create a schema for Student
const studentSchema: Schema<IStudent> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  rollNo: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  contactNumber: { type: Number, required: true }
});

const Student = mongoose.model<IStudent>('Student', studentSchema);
export default Student;
