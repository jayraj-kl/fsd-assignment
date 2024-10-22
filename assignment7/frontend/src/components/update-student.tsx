'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UpdateStudentProps {
  onStudentUpdated: () => void
}

export function UpdateStudent({ onStudentUpdated }: UpdateStudentProps) {
  const [updateStudent, setUpdateStudent] = useState({
    rollNo: '',
    firstName: '',
    lastName: '',
    password: '',
    contactNumber: ''
  })

  const updateStudentInfo = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/api/students/${updateStudent.rollNo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateStudent)
      })
      if (response.ok) {
        setUpdateStudent({ rollNo: '', firstName: '', lastName: '', password: '', contactNumber: '' })
        onStudentUpdated()
      }
    } catch (error) {
      console.error('Error updating student:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Student</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={updateStudentInfo} className="space-y-4">
          <Input
            type="text"
            placeholder="Roll No"
            value={updateStudent.rollNo}
            onChange={(e) => setUpdateStudent({...updateStudent, rollNo: e.target.value})}
            required
          />
          <Input
            type="text"
            placeholder="First Name"
            value={updateStudent.firstName}
            onChange={(e) => setUpdateStudent({...updateStudent, firstName: e.target.value})}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={updateStudent.lastName}
            onChange={(e) => setUpdateStudent({...updateStudent, lastName: e.target.value})}
          />
          <Input
            type="password"
            placeholder="Password"
            value={updateStudent.password}
            onChange={(e) => setUpdateStudent({...updateStudent, password: e.target.value})}
          />
          <Input
            type="tel"
            placeholder="Contact Number"
            value={updateStudent.contactNumber}
            onChange={(e) => setUpdateStudent({...updateStudent, contactNumber: e.target.value})}
          />
          <Button type="submit" className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" /> Update Student
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}