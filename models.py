from datetime import datetime
from config import db, ma
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Text, UniqueConstraint


class Project(db.Model):
    __tablename__ = "project"
    __table_args__ = (
        UniqueConstraint("p_id", "t_id"),
    )
    p_id = db.Column(db.String(5), nullable=False, primary_key=True)
    p_name = db.Column(db.String(20), nullable=False, primary_key=True)
    t_id = db.Column(db.String(5), nullable=False)
    t_name = db.Column(db.String(20), nullable=False)
    p_from_date = db.Column(db.Date, nullable=False)
    p_to_date = db.Column(db.Date, nullable=False)
    required_skill = db.Column(db.String(20), nullable=False)


class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        sqla_session = db.session