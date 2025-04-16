const StatsCards = () => {
    const stats = [
      { title: "Produits", value: "15,000" },
      { title: "Clients", value: "2,000" },
    ];
  
    return (
      <div className="grid grid-cols-2 gap-4 my-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-bold">{stat.title}</h3>
            <p className="text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatsCards;
  