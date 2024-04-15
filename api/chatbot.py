
# from rest_framework.decorators import api_view
# # import nltk
# from rest_framework.response import Response
# import re
# import os
# import pandas as pd
# import numpy as np
# # from tensorflow.keras.utils import plot_model
# from keras.models import load_model

# pd.set_option('mode.chained_assignment', None)
# current_directory = os.path.dirname(os.path.realpath(__file__))
# csv_file_path = os.path.join(current_directory, 'mentalhealth.csv')

# data=pd.read_csv(csv_file_path, nrows=20)

# # data.head()

# # data preprocessing

# for i in range(data.shape[0]):
#   data['Answers'][i]=re.sub(r'\n', ' ',data['Answers'][i])
#   data['Answers'][i]=re.sub('\(', '',data['Answers'][i])
#   data['Answers'][i]=re.sub(r'\)', '',data['Answers'][i])
#   data['Answers'][i]=re.sub(r',', '',data['Answers'][i])
#   data['Answers'][i]=re.sub(r'-', '',data['Answers'][i])
#   data['Answers'][i]=re.sub(r'/', '',data['Answers'][i])
#   data['Answers'][i]=re.sub(r'/', '',data['Answers'][i])

# pairs=[]

# for i in range(data.shape[0]):
#   pairs.append(((data['Questions'][i]),data['Answers'][i]))

# pairs

# input_docs = []
# target_docs = []
# input_tokens = set()
# target_tokens = set()

# for line in pairs:

#   input_doc, target_doc = line[0], line[1]

#   # Appending each input sentence to input_docs
#   input_docs.append(input_doc)

#   # Splitting words from punctuation
#   target_doc = " ".join(re.findall(r"[\w']+|[^\s\w]", target_doc))

#   # Redefine target_doc below and append it to target_docs
#   target_doc = '<START> ' + target_doc + ' <END>'

#   target_docs.append(target_doc)

#   for token in re.findall(r"[\w']+|[^\s\w]", input_doc):
#     if token not in input_tokens:
#       input_tokens.add(token)
#   for token in target_doc.split():
#     if token not in target_tokens:
#       target_tokens.add(token)
# input_tokens = sorted(list(input_tokens))  # contains all words of input_docs
# target_tokens = sorted(list(target_tokens))
# num_encoder_tokens = len(input_tokens)
# num_decoder_tokens = len(target_tokens)

# input_docs

# target_docs

# input_features_dict = dict([(token, i) for i, token in enumerate(input_tokens)])
# target_features_dict = dict([(token, i) for i, token in enumerate(target_tokens)])

# reverse_input_features_dict = dict((i, token) for token, i in input_features_dict.items())
# reverse_target_features_dict = dict((i, token) for token, i in target_features_dict.items())

# input_features_dict

# max_encoder_seq_length = max([len(re.findall(r"[\w']+|[^\s\w]", input_doc)) for input_doc in input_docs])
# max_decoder_seq_length = max([len(re.findall(r"[\w']+|[^\s\w]", target_doc)) for target_doc in target_docs])

# encoder_input_data = np.zeros(
#     (len(input_docs), max_encoder_seq_length, num_encoder_tokens),
#     dtype='float32')
# decoder_input_data = np.zeros(
#     (len(input_docs), max_decoder_seq_length, num_decoder_tokens),
#     dtype='float32')
# decoder_target_data = np.zeros(
#     (len(input_docs), max_decoder_seq_length, num_decoder_tokens),
#     dtype='float32')
# for line, (input_doc, target_doc) in enumerate(zip(input_docs, target_docs)):
#     for timestep, token in enumerate(re.findall(r"[\w']+|[^\s\w]", input_doc)):
#         #Assign 1. for the current line, timestep, & word in encoder_input_data
#         encoder_input_data[line, timestep, input_features_dict[token]] = 1.

#     for timestep, token in enumerate(target_doc.split()):
#         decoder_input_data[line, timestep, target_features_dict[token]] = 1.
#         if timestep > 0:
#             decoder_target_data[line, timestep - 1, target_features_dict[token]] = 1.

# encoder_input_data

# decoder_target_data

# # from tensorflow import keras
# from keras.layers import Input, LSTM, Dense
# from keras.models import Model
# dimensionality = 256 # Dimensionality
# batch_size = 10   # The batch size and number of epochs
# epochs = 500

# #Encoder
# encoder_inputs = Input(shape=(None, num_encoder_tokens))
# encoder_lstm = LSTM(dimensionality, return_state=True)
# encoder_outputs, state_hidden, state_cell = encoder_lstm(encoder_inputs)
# encoder_states = [state_hidden, state_cell]

# #Decoder
# decoder_inputs = Input(shape=(None, num_decoder_tokens))
# decoder_lstm = LSTM(dimensionality, return_sequences=True, return_state=True)
# decoder_outputs, decoder_state_hidden, decoder_state_cell = decoder_lstm(decoder_inputs, initial_state=encoder_states)
# decoder_dense = Dense(num_decoder_tokens, activation='softmax')
# decoder_outputs = decoder_dense(decoder_outputs)

# # training_model = Model([encoder_inputs, decoder_inputs], decoder_outputs) # Compiling

# # training_model.summary()

# # plot_model(training_model, to_file='model_plot.png', show_shapes=True, show_layer_names=True)

