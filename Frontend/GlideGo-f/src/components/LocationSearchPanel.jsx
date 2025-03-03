import PropTypes from "prop-types";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickUp,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickUp") {
      setPickUp(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem?.display_name)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{elem?.display_name}</h4>
        </div>
      ))}
    </div>
  );
};

LocationSearchPanel.propTypes = {
  suggestions: PropTypes.array.isRequired, // Ensures `suggestions` is an array and required
  setVehiclePanel: PropTypes.func.isRequired, // Function to set vehicle panel (Required)
  setPanelOpen: PropTypes.func.isRequired, // Function to set panel open state (Required)
  setPickUp: PropTypes.func.isRequired, // Function to set pickUp location (Required)
  setDestination: PropTypes.func.isRequired, // Function to set destination (Required)
  activeField: PropTypes.string.isRequired, // Active field name (Required)
};

export default LocationSearchPanel;
