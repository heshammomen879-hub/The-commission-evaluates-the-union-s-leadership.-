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

// معالجة الإرسال البرمجي مع تمرير Public Key بشكل صريح
document.getElementById('evaluationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري إرسال التقييم لبريدك الإلكتروني...';
    submitBtn.disabled = true;

    // حساب الدرجة الإجمالية
    let objectiveScore = 0;
    for (let i = 1; i <= 7; i++) {
        objectiveScore += parseInt(document.getElementById('q' + i).value);
    }
    const totalScore = objectiveScore + 30;

    // البيانات الموجهة للقالب
    const templateParams = {
        user_name: document.getElementById('evaluatorName').value,
        governorate: document.getElementById('governorate').value,
        total_score: totalScore + ' / 100',
        essay_feedback: document.getElementById('personalMessage').value
    };

    // الإرسال مع المتابعة الدقيقة
    emailjs.send('service_ml50ldw', 'template_13w7co5', templateParams, 'Hvw5Pxh1-JAOlaVMk')
        .then(function(response) {
            document.getElementById('evaluationArea').classList.add('hidden');
            document.getElementById('successCard').classList.remove('hidden');
            if (navigator.vibrate) navigator.vibrate([50, 100, 150]);
        }, function(error) {
            console.error('EmailJS Error Detail:', error);
            alert('حدث خطأ أثناء الاتصال، يرجى إعادة المحاولة.');
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> اعتماد الدرجة وإرسال التقييم';
            submitBtn.disabled = false;
        });
});
