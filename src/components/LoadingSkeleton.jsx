export default function LoadingSkeleton() {
  return (
    <div style={{ padding: "20px", border: "2px dashed #EDF1FF" }}>
      <h3>Loading...</h3>
      <div
        style={{
          background: "#e0e0e0",
          height: "20px",
          width: "80%",
          marginBottom: "10px",
        }}
      ></div>
      <div
        style={{
          background: "#e0e0e0",
          height: "150px",
          width: "150px",
          marginBottom: "10px",
        }}
      ></div>
      <div
        style={{
          background: "#e0e0e0",
          height: "15px",
          width: "60%",
          marginBottom: "5px",
        }}
      ></div>
      <div
        style={{ background: "#e0e0e0", height: "15px", width: "40%" }}
      ></div>
    </div>
  );
}
