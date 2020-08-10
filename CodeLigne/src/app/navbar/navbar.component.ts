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
      email:new FormControl(''),
      password: new FormControl('')
  });

  mostrar:boolean;

  constructor(private httpClient:HttpClient, private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
    if(document.location.href=='http://localhost:4200/landingPage'){
      this.mostrar=false;
    }else{
      this.mostrar=true;
    }
  }
  
  iniciarSesion(){
    this.auth.login(this.formLogin.value).subscribe((res:any)=>{
        if(res.codigo==1){
          let id = res.user
          localStorage.setItem('token',res.token);
          this.router.navigate(['principal',id]);
          
        }else{
          console.log('error')
        }
    })
  }
  toggleSidebar(){
    document.querySelector('#sidebar-wrapper').classList.add('sidebarOpen');
  }


}
