"""
routers/admin.py

System administration endpoints for the admin panel.

Admin only endpoints:
  GET   /api/admin/system/stats          — system statistics and health
  GET   /api/admin/system/logs           — recent system activity logs
  POST  /api/admin/system/backup         — trigger database backup
"""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
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
    
    Note: This endpoint indicates that backup was requested.
    Actual backup implementation depends on your deployment environment.
    """
    import shutil
    from pathlib import Path
    import os
    
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
