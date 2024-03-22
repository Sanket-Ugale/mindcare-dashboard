"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VideoCallPage = () => {
  const [isWindowDefined, setIsWindowDefined] = useState(false);
  const [videoCall, setVideoCall] = useState(false);

  useEffect(() => {
    setIsWindowDefined(typeof window !== "undefined");
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
    token:
      "0007eJxTYJDx7pTRlhKZ/WT9Hu3ZN6eFSjj4Rf8NPhCVciD26/pfM9wVGJJSTdOSLVKTU43TLE0MzU0tLIySkg3NDNMMUpIMDVOSl876m9oQyMgQfcudlZEBAkF8HgbHgoL8zLyS3NS8EkMGBgBauSNq",
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