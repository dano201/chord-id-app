import librosa
import numpy as np
import tensorflow as tf

def process(file):
    y, sr = librosa.load(file, sr=16000)
    
    onset = librosa.onset.onset_detect(y=y, sr=sr, backtrack=True)
    
    start = 0 if len(onset) == 0 else max(onset[0] * 512 - int(sr * 0.5), 0)
    y = y[start:]

    cqt = librosa.cqt(y, sr=sr, fmin=librosa.note_to_hz('E2'), n_bins=74, bins_per_octave=24)
    cqt_db = librosa.amplitude_to_db(np.abs(cqt), ref=np.max)

    cqt_db = (cqt_db - np.min(cqt_db)) / (np.max(cqt_db) - np.min(cqt_db))

    cqt_db = tf.expand_dims(cqt_db, axis=0)
    cqt_db = tf.expand_dims(cqt_db, axis=-1)

    return cqt_db