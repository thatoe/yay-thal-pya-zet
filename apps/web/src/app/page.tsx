export default function HomePage() {
  return (
    <>
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center flex-col gap-6 max-w-3xl">
          <div className="text-6xl">💧</div>
          <h1 className="text-5xl font-bold text-base-content">
            Fresh Water, Delivered to Your Door
          </h1>
          <p className="text-lg text-base-content/70 max-w-xl">
            Subscribe to our water delivery service and never worry about running out.
            Pure, clean, refreshing water — on your schedule.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="/subscription" className="btn btn-primary btn-lg">
              Get Started
            </a>
            <a href="/products" className="btn btn-outline btn-lg">
              View Products
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-2">🚚</div>
                <h3 className="card-title">Reliable Delivery</h3>
                <p>Schedule deliveries that fit your life. Same-day and next-day options available.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-2">💎</div>
                <h3 className="card-title">Premium Quality</h3>
                <p>Our water goes through rigorous purification to ensure the highest quality.</p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <div className="text-4xl mb-2">♻️</div>
                <h3 className="card-title">Eco-Friendly</h3>
                <p>We use sustainable packaging and carbon-neutral delivery methods.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}