import EmissionCard from './components/dashboard/EmissionCard';
import EmissionsChart from './components/dashboard/EmissionsChart';
import GHGDonutChart from './components/dashboard/GHGDonutChart';

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EmissionCard
          title="Total Emissions"
          value={1345.5}
          change={-18}
          monthlyChange={3.8}
          variant="primary"
        />
        <EmissionCard
          title="Scope 1"
          value={123.4}
          change={-12}
          monthlyChange={2.8}
          variant="scope1"
        />
        <EmissionCard
          title="Scope 2"
          value={234.5}
          change={-16}
          monthlyChange={7.8}
          variant="scope2"
        />
        <EmissionCard
          title="Scope 3"
          value={987.6}
          change={6}
          monthlyChange={1.2}
          variant="scope3"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmissionsChart />
        <GHGDonutChart />
      </div>
    </div>
  );
}