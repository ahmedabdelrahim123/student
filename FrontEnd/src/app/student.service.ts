import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:7008/api/student'; // Adjust the base URL according to your backend server

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, studentData);
  }

  updateStudent(id: number, studentData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, studentData);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
