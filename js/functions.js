 var buscar, datos;
/* --------/ Consulta de productos /-----------*/
 
$(()=>{ 
    $(".form").html(`
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
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

    $.ajax({  
        url: 'consulta.php',
        method: 'POST',
        dataType:'json'
    }).done(result=>{ 
         
        var productos;
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
                <td>
                    <button type="button"   class="btn btn-primary editar" data-toggle="modal" data-target="#exampleModal">
                    Editar
                    </button>
                </td>
            </tr> 
            `;
        } 
        
        $("#tabla-consulta").html(productos); 
        $(".editar").click(()=>{
            $('#tabla-consulta tr').click(function(){ // Al dar click en la tabla, segun sea el renglon se toma con eq la columna 0 donde esta el id
                var id = $(this).find("td").eq(0).html();  
                var nombre = $(this).find("td").eq(1).html();  
                var marca = $(this).find("td").eq(2).html(); 
                var modelo = $(this).find("td").eq(3).html(); 
                var cantidad = $(this).find("td").eq(4).html(); 
                var precio = $(this).find("td").eq(5).html();  
                $(".modal-body").html(`
                <form class="mt-1" id="myForm">
                    <div class="form-group">
                        <label for="nombre">id del producto</label>
                        <input type="text" class="form-control" name="id" id="id" value="${id}" aria-describedby="" disabled> 
                    </div>  
                    <div class="form-group">
                        <label for="nombre">Nombre del  producto</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" value="${nombre}" aria-describedby=""> 
                    </div>
                    <div class="form-group">
                        <label for="marca">Marca</label>
                        <input type="text" class="form-control" name="marca" id="marca" value="${marca}">
                    </div>
                    <div class="form-group">
                        <label for="modelo">Modelo</label>
                        <input type="text" class="form-control" name="modelo" id="modelo" value="${modelo}"> 
                    </div>
                    <div class="form-group">
                        <label for="modelo">Cantidad</label>
                        <input type="text" class="form-control" name="cantidad" id="cantidad" value="${cantidad}"> 
                    </div>
                    <div class="form-group">
                        <label for="modelo">Precio</label>
                        <input type="text" class="form-control" name="precio" id="precio" value="${precio}"> 
                    </div> 
                </form> 
                `)  
            }); 
            $("#aceptar-modificar").click(()=>{
                $.ajax({
                    url:'modificar.php',
                    method:'POST', 
                    data:{id:$("#id").val(),nombre:$("#nombre").val(),marca:$("#marca").val(),modelo:$("#modelo").val(),cantidad:$("#cantidad").val(),precio:$("#precio").val()},
                    dataType:'json',  
                }).done(resultados=>{  
                    console.log(resultados);
                })
            })
        })
    }) 
})  
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
            <div class="form-group  ">
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


 