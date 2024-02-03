new Vue({
    el: '#app',
    data: {
        cardTitle: '',
        cardText: '',
        column1: [],
        column2: [],
        column3: [],
        column4: [],
        stop:0,
        errors: [],
        isDisabled:false,
        dateEnd: '',
        dateStart: '',
        editedCardContent: '',
        editing: false,
        complaint : false,
        c : false,
    },
    mounted() {
        this.loadCards();

    },
    methods: {

        createCard() {
            if (this.cardTitle !== '') {
                const newCard = {
                    id: Date.now(),
                    dateStart: new Date().toLocaleString(),
                    title: this.cardTitle,
                    data: this.dateEnd,
                    completed: false ,
                    redact: '',
                    completedItems: 0,
                    text: this.cardText,
                    editing: false,

                };
                this.column1.push(newCard);
                this.cardTitle = '';
                this.cardText = '';
                this.dateEnd = '';
                this.saveCards();
            }

        },
        saveCards() {
            const cards = {
                column1: this.column1,
                column2: this.column2,
                column3: this.column3,
                editing : false,
                cardContent : this.editedCardContent
            };


        },
        columnTu(card){
            this.column1.splice(this.column1.indexOf(card),1)
            this.column2.push(card);
        },
        columnThree(card){
            this.column2.splice(this.column2.indexOf(card),1)
            this.column3.push(card);
        },
        columnFour(card){
            this.column3.splice(this.column3.indexOf(card),1)
            this.column4.push(card);
        },
        back(card){
                card.completed = true


            if (card.redact!==''){
                this.column3.splice(this.column3.indexOf(card),1)
                this.column2.push(card);
            }


        },
        redactCard(text, card){
            this.c=true
            card.completed = false
            this.redact=text
            this.saveCards();
        },
        removeMask(index, type){
            this.column1.splice(index,1)

        },
        editCard(card) {
            card.editing = true;

        },
        redactCard(card,text){
            card.editing = false
            card.text=text
            this.saveCards()
        }

    },

})