import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer</h4>
                <h5>Career Build AI</h5>
              </div>
              <h3>May 2025 – Present</h3>
            </div>
            <p>
              Building scalable microservices using FastAPI and GCP Cloud SQL to
              process large volumes of real-time interview data. Developed an
              LLM-based adaptive questioning system using WebSockets and
              fine-tuned models with over 90% contextual relevance. Designed
              optimized ETL pipelines for resume and user data ingestion,
              reducing analytics data retrieval latency by 40%. Deploying
              containerized services on GCP Cloud Run with CI/CD pipelines,
              achieving 99.9% uptime.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Developer Intern</h4>
                <h5>Blue Yonder</h5>
              </div>
              <h3>Jan 2024 – Jun 2024</h3>
            </div>
            <p>
              Built and deployed an ElasticSearch cluster integrated with
              ranking services to improve data retrieval speed by 50% for
              multi-terabyte datasets. Developed full-stack features using
              React/Redux and Spring Boot, reducing API response times by 25%.
              Designed a high-performance integration layer between core
              services and search infrastructure, improving throughput by 35%.
              Optimized backend performance via connection pooling and
              caching strategies in Spring Boot services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
