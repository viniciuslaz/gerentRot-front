<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
            <h1>Cadastrar roteador</h1>
            <form @submit.prevent="handleSubmitForm(roteador.mac)">
                <div class="form-group">
                    <label>Mac</label>
                    <input type="text" class="form-control" v-model="roteador.mac" required minlength="12" v-maska="'XX:XX:XX:XX:XX:XX'">
                </div>
                <div class="form-group">
                    <label class="form-label mt-2">PPPoE</label>
                    <input type="text" class="form-control" v-model="roteador.pppoe" required minlength="8">
                </div>
                <div class="form-group">
                    <label class="form-label mt-2">Data</label>
                    <input type="date" class="form-control" v-model="roteador.date" required>
                </div>
                <div class="form-group">
                    <label class="form-label mt-2">Observações:</label>
                    <textarea class="form-control" v-model="roteador.observacao" rows="3"></textarea>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            roteador: {
                mac: '',
                pppoe: '',
                date: '',
                modelo: '',
                observacao: '',
                reincidencia: ''
            }
        }
    },
    setup() {
        document.title = "Controle de roteadores";
    },
    methods: {
        handleSubmitForm(mac) {
            let apiURL = process.env.VUE_APP_ROOT_API;

            axios.get(apiURL+`get-roteador/${mac}`).then(res => {
                if(res.data == null){
                    axios.post(apiURL+'create-roteador', this.roteador).then(() => {
                        this.$router.push('/');
                        this.roteador = {
                            mac: '',
                            pppoe: '',
                            date: '',
                            modelo: '',
                            observacao: '',
                            reincidencia: ''
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }else{
                    alert("O roteador já está cadastrado! O número de reincidências foi aumentado!")
                    axios.put(apiURL+'save-roteador', res).then(() => {
                        this.$router.push('/');
                        this.roteador = {
                            mac: '',
                            pppoe: '',
                            date: '',
                            modelo: '',
                            observacao: '',
                            reincidencia: ''
                        }
                })
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>