import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails.jsx";
import RidePopUp from "../components/RidePopUp.jsx";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SocketContext } from "../context/SocketContext.jsx";
import { CaptainDataContext } from "../context/captainContext.jsx";
import axios from "axios";
import LiveTracking from "../components/LiveTracking.jsx";

const HomeCaptain = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  // 🚀 UseEffect for socket connection
  useEffect(() => {
    if (!captain?._id) return; // Prevent running before captain data loads

    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const handleNewRide = (data) => {
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.off("new-ride"); // Remove existing listener
    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide); // Cleanup on unmount
    };
  }, [socket, captain]);

  // 🌍 Update Location Every 10 Seconds
  useEffect(() => {
    if (!captain?._id) return;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation(); // Initial call

    return () => clearInterval(locationInterval);
  }, [socket, captain]);

  // ✅ Confirm Ride Function
  async function confirmRide() {
    if (!ride?._id || !captain?._id) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  // 🚀 GSAP Animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen">
      {/* 🔹 Navbar */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/HomeCaptain"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      {/* 🔹 Background Image */}
      <div className="h-3/5 relative z-[1]">
        <LiveTracking/>
      </div>

      {/* 🔹 Captain Details */}
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>

      {/* 🔹 Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 z-[10]"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* 🔹 Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default HomeCaptain;
