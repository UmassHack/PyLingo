import speech_recognition as sr
from pydub import *

class SpeechToText:

	def __init__(self):
		self.r = sr.Recognizer()
		self.m = sr.Microphone()
		self.r.pause_threshold = 0.5
		self.r.energy_threshold = 1500
		self.value = None
		self.changed = False

	def listen(self):
		try:
			m = self.m
			r = self.r
			print("A moment of silence, please...")
			#with m as source: r.adjust_for_ambient_noise(source)
			print("Set minimum energy threshold to {}".format(r.energy_threshold))
			print("Say something!")
			with m as source: audio = r.listen(source)
			
			data = audio.get_wav_data()
			wav_writer = open('wav_file.wav', "wb")
			wav_writer.write(data)
			wav_writer.close()
			sound = AudioSegment.from_file('wav_file.wav', format ="wav")
			trimmed_sound = self.__detect_background_noise(sound)
			new_audio = sr.AudioData(trimmed_sound.raw_data, trimmed_sound.frame_rate, trimmed_sound.sample_width)
			print("Got it! Now to recognize it...")
			try:
				# recognize speech using Google Speech Recognition
				value = r.recognize_google(new_audio)
				# we need some special handling here to correctly print unicode characters to standard output
				if str is bytes:  # this version of Python uses bytes for strings (Python 2)
					print(u"You said {}".format(value).encode("utf-8"))
					self.value = format(value)
				else:  # this version of Python uses unicode for strings (Python 3+)
					print("You said {}".format(value))
					self.value = format(value)
			except sr.UnknownValueError:
				print("Error")
				self.value = "Error"
			except sr.RequestError as e:
				print("Error".format(e))
				self.value = format(e)
			# return self.value
		except KeyboardInterrupt:
			pass

	def getSentence(self):
		return self.value
		
	def __detect_background_noise(self, sound, silence_threshold = 50.0, chunk_size=10):

		return sound.high_pass_filter(sound.max_possible_amplitude//2)
