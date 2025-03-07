// สำหรับเข้าถึงตัวอุปกรณ์เพื่อที่จะรับเสียงเข้ามาจากไมโครโฟน
// ตรวจสอบว่ารองรับแบบใด สองแบบด้านล่าง
const speechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new speechRecognize();

// ตัวแปรเซฟข้อความในการนำข้อความมาต่อแล้วแสดงผล
let textEl = ""
// เข้าถึง element ปุ่ม
const button = document.querySelector(".control")

// ฟังชันก์
function setUpVoice(){
    //console.log(recognize)
    //recognize รองรับหลายภาษา ทำการกำหนดภาษา
    recognize.lang = "th-TH"
    // ใส่ event เมื่อคลิ๊กแล้วให้เรียกฟังชันก์
    button.onclick = checkRecord
    // ใส่ event ในการรับเสียง เมื่อมีเสียงมาจะนำไปประมวลผล
    recognize.addEventListener("result",setVoicetoText)
    // ใส่ event ถ้าหากว่าพูดจบประโยค ใช้ event นี้ 
    recognize.addEventListener("end",continueRecord)
}

//ฟังชันเช็คว่าปุ่มอยู่ไหนสถานะไหน
function checkRecord(event){
    // ตัวแปรเช็คว่าปุ่มมี class record ไหม
    const isRecord = button.classList.contains("record")
    // ถ้ามีแล้วกดปุ่ม ให้เปลี่ยนเพิ่ม pause และลบ record ถ้าไม่มีแล้วกดปุ่มให้เปลี่ยนเพิ่ม record และลบ pause
    if (isRecord){
        // เมื่อมีการกดเพื่อบันทีกเสียง ให้เริ่มบันทึกเสียง
        recognize.start()
        button.classList.remove("record")
        button.classList.add("pause")
        button.textContent = "กดเพื่อหยุดเพื่อบันทึกเสียง"
    }else{
        // เมื่อมีการกดเพื่อหยุดบันทึกเสียง ให้หยุดบันทึกเสียงและนำไปประมวลผล
        recognize.stop()
        button.classList.add("record")
        button.classList.remove("pause")
        button.textContent = "กดเพื่อบันทึกเสียง"
    }
}

//ฟังชันก์ในการนำค่าที่ได้จากการพูดมา
function setVoicetoText(event){
    //console.log(event)
    const text = event.results["0"]["0"].transcript
    textEl = textEl +" "+ text
    //console.log(textEl)
    document.querySelector(".message").innerText = textEl
    
}
function continueRecord(){
    // ตัวแปรเช็คว่า ตอนนี้กด record อยู่ไหม ก็เช็คว่ามี class pause ไหม
    const isPause = button.classList.contains("pause")
    // ถ้ามีแสดงว่าพูดจบประโยคอยากพูดประโยคใหม่ก็ทำการสั่ง recognize.start()
    if (isPause){
        recognize.start()
    }
}

// เรียกฟังชันก์แสดงผลในตอนแรก
setUpVoice()



