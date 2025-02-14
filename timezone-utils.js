function getTimezonesData(timezoneIds) {
  // Initialize result object
  const result = {
    zones: {},
    rules: {}
  };
  
  // Helper function to get linked timezone
  function resolveLinkedZone(zoneId) {
    if (typeof tzdata.zones[zoneId] === 'string') {
      return tzdata.zones[zoneId]; // Return the linked zone ID
    }
    return zoneId;
  }

  // Process each timezone ID
  timezoneIds.forEach(id => {
    // Skip if timezone ID is invalid
    if (!tzdata.zones[id]) {
      console.warn(`Invalid timezone ID: ${id}`);
      return;
    }

    // Resolve linked timezone if necessary
    const actualZoneId = resolveLinkedZone(id);
    
    // Add zone data
    result.zones[id] = tzdata.zones[actualZoneId];

    // If zone is an array (not a link), process rules
    if (Array.isArray(result.zones[id])) {
      result.zones[id].forEach(zoneEntry => {
        // Check if zone entry has rules
        const ruleName = zoneEntry[1];
        if (ruleName && ruleName !== '-') {
          // Add rules if they exist and haven't been added yet
          if (tzdata.rules[ruleName] && !result.rules[ruleName]) {
            result.rules[ruleName] = tzdata.rules[ruleName];
          }
        }
      });
    }
  });

  return result;
}

