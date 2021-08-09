import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/http-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.css']
})
export class TableUserComponent implements OnInit {
  displayedColumns: string[] = ['first_name','last_name','age','identification_number','email','opciones']
  dataSource=[]
 
  showConfirmar = false
  success = false 
  err = false

  id:string

  constructor(
    private httpApi:HttpApiService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.httpApi.getUsers().subscribe((response)=>{
      this.dataSource = response.peopleList
    })

  }


  eliminar(id:string){
    this.showConfirmar = true
    this.id = id
  }
  

  question(){
    this.showConfirmar = false
        this.httpApi.deleteUser(this.id).subscribe((response)=>{
          console.log(response)
          if(response.status){
            this.success = true
            setTimeout(()=>{
              this.router.navigate(['/listUser'])
            },3000)
            }
            if(!response.status){
              this.err = true
              setTimeout(()=>{
              this.router.navigate(['/listUser'])
              },3000)
            }
        })
  }



}
