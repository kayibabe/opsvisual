Admin Panel - Quick Start Guide
================================

## Accessing the Admin Panel

1. **Log in** with an admin account
2. **Look for** "Administration" section in the left sidebar (below "Debtors")
3. **Click** "Admin Panel" to open the admin interface

---

## Creating a New User

### Steps:
1. In the Admin Panel, click **"Create New User"** button
2. Fill in the form:
   - **Username:** Username for login (e.g., `john.doe`)
   - **Password:** Minimum 8 characters (e.g., `SecurePass123`)
   - **Role:** Choose from dropdown:
     - `Viewer` — Read-only dashboard access
     - `User` — Can view & export data
     - `Admin` — Full access + can manage users
3. Click **"Create"** to save the new user
4. The user will appear in the Users table and can now log in

### Example:
```
Username: sarah.williams
Password: WaterBoard2024!
Role: User
```

---

## Managing Users

### View Users
- The **Users** table displays all accounts with:
  - **Username** — Login name
  - **Role** — Color-coded (Red=Admin, Blue=User, Gray=Viewer)
  - **Status** — Active or Inactive
  - **Created** — Date account was created
  - **Actions** — Edit or Delete buttons

### Delete a User
1. Find the user in the table
2. Click **"Delete"** in the Actions column
3. Confirm the deletion
4. User account is permanently deleted (cannot recover without backup)

**Note:** You cannot delete your own account while logged in.

---

## Tips & Best Practices

### Password Management
- ✅ Use strong passwords (mix of upper, lower, numbers, symbols)
- ✅ Give users temporary passwords initially, let them change on first login
- ❌ Don't share passwords via email or chat
- ❌ Don't write passwords on paper or sticky notes

### User Roles
- **Viewer:** For dashboards and stakeholders who only need to read reports
- **User:** For operations staff who need to work with data
- **Admin:** Only for IT and corporate planning team members

### Account Maintenance
- Remove inactive users to keep the system clean
- Review user roles quarterly to match current responsibilities
- Create backup admin accounts in case primary admin is unavailable

### Backup
- The system creates automatic backups during operations
- For critical backups before major changes, contact IT

---

## Common Tasks

### "I created a user but they can't see the Admin Panel"
**Expected!** The Admin Panel is only for admin users.
If they need admin access, ask another admin to change their role to `admin`.

### "User forgot their password"
**Solution:** Only admins can reset passwords. Have them contact you with proof of identity, then:
1. Use the Edit function (coming soon)
2. Or delete and recreate the account with a temporary password

### "Need to change a user's role"
**Coming Soon!** The Edit User feature will allow role changes without deleting the account.
For now, you'll need to delete and recreate the user with the new role.

### "How many users can the system support?"
The system can handle hundreds of concurrent users. Contact IT if you need performance information.

---

## What's Coming in Next Update?

- ✨ **Edit User Dialog** — Change roles and activate/deactivate accounts
- ✨ **System Dashboard** — View database size, user activity, backup status
- ✨ **Audit Logs** — Track all admin actions
- ✨ **Password Reset Tool** — Set new passwords for users who forgot theirs
- ✨ **Bulk User Upload** — Create multiple users from a CSV file

---

## Getting Help

**If you get an error message:**
1. Read the error message carefully — it usually explains what went wrong
2. Refresh the page and try again
3. Check that the backend server is running
4. Contact IT support if the problem persists

**Common Error Messages:**
- `"Username already exists"` → Choose a different username
- `"Password must be at least 8 characters"` → Use a longer password
- `"Failed to load users"` → Server connection issue; refresh page
- `"You cannot delete your own account"` → Expected; have another admin delete it

---

## Quick Reference

| Task | Location | Role Required |
|------|----------|---|
| View Admin Panel | Left sidebar | Admin |
| Create User | Admin Panel → "Create New User" button | Admin |
| View All Users | Admin Panel → Users table | Admin |
| Delete User | Admin Panel → Users table → Delete button | Admin |
| Change Password | Top right → User menu (coming soon) | Any |
| Reset User Password | Edit User (coming soon) | Admin |
| View System Stats | Admin Panel → System Stats (coming soon) | Admin |
| Backup Database | Admin Panel → Backup button (coming soon) | Admin |

---

## Support

**Questions?**
- Check the full [Admin Panel Documentation](ADMIN_PANEL.md)
- Contact SRWB IT Team

**Found a bug?**
- Report on GitHub: https://github.com/kayibabe/opsvisual/issues

---

*Quick Start Guide v1.0*
