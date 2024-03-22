import { Component, Input} from '@angular/core';
import { StudentService } from '../student.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent {
  @Input() id: number = 0;
  constructor(
    private studentService: StudentService,
    public activeModal: NgbActiveModal
  ) {}

  deleteStudent() {
    this.studentService.deleteStudent(this.id).subscribe(
      () => {
        
        this.activeModal.close(1);
      },
      (err) =>{
        console.log(err);
        this.activeModal.close(0);
      } 
    );
  }

  closeModel() {
    this.activeModal.close();
  }
}
