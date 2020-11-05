from server import db
from app.myconfig import ma
from sqlalchemy import UniqueConstraint


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

    def __init__(self, p_name, t_id, t_name, p_from_date, p_to_date, required_skill):
        self.p_name = p_name
        self.t_id = t_id
        self.t_name = t_name
        self.p_from_date = p_from_date
        self.p_to_date = p_to_date
        self.required_skill = required_skill


    def __repr__(self):
        return '<p_id {}>'.format(self.p_id)


class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project
        sqla_session = db.session