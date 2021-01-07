var buscar, datos;

/* --------/ Tabla | modal registro y editar  /-----------*/ 
$(() =>{ 
    $(".form").html(`
    <div class="modal fade" id="registrarmodal" tabindex="-1" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Registro</h5> 
          </div>
          <div class="modal-body">

            <form class="mt-1 col-12" id="formregistrar">
                  
                <div class="form-group">
                    <label for="nombre">Nombre del  producto</label>
                    <input type="text" class="form-control" name="regnombre" id="regnombres"  aria-describedby=""> 
                </div> 
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="marca">Marca</label>
                        <input type="text" class="form-control" name="regmarca" id="regmarcas" >
                    </div> 
                    <div class="form-group col-md-6">
                        <label for="modelo">Modelo</label>
                        <input type="text" class="form-control" name="regmodelo" id="regmodelos" > 
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="modelo">Cantidad</label>
                        <input type="text" class="form-control" name="regcantidad" id="regcantidades" > 
                    </div>
                    <div class="form-group col-md-6">
                        <label for="modelo">Precio</label>
                        <input type="text" class="form-control" name="regprecio" id="regprecios" > 
                    </div> 
                </div>
                <div class="form-group d-flex justify-content-center" id="respuesta-registro">
                     
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="submit" class="btn btn-primary" id="registrarproducto">Aceptar</button>
                </div>
            </form> 

          </div> 
        </div>
      </div>
    </div>


    <div class="modal fade" id="exampleModal" tabindex="-1" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <input type="text" class="form-control" name="precio" id="precios" disabled> 
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
        <button type="button" id="btnregistrar"  class="btn btn-warning mb-4" data-toggle="modal" data-target="#registrarmodal">
            Registrar
        </button> 
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
    
});  
 

/* ------------/ Consulta /------------*/
$(function() {// Se traen todos los datos y se colocan en la tabla al iniciar
    $.ajax({  
        url: 'consulta.php',
        method: 'POST',
        dataType:'json'
    }).done(result=>{  
        console.log(result);
        var productos,op;
        // Tabla de productos
        for(var a=0; a<result.length;a++)// dependiendo del total de registros se van creando las filas y se van acumulando en productos
        {
              
            // console.log(op);
            productos +=  `
            <tr>
                <td>${result[a].id}</td>
                <td>${result[a].nombre}</td>
                <td>${result[a].marca}</td>
                <td>${result[a].modelo}</td>
                <td>${result[a].cantidad}</td>
                <td>$${result[a].precio}</td> 
                <td class="botones">
                    <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                    Editar
                    </button>
                    <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                </td> 
            </tr> 
            `;
        } 
        $("#tabla-consulta").html(productos);// Se colocan los datos en la tabla 
    });
});  
 

/* --------------/ Editar /------------- */
$(document).on('click','.editar',function(e){ // Una página no se puede manipular de forma segura hasta que el documento esté "listo"
    e.preventDefault();
    $("#aceptar-modificar").prop( "disabled", false );// Activa el boton aceptar 
    let fila = $(this).closest("tr"); // Se obtiene el renglon y luego se busca el primer td
    let id = parseInt(fila.find('td:eq(0)').text()); 
    let nombre = fila.find('td:eq(1)').text(); 
    let marca = fila.find('td:eq(2)').text();
    let modelo = fila.find('td:eq(3)').text();
    let  cantidad = fila.find('td:eq(4)').text();
    let precio = fila.find('td:eq(5)').text(); 
    // let formatoprecio = precio.replace("$","").substring(0,precio.indexOf(".")-1)  ;
    let formatoprecio = precio.replace("$","");
    // console.log(formatoprecio);
    $("#ids").val(id);// En cada input se coloca el valor obtenido al seleccionar el registro
    $("#nombres").val(nombre);
    $("#marcas").val(marca);
    $("#modelos").val(modelo);
    $("#cantidades").val(cantidad);
    $("#precios").val(formatoprecio); 
    $("#aceptar-modificar").click(()=>{ 
    // Se coloca un spiner
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
            $("#spiner").css("visibility","hidden");// se retira el spiner
            $("#aceptar-modificar").prop( "disabled", true );// Se desactiva el boton aceptar
            // Se muestra el letrero de exito
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
                        <td>$${resultados[e].precio}</td> 
                        <td>
                        <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                        Editar
                        </button>
                        <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                        </td>
                    </tr> 
                    `;
                }   
                $("#tabla-consulta").html(productos);     
            }) 
            $(document).on('click','#btn-cerrar',function(e){
                e.preventDefault();
                $("#aceptar-modificar").prop( "disabled", false );
            })    
        })
    }) 
}); 


