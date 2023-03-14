$(document).ready(function () {
    tableBook = $("#book_table").DataTable({  
        ajax:{            
            url: "book/list/", 
            method: "GET", 
            dataSrc:""
        },
        columns:[
            {data: "id"},
            {data: "nome"},
            {data: "escritor"},
            {data: "editora"},
            {data: "genero"},
            {data: "paginas"},
            {defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar' data-toggle='modal' data-target='#modal_book'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger btn-sm btnExcluir'><i class='bi bi-trash-fill'></i></button></div></div>"}
        ]
    });

    $('#book_form').submit(function(e){                         
        e.preventDefault();
        nome = $.trim($('#nome').val());    
        escritor = $.trim($('#escritor').val());
        editora = $.trim($('#editora').val());    
        genero = $.trim($('#genero').val());    
        paginas = $.trim($('#paginas').val());
        if(id != null){
            $.ajax({
                url: "book/edit",
                type: "POST",
                datatype:"json",    
                data:  {id:id, nome:nome, escritor:escritor, editora:editora, genero:genero, paginas:paginas},    
                success: function(data) {
                    tableBook.ajax.reload(null, false);
                    if(data == 2){
                        $('#modal_book').modal('hide');	
                        Swal.fire (
                            'Aviso',
                            'Book Editado com Sucesso',
                            'success'
                        );
                    }
                }
            });

        }else{

            $.ajax({
                url: "book/new",
                type: "POST",
                datatype:"json",    
                data:  {nome:nome, escritor:escritor, editora:editora, genero:genero, paginas:paginas},    
                success: function(data) {
                    tableBook.ajax.reload(null, false);
                    if(data == 1){
                        $('#modal_book').modal('hide');	
                        Swal.fire (
                            'Aviso',
                            'Book incluído com Sucesso',
                            'success'
                        );
                    }
                }
            });

        }

    });
    
    $(document).on("click", ".btn_new", function(){
        $("#book_form").trigger("reset");
        tituloModal = $('#modal_title').text("Add Book");
        tituloBotao = $('#btn_action').text('Add');
        id = null;
        nome = $("#nome").val();
        escritor = $("#escritor").val();
        editora = $("#editora").val();
        genero = $("#genero").val();
        paginas = $("#paginas").val();
    });

    $(document).on("click", ".btnEditar", function(){
        tituloModal = $('#modal_title').text('Edit Book');
        tituloBotao = $('#btn_action').text('Edit');
        linha = $(this).closest("tr");  
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        nome = linha.find('td:eq(1)').text();
        escritor = linha.find('td:eq(2)').text();
        editora = linha.find('td:eq(3)').text();
        genero = linha.find('td:eq(4)').text();
        paginas = linha.find('td:eq(5)').text();
        $("#nome").val(nome);
        $("#escritor").val(escritor);
        $("#editora").val(editora);
        $("#genero").val(genero);
        $("#paginas").val(paginas);
    });

    $(document).on("click", ".btnExcluir", function(){
        linha = $(this);           
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());	
        Swal.fire({
            title: "Aviso",
            text: "Essa ação não podera ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {            
                $.ajax({
                    url: "http://localhost:8089/book/remove/" + id,
                    type: "GET",
                    success: function(){
                        tableBook.row(linha.parents("tr")).remove().draw();
                        Swal.fire (
                            "Aviso",
                            "Evento Excluído com Sucesso",
                            "success"
                        );                  
                    }
                });	
            }
        });
    });




});

  
