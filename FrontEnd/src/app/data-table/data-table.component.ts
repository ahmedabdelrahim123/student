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
  students: any;
  currentPage: number = 1;
  studentsPerPage: number = 5; 

  constructor(private studentService: StudentService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe(
      (data: any) => {
        this.students = data.map((student: any) => {
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

  deleteStudent(id: number): void {
    const deletedStudentModal = this.modalService.open(DeleteStudentComponent);
    deletedStudentModal.componentInstance.id = id;
    if (deletedStudentModal.result) {
      deletedStudentModal.result.then((result) => {
        if (result === 1) {
          this.loadStudents();
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
    studentFormModal.componentInstance.students = this.students;
    
    studentFormModal.result.then((result: any) => {
      if (result) {
        this.onPageChange(1);
        this.loadStudents(); 
      }
    }).catch(error => {
      console.error("An error occurred:", error);
    });
  }

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

  onPageChange(page: number): void {
    this.currentPage = page;
  }
  get paginatedStudents(): any[] {
    if (!this.students) {
      return [];
    } 
    const startIndex = (this.currentPage - 1) * this.studentsPerPage;
    const endIndex = Math.min(startIndex + this.studentsPerPage, this.students.length);
    return this.students.slice(startIndex, endIndex);
  }
}
