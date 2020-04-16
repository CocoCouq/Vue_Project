<template>
    <div class="container">
        <section class="row z-depth-1 white section">
            <h2 class="center-align">Calculator</h2>
            <article class="center-align green-text flow-text">
                Entrez une opération
            </article>
            <div id="app" class="green lighten-2 container">
                <article class="row valign-wrapper">
                <span id="operatorStyle">
                    {{operator}}
                </span>
                    <h2 class="col s6 offset-s3 z-depth-2 white right-align bigText">
                        {{displayResult}}
                    </h2>
                </article>
                <article class="row section">

                    <p
                            class="btnCalcul btn-large col s4"
                            v-for="number in numbers"
                            v-bind:key="number"
                            @click="addNum(number)"
                    >
                        {{number}}
                    </p>
                    <p
                            class="btnCalcul btn-large blue col s2"
                            v-for="op in ops"
                            v-bind:key="op.id"
                            @click="calc(op.opp)"
                    >
                        {{op.opp}}
                    </p>

                    <p
                            class="btnCalcul btn-large red col s2"
                            @click="clear"
                    >
                        Clear
                    </p>
                </article>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'calculator',
        data () {
            return {
                displayResult: 0,
                result: 0,
                ops: [
                    {id: 10, opp: '-'},
                    {id: 11, opp: '+'},
                    {id: 12, opp: '='}
                ],
                numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                operator: ''
            }
        },
        methods: {
            addNum: function (number) {
                this.displayResult = number
                switch (this.operator) {
                    case '+':
                        this.result += number
                        break
                    case '-':
                        this.result -= number
                        break
                    case '=':
                        this.displayResult = this.result
                        break
                    default:
                        this.result = number
                        break
                }
            },
            calc: function (opp) {
                this.operator = opp
                this.displayResult = opp === '=' ? this.result : this.displayResult
            },
            clear: function () {
                this.result = 0
                this.displayResult = 0
                this.operator = ''
            }
        }
    }
</script>

<style>
    #operatorStyle{
        font-size: 40px;
    }
</style>
