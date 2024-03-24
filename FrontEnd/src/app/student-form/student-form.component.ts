import { Component, Input ,OnInit} from '@angular/core';
import { StudentService } from '../student.service';
import { NgbActiveModal,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit{
  student: any = {};
  currentYear: number = new Date().getFullYear() -1;
  @Input() id: number = 0;
  @Input() students: any[] = [];
  showEmailError: boolean = false;
  errorMessage: string = '';
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  ngOnInit(): void {
    if (this.id != 0) {
      
        this.studentService.getStudentById(this.id).subscribe(
            (data: any) => {
                this.student = data;
                const dateParts = this.student.birthdate.split('-');
                this.student.birthdate = {
                    year: parseInt(dateParts[0]),
                    month: parseInt(dateParts[1]),
                    day: parseInt(dateParts[2])
                };
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
    "Egypt",
    "Germany",
    "France",
    "United Kingdom",
    "Japan",
    "Australia",
    "Brazil",
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
    
    // Format the birthdate before saving
    
    if (this.id === 0) {
      this.student.birthdate = this.format_bd();
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
      this.student.birthdate = this.format_bd();      
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

format_bd(): string {
  const birthdate = this.student.birthdate;
  // Adjust the month by adding 1 because ngb-datepicker months are zero-based
  const month = birthdate.month < 9 ? '0' + (birthdate.month + 1) : (birthdate.month + 1);
  const day = birthdate.day < 10 ? '0' + birthdate.day : birthdate.day;
  return `${birthdate.year}-${month}-${day}`;
}


  validateData(): boolean {
    const isValidEmail = this.emailRegex.test(this.student.email);
    const isEmailExists = this.students.some(student => student.email === this.student.email && student.id !== this.student.id);
    if (!this.student
      || !this.student.email 
      || !this.student.fname 
      || !this.student.lname 
      || !this.student.birthdate.day
      || !this.student.birthdate.month
      || !this.student.birthdate.year
      || !this.student.gender 
      || !this.student.country) {
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
