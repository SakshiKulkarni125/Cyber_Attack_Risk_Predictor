from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.database.base import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    attack_type = Column(String, nullable=False)
    attack_probability = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)