# # training_model.compile(optimizer='rmsprop', loss='categorical_crossentropy', metrics=['accuracy'], sample_weight_mode='temporal')#Training
# # history1=training_model.fit([encoder_input_data, decoder_input_data], decoder_target_data, batch_size = batch_size, epochs = epochs, validation_split = 0.2)
# # training_model.save('training_model.h5')


# from keras.models import load_model

# model_file_path = os.path.join(current_directory, 'my_model.h5')
# training_model = load_model(model_file_path)
# encoder_inputs = training_model.input[0]
# encoder_outputs, state_h_enc, state_c_enc = training_model.layers[2].output
# encoder_states = [state_h_enc, state_c_enc]
# encoder_model = Model(encoder_inputs, encoder_states)

# latent_dim = 256
# decoder_state_input_hidden = Input(shape=(latent_dim,))
# decoder_state_input_cell = Input(shape=(latent_dim,))
# decoder_states_inputs = [decoder_state_input_hidden, decoder_state_input_cell]

# decoder_outputs, state_hidden, state_cell = decoder_lstm(decoder_inputs, initial_state=decoder_states_inputs)
# decoder_states = [state_hidden, state_cell]
# decoder_outputs = decoder_dense(decoder_outputs)

# decoder_model = Model([decoder_inputs] + decoder_states_inputs, [decoder_outputs] + decoder_states)

# training_model = load_model('training_model.h5')
# encoder_inputs = training_model.input[0]
# encoder_outputs, state_h_enc, state_c_enc = training_model.layers[2].output
# encoder_states = [state_h_enc, state_c_enc]
# encoder_model = Model(encoder_inputs, encoder_states)

# latent_dim = 256
# decoder_state_input_hidden = Input(shape=(latent_dim,))
# decoder_state_input_cell = Input(shape=(latent_dim,))
# decoder_states_inputs = [decoder_state_input_hidden, decoder_state_input_cell]
# decoder_outputs, state_hidden, state_cell = decoder_lstm(decoder_inputs, initial_state=decoder_states_inputs)
# decoder_states = [state_hidden, state_cell]
# decoder_outputs = decoder_dense(decoder_outputs)
# decoder_model = Model([decoder_inputs] + decoder_states_inputs, [decoder_outputs] + decoder_states)
# def decode_response(test_input):
#     #Getting the output states to pass into the decoder
#     states_value = encoder_model.predict(test_input)

#     #Generating empty target sequence of length 1
#     target_seq = np.zeros((1, 1, num_decoder_tokens))

#     #Setting the first token of target sequence with the start token
#     target_seq[0, 0, target_features_dict['<START>']] = 1.

#     #A variable to store our response word by word
#     decoded_sentence = ''

#     stop_condition = False
#     while not stop_condition:
#           #Predicting output tokens with probabilities and states
#           output_tokens, hidden_state, cell_state = decoder_model.predict([target_seq] + states_value)

#           #Choosing the one with highest probability
#           sampled_token_index = np.argmax(output_tokens[0, -1, :])
#           sampled_token = reverse_target_features_dict[sampled_token_index]
#           decoded_sentence += " " + sampled_token

#           #Stop if hit max length or found the stop token
#           if (sampled_token == '<END>' or len(decoded_sentence) > max_decoder_seq_length):
#             stop_condition = True

#           #Update the target sequence
#           target_seq = np.zeros((1, 1, num_decoder_tokens))
#           target_seq[0, 0, sampled_token_index] = 1.
#           #Update states
#           states_value = [hidden_state, cell_state]
#     return decoded_sentence

# class ChatBot:
#   negative_responses = ("no", "nope", "nah", "naw", "not a chance", "sorry")
#   exit_commands = ("quit", "pause", "exit", "goodbye", "bye", "later", "stop")

#   #Method to start the conversation
#   def start_chat(self,text):
#     user_response = text

#     if user_response in self.negative_responses:
#       print("Ok, have a great day!")
#       return
#     self.chat(user_response)

#   #Method to handle the conversation
#   def chat(self, reply):
#     while not self.make_exit(reply):
#       reply = input(self.generate_response(reply)+"\n")

#   def string_to_matrix(self, user_input):
#     tokens = re.findall(r"[\w']+|[^\s\w]", user_input)
#     user_input_matrix = np.zeros(
#       (1, max_encoder_seq_length, num_encoder_tokens),
#       dtype='float32')
#     for timestep, token in enumerate(tokens):
#       if token in input_features_dict:
#         user_input_matrix[0, timestep, input_features_dict[token]] = 1.
#     return user_input_matrix
#   def generate_response(self, user_input):
#     input_matrix = self.string_to_matrix(user_input)
#     chatbot_response = decode_response(input_matrix)
#     #Remove <START> and <END> tokens from chatbot_response
#     chatbot_response = chatbot_response.replace("<START>",'')
#     chatbot_response = chatbot_response.replace("<END>",'')
#     return chatbot_response
#   def make_exit(self, reply):
#     for exit_command in self.exit_commands:
#       if exit_command in reply:
#         print("Ok, have a great day!")
#         return True
#     return False      




# @api_view(['POST'])
# def chatbot_view(request):
#     if request.method == 'POST':   

#         chatbot = ChatBot()
#         # Get user input from the request
#         user_input = request.POST.get('input')

#         # Start chat and get chatbot response
#         chatbot_response = chatbot.start_chat(user_input)

#         # Return JSON response with chatbot's response
#         return Response({'response': chatbot_response})
#     else:
#         # Return empty response for GET requests
#         return Response({})

