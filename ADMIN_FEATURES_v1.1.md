Admin Panel - Enhanced Features Guide
=====================================

## New Features Added (v1.1.0)

This update adds powerful system administration capabilities to the Admin Panel, including:
- ✨ Edit user dialog (change roles and status without deleting)
- 📊 System statistics dashboard
- 💾 Database backup management with download
- 📋 Activity/audit log viewer
- 🎯 Tabbed interface for organization

---

## Feature Overview

### 1. User Management (Enhanced)

#### Create User
Same as before - create new users with username, password, and role selection.

#### Edit User (NEW!)
Now you can modify existing users without deleting them:
- **Change Role:** Promote users to admin, demote to user/viewer
- **Activate/Deactivate:** Enable or disable accounts without deletion
- **In-place Updates:** Changes take effect immediately

**Steps to Edit a User:**
1. Go to Admin Panel → Users tab
2. Find the user in the table
3. Click **"Edit"** button
4. Change Role and/or Status
5. Click **"Save Changes"**

**Example Scenario:**
```
User: sarah.williams (currently User)
Action: Promote to Admin
Result: sarah.williams can now access Admin Panel
```

#### Delete User (Unchanged)
- Permanently removes the user account
- Cannot recover without database backup
- Cannot delete your own account

---

### 2. System Statistics Dashboard (NEW!)

Monitor system health and usage metrics at a glance.

**Available Metrics:**
- **Total Users** — All user accounts in system
- **Active Users** — Users with is_active=true
- **Admin Users** — Users with admin role
- **Total Records** — All data records in database
- **Last Update Timestamp** — When stats were refreshed

**How to Use:**
1. Click Admin Panel → **System Stats** tab
2. View metrics in KPI cards
3. Click **"Refresh"** button to update

**API Endpoint:**
```
GET /api/admin/system/stats
```

**Response Example:**
```json
{
  "total_users": 12,
  "active_users": 10,
  "admin_users": 2,
  "total_records": 2451,
  "date_generated": "2024-03-15T14:30:00Z"
}
```

---

### 3. Database Backup Management (NEW!)

Automatic timestamped backups with download and restore capabilities.

**Features:**
- **Create Backup:** One-click backup with automatic naming
- **List Backups:** View all backup files with dates and sizes
- **Download Backup:** Download backup files for offsite storage
- **Backup Location:** `/data/backups/srwb_YYYYMMDD_HHMMSS.db`

**Backup Naming Convention:**
```
srwb_20240315_143000.db    // Created 2024-03-15 at 14:30:00
srwb_20240315_120000.db    // Created 2024-03-15 at 12:00:00
```

**How to Use:**

**Create New Backup:**
1. Go to Admin Panel → **Backups** tab
2. Click **"Create Backup Now"**
3. Wait for success message
4. New backup appears in list

**Download Existing Backup:**
1. Go to Backups tab
2. Find backup in table
3. Click **"Download"**
4. Browser downloads `.db` file

**Restore from Backup:**
(Contact IT for restoration procedures)

**API Endpoints:**
```
POST /api/admin/system/backup              # Create backup
GET  /api/admin/system/backups             # List all backups
GET  /api/admin/system/backups/{id}/download  # Download backup
```

---

### 4. Activity Log Viewer (NEW!)

Track system activities and administrative actions.

**Logged Activities:**
- User creation/deletion/updates
- Backup creation
- User logins (in future version)
- Data uploads/exports (in future version)
- Configuration changes (in future version)

**Current Implementation:**
Mock data showing example activities. Production version will query actual activity log table.

**How to Use:**
1. Go to Admin Panel → **Activity** tab
2. View recent activities in chronological order (newest first)
3. Use **"Filter"** dropdown to filter by activity type
4. Click **"Refresh"** to reload latest activities

**Filter Options:**
- All Activities (default)
- User Created
- User Deleted
- User Updated
- Backup Created
- Login

**Example Activities:**
```
Timestamp           | Action      | User  | Details
2024-03-15 14:30   | backup_created | admin | Manual backup triggered
2024-03-15 13:45   | user_created   | admin | Created user john.doe
2024-03-15 10:20   | user_updated   | admin | Updated role of jane.smith to admin
```

**API Endpoint:**
```
GET /api/admin/system/logs?limit=100
```

---

## Admin Panel Layout

### Tab Navigation
The Admin Panel now uses a tabbed interface for better organization:

