<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- edit here -->
            <h1>Editar roteador</h1>
            <form @submit.prevent="handleUpdateForm">
                <div class="form-group">
                    <label for="name">Mac</label>
                    <input type="text" class="form-control" v-model="roteador.mac" required>
                </div>
                <div class="form-group">
                    <label for="pppoe">PPPoE</label>
                    <input type="text" class="form-control" v-model="roteador.pppoe" required>
                </div>
                <div class="form-group">
                    <label for="date">Data</label>
                    <input type="date" class="form-control" v-model="roteador.date" required>
                </div>
                <div class="form-group">
                    <label class="form-label mt-2">Reincidência</label>
                    <select class="form-select" v-model="roteador.reincidencia">
                        <option value="1">Primeira</option>
                        <option value="2">Segunda</option>
                        <option value="3">Terceira</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label mt-2">Observações:</label>
                    <textarea class="form-control" v-model="roteador.observacao" rows="6"></textarea>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary btn-block w-100" type="submit">Editar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            roteador: {}
        }
    },
    setup() {
        document.title = "Controle de roteadores";
    },
    created() {
        let apiURL = process.env.VUE_APP_ROOT_API+`edit-roteador/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.roteador = res.data
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = process.env.VUE_APP_ROOT_API+`update-roteador/${this.$route.params.id}`;

            axios.put(apiURL, this.roteador).then(() => {
                this.$router.push('/')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>