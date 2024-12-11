import { FC } from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface EnergyTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const energyTypes = ['diesel', 'B100', 'EV'];

const EnergyTypeSelect: FC<EnergyTypeSelectProps> = ({ value, onChange, style }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button 
          className="relative w-32 rounded-md border-2 border-gray-400 shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          style={style}
        >
          <span className="block truncate">{value}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {energyTypes.map((type) => (
            <Listbox.Option
              key={type}
              value={type}
              className={({ active }) =>
                `${active ? 'text-white bg-blue-600' : 'text-gray-900'}
                cursor-default select-none relative py-2 pl-3 pr-9`
              }
            >
              {type}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default EnergyTypeSelect;