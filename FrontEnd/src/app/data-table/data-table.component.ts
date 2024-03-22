import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
import { StudentFormComponent } from '../student-form/student-form.component';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  students:any;

  constructor(private studentService: StudentService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.studentService.getAllStudents().subscribe(
      {
        next: (data: any) => { 
          console.log(data);
          this.students = data.map((student: any) => {
            student.name = `${student.fname} ${student.lname}`;
            student.age = this.calculateAge(student.birthdate);
            return student;
          });
        },
        error: (error) => {
          console.error('Error fetching students:', error);
        }
      }
    );
  }
  
  deleteStudent(id: number) {
    const deletedStudentModal = this.modalService.open(DeleteStudentComponent, {
      centered: true,
    });
    deletedStudentModal.componentInstance.id = id;
    if (deletedStudentModal.result) {
      deletedStudentModal.result.then((result) => {
        if(result ===1){
          this.students = this.students.filter((student: any) => student.id !== id); 
        }
      }).catch(error => {
        console.error("An error occurred:", error);
      });
    }
  }
  student_form(id: number): void {
    const studentFormModal = this.modalService.open(StudentFormComponent, {
      centered: true,
    });
    
    studentFormModal.componentInstance.id = id;
    
    studentFormModal.result.then((result: any) => {
      console.log("result",result);
      if (result) {      
        if (id === 0) {
          result.student.name = `${result.student.fname} ${result.student.lname}`;
          result.student.age = this.calculateAge(result.student.birthdate);
          this.students.push(result.student); 
        } else {
          const existingStudentIndex = this.students.findIndex((student: any) => student.id === result.student.id);
          if (existingStudentIndex !== -1) {
            result.student.name = `${result.student.fname} ${result.student.lname}`;
            result.student.age = this.calculateAge(result.student.birthdate);
            this.students[existingStudentIndex] = result.student;
          }
        }
      }
    }).catch(error => {
      console.error("An error occurred:", error);
    });
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
