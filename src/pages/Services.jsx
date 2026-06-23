const Services = () => {
  const services = [
    {
      title: "Fast Delivery",
      desc: "Get your products delivered quickly and safely at your doorstep.",
    },
    {
      title: "Secure Payments",
      desc: "Multiple secure payment options including cards and wallets.",
    },
    {
      title: "24/7 Support",
      desc: "Our support team is always available to help you.",
    },
    {
      title: "Easy Returns",
      desc: "Hassle-free return and refund policies for customers.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 space-y-10">

      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Our <span className="text-yellow-500">Services</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-lg">
          We provide the best services to make your shopping experience smooth and enjoyable.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

        {services.map((service, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow hover:shadow-xl transition text-center"
          >
            <h2 className="font-bold text-lg mb-2">{service.title}</h2>
            <p className="text-gray-600 text-sm">{service.desc}</p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Services;