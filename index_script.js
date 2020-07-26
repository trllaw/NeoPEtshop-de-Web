/*	Bacharelado em Ciencias de Computação
	Nome: Leandro Satoshi 			    NUSP: 10893103 
	Nome: Mateus Virginio Silva		    NUSP: 10284156	
	Nome: Vinicius Ricardo Carvalho		NUSP: 10724413
*/

//--------------Vue para a pagina inicial(Home/Index)--------- */
var home = new Vue({
    el: '#app',
    data: {
        Produtos:[],
        user: {
            username: "",
            email: "",
            password: "",
            phone: ""
        },
        tags: ["destaque", "racao", "petisco", "acessorios", "higiene", "farmacia"]
    },
    methods: {
        async getProductsByTag() {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            let res = this.Produtos;
            for(i in this.tags){
                await axios.get('http://localhost:3000/products/tags/'+ this.tags[i])
                    .then(function(response) {
                        console.log(response.data)
                        res.push(response.data);
                        
                    })
                    .catch(function(error) {
                        console.log("deu ruim");
                        console.log(error);
                        console.log(error.response);
                    });
            }
        },

        async createUser() {
            console.log(this.user);
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            return await axios.post('http://localhost:3000/users', this.user)
                .then(function(response) {
                    //console.log(response);
                    //console.log(response.data);
                    alert("success");
                    return response.data.id;

                })
                .catch(function(error) {
                    console.log(error);
                    alert(error.response.data.error);
                    let res = error.response.data.id;
                    return res;
                });
        },

        async verifyUser() {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            console.log("verificando login")
            return await axios.post('http://localhost:3000/users/auth', this.user)
                .then(function(response) {
                    if(response.data.data != null) {
                        alert("success");
                        if(response.data.data.roles[0] == "admin"){
                            window.location.href = "./adm/AdmPage.html"
                        }
                        else{
                            window.location.href = "./user/userPageHome.html"
                        }

                        return response.data.id;
                    }
                    else {
                        alert("usuario ou senha invalidos");
                    }
                })
                .catch(function(error) {
                    console.log("error");
                    //console.log(error.response);
                    alert(error.response.data.error);
                    let res = error.response.data.id;
                    return res;
                });
        }
    }
});


document.getElementById("cadastro").addEventListener('click', home.createUser);
document.addEventListener('load', home.getProductsByTag())
/*Vue para a pagina do Adm 
---------------- Tabelas --------------------------
-- rows =  Possui arrays com os dados relevantes a sessão que está sendo implementada
-- columns = atributos dentro do array(rows)
-- Exemplo => Se vermos a variavel vue a seguir(entregas), uma possivel cedula da tabela rows[columns] poderia
------------- ser a primeira posicao, id= 1. Para chegar nisso usamos o metodo 'get_rows' pra pegar cada array e
------------- e após isso, fizemos a manipulação de array pra pegar certo atributo, como nesse exemplo dado, row[id].

*/

//----------------------------------- PARTE DO ENTREGA -----------------------------------//
var entregas = new Vue({
    el: '.result-container',
    data: {
        search: '',
        currentPage: 1,
        elementsPerPage: 8,
        ascending: false,
        sortColumn: '',
        rows: [
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Mary', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 2, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 3, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 4, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 5, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 6, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 7, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 8, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 9, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 10, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' }
        ]
    },
    methods: {
        "sortTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;
            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })

        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows(search) {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            var row = this.rows.slice(start, end)
            if (search.length < 1) {
                return row;
            } else {
                /* if (row.Cliente.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                     return row;
                 }*/

            }
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});

//-------------------------------------- PARTE DO INVENTARIO ----------------------------------------//
var inventario = new Vue({
    el: '.result',
    data: {
        search: '',
        currentPage: 1,
        elementsPerPage: 8,
        ascending: false,
        sortColumn: '',
        rows: [
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Categoria: "12/12/12", Raça: '03/01/13', Porte: 'Dilvan', Marca: "Av. São Carlos", Preço_Unitário: "R$ 102,12", Quantidade: '12', Descrição: 'Compra do mês de ração canina' }
        ]
    },
    methods: {
        "shorTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;
            //entregas
            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })

        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});

