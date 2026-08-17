from fastapi import FastAPI
app = FastAPI(
    title = "Cyber Attack Risk Predictor API",
    version = "1.0.0"
)

@app.get("/")
def home():
    return {
        "message" : "Cyber Attack Risk Predictor API is running"
    }

@app.get("/health")
def health():
    return{
        "status" : "healthy"
    }