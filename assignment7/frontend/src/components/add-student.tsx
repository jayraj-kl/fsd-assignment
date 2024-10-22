'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AddStudentProps {
  onStudentAdded: () => void
}

export function AddStudent({ onStudentAdded }: AddStudentProps) {
  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    contactNumber: ''
  })

  const addStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      })
      if (response.ok) {
        setNewStudent({ firstName: '', lastName: '', rollNo: '', password: '', contactNumber: '' })
        onStudentAdded()
      }
    } catch (error) {
      console.error('Error adding student:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addStudent} className="space-y-4">
          <Input
            type="text"
            placeholder="First Name"
            value={newStudent.firstName}
            onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={newStudent.lastName}
            onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})}
            required
          />
          <Input
            type="text"
            placeholder="Roll No"
            value={newStudent.rollNo}
            onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={(e) => setNewStudent({...newStudent, password: e.target.value})}
            required
          />
          <Input
            type="tel"
            placeholder="Contact Number"
            value={newStudent.contactNumber}
            onChange={(e) => setNewStudent({...newStudent, contactNumber: e.target.value})}
            required
          />
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}