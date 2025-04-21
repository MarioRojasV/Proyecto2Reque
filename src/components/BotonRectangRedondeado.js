const BtnRectangRedond = ({children, style = {}, onClick}) => (
  <div
    onClick={onClick}
    style={{
      width: '180px',
      height: '50px',
      borderRadius: '12px',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: 'white',
      boxShadow: '4px 10px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style  // <- combina estilos externos
    }}>
    {children}
  </div>
);

  

export default BtnRectangRedond;