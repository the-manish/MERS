
def predict_sentiment(statement):
    
    import pandas as pd
    from sklearn.feature_extraction.text import CountVectorizer
    from sklearn.naive_bayes import MultinomialNB
    import os
    
    # Get the current directory of the script
    current_directory = os.path.dirname(os.path.realpath(__file__))

    # Construct the file path to the Excel file
    excel_file_path = os.path.join(current_directory, 'emotion_output.xlsx')

    # Load the dataset
    df = pd.read_excel(excel_file_path)

    # Preprocess the text data by converting to lowercase
    df['text '] = df['text '].str.lower()

    # Text vectorization using bag-of-words approach
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(df['text '])
    y = df['mood']

    # Train the Naive Bayes classifier
    nb_classifier = MultinomialNB()
    nb_classifier.fit(X, y)

    # Preprocess and vectorize the statement
    statement_processed = statement.lower()
    statement_vectorized = vectorizer.transform([statement_processed])

    # Predict sentiment
    prediction = nb_classifier.predict(statement_vectorized)

    # Return the predicted sentiment
    return prediction[0]

