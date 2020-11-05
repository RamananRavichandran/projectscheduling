import os
from server import db

# Data to initialize database with
project = [
    {"p_id": "P01", "p_name": "Farrell", "t_id": "T01", "t_name": "data collection", "p_from_date": "2020-01-04", "p_to_date" : "2020-01-09", "required_skill" : "java"},
    {"p_id": "P01", "p_name": "Farrell", "t_id": "T02", "t_name": "design architecture","p_from_date": "2020-01-10", "p_to_date": "2020-01-13", "required_skill": "sql"}
]

# Delete database file if it exists currently
if os.path.exists("project.db"):
    os.remove("project.db")

# Create the database
db.create_all()

# iterate over the PEOPLE structure and populate the database
for pro in project:
    p = project(p_id=project.get("p_id"), t_id=project.get("t_id"))
    db.session.add(p)

db.session.commit()