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

  closeModal() {
    this.activeModal.close();
  }
}
