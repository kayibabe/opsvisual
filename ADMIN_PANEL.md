Admin Panel Documentation
==========================

## Overview

The Admin Panel is a comprehensive system administration interface built into the SRWB Operations Dashboard. It provides administrators with tools to manage users, monitor system health, and perform administrative tasks.

**Access:** Admin Panel is only visible to users with the `admin` role.

---

## Features

### 1. User Management

#### View All Users
- **Location:** Admin Panel → User Management section
- **Display:** Table showing all users with:
  - Username
  - Role (Viewer, User, or Admin) — color-coded
  - Status (Active/Inactive)
  - Account creation date
  - Action buttons

#### Create New User
- **Button:** "Create New User"
- **Dialog Opens With Fields:**
  - Username (required)
  - Password (required, minimum 8 characters)
  - Role (dropdown: Viewer, User, or Admin)
- **Validation:**
  - Username must be unique
  - Username must be at least 2 characters
  - Password must be at least 8 characters
- **Success:** User account created immediately, table refreshes
- **Error Handling:** Displays clear error message if creation fails

#### Edit User
- **Button:** "Edit" next to user (coming in next phase)
- **Planned Features:**
  - Change user role
  - Activate/deactivate account
  - Reset password for users who forget theirs

#### Delete User
- **Button:** "Delete" next to user
- **Safeguards:**
  - Requires confirmation
  - Cannot delete yourself
  - Deleted users cannot be recovered (use backups)

---

### 2. System Administration (Planned)

The backend includes API endpoints for future system admin features:

#### System Statistics
- **Endpoint:** `GET /api/admin/system/stats`
- **Returns:**
  - Total users count
  - Active users count
  - Admin users count
  - Total records in database
  - Timestamp

#### Database Backup
- **Endpoint:** `POST /api/admin/system/backup`
- **Function:** Trigger a timestamped database backup
- **Location:** `data/backups/srwb_YYYYMMDD_HHMMSS.db`
- **Returns:** Status and backup file location

---

## API Reference

### Authentication

All admin endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

And the authenticated user must have the `admin` role.

### User Management Endpoints

#### List All Users
```
GET /api/admin/users
```
**Response (200 OK):**
```json
[
  {
    "id": 1,
    "username": "admin",
    "role": "admin",
    "is_active": true,
    "created_at": "2024-01-15T08:30:00",
    "created_by": null
  },
  {
    "id": 2,
    "username": "john.doe",
    "role": "user",
    "is_active": true,
    "created_at": "2024-02-20T14:15:00",
    "created_by": "admin"
  }
]
```

#### Create User
```
POST /api/admin/users
Content-Type: application/json

{
  "username": "jane.smith",
  "password": "SecurePassword123",
  "role": "user"
}
```
**Response (201 Created):**
```json
{
  "id": 3,
  "username": "jane.smith",
  "role": "user",
  "is_active": true,
  "created_at": "2024-03-10T10:45:00",
  "created_by": "admin"
}
```

**Errors:**
- `400 Bad Request` — Password < 8 chars, invalid role
- `409 Conflict` — Username already exists

#### Update User
```
PUT /api/admin/users/{user_id}
Content-Type: application/json

{
  "role": "admin",
  "is_active": true
}
```
**Response (200 OK):** Updated user object

**Safeguards:**
- Admin cannot demote themselves
- Admin cannot deactivate their own account

#### Reset User Password
```
POST /api/admin/users/{user_id}/reset-password
Content-Type: application/json

{
  "new_password": "NewPassword123"
}
```
**Response (204 No Content)**

#### Delete User
```
DELETE /api/admin/users/{user_id}
```
**Response (204 No Content)**

**Safeguards:**
- Admin cannot delete their own account
- User record is permanently deleted

---

## User Roles Explained

### Admin
- **Permissions:**
  - View all dashboard pages
  - Export data to CSV
  - Upload Excel data
  - Create/edit/delete users
  - Access admin panel
  - Manage system administration
- **Use Case:** System administrators, corporate planning team

