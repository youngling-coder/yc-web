document.querySelector('#contact form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button');
    
    // Get trimmed values using form elements collection
    const elements = form.elements;
    const formData = {
        name_from: elements.name?.value.trim(),
        email_from: elements.email?.value.trim(),
        content: elements.message?.value.trim()
    };

    // Improved validation
    if (!formData.name_from || !formData.email_from || !formData.content) {
        showMessage('Please fill in all fields', true);
        return;
    }

    button.disabled = true;
    button.textContent = 'Sending...';

    try {
        const response = await fetch('https://yc-web.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        showMessage('Message sent successfully! 🎉');
        form.reset();
    } catch (error) {
        showMessage('Failed to send message. Please try again later.', true);
    } finally {
        button.disabled = false;
        button.textContent = 'Send Message';
    }
});

function showMessage(message, isError = false) {
    // Remove existing messages
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Create message element
    const msg = document.createElement('div');
    msg.className = `form-message p-4 rounded-lg mt-4 text-center ${
        isError ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
    }`;
    msg.textContent = message;

    // Insert message after form
    const form = document.querySelector('#contact form');
    form.parentNode.insertBefore(msg, form.nextSibling);

    // Remove message after 5 seconds
    setTimeout(() => msg.remove(), 5000);
}