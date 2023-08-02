import "./title.css";

function Title({ children, title }) {
  return (
    <div className="title">
      {children}
      <span>{title}</span>
    </div>
  );
}

export default Title;
