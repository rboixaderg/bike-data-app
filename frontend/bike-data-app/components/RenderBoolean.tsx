export const RenderBoolean = ({ value }) => {
  return value ? (
    <span className="icon">
      <i className="fas fa-check"></i>
    </span>
  ) : (
    <span className="icon">
      <i className="fas fa-times"></i>
    </span>
  )
}
