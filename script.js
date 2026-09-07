// تم ضبط رقمك بالصيغة الدولية المباشرة بدقة
const MY_WHATSAPP_NUMBER = "201229430939"; 

// التحكم في اختيار المحافظة والبوابة الجغرافية
function handleGovernorateChange() {
    const gov = document.getElementById('governorate').value;
    const alertBox = document.getElementById('alertBox');
    const evaluationArea = document.getElementById('evaluationArea');
    const successCard = document.getElementById('successCard');

    successCard.classList.add('hidden');

    if (gov === 'كفر الشيخ') {
        alertBox.classList.add('hidden');
        evaluationArea.classList.remove('hidden');
        
        if (navigator.vibrate) navigator.vibrate(50);
    } else if (gov !== '') {
        alertBox.classList.remove('hidden');
        evaluationArea.classList.add('hidden');
        
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    } else {
        alertBox.classList.add('hidden');
        evaluationArea.classList.add('hidden');
    }
}

// معالجة الإرسال عبر الواتساب المباشر
document.getElementById('evaluationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحويل للواتساب...';
    submitBtn.disabled = true;

    // 1. حساب الدرجة الإجمالية
    let objectiveScore = 0;
    for (let i = 1; i <= 7; i++) {
        objectiveScore += parseInt(document.getElementById('q' + i).value);
    }
    const totalScore = objectiveScore + 30;

    // 2. تجميع البيانات
    const evaluatorName = document.getElementById('evaluatorName').value;
    const governorate = document.getElementById('governorate').value;
    const personalMessage = document.getElementById('personalMessage').value;

    // 3. صياغة نص الرسالة المنسقة للواتساب
    const whatsappMessage = `*تقييم جديد من منصة التقييم القيادي 2026* 🎓%0A%0A` +
        `👤 *الاسم/الصفة:* ${encodeURIComponent(evaluatorName)}%0A` +
        `📍 *المحافظة:* ${encodeURIComponent(governorate)}%0A` +
        `📊 *الدرجة الكلية:* ${totalScore} / 100%0A%0A` +
        `💬 *الرسالة الشخصية:*%0A${encodeURIComponent(personalMessage)}`;

    // 4. إنشاء رابط الواتساب المباشر
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${MY_WHATSAPP_NUMBER}&text=${whatsappMessage}`;

    // 5. إظهار شاشة النجاح وفتح الواتساب
    setTimeout(() => {
        document.getElementById('evaluationArea').classList.add('hidden');
        document.getElementById('successCard').classList.remove('hidden');
        
        if (navigator.vibrate) navigator.vibrate([50, 100, 150]);

        // فتح محادثة الواتساب في نافذة جديدة
        window.open(whatsappUrl, '_blank');
        
        // إعادة زر الإرسال لوضعه الطبيعي
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> اعتماد الدرجة وإرسال التقييم';
        submitBtn.disabled = false;
    }, 800);
});
