document.addEventListener('DOMContentLoaded', function() {
    fetch('data/experience.json')
        .then(response => response.json())
        .then(experiences => {
            const container = document.querySelector('.timeline');
            experiences.forEach(exp => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item fade-in';
                timelineItem.innerHTML = `
                    <div class="timeline-content">
                        <span class="timeline-date">${exp.date}</span>
                        <h3 class="timeline-title">${exp.title}</h3>
                        <span class="timeline-company">${exp.company}</span>
                        <p class="timeline-description">${exp.description}</p>
                    </div>
                `;
                container.appendChild(timelineItem);
            });
        });
});