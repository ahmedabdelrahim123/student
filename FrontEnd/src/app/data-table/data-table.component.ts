import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'; 

interface Student {
  id: number;
  fname: string;
  lname: string;
  birthdate: string;
  gender: string;
  email: string;
  country: string;
  name:string;
  age:number;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  students: Student[] = []; 

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      (data: Student[]) => { 
        console.log(data);
        this.students = data.map((student: Student) => {
          student.name = `${student.fname} ${student.lname}`;
          student.age = this.calculateAge(student.birthdate);
          return student;
        });
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Function to calculate age from birthdate
  calculateAge(birthdate: string): number {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
