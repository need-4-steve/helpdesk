/**
**Exemplo de uso:   onclick="setaDadosModalExcluir('#divExcluirOperador', '#inputEmailOperador', '${operador.email}')">
*	#divExcluirSetor: div com a mensagem e confirmação
*	#inputIdSetor: input tipo hidden para guardar parametro
*	${setor.id}: valor id 
**/
function openModalExcluirSubCategoria(idSubCategoria, nomeSubCategoria) {
	$('#inputIdSubCategoria').val(idSubCategoria);
	$('#inputNomeSubCategoria').val(nomeSubCategoria);
	$('#divExcluirSubCategoria').empty();
	var resposta = "<center><h6 class='modal-title'>Deseja realmente excluir a sub-categoria <br/>'" + nomeSubCategoria + "' ?</h6></center>"
	$('#divExcluirSubCategoria').append(resposta);
}
	
/**carregar modal atualizar SubCategoria
*/
function openModalEditarSubCategoria(id, nome, status) {
	$("#idEditSubCategoria").val(id);
	$("#nomeEditSubCategoria").val(nome);
	$("#statusEditSubCategoria").val(status);
	
	$('#subCategoriaEditarModal').modal({backdrop: 'static', keyboard: false})  	
	$('#subCategoriaEditarModal').modal('show');
}

/** https://datatables.net/*/
/**
* Configuração padrão das tabelas
**/
$(document).ready(function() {
	$('#tableSubCategoria').dataTable({
		 responsive: true,
		"pageLength": 10,
		"lengthMenu": [ [10, 15, 25, -1], [10, 15, 25, "Todos"]],
		"language" : {
		    "search":         "Filtrar:",
			"emptyTable":     "Nenhum registro encontrado",
		    "info":           "Mostrando _START_ até _END_ de _TOTAL_ registros",
		    "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
		    "infoFiltered":   " ( Filtrado de _MAX_ registros )",
		    "lengthMenu":     "Mostrar _MENU_ registros",
		    "loadingRecords": "Carregando...",
		    "processing":     "Processando...",
		    "zeroRecords":    "Nenhum registro encontrado de acordo com o filtro",
			"paginate": {
			        "first":      "Primeira",
			        "last":       "Última",
			        "next":       "Próxima",
			        "previous":   "Anterior"
			    }				
		}
	});

});

$(document).ready(function() {
	$('#tableVincularSubCategorias').dataTable({
		 responsive: true,
		"pageLength": -1,
		"lengthMenu": [ [-1], ["Todos"]],
		"language" : {
		    "search":         "Filtrar:",
			"emptyTable":     "Nenhum registro encontrado",
		    "info":           "Mostrando _START_ até _END_ de _TOTAL_ registros",
		    "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
		    "infoFiltered":   " ( Filtrado de _MAX_ registros )",
		    "lengthMenu":     "Mostrar _MENU_ registros",
		    "loadingRecords": "Carregando...",
		    "processing":     "Processando...",
		    "zeroRecords":    "Nenhum registro encontrado de acordo com o filtro",
			"paginate": {
			        "first":      "Primeira",
			        "last":       "Última",
			        "next":       "Próxima",
			        "previous":   "Anterior"
			    }				
		}
	});

});


//Gerar PDF da tabela
//http://www.prepbootstrap.com/bootstrap-template/table-export-to-pdf
function exportaPDF(idtable) {
	// parse the HTML table element having an id=tablePaginate
	var dataSource = shield.DataSource.create({
		data: idtable,
		schema: {
			type: "table",
			fields: {
				Código: { type: String },
				Nome: { type: String },
				Status: { type: String }
			}
		}
	});

	// when parsing is done, export the data to PDF
	dataSource.read().then(function(data) {
		var pdf = new shield.exp.PDFDocument({
			author: "HelpDesk",
			fontSize: 10,
			created: new Date()
		});

		pdf.addPage("a4", "portrait");

		pdf.table(
			20,
			30,
			data,
			[
				{ field: "Código", title: "Código" },
				{ field: "Nome", title: "Nome" },
				{ field: "Status", title: "Status" }
			],
			{
				margins: {
					top: 50,
					left: 50
				}
			}
		);

		pdf.saveAs({
			fileName: "helpdesk_subCategoria_PDF"
		});
	});
}


//Gerar Excel da tabela    
function exportaExcel(idtable) {
	// parse the HTML table element having an id=tablePaginate
	var dataSource = shield.DataSource.create({
		data: idtable,
		schema: {
			type: "table",
			fields: {
				Código: { type: String },
				Nome: { type: String },
				Status: { type: String }
			}
		}
	});

	// when parsing is done, export the data to Excel
	dataSource.read().then(function(data) {
		new shield.exp.OOXMLWorkbook({
			author: "HelpDesk",
			worksheets: [
				{
					name: "HelpDesk Table",
					rows: [
						{
							cells: [
								{
									style: {
										bold: true
									},
									type: String,
									value: "Código"
								},
								{
									style: {
										bold: true
									},
									type: String,
									value: "Nome"
								},
								{
									style: {
										bold: true
									},
									type: String,
									value: "Status"
								}								
							]
						}
					].concat($.map(data, function(item) {
						return {
							cells: [
								{ type: String, value: item.Código },
								{ type: String, value: item.Nome },
								{ type: Number, value: item.Status }
							]
						};
					}))
				}
			]
		}).saveAs({
			fileName: "helpdesk_subCategoria_Excel"
		});
	});
}