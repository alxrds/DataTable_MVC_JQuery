$(document).ready(function () {
    tableBook = $("#book_table").DataTable({  
        ajax:{            
            url: "http://localhost:8089/book/list/", 
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
            {defaultContent: "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'><i class='bi bi-pencil-square'></i></button><button class='btn btn-danger btn-sm btnExcluir'><i class='bi bi-trash-fill'></i></button></div></div>"}
        ]
    });
    
    $(document).on("click", ".btnExcluir", function(){
        fila = $(this);           
        id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;	
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
                    success: function() {
                        tableBook.row(fila.parents("tr")).remove().draw();
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

  
