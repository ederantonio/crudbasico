var buscar, datos;
/* --------/ Consulta de productos /-----------*/ 
$(document).ready(function(){ 
    $(".form").html(`
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Producto</h5> 
          </div>
          <div class="modal-body">

            <form class="mt-1 col-12" id="formeditar">
            <div class="form-row  ">
                <div class="form-group col-md-6">
                    <label for="nombre">id del producto</label>
                    <input type="text" class="form-control" name="id" id="ids" aria-describedby="" disabled> 
                </div>  
                <div class="form-group col-md-6">
                    <label for="nombre">Nombre del  producto</label>
                    <input type="text" class="form-control" name="nombre" id="nombres"  aria-describedby=""> 
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="marca">Marca</label>
                    <input type="text" class="form-control" name="marca" id="marcas" >
                </div> 
                <div class="form-group col-md-6">
                    <label for="modelo">Modelo</label>
                    <input type="text" class="form-control" name="modelo" id="modelos" > 
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="modelo">Cantidad</label>
                    <input type="text" class="form-control" name="cantidad" id="cantidades" > 
                </div>
                <div class="form-group col-md-6">
                    <label for="modelo">Precio</label>
                    <input type="text" class="form-control" name="precio" id="precios" > 
                </div> 
            </div>
            <div class="form-group d-flex justify-content-center" id="respuesta-modificar">
                
            </div>
            </form> 

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary cerrar" data-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" id="aceptar-modificar">Aceptar</button>
          </div>
        </div>
      </div>
    </div>

    <form class="col-md-6 mt-1" id=" ">  
        <div class="form-group">
            <table class="table">
                <thead class="titulos">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nombre</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th> 
                        <th scope="col">cantidad</th>
                        <th scope="col">precio</th>
                        <th scope="col">operaciones</th>
                    </tr>
                </thead>
                <tbody id="tabla-consulta">

                </tbody>
            </table> 
        </div>
    </form> 
    `); 
}) 

$( document ).ready(function() {
    $.ajax({  
        url: 'consulta.php',
        method: 'POST',
        dataType:'json'
    }).done(result=>{  
        var productos;
        // Tabla de productos
        for(var a=0; a<result.length;a++)// dependiendo del total de registros se van creando las filas y se van acumulando en productos
        {
            productos +=  `
            <tr>
                <td>${result[a].id}</td>
                <td>${result[a].nombre}</td>
                <td>${result[a].marca}</td>
                <td>${result[a].modelo}</td>
                <td>${result[a].cantidad}</td>
                <td>${result[a].precio}</td> 
                <td class="col-md-12" ">
                    <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                    Editar
                    </button>
                    <button type="button" class="btn btn-danger ">delete</button>
                </td>
                 
            </tr> 
            `;
        } 
        $("#tabla-consulta").html(productos);
    });
});
 

       
$("#aceptar-modificar").prop( "disabled", false );// Activa el boton 

