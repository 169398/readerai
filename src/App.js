import React, { useState } from "react";
import BookUploader from "./BookUploader";
import BookReader from "./BookReader";

const App = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleUpload = (file) => {
    setUploadedFile(file);
  };

  const textToSpeech = async () => {
    // Replace these values with your own Speech API key and endpoint
    const apiKey = "YOUR_SPEECH_API_KEY";
    const endpoint = "YOUR_SPEECH_API_ENDPOINT";

    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      apiKey,
      "eastus"
    ); // Update the region based on your Azure region

    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    const result = await synthesizer.speakTextAsync("Hello, this is a test."); // You can replace this text with the content of your book

    if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
      const audioBlob = result.audioData;
      const audioUrl = URL.createObjectURL(
        new Blob([audioBlob], { type: "audio/wav" })
      );
      return audioUrl;
    } else {
      console.error(`Speech synthesis failed: ${result.errorDetails}`);
      return null;
    }
  };

  return (
    <div>
      <h1>Book Reader App</h1>
      <BookUploader onUpload={handleUpload} />
      {uploadedFile && <BookReader textToSpeech={textToSpeech} />}
    </div>
  );
};

export default App;
