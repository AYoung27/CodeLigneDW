function nuevaCarpeta(){
    document.querySelector('#carpetas').innerHTML= `<div class="col-lg-3">
    <div class="card">
        <img src="assets/img/carpeta.png" class="card-img-top mr-auto ml-auto"  alt="EditarCodigo" >
        
        <div class="card-body">
            <h5 class="fs">nombre carpeta</h5>
            <p class="fs">descripcion carpeta</p>
        </div>
    </div>
  </div>`;
  }