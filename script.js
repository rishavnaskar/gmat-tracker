// Configuration
const EXAM_DATE = new Date('2026-01-10');
const START_DATE = new Date(); // Today as start date
const STORAGE_KEY = 'gmat_study_tracker';
const NAME_STORAGE_KEY = 'gmat_user_name';

// Initialize data structure
let studyData = {
    dailyHours: {}, // Format: "YYYY-MM-DD": hours
    startDate: START_DATE.toISOString(),
    totalHours: 0,
    achievements: []
};

// Get user name from localStorage
function getUserName() {
    return localStorage.getItem(NAME_STORAGE_KEY) || null;
}

// Set user name in localStorage
function setUserName(name) {
    localStorage.setItem(NAME_STORAGE_KEY, name);
}

// Update subtitle with user name
function updateSubtitle() {
    const name = getUserName();
    const subtitle = document.getElementById('user-subtitle');
    if (name) {
        subtitle.textContent = `${name}'s Journey to January 10, 2026`;
    } else {
        subtitle.textContent = `Your Journey to January 10, 2026`;
    }
}

// Prompt for user name
function promptForName() {
    const currentName = getUserName();
    const userName = prompt('Enter your name to personalize your journey:', currentName || '');
    if (userName && userName.trim()) {
        setUserName(userName.trim());
        updateSubtitle();
        showNotification(`Welcome, ${userName.trim()}! Let's ace that GMAT! 🚀`, true);
    }
}

// Initialize user name (show nudge if no name)
function initializeUserName() {
    const name = getUserName();
    
    updateSubtitle();
    
    // If no name found, show a friendly nudge every time
    if (!name) {
        setTimeout(() => {
            showNotification('👋 Click on the subtitle to personalize your journey!', true);
        }, 1000);
    }
}

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        studyData = JSON.parse(saved);
        studyData.startDate = new Date(studyData.startDate);
    }
}

// Reset all data with motivational nudge
function resetAllData() {
    // Show motivational message first
    const motivationalMessage = `
⚠️ DON'T GIVE UP! ⚠️

You've come so far in your journey!
Every hour you've studied brings you closer to your goal.

💪 Remember why you started
🎯 Your dreams are worth the effort
🌟 Success is just around the corner

Are you REALLY sure you want to delete all your progress?

If you still want to proceed, enter the password.
    `.trim();
    
    alert(motivationalMessage);
    
    // Prompt for password
    const password = prompt('Enter password to reset all data (or click Cancel to keep going):');
    const correctPassword = 'ihavecrackedgmat@123';
    
    if (password === null) {
        showNotification('💪 Great choice! Keep pushing forward!', true);
        return;
    }
    
    if (password !== correctPassword) {
        showNotification('❌ Incorrect password! Your progress is safe. Keep going!', false);
        return;
    }
    
    if (confirm('Final confirmation: Delete ALL your hard-earned progress?')) {
        // Clear study data
        studyData = {
            dailyHours: {},
            startDate: new Date().toISOString(),
            totalHours: 0,
            achievements: []
        };
        localStorage.removeItem(STORAGE_KEY);
        
        // Clear name
        localStorage.removeItem(NAME_STORAGE_KEY);
        updateSubtitle();
        
        // Clear success modal shown flag
        const today = getDateString(new Date());
        localStorage.removeItem('success_modal_shown_' + today);
        
        // Refresh the UI
        saveData();
        updateCountdown();
        updateProgress();
        updateStats();
        renderCalendar();
        updateChart();
        renderAchievements();
        
        showNotification('✅ All data has been reset. Fresh start!', true);
    } else {
        showNotification('💪 Smart decision! Your progress is preserved!', true);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studyData));
}

// Calculate days remaining
function getDaysRemaining() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(EXAM_DATE);
    exam.setHours(0, 0, 0, 0);
    const diff = exam - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Get date string in YYYY-MM-DD format
function getDateString(date) {
    return date.toISOString().split('T')[0];
}

// Initialize
loadData();
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Update countdown
function updateCountdown() {
    const days = getDaysRemaining();
    document.getElementById('days-remaining').textContent = days;
}

// Update progress bar
function updateProgress() {
    const totalHours = studyData.totalHours;
    const daysActive = Object.keys(studyData.dailyHours).length;
    const daysSinceStart = Math.ceil((new Date() - new Date(studyData.startDate)) / (1000 * 60 * 60 * 24));
    
    // Calculate progress percentage (assuming 500 hours as a goal, adjust as needed)
    const goalHours = 500;
    const progressPercent = Math.min((totalHours / goalHours) * 100, 100);
    
    document.getElementById('progress-fill').style.width = progressPercent + '%';
    document.getElementById('total-hours').textContent = totalHours.toFixed(1);
    document.getElementById('total-days').textContent = daysActive;
    
    // Check for success conditions
    checkSuccessConditions(progressPercent);
}

