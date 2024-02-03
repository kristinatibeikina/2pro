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
            this.complaint = true
            if (card.redact!==''){
                this.column3.splice(this.column3.indexOf(card),1)
                this.column2.push(card);
            }


        },
        redactCard(text){
            this.c=true
            this.complaint = false
            this.redact=text
            this.saveCards();
        },

       /* updateCardStatus() {
            this.column1.forEach(card => {
                const completedItems = card.items.filter(item => item.completed).length;
                const completionPercentage = (completedItems / card.items.length) * 100;

                if(this.column2.length>4 && completionPercentage >= 50) {
                    this.isDisabled = !this.isDisabled
                }
                else{
                    this.isDisabled = false
                }

                if (completionPercentage >= 50) {
                    this.column2.push(card);
                    this.column1 = this.column1.filter(c => c.id !== card.id);

                }

            });

            this.column2.forEach(card => {
                const completedItems = card.items.filter(item => item.completed).length;
                const completionPercentage = (completedItems / card.items.length) * 100;

                if (completionPercentage < 50) {
                    this.column1.push(card);
                    this.column2 = this.column2.filter(c => c.id !== card.id);

                }
                if (completionPercentage === 100) {
                    card.completedItems = completedItems;
                    this.column3.push(card);
                    this.column2 = this.column2.filter(c => c.id !== card.id);
                }
            });

            this.saveCards();
        },*/
        /*loadCards() {
            const savedCards = JSON.parse(localStorage.getItem('cards'));

            if (savedCards) {
                this.column1 = savedCards.column1 || [];
                this.column2 = savedCards.column2 || [];
                this.column3 = savedCards.column3 || [];
            }
        },*/
        removeMask(index, type){
            this.column1.splice(index,1)

        },
        editCard() {
            this.editing = true;

        },

    },

})