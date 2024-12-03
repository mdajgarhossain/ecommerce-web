const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
        <div className="loader-ring"></div>
      </div>
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .loader {
          position: relative;
          width: 40px;
          height: 40px;
        }
        
        .loader-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top-color: #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loader-ring:nth-child(2) {
          width: 80%;
          height: 80%;
          top: 10%;
          left: 10%;
          border-top-color: #e74c3c;
          animation-duration: 0.7s;
        }
        
        .loader-ring:nth-child(3) {
          width: 60%;
          height: 60%;
          top: 20%;
          left: 20%;
          border-top-color: #f1c40f;
          animation-duration: 0.5s;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Loader