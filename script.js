// Initialize EmailJS with your public key
(function() {
    emailjs.init("GCn3cK9yp51BrF8Cp");
})();

// Function to create a floating heart element
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.opacity = Math.random();
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    return heart;
}

// Function to add floating hearts to the background
function addFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const numberOfHearts = 15;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = createHeart();
        container.appendChild(heart);
    }
}

// Add CSS for floating hearts animation
const style = document.createElement('style');
style.textContent = `
    .floating-heart {
        position: fixed;
        color: var(--primary-color);
        pointer-events: none;
        animation: float linear infinite;
        z-index: 0;
    }

    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form submission handler
document.getElementById('romanticForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        activity: document.getElementById('activity').value,
        message: document.getElementById('message').value,
        user_email: document.getElementById('user_email').value
    };

    // Send email to you
    emailjs.send('service_5v57b6h', 'template_e2zqojh', {
        to_email: 'w.terrr.ndd@gmail.com',
        date: formData.date,
        time: formData.time,
        location: formData.location,
        activity: formData.activity,
        message: formData.message
    })
    .then(function() {
        // Send confirmation email to Anh Sang using a different template
        return emailjs.send('service_5v57b6h', 'template_e2zqojh', {
            to_email: formData.user_email,
            date: formData.date,
            time: formData.time,
            location: formData.location,
            activity: formData.activity,
            message: formData.message
        });
    })
    .then(function() {
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    })
    .catch(function(error) {
        console.error('Error sending email:', error);
        alert('Có lỗi xảy ra rồi anh ơi! Thử lại giúp em nhé!');
    });
});

// Initialize floating hearts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    addFloatingHearts();
    
    // Add new hearts periodically to maintain the effect
    setInterval(() => {
        const container = document.querySelector('.floating-hearts');
        if (container.children.length < 15) {
            const heart = createHeart();
            container.appendChild(heart);
            
            // Remove the heart after animation completes
            heart.addEventListener('animationend', () => {
                heart.remove();
            });
        }
    }, 3000);
}); 