$(document).on('click','.editar',function(e){ // Una página no se puede manipular de forma segura hasta que el documento esté "listo"
    e.preventDefault();
    $('#formeditar').trigger("reset"); 
    // console.log($(this).closest("tr"));
    let fila = $(this).closest("tr"); 
    let id = parseInt(fila.find('td:eq(0)').text()); 
    let nombre = fila.find('td:eq(1)').text(); 
    let marca = fila.find('td:eq(2)').text();
    let modelo = fila.find('td:eq(3)').text();
    let  cantidad = fila.find('td:eq(4)').text();
    let precio = fila.find('td:eq(5)').text(); 
    $("#ids").val(id);
    $("#nombres").val(nombre);
    $("#marcas").val(marca);
    $("#modelos").val(modelo);
    $("#cantidades").val(cantidad);
    $("#precios").val(precio); 
    $("#aceptar-modificar").click(()=>{ 
        $("#respuesta-modificar").html(`
            <div class="spinner-border align-middle " id="spiner" role="status">
                <span class="sr-only">Loading...</span>
            </div> 
        `);
        $.ajax({
            url:'modificar.php',
            method:'POST', 
            data:{id:$("#ids").val(),nombre:$("#nombres").val(),marca:$("#marcas").val(),modelo:$("#modelos").val(),cantidad:$("#cantidades").val(),precio:$("#precios").val()},
            dataType:'json',  
        }).done(resultados=>{ 
            
            $("#spiner").css("visibility","hidden");
            $("#aceptar-modificar").prop( "disabled", true );
            $("#respuesta-modificar").html(`  
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Se modifico correctamente!</strong>
                    <button type="button" class="close" id="btn-cerrar" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>   
                </div>
            `); 
            $(".cerrar").click(()=>{ 
                $(".close").click();
                $("#aceptar-modificar").prop( "disabled", false );// Activa el boton aceptar
                let productos='';
                for(var e  in resultados){
                    productos +=  `
                    <tr>
                        <td>${resultados[e].id}</td>
                        <td>${resultados[e].nombre}</td>
                        <td>${resultados[e].marca}</td>
                        <td>${resultados[e].modelo}</td>
                        <td>${resultados[e].cantidad}</td>
                        <td>${resultados[e].precio}</td> 
                        <td>
                        <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                        Editar
                        </button>
                        </td>
                    </tr> 
                    `;
                }  
                console.log(productos);
                $("#tabla-consulta").html(productos);     
            }) 
            $(document).on('click','#btn-cerrar',function(e){
                e.preventDefault();
                $("#aceptar-modificar").prop( "disabled", false );
            })    
        })
    }) 
}); 
  
  
/* --------/ Registrar productos/-----------*/
$("#registrar").click(()=> { 
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
            <div class="form-group" >
                <button type="submit" id="btn-registrar" class="btn btn-primary">Aceptar</button>
                <div class="spinner-border align-middle ml-4 " id="spiner" role="status" style="visibility:hidden">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> 
             
        </form>  
    `);

    /* --------/ Validacion de campos del formulario /-----------*/
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
             $("#spiner").css("visibility","visible"); 
            $.ajax({  
                url: 'registrar.php',
                method: 'POST',  
                data: { nombre: $("#nombre").val(), marca:$("#marca").val(), 
                        modelo:$("#modelo").val(),cantidad:$("#cantidad").val(),precio:$("#precio").val() 
                }  
            }).done(resultado=>{
                var resultado = resultado;
                $("#spiner").css("visibility","hidden");
                $("#letrero").html(`  
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>${resultado}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `);  
                $('#myForm').trigger("reset"); 
            }) 
        },  
    });	 
})
  
/* --------/ Modificar productos /-----------*/
$("#modificar").click(()=>{ 
    $(".form").html(` 
     

    <form class="col-md-6 mt-1" id="myForm"> 
        <div class="form-group class="mt-5">
             
            <input type="text" class="form-control" name="" id="buscar" aria-describedby="" placeholder="Buscar por nombre de producto"> 
        </div>
        <div class="form-group">
            <table class="table">
                <thead class="titulos">
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">nombre</th>
                        <th scope="col">marca</th>
                        <th scope="col">modelo</th> 
                        <th scope="col">cantidad</th>
                        <th scope="col">precio</th>
                        <th scope="col">operacion</th> 
                    </tr>
                </thead>
                <tbody id="tabla">

                </tbody>
            </table>
        </div> 
    </form>   
    `);  
     
    $("#buscar").keyup( function ()  { //Buscar productos 
        buscar = $("#buscar").val().trim(); 
        if(buscar == ''){
            html = `
            <tr  style="cursor:pointer;"> 
            </tr> `;
        }
        else{ 
            $.ajax({
                url:'registros.php',
                method:'POST', 
                data:{buscar:$("#buscar").val()},
                dataType:'json',  
            }).done(resultado=>{
                datos = resultado; 
                var html='';
                for(var i=0; i<resultado.length; i++){ 
                    html += `
                    <tr  style="cursor:pointer;"> 
                        <td>${resultado[i].id}</td>
                        <td>${resultado[i].nombre}</td> 
                        <td>${resultado[i].marca}</td>
                        <td>${resultado[i].modelo}</td>
                        <td>${resultado[i].cantidad}</td> 
                        <td>${resultado[i].precio}</td> 
                        
                    </tr> 
                    `;
                } 
                $("#tabla").html(html); 

                
                
            })
        }    
    })   
     
    
})


 