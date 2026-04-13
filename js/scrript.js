window.addEventListener('scroll', function () {
    const hv = document.getElementById('hv')
    const o0 = document.getElementById('o0')
    const ww = document.getElementById('ww')
    const ir1 = document.getElementById('ir1')
    const ir2 = document.getElementById('ir2')
    const ir3 = document.getElementById('ir3')
    const ir4 = document.getElementById('ir4')
    const ir5 = document.getElementById('ir5')
    const sr = window.scrollY
    const hh = window.innerHeight * 0.5
    const hh2 = window.innerHeight * 1.5
    const hh3 = window.innerHeight * 2.5
    const hh4 = window.innerHeight * 4


    if (sr > hh4) {
        hv.style.backgroundColor = '#333'
        hv.style.border = '0'
        o0.style.opacity = '1'
        ir1.style.scale = '1'
        ir2.style.scale = '1'
        ir3.style.scale = '1'
        ir4.style.transform = 'translate(0)'
        ir5.style.transform = 'translate(0)'
        ww.style.scale = '1'
    }
    else if (sr > hh3) {
        hv.style.backgroundColor = '#333'
        hv.style.border = '0'
        o0.style.opacity = '1'
        ir1.style.scale = '1'
        ir2.style.scale = '1'
        ir3.style.scale = '1'
        ww.style.scale = '1'
    }
    else if (sr > hh2) {
        hv.style.backgroundColor = '#333'
        hv.style.border = '0'
        o0.style.opacity = '1'
        ir1.style.scale = '1'
        ir2.style.scale = '1'
        ww.style.scale = '1'

    }
    else if (sr > hh) {
        hv.style.backgroundColor = '#333'
        hv.style.border = '0'
        o0.style.opacity = '1'
        ww.style.scale = '1'

    }
    else {
        hv.style.backgroundColor = ''
        hv.style.border = ''
        o0.style.opacity = ''
        ir1.style.scale = ''
        ir2.style.scale = ''
        ir3.style.scale = ''
        ir4.style.transform = ''
        ww.style.scale = ''
        ir5.style.transform = ''
    }
})

function l1() {
    document.getElementById('s1').classList.add('d-none')
    document.getElementById('s2').classList.remove('d-none')
    document.getElementById('s3').classList.add('d-none')
    document.getElementById('s4').classList.remove('d-none')
    document.getElementById('s5').classList.add('d-none')
    document.getElementById('s6').classList.remove('d-none')

}
function l2() {
    document.getElementById('s2').classList.add('d-none')
    document.getElementById('s1').classList.remove('d-none')
    document.getElementById('s4').classList.add('d-none')
    document.getElementById('s3').classList.remove('d-none')
    document.getElementById('s6').classList.add('d-none')
    document.getElementById('s5').classList.remove('d-none')

}

const can = document.getElementById('draw')
const num = document.querySelector('.num')
const w = can.width
const h = can.height
const cxt = can.getContext('2d')

cxt.fillStyle = '#333'
cxt.fillRect(0, 0, w, h)
cxt.globalCompositeOperation = 'destination-out'
cxt.lineWidth = 35
cxt.lineCap = 'round'

let isDrawing = false


can.addEventListener('mousedown' , function(event){
    isDrawing = true
    cxt.beginPath()
    cxt.moveTo(event.offsetX,event.offsetY)
})
can.addEventListener('mousemove' , function(event){
    if(isDrawing){
        cxt.lineTo(event.offsetX,event.offsetY)
        cxt.stroke()
        getFilledPercentage(cxt)
    }
})
can.addEventListener('mouseup' , function(){
    isDrawing = false
})

function getFilledPercentage(cxt){
    const imgData = cxt.getImageData(0,0,w,h)
    const pixels = imgData.data
    let n =0
    for(i = 0; i< pixels.length ; i+=4){

        if(pixels[i+3]<128){

            n +=1
        }
    }
    const percent = ((n/(pixels.length /4)*100)).toFixed(0)
    num.textContent ="完成度" +percent +"%"

    if(percent>75){
        cxt.clearRect(0,0,w,h)
        num.textContent = "請先登入會員我們才能寄送兌換碼給您!"
        document.querySelector('.display').classList.remove('d-none')
    }
}
