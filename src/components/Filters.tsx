import React, { useState, useEffect } from 'react';
import { useUsage } from '../hooks/useUsage';

const Filters = () => {
  const { usages, filter } = useUsage();
  const [type, setType] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);

  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [uniqueModels, setUniqueModels] = useState<string[]>([]);

  useEffect(() => {
    const types = Array.from(new Set(usages.map(usage => usage.type))).filter(el => el);
    const models = Array.from(new Set(usages.map(usage => usage.model))).filter(el => el);
    console.log(types, 'types')
    console.log(models, 'models')
    setUniqueTypes(types);
    setUniqueModels(models);
  }, [usages]);

  const handleFilter = () => filter(type, model);

  return (
    <div>
      <div>
        <label>
          Type:
          <select value={type ?? ''} onChange={(e) => setType(e.target.value || null)}>
            <option value=''>All</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Model:
          <select value={model ?? ''} onChange={(e) => setModel(e.target.value || null)}>
            <option value=''>All</option>
            {uniqueModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </div>
  );
};

export default Filters