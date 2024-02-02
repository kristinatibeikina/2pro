new Vue({
    el: '#app',
    data: {
        cardTitle: '',
        cardText: [],
        column1: [],
        column2: [],
        column3: [],
        column4: [],
        stop:0,
        errors: [],
        isDisabled:false,
        dateEnd: '',
        dateStart: '',

    },
    mounted() {
        this.loadCards();

    },
    methods: {

        createCard() {
            if(this.column1.length===3){
                this.errors.push("Не более 3 заметок в 1 колонке")
            }
            if (this.cardTitle !== ''  && this.column1.length<3) {
                const newCard = {
                    id: Date.now(),
                    dateStart: new Date().toLocaleString(),
                    title: this.cardTitle,
                    data: this.dateEnd,
                    items: [
                        { id: 1, completed: false },
                    ],
                    completedItems: 0,
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
                column3: this.column3
            };

            localStorage.setItem('cards', JSON.stringify(cards));
        },
        updateCardStatus() {
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
                    if(this.column2.length < 5) {
                        this.column2.push(card);
                        this.column1 = this.column1.filter(c => c.id !== card.id);
                    }
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
        },
        loadCards() {
            const savedCards = JSON.parse(localStorage.getItem('cards'));

            if (savedCards) {
                this.column1 = savedCards.column1 || [];
                this.column2 = savedCards.column2 || [];
                this.column3 = savedCards.column3 || [];
            }
        },
        removeMask(index, type){
            this.column1.splice(index,1)

        }

    },
    watch: {
        'column1': {
            handler() {
                this.updateCardStatus();
            },
            deep: true
        },
        'column2': {
            handler() {
                this.updateCardStatus();
            },
            deep: true
        }
    }

})