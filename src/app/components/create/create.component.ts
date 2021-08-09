import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/http-api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  url:string = "https://image.freepik.com/vector-gratis/fondo-error-pagina_23-2148080651.jpg"
  text:string = "Cargando..."
  show:boolean = false
  clase = "load"
  
  success = false
  err= false

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


    
  constructor(
    private httpApi:HttpApiService, 
    private formBuilder:FormBuilder,
    private router:Router
    ) { 
  
  }

  ngOnInit(): void {
  }

  crear(){
    this.show = true 

    let dataBody = {
        first_name:this.formulario.value.nombres,
        last_name:this.formulario.value.apellidos,
        age:this.formulario.value.edad,
        identification_number:this.formulario.value.numero,
        email:this.formulario.value.correo,
        avatar:this.formulario.value.imagen
    }
          this.httpApi.addUser(dataBody).subscribe(response=>{
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

}
