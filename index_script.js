/*	Bacharelado em Ciencias de Computação
	Nome: Leandro Satoshi 			    NUSP: 10893103 
	Nome: Mateus Virginio Silva		    NUSP: 10284156	
	Nome: Vinicius Ricardo Carvalho		NUSP: 10724413
*/

/*Vue para a pagina inicial(Home/Index) */
var home = new Vue({
    el: '#Loja',
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
    created: {
        function(){
        this.getProductsByTag();
        }
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
                    console.log(error.response);
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

/*Vue para a pagina do Adm */

//parte do entregas
var entregas = new Vue({
    el: '.result-container',
    data: {
        currentPage: 1,
        elementsPerPage: 8,
        ascending: false,
        sortColumn: '',
        rows: [
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' },
            { id: 1, Compra: "12/12/12", Entrega: '03/01/13', Cliente: 'Dilvan', Endereço: "Av. São Carlos", Preço: "R$ 102,12", Produtos: '12', Descrição: 'Compra do mês de ração canina' }
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