# 🎯 GMAT Study Tracker

A beautiful, gamified web application to track your GMAT study hours and progress towards your exam date. Built with HTML, CSS, and JavaScript, this tracker helps you stay motivated and organized throughout your GMAT preparation journey.

![GMAT Study Tracker](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 📅 Calendar View
- **Interactive Calendar**: Visual monthly calendar showing your study hours for each day
- **Color-Coded Days**: 
  - 🟢 Green for days with study hours
  - 🟡 Gold/Orange for high-study days (6+ hours)
  - 🔵 Purple highlight for today
- **Click to Edit**: Click any day to manually update study hours

### 📊 Progress Tracking
- **Visual Progress Bar**: Track your progress towards a 500-hour goal
- **Real-time Statistics**: 
  - Total hours studied
  - Active study days
  - Today's hours
  - This week's total
  - Average hours per day

### ⏰ Clock-In System
- **Easy Logging**: Dropdown menu to select study hours (0.5 to 12 hours)
- **Smart Updates**: Overwrites existing hours for the day (no accidental double-counting)
- **Motivational Messages**: Encouraging notifications based on study hours

### 📈 Analytics
- **Interactive Chart**: Line graph showing study hours over the last 30 days
- **Visual Trends**: See your study patterns and consistency

### 🏆 Achievement System
Unlock achievements as you progress:
- 🎯 First Hour
- ⭐ 10 Hours Club
- 🌟 50 Hours Milestone
- 💎 Century Club (100 hours)
- 👑 Elite Scholar (250 hours)
- 🏆 Master Student (500 hours)
- 🔥 Power Day (6+ hours in one day)
- 💪 Marathon Day (8+ hours in one day)
- 📅 Week Warrior (7-day streak)
- 📚 Monthly Dedication (30 days)

### 🎉 Success Celebrations
- **100% Progress**: Grand celebration when you reach your goal
- **Exam Day**: Special message on your exam date (January 10, 2026)
- **Achievement Unlocks**: Animated notifications for milestones

### 🔒 Data Protection
- **Password-Protected Reset**: Prevents accidental data loss
- **Motivational Nudges**: Encouragement messages before reset
- **Local Storage**: All data saved in your browser

### 👤 Personalization
- **Custom Name**: Personalize your journey with your name
- **Friendly Reminders**: Gentle nudges to personalize your experience

## 🚀 Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Installation

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd "Gmat Tracker"
   ```

2. **Open the Application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server -p 8000
     ```
   - Then navigate to `http://localhost:8000` in your browser

3. **First Time Setup**
   - On first load, you'll be prompted to enter your name
   - Click on the subtitle anytime to change your name
   - Start clocking in your study hours!

## 📖 How to Use

### Clocking In Study Hours
1. Select the number of hours from the dropdown menu
2. Click the "Clock In" button
3. Your hours are automatically saved and displayed on the calendar

### Viewing Progress
- Check the progress bar at the top to see your overall progress
- View statistics in the sidebar (Today, This Week, Average)
- Scroll down to see the analytics chart

### Editing Past Days
- Click on any day in the calendar
- Enter the hours studied for that day
- The calendar and statistics will update automatically

### Resetting Data
1. Click the "🔄 Reset" button in the top right
2. Read the motivational message
3. Enter the password: `ihavecrackedgmat@123`
4. Confirm the reset

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with gradients, animations, and glassmorphism effects
- **JavaScript (ES6+)**: Interactive functionality and data management
- **Chart.js**: Beautiful, responsive charts for analytics
- **Local Storage API**: Persistent data storage in the browser

## 📁 Project Structure

```
Gmat Tracker/
│
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Application logic and functionality
└── README.md           # This file
```

## 🎨 Design Features

- **Modern UI**: Clean, compact design with purple gradient theme
- **Responsive Layout**: Works on desktop and mobile devices
- **Smooth Animations**: Engaging transitions and hover effects
- **Glassmorphism**: Modern frosted glass effects
- **Color Psychology**: Green for progress, gold for achievements

## 🔐 Password Protection

The reset function is protected with a password to prevent accidental data loss:
- **Password**: `ihavecrackedgmat@123`
- Includes motivational messages to encourage persistence

## 📝 Data Storage

- All data is stored locally in your browser using Local Storage
- No data is sent to any server
- Your progress is private and secure
- Data persists between browser sessions

## 🎯 Goal Setting

- **Default Goal**: 500 study hours
- **Exam Date**: January 10, 2026 (configurable in `script.js`)
- Progress is calculated as: `(Total Hours / Goal Hours) × 100%`

## 💡 Tips for Success

1. **Be Consistent**: Try to study every day, even if it's just 30 minutes
2. **Track Honestly**: Log your actual study hours accurately
3. **Review Progress**: Check your weekly stats to maintain momentum
4. **Celebrate Milestones**: Unlock achievements to stay motivated
5. **Don't Give Up**: Use the tracker to visualize your progress and stay committed

## 🐛 Troubleshooting

### Data Not Saving
- Ensure cookies/local storage is enabled in your browser
- Check browser console for any errors

### Calendar Not Displaying
- Clear browser cache and reload
- Check that JavaScript is enabled

### Chart Not Showing
- Ensure you have an internet connection (Chart.js is loaded from CDN)
- Check browser console for errors

## 🔄 Updates & Maintenance

To modify the exam date or goal hours, edit the constants in `script.js`:
```javascript
const EXAM_DATE = new Date('2026-01-10');
const goalHours = 500; // In updateProgress() function
```

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

- Built with ❤️ for GMAT aspirants
- Inspired by gamification and productivity principles
- Designed to make studying more engaging and trackable

## 📧 Support

For issues or questions, please check the code comments or create an issue in the repository.

---

**Good luck with your GMAT preparation! You've got this! 💪🎓**

