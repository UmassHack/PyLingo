from pydub import *

def detect_background_noise(sound, silence_threshold = 50.0, chunk_size=10):

    return sound.high_pass_filter(sound.max_possible_amplitude//2)
    '''
    while abs(sound[trim_ms:trim_ms+chunk_size].dBFS) < silence_threshold:
        trim_ms += chunk_size
    return sound[trim_ms]
    '''
    #return sound_other
sound = AudioSegment.from_file("./audio1.wav", format ="wav")

trimmed_sound = detect_background_noise(sound)
trimmed_sound.export("stuff12.mp3", format="mp3")
print('done')
