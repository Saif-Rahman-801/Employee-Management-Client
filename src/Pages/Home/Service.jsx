

const Service = ({ service }) => {
  const { title, description, icon, id } = service;
  
  return (
    <div  className="my-10">
      <div>
        <div className="text-center">
          <img
            src={icon}
            alt={`Service ${id}`}
            className="w-[300px] object-cover object-center"
          />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 font-medium">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
