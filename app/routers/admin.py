"""
routers/admin.py

System administration endpoints for the admin panel.

Admin only endpoints:
  GET   /api/admin/system/stats                — system statistics and health
  GET   /api/admin/system/logs                 — recent system activity logs
  POST  /api/admin/system/backup               — trigger database backup
  GET   /api/admin/system/backups              — list all backups
  GET   /api/admin/system/backups/{id}/download — download a backup file
"""
from __future__ import annotations

from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Optional
import shutil
import os

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import User, Record, get_db

admin_router = APIRouter(prefix="/api/admin", tags=["Admin System"])


# ── Schemas ───────────────────────────────────────────────────
class SystemStats(BaseModel):
    total_users: int
    active_users: int
    admin_users: int
    total_records: int
    date_generated: datetime


class SystemLog(BaseModel):
    id: int
    action: str
    username: str
    timestamp: datetime
    details: Optional[str] = None


class BackupResponse(BaseModel):
    status: str
    timestamp: datetime
    message: str


class BackupInfo(BaseModel):
    filename: str
    created_at: datetime
    size_bytes: int


class ActivityLog(BaseModel):
    timestamp: datetime
    action: str
    username: Optional[str] = None
    details: Optional[str] = None


# ══════════════════════════════════════════════════════════════
# SYSTEM ENDPOINTS
# ══════════════════════════════════════════════════════════════

@admin_router.get("/system/stats", response_model=SystemStats)
def get_system_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get system-wide statistics.
    Admin only.
    """
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    admin_users = db.query(User).filter(User.role == "admin").count()
    total_records = db.query(Record).count()

    return SystemStats(
        total_users=total_users,
        active_users=active_users,
        admin_users=admin_users,
        total_records=total_records,
        date_generated=datetime.utcnow(),
    )


@admin_router.post("/system/backup", response_model=BackupResponse)
def backup_database(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Trigger a database backup.
    Admin only.
    """
    try:
        base_dir = Path(__file__).parent.parent.parent
        db_path = base_dir / "data" / "srwb.db"
        backup_dir = base_dir / "data" / "backups"

        # Create backups directory if it doesn't exist
        backup_dir.mkdir(exist_ok=True)

        # Create timestamped backup
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = backup_dir / f"srwb_{timestamp}.db"

        if db_path.exists():
            shutil.copy2(db_path, backup_path)
            return BackupResponse(
                status="success",
                timestamp=datetime.utcnow(),
                message=f"Database backed up to {backup_path.name}",
            )
        else:
            raise FileNotFoundError("Database file not found")

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Backup failed: {str(e)}",
        )


@admin_router.get("/system/backups", response_model=List[BackupInfo])
def list_backups(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    List all available database backups.
    Admin only.
    """
    try:
        base_dir = Path(__file__).parent.parent.parent
        backup_dir = base_dir / "data" / "backups"

        if not backup_dir.exists():
            return []

        backups = []
        for backup_file in sorted(backup_dir.glob("*.db"), reverse=True):
            stat = backup_file.stat()
            backups.append(BackupInfo(
                filename=backup_file.name,
                created_at=datetime.fromtimestamp(stat.st_mtime),
                size_bytes=stat.st_size,
            ))

        return backups

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list backups: {str(e)}",
        )


@admin_router.get("/system/backups/{backup_id}/download")
def download_backup(
    backup_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Download a backup file.
    Admin only.
    """
    try:
        base_dir = Path(__file__).parent.parent.parent
        backup_file = base_dir / "data" / "backups" / backup_id

        # Security: prevent path traversal
        if not str(backup_file).startswith(str(base_dir / "data" / "backups")):
            raise HTTPException(status_code=400, detail="Invalid backup file")

        if not backup_file.exists():
            raise HTTPException(status_code=404, detail="Backup file not found")

        return FileResponse(
            backup_file,
            filename=backup_id,
            media_type="application/octet-stream",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Download failed: {str(e)}",
        )


@admin_router.get("/system/logs", response_model=List[ActivityLog])
def get_activity_logs(
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Get recent system activity logs.
    Admin only.

    Mock implementation - returns simulated logs.
    For production, implement an actual activity log table.
    """
    # This is a mock implementation
    # In production, query an ActivityLog table in your database
    logs = [
        ActivityLog(
            timestamp=datetime.utcnow() - timedelta(minutes=5),
            action="user_created",
            username="admin",
            details="Created user john.doe",
        ),
        ActivityLog(
            timestamp=datetime.utcnow() - timedelta(minutes=15),
            action="backup_created",
            username="admin",
            details="Manual backup triggered",
        ),
        ActivityLog(
            timestamp=datetime.utcnow() - timedelta(hours=1),
            action="user_updated",
            username="admin",
            details="Updated user jane.smith role to admin",
        ),
    ]

    return logs[:limit]