// Check for success conditions and show modal
function checkSuccessConditions(progressPercent) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(EXAM_DATE);
    exam.setHours(0, 0, 0, 0);
    const isExamDay = today.getTime() === exam.getTime();
    const isProgressComplete = progressPercent >= 100;
    
    // Check if we should show success modal (only once per day)
    const lastShownKey = 'success_modal_shown_' + getDateString(today);
    const lastShown = localStorage.getItem(lastShownKey);
    
    if ((isExamDay || isProgressComplete) && !lastShown) {
        showSuccessModal();
        localStorage.setItem(lastShownKey, 'true');
    }
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exam = new Date(EXAM_DATE);
    exam.setHours(0, 0, 0, 0);
    const isExamDay = today.getTime() === exam.getTime();
    
    // Update message based on condition
    if (isExamDay) {
        document.querySelector('.success-message').textContent = "Today is your exam day!";
    } else {
        document.querySelector('.success-message').textContent = "You've reached 100% of your goal!";
    }
    
    modal.classList.add('show');
}

// Close success modal
function closeSuccessModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('show');
}

// Update stats
function updateStats() {
    const today = getDateString(new Date());
    const todayHours = studyData.dailyHours[today] || 0;
    
    // Calculate week hours
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    let weekHours = 0;
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekAgo);
        date.setDate(date.getDate() + i);
        const dateStr = getDateString(date);
        weekHours += studyData.dailyHours[dateStr] || 0;
    }
    
    // Calculate average
    const daysActive = Object.keys(studyData.dailyHours).length;
    const avgHours = daysActive > 0 ? studyData.totalHours / daysActive : 0;
    
    document.getElementById('today-hours').textContent = todayHours.toFixed(1);
    document.getElementById('week-hours').textContent = weekHours.toFixed(1);
    document.getElementById('avg-hours').textContent = avgHours.toFixed(1);
}

// Render calendar
function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day-header';
        header.textContent = day;
        grid.appendChild(header);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day';
        grid.appendChild(empty);
    }
    
    // Days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dateStr = getDateString(date);
        const hours = studyData.dailyHours[dateStr] || 0;
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // Check if today
        if (dateStr === getDateString(today)) {
            dayElement.classList.add('today');
        }
        
        // Check if has hours
        if (hours > 0) {
            dayElement.classList.add('has-hours');
            if (hours >= 6) {
                dayElement.classList.add('high-hours');
            }
        }
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'calendar-day-number';
        dayNumber.textContent = day;
        
        const dayHours = document.createElement('div');
        dayHours.className = 'calendar-day-hours';
        dayHours.textContent = hours > 0 ? hours + 'h' : '';
        
        dayElement.appendChild(dayNumber);
        dayElement.appendChild(dayHours);
        
        // Add click to edit
        dayElement.addEventListener('click', () => {
            const input = prompt(`Enter hours studied on ${dateStr}:`, hours);
            if (input !== null) {
                const newHours = parseFloat(input) || 0;
                // Validate: prevent negative values
                if (newHours < 0) {
                    alert('Hours cannot be negative! Please enter a valid number.');
                    return;
                }
                updateDayHours(dateStr, newHours);
            }
        });
        
        grid.appendChild(dayElement);
    }
    
    // Update month/year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('current-month-year').textContent = 
        `${monthNames[currentMonth]} ${currentYear}`;
}

// Update day hours
function updateDayHours(dateStr, hours) {
    const oldHours = studyData.dailyHours[dateStr] || 0;
    studyData.dailyHours[dateStr] = hours;
    
    // Update total
    studyData.totalHours = studyData.totalHours - oldHours + hours;
    
    saveData();
    renderCalendar();
    updateProgress();
    updateStats();
    updateChart();
    checkAchievements();
}

// Clock in
function clockIn() {
    const hoursInput = document.getElementById('study-hours');
    const hours = parseFloat(hoursInput.value) || 0;
    
    // Validate: must be positive and greater than 0
    if (hours <= 0 || hours < 0) {
        showNotification('Please select a valid number of hours!', false);
        hoursInput.value = '0';
        return;
    }
    
    const today = getDateString(new Date());
    const oldHours = studyData.dailyHours[today] || 0;
    
    // Overwrite existing hours instead of adding
    updateDayHours(today, hours);
    
    // Show congratulations based on hours
    let message = oldHours > 0 
        ? `Updated! You've logged ${hours} hour${hours !== 1 ? 's' : ''} for today!`
        : `Great job! You've clocked in ${hours} hour${hours !== 1 ? 's' : ''}!`;
    
    if (hours >= 8) {
        message = `🎉 Amazing! ${hours} hours today! You're a study champion!`;
        showNotification(message, true);
    } else if (hours >= 6) {
        message = `🌟 Excellent! ${hours} hours today! Keep it up!`;
        showNotification(message, true);
    } else if (hours >= 4) {
        message = `✨ Great work! ${hours} hours today!`;
        showNotification(message, true);
    } else {
        showNotification(message, true);
    }
    
    hoursInput.value = '0';
}

