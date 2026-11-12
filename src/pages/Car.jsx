import { Link } from "react-router-dom";
import car from "./../assets/car.png";
import Footer from "./../components/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
 
export default function Car() {
  // สร้าง state สำหรับจัดการกับข้อมูลบน component ---------------------------
  const [price, setPrice] = useState("");
  const [down, setDown] = useState("");
  const [interest, setInterest] = useState("");
  const [months, setMonths] = useState("12");
  const [installment, setInstallment] = useState("0.00");
 
  // ฟังก์ชันคำนวณเงินผ่อนต่อเดือน (ดอกเบี้ยแบบคงที่ flat rate) ------------------
  const handleCalCarClick = (e) => {
    e.preventDefault();
 
    // Validate UI
    if (price === "" || down === "" || interest === "") {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนข้อมูลให้ครบถ้วน",
        confirmButtonText: "ตกลง",
      });
      return;
    }
 
    // แปลงเป็นตัวเลขก่อนคำนวณ
    const p = Number(price);
    const d = Number(down);
    const r = Number(interest);
    const m = Number(months);
 
    if (p <= 0 || d < 0 || d >= 100 || r < 0) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "ราคารถต้องมากกว่า 0, เงินดาวน์ต้องอยู่ระหว่าง 0-99% และดอกเบี้ยต้องไม่ติดลบ",
        confirmButtonText: "ตกลง",
      });
      return;
    }
 
    // 1. ยอดจัดไฟแนนซ์ = ราคารถ - เงินดาวน์
    const financed = p - (p * d) / 100;
    // 2. ดอกเบี้ยทั้งหมด = ยอดจัด x ดอกเบี้ยต่อปี x จำนวนปี
    const totalInterest = financed * (r / 100) * (m / 12);
    // 3. ค่างวดต่อเดือน = (ยอดจัด + ดอกเบี้ยทั้งหมด) / จำนวนเดือน
    const result = (financed + totalInterest) / m;
 
    setInstallment(
      result.toLocaleString("th-TH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };
 
  // ฟังก์ชันรีเซ็ตค่าบนหน้าจอ ------------------------------------------------
  const handleResetClick = (e) => {
    e.preventDefault();
 
    setPrice("");
    setDown("");
    setInterest("");
    setMonths("12");
    setInstallment("0.00");
  };
 
  return (
    <>
      <div className="w-[50%] border border-gray-200 rounded-2xl shadow-xl mt-20 mx-auto flex flex-col items-center p-10">
        {/* แสดงรูปและชื่อหน้าจอ */}
        <p className="font-kanit font-bold text-2xl">CAR Installment Calculator</p>
        <p className="font-kanit font-bold text-gray-500">คำนวณเงินผ่อนรถยนต์-รถเครื่อง</p>
        <img src={car} alt="CAR" className="w-20 mt-5" />
 
        {/* ส่วนของฟอร์ม สำหรับป้อน เลือก คลิก */}
        <form className="w-full mt-10 flex flex-col">
          <label className="font-kanit">ป้อนราคารถ (บาท)</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="เช่น 500000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 p-2 rounded-md placeholder:font-kanit"
          />
          <label className="font-kanit mt-3">ป้อนเงินดาวน์ (%)</label>
          <input
            type="number"
            name="down"
            id="down"
            placeholder="เช่น 20"
            value={down}
            onChange={(e) => setDown(e.target.value)}
            className="border border-gray-300 p-2 rounded-md placeholder:font-kanit"
          />
          <label className="font-kanit mt-3">ป้อนอัตราดอกเบี้ยต่อปี (%)</label>
          <input
            type="number"
            name="interest"
            id="interest"
            placeholder="เช่น 2.5"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="border border-gray-300 p-2 rounded-md placeholder:font-kanit"
          />
          <label className="font-kanit mt-3">เลือกระยะเวลาผ่อน (เดือน)</label>
          <select
            name="months"
            id="months"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="border border-gray-300 p-2 rounded-md font-kanit"
          >
            <option value="12">12 เดือน</option>
            <option value="24">24 เดือน</option>
            <option value="36">36 เดือน</option>
            <option value="48">48 เดือน</option>
            <option value="60">60 เดือน</option>
            <option value="72">72 เดือน</option>
            <option value="84">84 เดือน</option>
          </select>
 
          <button
            onClick={handleCalCarClick}
            className="w-full bg-blue-700 mt-5 p-2 rounded-md text-white font-kanit font-bold cursor-pointer hover:bg-blue-800"
          >
            คำนวณเงินผ่อน
          </button>
          <button
            onClick={handleResetClick}
            className="w-full bg-gray-400 mt-3 p-2 rounded-md text-black font-kanit font-bold cursor-pointer hover:bg-gray-500"
          >
            รีเซ็ต
          </button>
        </form>
 
        {/* ส่วนแสดงผล */}
        <div className="flex justify-center gap-2 mt-5">
          <p className="font-kanit font-bold text-blue-600">
            ค่างวดต่อเดือน :
          </p>
          <p className="font-kanit font-bold text-blue-600">{installment}</p>
          <p className="font-kanit font-bold text-blue-600">บาท</p>
        </div>
 
        {/* ส่วนลิงก์กลับไปหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-400 mt-3 p-2 rounded-md text-black font-kanit font-bold text-center hover:bg-gray-500"
        >
          กลับหน้าหลัก
        </Link>
      </div>
      <Footer />
    </>
  );
}
 