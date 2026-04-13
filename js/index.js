const { ref, createApp, computed } = Vue;


const app = createApp({
    setup() {
        const itemList = ref([
            {
                id: '1',
                itemName: '幸福健康體操班',
                content: '社區運動中心推動了健康體操班，提升體能與平衡感，增強體力以及抵抗力，讓身心更為堅強。',
                imgUrl: 'img/111.jpg',
                price: 350,
                count: 0,
            },
            {
                id: '2',
                itemName: '園藝趣味冬令營',
                content: '園藝趣味工作坊，學習花草栽培與園藝技巧，平時在住處也可以運用課程所學，讓生活品質直線提升。',
                imgUrl: 'img/222.jpg',
                price: 150,
                count: 0,
            },
            {
                id: '3',
                itemName: '美感攝影班',
                content: '智慧攝影基礎班，來自文化中心攝影室，捕捉日常與旅行之美，記錄生活不再是捕風捉影，而是實實在在的存在過。',
                imgUrl: 'img/333.jpg',
                price: 200,
                count: 0,
            },
            {
                id: '4',
                itemName: '夏季泳池健身課',
                content: '夏季泳池健身課，舉辦於社區游泳館，帶領學員們學習水中自救，游泳技巧等安全的水中運動。',
                imgUrl: 'img/444.jpg',
                price: 100,
                count: 0,
            },
            {
                id: '5',
                itemName: '創藝插畫班',
                content: '創意插畫與水彩課，藝術教室，享受色彩與創作的樂趣，也可以藉此來紓緩生活壓力，調整心情。',
                imgUrl: 'img/555.jpg',
                price: 200,
                count: 0,
            },
            {
                id: '6',
                itemName: '歡樂聖誕交流會',
                content: '歡樂聖誕聚會，社區文化中心，同時也會舉辦交換禮物等活動來和大家交流分享並迎接佳節氛圍。',
                imgUrl: 'img/666.jpg',
                price: 100,
                count: 0,
            },
            
        ]);
        const cart = ref([])
        const selectedItem = ref(null)
        const plus = (item) => {
            item.count++
        }
        const sub = (item) => {
            if (item.count > 0) {
                item.count--
            }
        }
        const showItemModal = (item) => {
            selectedItem.value = item
            const modalEl = document.getElementById('content')
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl)
                modal.show()
            }
        }
        const add = (item) => {
            if (item.count <= 0) {
                alert('請選擇商品數量')
                return
            }
            const itemx = cart.value.find(cartItem => cartItem.id === item.id)
            if(itemx){
                itemx.count  = item.count
            }
            else{
                cart.value.push({...item})
            }
            item.count =0
            const modalEl = document.getElementById('add')
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl)
                modal.show()
            }
        }
        const listTotal = computed(()=>{
            return itemList.value.reduce((total ,item)=>{
                return total + (item.count * item.price)
            },0)
        })
        const cartTotal = computed(()=>{
            return cart.value.reduce((total ,item)=>{
                return total + (item.count * item.price)
            },0)
        })
        const remove = (item) =>{
            const index = cart.value.findIndex(cartItem => cartItem.id === item.id)
            if(index > -1){
                cart.value.splice(index, 1)
            }
        }
        const reset = () =>{
            cart.value= []
        }
        const submit =()=>{
            if(cart.value <=0){
                alert('您需要添加商品至購物車')
                return
            }
            alert("感謝您的購買，已寄送訂單資訊至您的信箱，合計金額："+cartTotal.value + "元")
            cart.value = []
            const modalEl = document.getElementById('success')
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl)
                modal.hide()
            }
        }
        const nickname = ref('')
        const message = ref('')
        const messages = ref([])
        const rmsg = computed(()=>{
            return [...messages.value].reverse()
        })
        const sb  = ()=>{
            if(!nickname.value || !message.value){
                alert("您需要輸入您的暱稱以及留言")
                return
            }
            messages.value.push({
                nickname:nickname.value,
                message:message.value
            })
            nickname.value =''
            message.value =''
            const modalEl = document.getElementById('sent')
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl)
                modal.show()
            }
            const st = document.querySelector('.msga')
            if(st){
                st.scrollTo({
                    top:0,
                    behavior:'smooth'
                })
            }
        }
        return {
            itemList,
            cart,
            selectedItem,
            showItemModal,
            plus,
            sub,
            add,
            listTotal,
            cartTotal,
            remove,
            reset,
            submit,
            nickname,
            message,
            messages,
            rmsg,
            sb
        }
    }
})
app.mount('#app')