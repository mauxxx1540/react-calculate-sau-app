import bmrImg from "../assets/bmr.png";
import { useState } from "react";
import Swal from "sweetalert2";
 
export default function Bmr() {
  //สร้าง state สำหรับจัดการกับข้อมูลบน component ---------------------------
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [bmrValue, setBmrValue] = useState(0);
 
  // ฟังก์ชัน คำนวณ BMR --------------------------------------------------
  const handleCalBMRClick = (e) => {
    e.preventDefault();
 
    //Validate UI
    if ( weight.toString() === "" ||height.toString() === "" ||age.toString() === "") {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนข้อมูลให้ครบถ้วนนะจ๊ะ",
        confirmButtonText: "ตกลง",
      });
      return;
    }
 
    //พร้อมคำนวณ และแสดงผล
    let bmrResult;
    if(gender  === "male"){
      bmrResult = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
    }else{
      bmrResult = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
    //กำหนดค่าให้กับ state-> bmrValue
    setBmrValue( bmrResult );
  };
 
  // ฟังก์ชันก์ เคลียหน้า ----------------------------------------------------
  const handleResetClick = (e) => {
    e.preventDefault();
 
    setWeight(0);
    setHeight(0);
    setAge(0);
    setGender("male");
    setBmrValue(0);
  };
 
  return (
    <div className="font-kanit min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg flex flex-col items-center">
        {/* หัวข้อ */}
        <h1 className="text-2xl font-bold text-gray-800">BMR Calculator</h1>
        <p className="text-gray-500 mb-6">คำนวณ BMR</p>
 
        {/* แสดงรูปภาพ bmr.png */}
        <div className="mb-6 flex justify-center">
          <img
            src={bmrImg}
            alt="BMR Icon"
            className="w-24 h-24 object-contain rounded-2xl shadow-md"
          />
        </div>
 
        {/* ฟอร์มกรอกข้อมูล */}
        <div className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ป้อนน้ำหนัก (กิโลกรัม)
            </label>
            <input
              type="number"
              placeholder="น้ำหนัก"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
 
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ป้อนส่วนสูง (เซนติเมตร)
            </label>
            <input
              type="number"
              placeholder="ส่วนสูง"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
 
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ป้อนอายุ (ปี)
            </label>
            <input
              type="number"
              placeholder="อายุ"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
 
          <div>
            <label className="block text-sm text-gray-600 mb-1">เพศ:</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-gray-700">ชาย</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-4 h-4 text-indigo-600"
                />
                <span className="text-gray-700">หญิง</span>
              </label>
            </div>
          </div>
 
          {/* ปุ่มคำนวณและรีเซ็ต */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleCalBMRClick}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg font-medium transition cursor-pointer shadow-md"
            >
              คำนวณ BMR
            </button>
            <button
              onClick={handleResetClick}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-medium transition cursor-pointer shadow-md"
            >
              รีเซ็ต
            </button>
          </div>
        </div>
 
        {/* ผลลัพธ์ */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ค่า BMR ที่คำนวณได้:
            <span className="text-indigo-600 font-bold">
              {bmrValue.toFixed(2)}
            </span>
          </p>
        </div>
 
        {/* ปุ่มกลับหน้าหลัก */}
        <div className="w-full mt-6">
          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg font-medium transition cursor-pointer"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}