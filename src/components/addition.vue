<template>
    <div class="container">
        <section class="row z-depth-1 white section">
            <h2 class="center-align">Additionneur</h2>
            <label class="col s8 offset-s2" for="number1">
                <!-- On change event change the result with add function -->
                <input
                        type="number"
                        name="number1"
                        id="number1"
                        v-model.number="number1"
                        @change="add"
                >
            </label>
            <div class="col s4 offset-s4 center-align">
                <i class="medium material-icons">add</i>
            </div>
            <label class="col s8 offset-s2" for="number2">
                <!-- On change event change the result with add function -->
                <input
                        type="number"
                        name="number2"
                        id="number2"
                        value="0"
                        v-model.number="number2"
                        @change="add"
                >
            </label>
            <div class="col s4 offset-s4 center-align">
                <i class="medium material-icons">drag_handle</i>
            </div>

            <!-- Result Display -->
            <h2 class="col s12 center-align grey darken-3 z-depth-1 white-text">{{result}}</h2>
        </section>
    </div>
</template>

<script>
    // Export result of template
    export default {
        name: 'addition',
        data () {
            return {
                number1: 0,
                number2: 0,
                result: 0
            }
        },
        methods: {
            add: function () {
                this.result = this.number1 + this.number2
            }
        }
    }
</script>
