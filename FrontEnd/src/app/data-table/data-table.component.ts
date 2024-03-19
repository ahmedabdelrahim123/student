import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
  }

  deleteStudent() {
    // this.activeModal.close() ;
   }

  closeModel(){
    // this.activeModal.close() ;

  }

  showDeleteConfirmation() {
    // this.activeModal.show(); 
  }
}
