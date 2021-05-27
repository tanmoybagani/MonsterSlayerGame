function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data: function() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterHealthStyle() {
            if(this.monsterHealth < 0) {
                return {width: '0%'};
            }
            else {
                return {width: this.monsterHealth + '%'};
            }
        },
        playerHealthStyle() {
            if(this.playerHealth < 0) {
                return {width: '0%'};
            }
            else {
                return {width: this.playerHealth + '%'};
            }
        },
        allowSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        monsterHealth(value) {
            if(value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }
            else if(value <= 0) {
                this.winner = 'player';
            }
        },
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }
            else if(value <= 0) {
                this.winner = 'monster';
            }
        }
    },
    methods: {
        startGame() {
            this.currentRound = 0;
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const randomValue = getRandomValue(12, 5);
            this.monsterHealth = this.monsterHealth - randomValue; 
            this.addLogMessages('player', 'attack', randomValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const randomValue = getRandomValue(15, 8);
            this.playerHealth = this.playerHealth - randomValue;
            this.addLogMessages('monster', 'attack', randomValue); 
        },
        specialAttackMonster() {
            this.currentRound++;
            const randomValue = getRandomValue(25, 10);
            this.monsterHealth = this.monsterHealth - randomValue; 
            this.addLogMessages('player', 'special-attack', randomValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const randomValue = getRandomValue(20, 8);
            if(this.playerHealth + randomValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth = this.playerHealth + randomValue;
            }
            this.addLogMessages('player', 'heal', randomValue);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');