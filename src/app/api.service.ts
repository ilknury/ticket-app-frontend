import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  logOut() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://ticket-api-l6ow.onrender.com/api';
  token = '';



  currentUser = new BehaviorSubject<
    | {
        _id: string;
        studentNumber: string;
        fullName: string;
        department: string;
        phoneNumber: string;
        email: string;
        userType: number;
        iat: number;
        exp: number;
      }
    | null
    | undefined
  >(undefined);
  

  constructor(private http: HttpClient) {}

  // USER PROCESS

  checkToken(): Observable<any> {
    // Check if the valid token is stored in the local storage
    this.token = localStorage.getItem('tokenYek') || '';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http
      .get<any>(this.baseUrl + '/auth/check-token', { headers: headers })
      .pipe(
        tap((data) => {
          if (data.status === 200) {
            this.currentUser.next(data.user);
            return of(true);
          } else {
            this.currentUser.next(null);
            return of(false);
          }
        })
      );
  }

  registerStudent(studentNumber: string, fullName: string, department: string, phoneNumber: string, email: string, password: string): Observable<any> {
    // Send a POST request to the server
    return this.http.post<any>(this.baseUrl + '/auth/register', { studentNumber, fullName, department, phoneNumber, email, password });
  }


  verifyEmail(studentId: string, token: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/auth/student/' + studentId + '/verify/' + token);
  }

  loginStudent(email: string, password: string): Observable<any> {
    // Send a POST request to the server
    return this.http
      .post<any>(this.baseUrl + '/auth/login', { email, password })
      .pipe(
        tap((data) => {
          // If the login is successful, store the user in the local storage
          if (data.status === 200) {
            // Store the user in the local storage
            this.token = data.token;
            localStorage.setItem('tokenYek', data.token);
            localStorage.setItem('userType', '1');
            return of(true);
            // return of({ success: true, message: 'Giriş başarılı!' });
          } else {
            // return of({ success: false, message: 'Giriş başarısız!' });
            return of(false);
          }
        })
      );
  }

  loginPersonnel(email: string, password: string): Observable<any> {
    // Send a POST request to the server
    return this.http
      .post<any>(this.baseUrl + '/auth/personnel-login', { email, password })
      .pipe(
        tap((data) => {
          // If the login is successful, store the user in the local storage
          if (data.status === 200) {
            // Store the user in the local storage
            this.token = data.token;
            localStorage.setItem('tokenYek', data.token);
            localStorage.setItem('userType', '5');
            // return of({ success: true, message: 'Giriş başarılı!' });
            return of(true);
          } else {
            // return of({ success: false, message: 'Giriş başarısız!' });
            return of(false);
          }
        })
      );
  }


  // TICKET PROCESS
  getTicketById(id: string): Observable<any> {
    // Send a POST request to the server
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    let body = {
      ticketId: id
    }
    return this.http.post<any>(this.baseUrl + '/ticket/get', body, { headers: headers });
  }

  getTicketsByDepartment(): Observable<any> {
    // Send a GET request to the server
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    let body = {
      department: this.currentUser.value?.department.toString()
    }
    return this.http.post<any>(this.baseUrl + '/ticket/all', body, { headers: headers });
  }

  getTicketsByStudent(): Observable<any> {
    // Send a GET request to the server
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    let body = {
      student: this.currentUser.value?._id
    }
    return this.http.post<any>(this.baseUrl + '/ticket/all/student', body, { headers: headers });
  }

  answerTicket(ticket: any, answer: string): Observable<any> {
    // Send a POST request to the server
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    let payload = {
      ticketId: ticket._id,
      answer: answer
    }   
    return this.http.post<any>(this.baseUrl + '/ticket/answer', payload, { headers: headers });
  }

  createTicket(student: string, department: string, category: string, title: string): Observable<any> {
    // Send a POST request to the server
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });

    let payload = {
      student: student,
      category: category,
      department: department,
      title: title
    }
    return this.http.post<any>(this.baseUrl + '/ticket/create', payload, { headers: headers });
  }




  // DEPARTMENT PROCESS
  getDepartments(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/department/all');
  }



  // CATEGORY PROCESS
  getCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/category/all');
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/category/' + id);
  }



  // FAQ PROCESS
  getFaqsByCategory(category: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/faq/' + category);
  }






  // ANALYTICS PROCESS
  totalStudentsByDepartment(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-students-by-department', { headers: headers });
  }

  totalTicketsByDepartment(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-tickets-by-department', { headers: headers });
  }

  totalTicketsByCategory(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-tickets-by-category', { headers: headers });
  }

  /////

  totalTickets(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-tickets', { headers: headers });
  }

  totalPersonnels(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-personnels', { headers: headers });
  }

  totalStudents(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/total-students', { headers: headers });
  }

  averageTicketAnswerTime(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(this.baseUrl + '/analytic/average-time-to-answer-ticket', { headers: headers });
  }


}
