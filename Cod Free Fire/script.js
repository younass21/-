document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const redeemBtn = document.getElementById('redeemBtn');
    const codeDisplay = document.getElementById('codeDisplay');
    const timerDisplay = document.getElementById('timerDisplay');
    const statusDisplay = document.getElementById('statusDisplay');

    const generateCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 12; i++) { // طول الكود 12 حرفًا
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        // تنسيق الكود بالشكل 8A8A-8A8A-8A8A
        return code.match(/.{1,4}/g).join('-');
    };

    const updateTimer = () => {
        const now = new Date().getTime();
        const lastGeneratedTime = localStorage.getItem('lastGeneratedTime');
        const fiveMinutes = 5 * 60 * 1000; // 5 دقائق بالمللي ثانية

        if (lastGeneratedTime && now - lastGeneratedTime < fiveMinutes) {
            const remainingTime = fiveMinutes - (now - lastGeneratedTime);
            const minutes = Math.floor(remainingTime / (60 * 1000));
            const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
            timerDisplay.textContent = `يرجى الانتظار ${minutes} دقائق و ${seconds} ثانية لإنشاء كود جديد.`;
            generateBtn.disabled = true;
        } else {
            timerDisplay.textContent = '';
            generateBtn.disabled = false;
        }
    };

    const handleGenerateClick = () => {
        const now = new Date().getTime();
        statusDisplay.textContent = 'انتظر لحظة، يتم تجهيز الكود الخاص بك...';
        codeDisplay.textContent = '';
        timerDisplay.textContent = '';
        generateBtn.disabled = true;

        // تأخير عرض الكود الجديد
        setTimeout(() => {
            const newCode = generateCode();
            localStorage.setItem('code', newCode);
            localStorage.setItem('lastGeneratedTime', now);
            codeDisplay.textContent = newCode;
            statusDisplay.textContent = '';
            // بدء العد التنازلي بعد عرض الكود الجديد
            setInterval(updateTimer, 1000);
        }, 5000); // 5 ثوانٍ تأخير
    };

    const handleRedeemClick = () => {
        window.open('https://pro.riccardomalisano.com/about/z2to.html?u=ff-reward/?i=YJHG9', '_blank');
    };

    generateBtn.addEventListener('click', handleGenerateClick);
    redeemBtn.addEventListener('click', handleRedeemClick);

    // لا تعرض الكود الحالي عند تحميل الصفحة لأول مرة
    codeDisplay.textContent = '';
    timerDisplay.textContent = ''; // تأكد من إخفاء المؤقت عند تحميل الصفحة
});
