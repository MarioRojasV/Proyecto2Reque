import React from 'react';

const TablaProcesos = ({datos, columnaExtra, campoExtra}) => {
    return (
        <div style={styles.estiloDivTabla}>
            <table style={styles.estiloTabla}>
                <thead>
                    <tr>
                        <th style={styles.estiloEncabezados}>Fecha</th>
                        <th style={styles.estiloEncabezados}>Tipo</th>
                        <th style={styles.estiloEncabezados}>{columnaExtra}</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((evento, index) => (
                        <tr key={index}>
                            <td style={styles.estiloFilasInfo}>{evento.fecha}</td>
                            <td style={styles.estiloFilasInfo}>{evento.tipo}</td>
                            <td style={styles.estiloFilasInfo}>{evento[campoExtra]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    estiloDivTabla: {
        width: '500px',
        maxHeight: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1rem'
    },
    estiloTabla: {
        minWidth: '600px',
        borderCollapse: 'colapse',
    },
    estiloEncabezados: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
    },
    estiloFilasInfo: {
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default TablaProcesos;