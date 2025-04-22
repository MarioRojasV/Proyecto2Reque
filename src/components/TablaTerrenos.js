import React from "react";

const TablaTerrenos = ({ terrenos = [], onSeleccionarTerreno }) => {
  const getColor = (estado) => {
    if (estado === "sin cultivo") return "#e2e8f0";
    if (estado === "en proceso") return "#fefcbf";
    if (estado === "listo para cosechar") return "#c6f6d5";
    return "#fff";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        🗾 Terrenos Registrados
      </h2>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          border: "2px solid #cbd5e0",
          borderRadius: "12px",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead style={{ backgroundColor: "#cbd5e0", color: "#2f855a" }}>
            <tr>
              {["", "ID", "Nombre", "Área m²", "Estado", "Cultivo", "Plan Siembra"].map((h, i) => (
                <th
                  key={i}
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f0fff4",
                    border: "2px solid #cbd5e0",
                    padding: "12px",
                    textAlign: "left",
                    zIndex: 1,
                    boxSizing: "border-box",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {terrenos.map((terreno, index) => (
              <tr
                key={terreno.id}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f7fafc" : "#ffffff",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6fffa")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    index % 2 === 0 ? "#f7fafc" : "#ffffff")
                }
              >
                <td style={{ border: "1px solid #cbd5e0", padding: "10px", textAlign: "center" }}>
                  <input
                    type="radio"
                    name="terrenoSeleccionado"
                    value={terreno.id}
                    onChange={() => onSeleccionarTerreno(terreno.id)}
                  />
                </td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>{terreno.id}</td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>{terreno.nombre}</td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>{terreno.area}</td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>
                  <span
                    style={{
                      backgroundColor: getColor(terreno.estadoCultivo),
                      padding: "6px 12px",
                      borderRadius: "9999px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {terreno.estadoCultivo
                      ? terreno.estadoCultivo.replace(/_/g, " ")
                      : "Sin estado"}
                  </span>
                </td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>
                  {terreno.cultivoEnProceso || "-"}
                </td>
                <td style={{ border: "1px solid #cbd5e0", padding: "10px" }}>
                  {terreno.planSiembraId || "Ninguno"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaTerrenos;
