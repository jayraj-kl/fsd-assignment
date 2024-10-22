'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddStudent } from './add-student'
import { UpdateStudent } from './update-student'
import { StudentList } from './student-list'

export default function StudentManagement() {
  const [refreshList, setRefreshList] = useState(false)

  const handleStudentAdded = () => {
    setRefreshList(prev => !prev)
  }

  const handleStudentUpdated = () => {
    setRefreshList(prev => !prev)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      
      <Tabs defaultValue="add" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add">Add Student</TabsTrigger>
          <TabsTrigger value="update">Update Student</TabsTrigger>
          <TabsTrigger value="list">Student List</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddStudent onStudentAdded={handleStudentAdded} />
        </TabsContent>
        <TabsContent value="update">
          <UpdateStudent onStudentUpdated={handleStudentUpdated} />
        </TabsContent>
        <TabsContent value="list">
          <StudentList key={refreshList.toString()} />
        </TabsContent>
      </Tabs>
    </div>
  )
}