//---------------------------------PARTE DE VENDAS-----------------------------------------------//
var vendas = new Vue({
    el: '.resultc',
    data: {
        search: '',
        currentPage: 1,
        elementsPerPage: 6,
        ascending: false,
        sortColumn: '',
        rows: [
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' },
            { Data: 1, Saldo_inicial: "12/12/12", Arrecadação: '03/01/13', Produtos_Vendidos: 'Dilvan', Produto_Destaque: "Av. São Carlos", Vendas_á_vista: "R$ 102,12", Cliente_Destaque: '12', Vendas_parceladas: "R$ 102,12", Cliente_Destaque: '12' }
        ]
    },
    methods: {
        "shorTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;
            //entregas
            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })

        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});

//-------------------------PARTE DE SERVIÇO--------------------------------------------------//

var service = new Vue({
    el: '#consulta',
    data: {
        search: '',
        currentPage: 1,
        elementsPerPage: 6,
        ascending: false,
        sortColumn: '',
        rows: [
            { id: 1, Servico: 'kk', Raça: 'Produto 1', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' },
            { id: 2, Servico: 'oo', Raça: 'Produto 1', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' },
            { id: 3, Servico: 'll', Raça: 'Produto 1', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' }
        ]
    },
    methods: {
        "shorTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;
            //entregas
            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })

        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});

//------------------------- PARTE DE PRODUTO --------------------------------------------------//

var product = new Vue({
    el: '#consulta_2',
    data: {
        search: '',
        currentPage: 1,
        elementsPerPage: 6,
        ascending: false,
        sortColumn: '',
        rows: [
            { id: 1, Validade: 'kk', Categoria: 'Produto 1', Marca: 'ashdhashdhas', Raça: 'ashdhashdhas', Porte: 'ashdhashdhas', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' },
            { id: 2, Validade: 'll', Categoria: 'Produto 1', Marca: 'ashdhashdhas', Raça: 'ashdhashdhas', Porte: 'ashdhashdhas', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' },
            { id: 3, Validade: '00', Categoria: 'Produto 1', Marca: 'ashdhashdhas', Raça: 'ashdhashdhas', Porte: 'ashdhashdhas', Preço: 'R$ 50,00', descrição: 'ashdhashdhas' }
        ]
    },
    methods: {
        "shorTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }

            var ascending = this.ascending;
            //entregas
            this.rows.sort(function(a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })

        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});


function adicionar(id) {
    if (id == 0) {
        document.getElementById("consulta_2").style.display = "none";
        document.getElementById("remover_2").style.display = "none";
        document.getElementById("atualizar_2").style.display = "none";
        document.getElementById("add_2").style.display = "block";
    } else {
        document.getElementById("consulta").style.display = "none";
        document.getElementById("remover").style.display = "none";
        document.getElementById("atualizar").style.display = "none";
        document.getElementById("add").style.display = "block";
    }
}

function atualizar(id) {
    if (id == 0) {
        document.getElementById("consulta_2").style.display = "none";
        document.getElementById("remover_2").style.display = "none";
        document.getElementById("atualizar_2").style.display = "block";
        document.getElementById("add_2").style.display = "none";
    } else {
        document.getElementById("consulta").style.display = "none";
        document.getElementById("remover").style.display = "none";
        document.getElementById("add").style.display = "none";
        document.getElementById("atualizar").style.display = "block";
    }
}

function remover(id) {
    if (id == 0) {
        document.getElementById("consulta_2").style.display = "none";
        document.getElementById("remover_2").style.display = "block";
        document.getElementById("atualizar_2").style.display = "none";
        document.getElementById("add_2").style.display = "none";
    } else {
        document.getElementById("consulta").style.display = "none";
        document.getElementById("add").style.display = "none";
        document.getElementById("atualizar").style.display = "none";
        document.getElementById("remover").style.display = "block";
    }
}

function consultar(id) {
    if (id == 0) {
        document.getElementById("consulta_2").style.display = "block";
        document.getElementById("remover_2").style.display = "none";
        document.getElementById("atualizar_2").style.display = "none";
        document.getElementById("add_2").style.display = "none";
    } else {
        document.getElementById("add").style.display = "none";
        document.getElementById("remover").style.display = "none";
        document.getElementById("atualizar").style.display = "none";
        document.getElementById("consulta").style.display = "block";
    }
}