// Show notification
function showNotification(message, isSuccess) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show';
    if (isSuccess) {
        notification.classList.add('achievement');
    }
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Update chart
let studyChart = null;

function updateChart() {
    const ctx = document.getElementById('study-chart').getContext('2d');
    
    // Get last 30 days of data
    const dates = [];
    const hours = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = getDateString(date);
        dates.push(dateStr);
        hours.push(studyData.dailyHours[dateStr] || 0);
    }
    
    if (studyChart) {
        studyChart.destroy();
    }
    
    studyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(d => {
                const date = new Date(d);
                return `${date.getMonth() + 1}/${date.getDate()}`;
            }),
            datasets: [{
                label: 'Study Hours',
                data: hours,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#764ba2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Achievements system
const achievements = [
    { id: 'first_hour', icon: '🎯', title: 'First Hour', desc: 'Study your first hour', check: () => studyData.totalHours >= 1 },
    { id: '10_hours', icon: '⭐', title: '10 Hours Club', desc: 'Reach 10 total hours', check: () => studyData.totalHours >= 10 },
    { id: '50_hours', icon: '🌟', title: '50 Hours Milestone', desc: 'Reach 50 total hours', check: () => studyData.totalHours >= 50 },
    { id: '100_hours', icon: '💎', title: 'Century Club', desc: 'Reach 100 total hours', check: () => studyData.totalHours >= 100 },
    { id: '250_hours', icon: '👑', title: 'Elite Scholar', desc: 'Reach 250 total hours', check: () => studyData.totalHours >= 250 },
    { id: '500_hours', icon: '🏆', title: 'Master Student', desc: 'Reach 500 total hours', check: () => studyData.totalHours >= 500 },
    { id: '6_hour_day', icon: '🔥', title: 'Power Day', desc: 'Study 6+ hours in one day', check: () => {
        return Object.values(studyData.dailyHours).some(h => h >= 6);
    }},
    { id: '8_hour_day', icon: '💪', title: 'Marathon Day', desc: 'Study 8+ hours in one day', check: () => {
        return Object.values(studyData.dailyHours).some(h => h >= 8);
    }},
    { id: '7_day_streak', icon: '📅', title: 'Week Warrior', desc: 'Study 7 days in a row', check: () => {
        const dates = Object.keys(studyData.dailyHours).sort();
        if (dates.length < 7) return false;
        // Check for consecutive days
        for (let i = dates.length - 7; i < dates.length - 1; i++) {
            const date1 = new Date(dates[i]);
            const date2 = new Date(dates[i + 1]);
            const diff = (date2 - date1) / (1000 * 60 * 60 * 24);
            if (diff !== 1) return false;
        }
        return true;
    }},
    { id: '30_days', icon: '📚', title: 'Monthly Dedication', desc: 'Study for 30 different days', check: () => Object.keys(studyData.dailyHours).length >= 30 }
];

function checkAchievements() {
    achievements.forEach(achievement => {
        if (!studyData.achievements.includes(achievement.id) && achievement.check()) {
            studyData.achievements.push(achievement.id);
            showNotification(`🏆 Achievement Unlocked: ${achievement.title}!`, true);
            saveData();
            renderAchievements();
        }
    });
}

function renderAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';
    
    achievements.forEach(achievement => {
        const card = document.createElement('div');
        card.className = 'achievement-card';
        
        if (studyData.achievements.includes(achievement.id)) {
            card.classList.add('unlocked');
        }
        
        const icon = document.createElement('div');
        icon.className = 'achievement-icon';
        icon.textContent = achievement.icon;
        
        const title = document.createElement('div');
        title.className = 'achievement-title';
        title.textContent = achievement.title;
        
        const desc = document.createElement('div');
        desc.className = 'achievement-desc';
        desc.textContent = achievement.desc;
        
        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(desc);
        grid.appendChild(card);
    });
}

// Event listeners
document.getElementById('clock-in-btn').addEventListener('click', clockIn);

// Allow Enter key to trigger clock-in from dropdown
document.getElementById('study-hours').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        clockIn();
    }
});

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Close success modal
document.getElementById('close-success-modal').addEventListener('click', closeSuccessModal);

// Close modal when clicking outside
document.getElementById('success-modal').addEventListener('click', (e) => {
    if (e.target.id === 'success-modal') {
        closeSuccessModal();
    }
});

// Reset button
document.getElementById('reset-btn').addEventListener('click', resetAllData);

// Make subtitle clickable to set name
document.getElementById('user-subtitle').addEventListener('click', promptForName);
document.getElementById('user-subtitle').style.cursor = 'pointer';

// Initialize on load
loadData(); // Load data first to check if it exists
initializeUserName(); // Then check for name
updateCountdown();
updateProgress();
updateStats();
renderCalendar();
updateChart();
renderAchievements();
checkAchievements();

