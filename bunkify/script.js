// DOM Elements
const authPage = document.getElementById('auth-page');
const appPage = document.getElementById('app');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authTabs = document.querySelectorAll('.auth-tab');
const loginFormElement = document.getElementById('login-form-element');
const registerFormElement = document.getElementById('register-form-element');
const userMenuToggle = document.getElementById('user-menu-toggle');
const userDropdown = document.getElementById('user-dropdown');
const themeToggle = document.getElementById('theme-toggle');
const addSubjectForm = document.getElementById('add-subject-form');
const subjectsDashboard = document.getElementById('subjects-dashboard');
const logoutLink = document.getElementById('logout-link');
const profileLink = document.getElementById('profile-link');
const settingsLink = document.getElementById('settings-link');
const editSubjectModal = document.getElementById('edit-subject-modal');
const confirmDeleteModal = document.getElementById('confirm-delete-modal');
const attendanceModal = document.getElementById('attendance-modal');
const bunkCalculatorModal = document.getElementById('bunk-calculator-modal');
const profileModal = document.getElementById('profile-modal');
const saveEditSubjectBtn = document.getElementById('save-edit-subject');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const saveAttendanceBtn = document.getElementById('save-attendance');
const saveProfileBtn = document.getElementById('save-profile');
const totalSubjectsElement = document.getElementById('total-subjects');
const totalAttendedElement = document.getElementById('total-attended');
const totalBunkedElement = document.getElementById('total-bunked');
const averageAttendanceElement = document.getElementById('average-attendance');
const calendarGrid = document.getElementById('calendar-grid');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const calendarMonthYearElement = document.getElementById('calendar-month-year');

// State
let currentUser = null;
let subjects = [];
let attendance = [];
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Init theme
const initTheme = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
};

// Auth tabs
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.tab === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        }
    });
});

// User menu toggle
userMenuToggle.addEventListener('click', () => {
    userDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('active');
    }
});

// Close modals
document.querySelectorAll('.modal-close, [data-dismiss="modal"]').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.modal-backdrop').forEach(modal => {
            modal.classList.add('hidden');
        });
    });
});

// Auth Forms
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('bunkifyUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('bunkifyCurrentUser', JSON.stringify(user));
        showApp();
        loadUserData();
    } else {
        alert('Invalid email or password');
    }
});

registerFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('bunkifyUsers') || '[]');
    if (users.some(u => u.email === email)) {
        alert('Email already registered');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('bunkifyUsers', JSON.stringify(users));
    
    // Log user in
    currentUser = newUser;
    localStorage.setItem('bunkifyCurrentUser', JSON.stringify(newUser));
    showApp();
    
    // Clear form
    registerFormElement.reset();
    
    // Create initial user data
    initUserData();
});

// Logout
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('bunkifyCurrentUser');
    currentUser = null;
    subjects = [];
    attendance = [];
    showAuth();
});

// Profile
profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-update-name').value = currentUser.name;
    document.getElementById('profile-update-email').value = currentUser.email;
    profileModal.classList.remove('hidden');
});

saveProfileBtn.addEventListener('click', () => {
    const name = document.getElementById('profile-update-name').value;
    const email = document.getElementById('profile-update-email').value;
    
    if (!name || !email) {
        alert('Name and email are required');
        return;
    }
    
    // Update user data
    const users = JSON.parse(localStorage.getItem('bunkifyUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = email;
        localStorage.setItem('bunkifyUsers', JSON.stringify(users));
        
        // Update current user
        currentUser.name = name;
        currentUser.email = email;
        localStorage.setItem('bunkifyCurrentUser', JSON.stringify(currentUser));
        
        // Close modal
        profileModal.classList.add('hidden');
    }
});

// Add Subject
addSubjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const subjectName = document.getElementById('subject-name').value;
    const subjectCode = document.getElementById('subject-code').value;
    const classesAttended = parseInt(document.getElementById('subject-classes').value) || 0;
    const totalClasses = parseInt(document.getElementById('total-classes').value) || 0;
    const minAttendance = parseInt(document.getElementById('min-attendance').value) || 75;
    
    const newSubject = {
        id: Date.now().toString(),
        name: subjectName,
        code: subjectCode,
        classesAttended,
        totalClasses,
        minAttendance,
        userId: currentUser.id
    };
    
    subjects.push(newSubject);
    saveSubjects();
    renderSubjects();
    updateStats();
    
    // Clear form
    addSubjectForm.reset();
    document.getElementById('min-attendance').value = '75';
});

