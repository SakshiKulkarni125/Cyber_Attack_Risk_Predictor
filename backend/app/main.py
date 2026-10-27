from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware

from ml.predict import predict_attack

from app.database.database import engine, get_db
from app.database.base import Base
from app.models.prediction import Prediction


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Cyber Attack Risk Predictor API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    sbytes: float
    smean: float
    ct_dst_src_ltm: float
    ct_srv_dst: float
    sload: float
    ct_srv_src: float
    sttl: float
    service_minus: float
    dbytes: float
    dmean: float
    dload: float
    proto_udp: float
    rate: float
    dur: float
    ct_dst_sport_ltm: float


@app.get("/")
def home():
    return {
        "message": "Cyber Attack Risk Predictor API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def predict(
    data: PredictionInput,
    db: Session = Depends(get_db)
):
    input_data = data.model_dump()

    input_data["service_-"] = input_data.pop("service_minus")

    result = predict_attack(input_data)

    prediction = Prediction(
        attack_type=result["attack_type"],
        attack_probability=result["attack_probability"]
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return result