```
┌─────────────────────────────────────────────┐
│  [Users] [System Stats] [Backups] [Activity] │
├─────────────────────────────────────────────┤
│                                             │
│  • Users Tab:                               │
│    - Create New User button                 │
│    - Users table with Edit/Delete actions   │
│                                             │
│  • System Stats Tab:                        │
│    - 4 KPI cards showing metrics            │
│    - Refresh button                         │
│    - Last update timestamp                  │
│                                             │
│  • Backups Tab:                             │
│    - Create Backup button                   │
│    - Backups table with download            │
│    - Backup file info (size, date)          │
│                                             │
│  • Activity Tab:                            │
│    - Filter dropdown                        │
│    - Activity log table                     │
│    - Refresh button                         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Dialog Boxes

### Edit User Dialog
Opens when you click "Edit" on a user in the Users tab.

**Fields:**
- **Username** (read-only) — Cannot change username
- **Role** (dropdown) — Change to admin/user/viewer
- **Account Active** (checkbox) — Toggle active status

**Buttons:**
- **Save Changes** — Apply edits
- **Cancel** — Close without saving

**Example:**
```
┌─────────────────────────────────┐
│       Edit User                 │
├─────────────────────────────────┤
│ Username:                       │
│ [john.doe]  (read-only)         │
│                                 │
│ Role:                           │
│ [Dropdown: Viewer/User/Admin] ▼ │
│                                 │
│ ☑ Account Active               │
│                                 │
│ [Save Changes] [Cancel]         │
└─────────────────────────────────┘
```

---

## Security Considerations

### Password & Access
- Edit operations are authenticated with JWT
- Admin role is required for all admin operations
- Passwords are not exposed in edit dialog
- Cannot change passwords via edit dialog (use auth/change-password endpoint)

### Data Integrity
- Cannot edit yourself into a non-admin role
- Cannot deactivate your own account
- Backups are server-side only (no user data exposure)

### Audit Trail
- All admin actions are logged (in future version)
- Activity logs are read-only for admins

---

## Common Tasks

### Promote a User to Admin
1. Admin Panel → Users tab
2. Find user in table
3. Click "Edit"
4. Change Role to "Admin"
5. Click "Save Changes"
6. User can now access Admin Panel

### Temporarily Disable a User
1. Admin Panel → Users tab
2. Click "Edit"
3. Uncheck "Account Active"
4. Click "Save Changes"
5. User cannot log in until re-enabled

### Create Regular Backup
1. Admin Panel → Backups tab
2. Click "Create Backup Now"
3. Wait for "Backup created" message
4. Backup appears in table

### Download Backup for Safe Storage
1. Admin Panel → Backups tab
2. Find the backup you want
3. Click "Download"
4. Save file to secure location
5. Test restoration before considering it official backup

---

## API Reference

### User Management
```
GET    /api/admin/users                    # List all users
POST   /api/admin/users                    # Create user
PUT    /api/admin/users/{id}               # Edit user (role, active status)
DELETE /api/admin/users/{id}               # Delete user
POST   /api/admin/users/{id}/reset-password # Reset password
```

### System Administration
```
GET    /api/admin/system/stats              # Get statistics
POST   /api/admin/system/backup             # Create backup
GET    /api/admin/system/backups            # List backups
GET    /api/admin/system/backups/{id}/download # Download backup
GET    /api/admin/system/logs               # Get activity logs
```

### Request/Response Examples

**Edit User Request:**
```json
PUT /api/admin/users/5
{
  "role": "admin",
  "is_active": true
}
```

**Edit User Response:**
```json
{
  "id": 5,
  "username": "john.doe",
  "role": "admin",
  "is_active": true,
  "created_at": "2024-02-15T10:30:00",
  "created_by": "admin"
}
```

**List Backups Response:**
```json
[
  {
    "filename": "srwb_20240315_143000.db",
    "created_at": "2024-03-15T14:30:00Z",
    "size_bytes": 5242880
  },
  {
    "filename": "srwb_20240315_120000.db",
    "created_at": "2024-03-15T12:00:00Z",
    "size_bytes": 5238144
  }
]
```

---

## Troubleshooting

### "Cannot save changes - error updating user"
- Check that the user still exists
- Ensure your token hasn't expired (re-login)
- Try refreshing the users list

### "Backup failed" message
- Check that `/data/backups/` directory exists
- Ensure sufficient disk space
- Check file permissions on data directory

### Activity log not showing my actions
- Activity log is a mock implementation in this version
- Real audit logging will be added in next phase
- Refresh the page to see latest logs

### Can't download backup file
- Try clicking "Refresh" to reload backup list
- Check browser download settings
- Backup file may have special characters - use browser's "Save As"

---

## Best Practices

### User Management
1. **Regular Cleanup:** Remove inactive/test users quarterly
2. **Role Assignment:** Use principle of least privilege
3. **Password Changes:** Have users change password on first login
4. **Documentation:** Keep notes on why users were created/deleted

### Backup Strategy
1. **Daily Backups:** Create at least daily backup (manual for now)
2. **Offsite Storage:** Download and store backups away from server
3. **Test Restoration:** Periodically test backup restoration
4. **Naming Convention:** Use descriptive filenames for context
5. **Retention:** Keep at least 7 days of backups (30 recommended)

### Security
1. **Admin Accounts:** Limit number of admin users
2. **Monitoring:** Check activity logs regularly (once implemented)
3. **Access Control:** Use strong passwords for admin accounts
4. **Session Timeout:** Logout after admin work is complete

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v1.1.0 | 2024-03-15 | Edit user dialog, system stats, backups, activity logs |
| v1.0.0 | 2024-03-10 | Initial admin panel with user creation and deletion |

---

## Coming in Next Phase

- 🔐 Password reset tool for users who forgot passwords
- 📊 Real system activity audit logging
- 🔄 Database restore from backup feature
- 📈 System health monitoring (CPU, memory, disk)
- 📅 Scheduled automated backups
- 🔍 Advanced activity log filtering and search
- 📤 Bulk user operations (import/export)
- 🌐 LDAP/Active Directory integration

---

## Support

For issues or feature requests:
- GitHub: https://github.com/kayibabe/opsvisual/issues
- Email: IT Support <it@srwb.org>

---

*Enhanced Admin Panel Documentation v1.1.0*
*Last Updated: 2024-03-15*
