Vue.component('board',{
    template:`<div>
<div class="columns">
        <div class="column" id="column1">
            <h2>Запланированные задачи</h2>
            <form @submit.prevent="createCard">
                <input type="text" v-model="cardTitle" placeholder="Заголовок" required class="input"><br>
                <input type="text" v-model="cardText" placeholder="Задача" required  class="input"><br>
                <input type="date" v-model="dateEnd"  required class="input"><br><br>
                <button type="submit" class="btn">Добавить</button>

            </form>
            <div v-for="card in column1" :key="card.id" class="card">
                <h3>{{ card.title }}</h3>

                <div class="time">Создано : {{ card.dateStart }}</div>
                <div>Закончить к {{card.data}}</div><br>
                <div v-if="card.redactData">Дата редактирования: {{card.redactData}}</div>

                    <div v-if="card.editing">
                        <p>Изменить дату дедлайна:</p>
                        <input type="date" v-model="dateEnd"  required class="input"><br><br>
                        <p>Изменить описание задачи: </p>
                        <textarea v-model="editedCardContent"></textarea><br>
                        <button v-on:click="redactCard(card,editedCardContent, dateEnd)">Сохранить</button>
                    </div>

                <div>Задача: {{card.text}}</div>
                <button v-on:click="editCard(card)" class="btn">Редактировать</button>
                <button type="submit" class="btn" v-on:click="columnTu(card)">Переместить</button>
                <button v-on:click="removeMask(index,'need')" class="btn">Удалить</button>
            </div>
        </div>
        <div class="column" id="column2">
            <h2>Задачи в работе</h2>
            <div v-for="card in column2" :key="card.id" class="card">
                <h3>{{ card.title }}</h3>

                <div class="time">Создано : {{ card.dateStart }}</div>
                <div>Закончить к {{card.data}}</div><br>
                <div v-if="card.redactData">Дата редактирования: {{card.redactData}}</div>

                <div v-if="card.editing">
                    <p>Изменить дату дедлайна:</p>
                    <input type="date" v-model="dateEnd"  required class="input"><br><br>
                    <p>Изменить описание задачи: </p>
                    <textarea v-model="editedCardContent"></textarea><br>
                    <button v-on:click="redactCard(card,editedCardContent, dateEnd)">Сохранить</button>
                </div>

                <div>Задача: {{card.text}}</div>
                <button v-on:click="editCard(card)" class="btn">Редактировать</button>
                <button type="submit" class="btn" v-on:click="columnThree(card)">Переместить</button>



                <div v-if="c">
                    <div>Причина возврата: {{card.redact}}</div>
                </div>
            </div>
        </div>
        <div class="column" id="column3">
            <h2>Тестирование</h2>
            <div v-for="card in column3" :key="card.id" class="card">
                <h3>{{ card.title }}</h3>

                <div class="time">Создано : {{ card.dateStart }}</div>
                <div>Закончить к {{card.data}}</div><br>
                <div v-if="card.redactData">Дата редактирования: {{card.redactData}}</div>

                <div v-if="card.editing">
                    <p>Изменить дату дедлайна:</p>
                    <input type="date" v-model="dateEnd"  required class="input"><br><br>
                    <p>Изменить описание задачи: </p>
                    <textarea v-model="editedCardContent"></textarea><br>
                    <button v-on:click="redactCard(card,editedCardContent, dateEnd)">Сохранить</button>
                </div>

                <div>Задача: {{card.text}}</div>
                <button v-on:click="editCard(card)" class="btn">Редактировать</button>
                <button type="submit" class="btn" v-on:click="columnFour(card)">Переместить</button>
                <button type="submit" class="btn" v-on:click="back(card)">Вернуть</button>
                <div v-if="card.editing">
                    <textarea v-model="editedCardContent"></textarea><br>
                    <button v-on:click="redactCard(card,editedCardContent)">Сохранить</button>
                </div>

                <div v-if="appearance">
                    <p>Дата сдачи задачи: </p>
                    <input type="date" v-model="dateEndCard"  required class="input"><br><br>
                    <button type="submit" class="btn" v-on:click="methodEndCard(dateEndCard, card)" >Сохранить</button>
                </div>


            </div>
        </div>
        <div class="column" id="column4">
            <h2>Выполненные задачи</h2>
            <div v-for="(card, index) in column4" :key="card.id" class="card">
                <h3>{{ card.title }}</h3>
                <div class="time">Создано : {{ card.dateStart }}</div>
                <div>Закончена: {{card.end}}</div>
                <div>Закончить к {{card.data}}</div><br>
                <div>Задача: {{card.text}}</div><br>

                <div v-if="card.isOverdue">Карточка просрочена</div>
                <div v-else-if="card.isOnTime">Карточка выполнена в срок</div>
            </div>
        </div>
    </div>
</div>
</div>`,
    data(){
        return{
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
            appearance: false, // флаг просрочки
            dateEndCard:'',
            end: '',
            isOverdue: '',
            isOnTime: ''

        }
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
                    end:'',
                    isOverdue: false,
                    isOnTime: false

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
            if(card.end!=0){
                this.column3.splice(this.column3.indexOf(card),1)
                this.column4.push(card);
            }

            this.appearance=true

        },
        methodEndCard(date,card){
            card.end=date
            if(card.data<card.end){
                card.isOverdue= true
            }else {
                card.isOnTime = true
            }
            this.appearance=false
            this.saveCards();
        },
        back(card){
            card.completed = true


            if (card.redact!==''){
                this.column3.splice(this.column3.indexOf(card),1)
                this.column2.push(card);
            }


        },

        removeMask(index, type){
            this.column1.splice(index,1)
        },
        editCard(card) {
            card.editing = true;

        },
        redactCard(card,text, date){
            card.editing = false
            card.text=text
            card.data=date
            card.redactData =new Date().toLocaleString()
            this.saveCards()
        }

    },



});

var app = new Vue({
    el: '#app',
})