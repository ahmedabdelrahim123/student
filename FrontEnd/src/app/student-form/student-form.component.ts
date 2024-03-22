import { Component, Input ,OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit{
  student: any = {};
  @Input() id: number = 0;
  @Input() students: any[] = [];
  showEmailError: boolean = false;
  errorMessage: string = '';
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ngOnInit(): void {
    if (this.id != 0) {
      this.studentService.getStudentById(this.id).subscribe(
        (data: any) => {
          this.student=data
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  constructor(
    private studentService: StudentService,
    public activeModal: NgbActiveModal
  ) {}
  countries = [
    "USA",
    "Canada",
    "Germany",
    "France",
    "United Kingdom",
    "Japan",
    "Australia",
    "Brazil",
    "Italy",
    "Spain",
    "India",
    "China",
    "Mexico",
    "Russia",
    "South Korea"
  ];
  saveStudent() {
    if (!this.validateData()) {
      return;
    }
    if (this.id === 0) {
      this.studentService.createStudent(this.student).subscribe(
        (createdStudent: any) => {
          this.activeModal.close(createdStudent);
        },
        (err) => {
          console.log(err);
          this.activeModal.close(null);
        }
      );
    } else {
      this.studentService.updateStudent(this.id, this.student).subscribe(
        (updatedStudent: any) => {
          this.activeModal.close(updatedStudent);
        },
        (err) => {
          console.log(err);
          this.activeModal.close(null);
        }
      );
    }
    
  }

  validateData(): boolean {
    const isValidEmail = this.emailRegex.test(this.student.email);
    const isEmailExists = this.students.some(student => student.email === this.student.email && student.id !== this.student.id);
    if (!this.student || !this.student.email || !this.student.fname || !this.student.lname || !this.student.birthdate || !this.student.gender || !this.student.country) {
      this.errorMessage = 'All fields are required';
      this.showEmailError = true;
      return false;
    }
    if (!isValidEmail) {
      this.showEmailError = true;
      this.errorMessage = 'Invalid Email Format';
      return false;
    } else if (isEmailExists) {
      this.showEmailError = true;
      this.errorMessage = 'This Email Already Exists';
      return false;
    }
    this.showEmailError = false;
    return true;
  }
  closeModal() {
    this.activeModal.close();
  }
}
