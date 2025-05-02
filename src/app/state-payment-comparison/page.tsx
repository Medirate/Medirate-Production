import React, { useState, useMemo } from 'react';
import { ServiceData } from '../../types/serviceData';
import { Select } from 'react-select';
import { ClearButton } from '../../components/ClearButton';

const [selectedProviderType, setSelectedProviderType] = useState("");
const [providerTypes, setProviderTypes] = useState<string[]>([]);

const extractFilters = (data: ServiceData[]) => {
  // ... existing code ...

  // Get provider types
  const providerTypes = data
    .map((item) => item.provider_type?.trim())
    .filter((providerType): providerType is string => !!providerType);
  setProviderTypes([...new Set(providerTypes)].sort((a, b) => a.localeCompare(b)));
};

const filteredData = useMemo(() => {
  if (!areFiltersApplied) return [];
  
  return data.filter(item => {
    // ... existing conditions ...

    if (selectedProviderType && item.provider_type !== selectedProviderType) return false;

    return true;
  });
}, [
  // ... existing dependencies ...
  selectedProviderType
]);

const resetFilters = () => {
  // ... existing code ...
  setSelectedProviderType("");
};

return (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">Provider Type</label>
    <Select
      instanceId="providerTypeId"
      options={providerTypes.map(type => ({ value: type, label: type }))}
      value={selectedProviderType ? { value: selectedProviderType, label: selectedProviderType } : null}
      onChange={(option) => setSelectedProviderType(option?.value || "")}
      placeholder="Select Provider Type"
      isSearchable
      isDisabled={!selectedServiceCode && !selectedServiceDescription}
      className={`react-select-container ${!selectedServiceCode && !selectedServiceDescription ? 'opacity-50' : ''}`}
      classNamePrefix="react-select"
    />
    {selectedProviderType && (
      <ClearButton onClick={() => setSelectedProviderType("")} />
    )}
  </div>
); 