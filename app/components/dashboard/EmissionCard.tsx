import { FC } from 'react';
import clsx from 'clsx';
import { SCOPE_COLORS } from '@/constants/theme';

interface EmissionCardProps {
  title: string;
  value: number;
  modifiedValue?: number;
  change: number;
  monthlyChange?: number;
  variant?: 'primary' | 'scope1' | 'scope2' | 'scope3';
  showChange?: boolean;
}

const getVariantStyles = (variant: EmissionCardProps['variant']) => {
  switch (variant) {
    case 'scope1':
      return 'bg-pink-50 border-l-4';
    case 'scope2':
      return 'bg-green-50 border-l-4';
    case 'scope3':
      return 'bg-purple-50 border-l-4';
    default:
      return 'bg-blue-500 text-white';
  }
};

const getBorderColor = (variant: EmissionCardProps['variant']) => {
  switch (variant) {
    case 'scope1':
      return { borderColor: SCOPE_COLORS.scope1 };
    case 'scope2':
      return { borderColor: SCOPE_COLORS.scope2 };
    case 'scope3':
      return { borderColor: SCOPE_COLORS.scope3 };
    default:
      return {};
  }
};

const getTitleStyle = (variant: EmissionCardProps['variant']) => {
  switch (variant) {
    case 'scope1':
      return { color: SCOPE_COLORS.scope1 };
    case 'scope2':
      return { color: SCOPE_COLORS.scope2 };
    case 'scope3':
      return { color: SCOPE_COLORS.scope3 };
    default:
      return {};
  }
};

const EmissionCard: FC<EmissionCardProps> = ({
  title,
  value,
  modifiedValue,
  change,
  monthlyChange,
  variant = 'primary',
  showChange = true,
}) => {
  const isNonPrimary = variant !== 'primary';
  const isSimulationView = modifiedValue !== undefined;

  return (
    <div 
      className={clsx('rounded-lg p-4 shadow-sm', getVariantStyles(variant))}
      style={getBorderColor(variant)}
    >
      <h3 
        className={clsx('text-lg font-medium mb-2')}
        style={getTitleStyle(variant)}
      >
        {title}
      </h3>
      {isSimulationView ? (
        <div className="flex flex-col items-center">
          <div className={clsx('text-xl font-medium', isNonPrimary && 'text-gray-900')}>
            {value.toLocaleString('en-US', { minimumFractionDigits: 1 })}
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl text-gray-500">↓</span>
            <span className={clsx(
              'text-lg font-medium',
              change < 0 ? 'text-red-500' : 'text-green-500'
            )}>
              {change < 0 ? '' : '-'}{Math.abs(change)}%
            </span>
          </div>
          <div className={clsx('text-2xl font-bold', isNonPrimary && 'text-gray-900')}>
            {modifiedValue.toLocaleString('en-US', { minimumFractionDigits: 1 })}
          </div>
        </div>
      ) : (
        <>
          <div className={clsx('text-3xl font-bold mb-2', isNonPrimary && 'text-gray-900')}>
            {value.toLocaleString('en-US', { minimumFractionDigits: 1 })}
          </div>
          <div className={clsx('text-sm', isNonPrimary ? 'text-gray-600' : 'text-white/90')}>
            {showChange && (
              <>
                <span className={clsx(
                  isNonPrimary
                    ? change > 0 ? 'text-red-500' : 'text-green-500'
                    : 'text-white font-medium'
                )}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
                {monthlyChange !== undefined && (
                  <>
                    <span className="mx-1">
                      {monthlyChange > 0 ? '+' : ''}{monthlyChange.toLocaleString('en-US', { minimumFractionDigits: 1 })}
                    </span>
                    this month
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmissionCard;