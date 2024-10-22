'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Student {
  _id: string
  firstName: string
  lastName: string
  rollNo: string
  contactNumber: string
}

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/students')
      const data = await response.json()
      setStudents(data.students)
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const deleteStudent = async (rollNo: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo })
      })
      if (response.ok) {
        fetchStudents()
      }
    } catch (error) {
      console.error('Error deleting student:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.rollNo}</TableCell>
                <TableCell>{student.contactNumber}</TableCell>
                <TableCell>
                  <Button variant="destructive" onClick={() => deleteStudent(student.rollNo)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}