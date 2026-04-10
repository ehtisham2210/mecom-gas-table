"use client";
import { useState } from "react";

export default function Page() {
  const [data, setData] = useState([
    { id: 1, name: "5KG CYLINDER", bestFor: "Small households", capacity: "5 kilograms", features: "Portable" },
    { id: 2, name: "11KG CYLINDER", bestFor: "Small families", capacity: "11 kilograms", features: "Efficient" },
    { id: 3, name: "12.5KG CYLINDER", bestFor: "Medium families", capacity: "12.5 kilograms", features: "Standard" },
    { id: 4, name: "45KG CYLINDER", bestFor: "Large families", capacity: "45 kilograms", features: "High capacity" },
    { id: 5, name: "BULK SUPPLY", bestFor: "Industries", capacity: "Customized", features: "Contracts" },
    { id: 6, name: "AUTOGAS", bestFor: "Vehicles", capacity: "As required", features: "Clean fuel" },
    { id: 7, name: "TURNKEY INSTALLATION", bestFor: "Bulk setups", capacity: "1-50 MT", features: "Complete solution" },
    { id: 8, name: "MAINTENANCE SERVICES", bestFor: "All users", capacity: "N/A", features: "Safety" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRow, setNewRow] = useState({
    name: "",
    bestFor: "",
    capacity: "",
    features: "",
  });

  const [editId, setEditId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  // Smart label function
  function getActionLabel(name = "", capacity = "") {
    const product = name.toLowerCase();
    const cap = capacity.toLowerCase();

    if (product.includes("maintenance") || product.includes("service")) {
      return "SCHEDULE";
    }
    if (product.includes("turnkey") || product.includes("installation")) {
      return "REQUEST QUOTE";
    }
    if (product.includes("autogas") && cap.includes("as required")) {
      return "CONTACT US";
    }
    if (product.includes("bulk") && cap.includes("customized")) {
      return "GET QUOTE";
    }
    return "ORDER NOW";
  }

  // Button color function
  function getButtonColor(label) {
    switch (label) {
      case "SCHEDULE":
        return "bg-orange-500 hover:bg-orange-600";
      case "REQUEST QUOTE":
        return "bg-orange-500 hover:bg-orange-600";
      case "CONTACT US":
        return "bg-orange-500 hover:bg-orange-600";
      case "GET QUOTE":
        return "bg-orange-500 hover:bg-orange-600";
      default:
        return "bg-orange-500 hover:bg-orange-600";
    }
  }

  // Add row
  const handleAdd = () => {
    if (!newRow.name || !newRow.capacity) {
      alert("Product/Service and Capacity are required");
      return;
    }

    setData([...data, { ...newRow, id: Date.now() }]);
    setNewRow({ name: "", bestFor: "", capacity: "", features: "" });
    setShowForm(false);
  };

  // Save edit
  const handleSave = (id) => {
    setData(data.map((item) => (item.id === id ? editRow : item)));
    setEditId(null);
  };

  // Delete
  const confirmDelete = () => {
    setData(data.filter((item) => item.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-grey-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-2xl text-center font-bold mb-4">Choose a Right Option</h1>

        {/* Add Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Row
        </button>

        {/* Form */}
        {showForm && (
          <div className="mb-4 grid grid-cols-2 gap-2 bg-white p-4 rounded shadow">
            <input className="border p-2" placeholder="Product"
              value={newRow.name}
              onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
            />
            <input className="border p-2" placeholder="Best For"
              value={newRow.bestFor}
              onChange={(e) => setNewRow({ ...newRow, bestFor: e.target.value })}
            />
            <input className="border p-2" placeholder="Capacity"
              value={newRow.capacity}
              onChange={(e) => setNewRow({ ...newRow, capacity: e.target.value })}
            />
            <input className="border p-2" placeholder="Features"
              value={newRow.features}
              onChange={(e) => setNewRow({ ...newRow, features: e.target.value })}
            />

            <button onClick={handleAdd} className="bg-green-600 text-white p-2 rounded col-span-2">
              Submit
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Best For</th>
                <th className="p-2">Capacity</th>
                <th className="p-2">Features</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                const label = getActionLabel(item.name, item.capacity);

                return (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white text-center" : "bg-gray-100 text-center"} >
                    {editId === item.id ? (
                      <>
                        <td><input className="border p-1" value={editRow.name}
                          onChange={(e) => setEditRow({ ...editRow, name: e.target.value })}
                        /></td>
                        <td><input className="border p-1" value={editRow.bestFor}
                          onChange={(e) => setEditRow({ ...editRow, bestFor: e.target.value })}
                        /></td>
                        <td><input className="border p-1" value={editRow.capacity}
                          onChange={(e) => setEditRow({ ...editRow, capacity: e.target.value })}
                        /></td>
                        <td><input className="border p-1" value={editRow.features}
                          onChange={(e) => setEditRow({ ...editRow, features: e.target.value })}
                        /></td>

                        <td className="space-x-2">
                          <button onClick={() => handleSave(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                            Save
                          </button>
                          <button onClick={() => setEditId(null)} className="bg-gray-500 text-white px-2 py-1 rounded">
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2" >{item.name}</td>
                        <td className="p-2">{item.bestFor}</td>
                        <td className="p-2">{item.capacity}</td>
                        <td className="p-2">{item.features}</td>

                        
                          {/* Smart Button */}
                          <td className="p-2">
                          <div className="flex item-center justify-center gap-2">

                          <button className={`${getButtonColor(label)} text-white px-3 py-1 rounded`}>
                            {label}
                          </button>

                          <button
                            onClick={() => {
                              setEditId(item.id);
                              setEditRow(item);
                            }}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                            >
                            Edit
                          </button>

                          <button
                            onClick={() => setDeleteId(item.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                            Delete
                          </button>
                            </div>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded shadow">
              <p>Are you sure you want to delete?</p>
              <div className="mt-4 space-x-2">
                <button onClick={confirmDelete} className="bg-red-600 text-white px-3 py-1 rounded">
                  Yes
                </button>
                <button onClick={() => setDeleteId(null)} className="bg-gray-400 px-3 py-1 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}