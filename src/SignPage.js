import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

function SignPage() {
  const { fileId } = useParams();
  const [signerName, setSignerName] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    // עדכנתי את הכתובת כך שתפנה לשרת ב-Render עם ה-endpoint הנכון
    setFileUrl(`https://server-qvpv.onrender.com/file/${fileId}`);
  }, [fileId]);

  const handleSign = async () => {
    if (!signerName) {
      alert("אנא הכנס שם חתימה");
      return;
    }

    try {
      // עדכנתי את הכתובת כך שתפנה לשרת ב-Render עם ה-endpoint הנכון
      const res = await fetch(`https://server-qvpv.onrender.com/sign/${fileId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signerName }),
      });

      if (!res.ok) throw new Error("שגיאה בשליחת החתימה");

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("שגיאה בשליחת החתימה, נסה שוב");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>חתום על המסמך</h1>

      {/* קישור להורדת הקובץ */}
      <p>להורדת המסמך לפני החתימה: <a href={fileUrl} download>לחץ כאן להורדה</a></p>

      <input
        type="text"
        placeholder="שם החותם"
        value={signerName}
        onChange={(e) => setSignerName(e.target.value)}
      />
      <button onClick={handleSign} style={{ marginLeft: 10 }}>חתום ושלח</button>
    </div>
  );
}

export default SignPage;