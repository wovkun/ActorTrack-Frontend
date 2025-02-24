import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Contract } from '../../shared/models/contract.model';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContractService {
  constructor(private readonly http: HttpClient) {}

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`contracts/getContracts`).pipe(
      catchError((error) => {
        console.error('Error fetching contracts:', error);
        return throwError(() => error);
      })
    );
  }

  getContractById(id: string): Observable<Contract> {
    return this.http.get<Contract>(`contracts/getContractById/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching contract:', error);
        return throwError(() => error);
      })
    );
  }

  createContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(`contracts/createContract`, contract).pipe(
      catchError((error) => {
        console.error('Error creating contract:', error);
        return throwError(() => error);
      })
    );
  }

  updateContract(id: string, contract: Contract): Observable<Contract> {
    return this.http
      .put<Contract>(`contracts/updateContract/${id}`, contract)
      .pipe(
        catchError((error) => {
          console.error('Error updating contract:', error);
          return throwError(() => error);
        })
      );
  }

  deleteContract(id: string): Observable<{ message: string }> {
    return this.http
      .delete<{ message: string }>(`contracts/deleteContract/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error deleting contract:', error);
          return throwError(() => error);
        })
      );
  }
}
