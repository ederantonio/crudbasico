$("#registrar").click(()=> {
    formulario(); 
   
}) 

 function formulario(){ 
    $(".form").html(` 
    <form class="col-md-6 mt-1" id="myForm">  
         
        <div class="form-group">
            <label for="nombre">Nombre del  producto</label>
            <input type="text" class="form-control" name="nombre" id="nombre" aria-describedby=""> 
        </div>
        <div class="form-group">
            <label for="marca">Marca</label>
            <input type="text" class="form-control" name="marca" id="marca">
        </div>
        <div class="form-group">
            <label for="modelo">Modelo</label>
            <input type="text" class="form-control" name="modelo" id="modelo"> 
        </div>
        <div class="form-group">
            <label for="modelo">Cantidad</label>
            <input type="text" class="form-control" name="cantidad" id="cantidad"> 
        </div>
        <div class="form-group">
            <label for="modelo">Precio</label>
            <input type="text" class="form-control" name="precio" id="precio"> 
        </div>
        <button type="submit" id="btn-registrar" class="btn btn-primary">Aceptar</button>
    </form>  
    `);

    /* --------/ Validacion del formulario /-----------*/
    $("#myForm").validate({ 
        rules: {
            nombre:{required:true},// Para que no vaya en blanco
            marca:{required:true},
            modelo:{required:true},
            cantidad:{required:true},
            precio:{required:true}
        },
        messages:{ 
            nombre:'<span style="color:#C95E81">Llenar campo</span> ',// Mensaje que se mostrara
            marca:'<span style="color:#C95E81">Llenar campo</span>',
            modelo:' <span style="color:#C95E81">Llenar campo</span> ',
            cantidad:'<span style="color:#C95E81">Llenar campo</span>',
            precio:'<span style="color:#C95E81">Llenar campo</span>'
        } ,
        submitHandler: function(form){ //si todos los controles cumplen con las validaciones, se ejecuta este codigo
            // $(".loader").css("visibility","visible"); 
            $.ajax({ 
                
                url: 'registrar.php',
                method: 'POST',  
                data: { nombre: $("#nombre").val(), marca:$("#marca").val(), 
                        modelo:$("#modelo").val(),cantidad:$("#cantidad").val(),precio:$("#precio").val() 
                }
                // success: function(data) { 
                //     if(data){
                //         $("#letrero").css("visibility","visible"); 
                //         $(".msj-alerta").html(data); 
                //         $('#myForm').trigger("reset");
                //     }
                    
                // }, 
            
            }).done(resultado=>{
                var resultado = resultado;
                $("#letrero").html(`
                
                <div class="bs-example">
                <div id="myAlert" class="alert alert-success alert-dismissible fade show">
                    <strong>Note!</strong> This is a simple example of dismissible alert.
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                </div>
                </div>
                
                `); 
                 
                $('#myForm').trigger("reset");
                 
            })
     
        },  
    });	 
 }

 $(document).ready(function(){
    $("#myAlert").on('close.bs.alert', function(){
        alert("Alert message box has been closed.");
    });
});