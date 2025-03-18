from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from back.preprocess import process
import tensorflow as tf
import io

app = FastAPI()
model = tf.keras.models.load_model("models/model.h5")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    audio = await file.read()

    audio_buffer = io.BytesIO(audio)

    cqt = process(audio_buffer)

    prediction = model.predict(cqt)

    print(prediction.tolist())
    return {"predictions":prediction.tolist()}
