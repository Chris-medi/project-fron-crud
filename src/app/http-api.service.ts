import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface result {
  status:string,
  response:string,
  peopleList:
  [
    _id:string,
    first_name:string,
    last_name:string,
    age:string,
    identification_number:string,
    email:string,
    avatar:string
  ]
}

interface resultD {
  status: string,
  response: string,
  message: string
}

interface result2 {
  status: string,
  response: string,
  data: 
  {
    _id:string,
    first_name:string,
    last_name:string,
    age:string,
    identification_number:string,
    email:string,
    avatar:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {


  constructor(private httpClient:HttpClient) { }


  public  getUsers():Observable<result>{
     return this.httpClient.get<result>("https://prueba-tecnica0.herokuapp.com/person/users")
  }

  public addUser(body:object):Observable<resultD>{
    return this.httpClient.post<resultD>("https://prueba-tecnica0.herokuapp.com/person/user",body)
  }

  public deleteUser(id:string):Observable<resultD>{
    return this.httpClient.delete<resultD>(`https://prueba-tecnica0.herokuapp.com/person/user/${id}`,)
  }

  public update(body:object,id:string):Observable<resultD>{
    return this.httpClient.put<resultD>(`https://prueba-tecnica0.herokuapp.com/person/user/${id}`,body)
  }

  public getInfo(id:string):Observable<result2>{
    return this.httpClient.get<result2>(`https://prueba-tecnica0.herokuapp.com/person/user/${id}`)
  }
}
