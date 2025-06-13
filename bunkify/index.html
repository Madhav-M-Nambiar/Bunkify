<?php
    // Set the current date
    $currentDate = date("l, F j, Y");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bunkify - Attendance Calculator</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container" id="app-container">
        <!-- Display the current date -->
        <div class="current-date">
            <p>Today is: <?php echo $currentDate; ?></p>
        </div>
        <!-- Authentication Pages -->
        <div id="auth-page" class="auth-container">
            <div class="auth-tabs">
                <div class="auth-tab active" data-tab="login">Login</div>
                <div class="auth-tab" data-tab="register">Register</div>
            </div>
            
            <!-- Login Form -->
            <div id="login-form" class="auth-form">
                <h2 class="auth-heading">Welcome Back to Bunkify</h2>
                <form id="login-form-element">
                    <div class="form-group">
                        <label for="login-email">Email</label>
                        <input type="email" id="login-email" name="email" class="form-control" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Password</label>
                        <input type="password" id="login-password" name="password" class="form-control" placeholder="Enter your password" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                    </div>
                </form>
            </div>
            
            <!-- Registration Form -->
            <div id="register-form" class="auth-form" style="display: none;">
                <h2 class="auth-heading">Create Your Bunkify Account</h2>
                <form id="register-form-element">
                    <div class="form-group">
                        <label for="register-name">Full Name</label>
                        <input type="text" id="register-name" name="name" class="form-control" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label for="register-email">Email</label>
                        <input type="email" id="register-email" name="email" class="form-control" placeholder="your@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" name="password" class="form-control" placeholder="Create a password" required>
                    </div>
                    <div class="form-group">
                        <label for="register-confirm-password">Confirm Password</label>
                        <input type="password" id="register-confirm-password" name="confirm_password" class="form-control" placeholder="Confirm your password" required>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Main App Interface (Dashboard) -->
        <div id="app" class="hidden">
            <header>
                <div class="logo">
                    <i class="fas fa-calendar-check"></i>
                    <span>Bunkify</span>
                </div>
                <div class="header-actions">
                    <button class="theme-toggle" id="theme-toggle">
                        <i class="fas fa-moon"></i>
                    </button>
                    <div class="user-menu">
                        <div class="user-icon" id="user-menu-toggle">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="dropdown-menu" id="user-dropdown">
                            <ul>
                                <li><a href="#" id="profile-link"><i class="fas fa-user-circle"></i> Profile</a></li>
                                <li><a href="#" id="settings-link"><i class="fas fa-cog"></i> Settings</a></li>
                                <li><a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div class="container">
                <!-- Stats Overview -->
                <div class="stats-container">
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-book"></i></div>
                        <div class="value" id="total-subjects">0</div>
                        <div class="label">Subjects</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-check-circle"></i></div>
                        <div class="value" id="total-attended">0</div>
                        <div class="label">Classes Attended</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-times-circle"></i></div>
                        <div class="value" id="total-bunked">0</div>
                        <div class="label">Classes Bunked</div>
                    </div>
                    <div class="stat-card">
                        <div class="icon"><i class="fas fa-percentage"></i></div>
                        <div class="value" id="average-attendance">0%</div>
                        <div class="label">Avg. Attendance</div>
                    </div>
                </div>

                <!-- Add New Subject Form -->
                <div class="add-subject">
                    <h3 class="form-title">Add New Subject</h3>
                    <form id="add-subject-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="subject-name">Subject Name</label>
                                <input type="text" id="subject-name" name="subject_name" class="form-control" placeholder="e.g. Mathematics" required>
                            </div>
                            <div class="form-group">
                                <label for="subject-code">Subject Code</label>
                                <input type="text" id="subject-code" name="subject_code" class="form-control" placeholder="e.g. MATH101" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="subject-classes">Initial Classes Attended</label>
                                <input type="number" id="subject-classes" name="classes_attended" class="form-control" value="0" min="0">
                            </div>
                            <div class="form-group">
                                <label for="total-classes">Total Classes</label>
                                <input type="number" id="total-classes" name="total_classes" class="form-control" value="0" min="0">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="min-attendance">Minimum Attendance Required (%)</label>
                                <input type="number" id="min-attendance" name="min_attendance" class="form-control" value="75" min="0" max="100">
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary" style="width: 100%;">Add Subject</button>
                        </div>
                    </form>
                </div>

                <!-- Calendar View -->
                <div class="calendar">
                    <div class="calendar-header">
                        <h3 class="calendar-title" id="calendar-month-year">April 2025</h3>
                        <div class="calendar-nav">
                            <button id="prev-month"><i class="fas fa-chevron-left"></i></button>
                            <button id="next-month"><i class="fas fa-chevron-right"></i></button>
                        </div>
                    </div>
                    <div class="calendar-day-headers">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="calendar-grid" id="calendar-grid">
                        <!-- Calendar days will be generated by JS -->
                    </div>
                </div>

                <!-- Subjects Dashboard -->
                <h3 class="section-title">Your Subjects</h3>
                <div class="dashboard" id="subjects-dashboard">
                    <!-- Subject cards will be inserted here by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Modals -->
    <div class="modal-backdrop hidden" id="edit-subject-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Edit Subject</h3>
                <button class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="edit-subject-form">
                    <div class="form-group">
                        <label for="edit-subject-name">Subject Name</label>
                        <input type="text" id="edit-subject-name" name="subject_name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-subject-code">Subject Code</label>
                        <input type="text" id="edit-subject-code" name="subject_code" class="form-control" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-subject-classes">Classes Attended</label>
                            <input type="number" id="edit-subject-classes" name="classes_attended" class="form-control" min="0">
                        </div>
                        <div class="form-group">
                            <label for="edit-total-classes">Total Classes</label>
                            <input type="number" id="edit-total-classes" name="total_classes" class="form-control" min="0">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="edit-min-attendance">Minimum Attendance Required (%)</label>
                        <input type="number" id="edit-min-attendance" name="min_attendance" class="form-control" min="0" max="100">
                    </div>
                    <input type="hidden" id="edit-subject-id" name="subject_id">
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-dismiss="modal">Cancel</button>
                <button type="button" id="save-edit-subject" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>

    <div class="modal-backdrop hidden" id="confirm-delete-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Confirm Delete</h3>
                <button class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this subject? This action cannot be undone.</p>
                <input type="hidden" id="delete-subject-id" name="subject_id">
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-dismiss="modal">Cancel</button>
                <button type="button" id="confirm-delete-btn" class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>

    <div class="modal-backdrop hidden" id="attendance-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Mark Attendance</h3>
                <button class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="attendance-form">
                    <div class="form-group">
                        <label for="attendance-subject">Subject</label>
                        <select id="attendance-subject" name="subject_id" class="form-control" required>
                            <!-- Options will be populated by JavaScript -->
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="attendance-date">Date</label>
                        <input type="date" id="attendance-date" name="date" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="status" value="attended" checked>
                                <span>Attended</span>
                            </label>
                            <label class="radio-label">
                                <input type="radio" name="status" value="missed">
                                <span>Missed</span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-dismiss="modal">Cancel</button>
                <button type="button" id="save-attendance" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>

    <div class="modal-backdrop hidden" id="bunk-calculator-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Bunk Calculator</h3>
                <button class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div id="bunk-calculator-content">
                    <div class="bunk-info">
                        <p>Subject: <strong id="calc-subject-name"></strong></p>
                        <p>Current Attendance: <strong id="calc-current-attendance">0%</strong></p>
                        <p>Minimum Required: <strong id="calc-min-required">75%</strong></p>
                    </div>
                    <div class="bunk-predictions">
                        <div class="prediction-item">
                            <h4>Safe to Bunk</h4>
                            <div class="prediction-value" id="safe-to-bunk">0 classes</div>
                        </div>
                        <div class="prediction-item">
                            <h4>Must Attend</h4>
                            <div class="prediction-value" id="must-attend">0 classes</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>

    <div class="modal-backdrop hidden" id="profile-modal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">User Profile</h3>
                <button class="modal-close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="profile-info">
                    <div class="profile-picture">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="profile-details">
                        <h3 id="profile-name">User Name</h3>
                        <p id="profile-email">user@example.com</p>
                    </div>
                </div>
                <form id="profile-form">
                    <div class="form-group">
                        <label for="profile-update-name">Full Name</label>
                        <input type="text" id="profile-update-name" name="name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="profile-update-email">Email</label>
                        <input type="email" id="profile-update-email" name="email" class="form-control">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" data-dismiss="modal">Cancel</button>
                <button type="button" id="save-profile" class="btn btn-primary">Save Changes</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>