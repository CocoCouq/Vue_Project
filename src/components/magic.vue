<template>
    <div class="container">
        <section class="row z-depth-1 white section">
            <h2 class="center-align">Magic Number</h2>
            <article class="center-align green-text flow-text">
                Trouvez le nombre entre 0 et 100
            </article>
            <label class="col s8 offset-s2" for="number">
                <!-- On change verify -->
                <input
                        type="number"
                        name="number"
                        id="number"
                        v-model.number="number"
                        @change="verify"
                >
            </label>
            <!-- Display result -->
            <h2 class="col s12 center-align grey darken-3 z-depth-1 white-text">{{magicMessage}}</h2>
            <!-- For new game -->
            <div class="col s12 center-align">
                <input
                        class="btn"
                        type="button"
                        value="Nouveau Nombre"
                        @click="newNumber"
                >
            </div>
        </section>
    </div>
</template>

<script>
    // Number to find
    let magicNumber = parseInt(Math.random() * 100)

    export default {
        name: 'magic',
        data () {
            return {
                number: 0,
                magicMessage: 'Entrez un nombre'
            }
        },
        methods: {
            // Verify number with magic number
            verify: function () {
                this.magicMessage = magicNumber < this.number
                    ? 'Plus petit'
                    : (magicNumber > this.number
                        ? 'Plus grand'
                        : 'BRAVO !!')
            },
            // Change magic number
            newNumber: function () {
                magicNumber = parseInt(Math.random() * 100)
                this.magicMessage = 'Entrez un nombre'
            }
        }
    }
</script>
