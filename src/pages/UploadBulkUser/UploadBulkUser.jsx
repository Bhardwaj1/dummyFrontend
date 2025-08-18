import { useState } from "react";
import DataTable from "../../components/Table/DataTable";


export default function ExcelUpload() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/excel-uploads", {
        method: "POST",
        body: formData,
      });

      console.log("triggered"); 
      const result = await res.json();
      setRows(result.rows);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dynamically generate columns from keys of first row
  const columns =
    rows.length > 0
      ? Object.keys(rows[0]).map((key) => ({ key, label: key }))
      : [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload Excel</h1>

      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleUpload}
        className="mb-4"
      />

      {loading && <p>Processing file...</p>}

      {rows.length > 0 && (
        <DataTable columns={columns} data={rows} />
      )}
    </div>
  );
}
