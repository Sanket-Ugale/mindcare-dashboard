"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VideoCallPage = () => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setIsWindowDefined(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    const appointmentId = 1; // replace with your appointment id
    fetch(`https://mindcare-app.onrender.com/api/appointments/${appointmentId}`)
    .then(response => response.json())
    .then(data => setToken(data.payload[0].appointment_token))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  const AgoraUIKit = dynamic(() => import("agora-react-uikit"), {
    ssr: false,
  });

  const rtcProps = {
    appId: "ced4e343c11f4cefb701f5c8ec2bf880",
    channel: "Appointment1",
    token: token,
  };

  return isWindowDefined ? (
    videoCall ? (
      <div
        style={{ display: "flex", justifyContent: "center", height: "90vh" }}
      >
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
      </div>
    ) : (
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded-md"
        onClick={() => setVideoCall(true)}
      >
        Join
      </button>
    )
  ) : null;
};

export default VideoCallPage;