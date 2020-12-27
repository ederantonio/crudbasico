$("#registrar").click(()=>{
    $(".form").html(` 
        <form class="col-md-6 mt-1" id="form-registro">  
            <div class="form-group mb-2 mt-1 d-flex justify-content-center ">
                <div class="alert alert-success alert-dismissible " id="letrero" role="alert" style="visibility: hidden;">
                    <strong class="msj-alerta">Holy guacamole!</strong>   
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button> 
                </div>
            </div> 
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
 
        
        $("#form-registro").validate({ 
            rules: {
                nombre:{required:true},
                marca:{required:true},
                modelo:{required:true},
                cantidad:{required:true},
                precio:{required:true}
            },
            messages:{ 
                nombre:'<span style="color:#C95E81">Llenar campo</span> ',
                marca:'<span style="color:#C95E81">Llenar campo / incorrecto</span>',
                modelo:' <span style="color:#C95E81">Llenar campo</span> ',
                cantidad:'<span style="color:#C95E81">Llenar campo</span>',
                precio:'<span style="color:#C95E81">Llenar campo</span>'
            } ,
            submitHandler: function(form){ //si todos los controles cumplen con las validaciones, se ejecuta este codigo
                // $(".loader").css("visibility","visible"); 
                jQuery.ajax({ 
                    method: 'POST', 
                    url: 'registrar.php',  
                    data: { nombre: $("#nombre").val(), marca:$("#marca").val(), 
                            modelo:$("#modelo").val(),cantidad:$("#cantidad").val(),precio:$("#precio").val() 
                    },  
                  complete: function(xhr, textStatus) {
                    //se llama cuando se recibe la respuesta (no importa si es error o exito)
                    // alert("La respuesta regreso");
                  },
                  success: function(data, textStatus, xhr) {
                    
                      console.log(data)
                    // $(".loader").css("visibility","hidden"); 
                    // $("#nombre").val(" ") ; 
                    // $("#marca").val(" ") ; 
                    // $("#modelo").val(" ") ; 
                    // $("#cantidad").val(" ") ; 
                    // $("#cantidad").val(" ") ;
                    // $("#precio").val(" ") ;
                    $("#letrero").css("visibility","visible"); 
                    $(".msj-alerta").html(data); 
                    // $('#form-registro').trigger("reset");
                  },
                  error: function(xhr, textStatus, errorThrown) {
                    // $(".loader").css("visibility","hidden");
                    $("#letrero").css("display","unset"); 
                    $(".msj-alerta").html(data);
                  }
                });
            },  
        });	
        // alert('funciona');
        // $.ajax({
        //     method: 'POST',
        //     url: 'registrar.php', 
        //     data: {nombre: $("#nombre").val(), marca:$("#marca").val(), 
        //            modelo:$("#modelo").val(),cantidad:$("#cantidad").val(),precio:$("#precio").val()},  
        // }).done (resultado =>{
        //     jconsole.color.yellow.log(resultado); 
        //     $("#letrero").css("display","unset"); 
        //     $(".msj-alerta").html(resultado); 
        // })
    
})//click registrar




 