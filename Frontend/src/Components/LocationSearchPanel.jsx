import React from 'react';
import PropTypes from 'prop-types';

const LocationSearchPanel = ({ 
    suggestions, 
    setVehiclePanelOpen, 
    setPanelOpen, 
    activeField, 
    setPickup, 
    setDestination 
}) => {
    const handleSuggestionClick = (suggestion) => {
        const description = suggestion.description || suggestion;
        console.log(activeField);
        
        if (activeField === 'pickup') {
            setPickup(description);
            
            console.log('pickup',description);
            
        } else {
            setDestination(description);
            console.log('destination',description);
        }
        // setVehiclePanelOpen(true);
        // setPanelOpen(false);
    };

    return (
        <div>
            {suggestions && suggestions.map((suggestion, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className='flex gap-4 border-2 p-3 rounded-xl border-gray-100 active:border-black items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className='ri-map-pin-fill'></i>
                    </h2>
                    <h4 className='font-medium'>{suggestion.description || suggestion}</h4>
                </div>
            ))}
            {(!suggestions || suggestions.length === 0) && (
                <div className='text-center text-gray-500 py-4'>
                    Type to see location suggestions
                </div>
            )}
        </div>
    );
};

LocationSearchPanel.propTypes = {
    suggestions: PropTypes.array,
    setVehiclePanelOpen: PropTypes.func.isRequired,
    setPanelOpen: PropTypes.func.isRequired,
    activeField: PropTypes.oneOf(['pickup', 'destination']),
    setPickup: PropTypes.func.isRequired,
    setDestination: PropTypes.func.isRequired
};

LocationSearchPanel.defaultProps = {
    suggestions: [],
    activeField: null
};

export default LocationSearchPanel;