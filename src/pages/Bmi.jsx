import { Link } from "react-router-dom";
import bmi from "./../assets/bmi.png"
import Footer from "./../components/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
 
export default function Bmi() {
  // สร้าง state ด้วย useState --------------------------------
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiValue, setBmiValue] = useState("0.00");
 
  // ฟังก์ชันคำนวณ BMI  ---------------------------------------
  const handleCalBMIClick = (e) => {
    e.preventDefault();
 
    // Validate UI
    if (weight === "" || height === "") {
      // alert('กรุณาป้อนข้อมูลให้ครบถ้วน') // ไม่เท่ห์
      //แสดง Swal เตือนให้ป้อนให้ครบ
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนข้อมูลให้ครบถ้วนนะจ๊ะ",
        confirmButtonText: "ตกลง",
      });
      return; // อย่าลืม return
    }
 
    //พร้อมคำนวณ และแสดงผล แต่ก่อนคำนวณอย่าลืมแปลงเป็นตัวเลขก่อน
    const w = Number(weight)
    const h = Number(height)
    const bmiResult = w / ((h / 100) ** 2)
    //คำนวณได้ผลลัพธ์แล้วก็ไปกำหนดให้กับ state -> bmiValue
    setBmiValue(  bmiResult.toFixed(2)  )
  };
 
  // ฟังก์ชันรีเซ็ตค่าบนหน้าจอ  ------------------------------------
  const handleResetClick = (e) => {
    e.preventDefault();
 
    //เคลียหน้าจอ คือ ทุกอย่างกับเป็นเหมือนเดิม
    setWeight("");
    setHeight("");
    setBmiValue("0.00");
  };
 
  return (
    <>
      <div
        className="w-[70%] border border-gray-200 rounded-2xl
                      shadow-xl mt-20 mx-auto flex flex-col
                      items-center p-10"
      >
        {/* แสดงรูปและชื่อหน้าจอ */}
        <p className="font-kanit font-bold text-2xl">BMI Calculator</p>
        <p className="font-kanit font-bold text-gray-500">คำนวณ BMI</p>
        <img src={bmi} alt="BMI" className="w-20 mt-5" />
 
        {/* ส่วนของฟอร์ม สำหรับป้อน เลือก คลิก */}
        <form className="w-full mt-10 flex flex-col">
          <label className="font-kanit">ป้อนน้ำหนัก (กิโลกร้ม)</label>
          <input
            type="number"
            name=""
            id=""
            placeholder="เช่น 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 p-2 rounded-md
                            placeholder:font-kanit"
          />
 
          <label className="font-kanit mt-3">ป้อนน้ำสูง (เซนติเมตร)</label>
          <input
            type="number"
            name=""
            id=""
            placeholder="เช่น 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 p-2 rounded-md
                            placeholder:font-kanit"
          />
 
          <button
            onClick={handleCalBMIClick}
            className="w-full bg-blue-600 mt-5 p-2 rounded-md
                            text-white font-kanit font-bold cursor-pointer
                            hover:bg-blue-800"
          >
            คำนวณ BMI
          </button>
          <button
            onClick={handleResetClick}
            className="w-full bg-gray-400 mt-3 p-2 rounded-md
                            text-black font-kanit font-bold cursor-pointer
                            hover:bg-gray-500"
          >
            รีเซ็ต
          </button>
        </form>
 
        {/* ส่วนแสดงผล */}
        <div className="flex justify-center gap-3 mt-5">
          <p className="font-kanit font-bold">ค่า BMI ที่คำนวณได้ :</p>
          <p className="font-kanit font-bold text-blue-600">{bmiValue}</p>
        </div>
 
        {/* ส่วนลิงค์กลับไปหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-400 mt-3 p-2 rounded-md
                              text-black font-kanit font-bold text-center
                              hover:bg-gray-500"
        >
          กลับหน้าหลัก
        </Link>
      </div>
 
      {/* Footer */}
      <Footer />
    </>
  );
}