// Edit Subject
saveEditSubjectBtn.addEventListener('click', () => {
    const subjectId = document.getElementById('edit-subject-id').value;
    const subjectName = document.getElementById('edit-subject-name').value;
    const subjectCode = document.getElementById('edit-subject-code').value;
    const classesAttended = parseInt(document.getElementById('edit-subject-classes').value) || 0;
    const totalClasses = parseInt(document.getElementById('edit-total-classes').value) || 0;
    const minAttendance = parseInt(document.getElementById('edit-min-attendance').value) || 75;
    
    const subjectIndex = subjects.findIndex(s => s.id === subjectId);
    
    if (subjectIndex !== -1) {
        subjects[subjectIndex].name = subjectName;
        subjects[subjectIndex].code = subjectCode;
        subjects[subjectIndex].classesAttended = classesAttended;
        subjects[subjectIndex].totalClasses = totalClasses;
        subjects[subjectIndex].minAttendance = minAttendance;
        
        saveSubjects();
        renderSubjects();
        updateStats();
        
        // Close modal
        editSubjectModal.classList.add('hidden');
    }
});

// Delete Subject
confirmDeleteBtn.addEventListener('click', () => {
    const subjectId = document.getElementById('delete-subject-id').value;
    
    // Remove subject
    subjects = subjects.filter(s => s.id !== subjectId);
    
    // Remove related attendance records
    attendance = attendance.filter(a => a.subjectId !== subjectId);
    
    saveSubjects();
    saveAttendance();
    renderSubjects();
    renderCalendar();
    updateStats();
    
    // Close modal
    confirmDeleteModal.classList.add('hidden');
});

// Mark Attendance
saveAttendanceBtn.addEventListener('click', () => {
    const subjectId = document.getElementById('attendance-subject').value;
    const date = document.getElementById('attendance-date').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    
    if (!subjectId || !date) {
        alert('Please fill all fields');
        return;
    }
    
    // Check if entry already exists for this date and subject
    const existingIndex = attendance.findIndex(a => 
        a.subjectId === subjectId && a.date === date);
    
    if (existingIndex !== -1) {
        // Update existing entry
        attendance[existingIndex].status = status;
    } else {
        // Add new entry
        attendance.push({
            id: Date.now().toString(),
            subjectId,
            date,
            status,
            userId: currentUser.id
        });
    }
    
    // Update subject attendance counts
    updateSubjectAttendance(subjectId);
    
    saveAttendance();
    renderSubjects();
    renderCalendar();
    updateStats();
    
    // Close modal
    attendanceModal.classList.add('hidden');
});