### User
- **Permissions:**
  - View all dashboard pages
  - Export data to CSV
- **Use Case:** Operations managers, analysts
- **No Access:** Uploading data, user management

### Viewer
- **Permissions:**
  - View all dashboard pages (read-only)
- **No Access:** Export data, upload data, user management
- **Use Case:** Read-only stakeholders, consultants

---

## Security Considerations

### Password Policy
- Minimum 8 characters
- No complexity requirements enforced (can be customized in `app/routers/users.py`)
- Stored as bcrypt hashes (never in plain text)

### Session Management
- JWT tokens expire after 8 hours
- Token includes user role for role-based access control
- Invalid tokens are rejected with 401 Unauthorized

### Admin Access
- All admin endpoints require `require_admin` dependency
- Authorization checked at the FastAPI router level
- Enforcement is cryptographic (JWT verification + role check)

### User Protection
- Identical error messages for login (prevent username enumeration)
- Admin cannot delete themselves
- Admin cannot demote or deactivate themselves
- Confirmation required before deleting users

---

## File Locations

### Frontend
- **HTML/UI:** `app/static/index.html` (lines ~387-550 for admin panel)
- **JavaScript:** Integrated in the same HTML file
  - `showCreateUserDialog()` — Open create user modal
  - `handleCreateUser()` — Submit new user form
  - `loadUsers()` — Fetch and render users table
  - `deleteUser()` — Delete user account

### Backend
- **User Router:** `app/routers/users.py`
  - `auth_router` — Login, password change
  - `admin_router` (from `users.py`) — User management CRUD
- **System Admin Router:** `app/routers/admin.py`
  - System stats
  - Database backup

---

## Future Enhancements

1. **Edit User Dialog**
   - Change role without deleting user
   - Activate/deactivate accounts
   - View account details

2. **System Dashboard**
   - Real-time system statistics
   - Database size and growth trends
   - Recent audit logs
   - User activity history

3. **Audit Logging**
   - Track all admin actions
   - Log user logins/logouts
   - Record data uploads/exports
   - Maintain compliance records

4. **Advanced Backups**
   - Automatic scheduled backups
   - Backup restoration interface
   - Backup history and retention policy
   - Cloud backup support

5. **Password Complexity**
   - Configurable password rules
   - Forced password expiry
   - Password history to prevent reuse

6. **Two-Factor Authentication**
   - TOTP-based 2FA
   - SMS-based OTP
   - Recovery codes

---

## Troubleshooting

### "Admin Panel not visible"
**Cause:** Current user role is not `admin`
**Solution:** Ask an admin to promote your account to admin role

### "Failed to load users"
**Cause:** Network error or backend unavailable
**Solution:** Check that the backend server is running and accessible

### "Username already exists"
**Cause:** Trying to create user with duplicate username
**Solution:** Choose a different username

### "Password must be at least 8 characters"
**Cause:** Password provided is too short
**Solution:** Use a password with 8+ characters

---

## Development Notes

### Adding New Admin Features

1. **Backend Endpoint** (`app/routers/admin.py` or similar):
   ```python
   @admin_router.post("/feature-name")
   def new_feature(
       db: Session = Depends(get_db),
       current_user: User = Depends(get_current_user),
   ):
       # Implementation
       return response
   ```

2. **Frontend Function** (`app/static/index.html`):
   ```javascript
   async function loadAdminFeature() {
       const token = getToken();
       const res = await fetch(API + '/api/admin/feature-name', {
           headers: { Authorization: 'Bearer ' + token }
       });
       // Handle response
   }
   ```

3. **Add to Admin Page** (HTML):
   - Add button or section in `page-admin` div
   - Add event handler to call frontend function

---

## Contact & Support

For issues or feature requests related to the Admin Panel:
- Internal: Contact SRWB IT / Corporate Planning
- GitHub Issues: [opsvisual repository](https://github.com/kayibabe/opsvisual)

---

*Last Updated: 2024*
*Admin Panel Version: 1.0.0*
