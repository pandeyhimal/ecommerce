const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16 space-y-10">

      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          About <span className="text-yellow-500">Us</span>
        </h1>

        <p className="text-gray-600 text-sm md:text-lg max-w-3xl mx-auto">
          We are a modern ecommerce platform dedicated to providing high-quality products
          at affordable prices with fast delivery and excellent customer service.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="p-6 border rounded-lg shadow hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To make online shopping simple, affordable, and accessible for everyone.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become a trusted global ecommerce platform for millions of users.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-xl transition">
          <h2 className="font-bold text-xl mb-2">Our Values</h2>
          <p className="text-gray-600">
            Quality, trust, customer satisfaction, and innovation.
          </p>
        </div>

      </div>

    </section>
  );
};

export default About;