// Calendar Navigation
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Render Calendar
function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    // Update month/year display
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    calendarMonthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear grid
    calendarGrid.innerHTML = '';
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < startDayOfWeek; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day inactive';
        calendarGrid.appendChild(dayElement);
    }
    
    // Get today's date for comparison
    const today = new Date();
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if this is today
        if (isCurrentMonth && day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Format date to match attendance records (YYYY-MM-DD)
        const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if there's attendance for this day
        const dayAttendance = attendance.filter(a => a.date === formattedDate);
        
        if (dayAttendance.length > 0) {
            const attended = dayAttendance.filter(a => a.status === 'attended').length;
            const missed = dayAttendance.filter(a => a.status === 'missed').length;
            
            if (attended > 0) {
                const dot = document.createElement('div');
                dot.className = 'attendance-dot attended';
                dayElement.appendChild(dot);
            }
            
            if (missed > 0) {
                const dot = document.createElement('div');
                dot.className = 'attendance-dot missed';
                dot.style.right = '4px'; // Position on the right if there are two dots
                dayElement.appendChild(dot);
            }
        }
        
        // Add click event to mark attendance
        dayElement.addEventListener('click', () => {
            const dateInput = document.getElementById('attendance-date');
            dateInput.value = formattedDate;
            
            // Populate subject dropdown
            const subjectSelect = document.getElementById('attendance-subject');
            subjectSelect.innerHTML = '';
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.id;
                option.textContent = subject.name;
                subjectSelect.appendChild(option);
            });
            
            attendanceModal.classList.remove('hidden');
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

// Render Subjects
function renderSubjects() {
    subjectsDashboard.innerHTML = '';
    
    if (subjects.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-subjects-message';
        message.textContent = 'You haven\'t added any subjects yet.';
        subjectsDashboard.appendChild(message);
        return;
    }
    
    subjects.forEach(subject => {
        const attendancePercentage = subject.totalClasses > 0 
            ? Math.round((subject.classesAttended / subject.totalClasses) * 100) 
            : 0;
        
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        
        const headerColor = attendancePercentage >= subject.minAttendance 
            ? 'var(--success-color)' 
            : 'var(--danger-color)';
        
        subjectCard.innerHTML = `
            <div class="subject-header" style="background-color: ${headerColor}">
                <div>
                    <div class="subject-name">${subject.name}</div>
                    <div class="subject-code">${subject.code}</div>
                </div>
                <div class="subject-actions">
                    <button class="btn-icon edit-subject" data-id="${subject.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-subject" data-id="${subject.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="subject-content">
                <div class="attendance-info">
                    <div class="attendance-item">
                        <div class="attendance-value">${subject.classesAttended}</div>
                        <div class="attendance-label">Attended</div>
                    </div>
                    <div class="attendance-item">
                        <div class="attendance-value">${subject.totalClasses - subject.classesAttended}</div>
                        <div class="attendance-label">Bunked</div>
                    </div>
                    <div class="attendance-item">
                        <div class="attendance-value">${subject.totalClasses}</div>
                        <div class="attendance-label">Total</div>
                    </div>
                </div>
                
                <div class="attendance-progress">
                    <div class="progress-bar" style="width: ${attendancePercentage}%"></div>
                </div>
                
                <div class="attendance-status">
                    <div class="attendance-percentage">${attendancePercentage}% Attendance</div>
                    <div class="min-required">Min. Required: ${subject.minAttendance}%</div>
                </div>
                
                <button class="btn btn-primary bunk-calculator" data-id="${subject.id}" style="width: 100%; margin-top: 15px;">
                    Bunk Calculator
                </button>
            </div>
        `;
        
        subjectsDashboard.appendChild(subjectCard);
        
        // Add event listeners for the buttons
        const editBtn = subjectCard.querySelector('.edit-subject');
        const deleteBtn = subjectCard.querySelector('.delete-subject');
        const bunkCalcBtn = subjectCard.querySelector('.bunk-calculator');
        
        editBtn.addEventListener('click', () => openEditSubjectModal(subject));
        deleteBtn.addEventListener('click', () => openDeleteSubjectModal(subject));
        bunkCalcBtn.addEventListener('click', () => openBunkCalculatorModal(subject));
    });
}

// Open Edit Subject Modal
function openEditSubjectModal(subject) {
    document.getElementById('edit-subject-id').value = subject.id;
    document.getElementById('edit-subject-name').value = subject.name;
    document.getElementById('edit-subject-code').value = subject.code;
    document.getElementById('edit-subject-classes').value = subject.classesAttended;
    document.getElementById('edit-total-classes').value = subject.totalClasses;
    document.getElementById('edit-min-attendance').value = subject.minAttendance;
    
    editSubjectModal.classList.remove('hidden');
}

// Open Delete Subject Modal
function openDeleteSubjectModal(subject) {
    document.getElementById('delete-subject-id').value = subject.id;
    confirmDeleteModal.classList.remove('hidden');
}

// Open Bunk Calculator Modal
function openBunkCalculatorModal(subject) {
    const attendancePercentage = subject.totalClasses > 0 
        ? Math.round((subject.classesAttended / subject.totalClasses) * 100) 
        : 0;
    
    document.getElementById('calc-subject-name').textContent = subject.name;
    document.getElementById('calc-current-attendance').textContent = `${attendancePercentage}%`;
    document.getElementById('calc-min-required').textContent = `${subject.minAttendance}%`;
    
    // Calculate how many classes can be safely bunked
    let safeToBunk = calculateSafeToBunk(subject);
    document.getElementById('safe-to-bunk').textContent = `${safeToBunk} classes`;
    
    // Calculate how many classes must be attended to reach minimum
    let mustAttend = calculateMustAttend(subject);
    document.getElementById('must-attend').textContent = `${mustAttend} classes`;
    
    bunkCalculatorModal.classList.remove('hidden');
}

// Calculate Safe to Bunk Classes
function calculateSafeToBunk(subject) {
    if (subject.totalClasses === 0) return 0;
    
    const minRequired = subject.minAttendance / 100;
    const currentAttendance = subject.classesAttended / subject.totalClasses;
    
    if (currentAttendance < minRequired) return 0;
    
    // Calculate how many future classes can be missed while maintaining minimum attendance
    // Formula: (current_attended - min_required * total) / (1 - min_required)
    const futurePossibleBunks = Math.floor(
        (subject.classesAttended - minRequired * subject.totalClasses) / minRequired
    );
    
    return Math.max(0, futurePossibleBunks);
}

// Calculate Must Attend Classes
function calculateMustAttend(subject) {
    if (subject.totalClasses === 0) return 0;
    
    const minRequired = subject.minAttendance / 100;
    const currentAttendance = subject.classesAttended / subject.totalClasses;
    
    if (currentAttendance >= minRequired) return 0;
    
    // Calculate how many future classes must be attended to reach minimum attendance
    // Formula: (min_required * total - current_attended) / (1 - min_required)
    const mustAttend = Math.ceil(
        (minRequired * subject.totalClasses - subject.classesAttended) / (1 - minRequired)
    );
    
    return Math.max(0, mustAttend);
}

// Update Subject Attendance Counts
function updateSubjectAttendance(subjectId) {
    const subjectIndex = subjects.findIndex(s => s.id === subjectId);
    if (subjectIndex === -1) return;
    
    const subjectAttendance = attendance.filter(a => a.subjectId === subjectId);
    const attended = subjectAttendance.filter(a => a.status === 'attended').length;
    const missed = subjectAttendance.filter(a => a.status === 'missed').length;
    
    subjects[subjectIndex].classesAttended = attended;
    subjects[subjectIndex].totalClasses = attended + missed;
    
    saveSubjects();
}

// Update Stats
function updateStats() {
    const totalSubjects = subjects.length;
    
    let totalAttended = 0;
    let totalClasses = 0;
    
    subjects.forEach(subject => {
        totalAttended += subject.classesAttended;
        totalClasses += subject.totalClasses;
    });
    
    const totalBunked = totalClasses - totalAttended;
    const averageAttendance = totalClasses > 0 
        ? Math.round((totalAttended / totalClasses) * 100) 
        : 0;
    
    totalSubjectsElement.textContent = totalSubjects;
    totalAttendedElement.textContent = totalAttended;
    totalBunkedElement.textContent = totalBunked;
    averageAttendanceElement.textContent = `${averageAttendance}%`;
}

// Save Subjects to Local Storage
function saveSubjects() {
    localStorage.setItem(`bunkifySubjects_${currentUser.id}`, JSON.stringify(subjects));
}

// Save Attendance to Local Storage
function saveAttendance() {
    localStorage.setItem(`bunkifyAttendance_${currentUser.id}`, JSON.stringify(attendance));
}

// Load User Data
function loadUserData() {
    // Load subjects
    const storedSubjects = localStorage.getItem(`bunkifySubjects_${currentUser.id}`);
    subjects = storedSubjects ? JSON.parse(storedSubjects) : [];
    
    // Load attendance
    const storedAttendance = localStorage.getItem(`bunkifyAttendance_${currentUser.id}`);
    attendance = storedAttendance ? JSON.parse(storedAttendance) : [];
    
    renderSubjects();
    renderCalendar();
    updateStats();
}

// Initialize User Data
function initUserData() {
    subjects = [];
    attendance = [];
    saveSubjects();
    saveAttendance();
    renderSubjects();
    renderCalendar();
    updateStats();
}

// Show App
function showApp() {
    authPage.classList.add('hidden');
    appPage.classList.remove('hidden');
}

// Show Auth
function showAuth() {
    authPage.classList.remove('hidden');
    appPage.classList.add('hidden');
}

// Check if user is logged in
function checkAuth() {
    const storedUser = localStorage.getItem('bunkifyCurrentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        showApp();
        loadUserData();
    } else {
        showAuth();
    }
}

// Initialize
function init() {
    initTheme();
    checkAuth();
    renderCalendar();
}

// Start the app
window.addEventListener('DOMContentLoaded', init);