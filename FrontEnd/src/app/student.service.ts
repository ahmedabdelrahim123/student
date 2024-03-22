import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:7008/api/student';

  constructor(private http: HttpClient) { }

  getAllStudents() {
    return this.http.get(this.baseUrl);
  }

  getStudentById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStudent(studentData: any){
    return this.http.post(`${this.baseUrl}/create`, studentData);
  }

  updateStudent(id: number, studentData: any){
    return this.http.put(`${this.baseUrl}/${id}`, studentData);
  }

  deleteStudent(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