/* --------------/ Eliminar /---------------*/
$(document).on('click','.eliminar',function(){
    let fila = $(this).closest("tr"); 
    let id = parseInt(fila.find('td:eq(0)').text());  
    $.ajax({
        url:'eliminar.php',
        method:'POST',
        data:{id:id},
        dataType:'json'
    }).done(function(datas){  
        var datoseliminados=''; 
        for(var o=0;o<datas.length;o++){
            datoseliminados +=  `
            <tr>
                <td>${datas[o].id}</td>
                <td>${datas[o].nombre}</td>
                <td>${datas[o].marca}</td>
                <td>${datas[o].modelo}</td>
                <td>${datas[o].cantidad}</td>
                <td>${datas[o].precio}</td> 
                <td class="botones">
                <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                Editar
                </button>
                <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                </td>
            </tr> 
            `;
        }  
        $("#tabla-consulta").html(datoseliminados);     
    })  
}) 
/* ------- / boton registrar amarillo /------*/
$(document).on('click','#btnregistrar',function(e){// Si tiene un evento que ejecute por default como cerrar o desplegar un modal con eventprevent default da la pauta para ejecutar una funcion
    e.preventDefault();
    $(".close").click();
    $('#formregistrar').trigger("reset"); // Cada ves que se de click en el boton registrar limpia el formulario 
}) 
 


/* -------------/ Registrar /------------*/
  
$(function() { // El boton debe de estar dentro del form y de tipo submit para que funcionen las validaciones
    $('#registrarproducto').prop("disabled", false);// Se habilita el boton aceptar e

    $.validator.addMethod("solonumeros", function (value, element) {// solo acepta numeros
        return this.optional(element) || /^[0-9]*\.?[0-9]*$/.test(value);
    }, ); 

    $.validator.addMethod("sololetras", function (value, element) {// solo acepta numeros
        return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
    }, );
     

   $.extend(jQuery.validator.messages, {
    required: "<span style='color:#C95E81'>Llenar campo.</span>",
    solonumeros:"<span style='color:#C95E81'>Debe tener solo numeros.</span>", 
    sololetras:"<span style='color:#C95E81'>Debe tener solo letras</span>" 
   });
      
    $("#formregistrar").validate({     
        rules: {
            regnombre:{ required:true,sololetras:true},// Para que no vaya en blanco
            regmarca:{required:true},
            regmodelo:{required:true},
            regcantidad:{required:true,solonumeros:true},
            regprecio:{required:true,solonumeros:true},
             
        },
        
        submitHandler: function(form){ //si todos los controles cumplen con las validaciones, se ejecuta este codigo
            $("#respuesta-registro").html(`
                <div class="spinner-border align-middle " id="registrospiner"  role="status">
                    <span class="sr-only">Loading...</span>
                </div> 
            `); 
            $.ajax({  
                url: 'registrar.php',
                method: 'POST',  
                data: { nombre: $("#regnombres").val(), marca:$("#regmarcas").val(), 
                        modelo:$("#regmodelos").val(),cantidad:$("#regcantidades").val(),precio:$("#regprecios").val() 
                },
                dataType:'json'  
            }).done(resultado=>{ 
                var resultado = resultado;
                 $("#registrospiner").css("visibility","hidden");// Se oculta el spiner
                 // Se muestra el letrero
                $("#respuesta-registro").html(`  
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Se Registro correctamente!</strong>
                    <button type="button" class="close" id="cerrarregistro" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `);  
                // Se deshabilidat el boton aceptar
                 $('#registrarproducto').prop("disabled", true);
                productosregistrados='';
                for(var b=0;b<resultado.length;b++){
                    productosregistrados +=  `
                    <tr>
                        <td>${resultado[b].id}</td>
                        <td>${resultado[b].nombre}</td>
                        <td>${resultado[b].marca}</td>
                        <td>${resultado[b].modelo}</td>
                        <td>${resultado[b].cantidad}</td>
                        <td>$${resultado[b].precio}</td> 
                        <td class="botones">
                        <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                        Editar
                        </button>
                        <button type="button" class="btn btn-danger eliminar">Eliminar</button>
                        </td>
                    </tr> 
                    `;
                } 
                $("#tabla-consulta").html(productosregistrados);
                $("#formregistrar").trigger("reset");
            }) 
        },  
    });
    $(document).on('click','#cerrarregistro',function(e){
        e.preventDefault();
        
        $("#registrarproducto").prop( "disabled", false );
    })
})
 
  
 