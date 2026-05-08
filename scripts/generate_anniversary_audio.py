import wave
import math
import struct
import random
import os

os.makedirs('public/audio', exist_ok=True)

sr = 44100

duration = 20  # seconds
freq = 220
amplitude = 11000
path = 'public/audio/anniversary-song.wav'

with wave.open(path, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sr)

    for i in range(int(sr * duration)):
        t = i / sr
        tone = 0.25 * math.sin(2 * math.pi * freq * t)
        tone += 0.12 * math.sin(2 * math.pi * freq * 1.5 * t)
        tone += 0.08 * math.sin(2 * math.pi * freq * 0.7 * t)
        noise = (random.random() * 2 - 1) * 0.05
        sample = int((tone + noise) * amplitude)
        sample = max(-32768, min(32767, sample))
        wf.writeframes(struct.pack('<hh', sample, sample))

print('Created', path)
