// calculate random number between 5 and 12
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null, // by default null is a falsy value in js
        };
    },

    computed: {
        monsterBarStyles() {
            return { width: this.monsterHealth + '%' }

        },
        playerBarStyles() {
            return { width: this.playerHealth + '%' }
        },

        mayUseSpecialAttack() {
            //only have access to the special attack every 3 rounds
            return this.currentRound % 3 !== 0
        }
    },

    //logic to check who wins using a watcher to check the two properties playerHealth and monsterHealth
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
            }
        },
        
        monsterHealth(value) {
            if (value <= 0 && this.playerHealthHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player';
            }
        }
    },

    methods: {

        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue; // = this.monsterHealth - attackValue
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },

        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },

        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }

            this.attackPlayer();
        },
    }

});

app.mount('#game');