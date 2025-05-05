import React from 'react';

const TablaProcesos = ({datos, columnaExtra, campoExtra, anchoTabla, altoTabla}) => {

    const estiloDivTabla= {
        width: anchoTabla,
        maxHeight: altoTabla,
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '1rem'
    };

    return (
        <div style={estiloDivTabla}>
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
    estiloTabla: {
        minWidth: '100%',
        maxHeight: '150px',
        borderCollapse: 'colapse',
    },
    estiloEncabezados: {
        border: '1px solid #ddd',
        padding: '8px',
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
    },
    estiloFilasInfo: {
        minWidth: '100px',
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default TablaProcesos;