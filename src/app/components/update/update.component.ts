import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from 'src/app/http-api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  success = false
  err=false

  id_user: string
  name:string
  apellido:string
  age:string
  numero:string
  email:string
  imagen:string

  constructor(
    private activateRouter:ActivatedRoute,
    private htppApi: HttpApiService,
    private formBuilder:FormBuilder,
    private router:Router
    ) {

        

     }


     formulario = this.formBuilder.group({
      imagen:['',[Validators.required,Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      nombres:['',[Validators.required, Validators.maxLength(50)]],
      apellidos:['',[Validators.required, Validators.maxLength(50)]],
      edad:[''],
      numero:['',[Validators.required]],
      correo:['',[Validators.email]]
    })

    public validNombre = this.formulario.get('nombres');
    public validApellido = this.formulario.get('apellidos');
    public validNumero = this.formulario.get('numero').errors;
    public validCorreo = this.formulario.get('correo').status;
    public validImagen = this.formulario.get('imagen').errors;
   
  


  ngOnInit(): void {
    this.activateRouter.params.subscribe(params=>{
      this.id_user = params.id
     // console.log(params.id)
    })
    this.htppApi.getInfo(this.id_user).subscribe(response=>{
        if(response.status){
            this.name = response.data.first_name
            this.apellido = response.data.last_name
            this.age = response.data.age
            this.numero = response.data.identification_number
            this.imagen = response.data.avatar
            this.email = response.data.email
        }
    })
  }

  actualizar(){
    let dataBody = {
      first_name:this.formulario.value.nombres,
      last_name:this.formulario.value.apellidos,
      age:this.formulario.value.edad||"underfined",
      identification_number:this.formulario.value.numero,
      email:this.formulario.value.correo||"underfined",
      avatar:this.formulario.value.imagen
      }
      this.htppApi.update(dataBody,this.id_user).subscribe(response=>{
        if(response.status){
        this.success = true
        setTimeout(()=>{
          this.router.navigate(['/listUser']) 
        },3000)
        }
        if(!response.status){
          this.err = true
          setTimeout(()=>{
            this.err = false
          },3000)
        }
      },err=>{
        this.err = true
        setTimeout(()=>{
          this.err = false
        },3000)
      })
  }

  url = this.formulario.value.imagen



}

