from back.main import app
import io
import numpy as np
import tensorflow as tf
from fastapi.testclient import TestClient

def mock_process(file):
    return np.zeros((1, 74, 420, 1))

class MockModel:
    def predict(self, cqt):
        return np.zeros(37)
    
def test_predict(monkeypatch):
    monkeypatch.setattr("back.main.process", mock_process)
    monkeypatch.setattr("back.main.model", MockModel())

    files = {"file": ("mock.wav", b"mock audio", "audio/wav")}

    response = TestClient(app).post("/predict", files=files)

    assert response.status_code == 200
    assert "predictions" in response.json()
    assert response.json()["predictions"] == np.zeros(37).tolist()


