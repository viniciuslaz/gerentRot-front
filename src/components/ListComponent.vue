<template>
    <div class="justify-content-center">
        <!-- Display roteador list -->
        <h1>Lista de roteadores</h1>
        <div class="row justify-content-end">
            <div class="col-lg-3">
                <input type="text" class="form-control mb-4" placeholder="Pesquisar..." v-model="search"/>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped align-middle mb-0 bg-white" :items="filteredItems">
                        <thead class="bg-light table-dark">
                            <tr>
                                <th>Modelo</th>
                                <th @click="sort('mac')">Mac</th>
                                <th>PPPoE</th>
                                <th>Observações</th>
                                <th>Reincidências</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="roteador in filteredItems" :key="roteador._id">
                                <td style="width: 10%">
                                    <div class="d-flex align-items-center">
                                        <img :src="pegarModelo(roteador.modelo)" alt="" style="width: 45px; height: 45px" />
                                    </div>
                                </td>
                                <td style="width: 15%">
                                    {{ roteador.mac }}
                                </td>
                                <td style="width: 15%">
                                    {{ roteador.pppoe }}
                                </td>
                                <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                                    {{ roteador.observacao }}
                                </td>
                                <td style="width: 15%;">
                                    <span :class=pegarClass(roteador.reincidencia) class="badge rounded-pill text-white">{{roteador.reincidencia}} - Reincidencia(s)</span>
                                </td>
                                <td style="width: 10%;">
                                    {{ roteador.date }}
                                </td>
                                <td style="width: 15%;">
                                    <router-link :to="{ name: 'edit', params: { id: roteador._id } }"
                                        class="btn btn-success me-2">
                                        Editar
                                    </router-link>
                                    <button @click.prevent="deleteRoteador(roteador._id)" class="btn btn-danger">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
var huawei = require("../assets/huawei.png");
var parks = require("../assets/parks.png");
var tplink = require("../assets/tplink-g5.png");
var xpon = require("../assets/xpon.png");
var datacom = require("../assets/datacom.png");
var naoencontrado = require("../assets/nenhum.png");
var imagem;
var classe;

export default {
    data() {
        return {
            roteadores: [],
            currentSort:'name',
            currentSortDir:'asc',
            search: ''
        }
    },
    setup() {
        document.title = "Controle de roteadores";
    },
    created() {
        let apiURL = process.env.VUE_APP_ROOT_API;
        axios.get(apiURL).then(res => {
            this.roteadores = res.data
        }).catch(error => {
            console.log(error)
        });

    },
    methods: {
        deleteRoteador(id) {
            let apiURL = process.env.VUE_APP_ROOT_API+`delete-roteador/${id}`;
            let indexOfArrayItem = this.roteadores.findIndex(i => i._id === id);

            if (window.confirm("Deseja remover este roteador?")) {
                axios.delete(apiURL).then(() => {
                    this.roteadores.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        sort:function(s) {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
        },
        pegarModelo(modelo){
            switch(modelo){
                case 'tplink':
                    imagem = tplink;
                    return imagem;
                case 'huawei':
                    imagem = huawei;
                    return imagem;
                case 'parks':
                    imagem = parks;
                    return imagem;
                case 'xpon':
                    imagem = xpon;
                    return imagem;
                case 'datacom':
                    imagem = datacom;
                    return imagem;
                default:
                    imagem = naoencontrado;
                    return imagem;
            }
        },
        pegarClass(quantidade){
            switch(quantidade){
                case '1':
                    classe = "bg-success";
                    return classe;
                case '2':
                    classe = "bg-warning";
                    return classe;
                case '3':
                    classe = "bg-danger";
                    return classe;
            }
        }
    },
    computed: {
        orderedUsers: function () {
            return _.orderBy(this.roteadores, this.colunaSort, this.colunaOrder)
        },
        filteredItems() {
            let roteadores = [];
            roteadores = this.roteadores.filter((router) => {
                return (
                    router.mac.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                );
            });
            return roteadores;
        },
    }
}
</script>