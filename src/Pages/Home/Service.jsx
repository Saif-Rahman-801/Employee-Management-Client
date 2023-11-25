const Service = ({ service }) => {
  const { title, description, icon, id } = service;
  return (
    <div className="container mx-auto p-4">
      
      <div className="flex items-center mb-8">
        {/* Icon on the left */}
        <div className="mr-4">
          <img src={icon} alt={`Service Icon ${id}`} className="w-10 h-10" />
        </div>

        {/* Title and Description on the right */}
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};



export default Service;
