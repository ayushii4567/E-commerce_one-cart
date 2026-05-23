import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ai from "../assets/a2.png";
import open from "../assets/open.mp3";

import { shopDataContext } from "../context/ShopContext";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);

  const navigate = useNavigate();

  const [activeAi, setActiveAi] = useState(false);

  const recognitionRef = useRef(null);

  const openingSound = useMemo(() => new Audio(open), []);

  // ===================== SPEAK =====================

  const speak = (message) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(message);

    utterance.volume = 1;

    utterance.rate = 1;

    utterance.pitch = 1;

    utterance.lang = "en-US";

    window.speechSynthesis.speak(utterance);
  };

  // ===================== COMMAND MATCHER =====================

  const hasCommand = (transcript, commands = []) => {
    return commands.some((cmd) => transcript.includes(cmd));
  };

  // ===================== EFFECT =====================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition Not Supported");
      return;
    }

    const recognition = new SpeechRecognition();

    // ===================== SETTINGS =====================

    recognition.continuous = false;

    // important for clean result
    recognition.interimResults = false;

    // hindi + english support
    recognition.lang = "hi-IN";

    recognition.maxAlternatives = 1;

    // ===================== RESULT =====================

    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript
        .toLowerCase()
        .trim();

      // clean transcript
      transcript = transcript.replace(/\s+/g, " ");

      console.log("User Said :", transcript);

      // ===================== SEARCH OPEN =====================

      if (
        hasCommand(transcript, [
          "open search",
          "search open",
          "search kholo",
          "search khol",
          "search chalu karo",
          "show search",

          "ओपन सर्च",
          "सर्च ओपन",
          "सर्च खोलो",
          "सर्च चालू करो",
        ])
      ) {
        if (!showSearch) {
          speak("Opening Search");

          setShowSearch(true);

          navigate("/collections");
        }
      }

      // ===================== SEARCH CLOSE =====================

      else if (
        hasCommand(transcript, [
          "close search",
          "search close",
          "search band",
          "search band karo",
          "hide search",

          "सर्च बंद करो",
          "सर्च बंद",
          "क्लोज सर्च",
        ])
      ) {
        speak("Closing Search");

        setShowSearch(false);
      }

      // ===================== HOME =====================

      else if (
        hasCommand(transcript, [
          "home",
          "homepage",
          "home page",
          "go home",
          "open home",
          "open homepage",

          "होम",
          "होम पेज",
          "होमपेज",
          "ओपन होम",
          "ओपन होम पेज",
        ])
      ) {
        speak("Opening Home Page");

        navigate("/");

        setShowSearch(false);
      }

      // ===================== ABOUT =====================

      else if (
        hasCommand(transcript, [
          "about",
          "about page",
          "aboutpage",
          "open about",

          "अबाउट",
          "अबाउट पेज",
          "अबाउटपेज",
          "ओपन अबाउट",
          "ओपन अबाउट पेज",
        ])
      ) {
        speak("Opening About Page");

        navigate("/about");

        setShowSearch(false);
      }

      // ===================== COLLECTIONS =====================

      else if (
        hasCommand(transcript, [
          "collection",
          "collections",
          "product",
          "products",
          "show products",
          "show collection",
          "open collection",
          "open collections",
          "fashion",
          "shopping",

          "कलेक्शन",
          "कलेक्शंस",
          "प्रोडक्ट",
          "प्रोडक्ट्स",
          "ओपन कलेक्शन",
          "ओपन प्रोडक्ट",
        ])
      ) {
        speak("Opening Collections");

        navigate("/collections");

        setShowSearch(false);
      }

      // ===================== CONTACT =====================

      else if (
        hasCommand(transcript, [
          "contact",
          "contact page",
          "help",
          "support",
          "open contact",

          "कॉन्टैक्ट",
          "कॉन्टैक्ट पेज",
          "ओपन कॉन्टैक्ट",
          "हेल्प",
          "ओपन कांटेक्ट",
        ])
      ) {
        speak("Opening Contact Page");

        navigate("/contact");

        setShowSearch(false);
      }

      // ===================== CART =====================

      else if (
        hasCommand(transcript, [
          "cart",
          "my cart",
          "shopping cart",
          "open cart",

          "kaat",
          "caat",

          "कार्ट",
          "माय कार्ट",
          "ओपन कार्ट",
           "ओपन कार्ड"
        ])
      ) {
        speak("Opening Cart");

        navigate("/cart");

        setShowSearch(false);
      }

      // ===================== ORDERS =====================

      else if (
        hasCommand(transcript, [
          "order",
          "orders",
          "my order",
          "my orders",
          "show orders",
          "open orders",

          "ऑर्डर",
          "ऑर्डर्स",
          "माय ऑर्डर",
          "ओपन ऑर्डर",
        ])
      ) {
        speak("Opening Orders");

        navigate("/order");

        setShowSearch(false);
      }

      // ===================== PLACE ORDER =====================

      else if (
        hasCommand(transcript, [
          "checkout",
          "place order",
          "buy now",
          "purchase",

          "चेकआउट",
          "ऑर्डर प्लेस",
          "बाय नाउ",
        ])
      ) {
        speak("Opening Checkout");

        navigate("/placeorder");

        setShowSearch(false);
      }

      

      // ===================== SCROLL DOWN =====================

      else if (
        hasCommand(transcript, [
          "scroll down",
          "go down",
          "move down",

          "नीचे जाओ",
          "स्क्रॉल डाउन",
        ])
      ) {
        speak("Scrolling Down");

        window.scrollBy({
          top: 500,
          behavior: "smooth",
        });
      }

      // ===================== SCROLL UP =====================

      else if (
        hasCommand(transcript, [
          "scroll up",
          "go up",
          "move up",

          "ऊपर जाओ",
          "स्क्रॉल अप",
        ])
      ) {
        speak("Scrolling Up");

        window.scrollBy({
          top: -500,
          behavior: "smooth",
        });
      }

      // ===================== REFRESH =====================

      else if (
        hasCommand(transcript, [
          "refresh",
          "reload",
          "refresh page",

          "रीफ्रेश",
          "रिलोड",
        ])
      ) {
        speak("Refreshing Page");

        window.location.reload();
      }

      // ===================== BACK =====================

      else if (
        hasCommand(transcript, [
          "go back",
          "back",
          "previous page",

          "पीछे जाओ",
          "बैक",
        ])
      ) {
        speak("Going Back");

        window.history.back();
      }

      // ===================== CLOSE AI =====================

      else if (
        hasCommand(transcript, [
          "close ai",
          "stop ai",
          "stop listening",
          "close assistant",

          "एआई बंद",
          "बंद हो जाओ",
          "सुनना बंद करो",
        ])
      ) {
        speak("Closing Assistant");

        recognition.stop();

        setActiveAi(false);
      }

      // ===================== UNKNOWN =====================

      else {
        toast.error("Command Not Recognized");
      }
    };

    // ===================== ERRORS =====================

    recognition.onerror = (event) => {
      console.log("Speech Error:", event.error);

      setActiveAi(false);

      if (event.error !== "no-speech") {
        toast.error("Voice Recognition Error");
      }
    };

    // ===================== END =====================

    recognition.onend = () => {
      setActiveAi(false);
    };

    recognitionRef.current = recognition;

    // ===================== CLEANUP =====================

    return () => {
      recognition.stop();
    };
  }, [navigate, setShowSearch, showSearch]);

  // ===================== START LISTENING =====================

  const startListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true,
        },
      });

      if (recognitionRef.current) {
        recognitionRef.current.stop();

        setTimeout(() => {
          recognitionRef.current.start();

          openingSound.play();

          setActiveAi(true);
        }, 200);
      }
    } catch (error) {
      console.log(error);

      toast.error("Microphone Permission Denied");
    }
  };

  // ===================== UI =====================

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-[9999]"
      onClick={startListening}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[55px] md:w-[65px] cursor-pointer duration-300 ${
          activeAi
            ? "translate-x-[10%] translate-y-[-10%] scale-125"
            : "translate-x-[0] translate-y-[0] scale-100"
        }`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 35px #00d2fc)"
            : "drop-shadow(0px 0px 18px black)",
        }}
      />
    </div>
  );
}

export default Ai;