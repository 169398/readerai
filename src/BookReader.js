import React, { useState, useEffect } from "react";

const BookReader = ({ textToSpeech }) => {
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const audioUrl = await textToSpeech();
      setAudioUrl(audioUrl);
    };

    fetchData();
  }, [textToSpeech]);

  return (
    <div>
      <audio controls>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BookReader;
