import { Component, OnInit, Output } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router'
import { AuthService} from '../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  formLogin = new FormGroup({
      email:new FormControl('' ,Validators.required),
      password: new FormControl('', Validators.required)
  });

  mostrar:boolean;
  id:any
  constructor(private httpClient:HttpClient, private router:Router, private route:ActivatedRoute,private auth:AuthService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    if(document.location.href=='http://localhost:4200/landingPage'){
      this.mostrar=false;
    }else{
      this.mostrar=true;
    }
  }
  get email(){
    return this.formLogin.get('email')
  }
  get password(){
    return this.formLogin.get('password')
  }
  
  iniciarSesion(){
    this.auth.login(this.formLogin.value).subscribe((res:any)=>{
        if(res.codigo==1){
          let id = res.user
          localStorage.setItem('token',res.token);
          this.router.navigate(['principal',{id:id}]);
          
        }else{
          alert(res.mensaje)
        }
    })
  }
  toggleSidebar(){
    document.querySelector('#sidebar-wrapper').classList.add('sidebarOpen');
  }


}
